import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';

@Component({
  selector: 'app-directive',
  imports: [
    MatCardModule,
    LayoutDirective,
    FlexDirective,
    MediaQueryStatusComponent,
  ],
  template: ` <mat-card class="card-demo">
    <mat-card-title>Responsive Flex Directives</mat-card-title>
    <mat-card-subtitle class="sub-title"
      >Use the show hide APIs to responsively show or hide elements:
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div fxLayout="row" class="coloredContainerX box">
          <div fxFlex.gt-sm="67" fxFlex="33">
            flex 33% on mobile, <br />and 66% on gt-sm devices.
          </div>
          <div fxFlex.gt-sm="33" fxFlex="67">
            flex 67% on mobile, <br />and 33% on gt-sm devices.
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
export class DirectiveComponent {}
