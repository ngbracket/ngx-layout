import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'layout',
    loadComponent: () =>
      import('./layout/layout-alignment/layout-alignment.component').then(
        (m) => m.LayoutAlignmentComponent
      ),
  },
];
