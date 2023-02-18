import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbrackets/ngx-layout';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleDirective } from './split-handle.directive';
import { SplitDirective } from './split.directive';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [SplitDirective, SplitAreaDirective, SplitHandleDirective],
  exports: [SplitDirective, SplitAreaDirective, SplitHandleDirective],
})
export class SplitModule {}
