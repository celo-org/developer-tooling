---
'@celo/connect': major
'@celo/contractkit': major
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

**Breaking changes in @celo/contractkit**

- `kit.sendTransaction()` now returns `Promise<\`0x${string}\`>` (the transaction hash) instead of a `TransactionResult`; use `kit.connection.viemClient.waitForTransactionReceipt({ hash })` to wait for inclusion
- Removed the deprecated `kit.web3` shim — use `kit.connection.viemClient` (reads) and wrapper methods (writes)
- Removed `kit.isListening()` and `kit.isSyncing()` — use `kit.connection.isListening()` / `kit.connection.isSyncing()`
- Removed the deprecated `kit.gasPriceSuggestionMultiplier` property
- Removed the `CeloToken` type re-export — use `CeloTokenContract`
