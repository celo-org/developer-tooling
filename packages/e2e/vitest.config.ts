// vitest.config.ts
import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'

dotenv.config()

export default defineConfig({
  test: {
    coverage: {
      reporter: ['json', 'clover', 'lcov'],
    },
    env: { ...process.env },
  },
})
