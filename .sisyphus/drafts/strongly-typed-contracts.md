# Draft: Strongly-Typed Contract Methods Refactor

## Requirements (confirmed)
- Replace string-based `proxyCall(contract, 'isAccount')` with compile-time typed contract calls
- Leverage viem's type inference from const-typed ABIs (`@celo/abis`)
- Affects all 36 contractkit wrappers (273 proxyCall/proxySend calls + ~20 createViemTxObject)
- Goal: method name typos, wrong arg types, wrong return types → caught at compile time

## User Decisions
- **Value transformation**: Drop parsers, use viem native types (bigint, boolean, address)
- **Migration strategy**: Big bang — rewrite all 36 wrappers + infrastructure at once
- **Public API**: Internal only — keep public API types identical, no breaking change for consumers

## Explore Agent Findings (273 call sites)

### Call counts per wrapper (top 10):
- ReleaseGold.ts: 36 calls
- Governance.ts: 32 calls
- Validators.ts: 23 calls
- Accounts.ts: 21 calls (+11 direct createViemTxObject)
- EpochManager.ts: 20 calls
- Election.ts: ~18 calls
- LockedGold.ts: ~15 calls
- MultiSig.ts: ~12 calls
- SortedOracles.ts: ~10 calls
- Reserve.ts: ~10 calls

### Pattern breakdown:
- ~150 simple proxyCall (no parsers)
- ~30 proxyCall with output parser (valueToInt, valueToBigNumber, etc.)
- ~20 proxyCall with input parser (tupleParser)
- ~15 simple proxySend
- ~20 direct createViemTxObject calls

### Type info loss points:
1. `ContractABIs: Record<string, readonly any[]>` — loses per-contract ABI narrowing
2. `getViemContract(abi as AbiItem[], address)` — casts away const typing
3. `ViemContract.abi: AbiItem[]` — generic array, not const tuple
4. `proxyCall(contract, 'functionName': string)` — string, not literal

## Librarian Findings
- (awaiting)

## Scope Boundaries
- INCLUDE: all 36 wrappers in contractkit, BaseWrapper, ViemContract, proxyCall/proxySend, createViemTxObject, contract-factory-cache
- EXCLUDE: RpcContract (legacy), CLI code, @celo/actions, @celo/core
