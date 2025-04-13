import '@analogjs/vitest-angular/setup-zone';

import { getTestBed } from '@angular/core/testing';
import {
  ServerTestingModule,
  platformServerTesting,
} from '@angular/platform-server/testing';

getTestBed().initTestEnvironment(
  ServerTestingModule,
  platformServerTesting(),
);
