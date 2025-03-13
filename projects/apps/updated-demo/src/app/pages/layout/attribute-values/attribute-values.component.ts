import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-attribute-values',
  imports: [
    MatCardModule,
    FlexDirective,
    LayoutDirective,
    FlexDirective,
    LayoutDirective,
  ],
  template: `<mat-card class="card-demo">
    <mat-card-title>Flex Attribute Values</mat-card-title>
    <mat-card-subtitle
      >Explore impact of non-numerical values for the 'fxFlex' API:
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div fxLayout="row wrap" class="colored box nopad">
          <div fxFlex="none">[fxFlex="none"]</div>
          <div fxFlex>[fxFlex]</div>
          <div fxFlex="nogrow">[fxFlex="nogrow"]</div>
          <div fxFlex="grow">[fxFlex="grow"]</div>
          <div fxFlex="initial">[fxFlex="initial"]</div>
          <div fxFlex="auto">[fxFlex="auto"]</div>
          <div fxFlex="noshrink">[fxFlex="noshrink"]</div>
          <div fxFlex="0">[fxFlex="0"]</div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer>
      <div class="hint">&lt;div fxLayout="row wrap" &gt;</div>
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

      .hint {
        margin: 5px;
        font-size: 0.9em;
        color: #a3a3a3;
      }
    `,
  ],
})
export class AttributeValuesComponent {}
