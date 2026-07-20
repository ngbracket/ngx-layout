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
}

const GRID_SPECIFIER = ' grid';
