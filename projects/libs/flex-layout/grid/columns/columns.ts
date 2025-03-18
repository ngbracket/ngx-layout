import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Injectable, Input } from '@angular/core';
import {
  BaseDirective2,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

const DEFAULT_VALUE = 'none';
const AUTO_SPECIFIER = '!';

export interface GridColumnsParent {
  inline: boolean;
}

@Injectable({ providedIn: 'root' })
export class GridColumnsStyleBuilder extends StyleBuilder {
  buildStyles(input: string, parent: GridColumnsParent) {
    input = input || DEFAULT_VALUE;
    let auto = false;
    if (input.endsWith(AUTO_SPECIFIER)) {
      input = input.substring(0, input.indexOf(AUTO_SPECIFIER));
      auto = true;
    }

    const css = {
      display: parent.inline ? 'inline-grid' : 'grid',
      'grid-auto-columns': '',
      'grid-template-columns': '',
    };
    const key = auto ? 'grid-auto-columns' : 'grid-template-columns';
    css[key] = input;

    return css;
  }
}

const inputs = [
  'gdColumns',
  'gdColumns.xs',
  'gdColumns.sm',
  'gdColumns.md',
  'gdColumns.lg',
  'gdColumns.xl',
  'gdColumns.lt-sm',
  'gdColumns.lt-md',
  'gdColumns.lt-lg',
  'gdColumns.lt-xl',
  'gdColumns.gt-xs',
  'gdColumns.gt-sm',
  'gdColumns.gt-md',
  'gdColumns.gt-lg',
];

const selector = `
  [gdColumns],
  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],
  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],
  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]
`;

@Directive({ selector, inputs })
export class GridColumnsDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'grid-columns';
  protected override inputs = inputs;

  @Input('gdInline')
  get inline(): boolean {
    return this._inline;
  }
  set inline(val: boolean) {
    this._inline = coerceBooleanProperty(val);
  }
  protected _inline = false;

  constructor(
    elementRef: ElementRef,
    styleBuilder: GridColumnsStyleBuilder,
    styler: StyleUtils,
    marshal: MediaMarshaller
  ) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }

  // *********************************************
  // Protected methods
  // *********************************************

  protected override updateWithValue(value: string) {
    this.styleCache = this.inline ? columnsInlineCache : columnsCache;
    this.addStyles(value, { inline: this.inline });
  }
}

const columnsCache: Map<string, StyleDefinition> = new Map();
const columnsInlineCache: Map<string, StyleDefinition> = new Map();

/**
 * 'grid-template-columns' CSS Grid styling directive
 * Configures the sizing for the columns in the grid
 * Syntax: <column value> [auto]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13
 */
/**
 * @deprecated The DefaultGridColumnsDirective will be removed in version 21.
 * Use GridColumnsDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultGridColumnsDirective extends GridColumnsDirective {
  protected override inputs = inputs;
}
