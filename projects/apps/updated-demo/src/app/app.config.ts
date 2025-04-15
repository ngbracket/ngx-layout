import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// export const BreakPointsProvider = {
//   provide: BREAKPOINTS,
//   useValue: DEFAULT_BREAKPOINTS,
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // BreakPointsProvider,
    // BreakPointRegistry,
    // MatchMedia,
    // MediaMonitor,
    // ObservableMediaProvider
  ],
};
