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
export class GridRowStyleBuilder extends StyleBuilder {
  buildStyles(input: string) {
    return { 'grid-row': input || DEFAULT_VALUE };
  }
}

const inputs = [
  'gdRow',
  'gdRow.xs',
  'gdRow.sm',
  'gdRow.md',
  'gdRow.lg',
  'gdRow.xl',
  'gdRow.lt-sm',
  'gdRow.lt-md',
  'gdRow.lt-lg',
  'gdRow.lt-xl',
  'gdRow.gt-xs',
  'gdRow.gt-sm',
  'gdRow.gt-md',
  'gdRow.gt-lg',
];

const selector = `
  [gdRow],
  [gdRow.xs], [gdRow.sm], [gdRow.md], [gdRow.lg], [gdRow.xl],
  [gdRow.lt-sm], [gdRow.lt-md], [gdRow.lt-lg], [gdRow.lt-xl],
  [gdRow.gt-xs], [gdRow.gt-sm], [gdRow.gt-md], [gdRow.gt-lg]
`;

@Directive({ selector, inputs })
export class GridRowDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'grid-row';

  constructor(
    elementRef: ElementRef,
    styleBuilder: GridRowStyleBuilder,
    styler: StyleUtils,
    marshal: MediaMarshaller
  ) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }

  protected override styleCache = rowCache;
}

const rowCache: Map<string, StyleDefinition> = new Map();

/**
 * 'grid-row' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-26
 */
/**
 * @deprecated The DefaultGridRowDirective will be removed in version 21.
 * Use GridRowDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultGridRowDirective extends GridRowDirective {
  protected override inputs = inputs;
}
