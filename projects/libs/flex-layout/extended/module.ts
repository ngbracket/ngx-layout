import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';

import { ClassDirective } from './class/class';
import { ImgSrcDirective } from './img-src/img-src';
import { ShowHideDirective } from './show-hide/show-hide';
import { StyleDirective } from './style/style';

const ALL_DIRECTIVES = [
  ShowHideDirective,
  ClassDirective,
  StyleDirective,
  ImgSrcDirective,
];

/**
 * *****************************************************************
 * Define module for the Extended API
 * *****************************************************************
 */

@NgModule({
  imports: [CoreModule, ...ALL_DIRECTIVES],
  exports: [...ALL_DIRECTIVES],
})
export class ExtendedModule {}
