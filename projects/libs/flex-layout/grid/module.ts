import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';

import { GridAlignColumnsDirective } from './align-columns/align-columns';
import { GridAlignRowsDirective } from './align-rows/align-rows';
import { GridAreaDirective } from './area/area';
import { GridAreasDirective } from './areas/areas';
import { GridAutoDirective } from './auto/auto';
import { GridColumnDirective } from './column/column';
import { GridColumnsDirective } from './columns/columns';
import { GridGapDirective } from './gap/gap';
import { GridAlignDirective } from './grid-align/grid-align';
import { GridRowDirective } from './row/row';
import { GridRowsDirective } from './rows/rows';

const ALL_DIRECTIVES = [
  GridAlignDirective,
  GridAlignColumnsDirective,
  GridAlignRowsDirective,
  GridAreaDirective,
  GridAreasDirective,
  GridAutoDirective,
  GridColumnDirective,
  GridColumnsDirective,
  GridGapDirective,
  GridRowDirective,
  GridRowsDirective,
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
