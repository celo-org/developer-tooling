---
'@celo/wallet-local': major
'@celo/wallet-base': major
'@celo/connect': major
---

Remove support for celo-legacy and cip42 transaction serialization and signing. These were the transaction types that supported gatewayFee. Transactions that specify feeCurrency and gasPrice togther will now throw. Users should migrate these to either ethereum type 0, eip1559 and cip64 style transactions depending on their need.
