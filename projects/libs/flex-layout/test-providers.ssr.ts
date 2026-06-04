import { PLATFORM_ID, Provider } from '@angular/core';

/**
 * Provider array consumed by the `test-ssr` Vitest target via the
 * `providersFile` option in `angular.json`.
 *
 * The library's `StyleUtils` switches between the browser and server code
 * paths based on `PLATFORM_ID` (see `isPlatformBrowser`/`isPlatformServer`
 * in `core/style-utils/style-utils.ts`). Overriding `PLATFORM_ID` at the
 * TestBed environment level forces every spec to exercise the server-side
 * rendering branch, replacing the old `platformServerTesting()` harness that
 * was run under Jasmine.
 */
const providers: Provider[] = [{ provide: PLATFORM_ID, useValue: 'server' }];

export default providers;
