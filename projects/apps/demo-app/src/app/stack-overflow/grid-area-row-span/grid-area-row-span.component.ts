import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

const DIRECTIONS = ['', '-reverse'];

@Component({
    selector: 'demo-grid-area-row-span',
    templateUrl: './grid-area-row-span.component.html',
    styleUrls: ['./grid-area-row-span.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class GridAreaRowSpanComponent {
  direction = '';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1 ) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
