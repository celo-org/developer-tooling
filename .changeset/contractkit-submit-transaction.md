---
'@celo/contractkit': patch
---

Add `submitTransaction` method to `MultiSigWrapper` to submit transactions to multisig without automatic confirmation. This complements the existing `submitOrConfirmTransaction` method by providing more granular control over the submission process.
