import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-grid',
  imports: [RouterOutlet, RouterLink, MatCardModule],
  template: `
    <h1>Grid</h1>
    <div fxFlexFill>
      <div fxFlexFill fxLayoutGap="40px" fxLayout="row wrap">
        <div fxFlex="45%">
          <mat-card routerLink="/grid">
            <mat-card-content>
              <div class="card-content">
                <div class="card-title">Grid</div>
                <div class="card-summary">
                  CSS Grid Layout provides a powerful way to create
                  two-dimensional layouts. It allows you to arrange elements in
                  rows and columns with flexible alignment.
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class GridComponent {}
