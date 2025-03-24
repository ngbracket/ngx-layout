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

export interface GridRowsParent {
  inline: boolean;
}

@Injectable({ providedIn: 'root' })
export class GridRowsStyleBuilder extends StyleBuilder {
  buildStyles(input: string, parent: GridRowsParent) {
    input = input || DEFAULT_VALUE;
    let auto = false;
    if (input.endsWith(AUTO_SPECIFIER)) {
      input = input.substring(0, input.indexOf(AUTO_SPECIFIER));
      auto = true;
    }

    const css = {
      display: parent.inline ? 'inline-grid' : 'grid',
      'grid-auto-rows': '',
      'grid-template-rows': '',
    };
    const key = auto ? 'grid-auto-rows' : 'grid-template-rows';
    css[key] = input;

    return css;
  }
}

const inputs = [
  'gdRows',
  'gdRows.xs',
  'gdRows.sm',
  'gdRows.md',
  'gdRows.lg',
  'gdRows.xl',
  'gdRows.lt-sm',
  'gdRows.lt-md',
  'gdRows.lt-lg',
  'gdRows.lt-xl',
  'gdRows.gt-xs',
  'gdRows.gt-sm',
  'gdRows.gt-md',
  'gdRows.gt-lg',
];

const selector = `
  [gdRows],
  [gdRows.xs], [gdRows.sm], [gdRows.md], [gdRows.lg], [gdRows.xl],
  [gdRows.lt-sm], [gdRows.lt-md], [gdRows.lt-lg], [gdRows.lt-xl],
  [gdRows.gt-xs], [gdRows.gt-sm], [gdRows.gt-md], [gdRows.gt-lg]
`;

@Directive({ selector, inputs })
export class GridRowsDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'grid-rows';
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
    styleBuilder: GridRowsStyleBuilder,
    styler: StyleUtils,
    marshal: MediaMarshaller,
  ) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }

  // *********************************************
  // Protected methods
  // *********************************************

  protected override updateWithValue(value: string) {
    this.styleCache = this.inline ? rowsInlineCache : rowsCache;
    this.addStyles(value, { inline: this.inline });
  }
}

const rowsCache: Map<string, StyleDefinition> = new Map();
const rowsInlineCache: Map<string, StyleDefinition> = new Map();

/**
 * 'grid-template-rows' CSS Grid styling directive
 * Configures the sizing for the rows in the grid
 * Syntax: <column value> [auto]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13
 */
/**
 * @deprecated The DefaultGridRowsDirective will be removed in version 21.
 * Use GridRowsDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultGridRowsDirective extends GridRowsDirective {
  protected override inputs = inputs;
}
