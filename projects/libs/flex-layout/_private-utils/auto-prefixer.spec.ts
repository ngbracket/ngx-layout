/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { applyCssPrefixes } from './auto-prefixer';
import { extendObject } from './object-extend';

describe('auto-prefixer for ', () => {

  /**
   * display
   */
  describe('css `display:<xxx>`', () => {

    it('should not apply a prefix', () => {
      const input = {'display': 'block'};
      const expected = {'display': 'block'};
      const actual = applyCssPrefixes(input);
      checkCssPrefix('display', actual, expected);
    });

    it('should apply prefixes for display', () => {
      const input = {'display': 'flex'};
      const actual = applyCssPrefixes(input);

      expect(Array.isArray(actual['display'])).toBeTruthy();

      // `display:flex` should be last
      expect(actual['display'][0]).toEqual('-webkit-flex');
      expect(actual['display'][1]).toEqual('flex');
    });

  });

  /**
   * flex
   */
  describe('css `flex:<xxx>`', () => {

    it('should apply prefixes for single values', () => {
      const input = {'flex': '100'};
      const expected = extendObject({}, input, {
        '-webkit-flex': '100'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('flex', actual, expected);
    });

    it('should apply prefixes for multiple values', () => {
      const input = {'flex': '2 1 50%'};
      const expected = extendObject({}, input, {
        '-webkit-flex': '2 1 50%'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('flex', actual, expected);
    });

  });

  /**
   * flex-direction
   */
  describe('css `flex-direction:<xxx>`', () => {

    it('should apply prefixes for value == "row"', () => {
      const input = {'flex-direction': 'row'};
      const expected = extendObject({}, input, {
        '-webkit-flex-direction': 'row'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('flex-direction', actual, expected);
    });

    it('should apply prefixes for value == "row-reverse"', () => {
      const input = {'flex-direction': 'row-reverse'};
      const expected = extendObject({}, input, {
        '-webkit-flex-direction': 'row-reverse'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('flex-direction', actual, expected);
    });

    it('should apply prefixes for value == "column"', () => {
      const input = {'flex-direction': 'column'};
      const expected = extendObject({}, input, {
        '-webkit-flex-direction': 'column'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('flex-direction', actual, expected);
    });

    it('should apply prefixes for value == "column-reverse"', () => {
      const input = {'flex-direction': 'column-reverse'};
      const expected = extendObject({}, input, {
        '-webkit-flex-direction': 'column-reverse'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('flex-direction', actual, expected);
    });

  });

  /**
   * flex-wrap
   */
  describe('css `flex-wrap:<xxx>`', () => {

    it('should apply a prefix', () => {
      const input = {'flex-wrap': 'nowrap'};
      const expected = extendObject({}, input, {
        '-webkit-flex-wrap' : 'nowrap'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('flex-wrap', actual, expected);
    });
  });

  /**
   * order
   */
  describe('css `order:<xxx>`', () => {

    it('should apply a prefix', () => {
      const input = {'order': '1'};
      const expected = extendObject({}, input, {
        '-webkit-order' : '1'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('order', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'order': 'invalid'};
      const expected = extendObject({}, input, {
        'order': '0',
        '-webkit-order' : '0'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('order', actual, expected);
    });

  });


  /**
   * justify-content
   */
  describe('css `justify-content:<xxx>`', () => {

    it('should apply a prefix', () => {
      const input = {'justify-content': 'flex-start'};
      const expected = extendObject({}, input, {
        '-webkit-justify-content': 'flex-start'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('justify-content', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'justify-content': 'flex-end'};
      const expected = extendObject({}, input, {
        '-webkit-justify-content': 'flex-end'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('justify-content', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'justify-content': 'center'};
      const expected = extendObject({}, input, {
        '-webkit-justify-content': 'center'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('justify-content', actual, expected);
    });
  });

  /**
   * align-items
   */
  describe('css `align-item:<xxx>`', () => {

    it('should apply a prefix', () => {
      const input = {'align-items': 'flex-start'};
      const expected = extendObject({}, input, {
        '-webkit-align-items': 'flex-start'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-items', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'align-items': 'flex-end'};
      const expected = extendObject({}, input, {
        '-webkit-align-items': 'flex-end'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-items', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'align-items': 'center'};
      const expected = extendObject({}, input, {
        '-webkit-align-items': 'center'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-items', actual, expected);
    });


  });


  /**
   * align-self
   */
  describe('css `align-self:<xxx>`', () => {

    it('should apply a prefix', () => {
      const input = {'align-self': 'flex-start'};
      const expected = extendObject({}, input, {
        '-webkit-align-self' : 'flex-start'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-self', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'align-self': 'flex-end'};
      const expected = extendObject({}, input, {
        '-webkit-align-self' : 'flex-end'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-self', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'align-self': 'center'};
      const expected = extendObject({}, input, {
        '-webkit-align-self' : 'center'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-self', actual, expected);
    });

  });

  /**
   * align-self
   */
  describe('css `align-content:<xxx>`', () => {

    it('should apply a prefix', () => {
      const input = {'align-content': 'flex-start'};
      const expected = extendObject({}, input, {
        '-webkit-align-content': 'flex-start'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-content', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'align-content': 'flex-end'};
      const expected = extendObject({}, input, {
        '-webkit-align-content' : 'flex-end'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-content', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'align-content': 'center'};
      const expected = extendObject({}, input, {
        '-webkit-align-content': 'center'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-content', actual, expected);
    });

    it('should apply a prefix', () => {
      const input = {'align-content': 'stretch'};
      const expected = extendObject({}, input, {
        '-webkit-align-content': 'stretch'
      });
      const actual = applyCssPrefixes(input);
      checkCssPrefix('align-content', actual, expected);
    });
  });


});

/**
 * Internal checks to `expect().toEqual()`
 */
function checkCssPrefix(key: string,
                        actual: {[key: string]: string},
                        expected: {[key: string]: string}) {
  expect(actual[key]).toEqual(expected[key]);
  switch (key) {
    case 'display':
      expect(actual['display']).toEqual(expected[key]);
      break;

    case 'align-items':
    case 'align-self':
    case 'align-content':
    case 'flex':
    case 'flex-direction':
    case 'flex-wrap':
    case 'flex-grow':
    case 'flex-shrink':
    case 'flex-basis':
    case 'flex-flow':
    case 'justify-content':
    case 'order':
      expect(actual[key]).toEqual(expected['-webkit-' + key]);
      break;
  }
}
