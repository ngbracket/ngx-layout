import {Component} from '@angular/core';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-responsive-style',
    templateUrl: './responsive-style.component.html',
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, ExtendedModule, MatCheckbox, FormsModule, MatCardFooter, MediaQueryStatusComponent]
})
export class ResponsiveStyleComponent {
  hasStyle = false;
  styleLgExp = {
    'font-size': '40px',
    color: 'lightgreen'
  };
}
