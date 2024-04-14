import {Component} from '@angular/core';
import { Direction, Dir } from '@angular/cdk/bidi';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-layout-with-direction',
    templateUrl: './layout-with-direction.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, Dir, MatCardFooter]
})
export class LayoutWithDirectionComponent {
  direction: Direction = 'ltr';

  toggleDirection() {
    this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
  }
}
