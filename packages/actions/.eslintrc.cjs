module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
  },
  parserOptions: {
    project: __dirname + '/tsconfig.json',
  },
  ignorePatterns: ['**/.eslintrc.cjs', '**/*.test.ts'],
}
