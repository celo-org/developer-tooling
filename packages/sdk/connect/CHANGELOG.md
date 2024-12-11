# @celo/connect

## 6.1.0

### Minor Changes

- [#420](https://github.com/celo-org/developer-tooling/pull/420) [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444) Thanks [@shazarre](https://github.com/shazarre)! - Now CeloProvider can be wrapped in EIP-1193 partially compatible object (request + args)

### Patch Changes

- Updated dependencies [[`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b), [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0)]:
  - @celo/base@7.0.0
  - @celo/utils@8.0.0

## 6.1.0-beta.1

### Minor Changes

- [#420](https://github.com/celo-org/developer-tooling/pull/420) [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444) Thanks [@shazarre](https://github.com/shazarre)! - Now CeloProvider can be wrapped in EIP-1193 partially compatible object (request + args)

## 6.0.3-beta.0

### Patch Changes

- Updated dependencies [[`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b)]:
  - @celo/base@7.0.0-beta.0
  - @celo/utils@8.0.0-beta.0

## 6.0.2

### Patch Changes

- [#350](https://github.com/celo-org/developer-tooling/pull/350) [`433b70e`](https://github.com/celo-org/developer-tooling/commit/433b70e20563e3e087cc39d744f1a2710d1d09de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix calculation of maxFeePerGas. Multiple base Fee by constant for buffer

## 6.0.1

### Patch Changes

- [#316](https://github.com/celo-org/developer-tooling/pull/316) [`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Fix the logic to fetch maxFeePerGas

## 6.0.1-beta.0

### Patch Changes

- [#316](https://github.com/celo-org/developer-tooling/pull/316) [`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Fix the logic to fetch maxFeePerGas

## 6.0.0

### Major Changes

- [#239](https://github.com/celo-org/developer-tooling/pull/239) [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove support for celo-legacy and cip42 transaction serialization and signing. These were the transaction types that supported gatewayFee. Transactions that specify feeCurrency and gasPrice togther will now throw. Users should migrate these to either ethereum type 0, eip1559 and cip64 style transactions depending on their need.

### Minor Changes

- [#264](https://github.com/celo-org/developer-tooling/pull/264) [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add support for serializing, sending, parsing and deserializing cip66 transactions. This tx type is preffered over cip64 when paying for gas with tokens. Like eip1559 maxFeePerGass and maxPriorityFeePerGas are denominated in CELO. To create an cip66 transaction with Contractkit call the `kit.populateMaxFeeInToken` method with your transaction and then send it.

- [#235](https://github.com/celo-org/developer-tooling/pull/235) [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378) Thanks [@shazarre](https://github.com/shazarre)! - Adds isCel2 util function to check for L1/L2 context

### Patch Changes

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - signTypedData now defaults to eth_signTypedDataV4 pass null for the previous behavior. this is due to v4 being the recommended way to use signTypedData and the only version supported by anvil.

- Updated dependencies [[`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03)]:
  - @celo/utils@7.0.0
  - @celo/base@6.1.0

## 6.0.0-beta.1

### Minor Changes

- [#264](https://github.com/celo-org/developer-tooling/pull/264) [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add support for serializing, sending, parsing and deserializing cip66 transactions. This tx type is preffered over cip64 when paying for gas with tokens. Like eip1559 maxFeePerGass and maxPriorityFeePerGas are denominated in CELO. To create an cip66 transaction with Contractkit call the `kit.populateMaxFeeInToken` method with your transaction and then send it.

## 6.0.0-beta.0

### Major Changes

- [#239](https://github.com/celo-org/developer-tooling/pull/239) [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove support for celo-legacy and cip42 transaction serialization and signing. These were the transaction types that supported gatewayFee. Transactions that specify feeCurrency and gasPrice togther will now throw. Users should migrate these to either ethereum type 0, eip1559 and cip64 style transactions depending on their need.

### Minor Changes

- [#235](https://github.com/celo-org/developer-tooling/pull/235) [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378) Thanks [@shazarre](https://github.com/shazarre)! - Adds isCel2 util function to check for L1/L2 context

### Patch Changes

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - signTypedData now defaults to eth_signTypedDataV4 pass null for the previous behavior. this is due to v4 being the recommended way to use signTypedData and the only version supported by anvil.

- Updated dependencies [[`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03)]:
  - @celo/utils@7.0.0-beta.0
  - @celo/base@6.1.0-beta.0

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
