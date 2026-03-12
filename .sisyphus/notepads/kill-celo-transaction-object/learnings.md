# Learnings — Kill CeloTransactionObject

## 2026-02-28 Wave 1-2 (Tasks 1-7) Findings
- `sendTx` on BaseWrapper uses `this.encodeFunctionData()` + `this.connection.sendTransaction()` + `result.getHash()`. The `as \`0x${string}\`` cast on getHash() is safe — tx hashes are always hex strings.
- `encodeFunctionData` on BaseWrapper (public method) is aliased from viem: `import { encodeFunctionData as viemEncodeFunctionData } from 'viem'` to avoid naming conflict with the class method.
- `coerceArgsForAbi` imported into BaseWrapper from `@celo/connect/lib/viem-abi-coder` — handles web3→viem type coercion (booleans, bytesN padding, etc).
- `connection.callContract()` added to Connection class — takes (contract: ContractRef, functionName: string, args: unknown[]), does encode + viemClient.call() + decodeFunctionResult(). Replaces createViemTxObject(...).call() pattern.
- MultiSig.submitOrConfirmTransaction changed from accepting CeloTxObject<unknown> to accepting encodedData: string (pre-encoded calldata). Same for submitTransaction and getTransactionDataByContent.
- SortedOracles.report() special case: the old pattern was toTransactionObject(this.connection, txo.txo, { from: oracleAddress }) to inject default params. New pattern: this.sendTx('report', [...args], { from: oracleAddress }) — txParams carries the from.
- Private helper methods eliminated: _report, _removeExpiredReports (SortedOracles), _revoke (Attestations), _registerAttestation (FederatedAttestations), _confirmTransaction, _submitTransaction (MultiSig) — all replaced by direct this.sendTx() calls.
- EpochManager convenience methods changed return types from Promise<CeloTransactionObject<void>> to Promise<`0x${string}`> and now pass txParams through.
- FeeHandler had no @celo/connect import initially — needed to add CeloTx import.
- Erc20Wrapper/CeloTokenWrapper: buildTxUnchecked → sendTxUnchecked, removed `as CeloTransactionObject<void>` casts.
- Standard pattern: `freeze = (target: string, txParams?: Omit<CeloTx, 'data'>) => this.sendTx('freeze', [target], txParams)`

## ProposalBuilder + proxy.ts Migration (Task 7)

- `setImplementationOnProxy` in proxy.ts simplified: removed `connection` param, now returns `string` (encoded calldata) instead of `CeloTxObject`
- `coerceArgsForAbi` takes `abiInputs: readonly AbiInput[]` (not the full AbiItem), so use `abiItem.inputs`
- `coerceArgsForAbi` is NOT re-exported from `@celo/connect` index — must import from `@celo/connect/lib/viem-abi-coder`
- `wrapper.contract` is protected in BaseWrapperForGoverning — tests must use `governanceABI` from `@celo/abis` directly instead
- `addTx` method was completely removed (it depended on `CeloTransactionObject`)
- `fromWeb3tx` → `fromEncodedTx`, `addWeb3Tx` → `addEncodedTx` — accepts `string` (hex data) instead of `CeloTxObject`
- `buildCallToCoreContract` now uses `encodeFunctionData` with `coerceArgsForAbi` for type coercion
- The `approve(uint256,uint256)` encoded as `0x5d35a3d9` + `(125, 56)` = `0x7d` and `0x38`
