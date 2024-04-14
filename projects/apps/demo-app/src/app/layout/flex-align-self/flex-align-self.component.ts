import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

const ALIGN_OPTIONS = ['auto', 'start', 'center', 'baseline', 'end', 'stretch'];

@Component({
    selector: 'demo-flex-align-self',
    templateUrl: './flex-align-self.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class FlexAlignSelfComponent {
  alignTo = 'center';

  toggleAlignment() {
    let j = ALIGN_OPTIONS.indexOf(this.alignTo);
    this.alignTo = ALIGN_OPTIONS[(j + 1) % ALIGN_OPTIONS.length];
  }
}
