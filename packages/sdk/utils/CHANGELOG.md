# @celo/utils

## 6.0.1

### Patch Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places

- Updated dependencies [[`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01)]:
  - @celo/base@6.0.1

## 6.0.1-beta.0

### Patch Changes

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160) Thanks [@github-actions](https://github.com/apps/github-actions)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places

- Updated dependencies [[`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160)]:
  - @celo/base@6.0.1-beta.0

## 6.0.0

### Major Changes

- [#105](https://github.com/celo-org/developer-tooling/pull/105) [`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove export compareBN

  This would have been used to sort BN.js numbers. Generic comparator functions are not really the scope of this library. Removing it allows the bn.js dependency to be removed too. If you were using this function it can be re-implemented as

  ```typescript
  export function compareBN(a: BN, b: BN) {
    if (a.eq(b)) {
      return 0
    } else if (a.lt(b)) {
      return -1
    } else {
      return 1
    }
  }
  ```

## 6.0.0-beta.0

### Major Changes

- [#105](https://github.com/celo-org/developer-tooling/pull/105) [`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove export compareBN

  This would have been used to sort BN.js numbers. Generic comparator functions are not really the scope of this library. Removing it allows the bn.js dependency to be removed too. If you were using this function it can be re-implemented as

  ```typescript
  export function compareBN(a: BN, b: BN) {
    if (a.eq(b)) {
      return 0
    } else if (a.lt(b)) {
      return -1
    } else {
      return 1
    }
  }
  ```

## 5.0.6

### Patch Changes

- Updated dependencies [97d5ccf43]
  - @celo/base@6.0.0

## 5.0.6-beta.0

### Patch Changes

- Updated dependencies [97d5ccf43]
  - @celo/base@6.0.0-beta.0

## 5.0.5

### Patch Changes

- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other
- Updated dependencies [53bbd4958]
  - @celo/base@5.0.5

## 5.0.5-beta.0

### Patch Changes

- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other
- Updated dependencies [53bbd4958]
  - @celo/base@5.0.5-beta.0
