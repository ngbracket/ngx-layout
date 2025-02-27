import {
  APP_ID,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: APP_ID, useValue: 'serverApp' },
    importProvidersFrom(FlexLayoutModule.withConfig({})),
  ],
};
