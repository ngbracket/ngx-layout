import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stackoverflow',
  imports: [RouterOutlet, RouterLink, MatCardModule],
  template: `
    <h1>Stackoverflow</h1>
    <div fxFlex="45%">
      <mat-card routerLink="/stackoverflow">
        <mat-card-content>
          <div class="card-content">
            <div class="card-title">Other Demos</div>
            <div class="card-summary">
              These Layout demos are curated from the AngularJS Material
              documentation, GitHub Issues, StackOverflow, and CodePen.
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
    <router-outlet />
  `,
  styles: [],
})
export class StackoverflowComponent {}
