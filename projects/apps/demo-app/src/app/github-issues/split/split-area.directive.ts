import { Directive, Optional, Self } from '@angular/core';
import { DefaultFlexDirective } from '@ngbracket/ngx-layout';

@Directive({
    selector: '[ngxSplitArea]',
    host: {
        style: 'overflow: auto;',
    },
    standalone: true,
})
export class SplitAreaDirective {
  constructor(@Optional() @Self() public flex: DefaultFlexDirective) {}
}
