module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['@celo/dev-utils/lib/matchers'],
  verbose: true,
  coveragePathIgnorePatterns: [
    // NOTE: both the following files are copy pasted from other repos
    // will add tests as/if we refactor them
    'src/tokens.ts',
    'src/data.ts',
  ],
}
