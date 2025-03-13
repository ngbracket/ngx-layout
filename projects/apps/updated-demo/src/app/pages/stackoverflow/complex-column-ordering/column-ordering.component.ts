import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LayoutDirective } from '@ngbracket/ngx-layout';
const DIRECTIONS = ['column', 'column-reverse'];

@Component({
  selector: 'app-column-ordering',
  imports: [MatCardModule, LayoutDirective],
  template: `<mat-card class="card-demo">
    <mat-card-title
      ><a
        href="http://stackoverflow.com/questions/36988183/flex-box-out-of-borders?rq=1"
        target="_blank"
        >StackOverflow</a
      ></mat-card-title
    >
    <mat-card-subtitle
      >Complex column ordering to wrap items to align to items above
    </mat-card-subtitle>
    <mat-card-content>
      <div
        class="containerX"
        (click)="toggleDirection()"
        [fxLayout]="direction + ' wrap'"
        style="cursor: pointer;"
      >
        <div class="one   flexitem ">
          1
          <div class="markup">&lt;div fxFlexOrder="1"&gt;</div>
        </div>
        <div class="two   flexitem " fxFlexOrder="3">
          2
          <div class="markup">&lt;div fxFlexOrder="3"&gt;</div>
        </div>
        <div class="three flexitem " fxFlexOrder="5">
          3
          <div class="markup">&lt;div fxFlexOrder="5"&gt;</div>
        </div>
        <div class="four  flexitem ">
          4
          <div class="markup">&lt;div fxFlexOrder="2"&gt;</div>
        </div>
        <div class="five  flexitem " fxFlexOrder="4">
          5
          <div class="markup">&lt;div fxFlexOrder="4"&gt;</div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer class="bottomPad">
      <div class="hint">&lt;fxLayout="{{ direction }}"&gt;</div>
    </mat-card-footer>
  </mat-card> `,
  styles: [
    `
      .containerX {
        width: 490px;
        height: 210px;
        padding: 5px;
        border: solid 1px #b6b6b6;
        box-sizing: content-box !important;
      }

      .flexitem {
        text-align: center;
        line-height: 100px;
        width: 150px;
        height: 100px;
        margin: 2px;
        box-shadow: none !important;
        padding: 0 !important;
      }

      .two {
        width: 200px;
      }

      .three {
        width: 120px;
        height: 100%;
      }

      .markup {
        font-size: 0.7em;
        margin-top: -80px;
        font-weight: 400;
      }

      .card-demo mat-card,
      .card-demo mat-card-content {
        margin-bottom: 24px;
      }

      .card-demo mat-card-footer {
        left: 24px;
        margin-bottom: 24px;
      }
    `,
  ],
})
export class ColumnOrderingComponent {
  direction = 'column';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
