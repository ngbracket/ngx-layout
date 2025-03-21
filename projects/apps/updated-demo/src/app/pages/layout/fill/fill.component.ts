import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-fill',
  imports: [MatCardModule, FlexLayoutModule],
  template: ` <mat-card class="card-demo">
    <mat-card-title>Layout Fill</mat-card-title>
    <mat-card-subtitle> </mat-card-subtitle>
    <mat-card-content class="large">
      <div fxLayout="column" fxFill>
        <div fxLayout fxFlex>
          <div class="one" fxFlex="20" fxLayoutAlign="center center">A</div>
          <div class="two" fxFlex="80" fxLayoutAlign="center center">B</div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer class="bottomPad">
      <div class="hint">
        Using 'fxFill' to fill available width and height of parent container.
      </div></mat-card-footer
    >
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
    `,
  ],
})
export class FillComponent {
  options = {
    direction: 'row',
    mainAxis: 'space-around',
    crossAxis: 'center',
  };
}
