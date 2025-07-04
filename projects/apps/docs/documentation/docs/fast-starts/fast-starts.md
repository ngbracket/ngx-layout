---
sidebar_position: 120
---

# Fast Starts

Modify your `app.module.ts` to use the `FlexLayoutModule`:

This is deprecated and will be removed in a future version.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { DemoAppComponent } from './demo-app/demo-app';

@NgModule({
  declarations: [DemoAppComponent],
  bootstrap: [DemoAppComponent],
  imports: [BrowserModule, FlexLayoutModule],
})
export class DemoAppModule {}
```

Modify your `component` to use the `FlexLayout` Directives:

```typescript
@Component({
  selector: 'app-component',
  imports: [
    FlexDirective,
    LayoutAlignDirective,
    LayoutDirective,
    FlexDirective,
    LayoutDirective,
    LayoutAlignDirective,
  ],
  //class details
})
```

Add the directives you need to your standalone component

### Local Builds

Developers can, however, easily install this `@ngbracket/ngx-layout` library using a **local repository build**
and a directory copy:

```console
npm run lib:build
cd dist/packages/ngx-layout
npm pack   /* This will create an npm binary that you can install from */
```
