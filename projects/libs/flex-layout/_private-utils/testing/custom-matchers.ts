import {
  applyCssPrefixes,
  extendObject,
} from '@ngbracket/ngx-layout/_private-utils';
import { StyleUtils } from '@ngbracket/ngx-layout/core';
 // This line is important even if imported values are not used! See https://stackoverflow.com/a/78524129/1071200
import type { Assertion, AsymmetricMatchersContaining, ExpectStatic } from 'vitest';
// import { expect } from 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> extends NgMatchers<T> {}
  interface AsymmetricMatchersContaining extends NgMatchers {}
}

interface ExpectationResult {
  pass: boolean;
  message: () => string;
  // If you pass these, they will automatically appear inside a diff when
  // the matcher does not pass, so you don't need to print the diff yourself
  actual?: unknown;
  expected?: unknown;
}

/**
 * Jasmine matchers that check Angular specific conditions.
 */
// export interface NgMatchers extends jasmine.Matchers<any> {
export interface NgMatchers<R = unknown> {
  /**
   * Expect the element to have the given CSS styles injected INLINE
   *
   * ## Example
   *
   * {@example testing/ts/matchers.ts region='toHaveStyle'}
   */
  toHaveInlineStyle(
    expected: { [k: string]: string } | string,
    styler: StyleUtils
  ): R;

  /**
   * Expect the element to have the given CSS inline OR computed styles.
   *
   * ## Example
   *
   * {@example testing/ts/matchers.ts region='toHaveStyle'}
   */
  toHaveCSS(expected: { [k: string]: string } | string, styler: StyleUtils): R;

  // /**
  //  * Invert the matchers.
  //  */
  // not: NgMatchers;
}

/**
 * NOTE: These custom JASMINE Matchers are used only
 *       in the Karma/Jasmine testing for the Layout Directives
 *       in `src/lib/flex/api`
 */
export const customMatchers: Record<
  string,
  (received: any, ...expected: any[]) => ExpectationResult
> = {
  /**
   * Check element's inline styles only
   */
  toHaveInlineStyle: buildCompareStyleFunction(true),

  /**
   * Check element's css stylesheet only (if not present inline)
   */
  toHaveCSS: buildCompareStyleFunction(false),
};

((globalThis as any).expect as ExpectStatic).extend(customMatchers);

/**
 * Curried value to function to check styles that are inline or in a stylesheet for the
 * specified DOM element.
 */
function buildCompareStyleFunction(inlineOnly = true) {
  return function (
    actual: any,
    styles: { [k: string]: string } | string,
    styler: StyleUtils
  ): ExpectationResult {
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
      message() {
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
