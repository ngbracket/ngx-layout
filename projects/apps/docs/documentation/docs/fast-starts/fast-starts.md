---
sidebar_position: 12
---

## NPM Install

```terminal
npm install https://github.com/ngbracket/ngx-layout-builds --save
```

> Note: this installs a nightly build required for Angular 4.x; until Beta.9 is released.

Next, modify your `app.module.ts` to use the `FlexLayoutModule`:

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

<br/>

### SystemJS + UMD

If your project is using SystemJS for module loading, you will need to add `@ngbracket/ngx-layout` to the SystemJS
configuration.

Here is a example configuration where `@ngbracket/ngx-layout` is used:

```js
System.config({
  // Existing configuration options
  map: {
    // ...
    '@ngbracket/ngx-layout':
      'npm:@ngbracket/ngx-layout/bundles/flex-layout.umd.js',
    // ...
  },
});
```

---

### 1) Angular CLI + **`npm`** + `@ngbracket/ngx-layout`

If you are using the Angular CLI to bundle and serve your application (using `ng serve`), run the following command:

```terminal
npm install ngbracket/ngx-layout-builds
```

Next, modify your `app.module.ts` to use the `FlexLayoutModule`:

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

### Local Builds

Developers can, however, easily install this `@ngbracket/ngx-layout` library using a **local repository build**
and a directory copy:

```console
npm run lib:build
cd dist/packages/ngx-layout
npm pack   /* This will create an npm binary that you can install from */
```
