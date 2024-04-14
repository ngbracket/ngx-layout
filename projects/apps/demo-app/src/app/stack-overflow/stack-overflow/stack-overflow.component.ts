import {Component} from '@angular/core';
import { GridColumnSpanComponent } from '../grid-column-span/grid-column-span.component';
import { GridAreaRowSpanComponent } from '../grid-area-row-span/grid-area-row-span.component';
import { ComplexColumnOrderingComponent } from '../complex-column-ordering/complex-column-ordering.component';
import { MozHolyGrailComponent } from '../moz-holy-grail/moz-holy-grail.component';
import { HideWithCustomBPComponent } from '../hide-custom-bp/hide-with-custom-bp.component';

@Component({
    selector: 'demo-stack-overflow',
    template: `
    <demo-hide-custom-bp></demo-hide-custom-bp>
    <demo-moz-holy-grail class='small-demo'></demo-moz-holy-grail>
    <demo-complex-column-ordering></demo-complex-column-ordering>
    <demo-grid-area-row-span></demo-grid-area-row-span>
    <demo-grid-column-span></demo-grid-column-span>
  `,
    standalone: true,
    imports: [HideWithCustomBPComponent, MozHolyGrailComponent, ComplexColumnOrderingComponent, GridAreaRowSpanComponent, GridColumnSpanComponent]
})
export class StackOverflowComponent {}
