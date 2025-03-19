import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FlexDirective,
  FlexOffsetDirective,
  LayoutDirective,
} from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-offset-values',
  imports: [MatCardModule, LayoutDirective, FlexDirective, FlexOffsetDirective],
  template: ` <mat-card class="card-demo">
    <mat-card-title>Flex Offset Values</mat-card-title>
    <mat-card-subtitle class="sub-title"
      >Explore impact of values for the 'flex-offset' API:</mat-card-subtitle
    >
    <mat-card-content>
      <div class="containerX">
        <div fxLayout="row" class="colored box nopad">
          <div fxFlex="66" fxFlexOffset="15">
            [fxFlex="66"] [fxFlexOffset="15"]
          </div>
          <div fxFlex>[fxFlex]</div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer>
      <div class="hint">&lt;div fxLayout="row" &gt;</div>
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
            title-text-size: 1.5rem,
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

      .hint {
        margin: 5px;
        font-size: 0.9em;
        color: #a3a3a3;
      }
    `,
  ],
})
export class OffsetValuesComponent {}
