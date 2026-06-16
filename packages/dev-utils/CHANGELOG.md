# @celo/dev-utils

## 0.2.1

### Patch Changes

- [#782](https://github.com/celo-org/developer-tooling/pull/782) [`9d19100`](https://github.com/celo-org/developer-tooling/commit/9d19100ac14476814fdbf8e6e3ce80f2bfe1822d) Thanks [@pahor167](https://github.com/pahor167)! - Fix several `governance`/`celocli` command output & safety issues:
  - `governance:propose` logged `undefined is a proxy, repointing to ...` for
    core-contract proxy repoints (logged `tx.address` which is undefined when the
    tx is keyed by `contract`); now logs the real proxy id.
  - `governance:propose` now surfaces the new proposal id (`ProposalQueued`), and
    the `--useMultiSig` path surfaces the multisig transaction id (`Submission` on
    submit, `Confirmation` on a later signer) plus the proposal id when the submit
    reaches threshold and executes in the same receipt.
  - `@celo/actions` `getGroupsWithPendingVotes` now filters on pending votes `> 0`
    (was `>= 0`, which returned every group); fixes `election:activate` selecting
    groups with no pending votes.
  - `governance:execute` now checks the proposal is approved before sending, so it
    fails the precondition cleanly instead of reverting with "Proposal not approved".
  - `governance:upvote`/`revokeupvote`/`votePartially` and `multisig:approve` now
    decode and print their on-chain events (proposal id / transaction id).
  - `governance:propose` can now build a core-contract call whose method is added
    by an earlier upgrade tx in the same proposal: when the method is absent from
    the bundled ABI, it is resolved from the implementation a prior tx repoints the
    proxy to (verified metadata), with a raw `function: "name(uint256)"` signature
    fallback.
  - `governance:propose` now simulates the proposal by default against a
    self-contained local fork (bundled `@foundry-rs/anvil`) of the connected node,
    applying the transactions in order so a transaction that depends on an earlier
    one (e.g. a method added by a prior upgrade tx) simulates correctly. Use
    `--simulate <rpcUrl>` to target an external fork, or `--no-simulate` to fall
    back to the previous independent per-transaction `eth_call` checks.
  - `lockedcelo:withdraw` (and `releasecelo:locked-gold` withdraw) no longer spin
    in an infinite loop when no pending withdrawal is available, and re-fetch
    between withdrawals to avoid stale indices.
  - `@celo/dev-utils` anvil test harness now resolves the foundry-installed
    `anvil` (snapshot-compatible) instead of a package-manager `anvil` bin shim,
    so packages that bundle a newer anvil don't break the devchain state load.
  - `@celo/explorer` `fetchMetadata` now uses the Sourcify v2 API (the v1 repo API
    has been sunset / returns 503), so contract ABI resolution (used by
    `governance:propose` to build calls to verified contracts, including
    implementations added by an in-proposal upgrade) works again.

## 0.2.0

### Minor Changes

- [#780](https://github.com/celo-org/developer-tooling/pull/780) [`95a84a4`](https://github.com/celo-org/developer-tooling/commit/95a84a4ac6c18278e94ef98549c1606dcd5a496f) Thanks [@pahor167](https://github.com/pahor167)! - **Remove rpc-contract.ts, PromiEvent, and legacy Contract interface from @celo/connect**

  - Deleted `rpc-contract.ts`, `promi-event.ts`, and `viem-contract.ts` — replaced with native viem `getContract()` / `GetContractReturnType`
  - `CeloTxObject.send()` now returns `Promise<string>` (tx hash) instead of `PromiEvent<CeloTxReceipt>`
  - Removed `Connection.createContract()` — use `Connection.getCeloContract()` instead
  - Removed `PromiEvent<T>` and `Contract` interfaces from types
  - Removed the public exports `CeloTransactionObject`, `toTransactionObject`, `CeloTxObject`, `RpcCaller`, and `TransactionResult` (the old `celo-transaction-object`, `rpc-caller`, and `tx-result` modules)
  - Contract deployment rewritten to use viem's `encodeDeployData` + `connection.sendTransaction()`
  - All contractkit wrappers, CLI commands, and test files updated

  **Breaking changes in @celo/contractkit**

  - `kit.sendTransaction()` now returns `Promise<\`0x${string}\`>`(the transaction hash) instead of a`TransactionResult`; use `kit.connection.viemClient.waitForTransactionReceipt({ hash })` to wait for inclusion
  - All wrapper write methods now return the transaction hash (a `Promise<string>`) instead of `CeloTransactionObject<T>`; replace `.send()` / `.sendAndWaitForReceipt()` with `await kit.connection.viemClient.waitForTransactionReceipt({ hash })`
  - Removed the deprecated `kit.web3` shim — use `kit.connection.viemClient` (reads) and wrapper methods (writes)
  - Removed `kit.isListening()` and `kit.isSyncing()` (no direct replacement; query the node via `kit.connection.viemClient.request({ method: 'net_listening' })` or `{ method: 'eth_syncing' }` if needed)
  - Removed the deprecated `kit.gasPriceSuggestionMultiplier` property
  - Removed the `CeloToken` type re-export — use `CeloTokenContract`

### Patch Changes

- [#780](https://github.com/celo-org/developer-tooling/pull/780) [`95a84a4`](https://github.com/celo-org/developer-tooling/commit/95a84a4ac6c18278e94ef98549c1606dcd5a496f) Thanks [@pahor167](https://github.com/pahor167)! - Remove the deprecated `kit.web3` shim and migrate contractkit to viem-native contract interaction. Use `kit.connection.viemClient` for reads and the wrapper methods for writes. Adds `newKitFromProvider()` as the recommended factory for building a kit from an EIP-1193 provider.

- Updated dependencies [[`95a84a4`](https://github.com/celo-org/developer-tooling/commit/95a84a4ac6c18278e94ef98549c1606dcd5a496f), [`95a84a4`](https://github.com/celo-org/developer-tooling/commit/95a84a4ac6c18278e94ef98549c1606dcd5a496f), [`95a84a4`](https://github.com/celo-org/developer-tooling/commit/95a84a4ac6c18278e94ef98549c1606dcd5a496f)]:
  - @celo/connect@8.0.0

## 0.1.3

### Patch Changes

- [#756](https://github.com/celo-org/developer-tooling/pull/756) [`fad32ac`](https://github.com/celo-org/developer-tooling/commit/fad32ac6748f7556359e62ea33ae0cf8299f1712) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Update minimum Node.js version requirement to >=20

## 0.1.2

### Patch Changes

- [#699](https://github.com/celo-org/developer-tooling/pull/699) [`3eb509d`](https://github.com/celo-org/developer-tooling/commit/3eb509d8043fabced91926b90a176f753d35cce9) Thanks [@renovate](https://github.com/apps/renovate)! - fix(deps): update dependency tmp to ^0.2.0 [security]

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`e058e0a`](https://github.com/celo-org/developer-tooling/commit/e058e0a5357443ae5c8359443b4bcba955524140) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Support Core Contract Release 13

## 0.1.2-cc13.0

### Patch Changes

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`8cf27a1`](https://github.com/celo-org/developer-tooling/commit/8cf27a1bf22342806b917020776a877296a4b71c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Support Core Contract Release 13

## 0.1.1

### Patch Changes

- [#683](https://github.com/celo-org/developer-tooling/pull/683) [`bbdce04`](https://github.com/celo-org/developer-tooling/commit/bbdce04c9f50b7eaa63856bc26f100d11ec2f9d0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Use realistic values for gasPrice and baseFeePerGas in anvil instance

## 0.1.0

### Minor Changes

- [#598](https://github.com/celo-org/developer-tooling/pull/598) [`a0efb2f`](https://github.com/celo-org/developer-tooling/commit/a0efb2fad370e350a3a4ea0ee10413628487fa47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove TestWithAnvilL1

- [#554](https://github.com/celo-org/developer-tooling/pull/554) [`feef9ac`](https://github.com/celo-org/developer-tooling/commit/feef9ac013e5fbf2acc3b5941a6cbd72df2825b2) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add viem+anvil utils

- [#598](https://github.com/celo-org/developer-tooling/pull/598) [`a0efb2f`](https://github.com/celo-org/developer-tooling/commit/a0efb2fad370e350a3a4ea0ee10413628487fa47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove ganache. Change lib/ganache-setup.js to lib/test-accounts.js

- [#602](https://github.com/celo-org/developer-tooling/pull/602) [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add some viem helpers

### Patch Changes

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

- [#598](https://github.com/celo-org/developer-tooling/pull/598) [`a0efb2f`](https://github.com/celo-org/developer-tooling/commit/a0efb2fad370e350a3a4ea0ee10413628487fa47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove testWithGanache

- Updated dependencies [[`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8)]:
  - @celo/connect@7.0.0

## 0.1.0-beta.3

### Patch Changes

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

- Updated dependencies []:
  - @celo/connect@7.0.0-beta.1

## 0.1.0-beta.2

### Minor Changes

- [#598](https://github.com/celo-org/developer-tooling/pull/598) [`a0efb2f`](https://github.com/celo-org/developer-tooling/commit/a0efb2fad370e350a3a4ea0ee10413628487fa47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove TestWithAnvilL1

- [#598](https://github.com/celo-org/developer-tooling/pull/598) [`a0efb2f`](https://github.com/celo-org/developer-tooling/commit/a0efb2fad370e350a3a4ea0ee10413628487fa47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove ganache. Change lib/ganache-setup.js to lib/test-accounts.js

- [#602](https://github.com/celo-org/developer-tooling/pull/602) [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add some viem helpers

### Patch Changes

- [#598](https://github.com/celo-org/developer-tooling/pull/598) [`a0efb2f`](https://github.com/celo-org/developer-tooling/commit/a0efb2fad370e350a3a4ea0ee10413628487fa47) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove testWithGanache

## 0.1.0-beta.1

### Patch Changes

- Updated dependencies [[`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8)]:
  - @celo/connect@7.0.0-beta.0

## 0.1.0-beta.0

### Minor Changes

- [#554](https://github.com/celo-org/developer-tooling/pull/554) [`feef9ac`](https://github.com/celo-org/developer-tooling/commit/feef9ac013e5fbf2acc3b5941a6cbd72df2825b2) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add viem+anvil utils

## 0.0.8

### Patch Changes

- Updated dependencies [[`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de)]:
  - @celo/connect@6.1.1

## 0.0.8-beta.0

### Patch Changes

- Updated dependencies [[`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de)]:
  - @celo/connect@6.1.1-beta.0

## 0.0.7

### Patch Changes

- [#400](https://github.com/celo-org/developer-tooling/pull/400) [`38fe4d0`](https://github.com/celo-org/developer-tooling/commit/38fe4d018d1b9ed5954a17501bdaa59b0aeec2f2) Thanks [@shazarre](https://github.com/shazarre)! - Upgrades to latest devchain

- [#446](https://github.com/celo-org/developer-tooling/pull/446) [`42d091f`](https://github.com/celo-org/developer-tooling/commit/42d091fbc2ab71ce4ec2fb5c57ca266a20a96b6e) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump @celo/abis

- [#420](https://github.com/celo-org/developer-tooling/pull/420) [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444) Thanks [@shazarre](https://github.com/shazarre)! - Adds actual Celo chain id when running anvil

- Updated dependencies [[`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444)]:
  - @celo/connect@6.1.0

## 0.0.7-beta.2

### Patch Changes

- [#446](https://github.com/celo-org/developer-tooling/pull/446) [`42d091f`](https://github.com/celo-org/developer-tooling/commit/42d091fbc2ab71ce4ec2fb5c57ca266a20a96b6e) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump @celo/abis

## 0.0.7-beta.1

### Patch Changes

- [#420](https://github.com/celo-org/developer-tooling/pull/420) [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444) Thanks [@shazarre](https://github.com/shazarre)! - Adds actual Celo chain id when running anvil

- Updated dependencies [[`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444)]:
  - @celo/connect@6.1.0-beta.1

## 0.0.6-beta.1

### Patch Changes

- [#400](https://github.com/celo-org/developer-tooling/pull/400) [`38fe4d0`](https://github.com/celo-org/developer-tooling/commit/38fe4d018d1b9ed5954a17501bdaa59b0aeec2f2) Thanks [@shazarre](https://github.com/shazarre)! - Upgrades to latest devchain

## 0.0.6-beta.0

### Patch Changes

- Updated dependencies []:
  - @celo/connect@6.0.3-beta.0

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
