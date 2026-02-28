# Draft: Fix Typed Overloads — Properly

## The Problem (Root Cause)

The typed proxyCall/proxySend overloads DO work for concrete classes. But two escape hatches defeat them:

1. **createViemTxObject Overload 2** (`ViemContract<Abi>` + `string`): Any typed contract matches `ViemContract<Abi>`, so typos in direct createViemTxObject calls aren't caught.
2. **Generic intermediate classes** (Erc20Wrapper, CeloTokenWrapper): TypeScript can't evaluate `ContractFunctionName<TAbi>` for unresolved generics, so the typed overload doesn't match. Previous attempts used `as unknown as ViemContract` casts — absolutely unacceptable.

## The Solution (Oracle-verified)

### Key Insight: ViemContract Covariance

ViemContract has only `readonly` properties using TAbi → TAbi is covariant.
`ViemContract<TAbi>` where `TAbi extends Abi` is naturally assignable to `ViemContract<readonly unknown[]>` — NO CAST NEEDED.

**Verified** with a type-level test in the project. Zero errors.

### Architecture

**Two separate function pairs:**

1. **`proxyCall` / `proxySend`** — OVERLOADED. Typed overloads check function names against concrete ABIs. Untyped overloads (mutable AbiItem[]) for dynamic callers. Used by ALL concrete wrapper classes.

2. **`proxyCallGeneric` / `proxySendGeneric`** — NOT overloaded. Accept `ViemContract<readonly unknown[]>` + `string`. Used ONLY by generic intermediate classes (Erc20Wrapper, CeloTokenWrapper).

**Why this isn't an escape hatch**: TypeScript overloads fall through within a single function. They can't fall through to a DIFFERENT function. If a concrete class uses `proxyCall(contract, 'typo')`, the typed overload fails, the untyped fails (readonly vs mutable), compile error. It can't "fall through" to `proxyCallGeneric` because that's a different function.

### Direct createViemTxObject Calls

147 direct calls across wrappers + 39 in CLI/governance.

**Wrapper calls (147)**: Must be migrated to proxyCall/proxySend. Two patterns:
- `.call()` read pattern → private `_method = proxyCall(this.contract, 'method', ...)` property  
- `toTransactionObject()` write pattern → private `_method = proxySend(this.connection, this.contract, 'method', ...)` property

**CLI/governance calls (39)**: Use untyped contracts (dynamic). Keep createViemTxObject with ONLY the untyped overload.

### createViemTxObject Overloads (After)

1. **Overload 1 (fully typed)**: `ViemContract<TAbi extends Abi>` + `ContractFunctionName<TAbi>` + strict args — for any caller that has fully typed everything
2. **Overload 2 (untyped)**: `ViemContract` (mutable AbiItem[]) + `string` — for CLI/ProposalBuilder/dynamic

Overload 2 (the old `ViemContract<Abi>` + `string` escape hatch) is REMOVED.

### Internal Implementation

One non-exported `createViemTxObjectInternal` function that accepts `ViemContract<readonly unknown[]>` + `string`. Called by proxyCallGeneric, proxySendGeneric, and the implementations of proxyCall/proxySend. Contains the ONE unavoidable cast deep inside (`contract.abi as AbiItem[]` for viem's encodeFunctionData).

## Scope

### Files to modify
- `packages/sdk/connect/src/viem-tx-object.ts` — createViemTxObject overloads + internal
- `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — proxyCall/proxySend + new generic variants
- `packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts` — use proxyCallGeneric/proxySendGeneric
- `packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts` — use proxyCallGeneric/proxySendGeneric
- `packages/sdk/contractkit/src/wrappers/Accounts.ts` — migrate 15 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/Election.ts` — migrate 26 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/Governance.ts` — migrate 14 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/Validators.ts` — migrate 18 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/SortedOracles.ts` — migrate 11 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/ReleaseGold.ts` — migrate 10 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/MultiSig.ts` — migrate 10 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/LockedGold.ts` — migrate 7 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/Attestations.ts` — migrate 4 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/EpochRewards.ts` — migrate 2 createViemTxObject → proxyCall/proxySend
- `packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts` — migrate 2 createViemTxObject → proxyCall/proxySend

### DO NOT modify
- `packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts` — uses inline ABI, out of scope
- `packages/cli/` — uses untyped contracts, keeps createViemTxObject untyped overload
- `packages/sdk/governance/` — uses untyped contracts, same
- Test files — they'll continue working if the source is correct

## Decisions Confirmed
- `proxyCallGeneric` approach (Oracle-verified, covariance-tested)
- Migrate ALL 147 wrapper createViemTxObject calls to proxyCall/proxySend
- Remove createViemTxObject escape hatch overload
- ONE internal cast (`contract.abi as AbiItem[]`) deep inside non-exported createViemTxObjectInternal
- No public API changes
