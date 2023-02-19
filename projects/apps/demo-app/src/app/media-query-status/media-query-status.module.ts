import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { MediaQueryStatusComponent } from './media-query-status.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [MediaQueryStatusComponent],
  exports: [MediaQueryStatusComponent],
})
export class MediaQueryStatusModule {}
