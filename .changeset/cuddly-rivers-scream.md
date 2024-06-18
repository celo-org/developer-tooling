---
'@celo/wallet-local': minor
'@celo/wallet-base': minor
'@celo/contractkit': minor
'@celo/connect': minor
---

Add support for serializing, sending, parsing and deserializing cip66 transactions. This tx type is preffered over cip64 when paying for gas with tokens. Like eip1559 maxFeePerGass and maxPriorityFeePerGas are denominated in CELO. To create an cip66 transaction with Contractkit call the `kit.populateMaxFeeInToken` method with your transaction and then send it.
