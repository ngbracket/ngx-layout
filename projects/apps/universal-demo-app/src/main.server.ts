import { APP_ID, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppComponent } from './app/app.component';

export default () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(),
      { provide: APP_ID, useValue: 'serverApp' },
      importProvidersFrom(FlexLayoutModule.withConfig({ serverLoaded: true })),
    ],
  });
