import { expect } from 'vitest';

import { _dom as _ } from './dom-tools';
import { applyCssPrefixes, extendObject } from '@ngbracket/ngx-layout/_private-utils';
import { StyleUtils } from '@ngbracket/ngx-layout/core';

export interface NgMatchers<R = unknown> {
  toHaveText(expected: string): R;
  toHaveMap(expected: { [k: string]: string }): R;
  toHaveCssClass(expected: string): R;
  toHaveAttributes(expected: { [k: string]: string }): R;
  toHaveStyle(expected: { [k: string]: string } | string, styler?: StyleUtils): R;
  toHaveCSS(expected: { [k: string]: string } | string, styler?: StyleUtils): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends NgMatchers<T> {}
  interface AsymmetricMatchersContaining extends NgMatchers {}
}

expect.extend({
  toHaveText(received: any, expectedText: string) {
    const actualText = elementText(received);
    return {
      pass: actualText === expectedText,
      message: () => `Expected '${actualText}' to equal '${expectedText}'`,
    };
  },

  toHaveCssClass(received: any, className: string) {
    return {
      pass: _.hasClass(received, className),
      message: () =>
        `Expected ${received.outerHTML} to contain CSS class '${className}'`,
    };
  },

  toHaveMap(received: { [k: string]: string }, map: { [k: string]: string }) {
    let allPassed = Object.keys(map).length !== 0;
    Object.keys(map).forEach((key) => {
      allPassed = allPassed && received[key] === map[key];
    });
    return {
      pass: allPassed,
      message: () =>
        `Expected ${JSON.stringify(received)} to contain '${JSON.stringify(map)}'`,
    };
  },

  toHaveAttributes(received: any, map: { [k: string]: string }) {
    const attributeNames = Object.keys(map);
    let allPassed = attributeNames.length !== 0;
    attributeNames.forEach((name) => {
      allPassed =
        allPassed &&
        _.hasAttribute(received, name) &&
        _.getAttribute(received, name) === map[name];
    });
    return {
      pass: allPassed,
      message: () =>
        `Expected ${received.outerHTML} attributes to contain '${JSON.stringify(map)}'`,
    };
  },

  toHaveStyle(
    received: any,
    styles: { [k: string]: string } | string,
    styler: StyleUtils,
  ) {
    const { allPassed, styleMap } = checkStyles(received, styles, true, styler);
    return {
      pass: allPassed,
      message: () => {
        const expectedStr =
          typeof styles === 'string' ? styleMap : JSON.stringify(styleMap, null, 2);
        return `Expected ${received.outerHTML} to have inline CSS styles '${expectedStr}'`;
      },
    };
  },

  toHaveCSS(
    received: any,
    styles: { [k: string]: string } | string,
    styler: StyleUtils,
  ) {
    const { allPassed, styleMap } = checkStyles(received, styles, false, styler);
    return {
      pass: allPassed,
      message: () => {
        const expectedStr =
          typeof styles === 'string' ? styleMap : JSON.stringify(styleMap, null, 2);
        return `Expected element to have CSS '${expectedStr}'`;
      },
    };
  },
});

function checkStyles(
  actual: HTMLElement,
  styles: { [k: string]: string } | string,
  inlineOnly: boolean,
  styler: StyleUtils,
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
    const { elHasStyle, current } = hasPrefixedStyles(
      actual,
      prop,
      styleMap[prop],
      inlineOnly,
      styler,
    );
    allPassed = allPassed && elHasStyle;
    if (!elHasStyle) {
      extendObject(found, current);
    }
  });

  return { allPassed, styleMap, found };
}

function hasPrefixedStyles(
  actual: HTMLElement,
  key: string,
  value: string,
  inlineOnly: boolean,
  styler: StyleUtils,
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
    const prefixedStyles = applyCssPrefixes({ [key]: value });
    Object.keys(prefixedStyles).forEach((prop) => {
      elHasStyle =
        elHasStyle ||
        styler.lookupStyle(actual, prop, inlineOnly) === prefixedStyles[prop];
    });
  }
  return { elHasStyle, current };
}

function elementText(n: any): string {
  const hasNodes = (m: any) => {
    const children = _.childNodes(m);
    return children && children['length'];
  };

  if (n instanceof Array) {
    return n.map(elementText).join('');
  }
  if (_.isCommentNode(n)) {
    return '';
  }
  if (_.isElementNode(n) && _.tagName(n) === 'CONTENT') {
    return elementText(Array.prototype.slice.apply(_.getDistributedNodes(n)));
  }
  if (_.hasShadowRoot(n)) {
    return elementText(_.childNodesAsList(_.getShadowRoot(n)));
  }
  if (hasNodes(n)) {
    return elementText(_.childNodesAsList(n));
  }
  return _.getText(n);
}
