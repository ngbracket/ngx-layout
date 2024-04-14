import {Component} from '@angular/core';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-layout-alignment',
    templateUrl: './layout-alignment.component.html',
    styleUrls: ['./layout-alignment.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardActions, ExtendedModule, FormsModule, MatRadioGroup, MatRadioButton, MatCardFooter]
})
export class LayoutAlignmentComponent {
  options = {
    direction :  'row',
    mainAxis  : 'space-around',
    crossAxis :  'center'
  };

  layoutAlign() {
    return `${this.options.mainAxis} ${this.options.crossAxis}`;
  }
}
