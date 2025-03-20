import { Routes } from '@angular/router';

export const DEMO_APP_ROUTES: Routes = [
  { path: '', redirectTo: 'docs', pathMatch: 'full' },
  {
    path: 'grid',
    loadChildren: () =>
      import('./grid/grid.module').then((m) => m.DocsGridModule),
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.DocsLayoutModule),
  },
  {
    path: 'responsive',
    loadChildren: () =>
      import('./responsive/responsive.module').then(
        (m) => m.DocsResponsiveModule,
      ),
  },
  {
    path: 'stackoverflow',
    loadChildren: () =>
      import('./stack-overflow/stack-overflow.module').then(
        (m) => m.DocsStackOverflowModule,
      ),
  },
];
