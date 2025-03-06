import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stackoverflow',
  imports: [RouterOutlet],
  template: `
    <h1>Stackoverflow</h1>

    <router-outlet />
  `,
  styles: [],
})
export class StackoverflowComponent {}
