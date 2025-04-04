import { Direction } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FlexOffsetDirective,
  LayoutDirective,
  LayoutGapDirective,
} from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-direction',
  imports: [
    MatCardModule,
    MatButtonModule,
    LayoutDirective,
    LayoutGapDirective,
    FlexOffsetDirective,
  ],
  template: `
    <mat-card class="card-demo">
      <mat-card-title>Direction support for RTL</mat-card-title>
      <mat-card-subtitle class="sub-title">
        Simple row using layout gap and flex offset to demonstrate changes in
        layout direction between rtl and ltr.
      </mat-card-subtitle>
      <mat-card-content fxLayout="column" fxLayoutGap="8px">
        <div>
          <button (click)="toggleDirection()" mat-flat-button>
            Toggle direction
          </button>
        </div>
        <div class="containerX">
          <div
            fxLayout="row"
            class="colored box"
            fxLayoutGap="20px"
            [dir]="direction"
            fxFlex
          >
            <div fxFlexOffset="20px">item 1</div>
            <div>item 2</div>
            <div>item 3</div>
          </div>
        </div>
      </mat-card-content>
      <mat-card-footer>
        <div class="hint">
          &lt;div dir="{{ direction }}" fxLayoutGap="20px"&gt;
        </div>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [
    `
      @use '@angular/material' as mat;

      mat-card {
        top: 20px;
        @include mat.card-overrides(
          (
            elevated-container-color: #fff,
            elevated-container-shape: 6px,
          )
        );
      }

      mat-card-title {
        margin: 10px 0 10px 20px;
      }

      .sub-title {
        margin-left: 20px;
        font-weight: normal;
      }
    `,
  ],
})
export class DirectionComponent {
  direction: Direction = 'ltr';

  toggleDirection() {
    this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
  }
}
