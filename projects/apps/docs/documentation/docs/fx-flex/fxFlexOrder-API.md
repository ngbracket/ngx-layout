---
sidebar_position: 170
---

# FxFlexOrder

The [**fxFlexOrder** directive][order] should be used on elements within a sorted **fxLayout** container and identifies
the positional ordering of the element

```html
<div fxLayout="row">
  <div fxFlexOrder="4">1. One</div>
  <div fxFlexOrder="2">2. Two</div>
  <div fxFlexOrder="3">3. Three</div>
  <div fxFlexOrder="1">4. Four</div>
</div>
```

### fxFlexOrder Options

**fxFlexOrder** takes a single integer as argument, and populates its host element with the following inline CSS styling

| Value       | Equivalent CSS |
| ----------- | -------------- |
| `(default)` | `order: 0`     |
| `<int>`     | `order: <int>` |

[order]: https://github.com/ngbracket/ngx-layout/blob/main/src/lib/flex/flex-order/flex-order.ts#41
