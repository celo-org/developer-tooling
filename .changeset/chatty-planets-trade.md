---
'@celo/contractkit': major
---

The following changes are related to adding support for more fee currencies in the @celo packages.

(BREAKING): `setFeeCurrency` changed to accept an address instead of previously accepting a StableToken
(CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places
(CHANGED): reinforced the types of most contract wrappers to use `StrongAddress` where appropriate
