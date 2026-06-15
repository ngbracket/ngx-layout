import { Directive, ElementRef, Inject, Injectable } from '@angular/core';
import {
  BaseDirective2,
  LAYOUT_CONFIG,
  LayoutConfigOptions,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
  ɵmultiply as multiply,
} from '@ngbracket/ngx-layout/core';

@Injectable({ providedIn: 'root' })
export class LayoutGapStyleBuilder extends StyleBuilder {
  constructor(@Inject(LAYOUT_CONFIG) private _config: LayoutConfigOptions) {
    super();
  }

  buildStyles(gapValue: string): StyleDefinition {
    // The ' grid' specifier is retained for backwards compatibility, but is no
    // longer meaningful: the CSS `gap` property already spaces items within and
    // between wrapped rows, which is what grid mode previously emulated with
    // negative margins and child padding.
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
    }

    gapValue = gapValue.trim();
    if (!gapValue) {
      return {};
    }

    return { gap: this.computeGap(gapValue) };
  }

  /**
   * `gapValue` may contain one or two space-separated tokens, mapped directly to
   * the CSS `gap` shorthand (`<row-gap> <column-gap>`). The multiplier and the
   * default unit are applied to each token independently.
   */
  private computeGap(gapValue: string): string {
    return gapValue
      .split(' ')
      .filter((token) => token !== '')
      .map((token) =>
        this.addFallbackUnit(multiply(token, this._config.multiplier)),
      )
      .join(' ');
  }

  private addFallbackUnit(value: string): string {
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
 * 'layout-gap' styling directive
 *  Defines the spacing between child elements of a flex container using the
 *  native CSS `gap` property. The gap is applied to the container itself, so it
 *  spaces items both within a row/column and between wrapped rows.
 */
@Directive({ inputs, selector })
export class LayoutGapDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'layout-gap';
  protected override inputs = inputs;

  constructor(
    elRef: ElementRef,
    styler: StyleUtils,
    styleBuilder: LayoutGapStyleBuilder,
    marshal: MediaMarshaller,
  ) {
    super(elRef, styleBuilder, styler, marshal);
    this.init();
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

const GRID_SPECIFIER = ' grid';
