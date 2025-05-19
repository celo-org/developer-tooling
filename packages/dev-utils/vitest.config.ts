// vitest.config.ts
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['json', 'clover', 'lcov'],
      exclude: ['**/data**', '**/tokens**', '**/test-utils**', ...coverageConfigDefaults.exclude],
    },
  },
})
