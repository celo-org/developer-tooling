---
'@celo/governance': patch
'@celo/celocli': patch
---

Fix `governance:propose` output:
- ProposalBuilder logged `undefined is a proxy, repointing to ...` for proxy
  repoint transactions that identify the target by `contract` instead of
  `address`; log the actual proxy id (`address` or `contract`).
- `governance:propose` now decodes and prints the `ProposalQueued` event so the
  newly created proposal id is shown in the command output.
