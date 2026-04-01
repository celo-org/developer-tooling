---
'@celo/connect': minor
'@celo/contractkit': minor
'@celo/explorer': patch
---

**Migrate internal contract interaction from web3-style RPC Contract to viem-native ViemContract**

- Added `ViemContract` type and `createViemTxObject()` function in `@celo/connect`
- Added `Connection.getViemContract()` factory method
- Updated all 36 ContractKit wrappers to use viem-native contract interaction
- Updated `proxyCall`/`proxySend` to accept `ViemContract` + function name strings
- Migrated CLI commands, dev-utils, and explorer to use new API
- Deprecated `Connection.createContract()` (kept for backward compatibility with `.deploy()`)
- Public API unchanged: `CeloTransactionObject`, wrapper method signatures remain the same
