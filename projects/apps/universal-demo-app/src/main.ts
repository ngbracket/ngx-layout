import { APP_ID, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppComponent } from './app/app.component';
import { SplitModule } from './app/split/split.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: APP_ID, useValue: 'serverApp' },
      FlexLayoutModule,
      SplitModule,
    ],
  }).catch((err) => console.error(err));
});
