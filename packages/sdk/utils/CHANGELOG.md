# @celo/utils

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
