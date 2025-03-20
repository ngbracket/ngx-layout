import { Provider } from '@angular/core';
import {
  BreakPoint,
  BREAKPOINT,
  DEFAULT_CONFIG,
  LAYOUT_CONFIG,
  LayoutConfigOptions,
  SERVER_TOKEN,
} from '@ngbracket/ngx-layout/core';

export function provideFlexLayout(
  configOptions: LayoutConfigOptions,
  breakpoints: BreakPoint | BreakPoint[] = [],
): Provider[] {
  const providers: Provider[] = [
    {
      provide: LAYOUT_CONFIG,
      useValue: { ...DEFAULT_CONFIG, ...configOptions },
    },
    { provide: BREAKPOINT, useValue: breakpoints, multi: true },
  ];

  if (configOptions.serverLoaded) {
    providers.push({ provide: SERVER_TOKEN, useValue: true });
  }

  return providers;
}
