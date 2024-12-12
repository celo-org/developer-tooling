# @celo/contractkit

## 9.0.0

### Major Changes

- [#340](https://github.com/celo-org/developer-tooling/pull/340) [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes all exports under the lib/identity folder. These have been move to a new @celo/metadata-claims package and should be imported from there.

  Note that folder structure is also flattened slightly. so replace `@celo/contractkit/lib/identity/claims/` with `@celo/metadata-claims/lib/`

  example

  ```diff
  - import { createAccountClaim } from '@celo/contractkit/lib/identity/claims/account'
  + import { createAccountClaim } from '@celo/metadata-claims/lib/account'
  ```

  ```diff
  - import { ContractKit, IdentityMetadataWrapper, newKitFromWeb3 } from '@celo/contractkit'
  - import { ClaimTypes } from '@celo/contractkit/lib/identity'
  + import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
  + import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'

  ```

  Note that Contractkit is Not a dependency. Instead when using `IdentityMetadataWrapper` you should make an object that satisfis the `AccountMetadataSignerGetters` type

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

- [#447](https://github.com/celo-org/developer-tooling/pull/447) [`7bc05c2`](https://github.com/celo-org/developer-tooling/commit/7bc05c219c7c3bbb764b4741595c57da523bb388) Thanks [@shazarre](https://github.com/shazarre)! - Exposes EpochManager.getElectedSigners contract method

- [`76045eb`](https://github.com/celo-org/developer-tooling/commit/76045ebff0df9c1c9fa75121dab4e910c9026976) Thanks [@shazarre](https://github.com/shazarre)! - ValidatorsWrapper: add registerValidatorNoBls to allow registration without BLS keys which are not supported in L2

### Patch Changes

- [#463](https://github.com/celo-org/developer-tooling/pull/463) [`eba89a3`](https://github.com/celo-org/developer-tooling/commit/eba89a3102706cfe6492b0dc44f583a36d320a15) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add GovernanceSlasher to RegisteredContractsEnum

- [#467](https://github.com/celo-org/developer-tooling/pull/467) [`43e8474`](https://github.com/celo-org/developer-tooling/commit/43e8474ecd245af3ec1e3d28f45d2de211e481e2) Thanks [@shazarre](https://github.com/shazarre)! - fix: add transferOwnership() to proxy abi list

- [#446](https://github.com/celo-org/developer-tooling/pull/446) [`42d091f`](https://github.com/celo-org/developer-tooling/commit/42d091fbc2ab71ce4ec2fb5c57ca266a20a96b6e) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump @celo/abis-12

- [#480](https://github.com/celo-org/developer-tooling/pull/480) [`b83d8c4`](https://github.com/celo-org/developer-tooling/commit/b83d8c4bd34feebdc4994dbbae198a1aa5b7eb34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Recommended node version is now node 20

- [#455](https://github.com/celo-org/developer-tooling/pull/455) [`36c4369`](https://github.com/celo-org/developer-tooling/commit/36c436980583396ca407fef511942c9a77279470) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Mark contract wrapper methods that will not work on L2 because solidity contracts have onlyL1 modifier as deprecated.

  | Deprecated Contract / Method                 | Replacement or none                       |
  | -------------------------------------------- | ----------------------------------------- |
  | Validators#registerValidator                 | Validators#registerValidatorNoBLS         |
  | BlockchainParams#getEpochNumberOfBlock       | EpochManager#getEpochNumberOfBlock        |
  | BlockchainParams#getFirstBlockNumberForEpoch | EpochManager#getFirstBlockAtEpoch         |
  | Election#getCurrentValidatorSigners          | EpochManager#getElectedSigners            |
  | Election#getGroupEpochRewards                | Election#getGroupEpochRewardsBasedOnScore |
  | GovernanceSlasher#slash                      | GovernanceSlasher#slashL2                 |
  | DoubleSigningSlasher                         | X                                         |
  | DowntimeSlasher                              | X                                         |

- [#400](https://github.com/celo-org/developer-tooling/pull/400) [`38fe4d0`](https://github.com/celo-org/developer-tooling/commit/38fe4d018d1b9ed5954a17501bdaa59b0aeec2f2) Thanks [@shazarre](https://github.com/shazarre)! - Renames `getElected` and its usages to `getElectedAccounts` for `EpochManagerWrapper`

- [#456](https://github.com/celo-org/developer-tooling/pull/456) [`d5c9204`](https://github.com/celo-org/developer-tooling/commit/d5c920491b2b6efec5f4637a4343bfb6f606c56f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Backwards compat for some methods using epoch's block numbers

- Updated dependencies [[`c4b9c6d`](https://github.com/celo-org/developer-tooling/commit/c4b9c6d60bf938950007a67df4e7c8ec35066fb3), [`d988d31`](https://github.com/celo-org/developer-tooling/commit/d988d317582daed57bf05a4c4d9d087e5e732f0d), [`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b), [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0), [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444)]:
  - @celo/wallet-local@6.0.4
  - @celo/base@7.0.0
  - @celo/utils@8.0.0
  - @celo/connect@6.1.0

## 9.0.0-beta.5

### Patch Changes

- [#480](https://github.com/celo-org/developer-tooling/pull/480) [`b83d8c4`](https://github.com/celo-org/developer-tooling/commit/b83d8c4bd34feebdc4994dbbae198a1aa5b7eb34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Recommended node version is now node 20

- Updated dependencies [[`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0)]:
  - @celo/base@7.0.0-beta.1

## 9.0.0-beta.4

### Patch Changes

- [#463](https://github.com/celo-org/developer-tooling/pull/463) [`eba89a3`](https://github.com/celo-org/developer-tooling/commit/eba89a3102706cfe6492b0dc44f583a36d320a15) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add GovernanceSlasher to RegisteredContractsEnum

- [#467](https://github.com/celo-org/developer-tooling/pull/467) [`43e8474`](https://github.com/celo-org/developer-tooling/commit/43e8474ecd245af3ec1e3d28f45d2de211e481e2) Thanks [@shazarre](https://github.com/shazarre)! - fix: add transferOwnership() to proxy abi list

## 9.0.0-beta.3

### Minor Changes

- [#447](https://github.com/celo-org/developer-tooling/pull/447) [`7bc05c2`](https://github.com/celo-org/developer-tooling/commit/7bc05c219c7c3bbb764b4741595c57da523bb388) Thanks [@shazarre](https://github.com/shazarre)! - Exposes EpochManager.getElectedSigners contract method

### Patch Changes

- [#446](https://github.com/celo-org/developer-tooling/pull/446) [`42d091f`](https://github.com/celo-org/developer-tooling/commit/42d091fbc2ab71ce4ec2fb5c57ca266a20a96b6e) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump @celo/abis-12

- [#455](https://github.com/celo-org/developer-tooling/pull/455) [`36c4369`](https://github.com/celo-org/developer-tooling/commit/36c436980583396ca407fef511942c9a77279470) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Mark contract wrapper methods that will not work on L2 because solidity contracts have onlyL1 modifier as deprecated.

  | Deprecated Contract / Method                 | Replacement or none                       |
  | -------------------------------------------- | ----------------------------------------- |
  | Validators#registerValidator                 | Validators#registerValidatorNoBLS         |
  | BlockchainParams#getEpochNumberOfBlock       | EpochManager#getEpochNumberOfBlock        |
  | BlockchainParams#getFirstBlockNumberForEpoch | EpochManager#getFirstBlockAtEpoch         |
  | Election#getCurrentValidatorSigners          | EpochManager#getElectedSigners            |
  | Election#getGroupEpochRewards                | Election#getGroupEpochRewardsBasedOnScore |
  | GovernanceSlasher#slash                      | GovernanceSlasher#slashL2                 |
  | DoubleSigningSlasher                         | X                                         |
  | DowntimeSlasher                              | X                                         |

- [#456](https://github.com/celo-org/developer-tooling/pull/456) [`d5c9204`](https://github.com/celo-org/developer-tooling/commit/d5c920491b2b6efec5f4637a4343bfb6f606c56f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Backwards compat for some methods using epoch's block numbers

- Updated dependencies []:
  - @celo/wallet-local@6.0.4-beta.1

## 9.0.0-beta.2

### Patch Changes

- Updated dependencies [[`c4b9c6d`](https://github.com/celo-org/developer-tooling/commit/c4b9c6d60bf938950007a67df4e7c8ec35066fb3), [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444)]:
  - @celo/wallet-local@6.0.3-beta.1
  - @celo/connect@6.1.0-beta.1

## 9.0.0-beta.1

### Minor Changes

- [`76045eb`](https://github.com/celo-org/developer-tooling/commit/76045ebff0df9c1c9fa75121dab4e910c9026976) Thanks [@shazarre](https://github.com/shazarre)! - ValidatorsWrapper: add registerValidatorNoBls to allow registration without BLS keys which are not supported in L2

### Patch Changes

- [#400](https://github.com/celo-org/developer-tooling/pull/400) [`38fe4d0`](https://github.com/celo-org/developer-tooling/commit/38fe4d018d1b9ed5954a17501bdaa59b0aeec2f2) Thanks [@shazarre](https://github.com/shazarre)! - Renames `getElected` and its usages to `getElectedAccounts` for `EpochManagerWrapper`

- Updated dependencies [[`d988d31`](https://github.com/celo-org/developer-tooling/commit/d988d317582daed57bf05a4c4d9d087e5e732f0d)]:
  - @celo/wallet-local@6.0.2-beta.1

## 9.0.0-beta.0

### Major Changes

- [#340](https://github.com/celo-org/developer-tooling/pull/340) [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes all exports under the lib/identity folder. These have been move to a new @celo/metadata-claims package and should be imported from there.

  Note that folder structure is also flattened slightly. so replace `@celo/contractkit/lib/identity/claims/` with `@celo/metadata-claims/lib/`

  example

  ```diff
  - import { createAccountClaim } from '@celo/contractkit/lib/identity/claims/account'
  + import { createAccountClaim } from '@celo/metadata-claims/lib/account'
  ```

  ```diff
  - import { ContractKit, IdentityMetadataWrapper, newKitFromWeb3 } from '@celo/contractkit'
  - import { ClaimTypes } from '@celo/contractkit/lib/identity'
  + import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
  + import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'

  ```

  Note that Contractkit is Not a dependency. Instead when using `IdentityMetadataWrapper` you should make an object that satisfis the `AccountMetadataSignerGetters` type

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
  - @celo/connect@6.0.3-beta.0
  - @celo/wallet-local@6.0.2-beta.0

## 8.3.1

### Patch Changes

- [#409](https://github.com/celo-org/developer-tooling/pull/409) [`e709b88`](https://github.com/celo-org/developer-tooling/commit/e709b8821315e354e418649320b5f93a7a464c16) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Renames `getElected` and its usages to `getElectedAccounts` for `EpochManagerWrapper`

## 8.3.0

### Minor Changes

- [#348](https://github.com/celo-org/developer-tooling/pull/348) [`76d09b7`](https://github.com/celo-org/developer-tooling/commit/76d09b79c68cbb5aba38c0b36a5322384b7842ba) Thanks [@shazarre](https://github.com/shazarre)! - Adds support for firstKnownEpoch, getFirstBlockAtEpoch, getLastBlockAtEpoch on EpochManager wrapper

### Patch Changes

- Updated dependencies [[`433b70e`](https://github.com/celo-org/developer-tooling/commit/433b70e20563e3e087cc39d744f1a2710d1d09de)]:
  - @celo/connect@6.0.2

## 8.2.0

### Minor Changes

- [#334](https://github.com/celo-org/developer-tooling/pull/334) [`7400467`](https://github.com/celo-org/developer-tooling/commit/740046755f5079cb1dafdb71fcc92cc4ad213eb9) Thanks [@pahor167](https://github.com/pahor167)! - Adds support for EpochManager and ScoreManager contracts

## 8.1.1

### Patch Changes

- [#315](https://github.com/celo-org/developer-tooling/pull/315) [`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore (bump deps)

- Updated dependencies [[`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4)]:
  - @celo/connect@6.0.1
  - @celo/wallet-local@6.0.1

## 8.1.1-beta.0

### Patch Changes

- [#315](https://github.com/celo-org/developer-tooling/pull/315) [`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore (bump deps)

- Updated dependencies [[`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4)]:
  - @celo/connect@6.0.1-beta.0
  - @celo/wallet-local@6.0.1-beta.0

## 8.1.0

### Minor Changes

- [#264](https://github.com/celo-org/developer-tooling/pull/264) [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add support for serializing, sending, parsing and deserializing cip66 transactions. This tx type is preffered over cip64 when paying for gas with tokens. Like eip1559 maxFeePerGass and maxPriorityFeePerGas are denominated in CELO. To create an cip66 transaction with Contractkit call the `kit.populateMaxFeeInToken` method with your transaction and then send it.

- [#267](https://github.com/celo-org/developer-tooling/pull/267) [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e) Thanks [@shazarre](https://github.com/shazarre)! - Introduced CeloDistributionScheduleWrapper

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds support for FeeCurrencyDirectory contract

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Introduces getConfig for FeeCurrencyDirectoryWrapper

- [#279](https://github.com/celo-org/developer-tooling/pull/279) [`06019bf`](https://github.com/celo-org/developer-tooling/commit/06019bfce3d7d939aca8d04d841193eb733bd372) Thanks [@shazarre](https://github.com/shazarre)! - Adds support for <1.5.0.0 and >=1.5.0.0 Governance contract version

### Patch Changes

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Deprecated methods on kit instance for getting epoch info.

- [#233](https://github.com/celo-org/developer-tooling/pull/233) [`eeb44f3`](https://github.com/celo-org/developer-tooling/commit/eeb44f300c08250e179b43881ae83bf0b530dc67) Thanks [@arthurgousset](https://github.com/arthurgousset)! - Nit: Capitalises function name using camel-case (`isowner` -> `isOwner`).

- [#274](https://github.com/celo-org/developer-tooling/pull/274) [`bfa24da`](https://github.com/celo-org/developer-tooling/commit/bfa24da3eef5f9386395b2173ced2cfd0a4b0eb2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix: USTD not showing that it uses an adapter by supporting Tether's tokenAdapter implementation

- Updated dependencies [[`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86)]:
  - @celo/utils@7.0.0
  - @celo/wallet-local@6.0.0
  - @celo/connect@6.0.0
  - @celo/base@6.1.0

## 8.1.0-beta.1

### Minor Changes

- [#264](https://github.com/celo-org/developer-tooling/pull/264) [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add support for serializing, sending, parsing and deserializing cip66 transactions. This tx type is preffered over cip64 when paying for gas with tokens. Like eip1559 maxFeePerGass and maxPriorityFeePerGas are denominated in CELO. To create an cip66 transaction with Contractkit call the `kit.populateMaxFeeInToken` method with your transaction and then send it.

### Patch Changes

- Updated dependencies [[`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e)]:
  - @celo/wallet-local@6.0.0-beta.2
  - @celo/connect@6.0.0-beta.1

## 8.1.0-beta.0

### Minor Changes

- [#267](https://github.com/celo-org/developer-tooling/pull/267) [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e) Thanks [@shazarre](https://github.com/shazarre)! - Introduced CeloDistributionScheduleWrapper

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds support for FeeCurrencyDirectory contract

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Introduces getConfig for FeeCurrencyDirectoryWrapper

### Patch Changes

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Deprecated methods on kit instance for getting epoch info.

- [#233](https://github.com/celo-org/developer-tooling/pull/233) [`eeb44f3`](https://github.com/celo-org/developer-tooling/commit/eeb44f300c08250e179b43881ae83bf0b530dc67) Thanks [@arthurgousset](https://github.com/arthurgousset)! - Nit: Capitalises function name using camel-case (`isowner` -> `isOwner`).

- [#274](https://github.com/celo-org/developer-tooling/pull/274) [`bfa24da`](https://github.com/celo-org/developer-tooling/commit/bfa24da3eef5f9386395b2173ced2cfd0a4b0eb2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix: USTD not showing that it uses an adapter by supporting Tether's tokenAdapter implementation

- Updated dependencies [[`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86)]:
  - @celo/utils@7.0.0-beta.0
  - @celo/connect@6.0.0-beta.0
  - @celo/base@6.1.0-beta.0
  - @celo/wallet-local@6.0.0-beta.0

## 8.0.0

### Major Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (BREAKING): `setFeeCurrency` changed to accept an address instead of previously accepting a StableToken
  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places
  (CHANGED): reinforced the types of most contract wrappers to use `StrongAddress` where appropriate

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Removes stable token infos from the kit.getNetworkConfig()

  Removes from StableTokenWrapper all InflationParameters including, valueToUnits(), unitsToValues(), setInflationParameters(),

  Removes the inflation params from StableTokenWrapper.getConfig

### Patch Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Bump Cross Fetch to fix security vulnerability

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- Updated dependencies [[`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01)]:
  - @celo/wallet-local@5.2.0
  - @celo/connect@5.3.0
  - @celo/utils@6.0.1
  - @celo/base@6.0.1

## 8.0.0-beta.0

### Major Changes

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160) Thanks [@github-actions](https://github.com/apps/github-actions)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (BREAKING): `setFeeCurrency` changed to accept an address instead of previously accepting a StableToken
  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places
  (CHANGED): reinforced the types of most contract wrappers to use `StrongAddress` where appropriate

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`a317972`](https://github.com/celo-org/developer-tooling/commit/a3179725c4c38274b8e664a0f2853a709911949c) Thanks [@github-actions](https://github.com/apps/github-actions)! - Removes stable token infos from the kit.getNetworkConfig()

  Removes from StableTokenWrapper all InflationParameters including, valueToUnits(), unitsToValues(), setInflationParameters(),

  Removes the inflation params from StableTokenWrapper.getConfig

### Patch Changes

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump Cross Fetch to fix security vulnerability

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- Updated dependencies [[`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`5335af5`](https://github.com/celo-org/developer-tooling/commit/5335af5808a892c95245624e676cd1952a0cfb42), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160)]:
  - @celo/wallet-local@5.2.0-beta.0
  - @celo/connect@5.3.0-beta.0
  - @celo/utils@6.0.1-beta.0
  - @celo/base@6.0.1-beta.0

## 7.2.0

### Minor Changes

- [#171](https://github.com/celo-org/developer-tooling/pull/171) [`fb7877a`](https://github.com/celo-org/developer-tooling/commit/fb7877ac364a4552769d77e4edd980460494557a) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Support for Core Contracts Release 11 (upgrade @celo/abis)

  see https://github.com/celo-org/celo-monorepo/releases/tag/core-contracts.v11

## 7.1.0

### Minor Changes

- [#140](https://github.com/celo-org/developer-tooling/pull/140) [`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e) Thanks [@timmoreton](https://github.com/timmoreton)! - Activate votes from any account, new optional parameter to specify for account in ElectionWrapper:activate

### Patch Changes

- Updated dependencies [[`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56)]:
  - @celo/connect@5.2.0
  - @celo/wallet-local@5.1.3

## 7.1.0-beta.1

### Patch Changes

- Updated dependencies [[`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56)]:
  - @celo/connect@5.2.0-beta.0
  - @celo/wallet-local@5.1.3-beta.0

## 7.1.0-beta.0

### Minor Changes

- [#140](https://github.com/celo-org/developer-tooling/pull/140) [`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e) Thanks [@timmoreton](https://github.com/timmoreton)! - Activate votes from any account, new optional parameter to specify for account in ElectionWrapper:activate

## 7.0.0

### Major Changes

- [#107](https://github.com/celo-org/developer-tooling/pull/107) [`b34439a`](https://github.com/celo-org/developer-tooling/commit/b34439a945c698c560c096c92255c230602adee6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove all references to now defunkt mento exchange contracts

### Patch Changes

- [#57](https://github.com/celo-org/developer-tooling/pull/57) [`8fb6c76`](https://github.com/celo-org/developer-tooling/commit/8fb6c76e4fada71c91f516ed151c4519ff2fe0fd) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Re-removes MetaTransaction wallets, as previously removed in 6.0.0 (9ab9d00eb).

  Remove support for deprecated `MetaTransactionWallet` and `MetaTransactionWalletDeployer`. If absolutely needed the contracts can be accessed directly or an alternative such as account abstraction should be used.

- [#56](https://github.com/celo-org/developer-tooling/pull/56) [`7dfbcd6`](https://github.com/celo-org/developer-tooling/commit/7dfbcd60203c8fd95bc6e113adfba02f7071ac47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Re-removes `grandamento`

  While 6.0.0 (9ab9d00eb) previously removed `grandamento` it was added back temporarily because `@celo/celocli` required the wrappers to be available in order to execute the proposal to remove it from governance. It is now gone for good. RIP.

  Due to previous removal this is not considered a breaking change.

- Updated dependencies [[`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/utils@6.0.0
  - @celo/wallet-local@5.1.2
  - @celo/connect@5.1.2

## 7.0.0-beta.2

### Major Changes

- [#107](https://github.com/celo-org/developer-tooling/pull/107) [`b34439a`](https://github.com/celo-org/developer-tooling/commit/b34439a945c698c560c096c92255c230602adee6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove all references to now defunkt mento exchange contracts

### Patch Changes

- Updated dependencies [[`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/utils@6.0.0-beta.0
  - @celo/connect@5.1.2-beta.0
  - @celo/wallet-local@5.1.2-beta.0

## 6.0.1-beta.1

### Patch Changes

- [#56](https://github.com/celo-org/developer-tooling/pull/56) [`7dfbcd6`](https://github.com/celo-org/developer-tooling/commit/7dfbcd60203c8fd95bc6e113adfba02f7071ac47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Reremoves grandamento

  While 9ab9d00eb previously removed grandamento it was added back temporarily because the celo cli required the wrappers to be available in order to execute the proposal to remove it from governance. It is now gone for good. RIP.

  Due to previous removal this is not considered a breaking change.

## 6.0.1-beta.0

### Patch Changes

- [#57](https://github.com/celo-org/developer-tooling/pull/57) [`8fb6c76`](https://github.com/celo-org/developer-tooling/commit/8fb6c76e4fada71c91f516ed151c4519ff2fe0fd) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Re-removes MetaTransaction wallets (as previously removed in 6.0)

  _previous messsage for removal_ - 9ab9d00eb: Remove Support for deprecated MetaTransactionWallet and MetaTransactionWalletDeployer. IF absolutely needed the contracts can be accessed directly or an alternative such as account abstraction should be used

## 6.0.0

### Major Changes

- 1c9c844cf: Remove contracts from lib/generated. now available in @celo/abis package at @celo/abis/web3

## 6.0.0-beta.2

### Patch Changes

- ba27783ae: Revert removal of Contracts

## 6.0.0-beta.1

### Major Changes

- 9ab9d00eb: Remove Support for deprecated MetaTransactionWallet and MetaTransactionWalletDeployer. IF absolutely needed the contracts can be accessed directly or an alternative such as account abstraction should be used
- 9ab9d00eb: Removes Grandamento from cli and contractkit completely as it has become no op by mento team

## 6.0.0-beta.0

### Major Changes

- 1c9c844cf: Remove contracts from lib/generated. now available in @celo/abis package at @celo/abis/web3

  If you were directly importing contracts from `@celo/contractkit/lib/generated/*` eg `@celo/lib/generated/Accounts` do a find replace

  find: `@celo/contractkit/lib/generated/`
  replace: `@celo/abis/web3/`

## 5.2.1

### Patch Changes

- 88e3788b8: add notice that LockedGold.getTotalPendingWithdrawalsCount is not yet available on all networks
- 70f600bb0: Mark MetaTransactionWallet and MetaTransactionWalletDeployer as deprecated, including functions to get them and their wrappers. see https://github.com/celo-org/celo-monorepo/issues/10766
- 2985f9eb2: Refactor Accounts.getParsedSignatureOfAddress

## 5.2.0

### Minor Changes

- add FeeHandler Wrapper
- 32face3d8: Governance delegation functions added
- 87647b46b: Add multisig:approve command to CLI, expose MultiSig.confirmTransaction in ContractKit.

### Patch Changes

- Updated dependencies [679ef0c60]
- Updated dependencies [97d5ccf43]
  - @celo/connect@5.1.1
  - @celo/base@6.0.0
  - @celo/utils@5.0.6
  - @celo/wallet-local@5.1.1

## 5.2.0-beta.0

### Minor Changes

- add FeeHandler Wrapper
- 32face3d8: Governance delegation functions added
- 87647b46b: Add multisig:approve command to CLI, expose MultiSig.confirmTransaction in ContractKit.

### Patch Changes

- Updated dependencies [97d5ccf43]
  - @celo/base@6.0.0-beta.0
  - @celo/connect@5.1.1-beta.0
  - @celo/utils@5.0.6-beta.0
  - @celo/wallet-local@5.1.1-beta.0

## 5.1.0

### Minor Changes

- d48c68afc: Add MultiSig.getTransaction() now optionally takes a second boolean param to avoid fetching confirmations information
- d48c68afc: Add method getConfirmations() to Multisig Wrapper
- 53bbd4958: Add cip64 support for feeCurrency Transactions. Note this is the replacement for the deprecated cip42 and legacy tx types https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip/0064.md

### Patch Changes

- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other
- d48c68afc: parallelize async calls in Governance Wrapper
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [53bbd4958]
  - @celo/connect@5.1.0
  - @celo/wallet-local@5.1.0
  - @celo/utils@5.0.5
  - @celo/base@5.0.5

## 5.1.0-beta.0

### Minor Changes

- d48c68afc: Add MultiSig.getTransaction() now optionally takes a second boolean param to avoid fetching confirmations information
- d48c68afc: Add method getConfirmations() to Multisig Wrapper
- 53bbd4958: Add cip64 support for feeCurrency Transactions. Note this is the replacement for the deprecated cip42 and legacy tx types https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip/0064.md

### Patch Changes

- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other
- d48c68afc: parallelize async calls in Governance Wrapper
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [53bbd4958]
  - @celo/connect@5.1.0-beta.0
  - @celo/wallet-local@5.1.0-beta.0
  - @celo/utils@5.0.5-beta.0
  - @celo/base@5.0.5-beta.0
