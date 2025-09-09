# Security Notes

## Package Resolutions (2025-09-09)

Added resolutions for 18 compromised npm packages to prevent malicious updates:

- ansi-styles, chalk, debug, ansi-regex, supports-color, strip-ansi, wrap-ansi
- color-convert, color-name, error-ex, is-arrayish, slice-ansi, simple-swizzle
- color-string, supports-hyperlinks

These packages were identified as compromised and locked to their current versions in yarn.lock to maintain security while allowing the project to continue functioning normally.

The resolutions are in package.json under the "resolutions" field.