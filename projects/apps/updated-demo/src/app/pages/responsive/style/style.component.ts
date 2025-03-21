import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  ClassDirective,
  FlexDirective,
  LayoutDirective,
  ShowHideDirective,
  StyleDirective,
} from '@ngbracket/ngx-layout';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';
@Component({
  selector: 'app-style',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MediaQueryStatusComponent,
    LayoutDirective,
    FlexDirective,
    StyleDirective,
    ClassDirective,
    ShowHideDirective,
    FormsModule,
  ],
  template: `
    <mat-card class="card-demo">
      <mat-card-title>Responsive Style</mat-card-title>
      <mat-card-subtitle class="sub-title">
        Use the fxClass and fxStyle APIs to responsively apply styles to
        elements:
      </mat-card-subtitle>

      <mat-card-content>
        <div class="containerX">
          <div fxLayout="row" fxFlex class="coloredContainerX box">
            <div
              fxFlex
              class="fxClass-all"
              ngClass.xs="fxClass-xs"
              [ngClass.sm]="{ 'fxClass-sm': hasStyle }"
              [ngClass.md]="{ 'fxClass-md': hasStyle, 'fxClass-md2': hasStyle }"
              [ngClass.lg]="['fxClass-lg', 'fxClass-lg2']"
            >
              Sample Text #1
              <br />
              <mat-checkbox
                [(ngModel)]="hasStyle"
                fxShow="false"
                [fxShow.sm]="true"
                [fxShow.md]="true"
              >
                Use Responsive Styles
              </mat-checkbox>
            </div>
          </div>
        </div>
      </mat-card-content>
      <mat-card-content>
        <pre>
        &lt;div
          fxFlex
          class="fxClass-all"
          ngClass.xs="fxClass-xs"
          [ngClass.sm]="&#123;'fxClass-sm': hasStyle&#125;"
          [ngClass.md]="&#123;'fxClass-md': hasStyle, 'fxClass-md2': hasStyle&#125;"
          [ngClass.lg]="['fxClass-lg', 'fxClass-lg2']"&gt;
        &lt;/div&gt;
        </pre
        >
      </mat-card-content>

      <mat-card-content>
        <div class="containerX">
          <div fxLayout="row" fxFlex class="coloredContainerX box">
            <div
              fxFlex
              style="font-style: italic"
              [ngStyle.xs]="{
                'font-size.px': 10,
                'background-color': '#ddd',
                color: 'blue',
              }"
              [ngStyle.sm]="{
                'font-size.px': 20,
                'background-color': 'grey',
                color: '#482b00',
              }"
              [ngStyle.md]="{
                'font-size.px': 30,
                'background-color': 'black',
                color: 'orange',
              }"
              [ngStyle.lg]="styleLgExp"
            >
              Sample Text #2
            </div>
          </div>
        </div>
      </mat-card-content>
      <mat-card-content>
        <pre>
        &lt;div
          style="font-style: italic"
          [ngStyle.xs]="&#123;'font-size.px': 10, color: 'blue'&#125;"
          [ngStyle.sm]="&#123;'font-size.px': 20, color: 'lightblue'&#125;"
          [ngStyle.md]="&#123;'font-size.px': 30, color: 'orange'&#125;"
          [ngStyle.lg]="styleLgExp"&gt;
        &lt;/div&gt;
        </pre
        >
      </mat-card-content>

      <mat-card-footer style="width:95%">
        <app-media-query-status></app-media-query-status>
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
export class StyleComponent {
  hasStyle = false;
  styleLgExp = {
    'font-size': '40px',
    color: 'lightgreen',
  };
}
