import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-moz-holy-grail',
    templateUrl: './moz-holy-grail.component.html',
    styleUrls: ['./moz-holy-grail.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class MozHolyGrailComponent {
  direction = 'row';

  toggleDirection() {
    this.direction = (this.direction === 'column') ? 'row' : 'column';
  }
}
