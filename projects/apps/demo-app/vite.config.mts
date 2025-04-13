/// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

const isCi = !!process.env['CI'];

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/projects/apps/demo-app'.replace('/node_modules/', isCi ? '/' : '/node_modules/'),
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/projects/apps/demo-app',
      provider: 'v8',
    },
    browser: {
      enabled: true,
      provider: 'playwright',
      // https://vitest.dev/guide/browser/playwright
      name: 'chromium',
      fileParallelism: isCi ? false : undefined, // Prevent hanging tests timing out in Firefox
    },
  },
});
