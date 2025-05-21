module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/?(*.)+(test).ts'],
  setupFilesAfterEnv: ['@celo/dev-utils/matchers', '<rootDir>/jest_setup.ts'],
  globalSetup: '<rootDir>/src/test-utils/setup.global.ts',
  verbose: true,
}
