import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

const DIRECTIONS = ['column', 'column-reverse'];

@Component({
    selector: 'demo-complex-column-ordering',
    templateUrl: './complex-column-ordering.component.html',
    styleUrls: ['./complex-column-ordering.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class ComplexColumnOrderingComponent {
  direction = 'column';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
