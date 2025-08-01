---
sidebar_position: 11
---

# Contributing to ngx-layout

1. Make sure you have `node` installed with a version at _least_ 20
2. Install `nx` from Nx.dev
3. Fork the `ngbracket/ngx-layout` repo
4. Clone your fork.
   > Recommendation: name your git remotes `upstream` for `ngbracket/ngx-layout`
   > and `<your-username>` for your fork
5. From the root of the project, run `npm install`

## Building the library

- To build the library, run `pnpm run lib:build`
- To build and serve the demo-app, run `nx run demo:serve`
- To build and serve the Universal app, run `npm run universal:serve`

## Integration within your project

Developers should read the [Fast Start](https://github.com/ngbracket/ngx-layout/wiki/Fast-Starts) for alternate
integration instructions

### Running tests

- To run unit tests, run `npm run lib:test`
- To run lint, run `npm run lib:lint`
