---
'@celo/celocli': major
---

The following changes are related to adding support for more fee currencies in the @celo packages.

(BREAKING): global flag `--gasCurrency` changed to accept only whitelisted addresses instead of previously accepting a StableToken or 'auto'
(BREAKING): `config:set --gasCurrency` is now ignored and not saved to a default config and prints a warning instead
(ADDED): `celocli network:whitelist` prints the whitelisted feeCurrencies
