import { InjectionToken } from '@angular/core';
import { BreakPoint } from '../breakpoints/break-point';

export const BREAKPOINT = new InjectionToken<BreakPoint | BreakPoint[] | null>(
  'Flex Layout token, collect all breakpoints into one provider',
  {
    providedIn: 'root',
    factory: () => null,
  },
);
