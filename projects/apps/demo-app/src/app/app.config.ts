import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { APP_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BREAKPOINT, FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DEMO_APP_ROUTES } from './app.routes';
import { YBA_BREAKPOINT_PROVIDER } from './stack-overflow/hide-custom-bp/hide-with-custom-bp.component';

const EXTRA_BREAKPOINTS = [
  {
    alias: 'xs.landscape',
    suffix: 'XsLandscape',
    mediaQuery: 'screen and (orientation: landscape) and (max-width: 559px)',
    priority: 1000,
    overlapping: false,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_ID, useValue: 'serverApp' },
    importProvidersFrom(
      FlexLayoutModule.withConfig({
        useColumnBasisZero: false,
        printWithBreakpoints: ['md', 'lt-lg', 'lt-xl', 'gt-sm', 'gt-xs'],
      })
    ),
    YBA_BREAKPOINT_PROVIDER,
    {
      provide: BREAKPOINT,
      useValue: EXTRA_BREAKPOINTS,
      multi: true,
    },
    provideAnimations(),
    provideRouter(DEMO_APP_ROUTES),
  ],
};
