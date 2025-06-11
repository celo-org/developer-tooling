// vitest.config.ts
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    server: {
      sourcemap: false,
    },
    // enable access to vitest globally for `@celo/dev-utils` to be able
    // to hook into it, useful for testWithAnvil.
    globals: true,
    coverage: {
      reporter: ['json', 'clover', 'lcov'],
      exclude: ['**/data**', '**/tokens**', '**/test-utils**', ...coverageConfigDefaults.exclude],
    },
  },
})
