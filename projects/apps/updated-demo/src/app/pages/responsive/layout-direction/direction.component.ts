import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';

@Component({
  selector: 'app-direction',
  imports: [
    MatCardModule,
    LayoutDirective,
    FlexDirective,
    MediaQueryStatusComponent,
  ],
  template: ` <mat-card class="card-demo">
    <mat-card-title>Responsive Layout Directions</mat-card-title>
    <mat-card-subtitle class="sub-title"
      >Layout direction changes to 'column' for 'xs' or 'sm' viewport sizes:
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div
          fxLayout="row"
          fxLayout.xs="column"
          fxLayout.sm="column"
          fxFlex
          class="coloredContainerX box"
        >
          <div fxFlex>
            I'm above on mobile, and to the left on larger devices.
          </div>
          <div fxFlex>
            I'm below on mobile, and to the right on larger devices.
          </div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer style="width:95%">
      <app-media-query-status></app-media-query-status>
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
    `,
  ],
})
export class ResponsiveDirectionComponent {}
