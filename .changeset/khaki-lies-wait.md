---
'@celo/celocli': major
---

The following changes are related to adding support for more fee currencies in the @celo packages.

(BREAKING): `--gasCurrency` changed to accept only whitelisted addresses or the string `CELO` instead of previously accepting a StableToken or 'auto'
(ADDED): `celocli network:whitelist` prints the whitelisted feeCurrencies
(ADDED): the cli will automagically convert the previous gasCurrency such as cEUR, cUSD, cREAL, CELO into its address if necessary
