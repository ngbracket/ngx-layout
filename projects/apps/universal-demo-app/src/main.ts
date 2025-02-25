import { APP_ID, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppComponent } from './app/app.component';

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      { provide: APP_ID, useValue: 'serverApp' },
      importProvidersFrom(FlexLayoutModule.withConfig({})),
    ],
  }).catch((err) => console.error(err));
});
