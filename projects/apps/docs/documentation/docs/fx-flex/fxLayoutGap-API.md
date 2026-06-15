---
sidebar_position: 210
---

# FxLayoutGap

The [**fxLayoutGap** directive](https://github.com/ngbracket/ngx-layout/blob/main/src/lib/flex/layout-gap/layout-gap.ts)
specifies the spacing between children within a flexbox container (e.g. nested within a fxLayout container).

It applies the native CSS [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) property to the
container itself, so the spacing is added _between_ items along the layout axis **and between wrapped rows/columns**.

- A single value (e.g. `fxLayoutGap="20px"`) sets both the row and column gap.
- Two values (e.g. `fxLayoutGap="10px 20px"`) map to the CSS `gap` shorthand: `<row-gap> <column-gap>`.
- The gap is direction-independent: it behaves identically for `row`/`column`, reversed flows, and `rtl`.

> **Breaking change (v22):** `fxLayoutGap` now uses CSS `gap` instead of applying `margin` to each child.
> The element must be a flex container (apply `fxLayout`) for the gap to take effect. The legacy `" grid"`
> suffix (e.g. `fxLayoutGap="10px grid"`) is still accepted but is now equivalent to a plain gap, since
> `gap` already spaces wrapped rows correctly.

## Examples:

#### Flex-Direction: Row

```html
<div fxLayout="row">
  <div>1. One</div>
  <div>2. Two</div>
  <div>3. Three</div>
  <div>4. Four</div>
</div>
```

![lg_1](https://cloud.githubusercontent.com/assets/210413/26279226/7d1633c2-3d73-11e7-8378-4eaca05a78a0.jpg)

```html
<div fxLayout="row" fxLayoutGap="20px">
  <div>1. One</div>
  <div>2. Two</div>
  <div>3. Three</div>
  <div>4. Four</div>
</div>
```

![lg_2](https://cloud.githubusercontent.com/assets/210413/26279227/7d1660c2-3d73-11e7-94a2-b604ba319cbe.jpg)

#### Flex-Direction: Column

```html
<div fxLayout="column">
  <div>1. One</div>
  <div>2. Two</div>
  <div>3. Three</div>
  <div>4. Four</div>
</div>
```

![fxLayout_column](https://cloud.githubusercontent.com/assets/210413/26279208/f3ea70a4-3d72-11e7-83df-59b2e586d833.jpg)

```html
<div fxLayout="column" fxLayoutGap="20px">
  <div>1. One</div>
  <div>2. Two</div>
  <div>3. Three</div>
  <div>4. Four</div>
</div>
```

![fxLayout_column_gap](https://cloud.githubusercontent.com/assets/210413/26279209/f55fa1d4-3d72-11e7-96b8-27d5604c2c72.jpg)

### Using fxLayoutGap with **Wrap**

Because `fxLayoutGap` now uses the CSS `gap` property, spacing is automatically applied **between wrapped rows and
columns** as well as between items — without the extra leading-margin artifacts the previous margin-based
implementation produced on the last/short row.

When sizing wrapped children with `fxFlex`, still account for the gap so items fit per row, e.g.
`fxFlex="calc(50% - 25px)"`.

#### Issue: Rendered Layout without gap considerations:

![screen shot 2017-05-20 at 4 03 37 pm](https://cloud.githubusercontent.com/assets/210413/26279328/19c32142-3d76-11e7-826c-837603a6db76.png)

---

#### Solution: Rendered Layout with gap considerations:

![image](https://cloud.githubusercontent.com/assets/210413/26279332/2dfe9d76-3d76-11e7-810b-e15cbcd5dd21.png)

```html
<md-card fxFlex fxFlexAlign="start">
  <md-card-content>
    <div fxLayout fxLayout.xs="column wrap" fxLayoutGap="25px">
      <md-input-container fxFlex="calc(50% - 25px)">
        <input mdInput placeholder="Name" />
      </md-input-container>
      <md-input-container fxFlex="calc(50% - 25px)">
        <input mdInput placeholder="Occupation" />
      </md-input-container>
      <md-input-container fxFlex="calc(50% - 25px)">
        <input mdInput placeholder="Company" />
      </md-input-container>
    </div>
  </md-card-content>

  <md-card-actions>
    <button md-button>Anterior</button>
    <button md-button>Proximo</button>
  </md-card-actions>
</md-card>
```
