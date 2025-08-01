import { NgClass } from '@angular/common';
import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import {
  BaseDirective2,
  MediaMarshaller,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';
const inputs = [
  'ngClass',
  'ngClass.xs',
  'ngClass.sm',
  'ngClass.md',
  'ngClass.lg',
  'ngClass.xl',
  'ngClass.lt-sm',
  'ngClass.lt-md',
  'ngClass.lt-lg',
  'ngClass.lt-xl',
  'ngClass.gt-xs',
  'ngClass.gt-sm',
  'ngClass.gt-md',
  'ngClass.gt-lg',
];

const selector = `
  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],
  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],
  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]
`;
@Directive({ selector, inputs })
export class ClassDirective extends BaseDirective2 implements DoCheck {
  protected override DIRECTIVE_KEY = 'ngClass';
  protected override inputs = inputs;

  /**
   * Capture class assignments so we cache the default classes
   * which are merged with activated styles and used as fallbacks.
   */
  @Input('class')
  set klass(val: string) {
    this.ngClassInstance.klass = val;
    this.setValue(val, '');
  }

  constructor(
    elementRef: ElementRef,
    styler: StyleUtils,
    marshal: MediaMarshaller,
    renderer2: Renderer2,
    @Optional() @Self() protected readonly ngClassInstance: NgClass,
  ) {
    super(elementRef, null!, styler, marshal);
    if (!this.ngClassInstance) {
      // Create an instance NgClass Directive instance only if `ngClass=""` has NOT been defined on
      // the same host element; since the responsive variations may be defined...
      this.ngClassInstance = new NgClass(elementRef, renderer2);
    }
    this.init();
    this.setValue('', '');
  }

  protected override updateWithValue(value: any) {
    this.ngClassInstance.ngClass = value;
    this.ngClassInstance.ngDoCheck();
  }

  // ******************************************************************
  // Lifecycle Hooks
  // ******************************************************************

  /**
   * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
   */
  ngDoCheck() {
    this.ngClassInstance.ngDoCheck();
  }
}

/**
 * Directive to add responsive support for ngClass.
 * This maintains the core functionality of 'ngClass' and adds responsive API
 * Note: this class is a no-op when rendered on the server
 * *  @deprecated The DefaultClassDirective will be removed in version 21.
 * Use ClassDirective directly instead.
 */
@Directive({ selector, inputs })
export class DefaultClassDirective extends ClassDirective {
  protected override inputs = inputs;
}
