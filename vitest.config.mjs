// vitest.config.mjs
import { coverageConfigDefaults, defineConfig, defaultExclude } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      globals: true,
      reporter: ['json', 'clover', 'lcov'],
      exclude: ['**/test-utils**', ...coverageConfigDefaults.exclude],
    },
    exclude: ['lib', 'dist', ...defaultExclude],
  },
})
