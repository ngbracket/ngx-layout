# @ngbracket/ngx-layout

This project is a continuation of the original, open-source Angular project, @angular/flex-layout, which is no longer maintained. Please consider collaborating with us rather than creating your own, private flex libraries. Many hands make light work!

If you would like to contribute to the project please get in touch with me on [twitter](https://twitter.com/duncanfaulkner). Alternatively, if you would like to sponsor the project details can be found on our [GitHub page](https://github.com/sponsors/ngbracket).

Thank you for your support.

### Getting Started

Start by installing the ngx-layout library from `npm`

```
npm i -s @ngbracket/ngx-layout @angular/cdk
```

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

---

License: MIT
