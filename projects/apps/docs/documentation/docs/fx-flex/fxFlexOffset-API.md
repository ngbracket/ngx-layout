---
sidebar_position: 160
---

# FxFlexOffset

The [**fxFlexOffset** directive][offset] should be used on on elements within a **fxLayout** container and
dictates the margin between elements (RTL support coming soon!)

```html
<div fxLayout="row">
  <div fxFlexOffset="10px">1. One</div>
  <div fxFlexOffset="5%">2. Two</div>
  <div fxFlexOffset="10vw">3. Three</div>
  <div fxFlexOffset="5vh">4. Four</div>
</div>
```

### fxFlexOffset Options

**fxFlexOffset** takes a single parameter as argument, and populates its host element with the following inline CSS
styling

**Note**: `fxFlexOffset` supports the following suffixes: `% (default) | px | vw | vh`

| Value           | Equivalent CSS               |
| --------------- | ---------------------------- |
| `(default)`     | `margin-left: 0%`            |
| `<int><suffix>` | `margin-left: <int><suffix>` |

> RTL support is coming soon, which will automatically apply `margin-right` instead of `margin-left`

[offset]: https://github.com/ngbracket/ngx-layout/blob/main/src/lib/flex/flex-offset/flex-offset.ts#L41
