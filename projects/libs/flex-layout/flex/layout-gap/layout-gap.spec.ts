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
import { CommonModule, isPlatformServer } from '@angular/common';
import {
  Component,
  Injectable,
  OnInit,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
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
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(3);
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '13px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );
    });

    it('should set the gap on the container even with a single child', () => {
      const template = `
              <div fxLayout='row' fxLayoutGap='13px'>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(3);
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '52px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '52px' }, styler);
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '52px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );
    });

    it('should apply the multiplier to the gap value', () => {
      const template = `
              <div fxLayout='row' fxLayoutGap='13x'>
                  <div fxFlex></div>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(3);
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '13px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );
    });

    it('should add gap styles in proper order when order style is applied', () => {
      const template = `
        <div fxLayoutAlign='center center' fxLayoutGap='13px'>
          <div fxFlex fxFlexOrder="3"></div>
          <div fxFlex fxFlexOrder="2"></div>
          <div fxFlex fxFlexOrder="1"></div>
        </div>
      `;
      createTestComponent(template);
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(3);
      expectEl(nodes[2]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[0]).not.toHaveStyle(
        { 'margin-inline-end': '13px' },
        styler,
      );
      expectEl(nodes[0]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );
    });

    it('should add the default unit when the gap value has no unit', () => {
      const template = `
              <div fxLayout='row' fxLayoutGap='13'>
                  <div fxFlex></div>
                  <div fxFlex></div>
              </div>
          `;
      createTestComponent(template);
      fixture.componentInstance.direction = 'row';
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(4);
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[2]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[3]).not.toHaveStyle(
        { 'margin-inline-end': '13px' },
        styler,
      );
      expectEl(nodes[3]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );
    });

    it('should support a two-value (row/column) gap', () => {
      const template = `
              <div fxLayoutAlign='center center' fxLayoutGap='13px'>
                  <div fxFlex *ngFor='let row of rows'></div>
              </div>
          `;
      createTestComponent(template);
      fixture.componentInstance.direction = 'row';
      fixture.detectChanges();

      let nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(4);

      fixture.componentInstance.rows = new Array(3);
      fixture.detectChanges();

      setTimeout(() => {
        // Since the layoutGap directive detects the *ngFor changes by using a MutationObserver, the
        // browser will take up some time, to actually announce the changes to the directive.
        // (Kudos to @DevVersion)
        nodes = queryFor(fixture, '[fxFlex]');
        expect(nodes.length).toEqual(3);

        if (typeof MutationObserver !== 'undefined') {
          expectEl(nodes[0]).toHaveStyle(
            { 'margin-inline-end': '13px' },
            styler,
          );
          expectEl(nodes[1]).toHaveStyle(
            { 'margin-inline-end': '13px' },
            styler,
          );
          expectEl(nodes[2]).not.toHaveStyle(
            { 'margin-inline-end': '13px' },
            styler,
          );
        }
      });
    }));

    it('should add update gap styles when only 1 row is remaining', waitForAsync(() => {
      const template = `
              <div fxLayoutAlign='center center' fxLayoutGap='13px'>
                  <div fxFlex *ngFor='let row of rows'></div>
              </div>
          `;
      createTestComponent(template);
      fixture.componentInstance.direction = 'row';
      fixture.detectChanges();

      let nodes = queryFor(fixture, '[fxFlex]');

      expect(nodes.length).toEqual(4);
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[3]).not.toHaveStyle(
        { 'margin-inline-end': '13px' },
        styler,
      );

      fixture.componentInstance.rows = new Array(1);
      fixture.detectChanges();

      setTimeout(() => {
        // Since the layoutGap directive detects the *ngFor changes by using a MutationObserver, the
        // browser will take up some time, to actually announce the changes to the directive.
        // (Kudos to @DevVersion)
        nodes = queryFor(fixture, '[fxFlex]');

        expect(nodes.length).toEqual(1);
        if (typeof MutationObserver !== 'undefined') {
          expectEl(nodes[0]).not.toHaveStyle(
            { 'margin-inline-end': '13px' },
            styler,
          );
        }
      });
    }));

    it('should apply margin-top for column layouts', () => {
      verifyCorrectMargin('column', 'margin-block-end');
    });

    it('should set the gap for a row layout', () => {
      verifyContainerGap('row', '8px');
    });

    it('should apply margin-block-start for column-reverse layouts', () => {
      verifyCorrectMargin('column-reverse', 'margin-block-start');
    });

    it('should remove obsolete margin and apply valid margin for layout changes', () => {
      createTestComponent(`
          <div [fxLayout]='direction' [fxLayoutGap]='gap'>
              <span></span>
              <span></span>
          </div>
      `);
      const instance = fixture.componentInstance;

      // layout = column, use margin-top
      instance.direction = 'column';
      instance.gap = '8px';
      fixture.detectChanges();
      let nodes = queryFor(fixture, 'span');

      expectEl(nodes[0]).not.toHaveStyle(
        { 'margin-inline-end': '8px' },
        styler,
      );
      expectEl(nodes[0]).toHaveStyle({ 'margin-block-end': '8px' }, styler);

      // layout = column-reverse, use margin-block-start
      instance.direction = 'column-reverse';
      fixture.detectChanges();
      nodes = queryFor(fixture, 'span');

      expectEl(nodes[0]).not.toHaveStyle(
        { 'margin-inline-end': '8px' },
        styler,
      );
      expectEl(nodes[0]).toHaveStyle({ 'margin-block-start': '8px' }, styler);

      // layout = row-reverse, use margin-inline-start
      instance.direction = 'row-reverse';
      fixture.detectChanges();
      nodes = queryFor(fixture, 'span');

      expectEl(nodes[0]).not.toHaveStyle({ 'margin-block-end': '8px' }, styler);
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-start': '8px' }, styler);
    });

    it('should recognize hidden elements when applying gaps', () => {
      const styles = ['.col1 { display:none !important;'];
      const template = `
        <div class='container' fxLayout='row' fxLayoutGap='16px'>
          <div fxFlex class='col1'>Div 1</div>
          <div fxFlex class='col2'>Div 2</div>
          <div fxFlex class='col3'>Div 3</div>
        </div>
      `;
      createTestComponent(template, styles);
      fixture.componentInstance.direction = 'row';
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');

      expect(nodes.length).toEqual(3);
      // TODO(CaerusKaru): Domino is unable to detect this style
      if (!isPlatformServer(platformId)) {
        expectEl(nodes[0]).not.toHaveStyle(
          { 'margin-inline-end': '0px' },
          styler,
        );
        expectEl(nodes[0]).not.toHaveStyle(
          { 'margin-inline-end': '16px' },
          styler,
        );
        expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '16px' }, styler);
        expectEl(nodes[2]).not.toHaveStyle(
          { 'margin-inline-end': '16px' },
          styler,
        );
      }
    });

    it('should adjust gaps based on layout-wrap presence', () => {
      const styles = ['.col1 { display:none !important;'];
      const template = `
            <div class='container'
                 [fxLayout]='direction + " wrap"'
                 [fxLayoutGap]='gap'>
              <div fxFlex class='col1'>Div 1</div>
              <div fxFlex class='col2'>Div 2</div>
              <div fxFlex class='col3'>Div 2</div>
              <div fxFlex class='col4'>Div 3</div>
            </div>
          `;
      createTestComponent(template, styles);
      fixture.componentInstance.gap = '16px';
      fixture.componentInstance.direction = 'row';
      fixture.detectChanges();

      let nodes = queryFor(fixture, '[fxFlex]');

      expect(nodes.length).toEqual(4);
      // TODO(CaerusKaru): Domino is unable to detect this style
      if (!isPlatformServer(platformId)) {
        expectEl(nodes[0]).not.toHaveStyle(
          { 'margin-inline-end': '16px' },
          styler,
        );
        expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '16px' }, styler);
        expectEl(nodes[2]).toHaveStyle({ 'margin-inline-end': '16px' }, styler);
        expectEl(nodes[3]).not.toHaveStyle(
          { 'margin-inline-end': '16px' },
          styler,
        );
      }

      fixture.componentInstance.gap = '8px';
      fixture.componentInstance.direction = 'column';
      fixture.detectChanges();

      nodes = queryFor(fixture, '[fxFlex]');

      expect(nodes.length).toEqual(4);
      // TODO(CaerusKaru): Domino is unable to detect this style
      if (!isPlatformServer(platformId)) {
        expectEl(nodes[0]).not.toHaveStyle(
          { 'margin-block-end': '8px' },
          styler,
        );
        expectEl(nodes[1]).toHaveStyle({ 'margin-block-end': '8px' }, styler);
        expectEl(nodes[2]).toHaveStyle({ 'margin-block-end': '8px' }, styler);
        expectEl(nodes[3]).not.toHaveStyle(
          { 'margin-block-end': '8px' },
          styler,
        );
      }
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
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(3);
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '13px' }, styler);
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '13px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );

      mediaController.activate('md');
      fixture.detectChanges();
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '24px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '24px' }, styler);
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '24px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );
    });

    it('should apply the multiplier with the grid suffix', () => {
      const template = `
        <div fxLayoutGap='13x grid'>
          <div fxFlex></div>
          <div fxFlex></div>
        </div>
      `;
      createTestComponent(template);
      fixture.detectChanges();

      const nodes = queryFor(fixture, '[fxFlex]');
      expect(nodes.length).toEqual(3);
      mediaController.activate('sm');
      expectEl(nodes[0]).not.toHaveStyle({ 'margin-inline-end': '*' }, styler);
      expectEl(nodes[1]).not.toHaveStyle({ 'margin-inline-end': '*' }, styler);
      expectEl(nodes[2]).not.toHaveStyle({ 'margin-inline-end': '*' }, styler);

      mediaController.activate('md');
      fixture.detectChanges();
      expectEl(nodes[0]).toHaveStyle({ 'margin-inline-end': '24px' }, styler);
      expectEl(nodes[1]).toHaveStyle({ 'margin-inline-end': '24px' }, styler);
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '24px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle(
        { 'margin-inline-end': '0px' },
        styler,
      );

      mediaController.activate('sm');
      expectEl(nodes[0]).not.toHaveStyle({ 'margin-inline-end': '*' }, styler);
      expectEl(nodes[1]).not.toHaveStyle({ 'margin-inline-end': '*' }, styler);
      expectEl(nodes[2]).not.toHaveStyle({ 'margin-inline-end': '*' }, styler);
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
      const nodes = queryFor(fixture, '[fxFlex]');

      mediaController.activate('md');
      fixture.detectChanges();
      expectEl(nodes[0]).not.toHaveStyle(
        { 'margin-block-end': '24px' },
        styler,
      );
      expectEl(nodes[1]).not.toHaveStyle(
        { 'margin-block-end': '24px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle({ 'margin-block-end': '*' }, styler);

      mediaController.activate('xs');
      expectNativeEl(fixture).toHaveStyle({ gap: '16px' }, styler);

      mediaController.activate('md');
      fixture.detectChanges();
      expectEl(nodes[0]).not.toHaveStyle(
        { 'margin-block-end': '24px' },
        styler,
      );
      expectEl(nodes[1]).not.toHaveStyle(
        { 'margin-block-end': '24px' },
        styler,
      );
      expectEl(nodes[2]).not.toHaveStyle({ 'margin-block-end': '*' }, styler);
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
