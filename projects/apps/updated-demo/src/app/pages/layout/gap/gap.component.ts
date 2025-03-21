import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FlexDirective,
  FlexFillDirective,
  LayoutAlignDirective,
  LayoutDirective,
  LayoutGapDirective,
} from '@ngbracket/ngx-layout';
const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];

@Component({
  selector: 'app-gap',
  imports: [
    MatCardModule,
    FlexDirective,
    FlexFillDirective,
    LayoutGapDirective,
    LayoutDirective,
    LayoutAlignDirective,
  ],
  template: ` <mat-card class="card-demo">
    <mat-card-title><a href="" target="_blank">Layout Gap</a></mat-card-title>
    <mat-card-subtitle class="sub-title"
      >Using 'fxLayoutGap' to create a grid-like layout
    </mat-card-subtitle>
    <mat-card-content class="large">
      <div fxFlexFill>
        <div
          fxFlexFill
          [fxLayout]="direction + ' wrap'"
          fxLayoutGap="10px 5px grid"
          style="cursor: pointer;"
          (click)="toggleDirection()"
        >
          <div fxFlex="25">
            <div class="one" fxFlexFill fxLayoutAlign="center center">A</div>
          </div>
          <div fxFlex="25">
            <div class="two" fxFlexFill fxLayoutAlign="center center">B</div>
          </div>
          <div fxFlex="25">
            <div class="three" fxFlexFill fxLayoutAlign="center center">C</div>
          </div>
          <div fxFlex="25">
            <div class="four" fxFlexFill fxLayoutAlign="center center">D</div>
          </div>
          <div fxFlex="25">
            <div class="five" fxFlexFill fxLayoutAlign="center center">E</div>
          </div>
          <div fxFlex="25">
            <div class="six" fxFlexFill fxLayoutAlign="center center">F</div>
          </div>
          <div fxFlex="25">
            <div class="seven" fxFlexFill fxLayoutAlign="center center">G</div>
          </div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer class="bottomPad">
      <div class="hint"></div>
    </mat-card-footer>
  </mat-card>`,
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

      .hint {
        margin: 5px;
        font-size: 0.9em;
        color: #a3a3a3;
      }
    `,
  ],
})
export class GapComponent {
  direction = 'row';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
