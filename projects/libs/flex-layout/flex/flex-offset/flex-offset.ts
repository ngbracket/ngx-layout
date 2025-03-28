import { Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  ElementRef,
  Inject,
  Injectable,
  OnChanges,
} from '@angular/core';
import { isFlowHorizontal } from '@ngbracket/ngx-layout/_private-utils';
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
import { takeUntil } from 'rxjs/operators';

export interface FlexOffsetParent {
  layout: string;
  isRtl: boolean;
}

@Injectable({ providedIn: 'root' })
export class FlexOffsetStyleBuilder extends StyleBuilder {
  constructor(@Inject(LAYOUT_CONFIG) private _config: LayoutConfigOptions) {
    super();
  }

  buildStyles(offset: string, parent: FlexOffsetParent) {
    offset ||= '0';
    offset = multiply(offset, this._config.multiplier);
    const isPercent = String(offset).indexOf('%') > -1;
    const isPx = String(offset).indexOf('px') > -1;
    if (!isPx && !isPercent && !isNaN(+offset)) {
      offset = `${offset}%`;
    }
    const horizontalLayoutKey = parent.isRtl ? 'margin-right' : 'margin-left';
    const styles: StyleDefinition = isFlowHorizontal(parent.layout)
      ? { [horizontalLayoutKey]: offset }
      : { 'margin-top': offset };

    return styles;
  }
}

const inputs = [
  'fxFlexOffset',
  'fxFlexOffset.xs',
  'fxFlexOffset.sm',
  'fxFlexOffset.md',
  'fxFlexOffset.lg',
  'fxFlexOffset.xl',
  'fxFlexOffset.lt-sm',
  'fxFlexOffset.lt-md',
  'fxFlexOffset.lt-lg',
  'fxFlexOffset.lt-xl',
  'fxFlexOffset.gt-xs',
  'fxFlexOffset.gt-sm',
  'fxFlexOffset.gt-md',
  'fxFlexOffset.gt-lg',
];
const selector = `
  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],
  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],
  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],
  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]
`;

/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
@Directive({ inputs, selector })
export class FlexOffsetDirective extends BaseDirective2 implements OnChanges {
  protected override DIRECTIVE_KEY = 'flex-offset';
  protected override inputs = inputs;

  constructor(
    elRef: ElementRef,
    protected directionality: Directionality,
    styleBuilder: FlexOffsetStyleBuilder,
    marshal: MediaMarshaller,
    styler: StyleUtils,
  ) {
    super(elRef, styleBuilder, styler, marshal);
    this.init([this.directionality.change]);
    // Parent DOM `layout-gap` with affect the nested child with `flex-offset`
    if (this.parentElement) {
      this.marshal
        .trackValue(this.parentElement, 'layout-gap')
        .pipe(takeUntil(this.destroySubject))
        .subscribe(this.triggerUpdate.bind(this));
    }
  }

  // *********************************************
  // Protected methods
  // *********************************************

  /**
   * Using the current fxFlexOffset value, update the inline CSS
   * NOTE: this will assign `margin-left` if the parent flex-direction == 'row',
   *       otherwise `margin-top` is used for the offset.
   */
  protected override updateWithValue(value: string | number = ''): void {
    // The flex-direction of this element's flex container. Defaults to 'row'.
    const layout = this.getFlexFlowDirection(this.parentElement!, true);
    const isRtl = this.directionality.value === 'rtl';
    if (layout === 'row' && isRtl) {
      this.styleCache = flexOffsetCacheRowRtl;
    } else if (layout === 'row' && !isRtl) {
      this.styleCache = flexOffsetCacheRowLtr;
    } else if (layout === 'column' && isRtl) {
      this.styleCache = flexOffsetCacheColumnRtl;
    } else if (layout === 'column' && !isRtl) {
      this.styleCache = flexOffsetCacheColumnLtr;
    }
    this.addStyles(value + '', { layout, isRtl });
  }
}

/**
 * @deprecated The DefaultFlexOffsetDirective will be removed in version 21.
 * Use FlexOffsetDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultFlexOffsetDirective extends FlexOffsetDirective {
  protected override inputs = inputs;
}

const flexOffsetCacheRowRtl: Map<string, StyleDefinition> = new Map();
const flexOffsetCacheColumnRtl: Map<string, StyleDefinition> = new Map();
const flexOffsetCacheRowLtr: Map<string, StyleDefinition> = new Map();
const flexOffsetCacheColumnLtr: Map<string, StyleDefinition> = new Map();
