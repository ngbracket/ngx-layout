import { Directive, ElementRef, Injectable } from '@angular/core';
import {
  BaseDirective2,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

const DEFAULT_VALUE = 'auto';

@Injectable({ providedIn: 'root' })
export class GridColumnStyleBuilder extends StyleBuilder {
  buildStyles(input: string) {
    return { 'grid-column': input || DEFAULT_VALUE };
  }
}

const inputs = [
  'gdColumn',
  'gdColumn.xs',
  'gdColumn.sm',
  'gdColumn.md',
  'gdColumn.lg',
  'gdColumn.xl',
  'gdColumn.lt-sm',
  'gdColumn.lt-md',
  'gdColumn.lt-lg',
  'gdColumn.lt-xl',
  'gdColumn.gt-xs',
  'gdColumn.gt-sm',
  'gdColumn.gt-md',
  'gdColumn.gt-lg',
];

const selector = `
  [gdColumn],
  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],
  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],
  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]
`;

@Directive({ selector, inputs })
export class GridColumnDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'grid-column';
  protected override inputs = inputs;

  constructor(
    elementRef: ElementRef,
    styleBuilder: GridColumnStyleBuilder,
    styler: StyleUtils,
    marshal: MediaMarshaller,
  ) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }

  protected override styleCache = columnCache;
}

const columnCache: Map<string, StyleDefinition> = new Map();

/**
 * 'grid-column' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-26
 */
/**
 * @deprecated The DefaultGridColumnDirective will be removed in version 21.
 * Use GridColumnDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultGridColumnDirective extends GridColumnDirective {
  protected override inputs = inputs;
}
