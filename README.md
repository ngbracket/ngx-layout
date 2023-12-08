# This is clone of angular/flex-layout project.

[![npm version](https://badge.fury.io/js/%40ngbracket%2Fngx-layout.svg)](https://www.npmjs.com/package/@ngbracket/ngx-layout)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/ngbracket/ngx-layout/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/ngbracket/ngx-layout/tree/main)
[![Gitter](https://badges.gitter.im/angular/flex-layout.svg)](https://gitter.im/angular/flex-layout)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

**NOTE: The Angular team no longer publishes new releases of this project. Please see [this article](https://medium.com/@caerus.karu/farewell-flex-layout-aaa567023769) for the explanation and next steps.**

**I would like to take a moment and thank both Caerus and Thomas for all their hardwork in developing this library and to everyone else who has contributed to this project over the years.**

ngx-layout provides a sophisticated layout API using Flexbox CSS + mediaQuery.
This module provides Angular developers with component layout features using a
custom Layout API, mediaQuery observables, and injected DOM flexbox-2016 CSS stylings.

The Flex Layout engine intelligently automates the process of applying appropriate
Flexbox CSS to browser view hierarchies. This automation also addresses many of the
complexities and workarounds encountered with the traditional, manual, CSS-only application of box CSS.

The **real** power of Flex Layout, however, is its **responsive** engine. The
[Responsive API](https://github.com/ngbracket/ngx-layout/wiki/Responsive-API) enables developers to easily specify
different layouts, sizing, visibilities for different viewport sizes and display devices.

---

### Getting Started

Start by installing the ngx-layout library from `npm`

`npm i -s @ngbracket/ngx-layout @angular/cdk`

Next, you'll need to import the Layout module in your app's module.

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

After that is configured, you can use the ngx-layout attributes in your HTML tags for flex layout:

```html
<div fxLayout="row" fxLayoutAlign="space-between"></div>
```

Check out [all of the available options](https://github.com/ngbracket/ngx-layout/wiki/Declarative-API-Overview) for using ngx-layout in your application.

---

### Quick Links

- [ChangeLog](https://github.com/ngbracket/ngx-layout/blob/main/CHANGELOG.md)
- [Wiki Documentation](https://github.com/ngbracket/ngx-layout/wiki)

### Demos

- [Explore Examples Online](https://tburleson-layouts-demos.firebaseapp.com/)
- [Demo Source Code](https://github.com/ngbracket/ngx-layout/blob/main/src/apps/demo-app/src/app/app.module.ts)

### StackBlitz Templates

- [Flex-Layout Template](https://stackblitz.com/edit/flex-layout-seed)
- [Flex-Layout + Material](https://stackblitz.com/edit/flex-layout-material-seed)

### Developers

- [API Documentation](https://github.com/ngbracket/ngx-layout/wiki/API-Documentation)
- [Developer Setup](https://github.com/ngbracket/ngx-layout/wiki/Developer-Setup)
- [Builds + Fast Start](https://github.com/ngbracket/ngx-layout/wiki/Fast-Starts)
- [Integration with Angular CLI](https://github.com/ngbracket/ngx-layout/wiki/Using-Angular-CLI)

---

# Sponsorship Data (USD)

| Description      | Paid (One time) | Paid (Per/Month) | Received (Per/Month) | Balance |
| ---------------- | --------------- | ---------------- | -------------------- | ------- |
| Sponsorship Paid | 130             |                  |                      | 130     |
|                  |                 |                  |                      |         |
| Total            | 130             |                  |                      | 130     |

Sponsorship credits:
As per our sponsorship details all sponsor get added to our readme page:

So we would like to say a BIG thank you to the following:

| Sponsor       | Paid | Sponsorship type |
| ------------- | ---- | ---------------- |
| KLGuyton      | $100 | One time         |
| Stefanomozart | $10  | One time         |
| peternixey    | $20  | One time         |

## If you would like your name/logo here please click on the sponsor [link](https://github.com/sponsors/ngbracket)

### Browser Support

&nbsp;
<a href="http://caniuse.com/#feat=flexbox" target="_blank">
![caniuseflexbox](https://cloud.githubusercontent.com/assets/210413/21288118/917e3faa-c440-11e6-9b08-28aff590c7ae.png)
</a>

<br/>

---

### License

The sources for this package are in the [ngx-layout](https://github.com/ngbracket/ngx-layout) repository. <br/>
Please file issues and pull requests against that repo.

License: MIT
