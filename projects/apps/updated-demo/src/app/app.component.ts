import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { map } from 'rxjs/operators';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    CustomSidenavComponent,
  ],
  template: `
    <mat-toolbar class="app-toolbar mat-elevation-z3">
      <div class="toolbar-left">
        <button mat-icon-button (click)="collapsed.set(!collapsed())" aria-label="Toggle navigation">
          <mat-icon>menu</mat-icon>
        </button>
        <img src="ngx-layout-icon.svg" width="28" height="28" alt="ngx-layout logo" class="toolbar-logo" />
        <span class="toolbar-title">ngx-layout</span>
      </div>

      <div class="toolbar-right">
        <div class="bp-chip" [title]="'Active breakpoint: ' + breakpoint()">
          <span class="bp-dot" [style.background]="bpColor()"></span>
          <span class="bp-label">{{ breakpoint() }}</span>
        </div>
        <button mat-icon-button (click)="toggleTheme()"
          [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
          <mat-icon>{{ isDarkMode() ? 'wb_sunny' : 'nights_stay' }}</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()" />
      </mat-sidenav>
      <mat-sidenav-content [style.margin-left]="sidenavWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    @use '@angular/material' as mat;

    .app-toolbar {
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px 0 4px;
    }

    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .toolbar-logo {
      border-radius: 6px;
      flex-shrink: 0;
    }

    .toolbar-title {
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: 0.01em;
    }

    .bp-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 100px;
      background: rgba(0, 0, 0, 0.12);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: default;
    }

    .bp-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      transition: background 0.3s ease;
    }

    .bp-label {
      min-width: 14px;
    }

    .sidenav-container {
      height: calc(100vh - 64px);
    }

    mat-sidenav-content,
    mat-sidenav {
      transition: width 400ms ease-in-out, margin-left 400ms ease-in-out;
    }

    mat-sidenav {
      @include mat.sidenav-overrides((
        container-divider-color: var(--mat-sys-outline-variant),
        container-shape: 0px,
        container-background-color: var(--mat-sys-surface-container),
      ));
    }
  `],
})
export class AppComponent {
  private readonly bpColors: Record<string, string> = {
    xs: '#ef5350',
    sm: '#fb8c00',
    md: '#43a047',
    lg: '#1e88e5',
    xl: '#8b32b9',
  };

  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '280px'));
  isDarkMode = signal(false);

  private themeService = inject(ThemeService);
  private media = inject(MediaObserver);

  breakpoint = toSignal(
    this.media.asObservable().pipe(
      map((changes: MediaChange[]) => changes[0]?.mqAlias ?? 'xl'),
    ),
    { initialValue: 'xl' },
  );

  bpColor = computed(() => this.bpColors[this.breakpoint()] ?? this.bpColors['xl']);

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    this.themeService.setDarkMode(this.isDarkMode());
  }
}
