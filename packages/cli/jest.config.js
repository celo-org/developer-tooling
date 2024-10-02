module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).ts'],
  setupFiles: ['<rootDir>/src/test-utils/setup.ts'],
  setupFilesAfterEnv: ['@celo/dev-utils/lib/matchers', '<rootDir>/src/test-utils/setupAfterEnv.ts'],
  globalSetup: '<rootDir>/src/test-utils/setup.global.ts',
  globalTeardown: '<rootDir>/src/test-utils/teardown.global.ts',
}
