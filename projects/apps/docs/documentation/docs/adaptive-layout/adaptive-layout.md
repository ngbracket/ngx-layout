---
sidebar_position: 10
---

# Adaptive Layout

Different from responsive layouts where components change sizes and positions, the concepts of Adaptive layouts provide for UX where different components may be used for different breakpoints.

Animations can also be extended to support MediaQuery activations: different animations will run for different viewport sizes.

Developers can use the following directives to achieve some Adaptive UX goals:

- fxHide
- fxShow
- @if

For examples of fxHide usages in Adaptive layouts, please review the demo Show & Hide Directives:

- [Demo](https://ngx-layout.ngbracket.com/responsive/responsive-layout-direction)
- [Source](https://ngx-layout.ngbracket.com/responsive/responsive-show-hide)

Core Directives + Responsive Features
Responsive features for core Angular directives:

```html
[ngStyle.<alias>]="" [ngClass.<alias>]=""</alias></alias>
```

Here is the current solution to enable responsive/adaptive features with @If:

```typescript
import { Component } from '@angular/core';
import { ObservableMedia, MediaChange } from '@ngbracket/ngx-layout';

@Component({
  selector: 'my-mobile-component',
  template: ` @if (media.isActive('xs')) {
      <div>This content is only shown on Mobile devices</div>
    }
    <footer>Current state: {{}}</footer>`,
})
export class MyMobileComponent {
  public state = '';
  constructor(public media: ObservableMedia) {
    media.asObservable().subscribe((change: MediaChange) => {
      this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
    });
  }
}
```
