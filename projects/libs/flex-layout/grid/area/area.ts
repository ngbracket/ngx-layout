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
export class GridAreaStyleBuilder extends StyleBuilder {
  buildStyles(input: string) {
    return { 'grid-area': input || DEFAULT_VALUE };
  }
}


const inputs = [
  'gdArea',
  'gdArea.xs',
  'gdArea.sm',
  'gdArea.md',
  'gdArea.lg',
  'gdArea.xl',
  'gdArea.lt-sm',
  'gdArea.lt-md',
  'gdArea.lt-lg',
  'gdArea.lt-xl',
  'gdArea.gt-xs',
  'gdArea.gt-sm',
  'gdArea.gt-md',
  'gdArea.gt-lg',
];
const selector = `
  [gdArea],
  [gdArea.xs], [gdArea.sm], [gdArea.md], [gdArea.lg], [gdArea.xl],
  [gdArea.lt-sm], [gdArea.lt-md], [gdArea.lt-lg], [gdArea.lt-xl],
  [gdArea.gt-xs], [gdArea.gt-sm], [gdArea.gt-md], [gdArea.gt-lg]
`;

@Directive({ inputs, selector })
export class GridAreaDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'grid-area';

  constructor(
    elRef: ElementRef,
    styleUtils: StyleUtils,
    styleBuilder: GridAreaStyleBuilder,
    marshal: MediaMarshaller
  ) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }

  protected override styleCache = gridAreaCache;
}

const gridAreaCache: Map<string, StyleDefinition> = new Map();

/**
 * 'grid-area' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-27
 */
/**
 * @deprecated The DefaultGridAreaDirective will be removed in version 21.
 * Use GridAreaDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultGridAreaDirective extends GridAreaDirective {
  protected override inputs = inputs;
}
