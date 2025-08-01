---
sidebar_position: 150
---

# FxFlexFill

The [**fxFlexFill** directive][fill] should be used on elements within a **fxLayout** container and identifies the
element whose width and height should be maximized

```html
<div fxFlexFill>
  <div>1. One</div>
  <div>2. Two</div>
  <div>3. Three</div>
  <div>4. Four</div>
</div>
```

### fxFlexFill Options

**fxFlexFill** takes no arguments, and populates its host element with the following inline CSS styling:

| Key          | Value  |
| ------------ | ------ |
| `margin`     | `0`    |
| `width`      | `100%` |
| `height`     | `100%` |
| `min-width`  | `100%` |
| `min-height` | `100%` |

[fill]: https://github.com/ngbracket/ngx-layout/blob/main/src/lib/flex/flex-fill/flex-fill.tst#L31
