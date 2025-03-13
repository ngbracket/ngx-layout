import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];
@Component({
  selector: 'app-row-fill',
  imports: [MatCardModule, LayoutDirective, FlexDirective],
  template: `<mat-card class="card-demo" (click)="toggleDirection()">
    <mat-card-title>'Flex' to Fill Row</mat-card-title>
    <mat-card-subtitle
      >Simple row using "flex" on 3rd element to fill available main axis.
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div
          [fxLayout]="direction"
          (click)="toggleDirection()"
          class="colored box"
          style="cursor: pointer;"
        >
          <div [fxFlex]="someValue">fxFlex="20"</div>
          <div fxFlex="60">fxFlex="60"</div>
          <div fxFlex>fxFlex</div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer>
      <div class="hint">&lt;div fxLayout="{{ direction }}" &gt;</div>
    </mat-card-footer>
  </mat-card>`,
  styles: [],
})
export class RowFillComponent {
  direction = 'row';
  someValue = 20;

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
