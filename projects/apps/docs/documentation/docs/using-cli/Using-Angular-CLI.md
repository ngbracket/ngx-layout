---
sidebar_position: 35
---

# Using Angular CLI

Using ngx-layout with the the Angular CLI is easy.

## Install the CLI

```bash
# Global
npm uninstall -g @angular/cli
npm install -g @angular/cli
```

## Create a new project

```bash
 ng new my-project
```

## Or, use with existing project

```bash
rm -rf node_modules/
npm install
```

The new command creates a project with a build system for your Angular app.

## Install ngx-layout

```bash
npm install @ngbracket/ngx-layout --save
```

> This installs the most recent npm release of Flex-Layout.

```bash
npm install ngbracket/ngx-layout-builds --save
```

> This installs a nightly build which incorporates the latest updates not yet published to NPM

## Import the ngx-layout NgModule

**src/app/app.module.ts**

```typescript
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
// other imports
@NgModule({
  imports: [FlexLayoutModule],
  ...
})
export class PizzaPartyAppModule {}
```

## Configuring SystemJS

If your project is using SystemJS for module loading, you will need to add `@ngbracket/ngx-layout`
to the SystemJS configuration:

```js
System.config({
  // existing configuration options
  map: {
    ...,
    '@ngbracket/ngx-layout': 'npm:@ngbracket/ngx-layout-builds/bundles/flex-layout.umd.js'
  }
});
```

## Sample ngx-layout projects

Developers are encouraged to review the live demos and source for the Flex-Layout Demos:

- [Live Demos](https://tburleson-layouts-demos.firebaseapp.com/)
- [Demo Source Code](https://github.com/ngbracket/ngx-layout/blob/main/src/apps/demo-app/)
