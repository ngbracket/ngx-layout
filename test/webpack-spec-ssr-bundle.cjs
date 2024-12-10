/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const { resolve } = require('path');
const { AngularWebpackPlugin, AngularWebpackLoaderPath } = require('@ngtools/webpack');

// import { AngularWebpackLoaderPath, AngularWebpackPlugin } from '@ngtools/webpack';
// import { resolve } from 'path';

module.exports = {
  mode: 'development',
  entry: './projects/libs/flex-layout/test.ssr.ts',
  target: 'node',
  output: {
    clean: true,
    path: resolve('./dist/spec/flex-layout/'),
    libraryTarget: 'commonjs',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: AngularWebpackLoaderPath,
      },
    ],
  },
  plugins: [
    new AngularWebpackPlugin({
      tsconfig: resolve('projects/libs/flex-layout/tsconfig.spec.ssr.json'),
      jitMode: true,
      emitNgModuleScope: false,
    }),
  ],
};
