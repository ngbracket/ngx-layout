import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { ComplexColumnOrderingComponent } from './complex-column-ordering/complex-column-ordering.component';
import { GridAreaRowSpanComponent } from './grid-area-row-span/grid-area-row-span.component';
import { GridColumnSpanComponent } from './grid-column-span/grid-column-span.component';
import {
  CustomHideDirective,
  HideWithCustomBPComponent,
} from './hide-custom-bp/hide-with-custom-bp.component';
import { MozHolyGrailComponent } from './moz-holy-grail/moz-holy-grail.component';
import { RoutingModule } from './routing.module';
import { StackOverflowComponent } from './stack-overflow/stack-overflow.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    RoutingModule,
    CustomHideDirective,
  ],
  declarations: [
    StackOverflowComponent,
    ComplexColumnOrderingComponent,
    GridAreaRowSpanComponent,
    GridColumnSpanComponent,
    MozHolyGrailComponent,
    HideWithCustomBPComponent,
  ],
})
export class DocsStackOverflowModule {}
