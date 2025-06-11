// vitest.config.ts
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    server: {
      sourcemap: process.env.CI ? false : true, // Disable sourcemaps in CI for performance
    },
    coverage: {
      reporter: ['json', 'clover', 'lcov'],
      exclude: ['**/data**', '**/tokens**', '**/test-utils**', ...coverageConfigDefaults.exclude],
    },
  },
})
