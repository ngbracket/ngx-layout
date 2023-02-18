import { Directive, Optional, Self } from '@angular/core';
import { DefaultFlexDirective } from '@ngbrackets/ngx-layout';

@Directive({
  selector: '[ngxSplitArea]',
  host: {
    style: 'overflow: auto;',
  },
})
export class SplitAreaDirective {
  constructor(@Optional() @Self() public flex: DefaultFlexDirective) {}
}
