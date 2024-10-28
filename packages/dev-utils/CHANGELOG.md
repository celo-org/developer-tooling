# @celo/dev-utils

## 0.0.6

### Patch Changes

- [#409](https://github.com/celo-org/developer-tooling/pull/409) [`e709b88`](https://github.com/celo-org/developer-tooling/commit/e709b8821315e354e418649320b5f93a7a464c16) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Upgrades to latest devchain

## 0.0.5

### Patch Changes

- [#314](https://github.com/celo-org/developer-tooling/pull/314) [`053d2b1`](https://github.com/celo-org/developer-tooling/commit/053d2b1eff1460dba8749c9a03c806f20d8112e9) Thanks [@shazarre](https://github.com/shazarre)! - Introduces testWithAnvilL1 and testWithAnvilL2 that replace previously used testWithAnvil to make it explicit in which context given test suite is being run.

- Updated dependencies [[`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4)]:
  - @celo/connect@6.0.1

## 0.0.5-beta.0

### Patch Changes

- [#314](https://github.com/celo-org/developer-tooling/pull/314) [`053d2b1`](https://github.com/celo-org/developer-tooling/commit/053d2b1eff1460dba8749c9a03c806f20d8112e9) Thanks [@shazarre](https://github.com/shazarre)! - Introduces testWithAnvilL1 and testWithAnvilL2 that replace previously used testWithAnvil to make it explicit in which context given test suite is being run.

- Updated dependencies [[`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4)]:
  - @celo/connect@6.0.1-beta.0

## 0.0.4

### Patch Changes

- [#299](https://github.com/celo-org/developer-tooling/pull/299) [`17f48bc`](https://github.com/celo-org/developer-tooling/commit/17f48bcb9750c8c40d65e909677230d4dde4d39b) Thanks [@shazarre](https://github.com/shazarre)! - Added setCommissionUpdateDelay chain setup function

- [#243](https://github.com/celo-org/developer-tooling/pull/243) [`305e278`](https://github.com/celo-org/developer-tooling/commit/305e27889176e9ea9654bfa3c32537844d68846a) Thanks [@shazarre](https://github.com/shazarre)! - Introduces testWithAnvil that allows testing against a local anvil instance

- [#267](https://github.com/celo-org/developer-tooling/pull/267) [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e) Thanks [@shazarre](https://github.com/shazarre)! - Added TEST_TIMESTAMP to have fixed genesis block timestamp in anvil and support for calling evm_setNextBlockTimestamp

- [#278](https://github.com/celo-org/developer-tooling/pull/278) [`3f5f65d`](https://github.com/celo-org/developer-tooling/commit/3f5f65d7328117e92a870a3f14124c68ee03c182) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix jest force exits,Set default timeout to 1 second

- [#305](https://github.com/celo-org/developer-tooling/pull/305) [`6d6c3fb`](https://github.com/celo-org/developer-tooling/commit/6d6c3fbf1917a66f93772e7484310bce0df9414d) Thanks [@shazarre](https://github.com/shazarre)! - Introduced setDequeueFrequency and setReferendumStageDuration helper functions, decreased web3.eth.transactionPollingInterval to 10ms

- Updated dependencies [[`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86)]:
  - @celo/connect@6.0.0

## 0.0.4-beta.1

### Patch Changes

- [#278](https://github.com/celo-org/developer-tooling/pull/278) [`3f5f65d`](https://github.com/celo-org/developer-tooling/commit/3f5f65d7328117e92a870a3f14124c68ee03c182) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix jest force exits,Set default timeout to 1 second

## 0.0.4-beta.0

### Patch Changes

- [#243](https://github.com/celo-org/developer-tooling/pull/243) [`305e278`](https://github.com/celo-org/developer-tooling/commit/305e27889176e9ea9654bfa3c32537844d68846a) Thanks [@shazarre](https://github.com/shazarre)! - Introduces testWithAnvil that allows testing against a local anvil instance

- [#267](https://github.com/celo-org/developer-tooling/pull/267) [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e) Thanks [@shazarre](https://github.com/shazarre)! - Added TEST_TIMESTAMP to have fixed genesis block timestamp in anvil and support for calling evm_setNextBlockTimestamp

- Updated dependencies [[`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86)]:
  - @celo/connect@6.0.0-beta.0

## 0.0.3

### Patch Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Bump web3 to 1.10.4

## 0.0.3-beta.0

### Patch Changes

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump web3 to 1.10.4
