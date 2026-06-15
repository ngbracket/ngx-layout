/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TestBed, inject } from '@angular/core/testing';
import { sortDescendingPriority } from '../../utils/sort';

import { BreakPoint } from '../break-point';
import { BREAKPOINTS } from '../break-points-token';
import { mergeByAlias } from '../breakpoint-tools';
import { MATERIAL_BREAKPOINTS } from './material-break-points';

describe('material-break-points', () => {
  let breakPoints: BreakPoint[];

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [{ provide: BREAKPOINTS, useValue: MATERIAL_BREAKPOINTS }],
    });
  });
  beforeEach(inject([BREAKPOINTS], (bps: BreakPoint[]) => {
    breakPoints = [...bps].sort(sortDescendingPriority);
  }));

  it('exposes the same alias set as the default breakpoints', () => {
    expect(breakPoints.length).toEqual(MATERIAL_BREAKPOINTS.length);
    expect(breakPoints[0].alias).toEqual('xs');
    expect(breakPoints[breakPoints.length - 1].alias).toEqual('gt-xs');
  });

  it('derives suffixes when consumed through the breakpoint factory', () => {
    // The BREAKPOINTS factory merges provided breakpoints via `mergeByAlias`,
    // which fills in the camel-cased `suffix` used to build responsive inputs.
    const merged = mergeByAlias([], MATERIAL_BREAKPOINTS);
    const md = merged.find((bp) => bp.alias === 'md');
    const ltLg = merged.find((bp) => bp.alias === 'lt-lg');
    expect(md!.suffix).toEqual('Md');
    expect(ltLg!.suffix).toEqual('LtLg');
  });

  it('uses the modern Material 3 ranges (md starts at 900px)', () => {
    const find = (alias: string) =>
      breakPoints.find((bp) => bp.alias === alias)!;

    expect(find('xs').mediaQuery).toContain('max-width: 599.98px');
    expect(find('sm').mediaQuery).toContain('min-width: 600px');
    expect(find('md').mediaQuery).toContain('min-width: 900px');
    expect(find('md').mediaQuery).toContain('max-width: 1199.98px');
    expect(find('lg').mediaQuery).toContain('min-width: 1200px');
    expect(find('xl').mediaQuery).toContain('min-width: 1536px');
  });
});
