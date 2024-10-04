// vitest.config.ts
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['json', 'clover', 'lcov'],
      exclude: ['**/data**', '**/tokens**', ...coverageConfigDefaults.exclude],
    },
  },
})
