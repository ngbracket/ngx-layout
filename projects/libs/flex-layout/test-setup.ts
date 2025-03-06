import '@analogjs/vitest-angular/setup-zone';
import '@testing-library/jest-dom/vitest';
import './_private-utils/testing/custom-matchers';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
