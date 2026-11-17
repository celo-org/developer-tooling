---
'@celo/contractkit': patch
---

Reduce the RPC load of MultiSigWrapper reads.

- `getConfirmations` uses the contract's `getConfirmations` view instead of one
  `confirmations` read per owner.
- `getTransactionDataByContent` scans transactions newest-first in small batches and
  stops at the first match, instead of fetching the multisig's entire history in one
  burst (268 parallel requests on the mainnet approver multisig, enough to get
  rate-limited). When several transactions share the same content, the most recent
  one is now returned.
