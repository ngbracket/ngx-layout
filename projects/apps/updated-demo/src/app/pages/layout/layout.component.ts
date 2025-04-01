import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, MatCardModule],
  template: `
    <h1>Layout</h1>
    <div fxFlex="45%">
      <mat-card routerLink="/layout">
        <mat-card-content>
          <div class="card-content">
            <div class="card-title">Layout</div>
            <div class="card-summary">
              Layout in CSS determines how elements are positioned and arranged.
              Flexbox and Grid are the two main techniques for creating modern
              layouts.
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class LayoutComponent {}
