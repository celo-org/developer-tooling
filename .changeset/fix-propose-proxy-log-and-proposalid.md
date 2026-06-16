---
'@celo/governance': patch
'@celo/celocli': patch
---

Fix several `governance`/`celocli` command output & safety issues:
- `governance:propose` logged `undefined is a proxy, repointing to ...` for
  core-contract proxy repoints (logged `tx.address` which is undefined when the
  tx is keyed by `contract`); now logs the real proxy id.
- `governance:propose` now surfaces the new proposal id (`ProposalQueued`), and
  the `--useMultiSig` path surfaces the multisig `Submission` transaction id.
- `governance:execute` now checks the proposal is approved before sending, so it
  fails the precondition cleanly instead of reverting with "Proposal not approved".
- `governance:upvote`/`revokeupvote`/`votePartially` and `multisig:approve` now
  decode and print their on-chain events (proposal id / transaction id).
- `lockedcelo:withdraw` (and `releasecelo:locked-gold` withdraw) no longer spin
  in an infinite loop when no pending withdrawal is available, and re-fetch
  between withdrawals to avoid stale indices.
