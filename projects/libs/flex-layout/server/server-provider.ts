
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import {
  BreakPoint,
  BREAKPOINTS,
  CLASS_NAME,
  ɵMatchMedia as MatchMedia,
  MediaMarshaller,
  SERVER_TOKEN,
  sortAscendingPriority,
  StylesheetMap,
} from '@ngbracket/ngx-layout/core';

import { CSP_NONCE, Inject, Optional, DOCUMENT } from '@angular/core';
import { ServerMatchMedia } from './server-match-media';

/**
 * Activate all the registered breakpoints in sequence, and then
 * retrieve the associated stylings from the virtual stylesheet
 * @param serverSheet the virtual stylesheet that stores styles for each
 *        element
 * @param mediaController the MatchMedia service to activate/deactivate breakpoints
 * @param breakpoints the registered breakpoints to activate/deactivate
 * @param mediaMarshaller the MediaMarshaller service to disable fallback styles dynamically
 */
export function generateStaticFlexLayoutStyles(
  serverSheet: StylesheetMap,
  mediaController: ServerMatchMedia,
  breakpoints: BreakPoint[],
  mediaMarshaller: MediaMarshaller,
) {
  // Store the custom classes in the following map, that way only
  // one class gets allocated per HTMLElement, and each class can
  // be referenced in the static media queries
  const classMap = new Map<HTMLElement, string>();

  // Get the initial stylings for all the directives,
  // and initialize the fallback block of stylings.
  const defaultStyles = new Map(serverSheet.stylesheet);
  // Reset the class counter, otherwise class numbers will
  // increase with each server render.
  nextId = 0;
  let styleText = generateCss(defaultStyles, 'all', classMap);
  mediaMarshaller.useFallbacks = false;

  [...breakpoints].sort(sortAscendingPriority).forEach((bp) => {
    serverSheet.clearStyles();
    mediaController.activateBreakpoint(bp);
    const stylesheet = new Map(serverSheet.stylesheet);
    if (stylesheet.size > 0) {
      styleText += generateCss(stylesheet, bp.mediaQuery, classMap);
    }
    mediaController.deactivateBreakpoint(bp);
  });

  return styleText;
}

/**
 * Create a style tag populated with the dynamic stylings from Flex
 * components and attach it to the head of the DOM
 */
export function FLEX_SSR_SERIALIZER_FACTORY(
  serverSheet: StylesheetMap,
  mediaController: ServerMatchMedia,
  _document: Document,
  breakpoints: BreakPoint[],
  mediaMarshaller: MediaMarshaller,
  _nonce?: string,
) {
  return () => {
    // This is the style tag that gets inserted into the head of the DOM,
    // populated with the manual media queries
    const styleTag = _document.createElement('style');
    if (_nonce) {
      styleTag.setAttribute('nonce', _nonce);
    }
    const styleText = generateStaticFlexLayoutStyles(
      serverSheet,
      mediaController,
      breakpoints,
      mediaMarshaller,
    );
    styleTag.classList.add(`${CLASS_NAME}ssr`);
    styleTag.textContent = styleText;
    _document.head!.appendChild(styleTag);
  };
}

/**
 *  Provider to set static styles on the server
 */
export const SERVER_PROVIDERS = [
  {
    provide: BEFORE_APP_SERIALIZED,
    useFactory: FLEX_SSR_SERIALIZER_FACTORY,
    deps: [
      StylesheetMap,
      MatchMedia,
      DOCUMENT,
      BREAKPOINTS,
      MediaMarshaller,
      [new Optional(), new Inject(CSP_NONCE)],
    ],
    multi: true,
  },
  {
    provide: SERVER_TOKEN,
    useValue: true,
  },
  {
    provide: MatchMedia,
    useClass: ServerMatchMedia,
  },
];

let nextId = 0;
const IS_DEBUG_MODE = false;

export type StyleSheet = Map<HTMLElement, Map<string, string | number>>;
export type ClassMap = Map<HTMLElement, string>;

/**
 * create @media queries based on a virtual stylesheet
 * * Adds a unique class to each element and stores it
 *   in a shared classMap for later reuse
 * @param stylesheet the virtual stylesheet that stores styles for each
 *        element
 * @param mediaQuery the given @media CSS selector for the current breakpoint
 * @param classMap the map of HTML elements to class names to avoid duplications
 */
function generateCss(
  stylesheet: StyleSheet,
  mediaQuery: string,
  classMap: ClassMap,
) {
  let css = '';
  stylesheet.forEach((styles, el) => {
    let keyVals = '';
    let className = getClassName(el, classMap);

    styles.forEach((v, k) => {
      keyVals += v ? format(`${k}:${v};`) : '';
    });

    if (keyVals) {
      // Build list of CSS styles; each with a className
      css += format(`.${className} {`, keyVals, '}');
    }
  });

  // Group 1 or more styles (each with className) in a specific mediaQuery
  return format(`@media ${mediaQuery} {`, css, '}');
}

/**
 * For debugging purposes, prefix css segment with linefeed(s) for easy
 * debugging purposes.
 */
function format(...list: string[]): string {
  let result = '';
  list.forEach((css, i) => {
    result += IS_DEBUG_MODE ? formatSegment(css, i !== 0) : css;
  });
  return result;
}

function formatSegment(css: string, asPrefix: boolean = true): string {
  return asPrefix ? `\n${css}` : `${css}\n`;
}

/**
 * Get className associated with CSS styling
 * If not found, generate global className and set
 * association.
 */
function getClassName(
  element: HTMLElement,
  classMap: Map<HTMLElement, string>,
) {
  let className = classMap.get(element);
  if (!className) {
    className = `${CLASS_NAME}${nextId++}`;
    classMap.set(element, className);
  }
  element.classList.add(className);

  return className;
}
