# @celo/metadata-claims

## 1.0.2

### Patch Changes

- [#558](https://github.com/celo-org/developer-tooling/pull/558) [`f11a069`](https://github.com/celo-org/developer-tooling/commit/f11a069b152cb34c18f12b6535f4b217a631079d) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect repo link in package.json

- Updated dependencies [[`f11a069`](https://github.com/celo-org/developer-tooling/commit/f11a069b152cb34c18f12b6535f4b217a631079d)]:
  - @celo/base@7.0.2
  - @celo/utils@8.0.2

## 1.0.1

### Patch Changes

- [#470](https://github.com/celo-org/developer-tooling/pull/470) [`770bfa4`](https://github.com/celo-org/developer-tooling/commit/770bfa47af12ce8fbe0a4884481034ca26d3b29d) Thanks [@shazarre](https://github.com/shazarre)! - Backwards compatibility for existing ATTESTATIONS_SERVICE_URL claims

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump dependncies up

- Updated dependencies [[`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de), [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1)]:
  - @celo/utils@8.0.1
  - @celo/base@7.0.1

## 1.0.1-beta.0

### Patch Changes

- [#470](https://github.com/celo-org/developer-tooling/pull/470) [`770bfa4`](https://github.com/celo-org/developer-tooling/commit/770bfa47af12ce8fbe0a4884481034ca26d3b29d) Thanks [@shazarre](https://github.com/shazarre)! - Backwards compatibility for existing ATTESTATIONS_SERVICE_URL claims

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump dependncies up

- Updated dependencies [[`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de), [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1)]:
  - @celo/utils@8.0.1-beta.0
  - @celo/base@7.0.1-beta.0

## 1.0.0

### Major Changes

- [#340](https://github.com/celo-org/developer-tooling/pull/340) [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Introducing @celo/metadata-claims These are a series of functions extracted from @celo/contractkit since they didnt strictly need depend on contractkit itsefl. Developers can now use IdentityMetadataWrapper with any js rpc library like ethers or viem or web3js without being forced to import ContractKit.

  Instead when using `IdentityMetadataWrapper` you should make an object that satisfis the `AccountMetadataSignerGetters` type

  ```typescript
  import { AccountMetadataSignerGetters } from '@celo/metadata-claims/lib/types'
  ```

  using viem it would be like

  ```typescript
  const accountsMetaDataSignerGetters: AccountMetadataSignerGetters = {
    isAccount: async (address: string) => accounts.read.isAccount([address as Address]),
    getValidatorSigner: async (address: string) =>
      accounts.read.getValidatorSigner([address as Address]),
    getVoteSigner: async (address: string) =>
      accounts.read.getValidatorSigner([address as Address]),
    getAttestationSigner: async (address: string) =>
      accounts.read.getValidatorSigner([address as Address]),
  }
  ```

### Minor Changes

- [#459](https://github.com/celo-org/developer-tooling/pull/459) [`0e559c7`](https://github.com/celo-org/developer-tooling/commit/0e559c73f1d0dee80ee01e9ddd38481a3a8e10b1) Thanks [@shazarre](https://github.com/shazarre)! - Add support for RPC_URL claim type

### Patch Changes

- [#475](https://github.com/celo-org/developer-tooling/pull/475) [`b366827`](https://github.com/celo-org/developer-tooling/commit/b3668273f0ae1ac4363d0fa6f23de089d18dd77c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Publish lib instead of src

- Updated dependencies [[`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b), [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0)]:
  - @celo/base@7.0.0
  - @celo/utils@8.0.0

## 1.0.0-beta.2

### Patch Changes

- [#475](https://github.com/celo-org/developer-tooling/pull/475) [`b366827`](https://github.com/celo-org/developer-tooling/commit/b3668273f0ae1ac4363d0fa6f23de089d18dd77c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Publish lib instead of src

## 1.0.0-beta.1

### Minor Changes

- [#459](https://github.com/celo-org/developer-tooling/pull/459) [`0e559c7`](https://github.com/celo-org/developer-tooling/commit/0e559c73f1d0dee80ee01e9ddd38481a3a8e10b1) Thanks [@shazarre](https://github.com/shazarre)! - Add support for RPC_URL claim type

## 1.0.0-beta.0

### Major Changes

- [#340](https://github.com/celo-org/developer-tooling/pull/340) [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Introducing @celo/metadata-claims These are a series of functions extracted from @celo/contractkit since they didnt strictly need depend on contractkit itsefl. Developers can now use IdentityMetadataWrapper with any js rpc library like ethers or viem or web3js without being forced to import ContractKit.

  Instead when using `IdentityMetadataWrapper` you should make an object that satisfis the `AccountMetadataSignerGetters` type

  ```typescript
  import { AccountMetadataSignerGetters } from '@celo/metadata-claims/lib/types'
  ```

  using viem it would be like

  ```typescript
  const accountsMetaDataSignerGetters: AccountMetadataSignerGetters = {
    isAccount: async (address: string) => accounts.read.isAccount([address as Address]),
    getValidatorSigner: async (address: string) =>
      accounts.read.getValidatorSigner([address as Address]),
    getVoteSigner: async (address: string) =>
      accounts.read.getValidatorSigner([address as Address]),
    getAttestationSigner: async (address: string) =>
      accounts.read.getValidatorSigner([address as Address]),
  }
  ```

### Patch Changes

- Updated dependencies [[`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b)]:
  - @celo/base@7.0.0-beta.0
  - @celo/utils@8.0.0-beta.0
