import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-layout-alignment',
  imports: [
    FormsModule,
    MatRadioModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  templateUrl: './layout-alignment.component.html',
  styleUrls: ['./layout-alignment.component.scss'],
})
export class LayoutAlignmentComponent {
  options = {
    direction: 'row',
    mainAxis: 'space-around',
    crossAxis: 'center',
  };

  layoutAlign() {
    return `${this.options.mainAxis} ${this.options.crossAxis}`;
  }
}
