---
'@celo/connect': major
'@celo/contractkit': minor
'@celo/celocli': minor
'@celo/dev-utils': minor
---

**Remove rpc-contract.ts, PromiEvent, and legacy Contract interface from @celo/connect**

- Deleted `rpc-contract.ts`, `promi-event.ts`, and `viem-contract.ts` — replaced with native viem `getContract()` / `GetContractReturnType`
- `CeloTxObject.send()` now returns `Promise<string>` (tx hash) instead of `PromiEvent<CeloTxReceipt>`
- Removed `Connection.createContract()` — use `Connection.getCeloContract()` instead
- Removed `PromiEvent<T>` and `Contract` interfaces from types
- `Connection.getViemContract()` deprecated — delegates to `getCeloContract()`
- `ViemContract<TAbi>` deprecated — use `CeloContract<TAbi>` (viem's `GetContractReturnType`)
- Contract deployment rewritten to use viem's `encodeDeployData` + `connection.sendTransaction()`
- All contractkit wrappers, CLI commands, and test files updated
