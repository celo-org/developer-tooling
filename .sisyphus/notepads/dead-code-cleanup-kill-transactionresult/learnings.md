
## Task 1: Remove 5 Dead Methods from Connection Class - COMPLETED

### Summary
Successfully removed 5 dead methods from `packages/sdk/connect/src/connection.ts`:
1. `handleRevert` constructor parameter (lines 81-87)
2. `sendSignedTransaction()` method (lines 419-443)
3. `coinbase()` method (lines 552-556)
4. `getBlockHeader()` method (lines 596-606)
5. `getViemContract()` method with JSDoc (lines 660-670)

### Imports Cleaned
- Removed `BlockHeader` import from `./types` (line 30)
- Removed `outputBlockHeaderFormatter` import from `./utils/formatter` (line 47)
- Both were ONLY used in the deleted `getBlockHeader()` method

### Stale Build Artifacts Removed
- `packages/sdk/connect/lib/utils/celo-transaction-object.d.ts.map`
- `packages/sdk/connect/lib/utils/celo-transaction-object.js.map`
- `packages/sdk/connect/lib/viem-tx-object.d.ts.map`
- `packages/sdk/connect/lib/viem-tx-object.js.map`

### Build Verification
- ✅ `yarn workspace @celo/connect run build` passed
- ✅ `yarn build` (full monorepo) passed with exit code 0
- All 25+ packages built successfully in topological order

### Key Observations
- The `handleRevert` parameter was a web3-specific feature that had been void'd since web3 removal
- `sendSignedTransaction` was an alternative construction site for TransactionResult but had zero callers
- The removal was clean with no cascading dependencies
- Constructor signature simplified from 3 params to 2 params
- Total lines removed: ~60 lines of dead code

### Next Steps
- Task 2: Remove `sendTransaction()` and `sendTransactionViaProvider()` methods (these ARE actively used but will be replaced)
- Task 3: Remove `TransactionResult` and `toTxResult` imports and usage


## Task 2: Eliminate TransactionResult

- `@celo/dev-utils` (chain-setup.ts, contracts.ts) also consumed `TransactionResult` via `result.getHash()` and `txResult.waitReceipt()` — not listed in task spec but caught by full monorepo build
- `contracts.ts` needed `conn.viemClient.waitForTransactionReceipt()` because it needs the receipt to get `contractAddress` from deployment
- `chain-setup.ts` only needed the hash (already had `conn.getTransactionReceipt()` call after), so direct hash assignment sufficed
- When replacing range edits in BaseWrapper, the original line at the start of the range was preserved causing duplicate `const data` declarations — need to be careful with range boundaries
- `sendTransactionViaProvider` changed from sync (returning TransactionResult) to async (returning Promise<hash>) — test mocks needed `.mockResolvedValue()` instead of `.mockReturnValue()`