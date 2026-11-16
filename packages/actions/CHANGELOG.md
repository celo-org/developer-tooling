# @celo/actions

## 0.2.3

### Patch Changes

- [#784](https://github.com/celo-org/developer-tooling/pull/784) [`b4f631c`](https://github.com/celo-org/developer-tooling/commit/b4f631c07abf3570aeac6112a98249203bf7344a) Thanks [@pahor167](https://github.com/pahor167)! - Bump `@celo/abis` from `13.0.0-post-audit.0` to `14.0.1` across all consuming
  packages. (14.0.1 is the latest release that still ships the StableToken ABIs
  the kit registers; 15/16 were unpublished and 17.x removed StableToken\*, which
  would require a separate migration.)

## 0.2.2

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

## 0.2.1

### Patch Changes

- Updated dependencies [[`f78f741`](https://github.com/celo-org/developer-tooling/commit/f78f7414b041d64cf7312876aa874c7761eb5f4b)]:
  - @celo/base@7.0.4
  - @celo/core@0.0.2

## 0.2.0

### Minor Changes

- [#715](https://github.com/celo-org/developer-tooling/pull/715) [`682adfe`](https://github.com/celo-org/developer-tooling/commit/682adfe3e9f36139634c9619f7bc0b74d768f27f) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Breaking -- removes chains entry point and celoBaklava export

## 0.2.0-alpha.0

### Minor Changes

- [#715](https://github.com/celo-org/developer-tooling/pull/715) [`682adfe`](https://github.com/celo-org/developer-tooling/commit/682adfe3e9f36139634c9619f7bc0b74d768f27f) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Breaking -- removes chains entry point and celoBaklava export

## 0.1.0

### Minor Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds celo-sepolia to chain definitions

- [#689](https://github.com/celo-org/developer-tooling/pull/689) [`493f73c`](https://github.com/celo-org/developer-tooling/commit/493f73c8807696b952dee675bc8f3fb31e6cf070) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Expose a getMultiSigContract helper.

### Patch Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Update viem to version that includes support for celo sepolia

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`e058e0a`](https://github.com/celo-org/developer-tooling/commit/e058e0a5357443ae5c8359443b4bcba955524140) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Support Core Contract Release 13

## 0.1.0-beta.1

### Minor Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds celo-sepolia to chain definitions

- [#689](https://github.com/celo-org/developer-tooling/pull/689) [`493f73c`](https://github.com/celo-org/developer-tooling/commit/493f73c8807696b952dee675bc8f3fb31e6cf070) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Expose a getMultiSigContract helper.

### Patch Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Update viem to version that includes support for celo sepolia

## 0.0.2-cc13.0

### Patch Changes

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`8cf27a1`](https://github.com/celo-org/developer-tooling/commit/8cf27a1bf22342806b917020776a877296a4b71c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Support Core Contract Release 13

## 0.0.1

### Patch Changes

- [#668](https://github.com/celo-org/developer-tooling/pull/668) [`d761662`](https://github.com/celo-org/developer-tooling/commit/d76166240bf558effe3e27c8a4a0027ed2a0788f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Fixes exports/imports

- [#661](https://github.com/celo-org/developer-tooling/pull/661) [`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Use score from score manager

- [#627](https://github.com/celo-org/developer-tooling/pull/627) [`1c4925f`](https://github.com/celo-org/developer-tooling/commit/1c4925f1275bf78323b5eb4822078ac3572eca44) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - "Initial canary build"

- [#652](https://github.com/celo-org/developer-tooling/pull/652) [`584c5ec`](https://github.com/celo-org/developer-tooling/commit/584c5ec440d031e6979a521b0d217be527a42580) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add election contract actions

- Updated dependencies [[`d761662`](https://github.com/celo-org/developer-tooling/commit/d76166240bf558effe3e27c8a4a0027ed2a0788f), [`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6), [`08def3f`](https://github.com/celo-org/developer-tooling/commit/08def3fd8d0fbefed9adff12c0650e23d02a6ab1), [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3), [`1c4925f`](https://github.com/celo-org/developer-tooling/commit/1c4925f1275bf78323b5eb4822078ac3572eca44), [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92)]:
  - @celo/core@0.0.1
  - @celo/base@7.0.3

## 0.0.1-beta.3

### Patch Changes

- [#668](https://github.com/celo-org/developer-tooling/pull/668) [`d761662`](https://github.com/celo-org/developer-tooling/commit/d76166240bf558effe3e27c8a4a0027ed2a0788f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Fixes exports/imports

- Updated dependencies [[`d761662`](https://github.com/celo-org/developer-tooling/commit/d76166240bf558effe3e27c8a4a0027ed2a0788f)]:
  - @celo/core@0.0.1-beta.2

## 0.0.1-beta.2

### Patch Changes

- Updated dependencies [[`08def3f`](https://github.com/celo-org/developer-tooling/commit/08def3fd8d0fbefed9adff12c0650e23d02a6ab1)]:
  - @celo/core@0.0.1-beta.1

## 0.0.1-beta.1

### Patch Changes

- [#661](https://github.com/celo-org/developer-tooling/pull/661) [`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Use score from score manager

- [#652](https://github.com/celo-org/developer-tooling/pull/652) [`584c5ec`](https://github.com/celo-org/developer-tooling/commit/584c5ec440d031e6979a521b0d217be527a42580) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add election contract actions

## 0.0.1-beta.0

### Patch Changes

- [#627](https://github.com/celo-org/developer-tooling/pull/627) [`1c4925f`](https://github.com/celo-org/developer-tooling/commit/1c4925f1275bf78323b5eb4822078ac3572eca44) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - "Initial canary build"

- Updated dependencies [[`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6), [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3), [`1c4925f`](https://github.com/celo-org/developer-tooling/commit/1c4925f1275bf78323b5eb4822078ac3572eca44), [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92)]:
  - @celo/base@7.0.3-beta.0
  - @celo/core@0.0.1-beta.0
