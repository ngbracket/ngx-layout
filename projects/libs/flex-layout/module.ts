/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer } from '@angular/common';
import {
  Inject,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';

import {
  BreakPoint,
  BREAKPOINT,
  DEFAULT_CONFIG,
  LayoutConfigOptions,
  LAYOUT_CONFIG,
  SERVER_TOKEN,
} from '@ngbracket/ngx-layout/core';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { GridModule } from '@ngbracket/ngx-layout/grid';

/**
 * FlexLayoutModule -- the main import for all utilities in the Angular Layout library
 * * Will automatically provide Flex, Grid, and Extended modules for use in the application
 * * Can be configured using the static withConfig method, options viewable on the Wiki's
 *   Configuration page
 */
@NgModule({
  imports: [FlexModule, ExtendedModule, GridModule],
  exports: [FlexModule, ExtendedModule, GridModule],
})
export class FlexLayoutModule {
  /**
   * Initialize the FlexLayoutModule with a set of config options,
   * which sets the corresponding tokens accordingly
   */
  static withConfig(
    configOptions: LayoutConfigOptions,
    // tslint:disable-next-line:max-line-length
    breakpoints: BreakPoint | BreakPoint[] = []
  ): ModuleWithProviders<FlexLayoutModule> {
    return {
      ngModule: FlexLayoutModule,
      providers: configOptions.serverLoaded
        ? [
            {
              provide: LAYOUT_CONFIG,
              useValue: { ...DEFAULT_CONFIG, ...configOptions },
            },
            { provide: BREAKPOINT, useValue: breakpoints, multi: true },
            { provide: SERVER_TOKEN, useValue: true },
          ]
        : [
            {
              provide: LAYOUT_CONFIG,
              useValue: { ...DEFAULT_CONFIG, ...configOptions },
            },
            { provide: BREAKPOINT, useValue: breakpoints, multi: true },
          ],
    };
  }

  constructor(
    @Inject(SERVER_TOKEN) serverModuleLoaded: boolean,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    if (isPlatformServer(platformId) && !serverModuleLoaded) {
      console.warn(
        'Warning: Flex Layout loaded on the server without FlexLayoutServerModule'
      );
    }
  }
}
