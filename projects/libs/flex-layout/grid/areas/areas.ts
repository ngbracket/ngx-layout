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
const DELIMETER = '|';

export interface GridAreasParent {
  inline: boolean;
}

@Injectable({ providedIn: 'root' })
export class GridAreasStyleBuiler extends StyleBuilder {
  buildStyles(input: string, parent: GridAreasParent) {
    const areas = (input || DEFAULT_VALUE)
      .split(DELIMETER)
      .map((v) => `"${v.trim()}"`);

    return {
      display: parent.inline ? 'inline-grid' : 'grid',
      'grid-template-areas': areas.join(' '),
    };
  }
}

const inputs = [
  'gdAreas',
  'gdAreas.xs',
  'gdAreas.sm',
  'gdAreas.md',
  'gdAreas.lg',
  'gdAreas.xl',
  'gdAreas.lt-sm',
  'gdAreas.lt-md',
  'gdAreas.lt-lg',
  'gdAreas.lt-xl',
  'gdAreas.gt-xs',
  'gdAreas.gt-sm',
  'gdAreas.gt-md',
  'gdAreas.gt-lg',
];

const selector = `
  [gdAreas],
  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],
  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],
  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]
`;

@Directive({ selector, inputs })
export class GridAreasDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'grid-areas';

  @Input('gdInline')
  get inline(): boolean {
    return this._inline;
  }
  set inline(val: boolean) {
    this._inline = coerceBooleanProperty(val);
  }
  protected _inline = false;

  constructor(
    elRef: ElementRef,
    styleUtils: StyleUtils,
    styleBuilder: GridAreasStyleBuiler,
    marshal: MediaMarshaller
  ) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }

  // *********************************************
  // Protected methods
  // *********************************************

  protected override updateWithValue(value: string) {
    this.styleCache = this.inline ? areasInlineCache : areasCache;
    this.addStyles(value, { inline: this.inline });
  }
}

const areasCache: Map<string, StyleDefinition> = new Map();
const areasInlineCache: Map<string, StyleDefinition> = new Map();

/**
 * 'grid-template-areas' CSS Grid styling directive
 * Configures the names of elements within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-14
 */
/**
 * @deprecated The DefaultGridAreasDirective will be removed in version 21.
 * Use GridAreasDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultGridAreasDirective extends GridAreasDirective {
  protected override inputs = inputs;
}
