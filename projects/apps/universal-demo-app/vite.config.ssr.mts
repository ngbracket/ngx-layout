/// <reference types='vitest' />
import { defineConfig, UserConfig } from 'vite';
import { config as baseConfig } from './vite.config.mjs';

const isCi = !!process.env['CI'];

/**
 * Prevent flaky SSR tests
 */
const forksPoolTestOptions: UserConfig['test'] = {
  pool: 'forks',
  poolOptions: {
    forks: {
      /**
       * @see https://v2.vitest.dev/config/#pooloptions-forks-singlefork
       */
      singleFork: true,
    },
  },
};

/**
 * The following options prevent SSR tests from failing in GitHub Actions
 * runners due to limited resources and possibly memory leaks.
 */
const ciTestOptions: UserConfig['test'] = {
  fileParallelism: false,
  minWorkers: 1,
  maxWorkers: 2,
};

export default defineConfig({
  ...baseConfig,
  cacheDir: baseConfig.cacheDir.replace('/.vite/', '/.vite/ssr/'),
  test: {
    ...baseConfig.test,
    name: 'universal-demo:ssr',
    browser: undefined,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ssr.ts'],
    coverage: {
      ...baseConfig.test.coverage,
      reportsDirectory: baseConfig.test.coverage.reportsDirectory.replace(
        '/coverage/',
        '/coverage/ssr/'
      ),
    },
    ...forksPoolTestOptions,
    ...(isCi ? ciTestOptions : {}),
  },
});
