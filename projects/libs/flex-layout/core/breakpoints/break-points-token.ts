import { inject, InjectionToken } from '@angular/core';
import { mergeByAlias } from '../breakpoints/breakpoint-tools';
import { DEFAULT_BREAKPOINTS } from '../breakpoints/data/break-points';
import { ORIENTATION_BREAKPOINTS } from '../breakpoints/data/orientation-break-points';
import { BREAKPOINT } from '../tokens/breakpoint-token';
import { LAYOUT_CONFIG } from '../tokens/library-config';
import { BreakPoint } from './break-point';

/**
 *  Injection token unique to the flex-layout library.
 *  Use this token when build a custom provider (see below).
 */
export const BREAKPOINTS = new InjectionToken<BreakPoint[]>(
  'Token (@ngbracket/ngx-layout) Breakpoints',
  {
    providedIn: 'root',
    factory: () => {
      const breakpoints: any = inject(BREAKPOINT);
      const layoutConfig = inject(LAYOUT_CONFIG);
      const bpFlattenArray: BreakPoint[] = [].concat.apply(
        [],
        (breakpoints || []).map((v: BreakPoint | BreakPoint[]) =>
          Array.isArray(v) ? v : [v]
        )
      );
      const builtIns = (
        layoutConfig.disableDefaultBps ? [] : DEFAULT_BREAKPOINTS
      ).concat(layoutConfig.addOrientationBps ? ORIENTATION_BREAKPOINTS : []);

      return mergeByAlias(builtIns, bpFlattenArray);
    },
  }
);
