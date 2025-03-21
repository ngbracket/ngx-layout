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
        background-color: wheat;
        margin-bottom: 40px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
      }

      mat-card:hover {
        background-color: peru;
        transform: scale(1.02);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
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
