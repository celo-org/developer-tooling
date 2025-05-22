---
'@celo/celocli': major
---

Now defaults to using "m/44'/60'/0'" as base derivation path for account:new and any command using --useLedger. use celocli config:set --derivationPath celoLegacy for old behavior.
