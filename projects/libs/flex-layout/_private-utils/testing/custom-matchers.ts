declare var global: any;
const _global = <any>(typeof window === 'undefined' ? global : window);

import { _dom as _ } from './dom-tools';

import {
  applyCssPrefixes,
  extendObject,
} from '@ngbracket/ngx-layout/_private-utils';
import { StyleUtils } from '@ngbracket/ngx-layout/core';

export const expect: (actual: any) => NgMatchers = <any>_global.expect;

/**
 * Jasmine matchers that check Angular specific conditions.
 */
export interface NgMatchers extends jasmine.Matchers<any> {
  /**
   * Expect the element to have the given CSS styles injected INLINE
   *
   * ## Example
   *
   * {@example testing/ts/matchers.ts region='toHaveStyle'}
   */
  toHaveStyle(expected: { [k: string]: string } | string): boolean;

  /**
   * Expect the element to have the given CSS inline OR computed styles.
   *
   * ## Example
   *
   * {@example testing/ts/matchers.ts region='toHaveStyle'}
   */
  toHaveCSS(expected: { [k: string]: string } | string): boolean;

  /**
   * Invert the matchers.
   */
  not: NgMatchers;
}

/**
 * NOTE: These custom JASMINE Matchers are used only
 *       in the Karma/Jasmine testing for the Layout Directives
 *       in `src/lib/flex/api`
 */
export const customMatchers: jasmine.CustomMatcherFactories = {
  /**
   * Check element's inline styles only
   */
  toHaveStyle: function () {
    return {
      compare: buildCompareStyleFunction(true),
    };
  },

  /**
   * Check element's css stylesheet only (if not present inline)
   */
  toHaveCSS: function () {
    return {
      compare: buildCompareStyleFunction(false),
    };
  },
};

/**
 * Curried value to function to check styles that are inline or in a stylesheet for the
 * specified DOM element.
 */
function buildCompareStyleFunction(inlineOnly = true) {
  return function (
    actual: any,
    styles: { [k: string]: string } | string,
    styler: StyleUtils
  ) {
    const found = {};
    const styleMap: { [k: string]: string } = {};

    if (typeof styles === 'string') {
      styleMap[styles] = '';
    } else {
      Object.assign(styleMap, styles);
    }

    let allPassed = Object.keys(styleMap).length !== 0;
    Object.keys(styleMap).forEach((prop) => {
      let { elHasStyle, current } = hasPrefixedStyles(
        actual,
        prop,
        styleMap[prop],
        inlineOnly,
        styler
      );
      allPassed = allPassed && elHasStyle;
      if (!elHasStyle) {
        extendObject(found, current);
      }
    });

    return {
      pass: allPassed,
      get message() {
        const expectedValueStr =
          typeof styles === 'string'
            ? styleMap
            : JSON.stringify(styleMap, null, 2);
        const foundValueStr = inlineOnly
          ? actual.outerHTML
          : JSON.stringify(found);
        return `
          Expected ${foundValueStr}${!allPassed ? '' : ' not'} to contain the
          CSS ${
            typeof styles === 'string' ? 'property' : 'styles'
          } '${expectedValueStr}'
        `;
      },
    };
  };
}

/**
 * Validate presence of requested style or use fallback
 * to possible `prefixed` styles. Useful when some browsers
 * (Safari, IE, etc) will use prefixed style instead of defaults.
 */
function hasPrefixedStyles(
  actual: HTMLElement,
  key: string,
  value: string,
  inlineOnly: boolean,
  styler: StyleUtils
) {
  const current = {};

  if (value === '*') {
    return {
      elHasStyle: styler.lookupStyle(actual, key, inlineOnly) !== '',
      current,
    };
  }

  value = value.trim();
  let elHasStyle = styler.lookupStyle(actual, key, inlineOnly) === value;
  if (!elHasStyle) {
    let prefixedStyles = applyCssPrefixes({ [key]: value });
    Object.keys(prefixedStyles).forEach((prop) => {
      // Search for optional prefixed values
      elHasStyle =
        elHasStyle ||
        styler.lookupStyle(actual, prop, inlineOnly) === prefixedStyles[prop];
    });
  }
  // Return BOTH confirmation and current computed key values (if confirmation == false)
  return { elHasStyle, current };
}
