import { defineConfig } from 'vitest/config'
import config from '../../vitest.config.mjs'

export default defineConfig({
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config!.test!.coverage,
      exclude: ['**/data**', '**/tokens**', ...config.test!.coverage!.exclude!],
    },
  },
})
