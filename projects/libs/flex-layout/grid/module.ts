/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';

import { DefaultGridAlignColumnsDirective } from './align-columns/align-columns';
import { DefaultGridAlignRowsDirective } from './align-rows/align-rows';
import { DefaultGridAreaDirective } from './area/area';
import { DefaultGridAreasDirective } from './areas/areas';
import { DefaultGridAutoDirective } from './auto/auto';
import { DefaultGridColumnDirective } from './column/column';
import { DefaultGridColumnsDirective } from './columns/columns';
import { DefaultGridGapDirective } from './gap/gap';
import { DefaultGridAlignDirective } from './grid-align/grid-align';
import { DefaultGridRowDirective } from './row/row';
import { DefaultGridRowsDirective } from './rows/rows';

const ALL_DIRECTIVES = [
    DefaultGridAlignDirective,
    DefaultGridAlignColumnsDirective,
    DefaultGridAlignRowsDirective,
    DefaultGridAreaDirective,
    DefaultGridAreasDirective,
    DefaultGridAutoDirective,
    DefaultGridColumnDirective,
    DefaultGridColumnsDirective,
    DefaultGridGapDirective,
    DefaultGridRowDirective,
    DefaultGridRowsDirective,
];

/**
 * *****************************************************************
 * Define module for the CSS Grid API
 * *****************************************************************
 */

@NgModule({
    imports: [CoreModule, ...ALL_DIRECTIVES],
    exports: [...ALL_DIRECTIVES],
})
export class GridModule {}
