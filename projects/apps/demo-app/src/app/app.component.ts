import { Component, ViewEncapsulation } from '@angular/core';

import { VERSION } from '@ngbracket/ngx-layout';
import { WatermarkComponent } from './watermark.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';

@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FlexModule,
        ExtendedModule,
        RouterLink,
        RouterOutlet,
        WatermarkComponent,
    ],
})
export class AppComponent {
  version = VERSION.full;
}
