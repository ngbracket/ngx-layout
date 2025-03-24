import '@analogjs/vitest-angular/setup-zone';
import '@testing-library/jest-dom/vitest';
import './_private-utils/testing/custom-matchers';

import { getTestBed } from '@angular/core/testing';
import {
  ServerTestingModule,
  platformServerTesting,
} from '@angular/platform-server/testing';

getTestBed().initTestEnvironment(ServerTestingModule, platformServerTesting());
