/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { config as baseConfig } from './vite.config.mjs';

export default defineConfig({
  ...baseConfig,
  cacheDir: baseConfig.cacheDir.replace('/.vite/', '/.vite/ssr/'),
  test: {
    ...baseConfig.test,
    browser: undefined,
    environment: 'jsdom',
    setupFiles: ['test-setup.ssr.ts'],
    coverage: {
      ...baseConfig.test.coverage,
      reportsDirectory: baseConfig.test.coverage.reportsDirectory.replace(
        '/coverage/',
        '/coverage/ssr/'
      ),
    },
  },
});
