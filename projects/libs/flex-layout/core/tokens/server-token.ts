import { InjectionToken } from '@angular/core';

/**
 * Token that is provided to tell whether the FlexLayoutServerModule
 * has been included in the bundle
 *
 * NOTE: This can be manually provided to disable styles when using SSR
 */
export const SERVER_TOKEN = new InjectionToken<boolean>(
  'FlexLayoutServerLoaded',
  {
    providedIn: 'root',
    factory: () => false,
  },
);
