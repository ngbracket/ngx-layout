
import { Inject, Injectable, NgZone, PLATFORM_ID, DOCUMENT } from '@angular/core';
import {
  BreakPoint,
  BREAKPOINTS,
  LAYOUT_CONFIG,
  LayoutConfigOptions,
  ɵMatchMedia as MatchMedia,
} from '@ngbracket/ngx-layout/core';

/**
 * Special server-only class to simulate a MediaQueryList and
 * - supports manual activation to simulate mediaQuery matching
 * - manages listeners
 */
export class ServerMediaQueryList
  extends EventTarget
  implements MediaQueryList
{
  private _listeners: MediaQueryListListener[] = [];

  get matches(): boolean {
    return this._isActive;
  }

  get media(): string {
    return this._mediaQuery;
  }

  constructor(
    private _mediaQuery: string,
    private _isActive = false,
  ) {
    super();
  }

  /**
   * Destroy the current list by deactivating the
   * listeners and clearing the internal list
   */
  destroy() {
    this.deactivate();
    this._listeners = [];
  }

  /** Notify all listeners that 'matches === TRUE' */
  activate(): ServerMediaQueryList {
    if (!this._isActive) {
      this._isActive = true;
      this._listeners.forEach((callback) => {
        const cb: (this: MediaQueryList, ev: MediaQueryListEvent) => any =
          callback!;
        cb.call(this, {
          matches: this.matches,
          media: this.media,
        } as MediaQueryListEvent);
      });
    }
    return this;
  }

  /** Notify all listeners that 'matches === false' */
  deactivate(): ServerMediaQueryList {
    if (this._isActive) {
      this._isActive = false;
      this._listeners.forEach((callback) => {
        const cb: (this: MediaQueryList, ev: MediaQueryListEvent) => any =
          callback!;
        cb.call(this, {
          matches: this.matches,
          media: this.media,
        } as MediaQueryListEvent);
      });
    }
    return this;
  }

  /** Add a listener to our internal list to activate later */
  addListener(listener: MediaQueryListListener) {
    if (this._listeners.indexOf(listener) === -1) {
      this._listeners.push(listener);
    }
    if (this._isActive) {
      const cb: (this: MediaQueryList, ev: MediaQueryListEvent) => any =
        listener!;
      cb.call(this, {
        matches: this.matches,
        media: this.media,
      } as MediaQueryListEvent);
    }
  }

  /** Don't need to remove listeners in the server environment */
  removeListener() {}

  override addEventListener() {}

  override removeEventListener() {}

  override dispatchEvent(_: Event): boolean {
    return false;
  }

  onchange: MediaQueryListListener = null;
}

/**
 * Special server-only implementation of MatchMedia that uses the above
 * ServerMediaQueryList as its internal representation
 *
 * Also contains methods to activate and deactivate breakpoints
 */
@Injectable()
export class ServerMatchMedia extends MatchMedia {
  private _activeBreakpoints: BreakPoint[] = [];

  constructor(
    protected override _zone: NgZone,
    @Inject(PLATFORM_ID) protected override _platformId: Object,
    @Inject(DOCUMENT) protected override _document: any,
    @Inject(BREAKPOINTS) protected breakpoints: BreakPoint[],
    @Inject(LAYOUT_CONFIG) protected layoutConfig: LayoutConfigOptions,
  ) {
    super(_zone, _platformId, _document);

    const serverBps = layoutConfig.ssrObserveBreakpoints;
    if (serverBps) {
      this._activeBreakpoints = serverBps.reduce(
        (acc: BreakPoint[], serverBp: string) => {
          const foundBp = breakpoints.find((bp) => serverBp === bp.alias);
          if (!foundBp) {
            console.warn(
              `FlexLayoutServerModule: unknown breakpoint alias "${serverBp}"`,
            );
          } else {
            acc.push(foundBp);
          }
          return acc;
        },
        [],
      );
    }
  }

  /** Activate the specified breakpoint if we're on the server, no-op otherwise */
  activateBreakpoint(bp: BreakPoint) {
    const lookupBreakpoint = this.registry.get(
      bp.mediaQuery,
    ) as ServerMediaQueryList;
    if (lookupBreakpoint) {
      lookupBreakpoint.activate();
    }
  }

  /** Deactivate the specified breakpoint if we're on the server, no-op otherwise */
  deactivateBreakpoint(bp: BreakPoint) {
    const lookupBreakpoint = this.registry.get(
      bp.mediaQuery,
    ) as ServerMediaQueryList;
    if (lookupBreakpoint) {
      lookupBreakpoint.deactivate();
    }
  }

  /**
   * Call window.matchMedia() to build a MediaQueryList; which
   * supports 0..n listeners for activation/deactivation
   */
  protected override buildMQL(query: string): ServerMediaQueryList {
    const isActive = this._activeBreakpoints.some(
      (ab) => ab.mediaQuery === query,
    );

    return new ServerMediaQueryList(query, isActive);
  }
}

type MediaQueryListListener =
  | ((this: MediaQueryList, ev: MediaQueryListEvent) => any)
  | null;
