import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    CustomSidenavComponent,
  ],
  template: `
    <mat-toolbar class="mat-elevation-z3">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
      <button mat-icon-button (click)="toggleTheme()">
        <mat-icon>{{ isDarkMode() ? 'wb_sunny' : 'nights_stay' }}</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()" />
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      @use '@angular/material' as mat;

      mat-toolbar {
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .content {
        padding: 24px;
      }

      mat-sidenav-container {
        height: calc(100vh - 64px);
      }

      mat-sidenav-content,
      mat-sidenav {
        transition: all 500ms ease-in-out;
      }

      mat-sidenav {
        @include mat.sidenav-overrides(
          (
            container-divider-color: var(--mat-sys-outline-variant),
            container-shape: 0px,
            container-background-color: var(--mat-sys-surface),
          )
        );
      }
    `,
  ],
})
export class AppComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '350px'));
  isDarkMode = signal(false);

  private themeService = inject(ThemeService);

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    this.themeService.setDarkMode(this.isDarkMode());
  }
}
