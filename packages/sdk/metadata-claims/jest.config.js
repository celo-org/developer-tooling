module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/?(*.)test.ts'],
  setupFilesAfterEnv: ['@celo/dev-utils/matchers', '<rootDir>/jestSetup.ts'],
  // globalSetup: '<rootDir>/src/test-utils/setup.global.ts',
  // globalTeardown: '<rootDir>/src/test-utils/teardown.global.ts',
  verbose: true,
}
