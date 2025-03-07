import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Injectable, Input } from '@angular/core';
import {
  BaseDirective2,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

const DEFAULT_MAIN = 'start';
const DEFAULT_CROSS = 'stretch';

export interface GridAlignRowsParent {
  inline: boolean;
}

@Injectable({ providedIn: 'root' })
export class GridAlignRowsStyleBuilder extends StyleBuilder {
  buildStyles(input: string, parent: GridAlignRowsParent) {
    return buildCss(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
  }
}

const inputs = [
  'gdAlignRows',
  'gdAlignRows.xs',
  'gdAlignRows.sm',
  'gdAlignRows.md',
  'gdAlignRows.lg',
  'gdAlignRows.xl',
  'gdAlignRows.lt-sm',
  'gdAlignRows.lt-md',
  'gdAlignRows.lt-lg',
  'gdAlignRows.lt-xl',
  'gdAlignRows.gt-xs',
  'gdAlignRows.gt-sm',
  'gdAlignRows.gt-md',
  'gdAlignRows.gt-lg',
];
const selector = `
  [gdAlignRows],
  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],
  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],
  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],
  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],
  [gdAlignRows.gt-lg]
`;

@Directive({ selector, inputs })
export class GridAlignRowsDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'grid-align-rows';

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
    styleBuilder: GridAlignRowsStyleBuilder,
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
    this.styleCache = this.inline ? alignRowsInlineCache : alignRowsCache;
    this.addStyles(value, { inline: this.inline });
  }
}

const alignRowsCache: Map<string, StyleDefinition> = new Map();
const alignRowsInlineCache: Map<string, StyleDefinition> = new Map();

/**
 * 'row alignment' CSS Grid styling directive
 * Configures the alignment in the row direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-18
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-20
 */
/**
 * @deprecated The DefaultGridAlignRowsDirective will be removed in version 21.
 * Use GridAlignRowsDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultGridAlignRowsDirective extends GridAlignRowsDirective {
  protected override inputs = inputs;
}

function buildCss(align: string, inline: boolean): StyleDefinition {
  const css: { [key: string]: string } = {},
    [mainAxis, crossAxis] = align.split(' ');

  // Main axis
  switch (mainAxis) {
    case 'center':
    case 'space-around':
    case 'space-between':
    case 'space-evenly':
    case 'end':
    case 'start':
    case 'stretch':
      css['justify-content'] = mainAxis;
      break;
    default: // default main axis
      css['justify-content'] = DEFAULT_MAIN;
      break;
  }

  // Cross-axis
  switch (crossAxis) {
    case 'start':
    case 'center':
    case 'end':
    case 'stretch':
      css['justify-items'] = crossAxis;
      break;
    default: // 'stretch'
      // default cross axis
      css['justify-items'] = DEFAULT_CROSS;
      break;
  }

  css['display'] = inline ? 'inline-grid' : 'grid';

  return css;
}
