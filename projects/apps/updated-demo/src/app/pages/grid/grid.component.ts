import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-grid',
  imports: [RouterOutlet],
  template: `
    <h1>Grid</h1>

    <router-outlet />
  `,
  styles: [],
})
export class GridComponent {}
