import { Component } from '@angular/core';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';

@Component({
  selector: 'responsive-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FlexModule, ExtendedModule],
})
export class AppComponent {
  title = 'responsive';
}
