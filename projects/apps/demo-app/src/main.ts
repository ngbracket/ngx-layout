import { APP_ID, enableProdMode, importProvidersFrom } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BREAKPOINT, FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppComponent } from './app/app.component';
import { RoutingModule } from './app/routing.module';
import { YBA_BREAKPOINT_PROVIDER } from './app/stack-overflow/hide-custom-bp/hide-with-custom-bp.component';
import { environment } from './environments/environment';

const EXTRA_BREAKPOINTS = [
  {
    alias: 'xs.landscape',
    suffix: 'XsLandscape',
    mediaQuery: 'screen and (orientation: landscape) and (max-width: 559px)',
    priority: 1000,
    overlapping: false,
  },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_ID, useValue: 'serverApp' },
    importProvidersFrom(
      RoutingModule,
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
  ],
}).catch((err) => console.error(err));
