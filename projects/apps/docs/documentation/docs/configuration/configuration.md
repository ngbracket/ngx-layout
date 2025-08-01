---
sidebar_position: 9
---

# Configuration

## Introduction

**Ngx-layout** comes built-in with several advanced capabilities that are meant to help developers seamlessly integrate Flexbox and CSS Grid utilities into their applications. However, there are times where these behaviors are not desirable, and so this library offers the ability to configure them. The specific configurable behaviors, and how to turn them off, are detailed below.

### Configuration using NgModules

_This is deprecated and will be removed in a future version, please use the '**provideFlexLayout**' instead._

To configure **ngx-layout**, initialize the top-level module using the `withConfig` method as follows:

```typescript
// app.module.ts
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
FlexLayoutModule.withConfig(configOptions, [breakpoints]);
```

The `withConfig` method takes two arguments: a configuration object, and a list of custom breakpoints. This is the same as providing the breakpoints following the Custom Breakpoints guide.

### Configuration using Standalone

To configure **ngx-layout**, initialize the provideFlexLayout with two arguments, a configuration object and a list of breakpoints, for example:

```typescript
// app.config.ts
provideFlexLayout({
      addFlexToParent: true,
      printWithBreakpoints: ['md', 'lt-lg', 'lt-xl', 'gt-sm', 'gt-xs'],
}),
```

Options
**Ngx-layout** can be configured with the following options:

- `addFlexToParent`: whether to add `flex-direction` stylings to the parent of an `fxFlex` directive, if not present
- `addOrientationBps`: whether to add the orientation breakpoints to the module
- `disableDefaultBps`: whether to disable the default breakpoints from use in the module
- `disableVendorPrefixes`: whether to disable the `--webkit` prefix from applied stylings
- `serverLoaded`: whether to simulate the module being in server mode
- `useColumnBasisZero`: whether the default `flex-basis` value should be 1e-9px (otherwise auto)

The breakpoints provided as the second argument can be either a singular BreakPoint, or a BreakPoint array
