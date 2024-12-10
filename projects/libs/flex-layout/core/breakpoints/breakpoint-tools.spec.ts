/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BreakPoint } from './break-point';
import { mergeByAlias, validateSuffixes } from './breakpoint-tools';
import { DEFAULT_BREAKPOINTS } from './data/break-points';
import { ORIENTATION_BREAKPOINTS } from './data/orientation-break-points';

describe('breakpoint-tools', () => {
  let allBreakPoints: BreakPoint[] = [];
  const findByAlias = (alias: string): BreakPoint => {
    let result = {mediaQuery: '', alias: ''};
    allBreakPoints.forEach(bp => {
      if (bp.alias === alias) {
        result = {...bp};
      }
    });
    return result;
  };

  beforeEach(() => {
    allBreakPoints = validateSuffixes([...DEFAULT_BREAKPOINTS, ...ORIENTATION_BREAKPOINTS]);
  });

  describe('validation ', () => {

    it('should not replace an existing suffix', () => {
      const validated = validateSuffixes([
        {alias: 'handset-portrait', suffix: 'Handset', mediaQuery: 'screen'}
      ]);
      expect(validated[0].suffix).toEqual('Handset');
    });

    it('should add valid suffixes to breakpoints', () => {
      const validated = validateSuffixes([
        {alias: 'xs', mediaQuery: 'screen and (max-width: 599px)'},
        {alias: 'gt-lg', mediaQuery: 'screen and (max-width: 599px)'},
        {alias: 'gt_md', mediaQuery: 'screen and (max-width: 599px)'},
        {alias: 'gt.xs', mediaQuery: 'screen and (max-width: 599px)'},
        {alias: 'handset-portrait', mediaQuery: 'screen and (max-width: 599px)'}
      ]);
      expect(validated[0].suffix).toEqual('Xs');
      expect(validated[1].suffix).toEqual('GtLg');
      expect(validated[2].suffix).toEqual('GtMd');
      expect(validated[3].suffix).toEqual('GtXs');
      expect(validated[4].suffix).toEqual('HandsetPortrait');
    });

    it('should auto-validate the DEFAULT_BREAKPOINTS', () => {
      const xsBp: BreakPoint = findByAlias('xs');
      expect(xsBp.alias).toEqual('xs');
      expect(xsBp.suffix).toEqual('Xs');

      const gtLgBp: BreakPoint = findByAlias('gt-lg');
      expect(gtLgBp.alias).toEqual('gt-lg');
      expect(gtLgBp.suffix).toEqual('GtLg');

      const xlBp: BreakPoint = findByAlias('xl');
      expect(xlBp.alias).toEqual('xl');
      expect(xlBp.suffix).toEqual('Xl');
    });
  });

  describe('merges', () => {
    it('should add custom breakpoints with empty defaults', () => {
      const defaults: BreakPoint[] = [], custom = [
        {alias: 'sm', mediaQuery: 'screen'},
        {alias: 'md', mediaQuery: 'screen'},
      ];
      allBreakPoints = mergeByAlias(defaults, custom);

      expect(allBreakPoints.length).toEqual(2);
      expect(findByAlias('sm')!.suffix).toEqual('Sm');
      expect(findByAlias('md')!.suffix).toEqual('Md');
    });
    it('should add custom breakpoints with unique aliases', () => {
      const defaults = [{alias: 'xs', mediaQuery: 'screen and (max-width: 599px)'}],
          custom = [{alias: 'sm', mediaQuery: 'screen'}, {alias: 'md', mediaQuery: 'screen'}];

      allBreakPoints = mergeByAlias(defaults, custom);

      expect(allBreakPoints.length).toEqual(3);
      expect(findByAlias('xs')!.suffix).toEqual('Xs');
      expect(findByAlias('sm')!.suffix).toEqual('Sm');
      expect(findByAlias('md')!.suffix).toEqual('Md');
    });
    it('should overwrite existing breakpoints with matching aliases', () => {
      const defaults = [{alias: 'xs', mediaQuery: 'screen and (max-width: 599px)'}];
      const custom = [{alias: 'xs', mediaQuery: 'screen and none'}];

      allBreakPoints = mergeByAlias(defaults, custom);

      expect(allBreakPoints.length).toEqual(1);
      expect(findByAlias('xs')!.suffix).toEqual('Xs');
      expect(findByAlias('xs')!.mediaQuery).toEqual('screen and none');
    });
  });

});
