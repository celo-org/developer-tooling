# @celo/connect

## 5.3.0

### Minor Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add support Type 0 Ethereum-compatible legacy TXs

### Patch Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places

- Updated dependencies [[`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01)]:
  - @celo/utils@6.0.1
  - @celo/base@6.0.1

## 5.3.0-beta.0

### Minor Changes

- [#182](https://github.com/celo-org/developer-tooling/pull/182) [`5335af5`](https://github.com/celo-org/developer-tooling/commit/5335af5808a892c95245624e676cd1952a0cfb42) Thanks [@carterqw2](https://github.com/carterqw2)! - Add support Type 0 Ethereum-compatible legacy TXs

### Patch Changes

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160) Thanks [@github-actions](https://github.com/apps/github-actions)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places

- Updated dependencies [[`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160)]:
  - @celo/utils@6.0.1-beta.0
  - @celo/base@6.0.1-beta.0

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
