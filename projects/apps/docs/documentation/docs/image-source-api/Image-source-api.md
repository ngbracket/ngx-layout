---
sidebar_position: 24
---

## FxImgSrc

The [**imgSrc** directive][imgsrc] is a responsive extension of the HTML &lt;img&gt; `src` attribute and can be used on any
&lt;img&gt; tag in the markup

```html
<div>
  <img src="default.png" src.xs="xsmall.png" />
</div>
```

### imgSrc Options

**imgSrc** takes one string argument, and alters its host's `src` attribute as necessary when breakpoints are activated.
The initial value will be used as the default and fallback when a responsive alias is not defined

[imgsrc]: https://github.com/ngbracket/ngx-layout/blob/main/src/lib/extended/img-src/img-src.ts#L38
