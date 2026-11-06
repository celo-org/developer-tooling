// vitest.config.ts
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    server: {
      sourcemap: false,
    },
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['json', 'clover', 'lcov'],
      exclude: ['**/data**', '**/tokens**', '**/test-utils**', ...coverageConfigDefaults.exclude],
    },
  },
})
