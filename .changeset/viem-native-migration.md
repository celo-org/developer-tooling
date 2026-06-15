---
'@celo/connect': minor
'@celo/contractkit': minor
'@celo/explorer': minor
---

**Migrate internal contract interaction from the web3-style RPC Contract to viem-native `getContract()`**

- `@celo/connect` exposes `CeloContract<TAbi>` (viem's `GetContractReturnType`) and `Connection.getCeloContract()` for type-safe `.read`/`.write`/`.estimateGas` access.
- All 36 ContractKit wrappers now call the viem contract namespaces directly.
- `@celo/explorer`: `BlockExplorer.tryParseTx` now accepts viem's `Transaction`, and `getBlockByHash`/`getBlockByNumber` return viem block shapes. This is a breaking change for direct callers of these methods (hence the minor bump).
- CLI commands and dev-utils updated to the new API.
