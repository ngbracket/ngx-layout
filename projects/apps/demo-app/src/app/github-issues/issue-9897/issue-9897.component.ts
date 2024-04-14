import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

const DIRECTIONS = ['wrap', 'wrap-reverse'];

@Component({
    selector: 'demo-issue-9897',
    templateUrl: './issue-9897.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class Issue9897Component {
  wrapDirection = 'wrap';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.wrapDirection) + 1 ) % DIRECTIONS.length;
    this.wrapDirection = DIRECTIONS[next];
  }
}
