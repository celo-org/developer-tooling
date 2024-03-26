---
'@celo/connect': patch
---

The following changes are related to adding support for more fee currencies in the @celo packages.

(CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places
