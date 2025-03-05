import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-responsive',
  imports: [RouterOutlet],
  template: `
    <h1>Responsive</h1>

    <router-outlet />
  `,
  styles: [],
})
export class ResponsiveComponent {}
