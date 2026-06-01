import {
  Component,
  computed,
  inject,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import {
  FlexDirective,
  GridColumnsDirective,
  GridGapDirective,
  LayoutAlignDirective,
  LayoutDirective,
  LayoutGapDirective,
} from '@ngbracket/ngx-layout';
import { filter, map, startWith } from 'rxjs/operators';
import { MenuItem } from '../../menu-items';

@Component({
  selector: 'app-section-page',
  imports: [
    RouterOutlet,
    RouterModule,
    MatCardModule,
    MatIconModule,
    FlexDirective,
    LayoutDirective,
    LayoutGapDirective,
    LayoutAlignDirective,
    GridColumnsDirective,
    GridGapDirective,
  ],
  template: `
    <!-- Section banner -->
    <div class="section-banner" [style.background]="gradient()">
      <div
        class="section-banner-inner"
        fxLayout="row"
        fxLayoutAlign="start center"
        fxLayoutGap="20px"
      >
        <div class="section-icon-wrap">
          <mat-icon>{{ icon() }}</mat-icon>
        </div>
        <div>
          <h2 class="section-title">{{ title() }}</h2>
          <p class="section-subtitle">{{ subtitle() }}</p>
        </div>
      </div>
    </div>

    <!-- Sub-item grid — shown only at the section root -->
    @if (!hasChild()) {
      <div class="demos-grid-wrap">
        <div
          gdColumns="repeat(3, 1fr)"
          gdColumns.sm="repeat(2, 1fr)"
          gdColumns.xs="1fr"
          gdGap="20px"
        >
          @for (item of items(); track item.route) {
            <mat-card
              class="demo-item-card"
              [routerLink]="baseRoute() + '/' + item.route"
            >
              <mat-card-content>
                <div
                  fxLayout="row"
                  fxLayoutAlign="start center"
                  fxLayoutGap="12px"
                >
                  <mat-icon class="demo-item-icon">{{ item.icon }}</mat-icon>
                  <span class="demo-item-label">{{ item.label }}</span>
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </div>
    }

    <!-- Child route content -->
    <div class="section-content">
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      @use '@angular/material' as mat;

      :host {
        display: block;
      }

      /* ── Banner ───────────────────────────────────── */
      .section-banner {
        padding: 28px 32px;
        color: #fff;
      }

      .section-banner-inner {
        max-width: 900px;
      }

      .section-icon-wrap {
        width: 52px;
        height: 52px;
        border-radius: var(--mat-sys-corner-medium);
        background: rgba(255, 255, 255, 0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        mat-icon {
          font-size: 1.75rem;
          width: 1.75rem;
          height: 1.75rem;
          color: #fff;
        }
      }

      .section-title {
        margin: 0 0 4px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        line-height: 1.2;
      }

      .section-subtitle {
        margin: 0;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.82);
        font-weight: 300;
      }

      /* ── Demo cards grid ──────────────────────────── */
      .demos-grid-wrap {
        padding: 28px 32px;
      }

      .demo-item-card {
        cursor: pointer;
        transition:
          transform 0.15s ease,
          box-shadow 0.15s ease;

        @include mat.card-overrides(
          (
            elevated-container-color: var(--mat-sys-surface-container),
            elevated-container-shape: var(--mat-sys-corner-medium),
          )
        );
      }

      .demo-item-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--mat-sys-level2);
      }

      .demo-item-icon {
        color: var(--mat-sys-primary);
        font-size: 1.4rem;
        width: 1.4rem;
        height: 1.4rem;
      }

      .demo-item-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--mat-sys-on-surface);
      }

      /* ── Child content ────────────────────────────── */
      .section-content {
        padding: 24px 32px 40px;
      }
    `,
  ],
})
export class SectionPageComponent {
  icon = input.required<string>();
  title = input.required<string>();
  subtitle = input.required<string>();
  gradient = input<string>('linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)');
  baseRoute = input.required<string>();
  items = input<MenuItem[]>([]);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  hasChild = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.route.firstChild !== null),
    ),
    { initialValue: this.route.firstChild !== null },
  );
}
