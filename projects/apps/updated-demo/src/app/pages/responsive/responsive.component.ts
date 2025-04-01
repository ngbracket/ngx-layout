import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-responsive',
  imports: [RouterOutlet, RouterLink, MatCardModule],
  template: `
    <h1>Responsive</h1>
    <div fxFlex="45%">
      <mat-card routerLink="/responsive">
        <mat-card-content>
          <div class="card-content">
            <div class="card-title">Responsive</div>
            <div class="card-summary">
              Responsive design ensures your UI adapts to different screen
              sizes.
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class ResponsiveComponent {}
