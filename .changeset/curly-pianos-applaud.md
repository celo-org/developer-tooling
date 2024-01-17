---
'@celo/contractkit': patch
---

Re-removes MetaTransaction wallets, as previously removed in 6.0.0 (9ab9d00eb).

Remove support for deprecated `MetaTransactionWallet` and `MetaTransactionWalletDeployer`. If absolutely needed the contracts can be accessed directly or an alternative such as account abstraction should be used.