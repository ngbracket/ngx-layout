/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import {
  ɵMatchMedia as MatchMedia,
  ɵMockMatchMedia as MockMatchMedia,
  ɵMockMatchMediaProvider as MockMatchMediaProvider,
  SERVER_TOKEN,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

import {
  expectNativeEl,
  makeCreateTestComponent,
} from '@ngbracket/ngx-layout/_private-utils/testing';

import { GridModule } from '../module';

describe('grid rows parent directive', () => {
  let fixture: ComponentFixture<any>;
  let styler: StyleUtils;
  let mediaController: MockMatchMedia;
  let platform: Platform;
  let shouldRun = true;
  let createTestComponent = (template: string, styles?: any) => {
    shouldRun = true;
    fixture = makeCreateTestComponent(() => TestGridRowsComponent)(
      template,
      styles
    );
    inject(
      [StyleUtils, MatchMedia, Platform],
      (
        _styler: StyleUtils,
        _matchMedia: MockMatchMedia,
        _platform: Platform
      ) => {
        styler = _styler;
        mediaController = _matchMedia;
        platform = _platform;

        // TODO(CaerusKaru): Grid tests won't work with Edge 14
        if (_platform.EDGE) {
          shouldRun = false;
        }
      }
    )();
  };

  beforeEach(() => {


    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      imports: [CommonModule, GridModule],
      declarations: [TestGridRowsComponent],
      providers: [
        MockMatchMediaProvider,
        { provide: SERVER_TOKEN, useValue: true },
      ],
    });
  });

  describe('with static features', () => {
    it('should add row styles for parent', () => {
      let template = `
              <div gdRows="100px 1fr">
                  <div gdArea="header"></div>
                  <div gdArea="sidebar"></div>
                  <div gdArea="footer"></div>
              </div>
          `;
      createTestComponent(template);

      if (!shouldRun) {
        return;
      }

      expectNativeEl(fixture).toHaveInlineStyle(
        {
          display: 'grid',
          'grid-template-rows': '100px 1fr',
        },
        styler
      );
    });

    it('should add auto row styles for parent', () => {
      let template = `
              <div gdRows="100px 1fr auto!">
                  <div gdArea="header"></div>
                  <div gdArea="sidebar"></div>
                  <div gdArea="footer"></div>
              </div>
          `;
      createTestComponent(template);

      if (!shouldRun) {
        return;
      }

      // TODO(CaerusKaru): Firefox has an issue with auto tracks,
      // caused by rachelandrew/gridbugs#1
      if (!platform.FIREFOX) {
        expectNativeEl(fixture).toHaveInlineStyle(
          {
            display: 'grid',
            'grid-auto-rows': '100px 1fr auto',
          },
          styler
        );
      }
    });

    it('should work with inline grid', () => {
      let template = `
              <div gdRows="100px 1fr" gdInline>
                  <div gdArea="header"></div>
                  <div gdArea="sidebar"></div>
                  <div gdArea="footer"></div>
              </div>
          `;
      createTestComponent(template);

      if (!shouldRun) {
        return;
      }

      expectNativeEl(fixture).toHaveInlineStyle(
        {
          display: 'inline-grid',
          'grid-template-rows': '100px 1fr',
        },
        styler
      );
    });

    it('should add dynamic rows styles', () => {
      let template = `
            <div [gdRows]='cols'></div>
          `;
      createTestComponent(template);

      if (!shouldRun) {
        return;
      }

      expectNativeEl(fixture).toHaveInlineStyle(
        {
          display: 'grid',
          'grid-template-rows': '50px 1fr',
        },
        styler
      );

      fixture.componentInstance.cols = '100px 1fr';

      expectNativeEl(fixture).toHaveInlineStyle(
        {
          display: 'grid',
          'grid-template-rows': '100px 1fr',
        },
        styler
      );
    });
  });

  describe('with responsive features', () => {
    it('should add col styles for a parent', () => {
      let template = `
              <div gdRows="100px 1fr"
                   gdRows.xs="50px 1fr"></div>
          `;
      createTestComponent(template);

      if (!shouldRun) {
        return;
      }

      expectNativeEl(fixture).toHaveInlineStyle(
        {
          display: 'grid',
          'grid-template-rows': '100px 1fr',
        },
        styler
      );

      mediaController.activate('xs');
      expectNativeEl(fixture).toHaveInlineStyle(
        {
          display: 'grid',
          'grid-template-rows': '50px 1fr',
        },
        styler
      );

      mediaController.activate('md');
      expectNativeEl(fixture).toHaveInlineStyle(
        {
          display: 'grid',
          'grid-template-rows': '100px 1fr',
        },
        styler
      );
    });
  });
});

// *****************************************************************
// Template Component
// *****************************************************************
@Component({
  selector: 'test-layout',
  template: `<span>PlaceHolder Template HTML</span>`,
  standalone: false,
})
class TestGridRowsComponent {
  cols = '50px 1fr';
}
