/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import {
  FlexDirective,
  FlexOrderDirective,
  LayoutDirective,
  LayoutGapDirective,
} from '@ngbracket/ngx-layout/flex';
import { ShowHideDirective } from '@ngbracket/ngx-layout/extended';
import {
  expectNativeEl,
  makeCreateTestComponent,
} from '@ngbracket/ngx-layout/_private-utils/testing';
import {
  ɵMatchMedia as MatchMedia,
  ɵMockMatchMedia as MockMatchMedia,
  ɵMockMatchMediaProvider as MockMatchMediaProvider,
  SERVER_TOKEN,
  StyleBuilder,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';
import { FlexModule } from '../module';
import { LayoutGapStyleBuilder } from './layout-gap';

describe('layout-gap directive', () => {
  let fixture: ComponentFixture<any>;
  let fakeDocument: {
    body: { dir?: string };
    documentElement: { dir?: string };
  };
  let styler: StyleUtils;
  let platformId: object;
  let mediaController: MockMatchMedia;
  const createTestComponent = (template: string, styles?: any) => {
    fixture = makeCreateTestComponent(() => TestLayoutGapComponent)(
      template,
      styles,
    );
    inject(
      [MatchMedia, StyleUtils, PLATFORM_ID],
      (
        _matchMedia: MockMatchMedia,
        _styler: StyleUtils,
        _platformId: object,
      ) => {
        mediaController = _matchMedia;
        styler = _styler;
        platformId = _platformId;
      },
    )();
  };

  beforeEach(() => {
    fakeDocument = { body: {}, documentElement: {} };

    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule.withConfig({
          multiplier: {
            value: 4,
            unit: 'px',
          },
        }),
        TestLayoutGapComponent,
      ],
      providers: [
        MockMatchMediaProvider,
        { provide: DIR_DOCUMENT, useValue: fakeDocument },
        { provide: SERVER_TOKEN, useValue: true },
      ],
    });
  });

  /**
   * `fxLayoutGap` applies the native CSS `gap` property to the flex container
   * itself, so spacing is added both within a row/column and between wrapped
   * rows. The gap is direction-independent (it works the same for row/column
   * and for ltr/rtl).
   */
  function verifyContainerGap(layout: string, gap: string) {
    const template = `
            <div fxLayout='${layout}' fxLayoutGap='${gap}'>
                <span></span>
                <span></span>
            </div>
        `;
    createTestComponent(template);
    expectNativeEl(fixture).toHaveStyle({ gap }, styler);
  }

  describe('with static features', () => {
    it('should set the gap on the container', () => {
      const template = `
              <div fxLayout='row' fxLayoutGap='13px'>
                  <div fxFlex></div>
                  <div fxFlex></div>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '13px' }, styler);
    });

    it('should set the gap on the container even with a single child', () => {
      const template = `
              <div fxLayout='row' fxLayoutGap='13px'>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '13px' }, styler);
    });

    it('should apply the multiplier to the gap value', () => {
      const template = `
              <div fxLayout='row' fxLayoutGap='13x'>
                  <div fxFlex></div>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '52px' }, styler);
    });

    it('should add the default unit when the gap value has no unit', () => {
      const template = `
              <div fxLayout='row' fxLayoutGap='13'>
                  <div fxFlex></div>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '13px' }, styler);
    });

    it('should support a two-value (row/column) gap', () => {
      const template = `
              <div fxLayout='row wrap' fxLayoutGap='13px 24px'>
                  <div fxFlex></div>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '13px 24px' }, styler);
    });

    it('should set the gap for a row layout', () => {
      verifyContainerGap('row', '8px');
    });

    it('should set the same gap for a column layout', () => {
      verifyContainerGap('column', '8px');
    });
  });

  describe('legacy grid option', () => {
    // The ' grid' suffix is retained for backwards compatibility but is now a
    // no-op modifier: CSS `gap` already handles wrapped rows, so the value is
    // emitted as a plain `gap` with no child padding or negative host margin.
    it('should treat the grid suffix as a plain gap', () => {
      const template = `
        <div fxLayoutGap='13px grid'>
          <div fxFlex></div>
          <div fxFlex></div>
          <div fxFlex></div>
        </div>
      `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '13px' }, styler);
    });

    it('should apply the multiplier with the grid suffix', () => {
      const template = `
        <div fxLayoutGap='13x grid'>
          <div fxFlex></div>
          <div fxFlex></div>
        </div>
      `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '52px' }, styler);
    });

    it('should support two values with the grid suffix', () => {
      const template = `
        <div fxLayoutGap='13px 12px grid'>
          <div fxFlex></div>
          <div fxFlex></div>
        </div>
      `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '13px 12px' }, styler);
    });
  });

  describe('with responsive features', () => {
    it('should update the gap on breakpoint activation', () => {
      const template = `
        <div fxLayout='row' fxLayoutGap='8px' fxLayoutGap.xs='16px'>
          <div fxFlex></div>
          <div fxFlex></div>
        </div>
      `;
      createTestComponent(template);
      expectNativeEl(fixture).toHaveStyle({ gap: '8px' }, styler);

      mediaController.activate('xs');
      expectNativeEl(fixture).toHaveStyle({ gap: '16px' }, styler);

      mediaController.activate('lg');
      expectNativeEl(fixture).toHaveStyle({ gap: '8px' }, styler);
    });

    it('should clear the gap when a breakpoint-only value deactivates', () => {
      const template = `
        <div fxLayout='row' fxLayoutGap.md='24px'>
          <div fxFlex></div>
          <div fxFlex></div>
        </div>
      `;
      createTestComponent(template);
      mediaController.activate('sm');
      expectNativeEl(fixture).not.toHaveStyle({ gap: '*' }, styler);

      mediaController.activate('md');
      expectNativeEl(fixture).toHaveStyle({ gap: '24px' }, styler);

      mediaController.activate('sm');
      expectNativeEl(fixture).not.toHaveStyle({ gap: '*' }, styler);
    });
  });

  describe('rtl support', () => {
    // The CSS `gap` property has no notion of side, so the emitted value is
    // identical regardless of the document writing direction.
    it('should use the same gap when document body has rtl dir', () => {
      fakeDocument.body.dir = 'rtl';
      verifyContainerGap('row', '8px');
    });

    it('should use the same gap when documentElement has rtl dir', () => {
      fakeDocument.documentElement.dir = 'rtl';
      verifyContainerGap('row', '8px');
    });

    it('should use the same gap in column layout when body has rtl dir', () => {
      fakeDocument.body.dir = 'rtl';
      verifyContainerGap('column', '8px');
    });
  });

  describe('with custom builder', () => {
    beforeEach(() => {
      // Configure testbed to prepare services
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FlexLayoutModule.withConfig({
            useColumnBasisZero: false,
            serverLoaded: true,
          }),
        ],
        providers: [
          {
            provide: LayoutGapStyleBuilder,
            useClass: MockLayoutGapStyleBuilder,
          },
        ],
      });
    });

    it('should use the configured style builder', () => {
      createTestComponent(`
        <div fxLayoutGap='10px'>
          <div fxFlex></div>
        </div>
      `);
      expectNativeEl(fixture).toHaveStyle({ 'margin-top': '12px' }, styler);
    });
  });
});

@Injectable({ providedIn: FlexModule })
export class MockLayoutGapStyleBuilder extends StyleBuilder {
  override shouldCache = false;
  buildStyles(_input: string) {
    return { 'margin-top': '12px' };
  }
}

// *****************************************************************
// Template Component
// *****************************************************************
@Component({
  selector: 'test-layout',
  template: `<span>PlaceHolder Template HTML</span>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    LayoutDirective,
    LayoutGapDirective,
    FlexDirective,
    FlexOrderDirective,
    ShowHideDirective,
  ],
})
class TestLayoutGapComponent implements OnInit {
  ngOnInit(): void {}
  direction = 'column';
  gap = '8px';
}
