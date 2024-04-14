import {Component} from '@angular/core';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-issue-135',
    templateUrl: './issue-135.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter, MediaQueryStatusComponent]
})
export class Issue135Component {}
