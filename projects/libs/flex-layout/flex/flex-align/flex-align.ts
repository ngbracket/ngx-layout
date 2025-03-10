import { Directive, ElementRef, Injectable } from '@angular/core';
import {
  BaseDirective2,
  MediaMarshaller,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

@Injectable({ providedIn: 'root' })
export class FlexAlignStyleBuilder extends StyleBuilder {
  buildStyles(input: string) {
    input = input || 'stretch';
    const styles: StyleDefinition = {};

    // Cross-axis
    switch (input) {
      case 'start':
        styles['align-self'] = 'flex-start';
        break;
      case 'end':
        styles['align-self'] = 'flex-end';
        break;
      default:
        styles['align-self'] = input;
        break;
    }

    return styles;
  }
}

const inputs = [
  'fxFlexAlign',
  'fxFlexAlign.xs',
  'fxFlexAlign.sm',
  'fxFlexAlign.md',
  'fxFlexAlign.lg',
  'fxFlexAlign.xl',
  'fxFlexAlign.lt-sm',
  'fxFlexAlign.lt-md',
  'fxFlexAlign.lt-lg',
  'fxFlexAlign.lt-xl',
  'fxFlexAlign.gt-xs',
  'fxFlexAlign.gt-sm',
  'fxFlexAlign.gt-md',
  'fxFlexAlign.gt-lg',
];
const selector = `
  [fxFlexAlign], [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md],
  [fxFlexAlign.lg], [fxFlexAlign.xl], [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md],
  [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl], [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm],
  [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]
`;

/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
@Directive({ inputs, selector })
export class FlexAlignDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'flex-align';
  protected override inputs = inputs;

  constructor(
    elRef: ElementRef,
    styleUtils: StyleUtils,
    styleBuilder: FlexAlignStyleBuilder,
    marshal: MediaMarshaller
  ) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }

  protected override styleCache = flexAlignCache;
}

const flexAlignCache: Map<string, StyleDefinition> = new Map();

/**
 * @deprecated The DefaultFlexAlignDirective will be removed in version 21.
 * Use FlexAlignDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultFlexAlignDirective extends FlexAlignDirective {
  protected override inputs = inputs;
}
