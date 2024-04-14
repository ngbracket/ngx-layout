import {Component} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-grid-column-span',
    templateUrl: './grid-column-span.component.html',
    styleUrls: ['./grid-column-span.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter]
})
export class GridColumnSpanComponent {
  calc2Cols = '2 2 calc(10em + 10px);';
  /** 10px is the missing margin of the missing box */
  calc3Cols = '3 3 calc(15em + 20px)';
  /** 20px is the missing margin of the two missing boxes */
}
