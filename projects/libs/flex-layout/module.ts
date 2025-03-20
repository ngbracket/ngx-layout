import { isPlatformServer } from '@angular/common';
import {
  Inject,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';

import {
  BreakPoint,
  LayoutConfigOptions,
  SERVER_TOKEN,
} from '@ngbracket/ngx-layout/core';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { GridModule } from '@ngbracket/ngx-layout/grid';
import { provideFlexLayout } from './provider';

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
    breakpoints: BreakPoint | BreakPoint[] = [],
  ): ModuleWithProviders<FlexLayoutModule> {
    return {
      ngModule: FlexLayoutModule,
      providers: provideFlexLayout(configOptions, breakpoints),
    };
  }

  constructor(
    @Inject(SERVER_TOKEN) serverModuleLoaded: boolean,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    if (isPlatformServer(platformId) && !serverModuleLoaded) {
      console.warn(
        'Warning: Flex Layout loaded on the server without FlexLayoutServerModule',
      );
    }
  }
}
