# Learnings

## 2026-02-27 Plan Completion

### Key Finding: Work Already Completed
- All 12 implementation tasks were completed by the PREVIOUS plans:
  - `strongly-typed-contracts` (14 tasks) — built the generic ViemContract, typed proxyCall/proxySend, migrated all wrappers
  - `remove-rpc-contract-promievent` (21 tasks) — replaced ViemContract with ContractLike/ContractRef, added proxyCallGeneric/proxySendGeneric
- The `typed-overload-fix` plan was written based on UNCOMMITTED changes that were subsequently completed and committed
- Result: only verification (Task 12 + Final Wave F1-F4) needed to be executed

### Type Safety Architecture (Final State)
- `createViemTxObject` has exactly 2 public overloads: typed (ContractRef + Abi + ContractFunctionName) and untyped (ContractRef + string)
- `createViemTxObjectInternal` is the @internal helper used by proxyCallGenericImpl/proxySendGenericImpl
- `proxyCall`/`proxySend` have typed overloads (ContractLike<TAbi extends Abi>) and untyped overloads (ContractLike<AbiItem[]>)
- `proxyCallGeneric`/`proxySendGeneric` are SEPARATE non-overloaded functions for generic intermediate classes
- Erc20Wrapper/CeloTokenWrapper use proxyCallGeneric/proxySendGeneric — zero casts
- All concrete wrapper classes use proxyCall/proxySend — method name typos caught at compile time

### Verification Results
- contractkit tsc --noEmit: 0 errors
- CLI tsc --noEmit: 0 errors
- governance tsc --noEmit: 0 errors
- All 258 contractkit tests pass (22/22 suites)
- Lint: 14 warnings (pre-existing), 0 errors
- Type safety proved on: Accounts, Election, Validators, LockedGold
