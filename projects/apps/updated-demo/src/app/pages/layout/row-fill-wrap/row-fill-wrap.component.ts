import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];

@Component({
  selector: 'app-row-fill-wrap',
  imports: [MatCardModule, LayoutDirective, FlexDirective],
  template: `
    <mat-card class="card-demo" (click)="toggleDirection()">
      <mat-card-title>'Flex' with Layout-Wrap</mat-card-title>
      <mat-card-subtitle class="sub-title"
        >Using "layout-wrap" to wrap positioned items within a layout container
      </mat-card-subtitle>
      <mat-card-content>
        <div class="containerX">
          <div
            [fxLayout]="direction + ' wrap'"
            class="colored wrapped box"
            (click)="toggleDirection()"
            style="cursor: pointer;"
          >
            <div fxFlex="30">fxFlex="30"</div>
            <div fxFlex="45">fxFlex="45"</div>
            <div fxFlex="19">fxFlex="19"</div>
            <div fxFlex="33">fxFlex="33"</div>
            <div fxFlex="67">fxFlex="67"</div>
            <div fxFlex="50">fxFlex="50"</div>
            <div fxFlex>fxFlex</div>
          </div>
        </div>
      </mat-card-content>
      <mat-card-footer>
        <div class="hint">&lt;div fxLayout="{{ direction }}" &gt;</div>
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
        margin-bottom: 10px;
        font-weight: normal;
      }
    `,
  ],
})
export class RowFillWrapComponent {
  direction = 'row';

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
