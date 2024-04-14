import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

const DIRECTIONS = ['row', 'row-reverse'];

@Component({
    selector: 'demo-issue-5345',
    templateUrl: './issue-5345.component.html',
    styleUrls: ['./issue-5345.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class Issue5345Component {
  direction = 'row';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1 ) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
