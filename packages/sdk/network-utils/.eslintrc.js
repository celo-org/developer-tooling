module.exports = {
  extends: '../../../.eslintrc.js',
  parserOptions: {
    project: ['./eslint.tsconfig.json'],
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
