---
'@celo/governance': patch
'@celo/actions': patch
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
- `lockedcelo:withdraw` (and `releasecelo:locked-gold` withdraw) no longer spin
  in an infinite loop when no pending withdrawal is available, and re-fetch
  between withdrawals to avoid stale indices.
