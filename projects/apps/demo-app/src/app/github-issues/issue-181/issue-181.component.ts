import {Component} from '@angular/core';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-issue-181',
    templateUrl: './issue-181.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, ExtendedModule, MatCardFooter, MediaQueryStatusComponent]
})
export class Issue181Component {
  direction = 'column';

  pivot() {
    this.direction = (this.direction === 'row') ? 'column' : 'row';
  }
}
