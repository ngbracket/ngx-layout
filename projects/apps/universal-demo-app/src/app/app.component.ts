import { Component } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { SplitModule } from './split/split.module';

@Component({
  selector: 'responsive-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FlexLayoutModule, SplitModule],
})
export class AppComponent {
  title = 'responsive';
}
