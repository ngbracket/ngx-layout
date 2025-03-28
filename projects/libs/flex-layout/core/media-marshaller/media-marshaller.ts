import { Injectable } from '@angular/core';

import { merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { BreakPoint } from '../breakpoints/break-point';
import { BreakPointRegistry } from '../breakpoints/break-point-registry';
import { MatchMedia } from '../match-media/match-media';
import { MediaChange } from '../media-change';
import { sortDescendingPriority } from '../utils/sort';

import { mergeAlias } from '../add-alias';
import { PrintHook } from './print-hook';

type ClearCallback = () => void;
type UpdateCallback = (val: any) => void;
type Builder = UpdateCallback | ClearCallback;

type ValueMap = Map<string, string>;
type BreakpointMap = Map<string, ValueMap>;
type ElementMap = Map<HTMLElement, BreakpointMap>;
type ElementKeyMap = WeakMap<HTMLElement, Set<string>>;
type SubscriptionMap = Map<string, Subscription>;
type WatcherMap = WeakMap<HTMLElement, SubscriptionMap>;
type BuilderMap = WeakMap<HTMLElement, Map<string, Builder>>;

export interface ElementMatcher {
  element: HTMLElement;
  key: string;
  value: any;
}

/**
 * MediaMarshaller - register responsive values from directives and
 *                   trigger them based on media query events
 */
@Injectable({ providedIn: 'root' })
export class MediaMarshaller {
  private _useFallbacks = true;
  private _activatedBreakpoints: BreakPoint[] = [];
  private elementMap: ElementMap = new Map();
  private elementKeyMap: ElementKeyMap = new WeakMap();
  private watcherMap: WatcherMap = new WeakMap(); // special triggers to update elements
  private updateMap: BuilderMap = new WeakMap(); // callback functions to update styles
  private clearMap: BuilderMap = new WeakMap(); // callback functions to clear styles

  private subject: Subject<ElementMatcher> = new Subject();

  get activatedAlias(): string {
    return this.activatedBreakpoints[0]?.alias ?? '';
  }

  set activatedBreakpoints(bps: BreakPoint[]) {
    this._activatedBreakpoints = [...bps];
  }

  get activatedBreakpoints(): BreakPoint[] {
    return [...this._activatedBreakpoints];
  }

  set useFallbacks(value: boolean) {
    this._useFallbacks = value;
  }

  constructor(
    protected matchMedia: MatchMedia,
    protected breakpoints: BreakPointRegistry,
    protected hook: PrintHook,
  ) {
    this.observeActivations();
  }

  /**
   * Update styles on breakpoint activates or deactivates
   * @param mc
   */
  onMediaChange(mc: MediaChange) {
    const bp: BreakPoint | null = this.findByQuery(mc.mediaQuery);

    if (bp) {
      mc = mergeAlias(mc, bp);

      const bpIndex = this.activatedBreakpoints.indexOf(bp);

      if (mc.matches && bpIndex === -1) {
        this._activatedBreakpoints.push(bp);
        this._activatedBreakpoints.sort(sortDescendingPriority);

        this.updateStyles();
      } else if (!mc.matches && bpIndex !== -1) {
        // Remove the breakpoint when it's deactivated
        this._activatedBreakpoints.splice(bpIndex, 1);
        this._activatedBreakpoints.sort(sortDescendingPriority);

        this.updateStyles();
      }
    }
  }

  /**
   * initialize the marshaller with necessary elements for delegation on an element
   * @param element
   * @param key
   * @param updateFn optional callback so that custom bp directives don't have to re-provide this
   * @param clearFn optional callback so that custom bp directives don't have to re-provide this
   * @param extraTriggers other triggers to force style updates (e.g. layout, directionality, etc)
   */
  init(
    element: HTMLElement,
    key: string,
    updateFn?: UpdateCallback,
    clearFn?: ClearCallback,
    extraTriggers: Observable<any>[] = [],
  ): void {
    initBuilderMap(this.updateMap, element, key, updateFn);
    initBuilderMap(this.clearMap, element, key, clearFn);

    this.buildElementKeyMap(element, key);
    this.watchExtraTriggers(element, key, extraTriggers);
  }

  /**
   * get the value for an element and key and optionally a given breakpoint
   * @param element
   * @param key
   * @param bp
   */
  getValue(element: HTMLElement, key: string, bp?: string): any {
    const bpMap = this.elementMap.get(element);
    if (bpMap) {
      const values =
        bp !== undefined ? bpMap.get(bp) : this.getActivatedValues(bpMap, key);
      if (values) {
        return values.get(key);
      }
    }
    return undefined;
  }

  /**
   * whether the element has values for a given key
   * @param element
   * @param key
   */
  hasValue(element: HTMLElement, key: string): boolean {
    const bpMap = this.elementMap.get(element);
    if (bpMap) {
      const values = this.getActivatedValues(bpMap, key);
      if (values) {
        return values.get(key) !== undefined || false;
      }
    }
    return false;
  }

  /**
   * Set the value for an input on a directive
   * @param element the element in question
   * @param key the type of the directive (e.g. flex, layout-gap, etc)
   * @param bp the breakpoint suffix (empty string = default)
   * @param val the value for the breakpoint
   */
  setValue(element: HTMLElement, key: string, val: any, bp: string): void {
    let bpMap: BreakpointMap | undefined = this.elementMap.get(element);
    if (!bpMap) {
      bpMap = new Map().set(bp, new Map().set(key, val));
      this.elementMap.set(element, bpMap);
    } else {
      const values = (bpMap.get(bp) ?? new Map()).set(key, val);
      bpMap.set(bp, values);
      this.elementMap.set(element, bpMap);
    }
    const value = this.getValue(element, key);
    if (value !== undefined) {
      this.updateElement(element, key, value);
    }
  }

  /** Track element value changes for a specific key */
  trackValue(element: HTMLElement, key: string): Observable<ElementMatcher> {
    return this.subject
      .asObservable()
      .pipe(filter((v) => v.element === element && v.key === key));
  }

  /** update all styles for all elements on the current breakpoint */
  updateStyles(): void {
    this.elementMap.forEach((bpMap, el) => {
      const keyMap = new Set(this.elementKeyMap.get(el)!);
      let valueMap = this.getActivatedValues(bpMap);

      if (valueMap) {
        valueMap.forEach((v, k) => {
          this.updateElement(el, k, v);
          keyMap.delete(k);
        });
      }

      keyMap.forEach((k) => {
        valueMap = this.getActivatedValues(bpMap, k);
        if (valueMap) {
          const value = valueMap.get(k);
          this.updateElement(el, k, value);
        } else {
          this.clearElement(el, k);
        }
      });
    });
  }

  /**
   * clear the styles for a given element
   * @param element
   * @param key
   */
  clearElement(element: HTMLElement, key: string): void {
    const builders = this.clearMap.get(element);

    if (builders) {
      const clearFn: ClearCallback = builders.get(key) as ClearCallback;
      if (!!clearFn) {
        clearFn();
        this.subject.next({ element, key, value: '' });
      }
    }
  }

  /**
   * update a given element with the activated values for a given key
   * @param element
   * @param key
   * @param value
   */
  updateElement(element: HTMLElement, key: string, value: any): void {
    const builders = this.updateMap.get(element);
    if (builders) {
      const updateFn: UpdateCallback = builders.get(key) as UpdateCallback;
      if (!!updateFn) {
        updateFn(value);
        this.subject.next({ element, key, value });
      }
    }
  }

  /**
   * release all references to a given element
   * @param element
   */
  releaseElement(element: HTMLElement): void {
    const watcherMap = this.watcherMap.get(element);
    if (watcherMap) {
      watcherMap.forEach((s) => s.unsubscribe());
      this.watcherMap.delete(element);
    }
    const elementMap = this.elementMap.get(element);
    if (elementMap) {
      elementMap.forEach((_, s) => elementMap.delete(s));
      this.elementMap.delete(element);
    }
  }

  /**
   * trigger an update for a given element and key (e.g. layout)
   * @param element
   * @param key
   */
  triggerUpdate(element: HTMLElement, key?: string): void {
    const bpMap = this.elementMap.get(element);
    if (bpMap) {
      const valueMap = this.getActivatedValues(bpMap, key);
      if (valueMap) {
        if (key) {
          this.updateElement(element, key, valueMap.get(key));
        } else {
          valueMap.forEach((v, k) => this.updateElement(element, k, v));
        }
      }
    }
  }

  /** Cross-reference for HTMLElement with directive key */
  private buildElementKeyMap(element: HTMLElement, key: string) {
    let keyMap = this.elementKeyMap.get(element);
    if (!keyMap) {
      keyMap = new Set();
      this.elementKeyMap.set(element, keyMap);
    }
    keyMap.add(key);
  }

  /**
   * Other triggers that should force style updates:
   * - directionality
   * - layout changes
   * - mutationobserver updates
   */
  private watchExtraTriggers(
    element: HTMLElement,
    key: string,
    triggers: Observable<any>[],
  ) {
    if (triggers && triggers.length) {
      let watchers = this.watcherMap.get(element);
      if (!watchers) {
        watchers = new Map();
        this.watcherMap.set(element, watchers);
      }
      const subscription = watchers.get(key);
      if (!subscription) {
        const newSubscription = merge(...triggers).subscribe(() => {
          const currentValue = this.getValue(element, key);
          this.updateElement(element, key, currentValue);
        });
        watchers.set(key, newSubscription);
      }
    }
  }

  /** Breakpoint locator by mediaQuery */
  private findByQuery(query: string) {
    return this.breakpoints.findByQuery(query);
  }

  /**
   * get the fallback breakpoint for a given element, starting with the current breakpoint
   * @param bpMap
   * @param key
   */
  private getActivatedValues(
    bpMap: BreakpointMap,
    key?: string,
  ): ValueMap | undefined {
    for (let i = 0; i < this.activatedBreakpoints.length; i++) {
      const activatedBp = this.activatedBreakpoints[i];
      const valueMap = bpMap.get(activatedBp.alias);

      if (valueMap) {
        if (
          key === undefined ||
          (valueMap.has(key) && valueMap.get(key) != null)
        ) {
          return valueMap;
        }
      }
    }

    // On the server, we explicitly have an "all" section filled in to begin with.
    // So we don't need to aggressively find a fallback if no explicit value exists.
    if (!this._useFallbacks) {
      return undefined;
    }

    const lastHope = bpMap.get('');
    return key === undefined || (lastHope && lastHope.has(key))
      ? lastHope
      : undefined;
  }

  /**
   * Watch for mediaQuery breakpoint activations
   */
  private observeActivations() {
    const queries = this.breakpoints.items.map((bp) => bp.mediaQuery);

    this.hook.registerBeforeAfterPrintHooks(this);
    this.matchMedia
      .observe(this.hook.withPrintQuery(queries))
      .pipe(
        tap(this.hook.interceptEvents(this)),
        filter(this.hook.blockPropagation()),
      )
      .subscribe(this.onMediaChange.bind(this));
  }
}

function initBuilderMap(
  map: BuilderMap,
  element: HTMLElement,
  key: string,
  input?: Builder,
): void {
  if (input !== undefined) {
    const oldMap = map.get(element) ?? new Map();
    oldMap.set(key, input);
    map.set(element, oldMap);
  }
}
