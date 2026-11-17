---
'@celo/wallet-ledger': patch
'@celo/viem-account-ledger': patch
'@celo/celocli': patch
---

Fix `--ledgerLiveMode` so it iterates BIP-44 hardened account indexes (`m/44'/60'/N'/0/0`) instead of the change index. `LedgerWallet`, `newLedgerWalletWithSetup`, `deriveLedgerAccounts`, and `ledgerToWalletClient` now accept `accountIndexes`.
