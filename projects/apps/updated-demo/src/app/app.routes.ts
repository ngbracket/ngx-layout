import { Route, Routes } from '@angular/router';
import { MenuItem, menuItems } from './menu-items';

const itemToRoute = (i: MenuItem): Route => {
  const route: Route = { path: i.route, component: i.component };
  if (i.subItems) {
    route.children = i.subItems.map((s) => itemToRoute(s));
  }

  return route;
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  ...menuItems.map((i) => itemToRoute(i)),
];
