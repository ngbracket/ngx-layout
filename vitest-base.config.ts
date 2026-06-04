import { defineConfig } from 'vitest/config';

/**
 * Base Vitest configuration merged by the Angular `@angular/build:unit-test`
 * builder (referenced via the `runnerConfig` option in angular.json).
 *
 * `restoreMocks` restores spies created with `vi.spyOn` before each test,
 * matching the per-test spy sandboxing that the previous Karma/Jasmine
 * setup provided. Specs re-create their spies in `beforeEach`, so call
 * counts must start fresh for every test.
 */
export default defineConfig({
  test: {
    restoreMocks: true,
  },
});
