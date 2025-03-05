import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, FlexLayoutModule],
  template: `<h1>Ngx-Layout</h1> `,
  styles: [``],
})
export class DashboardComponent {}
