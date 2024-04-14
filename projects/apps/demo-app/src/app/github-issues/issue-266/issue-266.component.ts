import {Component} from '@angular/core';
import { SplitHandleDirective } from '../split/split-handle.directive';
import { SplitAreaDirective } from '../split/split-area.directive';
import { SplitDirective } from '../split/split.directive';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'demo-issue-266',
    templateUrl: './issue-266.component.html',
    styleUrls: ['./issue-266.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, SplitDirective, SplitAreaDirective, SplitHandleDirective]
})
export class Issue266Component {}
