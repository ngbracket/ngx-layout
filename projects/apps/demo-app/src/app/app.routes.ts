import { Routes } from '@angular/router';

export const DEMO_APP_ROUTES: Routes = [
  { path: '', redirectTo: 'docs', pathMatch: 'full' },
  {
    path: 'grid',
    loadChildren: () => import('./grid/routes').then((m) => m.routes),
  },
  {
    path: 'docs',
    loadChildren: () => import('./layout/routes').then((m) => m.routes),
  },
  {
    path: 'responsive',
    loadChildren: () => import('./responsive/routes').then((m) => m.routes),
  },
  {
    path: 'issues',
    loadChildren: () => import('./github-issues/routes').then((m) => m.routes),
  },
  {
    path: 'stackoverflow',
    loadChildren: () => import('./stack-overflow/routes').then((m) => m.routes),
  },
];
