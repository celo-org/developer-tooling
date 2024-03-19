---
'@celo/contractkit': major
'@celo/celocli': major
'@celo/connect': patch
'@celo/utils': patch
'@celo/base': patch
---

The following changes are related to adding support for more fee currencies in the @celo packages.

(BREAKING): @celo/contractkit `setFeeCurrency` changed to accept an address instead of previously accepting a StableToken
(BREAKING): @celo/celocli `--gasCurrency` changed to accept only whitelisted addresses instead of previously accepting a StableToken or 'auto'

(ADDED): @celo/celocli `celocli network:whitelist` prints the whitelisted feeCurrencies

(CHANGED): @celo/base, @celo/connect, @celo/contractkit - all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places

(CHANGED): @celo/contractkit reinforced the types of most contract wrappers to use `StrongAddress` where appropriate
