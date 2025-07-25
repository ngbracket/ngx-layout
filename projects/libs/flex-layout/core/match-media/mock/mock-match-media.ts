
import { Inject, Injectable, NgZone, PLATFORM_ID, DOCUMENT } from '@angular/core';

import { BreakPointRegistry } from '../../breakpoints/break-point-registry';
import { MatchMedia } from '../match-media';

/**
 * MockMatchMedia mocks calls to the Window API matchMedia with a build of a simulated
 * MockMediaQueryListener. Methods are available to simulate an activation of a mediaQuery
 * range and to clearAll mediaQuery listeners.
 */
@Injectable()
export class MockMatchMedia extends MatchMedia {
  autoRegisterQueries = true; // Used for testing BreakPoint registrations
  useOverlaps = false; // Allow fallback to overlapping mediaQueries

  constructor(
    _zone: NgZone,
    @Inject(PLATFORM_ID) _platformId: Object,
    @Inject(DOCUMENT) public override _document: any,
    private _breakpoints: BreakPointRegistry,
  ) {
    super(_zone, _platformId, _document);
  }

  /** Easy method to clear all listeners for all mediaQueries */
  clearAll() {
    this.registry.forEach((mql: MediaQueryList) => {
      (mql as MockMediaQueryList).destroy();
    });
    this.registry.clear();
    this.useOverlaps = false;
  }

  /** Feature to support manual, simulated activation of a mediaQuery. */
  activate(mediaQuery: string, useOverlaps = this.useOverlaps): boolean {
    mediaQuery = this._validateQuery(mediaQuery);

    if (useOverlaps || !this.isActive(mediaQuery)) {
      this._deactivateAll();

      this._registerMediaQuery(mediaQuery);
      this._activateWithOverlaps(mediaQuery, useOverlaps);
    }

    return this.hasActivated;
  }

  setNonce(nonce: string | null) {
    super._nonce = nonce;
  }
  /** Converts an optional mediaQuery alias to a specific, valid mediaQuery */
  _validateQuery(queryOrAlias: string): string {
    const bp = this._breakpoints.findByAlias(queryOrAlias);
    return bp?.mediaQuery ?? queryOrAlias;
  }

  /**
   * Manually onMediaChange any overlapping mediaQueries to simulate
   * similar functionality in the window.matchMedia()
   */
  private _activateWithOverlaps(
    mediaQuery: string,
    useOverlaps: boolean,
  ): boolean {
    if (useOverlaps) {
      const bp = this._breakpoints.findByQuery(mediaQuery);
      const alias = bp?.alias ?? 'unknown';

      // Simulate activation of overlapping lt-<XXX> ranges
      switch (alias) {
        case 'lg':
          this._activateByAlias(['lt-xl']);
          break;
        case 'md':
          this._activateByAlias(['lt-xl', 'lt-lg']);
          break;
        case 'sm':
          this._activateByAlias(['lt-xl', 'lt-lg', 'lt-md']);
          break;
        case 'xs':
          this._activateByAlias(['lt-xl', 'lt-lg', 'lt-md', 'lt-sm']);
          break;
      }

      // Simulate activation of overlapping gt-<xxxx> mediaQuery ranges
      switch (alias) {
        case 'xl':
          this._activateByAlias(['gt-lg', 'gt-md', 'gt-sm', 'gt-xs']);
          break;
        case 'lg':
          this._activateByAlias(['gt-md', 'gt-sm', 'gt-xs']);
          break;
        case 'md':
          this._activateByAlias(['gt-sm', 'gt-xs']);
          break;
        case 'sm':
          this._activateByAlias(['gt-xs']);
          break;
      }
    }

    // Activate last since the responsiveActivation is watching *this* mediaQuery
    return this._activateByQuery(mediaQuery);
  }

  /**
   *
   */
  private _activateByAlias(aliases: string[]) {
    const activate = (alias: string) => {
      const bp = this._breakpoints.findByAlias(alias);
      this._activateByQuery(bp?.mediaQuery ?? alias);
    };
    aliases.forEach(activate);
  }

  /**
   *
   */
  private _activateByQuery(mediaQuery: string) {
    if (!this.registry.has(mediaQuery) && this.autoRegisterQueries) {
      this._registerMediaQuery(mediaQuery);
    }
    const mql: MockMediaQueryList = this.registry.get(
      mediaQuery,
    ) as MockMediaQueryList;

    if (mql && !this.isActive(mediaQuery)) {
      this.registry.set(mediaQuery, mql.activate());
    }
    return this.hasActivated;
  }

  /** Deactivate all current MQLs and reset the buffer */
  private _deactivateAll() {
    this.registry.forEach((it: MediaQueryList) => {
      (it as MockMediaQueryList).deactivate();
    });
    return this;
  }

  /** Insure the mediaQuery is registered with MatchMedia */
  private _registerMediaQuery(mediaQuery: string) {
    if (!this.registry.has(mediaQuery) && this.autoRegisterQueries) {
      this.registerQuery(mediaQuery);
    }
  }

  /**
   * Call window.matchMedia() to build a MediaQueryList; which
   * supports 0..n listeners for activation/deactivation
   */
  protected override buildMQL(query: string): MediaQueryList {
    return new MockMediaQueryList(query);
  }

  protected get hasActivated() {
    return this.activations.length > 0;
  }
}

/**
 * Special internal class to simulate a MediaQueryList and
 * - supports manual activation to simulate mediaQuery matching
 * - manages listeners
 */
export class MockMediaQueryList extends EventTarget implements MediaQueryList {
  private _isActive = false;
  private _listeners: MediaQueryListListener[] = [];

  get matches(): boolean {
    return this._isActive;
  }

  get media(): string {
    return this._mediaQuery;
  }

  constructor(private _mediaQuery: string) {
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
  activate(): MockMediaQueryList {
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
  deactivate(): MockMediaQueryList {
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

  /** Don't need to remove listeners in the testing environment */
  removeListener(_: MediaQueryListListener | null) {}

  override dispatchEvent(_: Event): boolean {
    return false;
  }

  onchange: MediaQueryListListener = null;
}

/**
 * Pre-configured provider for MockMatchMedia
 */
// tslint:disable-next-line:variable-name
export const MockMatchMediaProvider = {
  provide: MatchMedia,
  useClass: MockMatchMedia,
};

type MediaQueryListListener =
  | ((this: MediaQueryList, ev: MediaQueryListEvent) => any)
  | null;
