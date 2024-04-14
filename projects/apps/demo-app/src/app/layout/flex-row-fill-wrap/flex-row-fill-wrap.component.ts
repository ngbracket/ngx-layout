import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];

@Component({
    selector: 'demo-flex-row-fill-wrap',
    templateUrl: './flex-row-fill-wrap.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class FlexRowFillWrapComponent {
  direction = 'row';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1 ) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
