# Changelog

## 5.0.0-beta.0

### Major Changes

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160) Thanks [@github-actions](https://github.com/apps/github-actions)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (BREAKING): `--gasCurrency` changed to accept only whitelisted addresses or the string `CELO` instead of previously accepting a StableToken or 'auto'
  (ADDED): `celocli network:whitelist` prints the whitelisted feeCurrencies
  (ADDED): the cli will automagically convert the previous gasCurrency such as cEUR, cUSD, cREAL, CELO into its address if necessary

### Patch Changes

- [#189](https://github.com/celo-org/developer-tooling/pull/189) [`cbfedf0`](https://github.com/celo-org/developer-tooling/commit/cbfedf0849a69e347a6ee3647b301ca0e7a11cac) Thanks [@renovate](https://github.com/apps/renovate)! - Bumps @celo/identity package to version [5.1.2](https://github.com/celo-org/social-connect/pull/181). This version removes the opentelemetry dependencies, which removes the warnings when users install @celo/celocli.

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump Cross Fetch to fix security vulnerability

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`a317972`](https://github.com/celo-org/developer-tooling/commit/a3179725c4c38274b8e664a0f2853a709911949c) Thanks [@github-actions](https://github.com/apps/github-actions)! - celocli nework:parameters no longer includes info on stable tokens

- Updated dependencies [[`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20), [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20), [`a317972`](https://github.com/celo-org/developer-tooling/commit/a3179725c4c38274b8e664a0f2853a709911949c), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`5335af5`](https://github.com/celo-org/developer-tooling/commit/5335af5808a892c95245624e676cd1952a0cfb42), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160)]:
  - @celo/contractkit@8.0.0-beta.0
  - @celo/explorer@5.0.10-beta.0
  - @celo/wallet-hsm-azure@5.2.0-beta.0
  - @celo/wallet-ledger@5.2.0-beta.0
  - @celo/wallet-local@5.2.0-beta.0
  - @celo/connect@5.3.0-beta.0
  - @celo/utils@6.0.1-beta.0
  - @celo/base@6.0.1-beta.0
  - @celo/governance@5.1.1-beta.0
  - @celo/cryptographic-utils@5.0.8-beta.0
  - @celo/phone-utils@6.0.2-beta.0

## 4.2.0

### Minor Changes

- [#171](https://github.com/celo-org/developer-tooling/pull/171) [`fb7877a`](https://github.com/celo-org/developer-tooling/commit/fb7877ac364a4552769d77e4edd980460494557a) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Support for Core Contracts Release 11 (upgrade @celo/abis)

  see https://github.com/celo-org/celo-monorepo/releases/tag/core-contracts.v11

### Patch Changes

- Updated dependencies [[`fb7877a`](https://github.com/celo-org/developer-tooling/commit/fb7877ac364a4552769d77e4edd980460494557a)]:
  - @celo/contractkit@7.2.0
  - @celo/governance@5.1.0

## 4.1.0

### Minor Changes

- [#140](https://github.com/celo-org/developer-tooling/pull/140) [`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e) Thanks [@timmoreton](https://github.com/timmoreton)! - Activate votes from any account, new optional parameter to specify for account in ElectionWrapper:activate

- [#146](https://github.com/celo-org/developer-tooling/pull/146) [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56) Thanks [@pahor167](https://github.com/pahor167)! - Added support of structs and tuples in governance:propose

  Adds ability to parse structs and tuples

### Patch Changes

- [#157](https://github.com/celo-org/developer-tooling/pull/157) [`d5977f2`](https://github.com/celo-org/developer-tooling/commit/d5977f2c080501e3e2548e54715a055e4302aa34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix not being able to submit governance proposals due to mishandling of 10K minimum deposit

- [#150](https://github.com/celo-org/developer-tooling/pull/150) [`6157c6d`](https://github.com/celo-org/developer-tooling/commit/6157c6d45e6bb0d868cd57155316016e013211fb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix issue where core contracts not having proxy could break cli

- [#149](https://github.com/celo-org/developer-tooling/pull/149) [`ae51ca8`](https://github.com/celo-org/developer-tooling/commit/ae51ca8851e6684d372f976dd8610ddf502a266b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Require addresses the cli sends from or to not to be sanctioned

- Updated dependencies [[`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56)]:
  - @celo/contractkit@7.1.0
  - @celo/governance@5.0.10
  - @celo/explorer@5.0.9
  - @celo/connect@5.2.0
  - @celo/wallet-hsm-azure@5.1.3
  - @celo/wallet-ledger@5.1.3
  - @celo/wallet-local@5.1.3

## 4.1.0-beta.1

### Minor Changes

- [#146](https://github.com/celo-org/developer-tooling/pull/146) [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56) Thanks [@pahor167](https://github.com/pahor167)! - Added support of structs and tuples in governance:propose

  Adds ability to parse structs and tuples

### Patch Changes

- Updated dependencies [[`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56)]:
  - @celo/governance@5.0.10-beta.1
  - @celo/explorer@5.0.9-beta.1
  - @celo/connect@5.2.0-beta.0
  - @celo/contractkit@7.1.0-beta.1
  - @celo/wallet-hsm-azure@5.1.3-beta.0
  - @celo/wallet-ledger@5.1.3-beta.0
  - @celo/wallet-local@5.1.3-beta.0

## 4.1.0-beta.0

### Minor Changes

- [#140](https://github.com/celo-org/developer-tooling/pull/140) [`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e) Thanks [@timmoreton](https://github.com/timmoreton)! - Activate votes from any account, new optional parameter to specify for account in ElectionWrapper:activate

### Patch Changes

- [#157](https://github.com/celo-org/developer-tooling/pull/157) [`d5977f2`](https://github.com/celo-org/developer-tooling/commit/d5977f2c080501e3e2548e54715a055e4302aa34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix not being able to submit governance proposals due to mishandling of 10K minimum deposit

- [#150](https://github.com/celo-org/developer-tooling/pull/150) [`6157c6d`](https://github.com/celo-org/developer-tooling/commit/6157c6d45e6bb0d868cd57155316016e013211fb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix issue where core contracts not having proxy could break cli

- [#149](https://github.com/celo-org/developer-tooling/pull/149) [`ae51ca8`](https://github.com/celo-org/developer-tooling/commit/ae51ca8851e6684d372f976dd8610ddf502a266b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Require addresses the cli sends from or to not to be sanctioned

- Updated dependencies [[`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e)]:
  - @celo/contractkit@7.1.0-beta.0
  - @celo/explorer@5.0.9-beta.0
  - @celo/governance@5.0.10-beta.0

## 4.0.0

### Major Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove the deprecated exchange:gold command. exchange:celo is a drop in replacement

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes the `releasegold` command in favour of `releasecelo`.

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove `grandamento` commands from CLI.

### Minor Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add support for swapping celo -- cStables via mento broker

### Patch Changes

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Improve column header names for rewards:show command

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Various fixes for displaying tablular information from commands

- [#134](https://github.com/celo-org/developer-tooling/pull/134) [`6968ad6`](https://github.com/celo-org/developer-tooling/commit/6968ad68c3e5b3f0bc09b73a673fbb0f50335674) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - force beta release

- Updated dependencies [[`8fb6c76`](https://github.com/celo-org/developer-tooling/commit/8fb6c76e4fada71c91f516ed151c4519ff2fe0fd), [`45d156d`](https://github.com/celo-org/developer-tooling/commit/45d156d03c03399bef51a00fe2b5cfb5e5669642), [`7dfbcd6`](https://github.com/celo-org/developer-tooling/commit/7dfbcd60203c8fd95bc6e113adfba02f7071ac47), [`b34439a`](https://github.com/celo-org/developer-tooling/commit/b34439a945c698c560c096c92255c230602adee6), [`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/contractkit@7.0.0
  - @celo/wallet-hsm-azure@5.1.2
  - @celo/utils@6.0.0
  - @celo/wallet-ledger@5.1.2
  - @celo/wallet-local@5.1.2
  - @celo/connect@5.1.2
  - @celo/cryptographic-utils@5.0.7
  - @celo/explorer@5.0.8
  - @celo/governance@5.0.9
  - @celo/phone-utils@6.0.1

## 4.0.0-beta.3

### Patch Changes

- [#134](https://github.com/celo-org/developer-tooling/pull/134) [`6968ad6`](https://github.com/celo-org/developer-tooling/commit/6968ad68c3e5b3f0bc09b73a673fbb0f50335674) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - force beta release

## 4.0.0-beta.2

### Patch Changes

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Improve column header names for rewards:show command

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Various fixes for displaying tablular information from commands

## 4.0.0-beta.1

### Major Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove the deprecated exchange:gold command. exchange:celo is a drop in replacement

### Minor Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add support for swapping celo -- cStables via mento broker

### Patch Changes

- Updated dependencies [[`45d156d`](https://github.com/celo-org/developer-tooling/commit/45d156d03c03399bef51a00fe2b5cfb5e5669642), [`b34439a`](https://github.com/celo-org/developer-tooling/commit/b34439a945c698c560c096c92255c230602adee6), [`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/wallet-hsm-azure@5.1.2-beta.0
  - @celo/contractkit@7.0.0-beta.2
  - @celo/utils@6.0.0-beta.0
  - @celo/explorer@5.0.8-beta.1
  - @celo/governance@5.0.9-beta.1
  - @celo/connect@5.1.2-beta.0
  - @celo/cryptographic-utils@5.0.7-beta.0
  - @celo/phone-utils@6.0.1-beta.0
  - @celo/wallet-ledger@5.1.2-beta.0
  - @celo/wallet-local@5.1.2-beta.0

## 4.0.0-beta.0

### Major Changes

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes releasegold commnand topic. use releasecelo

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove Grandamento from CLI

### Patch Changes

- Updated dependencies [[`8fb6c76`](https://github.com/celo-org/developer-tooling/commit/8fb6c76e4fada71c91f516ed151c4519ff2fe0fd)]:
  - @celo/contractkit@6.0.1-beta.0
  - @celo/explorer@5.0.8-beta.0
  - @celo/governance@5.0.9-beta.0

## 3.1.3

### Patch Changes

- 041fc926f: Add textual feedback about parsing proposal
- Updated dependencies [041fc926f]
- Updated dependencies [041fc926f]
- Updated dependencies [041fc926f]
  - @celo/governance@5.0.8

## 3.1.2-beta.2

### Patch Changes

- ba27783ae: Revert removal of Contracts
- Updated dependencies [ba27783ae]
  - @celo/contractkit@6.0.0-beta.2

### Patch Changes

- Updated dependencies [9ab9d00eb]
- Updated dependencies [444db6de9]
- Updated dependencies [9ab9d00eb]
  - @celo/contractkit@6.0.0-beta.1
  - @celo/governance@5.0.7-beta.2

## 3.1.2-beta.1

### Patch Changes

- e4da5a7a8: Add textual feedback about parsing proposal
- Updated dependencies [e4da5a7a8]
  - @celo/governance@5.0.7-beta.1

## 3.1.2-beta.0

### Patch Changes

- bb3cf9f2e: update terminology: refer to celo not gold.
- bb3cf9f2e: Alias releasecelo to releasegold
- Updated dependencies [1c9c844cf]
- Updated dependencies [86bbfddf1]
  - @celo/contractkit@6.0.0-beta.0
  - @celo/governance@5.0.7-beta.0
  - @celo/explorer@5.0.7-beta.0
- bb3cf9f2e: update terminology: refer to celo not gold.
- bb3cf9f2e: Alias releasecelo to releasegold
- Updated dependencies [9ab9d00eb]
- Updated dependencies [1c9c844cf]
- Updated dependencies [9ab9d00eb]
  - @celo/contractkit@6.0.0
  - @celo/explorer@5.0.7
  - @celo/governance@5.0.7

## 3.1.1

### Patch Changes

- 6ff7f4a1e: network:contracts command fix added StableTokens to unversioned contracts list
- Updated dependencies [88e3788b8]
- Updated dependencies [70f600bb0]
- Updated dependencies [2985f9eb2]
  - @celo/contractkit@5.2.1

## 3.1.0

### Minor Changes

- 06700f3ad: Update of Governance Upvote function
- 32face3d8: Delegation of Governance votes
- 1e8d07ba6: add FeeHandler contract info to `celocli network:contracts` command
- 87647b46b: Add multisig:approve command to CLI, expose MultiSig.confirmTransaction in ContractKit.

### Patch Changes

- 22ea7f691: Remove moment.js dependency
- Updated dependencies
- Updated dependencies [679ef0c60]
- Updated dependencies [97d5ccf43]
- Updated dependencies [32face3d8]
- Updated dependencies [97d5ccf43]
- Updated dependencies [87647b46b]
  - @celo/contractkit@5.2.0
  - @celo/connect@5.1.1
  - @celo/phone-utils@6.0.0
  - @celo/base@6.0.0
  - @celo/cryptographic-utils@5.0.6
  - @celo/explorer@5.0.6
  - @celo/governance@5.0.6
  - @celo/utils@5.0.6
  - @celo/wallet-hsm-azure@5.1.1
  - @celo/wallet-ledger@5.1.1
  - @celo/wallet-local@5.1.1

## 3.1.0-beta.0

### Minor Changes

- 06700f3ad: Update of Governance Upvote function
- 32face3d8: Delegation of Governance votes
- 1e8d07ba6: add FeeHandler contract info to `celocli network:contracts` command
- 87647b46b: Add multisig:approve command to CLI, expose MultiSig.confirmTransaction in ContractKit.

### Patch Changes

- 22ea7f691: Remove moment.js dependency
- Updated dependencies
- Updated dependencies [97d5ccf43]
- Updated dependencies [32face3d8]
- Updated dependencies [97d5ccf43]
- Updated dependencies [87647b46b]
  - @celo/contractkit@5.2.0-beta.0
  - @celo/phone-utils@6.0.0-beta.0
  - @celo/base@6.0.0-beta.0
  - @celo/explorer@5.0.6-beta.0
  - @celo/governance@5.0.6-beta.0
  - @celo/connect@5.1.1-beta.0
  - @celo/cryptographic-utils@5.0.6-beta.0
  - @celo/utils@5.0.6-beta.0
  - @celo/wallet-hsm-azure@5.1.1-beta.0
  - @celo/wallet-ledger@5.1.1-beta.0
  - @celo/wallet-local@5.1.1-beta.0

## 3.0.2

### Patch Changes

- d48c68afc: Speeds up governance:show command by parallelize async calls, and reducing data fetched
- cb7b4c538: Fixes type warnings
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
  - @celo/contractkit@5.1.0
  - @celo/connect@5.1.0
  - @celo/wallet-hsm-azure@5.1.0
  - @celo/wallet-ledger@5.1.0
  - @celo/wallet-local@5.1.0
  - @celo/cryptographic-utils@5.0.5
  - @celo/phone-utils@5.0.5
  - @celo/governance@5.0.5
  - @celo/explorer@5.0.5
  - @celo/utils@5.0.5
  - @celo/base@5.0.5

## 3.0.2-beta.1

### Patch Changes

- cb7b4c538: Fixes type warnings

## 3.0.2-beta.0

### Patch Changes

- d48c68afc: Speeds up governance:show command by parallelize async calls, and reducing data fetched
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
  - @celo/contractkit@5.1.0-beta.0
  - @celo/connect@5.1.0-beta.0
  - @celo/wallet-hsm-azure@5.1.0-beta.0
  - @celo/wallet-ledger@5.1.0-beta.0
  - @celo/wallet-local@5.1.0-beta.0
  - @celo/cryptographic-utils@5.0.5-beta.0
  - @celo/phone-utils@5.0.5-beta.0
  - @celo/governance@5.0.5-beta.0
  - @celo/explorer@5.0.5-beta.0
  - @celo/utils@5.0.5-beta.0
  - @celo/base@5.0.5-beta.0
    All notable changes to the [celo cli package](https://www.npmjs.com/package/@celo/celocli) will be documented in this file.

This package will follow the release process outlined [here](https://docs.celo.org/community/release-process).

## Development (not published yet)

### **[1.2.1--dev]**

Features

- [one-line summary] - [link PR]

Bug Fixes

- [one-line summary] - [link PR]

Other Changes

- [one-line summary] - [link PR]

## Published

### **[1.2.0]** -- 2021-04-22

Features

- cEUR support - [#7524](https://github.com/celo-org/celo-monorepo/pull/7524)
- Add more info to network:contracts - [#7379](https://github.com/celo-org/celo-monorepo/pull/7379)
- Approvehotfix to support multisigs - [#7671](https://github.com/celo-org/celo-monorepo/pull/7671)

Other Changes

- Add --globalHelp option to BaseCommand - [#7669](https://github.com/celo-org/celo-monorepo/pull/7669)

### **[1.1.1--beta]** -- 2021-03-22

Features

- Support Portuguese mnemonics - [#7220](https://github.com/celo-org/celo-monorepo/pull/7220)
- Improve granularity of governance tooling information - [#6475](https://github.com/celo-org/celo-monorepo/pull/6475)
- Small fixes in the proposal process for cEUR/Release 3 - [#7184](https://github.com/celo-org/celo-monorepo/pull/7184)
- CIP8 name access via the CLI - [#6855](https://github.com/celo-org/celo-monorepo/pull/6855)

Other Changes

- Upload/Download Profile Data with CIP8 - [#6604](https://github.com/celo-org/celo-monorepo/pull/6604)
- Improve naming in the DKG - [#4062](https://github.com/celo-org/celo-monorepo/pull/4062)
- Fix packages vulnerabilities - [#7476](https://github.com/celo-org/celo-monorepo/pull/7476)

### **[1.1.0]** -- 2021-02-16

Features

- Add plugins to CLI - [#5973](https://github.com/celo-org/celo-monorepo/pull/5973)
- New CLI command `identity:get-attestations` to query attestations - [#5974](https://github.com/celo-org/celo-monorepo/pull/5974)

Bug Fixes

- `releasegold:show` should succeed w/o account registration - [#7092](https://github.com/celo-org/celo-monorepo/pull/7092)
- Add check for signer or registered account in `releasegold:show` - [#7098](https://github.com/celo-org/celo-monorepo/pull/7098)

Other Changes

- Clarify Docs for `multisig:transfer` - [#6982](https://github.com/celo-org/celo-monorepo/pull/6982)

### **[1.0.3]** -- 2021-01-25

Bug Fixes

- Add missing lib in the `shrinkwrap.json` that avoids the usage of the package - [#6671](https://github.com/celo-org/celo-monorepo/pull/6671)

### **[1.0.2]** -- 2021-01-22

Bug Fixes

- Fixed Global Flag Parsing in CLI - [#6619](https://github.com/celo-org/celo-monorepo/pull/6619)

Other Changes

- Fix libraries versions (`shrinkwrap`) to avoid supply chain attacks - [#6575](https://github.com/celo-org/celo-monorepo/pull/6575)

### **[1.0.1]** -- 2021-01-20

Features

- Pass through [oclif table flags](https://github.com/oclif/cli-ux#clitable) to commands which output tables - [#5618](https://github.com/celo-org/celo-monorepo/pull/5618)
- CIP 8 Encryption - [#5091](https://github.com/celo-org/celo-monorepo/pull/5091)
- Add authorized signers to release gold show - [#5596](https://github.com/celo-org/celo-monorepo/pull/5596)
- Extract governance:build-proposal command - [#5847](https://github.com/celo-org/celo-monorepo/pull/5847)
- Add downtime slashing commands - [#5632](https://github.com/celo-org/celo-monorepo/pull/5632)
- Add ability to withdraw attestation rewards via CLI [#6176](https://github.com/celo-org/celo-monorepo/pull/6176)
- Mnemonic validation flexibility within Valora - [#6372](https://github.com/celo-org/celo-monorepo/pull/6372)
- Write transfer and transferFrom commands for MultiSig contract - [#6425](https://github.com/celo-org/celo-monorepo/pull/6425)

Bug Fixes

- Fix param order on account:new internal call - [#6319](https://github.com/celo-org/celo-monorepo/pull/6319)
- Remove broken header links in generated CLI docs - [#6415](https://github.com/celo-org/celo-monorepo/pull/6415)
- Fix @ledgerhq package version in CK and CLI - [#6496](https://github.com/celo-org/celo-monorepo/pull/6496)
- Fix call to set gas currency in CLI base - [#6505](https://github.com/celo-org/celo-monorepo/pull/6505)

Other Changes

- KomenciKit - [#5436](https://github.com/celo-org/celo-monorepo/pull/5436)
- Update base and utils package versions [#5655](https://github.com/celo-org/celo-monorepo/pull/5655)
- Parallelize and simplify fetching of comprensive registry address map - [#5568](https://github.com/celo-org/celo-monorepo/pull/5568)
- Add readability to (big) number and timestamp/duration outputs in CK and CLI - [#5584](https://github.com/celo-org/celo-monorepo/pull/5584)
- Rename build-proposal flag - [#5885](https://github.com/celo-org/celo-monorepo/pull/5885)
- Compatibility with Sdk Modularization - [#4790](https://github.com/celo-org/celo-monorepo/pull/4790)
- Adjust how CLI docs are generated - [#5882](https://github.com/celo-org/celo-monorepo/pull/5882)
- Add install instructions for CLI readme - [#6466](https://github.com/celo-org/celo-monorepo/pull/6466)

### **[0.0.60]** -- 2020-10-27

Bug Fixes

- Uses the most up-to-date version of @celo/contractkit (0.4.17) & fixes backward compatibility issues from the last release
- Actually call toString in oracle report CLI - [#5594](https://github.com/celo-org/celo-monorepo/pull/5594)

Other Changes

- Support the use of scientific notation for the deposit of a governance proposal - [#5326](https://github.com/celo-org/celo-monorepo/pull/5326)
- Require `--force` with `account:claim-attestation-service-url` for non-TLS urls [#5599](https://github.com/celo-org/celo-monorepo/pull/5599)

### **[0.0.59]** -- 2020-10-23

Features

- Add `jsonTransactions` flag to `governance:show` for use in the (contract release process)[https://docs.celo.org/community/release-process/smart-contracts] - [#5111](https://github.com/celo-org/celo-monorepo/pull/5111)

Bug Fixes

- Fix attestation service test delivering false negatives - [#5336](https://github.com/celo-org/celo-monorepo/pull/5336)
- Fix error when listing contract addresses and include some missing new contracts - [#5301](https://github.com/celo-org/celo-monorepo/pull/5301)

Other Changes

- Convert default log output color from red to yellow - [#5517](https://github.com/celo-org/celo-monorepo/pull/5517)

### **[0.0.58]** -- 2020-10-08

Features

- CLI compatability with [Attestation Service 1.0.5](https://github.com/celo-org/celo-monorepo/releases/tag/attestation-service-1-0-5) - [#5011](https://github.com/celo-org/celo-monorepo/pull/5011)
- Adds an interactive prompt for forming proposals from Celo registry contracts and functions - [#3008](https://github.com/celo-org/celo-monorepo/pull/3008)

Other Changes

- Correct documentation on the validator and validator group deregister - [#5197](https://github.com/celo-org/celo-monorepo/pull/5197)

### **[0.0.57]** -- 2020-09-23

Features

- Adds ODIS identifier query to celocli - [#4976](https://github.com/celo-org/celo-monorepo/pull/4976)

Bug Fixes

- Fixes backward compatibility issues in cli - [#5124](https://github.com/celo-org/celo-monorepo/pull/5124)

_Note: Changes before 0.0.57 are not documented_
