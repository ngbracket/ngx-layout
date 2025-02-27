import { Directive, ElementRef, Injectable, OnChanges } from '@angular/core';
import {
  BaseDirective2,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

@Injectable({ providedIn: 'root' })
export class FlexOrderStyleBuilder extends StyleBuilder {
  buildStyles(value: string) {
    return { order: (value && parseInt(value, 10)) || '' };
  }
}

const inputs = [
  'fxFlexOrder',
  'fxFlexOrder.xs',
  'fxFlexOrder.sm',
  'fxFlexOrder.md',
  'fxFlexOrder.lg',
  'fxFlexOrder.xl',
  'fxFlexOrder.lt-sm',
  'fxFlexOrder.lt-md',
  'fxFlexOrder.lt-lg',
  'fxFlexOrder.lt-xl',
  'fxFlexOrder.gt-xs',
  'fxFlexOrder.gt-sm',
  'fxFlexOrder.gt-md',
  'fxFlexOrder.gt-lg',
];
const selector = `
  [fxFlexOrder], [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md],
  [fxFlexOrder.lg], [fxFlexOrder.xl], [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md],
  [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl], [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm],
  [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]
`;

/**
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
@Directive()
export class FlexOrderDirective extends BaseDirective2 implements OnChanges {
  protected override DIRECTIVE_KEY = 'flex-order';

  constructor(
    elRef: ElementRef,
    styleUtils: StyleUtils,
    styleBuilder: FlexOrderStyleBuilder,
    marshal: MediaMarshaller
  ) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }

  protected override styleCache = flexOrderCache;

  override updateWithValue(input: string) {
    super.updateWithValue(input);

    if (this.parentElement) {
      this.marshal.triggerUpdate(this.parentElement, 'layout-gap');
    }
  }
}

const flexOrderCache: Map<string, StyleDefinition> = new Map();
/**
 * @deprecated The DefaultFlexOrderDirective will be removed in version 21.
 * Use FlexOrderDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultFlexOrderDirective extends FlexOrderDirective {
  protected override inputs = inputs;
}
