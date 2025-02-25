import { BidiModule } from '@angular/cdk/bidi';
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';

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
  imports: [CoreModule, BidiModule, ...ALL_DIRECTIVES],
  exports: [...ALL_DIRECTIVES],
})
export class FlexModule {}
