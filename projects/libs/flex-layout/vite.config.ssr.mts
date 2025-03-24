/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { config as baseConfig } from './vite.config.mjs';

const isCi = !!process.env['CI'];

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
        '/coverage/ssr/',
      ),
    },
    fileParallelism: isCi ? false : undefined, // Prevent hanging tests timing out in GitHub Actions runners
    sequence: isCi ? {
      shuffle: true,
    } : undefined,
  },
});
