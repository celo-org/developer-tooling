module.exports = {
  extends: '../../.eslintrc.js',
  // the releasegold folder is a symlink of releasecelo
  // can't add a .eslintignore since it'd ignore the src folder
  ignorePatterns: ['**/commands/releasegold/*'],
}
