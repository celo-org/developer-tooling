# Learnings

## Session Continuity
- Waves 1-2 committed. Wave 3 partially done (4 of 8 files).
- Parallel execution caused data loss — run Wave 3 remaining SEQUENTIALLY.

## buildTx Pattern
- `buildTx('functionName', [args])` — typed, for concrete wrappers
- `buildTxUnchecked('functionName', [args])` — untyped string, for generic Erc20Wrapper/CeloTokenWrapper
- Args passed raw — `coerceArgsForAbi` handles type coercion internally
- `as CeloTransactionObject<void>` cast needed when explicit type annotation exists

## FeeHandler Special Pattern
- 3 methods (handle, sell, distribute) create local proxySend inside async body
- Replace with direct `return this.buildTx('handle', [tokenAddress])`
- Remove `async` keyword and `Promise<>` wrapper since buildTx is synchronous

## EpochManager
- `finishNextEpochProcess` takes (groups: string[], lessers: string[], greaters: string[])
- `processGroups` takes (groups: string[], lessers: string[], greaters: string[])
- All ABI names match wrapper names (no mismatches)

## Erc20Wrapper/CeloTokenWrapper
- MUST use `buildTxUnchecked` (not `buildTx`) because TAbi is unresolved generic
- `buildTxUnchecked` returns `CeloTransactionObject<unknown>` — explicit type annotations handle narrowing
- Keep `proxyCallGeneric` import (still used by .read methods)
