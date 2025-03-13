import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';

const DIRECTIONS = ['', '-reverse'];
@Component({
  selector: 'app-grid-area-row-span',
  imports: [MatCardModule, LayoutDirective, FlexDirective],
  template: `<mat-card class="card-demo">
    <mat-card-title
      ><a
        href="http://stackoverflow.com/questions/37039029/flex-css-rowspan-2-and-colspan-2"
        target="_blank"
        >StackOverflow</a
      ></mat-card-title
    >
    <mat-card-subtitle
      >Grid Area with Column and Row Span... [Click to change direction!]
    </mat-card-subtitle>
    <mat-card-content>
      <div
        class="containerX"
        [fxLayout]="'row' + direction"
        (click)="toggleDirection()"
        style="cursor: pointer;"
      >
        <div fxFlex [fxLayout]="'column'">
          <div class="one   flexitem " fxFlex>A</div>
          <div class="two   flexitem " fxFlex>B</div>
          <div class="three flexitem " fxFlex>C</div>
        </div>
        <div fxFlex="67" [fxLayout]="'column' + direction">
          <div fxLayout="row" fxFlex="33%">
            <div class="five  flexitem " fxFlex>E</div>
            <div class="five  flexitem " fxFlex>F</div>
          </div>
          <div class="four  flexitem " fxFlex>D</div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer class="bottomPad">
      <div class="hint">
        Current direction: &lt;fxLayout="row{{ direction }}"&gt;
      </div>
    </mat-card-footer>
  </mat-card> `,
  styles: [
    `
      .containerX {
        padding: 5px;
        border: solid 1px #b6b6b6;
        box-sizing: content-box !important;
      }

      .flexitem {
        text-align: center;
        line-height: 100px;
        margin: 2px;
        box-shadow: none !important;
        padding: 0 !important;
      }

      .short {
        line-height: 40px;
      }

      .markup {
        font-size: 0.7em;
        margin-top: -80px;
        font-weight: bold;
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
export class GridAreaRowSpanComponent {
  direction = '';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
