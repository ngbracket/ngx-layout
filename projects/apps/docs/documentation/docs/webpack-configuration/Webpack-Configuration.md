---
sidebar_position: 37
---

# Install the ngx-layout Library

```bash
npm install --save @ngbracket/ngx-layout
```

**or...**

```bash
yarn add @ngbracket/ngx-layout
```

### Import the ngx-layout Module

**app.module.ts**

```typescript
...
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
...

@NgModule({
  imports: [
    ...
    FlexLayoutModule
  ],
  ...
})
export class AppModule {}
```

### Validate Your Configuration

Add the code below into an existing component (or add something similar) to verify `ngx-layout` has been
properly imported into your application.

**home.component.html**

```html
<div class="flexDemoContainer">
  <div fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxFlex>
    <div fxFlex>I'm above on mobile, and left on larger devices.</div>
    <div fxFlex>I'm below on mobile, and right on larger devices.</div>
  </div>
</div>
```

**home.component.css**

```css
.flexDemoContainer {
  border: solid 1px #red;
  box-sizing: content-box !important;
}
```
