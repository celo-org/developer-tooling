module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).ts'],
  setupFiles: ['<rootDir>/src/test-utils/setup.ts'],
  setupFilesAfterEnv: ['@celo/dev-utils/lib/matchers'],
  globalSetup: '<rootDir>/src/test-utils/setup.global.ts',
  globalTeardown: '<rootDir>/src/test-utils/teardown.global.ts',
  testTimeout: 10 * 1000, // set default timeout to 10 seconds
  slowTestThreshold: 10, // this is also 10 seconds.
  openHandlesTimeout: 0, // disables
}
