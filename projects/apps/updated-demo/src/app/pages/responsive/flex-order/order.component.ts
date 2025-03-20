import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';

@Component({
  selector: 'app-order',
  imports: [
    MatCardModule,
    LayoutDirective,
    FlexDirective,
    MediaQueryStatusComponent,
  ],
  template: `<mat-card class="card-demo">
    <mat-card-title>Responsive Flex Ordering</mat-card-title>
    <mat-card-subtitle class="sub-title"
      >Add the flex-order directive to a layout child to set its order position
      within the layout container:
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div fxLayout="row" class="coloredContainerX box">
          <div fxFlex fxFlexOrder="-1">
            <p>[flex-order="-1"]</p>
          </div>
          <div fxFlex fxFlexOrder="1" fxFlexOrder.gt-md="3">
            <p fxHide="false" fxHide.gt-md>[flex-order="1"]</p>
            <p fxShow="false" fxShow.gt-md>[flex-order.gt-md="3"]</p>
          </div>
          <div fxFlex fxFlexOrder="2">
            <p>[flex-order="2"]</p>
          </div>
          <div fxFlex fxFlexOrder="3" fxFlexOrder.gt-md="1">
            <p fxHide="false" fxHide.gt-md>[flex-order="3"]</p>
            <p fxShow="false" fxShow.gt-md>[flex-order.gt-md="1"]</p>
          </div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer style="width:95%">
      <app-media-query-status></app-media-query-status>
    </mat-card-footer>
  </mat-card> `,
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
export class OrderComponent {}
