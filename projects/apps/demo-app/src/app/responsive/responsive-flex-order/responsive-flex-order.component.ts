import {Component} from '@angular/core';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-responsive-flex-order',
    templateUrl: './responsive-flex-order.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, ExtendedModule, MatCardFooter, MediaQueryStatusComponent]
})
export class ResponsiveFlexOrderComponent {}
