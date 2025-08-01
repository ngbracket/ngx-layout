import { isPlatformServer } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Injectable,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import {
  BaseDirective2,
  MediaMarshaller,
  SERVER_TOKEN,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
} from '@ngbracket/ngx-layout/core';

@Injectable({ providedIn: 'root' })
export class ImgSrcStyleBuilder extends StyleBuilder {
  buildStyles(url: string) {
    return { content: url ? `url(${url})` : '' };
  }
}

const inputs = [
  'src.xs',
  'src.sm',
  'src.md',
  'src.lg',
  'src.xl',
  'src.lt-sm',
  'src.lt-md',
  'src.lt-lg',
  'src.lt-xl',
  'src.gt-xs',
  'src.gt-sm',
  'src.gt-md',
  'src.gt-lg',
];

const selector = `
  img[src.xs],    img[src.sm],    img[src.md],    img[src.lg],   img[src.xl],
  img[src.lt-sm], img[src.lt-md], img[src.lt-lg], img[src.lt-xl],
  img[src.gt-xs], img[src.gt-sm], img[src.gt-md], img[src.gt-lg]
`;

@Directive({ selector, inputs })
export class ImgSrcDirective extends BaseDirective2 {
  protected override DIRECTIVE_KEY = 'img-src';
  protected override inputs = inputs;
  protected defaultSrc = '';

  @Input('src')
  set src(val: string) {
    this.defaultSrc = val;
    this.setValue(this.defaultSrc, '');
  }

  constructor(
    elementRef: ElementRef,
    styleBuilder: ImgSrcStyleBuilder,
    styler: StyleUtils,
    marshal: MediaMarshaller,
    @Inject(PLATFORM_ID) protected platformId: Object,
    @Inject(SERVER_TOKEN) protected serverModuleLoaded: boolean,
  ) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
    this.setValue(this.nativeElement.getAttribute('src') || '', '');
    if (isPlatformServer(this.platformId) && this.serverModuleLoaded) {
      this.nativeElement.setAttribute('src', '');
    }
  }

  /**
   * Use the [responsively] activated input value to update
   * the host img src attribute or assign a default `img.src=''`
   * if the src has not been defined.
   *
   * Do nothing to standard `<img src="">` usages, only when responsive
   * keys are present do we actually call `setAttribute()`
   */
  protected override updateWithValue(value?: string) {
    const url = value || this.defaultSrc;
    if (isPlatformServer(this.platformId) && this.serverModuleLoaded) {
      this.addStyles(url);
    } else {
      this.nativeElement.setAttribute('src', url);
    }
  }

  protected override styleCache = imgSrcCache;
}

const imgSrcCache: Map<string, StyleDefinition> = new Map();

/**
 *  *  @deprecated The DefaultImgSrcDirective will be removed in version 21.
 * Use ImgSrcDirective directly instead.
 *
 * This directive provides a responsive API for the HTML <img> 'src' attribute
 * and will update the img.src property upon each responsive activation.
 *
 * e.g.
 *      <img src="defaultScene.jpg" src.xs="mobileScene.jpg"></img>
 *
 * @see https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-src/
 */
@Directive({ selector, inputs })
export class DefaultImgSrcDirective extends ImgSrcDirective {
  protected override inputs = inputs;
}
