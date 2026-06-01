import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  FlexDirective,
  GridColumnsDirective,
  GridGapDirective,
  LayoutAlignDirective,
  LayoutDirective,
  LayoutGapDirective,
  ShowHideDirective,
} from '@ngbracket/ngx-layout';

interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  route: string;
  colorClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexDirective,
    LayoutDirective,
    LayoutGapDirective,
    LayoutAlignDirective,
    ShowHideDirective,
    GridColumnsDirective,
    GridGapDirective,
  ],
  templateUrl: './dashboard.component.html',
  styles: [`
    @use '@angular/material' as mat;

    :host {
      display: block;
    }

    /* ── Hero ─────────────────────────────────────── */
    .hero {
      background: linear-gradient(135deg, #2d0057 0%, #5c0040 100%);
      color: #f6d9ff;
      padding: 64px 32px;
      text-align: center;
    }

    .hero-logo {
      border-radius: 16px;
      margin-bottom: 8px;
      filter: drop-shadow(0 4px 16px rgba(232, 179, 255, 0.4));
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin: 0 0 8px;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      margin: 0 0 16px;
      opacity: 0.85;
      font-weight: 300;
    }

    .version-badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 100px;
      background: rgba(246, 217, 255, 0.15);
      border: 1px solid rgba(246, 217, 255, 0.3);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      margin-bottom: 28px;
    }

    .hero-actions {
      flex-wrap: wrap;
      justify-content: center;
    }

    .hero-actions button {
      min-width: 140px;
    }

    /* ── Stats ────────────────────────────────────── */
    .stats-section {
      padding: 32px 32px 0;
    }

    .stat-card {
      background: var(--mat-sys-surface-container);
      border-radius: var(--mat-sys-corner-medium);
      padding: 24px 16px;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: default;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--mat-sys-level3);
    }

    .stat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: var(--mat-sys-primary);
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--mat-sys-on-surface);
      line-height: 1;
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--mat-sys-on-surface-variant);
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 500;
    }

    /* ── Features ─────────────────────────────────── */
    .features-section {
      padding: 32px;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--mat-sys-on-surface);
      margin: 0 0 20px;
    }

    .feature-card {
      cursor: pointer;
      height: 100%;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      @include mat.card-overrides((
        elevated-container-color: var(--mat-sys-surface-container-low),
        elevated-container-shape: var(--mat-sys-corner-large),
      ));
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--mat-sys-level3);
    }

    .feature-icon-wrap {
      width: 52px;
      height: 52px;
      border-radius: var(--mat-sys-corner-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        color: white;
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .feature-icon-wrap--flex    { background: #1e88e5; }
    .feature-icon-wrap--grid    { background: #43a047; }
    .feature-icon-wrap--resp    { background: #fb8c00; }
    .feature-icon-wrap--extra   { background: #8b32b9; }

    .feature-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 6px;
      color: var(--mat-sys-on-surface);
    }

    .feature-desc {
      font-size: 0.875rem;
      color: var(--mat-sys-on-surface-variant);
      margin: 0;
      line-height: 1.5;
    }

    .feature-tags {
      margin-top: 16px;
    }

    .tag {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 100px;
      background: var(--mat-sys-surface-container-highest);
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.72rem;
      font-weight: 500;
      font-family: monospace;
      letter-spacing: 0.02em;
    }

    /* ── Live demo ────────────────────────────────── */
    .live-demo-section {
      padding: 0 32px 48px;
    }

    .section-subtitle {
      font-size: 0.9rem;
      color: var(--mat-sys-on-surface-variant);
      margin: -12px 0 20px;
    }

    .demo-block {
      border-radius: var(--mat-sys-corner-medium);
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 120px;
      gap: 8px;
      transition: all 0.4s ease;

      mat-icon {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
        color: white;
      }
    }

    .block-label {
      font-family: monospace;
      font-size: 0.8rem;
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      background: rgba(0,0,0,0.2);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .block-hint {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.7);
    }

    .demo-block--a { background: var(--mat-sys-primary); }
    .demo-block--b { background: var(--mat-sys-secondary); }
    .demo-block--c { background: var(--mat-sys-tertiary); }
  `],
})
export class DashboardComponent {
  readonly stats: Stat[] = [
    { icon: 'layers',      value: '23',  label: 'Directives'  },
    { icon: 'devices',     value: '13',  label: 'Breakpoints' },
    { icon: 'engineering', value: '21+', label: 'Angular'     },
    { icon: 'favorite',    value: 'MIT', label: 'License'     },
  ];

  readonly features: Feature[] = [
    {
      icon: 'view_column',
      title: 'Flexbox Layout',
      description: 'Control direction, alignment, wrapping and spacing with intuitive flex directives.',
      tags: ['fxLayout', 'fxFlex', 'fxLayoutGap', 'fxLayoutAlign'],
      route: '/layout',
      colorClass: 'flex',
    },
    {
      icon: 'grid_on',
      title: 'CSS Grid',
      description: 'Build two-dimensional layouts with named areas, columns, rows and gap control.',
      tags: ['gdColumns', 'gdRows', 'gdAreas', 'gdGap'],
      route: '/grid',
      colorClass: 'grid',
    },
    {
      icon: 'devices',
      title: 'Responsive',
      description: 'Adapt any directive to a breakpoint with xs / sm / md / lg / xl suffix aliases.',
      tags: ['fxShow', 'fxHide', '.xs', '.gt-sm', 'MediaObserver'],
      route: '/responsive',
      colorClass: 'resp',
    },
    {
      icon: 'filter_none',
      title: 'Real-world Examples',
      description: 'Holy Grail, column ordering, grid spans and more — curated from real questions.',
      tags: ['holy-grail', 'grid-span', 'column-order'],
      route: '/stackoverflow',
      colorClass: 'extra',
    },
  ];
}
