---
'@celo/governance': patch
'@celo/actions': patch
'@celo/dev-utils': patch
'@celo/explorer': patch
'@celo/celocli': patch
---

Fix several `governance`/`celocli` command output & safety issues:
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
