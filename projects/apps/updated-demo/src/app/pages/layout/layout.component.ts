import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  template: `
    <h1>Layout</h1>

    <router-outlet />
  `,
  styles: [],
})
export class LayoutComponent {}
