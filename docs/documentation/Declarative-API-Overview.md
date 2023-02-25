### Static API Overview

The ngx-layout features provide smart, syntactic directives to allow developers to easily and intuitively create
responsive and adaptive layouts using Flexbox CSS.

> The **API** outline here is considered static and provides a UX that will adjust element sizes and positions as the
> browser window width changes. The static API can be considered the default _desktop_ layout API. <br/> <br/> Developers
> should use the Responsive API to support alternate layout configurations for mobile or tablet devices

The **ngx-layout API** is an intuitive list of HTML directives (aka attributes) that can be used on HTML containers
and elements. Instead of using traditional CSS stylesheets, developers will define their layouts declaratively directly
in the HTML.

An important, _fundamental_ concept is understanding which APIs are used on DOM **containers** versus APIs used on DOM
child elements in those containers.

#### API for DOM containers:

| HTML                             | API                         | Allowed values                                                                                                        |
| -------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`fxLayout`][fxlayout]           | `<direction> [wrap]`        | `row \| column \| row-reverse \| column-reverse`                                                                      |
| [`fxLayoutAlign`][fxlayoutalign] | `<main-axis>  <cross-axis>` | main-axis: `start \| center \| end \| space-around \| space-between`; cross-axis: `start \| center \| end \| stretch` |
| [`fxLayoutGap`][fxlayoutgap]     | % \| px \| vw \| vh         |                                                                                                                       |

> These directives affect the flow and layout children elements in the container

#### API for DOM elements:

| HTML                               | Allowed values                                          |
| ---------------------------------- | ------------------------------------------------------- |
| [`fxFlex`][fxflex]                 | "" \| px \| % \| vw \| vh \| `<grow> <shrink> <basis>`, |
| [`fxFlexOrder`][fxflexorder]       | int                                                     |
| [`fxFlexOffset`][fxflexoffset]     | % \| px \| vw \| vh                                     |
| [`fxFlexAlign`][fxflexalign]       | `start \| baseline \| center \| end`                    |
| [`fxFlexFill, fxFill`][fxflexfill] |                                                         |

> These directives affect the layout and size of the host element. Note the API expects their host elements to be
> inside a DOM flexbox container (a 'block' element which is itself using the Layout API for containers).

#### API for any element:

| HTML API             | Allowed values                      |
| -------------------- | ----------------------------------- |
| [`fxHide`][fxhide]   | TRUE \| FALSE \| 0 \| ""            |
| [`fxShow`][fxshow]   | TRUE \| FALSE \| 0 \| ""            |
| [`ngClass`][ngclass] | @extends [ngClass][aiongclass] core |
| [`ngStyle`][ngstyle] | @extends [ngStyle][aiongstyle] core |
| [`imgSrc`][imgsrc]   | @extends <img> `src` attribute      |

Shown below is sample HTML markup that uses both the container and element Static API:

```html
<div fxLayout="column" class="zero">
  <div fxFlex="33" class="one"></div>
  <div fxFlex="33%" [fxLayout]="direction" class="two">
    <div fxFlex="22%" class="two_one"></div>
    <div fxFlex="205px" class="two_two"></div>
    <div fxFlex="30" class="two_three"></div>
  </div>
  <div fxFlex class="three"></div>
</div>
```

ngx-layout directives **assign CSS styles** directly in-line to the host element. These in-line styles override
inherited styles, **ShadowDOM** styles and even ShadowDOM tree stylings on the element `:host`

## Responsive API

ngx-layout also has a huge set of responsive features that enable developers to easily change the UX layout
configurations for different display devices. See the our documentation on the [Responsive API page][responsive].

[fxlayout]: https://github.com/ngbracket/ngx-layout/wiki/fxLayout-API
[fxlayoutalign]: https://github.com/ngbracket/ngx-layout/wiki/fxLayoutAlign-API
[fxlayoutgap]: https://github.com/ngbracket/ngx-layout/wiki/fxLayoutGap-API
[fxflex]: https://github.com/ngbracket/ngx-layout/wiki/fxFlex-API
[fxflexorder]: https://github.com/ngbracket/ngx-layout/wiki/fxFlexOrder-API
[fxflexoffset]: https://github.com/ngbracket/ngx-layout/wiki/fxFlexOffset-API
[fxflexalign]: https://github.com/ngbracket/ngx-layout/wiki/fxFlexAlign-API
[fxflexfill]: https://github.com/ngbracket/ngx-layout/wiki/fxFlexFill-API
[fxhide]: https://github.com/ngbracket/ngx-layout/wiki/fxHide-API
[fxshow]: https://github.com/ngbracket/ngx-layout/wiki/fxShow-API
[ngclass]: https://github.com/ngbracket/ngx-layout/wiki/ngClass-API
[ngstyle]: https://github.com/ngbracket/ngx-layout/wiki/ngStyle-API
[aiongclass]: https://angular.io/api/common/NgClass
[aiongstyle]: https://angular.io/api/common/NgStyle
[responsive]: https://github.com/ngbracket/ngx-layout/wiki/Responsive-API
[imgsrc]: https://github.com/ngbracket/ngx-layout/wiki/imgSrc-API
