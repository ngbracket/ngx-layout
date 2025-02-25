import { APP_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppComponent } from './app/app.component';
import { SplitModule } from './app/split/split.module';

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: APP_ID, useValue: 'serverApp' },
      FlexLayoutModule,
      SplitModule,
    ],
  }).catch((err) => console.error(err));
});
