/* eslint-disable prefer-const */
import {
  AfterContentInit,
  Directive,
  ElementRef,
  Inject,
  Injectable,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { LAYOUT_VALUES } from '@ngbracket/ngx-layout/_private-utils';
import {
  BaseDirective2,
  ElementMatcher,
  LAYOUT_CONFIG,
  LayoutConfigOptions,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
  ɵmultiply as multiply,
} from '@ngbracket/ngx-layout/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface LayoutGapParent {
  items: HTMLElement[];
  layout: string;
}

const CLEAR_MARGIN_CSS = {
  'margin-inline-start': null,
  'margin-inline-end': null,
  'margin-block-start': null,
  'margin-block-end': null,
};

@Injectable({ providedIn: 'root' })
export class LayoutGapStyleBuilder extends StyleBuilder {
  constructor(
    private _styler: StyleUtils,
    @Inject(LAYOUT_CONFIG) private _config: LayoutConfigOptions,
  ) {
    super();
  }

  buildStyles(gapValue: string, parent: LayoutGapParent) {
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);

      // Add the margin to the host element
      return buildGridMargin(gapValue);
    } else {
      return {};
    }
  }

  override sideEffect(
    gapValue: string,
    _styles: StyleDefinition,
    parent: LayoutGapParent,
  ) {
    const items = parent.items;
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);
      // For each `element` children, set the padding
      const paddingStyles = buildGridPadding(gapValue);
      this._styler.applyStyleToElements(paddingStyles, parent.items);
    } else {
      gapValue = multiply(gapValue, this._config.multiplier);
      gapValue = this.addFallbackUnit(gapValue);

      const lastItem = items.pop()!;

      // For each `element` children EXCEPT the last,
      // set the margin right/bottom styles...
      const gapCss = buildGapCSS(gapValue, parent);
      this._styler.applyStyleToElements(gapCss, items);

      // Clear all gaps for all visible elements
      this._styler.applyStyleToElements(CLEAR_MARGIN_CSS, [lastItem]);
    }
  }

  private addFallbackUnit(value: string) {
    return !isNaN(+value) ? `${value}${this._config.defaultUnit}` : value;
  }
}

const inputs = [
  'fxLayoutGap',
  'fxLayoutGap.xs',
  'fxLayoutGap.sm',
  'fxLayoutGap.md',
  'fxLayoutGap.lg',
  'fxLayoutGap.xl',
  'fxLayoutGap.lt-sm',
  'fxLayoutGap.lt-md',
  'fxLayoutGap.lt-lg',
  'fxLayoutGap.lt-xl',
  'fxLayoutGap.gt-xs',
  'fxLayoutGap.gt-sm',
  'fxLayoutGap.gt-md',
  'fxLayoutGap.gt-lg',
];
const selector = `
  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],
  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],
  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],
  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]
`;

/**
 * 'layout-padding' styling directive
 *  Defines padding of child elements in a layout container
 */
@Directive({ inputs, selector })
export class LayoutGapDirective
  extends BaseDirective2
  implements AfterContentInit, OnDestroy
{
  protected layout = 'row'; // default flex-direction
  protected override DIRECTIVE_KEY = 'layout-gap';
  protected override inputs = inputs;
  protected observerSubject = new Subject<void>();

  /** Special accessor to query for all child 'element' nodes regardless of type, class, etc */
  protected get childrenNodes(): HTMLElement[] {
    const obj = this.nativeElement.children;
    const buffer: any[] = [];

    // iterate backwards ensuring that length is an UInt32
    for (let i = obj.length; i--; ) {
      buffer[i] = obj[i];
    }
    return buffer;
  }

  constructor(
    elRef: ElementRef,
    protected zone: NgZone,
    protected styleUtils: StyleUtils,
    styleBuilder: LayoutGapStyleBuilder,
    marshal: MediaMarshaller,
  ) {
    super(elRef, styleBuilder, styleUtils, marshal);
    const extraTriggers = [this.observerSubject.asObservable()];
    this.init(extraTriggers);
    this.marshal
      .trackValue(this.nativeElement, 'layout')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(this.onLayoutChange.bind(this));
  }

  // *********************************************
  // Lifecycle Methods
  // *********************************************

  ngAfterContentInit() {
    this.buildChildObservable();
    this.triggerUpdate();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // *********************************************
  // Protected methods
  // *********************************************

  /**
   * Cache the parent container 'flex-direction' and update the 'margin' styles
   */
  protected onLayoutChange(matcher: ElementMatcher) {
    const layout: string = matcher.value;

    // Make sure to filter out 'wrap' option
    let newDirection = layout.split(' ')[0];

    if (!LAYOUT_VALUES.find((x) => x === newDirection)) {
      newDirection = 'row';
    }

    // Clear the previous style before we change the layout
    if (this.layout && this.layout !== newDirection) {
      this.clearStyles();
    }

    this.layout = newDirection;
    this.triggerUpdate();
  }

  /**
   *
   */
  protected override updateWithValue(value: string) {
    // Gather all non-hidden Element nodes
    const items = this.childrenNodes
      .filter((el) => el.nodeType === 1 && this.willDisplay(el))
      .sort((a, b) => {
        const orderA = +this.styler.lookupStyle(a, 'order');
        const orderB = +this.styler.lookupStyle(b, 'order');
        if (isNaN(orderA) || isNaN(orderB) || orderA === orderB) {
          return 0;
        } else {
          return orderA > orderB ? 1 : -1;
        }
      });

    if (items.length > 0) {
      this.addStyles(value, { items, layout: this.layout });
    }
  }

  /** We need to override clearStyles because in most cases mru isn't populated */
  protected override clearStyles() {
    const gridMode = Object.keys(this.mru).length > 0;

    // If there are styles on the parent remove them
    if (gridMode) {
      super.clearStyles();

      // Then remove the children grid padding too
      this.styleUtils.applyStyleToElements(
        { 'padding-inline': '', 'padding-block': '' },
        this.childrenNodes,
      );
    } else {
      // Remove the children gap margin
      this.styleUtils.applyStyleToElements(
        { [getMarginType(this.layout)]: '' },
        this.childrenNodes,
      );
    }
  }

  /** Determine if an element will show or hide based on current activation */
  protected willDisplay(source: HTMLElement): boolean {
    const value = this.marshal.getValue(source, 'show-hide');
    return (
      value === true ||
      (value === undefined &&
        this.styleUtils.lookupStyle(source, 'display') !== 'none')
    );
  }

  protected buildChildObservable(): void {
    this.zone.runOutsideAngular(() => {
      if (typeof MutationObserver !== 'undefined') {
        this.observer = new MutationObserver((mutations: MutationRecord[]) => {
          const validatedChanges = (it: MutationRecord): boolean => {
            return (
              (it.addedNodes && it.addedNodes.length > 0) ||
              (it.removedNodes && it.removedNodes.length > 0)
            );
          };

          // update gap styles only for child 'added' or 'removed' events
          if (mutations.some(validatedChanges)) {
            this.observerSubject.next();
          }
        });
        this.observer.observe(this.nativeElement, { childList: true });
      }
    });
  }

  protected observer?: MutationObserver;
}

/**
 * @deprecated The DefaultLayoutGapDirective will be removed in version 21.
 * Use LayoutGapDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultLayoutGapDirective extends LayoutGapDirective {
  protected override inputs = inputs;
}

const GRID_SPECIFIER = ' grid';

function buildGridPadding(value: string): StyleDefinition {
  const [between, below] = value.split(' ');
  const bottom = below ?? between;

  // Use logical properties so the gap follows the writing direction
  // (e.g. `direction: rtl`) without inspecting the directionality.
  return {
    'padding-inline': `0px ${between}`,
    'padding-block': `0px ${bottom}`,
  };
}

function buildGridMargin(value: string): StyleDefinition {
  const [between, below] = value.split(' ');
  const bottom = below ?? between;
  const minus = (str: string) => `-${str}`;

  // Use logical properties so the gap follows the writing direction
  // (e.g. `direction: rtl`) without inspecting the directionality.
  return {
    'margin-inline': `0px ${minus(between)}`,
    'margin-block': `0px ${minus(bottom)}`,
  };
}

function getMarginType(layout: string) {
  switch (layout) {
    case 'column':
      return 'margin-block-end';
    case 'column-reverse':
      return 'margin-block-start';
    case 'row':
      return 'margin-inline-end';
    case 'row-reverse':
      return 'margin-inline-start';
    default:
      return 'margin-inline-end';
  }
}

function buildGapCSS(
  gapValue: string,
  parent: { layout: string },
): StyleDefinition {
  const key = getMarginType(parent.layout);
  const margins: { [key: string]: string | null } = { ...CLEAR_MARGIN_CSS };
  margins[key] = gapValue;
  return margins;
}
