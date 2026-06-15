import { BreakPoint } from '../break-point';

/**
 * Material Design 3 breakpoints, offered as an opt-in alternative to the
 * library's {@link DEFAULT_BREAKPOINTS} (which retain the original
 * `@angular/flex-layout` ranges where `md` starts at 960px).
 *
 * These match the widely-used modern Material breakpoint values:
 *
 *   xs | < 600px
 *   sm | 600px – 899.98px
 *   md | 900px – 1199.98px
 *   lg | 1200px – 1535.98px
 *   xl | >= 1536px
 *
 * To use them instead of the defaults, disable the built-ins and provide this
 * set, e.g.:
 *
 *   FlexLayoutModule.withConfig({ disableDefaultBps: true }, MATERIAL_BREAKPOINTS)
 *
 * or, with the standalone provider:
 *
 *   provideFlexLayout({ disableDefaultBps: true }, MATERIAL_BREAKPOINTS)
 *
 * NOTE: Smaller ranges have HIGHER priority since the match is more specific.
 */
export const MATERIAL_BREAKPOINTS: BreakPoint[] = [
  {
    alias: 'xs',
    mediaQuery: 'screen and (min-width: 0px) and (max-width: 599.98px)',
    priority: 1000,
  },
  {
    alias: 'sm',
    mediaQuery: 'screen and (min-width: 600px) and (max-width: 899.98px)',
    priority: 900,
  },
  {
    alias: 'md',
    mediaQuery: 'screen and (min-width: 900px) and (max-width: 1199.98px)',
    priority: 800,
  },
  {
    alias: 'lg',
    mediaQuery: 'screen and (min-width: 1200px) and (max-width: 1535.98px)',
    priority: 700,
  },
  {
    alias: 'xl',
    mediaQuery: 'screen and (min-width: 1536px) and (max-width: 4999.98px)',
    priority: 600,
  },
  {
    alias: 'lt-sm',
    overlapping: true,
    mediaQuery: 'screen and (max-width: 599.98px)',
    priority: 950,
  },
  {
    alias: 'lt-md',
    overlapping: true,
    mediaQuery: 'screen and (max-width: 899.98px)',
    priority: 850,
  },
  {
    alias: 'lt-lg',
    overlapping: true,
    mediaQuery: 'screen and (max-width: 1199.98px)',
    priority: 750,
  },
  {
    alias: 'lt-xl',
    overlapping: true,
    priority: 650,
    mediaQuery: 'screen and (max-width: 1535.98px)',
  },
  {
    alias: 'gt-xs',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 600px)',
    priority: -950,
  },
  {
    alias: 'gt-sm',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 900px)',
    priority: -850,
  },
  {
    alias: 'gt-md',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 1200px)',
    priority: -750,
  },
  {
    alias: 'gt-lg',
    overlapping: true,
    mediaQuery: 'screen and (min-width: 1536px)',
    priority: -650,
  },
];
