import {
  APP_ID,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  BreakPoint,
  BREAKPOINT,
  FlexLayoutModule,
} from '@ngbracket/ngx-layout';
import { RoutingModule } from './routing.module';
import { YBA_BREAKPOINT_PROVIDER } from './stack-overflow/hide-custom-bp/hide-with-custom-bp.component';

const EXTRA_BREAKPOINTS: BreakPoint[] = [
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
    provideZoneChangeDetection({ eventCoalescing: true }),
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
};
