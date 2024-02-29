# @celo/connect

## 5.2.0

### Minor Changes

- [#146](https://github.com/celo-org/developer-tooling/pull/146) [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56) Thanks [@pahor167](https://github.com/pahor167)! - add tuple support to signatureToAbiDefinition

## 5.2.0-beta.0

### Minor Changes

- [#146](https://github.com/celo-org/developer-tooling/pull/146) [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56) Thanks [@pahor167](https://github.com/pahor167)! - add tuple support to signatureToAbiDefinition

## 5.1.2

### Patch Changes

- Updated dependencies [[`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/utils@6.0.0

## 5.1.2-beta.0

### Patch Changes

- Updated dependencies [[`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/utils@6.0.0-beta.0

## 5.1.1

### Patch Changes

- 679ef0c60: Add back setFeeMarket function and re remove fillGasPrice which were accidentally reverted in beta 0
- Updated dependencies [97d5ccf43]
  - @celo/base@6.0.0
  - @celo/utils@5.0.6

## 5.1.1-beta.0

### Patch Changes

- Updated dependencies [97d5ccf43]
  - @celo/base@6.0.0-beta.0
  - @celo/utils@5.0.6-beta.0

## 5.1.0

### Minor Changes

- 53bbd4958: Add cip64 support for feeCurrency Transactions. Note this is the replacement for the deprecated cip42 and legacy tx types https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip/0064.md

### Patch Changes

- d48c68afc: Add memoization to Connection.chainId() funciton. this is reset when setProvider is called.
- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other
- Updated dependencies [53bbd4958]
  - @celo/utils@5.0.5
  - @celo/base@5.0.5

## 5.1.0-beta.0

### Minor Changes

- 53bbd4958: Add cip64 support for feeCurrency Transactions. Note this is the replacement for the deprecated cip42 and legacy tx types https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip/0064.md

### Patch Changes

- d48c68afc: Add memoization to Connection.chainId() funciton. this is reset when setProvider is called.
- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other
- Updated dependencies [53bbd4958]
  - @celo/utils@5.0.5-beta.0
  - @celo/base@5.0.5-beta.0
