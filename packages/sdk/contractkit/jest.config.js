module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).ts'],
  setupFilesAfterEnv: ['@celo/dev-utils/matchers', '<rootDir>/jest_setup.ts'],
  globalSetup: '<rootDir>/src/test-utils/setup.global.ts',
  globalTeardown: '<rootDir>/src/test-utils/teardown.global.ts',
  testSequencer: '<rootDir>/src/test-utils/AlphabeticSequencer.js',
  verbose: true,
}
