# @celo/contractkit

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
