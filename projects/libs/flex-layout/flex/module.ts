/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BidiModule } from '@angular/cdk/bidi';
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbrackets/ngx-layout/core';

import { DefaultFlexAlignDirective } from './flex-align/flex-align';
import { FlexFillDirective } from './flex-fill/flex-fill';
import { DefaultFlexOffsetDirective } from './flex-offset/flex-offset';
import { DefaultFlexOrderDirective } from './flex-order/flex-order';
import { DefaultFlexDirective } from './flex/flex';
import { DefaultLayoutAlignDirective } from './layout-align/layout-align';
import { DefaultLayoutGapDirective } from './layout-gap/layout-gap';
import { DefaultLayoutDirective } from './layout/layout';

const ALL_DIRECTIVES = [
  DefaultLayoutDirective,
  DefaultLayoutGapDirective,
  DefaultLayoutAlignDirective,
  DefaultFlexOrderDirective,
  DefaultFlexOffsetDirective,
  FlexFillDirective,
  DefaultFlexAlignDirective,
  DefaultFlexDirective,
];

/**
 * *****************************************************************
 * Define module for the Flex API
 * *****************************************************************
 */

@NgModule({
  imports: [CoreModule, BidiModule],
  declarations: [...ALL_DIRECTIVES],
  exports: [...ALL_DIRECTIVES],
})
export class FlexModule {}
