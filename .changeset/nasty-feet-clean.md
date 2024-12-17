---
'@celo/wallet-ledger': major
---

Interfaces for newLedgerWalletWithSetup and LedgerWallet constructor have changed.

`newLedgerWalletWithSetup` replaced positional arguments for named arguments and added changeIndexes

```diff
  newLedgerWalletWithSetup(
    transport: any,
-    derivationPathIndexes?: number[],
-    baseDerivationPath?: string,
-    ledgerAddressValidation?: AddressValidation,
-    isCel2?: boolean
+    options: LedgerWalletSetup
  )

+ interface LedgerWalletSetup {
+   derivationPathIndexes?: number[]
+   changeIndexes?: number[]
+   baseDerivationPath?: string
+   ledgerAddressValidation?: AddressValidation
+   isCel2?: boolean
+ }

```

`new LedgerWallet` moved transport to first position and added changeIndexes in 4th


```diff
new LedgerWallet(
+    transport,
    derivationPathIndexes,
    baseDerivationPath,
-    transport,
+    changeIndexes,
    ledgerAddressValidation,
    isCel2
  )
```