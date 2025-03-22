import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {
  FlexDirective,
  LayoutDirective,
  LayoutGapDirective,
} from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    FlexDirective,
    LayoutGapDirective,
    LayoutDirective,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styles: [
    `
      mat-card {
        margin-bottom: 40px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
      }

      .card-title {
        padding: 16px;
        font-size: 20px;
        font-weight: 500;
      }
      .card-summary {
        padding: 0 16px 16px;
        font-size: 16px;
      }
    `,
  ],
})
export class DashboardComponent {}
