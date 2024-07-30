[![npm version](https://badge.fury.io/js/%40ngbracket%2Fngx-layout.svg)](https://www.npmjs.com/package/@ngbracket/ngx-layout)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/ngbracket/ngx-layout/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/ngbracket/ngx-layout/tree/main)
[![Gitter](https://badges.gitter.im/angular/flex-layout.svg)](https://gitter.im/angular/flex-layout)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

This project is a continuation of the original, open-source Angular project, @angular/flex-layout, which is no longer maintained. Please consider collaborating with us rather than creating your own, private flex libraries. Many hands make light work!

If you would like to contribute to the project please get in touch with me on twitter. Alternatively, if you would like to sponsor the project details can be found on our GitHub page.

Thank you for your support.

Getting Started
Start by installing the ngx-layout library from npm

npm i -s @ngbracket/ngx-layout @angular/cdk
Next, you'll need to import the Layout module in your app's module.

app.module.ts

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
...

@NgModule({
    ...
    imports: [ FlexLayoutModule ],
    ...
});
After that is configured, you can use the ngx-layout attributes in your HTML tags for flex layout:

<div fxLayout="row" fxLayoutAlign="space-between"></div>

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
