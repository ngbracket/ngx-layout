import { NgModule } from '@angular/core';

import { BROWSER_PROVIDER } from './browser-provider';

/**
 * *****************************************************************
 * Define module for common Angular Layout utilities
 * *****************************************************************
 */
@NgModule({
  providers: [BROWSER_PROVIDER],
})
export class CoreModule {}
