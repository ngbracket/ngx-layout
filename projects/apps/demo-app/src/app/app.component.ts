import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { VERSION } from '@ngbracket/ngx-layout';

@Component({
  selector: 'demo-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  version = VERSION.full;
}
