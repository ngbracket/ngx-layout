import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective, LayoutDirective } from '@ngbracket/ngx-layout';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';

@Component({
  selector: 'app-show-hide',
  imports: [
    MatCardModule,
    FlexDirective,
    LayoutDirective,
    MediaQueryStatusComponent,
  ],
  template: `<mat-card class="card-demo">
    <mat-card-title>Show & Hide Directives</mat-card-title>
    <mat-card-subtitle class="sub-title"
      >Use the show hide APIs to responsively show or hide elements:
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div fxLayout="row" class="coloredContainerX box">
          <div fxFlex fxHide="false" fxHide.gt-sm>
            Shown on small device size.<br />
            Hidden on gt-sm devices.
          </div>
          <div fxFlex fxHide="false" fxHide.gt-md>
            Shown on small and medium size devices.<br />
            Hidden on gt-md devices.
          </div>
          <div fxFlex fxShow="false" fxShow.gt-sm>
            Only show on gt-sm devices.
          </div>
          <div fxFlex fxShow="false" fxShow.md>
            Shown on medium size devices only.
          </div>
          <div fxFlex fxShow="false" fxShow.gt-lg>
            Shown on devices larger than 1200px wide only.
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
export class ShowHideComponent {}
