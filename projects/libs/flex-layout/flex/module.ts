import { BidiModule } from '@angular/cdk/bidi';
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';

import { FlexAlignDirective } from './flex-align/flex-align';
import { FlexFillDirective } from './flex-fill/flex-fill';
import { FlexOffsetDirective } from './flex-offset/flex-offset';
import { FlexOrderDirective } from './flex-order/flex-order';
import { FlexDirective } from './flex/flex';
import { LayoutAlignDirective } from './layout-align/layout-align';
import { LayoutGapDirective } from './layout-gap/layout-gap';
import { LayoutDirective } from './layout/layout';

const ALL_DIRECTIVES = [
  LayoutDirective,
  LayoutGapDirective,
  LayoutAlignDirective,
  FlexOrderDirective,
  FlexOffsetDirective,
  FlexFillDirective,
  FlexAlignDirective,
  FlexDirective,
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
