import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleDirective } from './split-handle.directive';
import { SplitDirective } from './split.directive';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [SplitHandleDirective, SplitDirective, SplitAreaDirective],
  exports: [SplitHandleDirective, SplitDirective, SplitAreaDirective],
})
export class SplitModule {}
