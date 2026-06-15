# @ngbracket/ngx-layout

This project is a continuation of the original, open-source Angular project, @angular/flex-layout, which is no longer maintained. Please consider collaborating with us rather than creating your own, private flex libraries. Many hands make light work!

If you would like to contribute to the project please get in touch with us on twitter [Duncan](https://x.com/duncanfaulkner) / [Sonu](https://x.com/SonuKapoor1978). Alternatively, if you would like to sponsor the project details can be found on our [GitHub page](https://github.com/sponsors/ngbracket).

Thank you for your support.

### What's New

The library is now **fully standalone**. Every directive is a standalone
Angular directive, so you can import what you need directly into a standalone
component — no `NgModule` is required.

> **Breaking change:** the deprecated `Default*` directives (e.g.
> `DefaultFlexDirective`, `DefaultLayoutDirective`) have been **removed**.
> Replace each `Default<X>Directive` with its base `<X>Directive` (e.g.
> `DefaultFlexDirective` → `FlexDirective`). The selectors and behavior are
> identical, so only the imported symbol name changes.

### Getting Started

Start by installing the ngx-layout library from `npm`

```
npm i -s @ngbracket/ngx-layout @angular/cdk
```

#### Standalone components (recommended)

Import the directives you need directly into a standalone component, or import
`FlexLayoutModule` to pull in all of them at once.

**app.component.ts**

```ts
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-root',
  imports: [FlexLayoutModule],
  template: `<div fxLayout="row" fxLayoutAlign="space-between"></div>`,
})
export class AppComponent {}
```

To configure the library (breakpoints, default options, etc.) in a standalone
app, add `provideFlexLayout` to your application providers:

**app.config.ts**

```ts
import { ApplicationConfig } from '@angular/core';
import { provideFlexLayout } from '@ngbracket/ngx-layout';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFlexLayout({ useColumnBasisZero: false }),
  ],
};
```

#### NgModule (still supported)

If you are still using `NgModule`s, import `FlexLayoutModule` as before.
`FlexLayoutModule.withConfig(...)` remains available for configuration.

**app.module.ts**

```ts
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
...

@NgModule({
    ...
    imports: [ FlexLayoutModule ],
    ...
});
```

Once configured, you can use the ngx-layout attributes in your HTML tags for
flex layout:

```html
<div fxLayout="row" fxLayoutAlign="space-between"></div>
```

---

License: MIT
