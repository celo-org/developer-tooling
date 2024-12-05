# @celo/metadata-claims

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
