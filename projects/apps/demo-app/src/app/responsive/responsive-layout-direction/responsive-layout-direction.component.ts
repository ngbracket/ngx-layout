import {Component} from '@angular/core';
import { MediaQueryStatusComponent } from '../../media-query-status/media-query-status.component';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'demo-responsive-layout-direction',
    template: `
    <mat-card class="card-demo">
      <mat-card-title>Responsive Layout Directions</mat-card-title>
      <mat-card-subtitle>Layout direction changes to 'column' for 'xs' or 'sm' viewport sizes:
      </mat-card-subtitle>
      <mat-card-content>
        <div class="containerX">
          <div fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxFlex
               class="coloredContainerX box">
            <div fxFlex> I'm above on mobile, and to the left on larger devices.</div>
            <div fxFlex> I'm below on mobile, and to the right on larger devices.</div>
          </div>
        </div>
      </mat-card-content>
      <mat-card-footer style="width:95%">
        <media-query-status></media-query-status>
      </mat-card-footer>
    </mat-card>
  `,
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, FlexModule, MatCardFooter, MediaQueryStatusComponent]
})
export class ResponsiveLayoutDirectionComponent {}
