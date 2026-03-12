# Strongly-Typed Contract Methods Refactor

## TL;DR

> **Quick Summary**: Replace all string-based `proxyCall(contract, 'methodName')` calls across contractkit wrappers with compile-time typed contract methods, leveraging viem's type inference from `@celo/abis` const-typed ABIs. Method name typos, wrong arg types, and wrong return types will be caught at compile time.
> 
> **Deliverables**:
> - Generic `ViemContract<TAbi>` interface in `@celo/connect`
> - Typed `proxyCall`/`proxySend`/`createViemTxObject` overloads that constrain method names to actual ABI functions
> - Typed ABI map preserving per-contract const types (replacing `Record<string, readonly any[]>`)
> - All 24 wrapper files migrated to use typed call sites
> - All existing tests passing, build passing, public API unchanged
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: Task 1 (ViemContract generic) → Task 2 (typed proxyCall) → Task 3 (typed ABI map) → Task 5 (pilot wrapper) → Task 6-11 (bulk migration) → Task 12 (verification)

---

## Context

### Original Request
User asked: "I need strongly typed methods on contract in Account.ts and others... create a plan (it will be a huge refactor)" — to replace the untyped `proxyCall(contract, 'isAccount')` pattern with viem's compile-time type inference from const-typed ABIs.

### Interview Summary
**Key Discussions**:
- **Value transformation**: User decided to "drop parsers, use viem native" — use bigint, boolean, address natively instead of `valueToBigNumber`, `valueToString`, etc. However, parser functions must remain exported (CLI imports them).
- **Migration strategy**: User chose "big bang" — all 24 wrappers migrated in one PR, structured as reviewable waves.
- **Public API**: "Internal only" — keep all public return types identical (`Promise<StrongAddress>`, `Promise<boolean>`, `CeloTransactionObject<void>`, etc.), no breaking changes for consumers.

**Research Findings**:
- Viem provides `ContractFunctionName<TAbi, 'view'|'nonpayable'>`, `ContractFunctionArgs<TAbi, mutability, functionName>`, `ContractFunctionReturnType<TAbi, mutability, functionName>` for compile-time type safety
- `@celo/abis` already exports const-typed ABIs (Governance: 2084 lines, Accounts: 1625 lines) — the types exist, they're just erased in the pipeline
- Type erasure happens at 4 points: `ContractABIs` record type, `getViemContract` cast, `ViemContract.abi` field, `proxyCall` string parameter

### Metis Review
**Identified Gaps** (addressed):
- **Call site count correction**: Actual total is 273 proxyCall/proxySend + **156** createViemTxObject in wrappers (not ~20 as initially estimated). Plan accounts for all 429 call sites.
- **TypeScript compilation time risk**: Large ABI types × viem's deep conditional utility types could blow up `tsc` time. Plan includes mandatory benchmarking after pilot wrapper.
- **Backward compatibility**: `ViemContract<TAbi>` must use default type parameter (`TAbi = AbiItem[]`) to avoid breaking downstream code. Untyped overloads must remain.
- **Scope boundary enforcement**: CLI (52 createViemTxObject calls), governance ProposalBuilder (dynamic method names), DKG (JSON-loaded ABIs), AbstractFeeCurrencyWrapper (inline ABI) are all OUT of scope.
- **Parser preservation**: Parser functions (`valueToBigNumber`, `tupleParser`, `solidityBytesToString`, etc.) must stay exported from BaseWrapper — CLI depends on them. They can be deprecated internally but not removed.

---

## Work Objectives

### Core Objective
Add compile-time type safety to all contractkit wrapper contract calls by making the existing `proxyCall`/`proxySend`/`createViemTxObject` functions generic over the contract's ABI type, so TypeScript catches method name typos, wrong argument types, and wrong return types at build time.

### Concrete Deliverables
- `ViemContract<TAbi>` generic interface in `packages/sdk/connect/src/viem-contract.ts`
- Typed overloads for `createViemTxObject` in `packages/sdk/connect/src/viem-tx-object.ts`
- Typed ABI map (`ContractABIMap`) in `packages/sdk/contractkit/src/contract-factory-cache.ts`
- Typed `proxyCall`/`proxySend` overloads in `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
- Generic `BaseWrapper<TAbi>` base class
- All 24 wrapper files updated to use typed call sites
- All tests passing, build passing, lint passing

### Definition of Done
- [x] `yarn workspace @celo/connect run build` passes
- [x] `yarn workspace @celo/contractkit run build` passes
- [x] `yarn workspace @celo/celocli run build` passes (downstream consumer)
- [x] `yarn workspace @celo/governance run build` passes (downstream consumer)
- [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` passes
- [x] `yarn lint && yarn fmt:diff` passes
- [x] `tsc --noEmit` time for contractkit ≤ 2x pre-migration baseline
- [x] Intentional method name typo in wrapper → tsc error (type safety proven)

### Must Have
- All `proxyCall` and `proxySend` calls in wrappers constrained by ABI type
- All `createViemTxObject` calls in wrappers constrained by ABI type
- Default type parameter on `ViemContract` for backward compatibility
- Untyped overloads preserved for dynamic usage (ProposalBuilder, CLI)
- Parser functions remain exported from BaseWrapper
- Zero public API signature changes

### Must NOT Have (Guardrails)
- **NO changes to CLI files** (`packages/cli/`) — out of scope
- **NO changes to governance ProposalBuilder** (`proposal-builder.ts`) — uses dynamic method names
- **NO changes to DKG commands** — JSON-loaded ABIs, no const typing possible
- **NO changes to `AbstractFeeCurrencyWrapper`** inline `MINIMAL_TOKEN_INFO_ABI` — not from `@celo/abis`, leave untyped
- **NO changes to `@celo/abis` package** — ABIs already const-typed
- **NO removal of parser functions** (`valueToBigNumber`, `tupleParser`, `solidityBytesToString`, etc.)
- **NO removal of untyped function signatures** — they must remain as overloads
- **NO changes to public API return types** (`Promise<BigNumber>`, `CeloTransactionObject<void>`, etc.)
- **NO `as any` type assertions in wrapper call sites** (the whole point is removing these)
- **NO unnecessary abstraction layers** — keep approach (A): make existing functions generic, don't introduce new patterns

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Jest for contractkit, Vitest for modern packages)
- **Automated tests**: Tests-after (verify existing tests pass after migration; add type-safety verification test)
- **Framework**: Jest (contractkit uses Jest)
- **Anvil**: Required — `RUN_ANVIL_TESTS=true`

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Type safety**: Use `tsc --noEmit` to verify compile-time errors appear for typos
- **Build**: Use `yarn workspace <pkg> run build` for each affected package
- **Tests**: Use `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
- **Lint**: Use `yarn lint && yarn fmt:diff`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — infrastructure in @celo/connect):
├── Task 1: Make ViemContract<TAbi> generic [quick]
├── Task 2: Add typed overload to createViemTxObject [quick]
└── Task 3: Benchmark tsc baseline timing [quick]

Wave 2 (After Wave 1 — infrastructure in contractkit):
├── Task 4: Create typed ABI map + update ContractCache [deep]
├── Task 5: Make proxyCall/proxySend/BaseWrapper generic [deep]
└── (Task 3 checkpoint: verify tsc timing acceptable)

Wave 3 (After Wave 2 — pilot wrapper):
└── Task 6: Migrate EpochManager (pilot) + verify types + benchmark tsc [deep]

Wave 4 (After Wave 3 — bulk migration, MAX PARALLEL):
├── Task 7: Migrate simple wrappers batch (Freezer, OdisPayments, ScoreManager, EpochRewards, EpochManagerEnabler, FederatedAttestations, GovernanceSlasher) [unspecified-high]
├── Task 8: Migrate medium wrappers batch (Accounts, SortedOracles, LockedGold, Reserve, Escrow, GoldToken, CeloToken, StableToken, Erc20) [unspecified-high]
├── Task 9: Migrate complex wrappers batch (Validators, Election, MultiSig, Attestations, FeeHandler) [deep]
├── Task 10: Migrate ReleaseGold (largest — 36 call sites) [deep]
└── Task 11: Migrate Governance (32 call sites, complex struct transforms) [deep]

Wave 5 (After Wave 4 — verification):
├── Task 12: Full build + test + lint verification [unspecified-high]
├── Task 13: Type-safety proof — add intentional-typo compile test [quick]
└── Task 14: Downstream build verification (CLI, governance) [quick]

Wave FINAL (After ALL tasks — independent review):
├── Task F1: Plan compliance audit [oracle]
├── Task F2: Code quality review [unspecified-high]
├── Task F3: Real QA — full test suite + build [unspecified-high]
└── Task F4: Scope fidelity check [deep]

Critical Path: Task 1 → Task 5 → Task 6 → Tasks 7-11 → Task 12 → F1-F4
Parallel Speedup: ~50% faster than sequential (Waves 1, 4 are parallel)
Max Concurrent: 5 (Wave 4)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 2, 4, 5 | 1 |
| 2 | 1 | 5, 6-11 | 1 |
| 3 | — | 6 | 1 |
| 4 | 1 | 5, 6-11 | 2 |
| 5 | 1, 2, 4 | 6-11 | 2 |
| 6 | 3, 5 | 7-11 | 3 |
| 7 | 5, 6 | 12 | 4 |
| 8 | 5, 6 | 12 | 4 |
| 9 | 5, 6 | 12 | 4 |
| 10 | 5, 6 | 12 | 4 |
| 11 | 5, 6 | 12 | 4 |
| 12 | 7-11 | 13, 14 | 5 |
| 13 | 12 | F1-F4 | 5 |
| 14 | 12 | F1-F4 | 5 |
| F1-F4 | 12-14 | — | FINAL |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1 → `quick`, T2 → `quick`, T3 → `quick`
- **Wave 2**: 2 tasks — T4 → `deep`, T5 → `deep`
- **Wave 3**: 1 task — T6 → `deep`
- **Wave 4**: 5 tasks — T7 → `unspecified-high`, T8 → `unspecified-high`, T9 → `deep`, T10 → `deep`, T11 → `deep`
- **Wave 5**: 3 tasks — T12 → `unspecified-high`, T13 → `quick`, T14 → `quick`
- **FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. Make `ViemContract<TAbi>` generic with default type parameter

  **What to do**:
  - In `packages/sdk/connect/src/viem-contract.ts`, change `ViemContract` interface to `ViemContract<TAbi extends readonly unknown[] = AbiItem[]>`
  - Change `readonly abi: AbiItem[]` to `readonly abi: TAbi`
  - Change `readonly address: string` to `readonly address: \`0x${string}\``
  - Update all imports/usages that reference `ViemContract` — use `lsp_find_references` on `ViemContract` to find all sites
  - Ensure the default type parameter means existing code like `const c: ViemContract = ...` still compiles without changes
  - Update `connection.ts` `getViemContract()` method to accept generic ABI type and pass through
  - Verify: `yarn workspace @celo/connect run build` passes

  **Must NOT do**:
  - Do NOT change any downstream wrapper files yet
  - Do NOT remove the `AbiItem[]` default — backward compat requires it
  - Do NOT change `address` to `Address` type from viem (keep `0x${string}`)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-file type change with straightforward generics
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: No UI involved

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 3)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 2, 4, 5
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `packages/sdk/connect/src/viem-contract.ts:1-16` — Current `ViemContract` interface (entire file). This is the ONLY file to modify. Make the interface generic.
  - `packages/sdk/connect/src/connection.ts` — Contains `getViemContract()` method that creates `ViemContract` instances. Must add generic type param.

  **API/Type References**:
  - `packages/sdk/connect/src/abi-types.ts` — `AbiItem` type definition used as default type parameter
  - `node_modules/viem/types/utils.d.ts` — Viem's `Abi` type (extends `readonly unknown[]`), use same constraint pattern

  **External References**:
  - Viem source: https://github.com/wevm/viem — Pattern for generic contract types with `TAbi extends Abi | readonly unknown[]`

  **WHY Each Reference Matters**:
  - `viem-contract.ts` is the single file being changed — the entire 16-line interface definition
  - `connection.ts` creates ViemContract instances via `getViemContract()` — must flow the generic through
  - `abi-types.ts` provides the `AbiItem` type used as the default parameter — must match

  **Acceptance Criteria**:
  - [x] `ViemContract<TAbi>` interface exists with `TAbi extends readonly unknown[] = AbiItem[]`
  - [x] `yarn workspace @celo/connect run build` → exit 0
  - [x] Existing code referencing `ViemContract` (without type param) still compiles

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: ViemContract generic compiles with default
    Tool: Bash
    Preconditions: Task 1 changes applied
    Steps:
      1. Run `yarn workspace @celo/connect run build`
      2. Assert exit code 0
      3. Run `yarn workspace @celo/connect run tsc --noEmit`
      4. Assert exit code 0
    Expected Result: Build succeeds, no type errors
    Failure Indicators: tsc errors mentioning ViemContract, AbiItem, or generic constraints
    Evidence: .sisyphus/evidence/task-1-viem-contract-build.txt

  Scenario: Downstream packages still compile with unparameterized ViemContract
    Tool: Bash
    Preconditions: Task 1 changes applied, @celo/connect built
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0 (existing code uses ViemContract without type param)
    Expected Result: No type errors in contractkit
    Failure Indicators: Errors like 'Generic type ViemContract requires N type arguments'
    Evidence: .sisyphus/evidence/task-1-downstream-compat.txt
  ```

  **Commit**: YES
  - Message: `refactor(connect): make ViemContract generic over ABI type`
  - Files: `packages/sdk/connect/src/viem-contract.ts`, `packages/sdk/connect/src/connection.ts`
  - Pre-commit: `yarn workspace @celo/connect run build`

- [x] 2. Add typed overload to `createViemTxObject`

  **What to do**:
  - In `packages/sdk/connect/src/viem-tx-object.ts`, add a generic typed overload: `createViemTxObject<TAbi extends readonly unknown[], TFunctionName extends ContractFunctionName<TAbi>>(connection, contract: ViemContract<TAbi>, functionName: TFunctionName, args: ContractFunctionArgs<TAbi, 'nonpayable' | 'payable' | 'view' | 'pure', TFunctionName>): CeloTxObject<ContractFunctionReturnType<TAbi, 'nonpayable' | 'payable' | 'view' | 'pure', TFunctionName>>`
  - KEEP the existing untyped signature as a fallback overload: `createViemTxObject<O>(connection: Connection, contract: ViemContract, functionName: string, args: unknown[]): CeloTxObject<O>`
  - The typed overload goes FIRST (TypeScript resolves overloads top-to-bottom)
  - Import viem utility types: `ContractFunctionName`, `ContractFunctionArgs`, `ContractFunctionReturnType` from `viem`
  - The implementation function signature stays unchanged (uses `string` for functionName) — overloads provide the type safety
  - Verify: `yarn workspace @celo/connect run build` passes

  **Must NOT do**:
  - Do NOT remove the untyped signature — CLI and ProposalBuilder need it
  - Do NOT change the runtime behavior — this is types-only
  - Do NOT change the internal implementation of `createViemTxObject`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Adding TypeScript overload signatures to one function, no runtime changes
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 3, after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 5, 6-11
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `packages/sdk/connect/src/viem-tx-object.ts:13-18` — Current `createViemTxObject` signature. Add typed overload BEFORE this.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:286-311` — `proxyCall` overload pattern to follow (multiple overloads, single implementation)

  **API/Type References**:
  - `packages/sdk/connect/src/viem-contract.ts` — `ViemContract<TAbi>` (from Task 1)
  - Viem types: `ContractFunctionName<TAbi, Mutability>`, `ContractFunctionArgs<TAbi, Mutability, FunctionName>`, `ContractFunctionReturnType<TAbi, Mutability, FunctionName>`

  **External References**:
  - Viem utility types: `import { ContractFunctionName, ContractFunctionArgs, ContractFunctionReturnType } from 'viem'`

  **WHY Each Reference Matters**:
  - `viem-tx-object.ts:13-18` is exactly where the overload goes — before the existing signature
  - `BaseWrapper.ts:286-311` shows the project's pattern for overloaded functions — follow the same style
  - Viem utility types provide the compile-time inference — they're the core mechanism

  **Acceptance Criteria**:
  - [x] Typed overload exists in `viem-tx-object.ts`
  - [x] Untyped overload still exists (backward compat)
  - [x] `yarn workspace @celo/connect run build` → exit 0

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: createViemTxObject typed overload builds
    Tool: Bash
    Preconditions: Tasks 1-2 changes applied
    Steps:
      1. Run `yarn workspace @celo/connect run build`
      2. Assert exit code 0
      3. Grep the built declaration file for the typed overload: grep 'ContractFunctionName' packages/sdk/connect/lib/viem-tx-object.d.ts
      4. Assert match found (overload is emitted in declarations)
    Expected Result: Build passes, typed overload present in .d.ts
    Failure Indicators: Build failure or missing overload in declaration file
    Evidence: .sisyphus/evidence/task-2-typed-overload-build.txt

  Scenario: Untyped usage still compiles (backward compat)
    Tool: Bash
    Preconditions: Tasks 1-2 applied, connect built
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0 (all existing createViemTxObject calls still compile)
    Expected Result: Zero type errors from existing createViemTxObject calls
    Failure Indicators: Type errors at createViemTxObject call sites
    Evidence: .sisyphus/evidence/task-2-backward-compat.txt
  ```

  **Commit**: YES (groups with Task 1)
  - Message: `refactor(connect): add typed overload to createViemTxObject`
  - Files: `packages/sdk/connect/src/viem-tx-object.ts`
  - Pre-commit: `yarn workspace @celo/connect run build`

- [x] 3. Benchmark TypeScript compilation baseline

  **What to do**:
  - Run `time yarn workspace @celo/contractkit run tsc --noEmit` three times, record median wall-clock time
  - Save results to `.sisyphus/evidence/task-3-tsc-baseline.txt`
  - This is the BEFORE measurement — will be compared against AFTER in Task 6
  - Also run `time yarn workspace @celo/connect run tsc --noEmit` as a secondary baseline

  **Must NOT do**:
  - Do NOT modify any files
  - Do NOT skip this — compilation time regression is a hard gate

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Just running commands and recording output
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 2)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 6 (provides baseline for comparison)
  - **Blocked By**: None (can start immediately)

  **References**:
  - `packages/sdk/contractkit/tsconfig.json` — TypeScript config for contractkit
  - `packages/sdk/connect/tsconfig.json` — TypeScript config for connect

  **WHY Each Reference Matters**:
  - tsconfig files determine what tsc compiles — we need the baseline for exactly this config

  **Acceptance Criteria**:
  - [x] Baseline timing recorded in `.sisyphus/evidence/task-3-tsc-baseline.txt`
  - [x] At least 3 runs for contractkit, median identified

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Baseline timing captured
    Tool: Bash
    Preconditions: Clean build state
    Steps:
      1. Run `time yarn workspace @celo/contractkit run tsc --noEmit` three times
      2. Record wall-clock time for each run
      3. Calculate median
      4. Save all timings + median to .sisyphus/evidence/task-3-tsc-baseline.txt
    Expected Result: File exists with 3 timing values and a median
    Failure Indicators: File missing or incomplete
    Evidence: .sisyphus/evidence/task-3-tsc-baseline.txt
  ```

  **Commit**: NO


- [x] 4. Create typed ABI map and update ContractCache

  **What to do**:
  - In `packages/sdk/contractkit/src/contract-factory-cache.ts`, create a new typed mapping that preserves per-contract ABI types:
    ```typescript
    // Typed ABI map — preserves const type per contract
    export const TypedContractABIs = {
      [CeloContract.Accounts]: accountsABI,
      [CeloContract.Election]: electionABI,
      [CeloContract.Governance]: governanceABI,
      // ... all contracts
    } as const satisfies Record<string, readonly unknown[]>
    ```
  - Create a utility type that extracts the ABI type for a given contract:
    ```typescript
    export type ContractABI<T extends CeloContract> = typeof TypedContractABIs extends Record<T, infer A> ? A : AbiItem[]
    ```
  - Update `ContractCache.getContract()` to use the typed map. The return type can use an overload pattern or mapped type to return `ViemContract<TypedABI>` for known contracts.
  - The existing `ContractABIs: Record<string, readonly any[]>` can remain for backward compat, but new typed code should use `TypedContractABIs`.
  - Update `WrapperCache` (in `contract-cache.ts` or similar) so that wrapper constructors receive `ViemContract<SpecificABI>` — this may require `as any` casts at the WrapperCache→Wrapper boundary since WrapperCache uses dynamic instantiation.
  - Verify: `yarn workspace @celo/contractkit run tsc --noEmit` passes

  **Must NOT do**:
  - Do NOT change the runtime behavior of contract creation
  - Do NOT change the `CeloContract` enum
  - Do NOT remove the untyped `ContractABIs` object (may be used by external code)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex TypeScript generics, mapped types, needs careful type-level design
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 1)
  - **Parallel Group**: Wave 2 (with Task 5)
  - **Blocks**: Tasks 5, 6-11
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/contract-factory-cache.ts:1-75` — Current `ContractABIs` map and all ABI imports. This is the primary file to modify.
  - `packages/sdk/contractkit/src/contract-factory-cache.ts:93-202` — `ContractCache` class with `getContract()` method and all per-contract getter methods
  - `packages/sdk/contractkit/src/wrapper-cache.ts` (if exists) or search for `WrapperCache` — Where wrapper instances are created from contracts

  **API/Type References**:
  - `packages/sdk/contractkit/src/base.ts` — `CeloContract` enum definition
  - `node_modules/@celo/abis/dist/types/` — Generated ABI type exports (e.g., `typeof accountsABI`)
  - `packages/sdk/connect/src/viem-contract.ts` — `ViemContract<TAbi>` (from Task 1)

  **WHY Each Reference Matters**:
  - `contract-factory-cache.ts:1-75` has ALL the ABI imports already — just need to type the map
  - `contract-factory-cache.ts:93-202` is where `ViemContract` instances are created — must pass type through
  - `CeloContract` enum is the key type for the typed map
  - ABI type exports from `@celo/abis` provide the `typeof xxxABI` types

  **Acceptance Criteria**:
  - [x] `TypedContractABIs` map exists with per-contract const types
  - [x] `ContractABI<T>` utility type extracts correct ABI type per contract
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0
  - [x] Existing ContractCache getter methods still work

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Typed ABI map preserves const types
    Tool: Bash
    Preconditions: Tasks 1, 4 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Grep the built declarations: grep 'TypedContractABIs' packages/sdk/contractkit/lib/contract-factory-cache.d.ts
      4. Assert the typed map is exported
    Expected Result: Build passes, typed map exported in declarations
    Failure Indicators: Type errors in contract-factory-cache.ts
    Evidence: .sisyphus/evidence/task-4-typed-abi-map.txt

  Scenario: ContractCache still creates contracts correctly
    Tool: Bash
    Preconditions: Tasks 1, 4 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert no errors in contract-factory-cache.ts or any file importing from it
    Expected Result: Zero type errors
    Failure Indicators: Errors about ContractCache.getContract() return type
    Evidence: .sisyphus/evidence/task-4-contract-cache-compat.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): create typed ABI map preserving per-contract types`
  - Files: `packages/sdk/contractkit/src/contract-factory-cache.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`

- [x] 5. Make proxyCall/proxySend/BaseWrapper generic over ABI type

  **What to do**:
  - In `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`:
    - Make `BaseWrapper` generic: `abstract class BaseWrapper<TAbi extends readonly unknown[] = AbiItem[]>`
    - Change constructor param: `protected readonly contract: ViemContract<TAbi>`
    - Add typed overloads to `proxyCall` that constrain `functionName` to `ContractFunctionName<TAbi, 'view' | 'pure'>`:
      ```typescript
      export function proxyCall<
        TAbi extends readonly unknown[],
        TFunctionName extends ContractFunctionName<TAbi, 'view' | 'pure'>
      >(
        contract: ViemContract<TAbi>,
        functionName: TFunctionName
      ): (...args: ContractFunctionArgs<TAbi, 'view' | 'pure', TFunctionName>) => Promise<ContractFunctionReturnType<TAbi, 'view' | 'pure', TFunctionName>>
      ```
    - Add typed overloads to `proxySend` that constrain `functionName` to `ContractFunctionName<TAbi, 'nonpayable' | 'payable'>`
    - KEEP all existing untyped overloads — they become the fallback signatures
    - Import viem utility types at the top
  - In `packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts`:
    - Make it generic too: `abstract class BaseWrapperForGoverning<TAbi extends readonly unknown[] = AbiItem[]> extends BaseWrapper<TAbi>`
    - Update 3-arg constructor
  - Verify: `yarn workspace @celo/contractkit run tsc --noEmit` passes

  **Must NOT do**:
  - Do NOT change any wrapper subclasses yet — they'll get typed in Tasks 6-11
  - Do NOT remove existing untyped overloads
  - Do NOT change runtime behavior — this is types-only
  - Do NOT change exported parser functions (`valueToBigNumber`, `tupleParser`, etc.)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex TypeScript overload design with conditional types, needs careful type-level reasoning
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Tasks 1, 2, 4)
  - **Parallel Group**: Wave 2 (with Task 4, but sequenced after it)
  - **Blocks**: Tasks 6-11
  - **Blocked By**: Tasks 1, 2, 4

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:26-32` — Current `BaseWrapper` class definition and constructor. Make generic.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:286-335` — All `proxyCall` overloads (5 signatures). Add typed overloads BEFORE these.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:344-371` — All `proxySend` overloads (3 signatures). Add typed overloads BEFORE these.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts` — Extends BaseWrapper, has 3-arg constructor with extra `contracts` param

  **API/Type References**:
  - `packages/sdk/connect/src/viem-contract.ts` — `ViemContract<TAbi>` (from Task 1)
  - `packages/sdk/connect/src/viem-tx-object.ts` — `createViemTxObject` typed overload (from Task 2)
  - Viem types: `ContractFunctionName`, `ContractFunctionArgs`, `ContractFunctionReturnType` from `viem`

  **Test References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.test.ts` — Existing tests that must still pass

  **WHY Each Reference Matters**:
  - `BaseWrapper.ts:26-32` is the class to make generic — all 24 wrappers extend it
  - `BaseWrapper.ts:286-371` has all proxyCall/proxySend overloads — typed overloads go before these
  - `BaseWrapperForGoverning.ts` also extends BaseWrapper — must be made generic too
  - Viem utility types are the mechanism for compile-time inference

  **Acceptance Criteria**:
  - [x] `BaseWrapper<TAbi>` is generic with default type param
  - [x] `proxyCall` has typed overloads constraining functionName
  - [x] `proxySend` has typed overloads constraining functionName
  - [x] `BaseWrapperForGoverning<TAbi>` is generic
  - [x] All existing untyped overloads preserved
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0
  - [x] Parser functions still exported

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: BaseWrapper generic compiles and existing wrappers unaffected
    Tool: Bash
    Preconditions: Tasks 1-5 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Run `yarn workspace @celo/contractkit run test -- --testPathPattern BaseWrapper`
      4. Assert tests pass
    Expected Result: Build passes, BaseWrapper tests pass
    Failure Indicators: Type errors in BaseWrapper.ts or downstream wrappers
    Evidence: .sisyphus/evidence/task-5-basewrapper-generic.txt

  Scenario: Untyped overloads still work (wrappers not yet migrated)
    Tool: Bash
    Preconditions: Tasks 1-5 applied, no wrapper changes
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0 — all existing proxyCall('stringName') calls compile via untyped fallback
    Expected Result: Zero type errors from existing wrapper files
    Failure Indicators: Type errors in Accounts.ts, Governance.ts, etc.
    Evidence: .sisyphus/evidence/task-5-untyped-compat.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): make BaseWrapper and proxyCall/proxySend generic over ABI type`
  - Files: `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`, `packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`


- [x] 6. Migrate EpochManager as pilot wrapper + benchmark tsc

  **What to do**:
  - In `packages/sdk/contractkit/src/wrappers/EpochManager.ts`:
    - Change class declaration: `export class EpochManagerWrapper extends BaseWrapper<typeof epochManagerABI>` (import `epochManagerABI` from `@celo/abis`)
    - For every `proxyCall(this.contract, 'methodName')` call: the typed overload should now constrain `'methodName'` to actual ABI function names. Verify each method name is correct by checking that tsc doesn't error.
    - For every `proxySend(this.connection, this.contract, 'methodName')` call: same treatment.
    - For every `createViemTxObject(this.connection, this.contract, 'methodName', args)` call: same treatment.
    - Remove output parsers where viem natively returns the correct type (e.g., bigint instead of string that gets parsed to BigNumber). BUT: if the public return type is `BigNumber`, keep the parser to maintain API compat.
    - Where viem returns `bigint` but public API expects `BigNumber`: keep `valueToBigNumber` parser.
    - Where viem returns `boolean` or `string`: remove parser if it was just identity conversion.
  - After migration, benchmark:
    - Run `time yarn workspace @celo/contractkit run tsc --noEmit` three times
    - Compare median to Task 3 baseline
    - **HARD GATE**: If > 2x baseline, STOP and report — approach may need revision
  - Run: `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test -- --testPathPattern EpochManager`

  **Must NOT do**:
  - Do NOT migrate any other wrappers yet — this is the pilot
  - Do NOT change public return types
  - Do NOT use `as any` at call sites — if types don't resolve, fix the infrastructure

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: First migration requires understanding the full type flow, debugging type inference issues, and benchmarking
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (solo)
  - **Blocks**: Tasks 7-11 (bulk migration proceeds only if pilot passes)
  - **Blocked By**: Tasks 3, 5

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts` — Complete file. Has ~20 proxyCall/proxySend + createViemTxObject calls. Medium complexity, good pilot size.
  - `packages/sdk/contractkit/src/wrappers/Accounts.ts:49-63` — Example of `proxyCall`/`proxySend` property initializer pattern to follow

  **API/Type References**:
  - `node_modules/@celo/abis/dist/types/epochManager.d.ts` — `epochManagerABI` const type. This is what `TAbi` will be.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — `BaseWrapper<TAbi>` (from Task 5), `proxyCall`, `proxySend`
  - `packages/sdk/connect/src/viem-tx-object.ts` — `createViemTxObject` typed overload (from Task 2)

  **Test References**:
  - `packages/sdk/contractkit/src/wrappers/EpochManager.test.ts` — Existing tests for this wrapper. MUST still pass.

  **WHY Each Reference Matters**:
  - `EpochManager.ts` is the pilot file — first real migration, validates the entire approach
  - `epochManager.d.ts` shows the ABI type that will flow through generics
  - `EpochManager.test.ts` proves runtime behavior unchanged after migration

  **Acceptance Criteria**:
  - [x] `EpochManagerWrapper extends BaseWrapper<typeof epochManagerABI>`
  - [x] All proxyCall/proxySend/createViemTxObject calls use typed overloads (no `as any`)
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0
  - [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test -- --testPathPattern EpochManager` → pass
  - [x] tsc timing median ≤ 2x baseline from Task 3

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: EpochManager typed migration builds and tests pass
    Tool: Bash
    Preconditions: Tasks 1-5 applied, EpochManager.ts migrated
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test -- --testPathPattern EpochManager`
      4. Assert all tests pass
    Expected Result: Build passes, all EpochManager tests pass
    Failure Indicators: Type errors in EpochManager.ts, test failures
    Evidence: .sisyphus/evidence/task-6-pilot-build-test.txt

  Scenario: tsc compilation time within budget
    Tool: Bash
    Preconditions: Tasks 1-6 applied
    Steps:
      1. Run `time yarn workspace @celo/contractkit run tsc --noEmit` three times
      2. Calculate median
      3. Read baseline from .sisyphus/evidence/task-3-tsc-baseline.txt
      4. Compare: median ≤ 2x baseline
    Expected Result: Compilation time ≤ 2x baseline
    Failure Indicators: Compilation time > 2x baseline — STOP migration, report to user
    Evidence: .sisyphus/evidence/task-6-tsc-timing.txt

  Scenario: Method name typo caught at compile time (type safety proof)
    Tool: Bash
    Preconditions: EpochManager.ts migrated with typed proxyCall
    Steps:
      1. Temporarily change one proxyCall method name to a typo (e.g., 'getCurrentEpochNumbe' instead of 'getCurrentEpochNumber')
      2. Run `yarn workspace @celo/contractkit run tsc --noEmit 2>&1`
      3. Assert exit code 1 (compilation fails)
      4. Assert error message mentions the typo
      5. Revert the typo
      6. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      7. Assert exit code 0 (back to normal)
    Expected Result: Typo caught at compile time, correct name compiles
    Failure Indicators: Typo compiles without error (typed overload not resolving)
    Evidence: .sisyphus/evidence/task-6-type-safety-proof.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): migrate EpochManager to typed contract calls (pilot)`
  - Files: `packages/sdk/contractkit/src/wrappers/EpochManager.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit && RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test -- --testPathPattern EpochManager`


- [x] 7. Migrate simple wrappers batch (7 wrappers, ≤50 total call sites)

  **What to do**:
  - Migrate the following wrappers (each has <10 proxyCall/proxySend/createViemTxObject calls):
    - `Freezer.ts` — ~3 calls
    - `OdisPayments.ts` — ~5 calls
    - `ScoreManager.ts` — ~5 calls
    - `EpochRewards.ts` — ~8 calls
    - `EpochManagerEnabler.ts` (if it exists as a wrapper) — ~3 calls
    - `FederatedAttestations.ts` — ~8 calls
    - `GovernanceSlasher.ts` (if it exists as a wrapper) — ~3 calls
  - For each wrapper:
    1. Add `import { xxxABI } from '@celo/abis'`
    2. Change class declaration: `extends BaseWrapper<typeof xxxABI>`
    3. Verify all proxyCall/proxySend/createViemTxObject method names resolve to typed ABI function names
    4. Remove parsers where viem returns correct type natively; keep where public API requires different type (e.g., BigNumber)
  - Run `yarn workspace @celo/contractkit run tsc --noEmit` after each wrapper
  - Run `yarn workspace @celo/contractkit run test` for the batch when done

  **Must NOT do**:
  - Do NOT change public return types
  - Do NOT use `as any` at call sites
  - Do NOT skip any createViemTxObject calls in these files

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Repetitive but careful work across 7 files, following established pilot pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 8, 9, 10, 11)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 5, 6

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts` — Completed pilot migration (from Task 6). FOLLOW THIS EXACT PATTERN for all wrappers.
  - `packages/sdk/contractkit/src/wrappers/Freezer.ts` — Simplest wrapper, start here
  - `packages/sdk/contractkit/src/wrappers/OdisPayments.ts` — Simple wrapper
  - `packages/sdk/contractkit/src/wrappers/ScoreManager.ts` — Simple wrapper
  - `packages/sdk/contractkit/src/wrappers/EpochRewards.ts` — Simple wrapper
  - `packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts` — Simple wrapper

  **API/Type References**:
  - `node_modules/@celo/abis/dist/types/` — ABI type exports for each contract (freezerABI, odisPaymentsABI, etc.)
  - `packages/sdk/contractkit/src/contract-factory-cache.ts:1-30` — ABI import names to match

  **Test References**:
  - `packages/sdk/contractkit/src/wrappers/ScoreManager.test.ts` — Tests that must pass
  - `packages/sdk/contractkit/src/wrappers/OdisPayments.test.ts` — Tests that must pass
  - `packages/sdk/contractkit/src/wrappers/FederatedAttestations.test.ts` — Tests that must pass

  **WHY Each Reference Matters**:
  - Pilot pattern from Task 6 is the template — every migration follows the same steps
  - Each wrapper file listed is a migration target
  - Test files verify runtime behavior unchanged

  **Acceptance Criteria**:
  - [x] All 7 wrappers extend `BaseWrapper<typeof specificABI>`
  - [x] Zero `as any` at typed call sites
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0
  - [x] Tests for these wrappers pass

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Simple wrappers compile with typed calls
    Tool: Bash
    Preconditions: Tasks 1-7 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Run `yarn workspace @celo/contractkit run test -- --testPathPattern '(ScoreManager|OdisPayments|FederatedAttestations|FeeCurrencyDirectory)'`
      4. Assert all tests pass
    Expected Result: Build passes, tests pass
    Failure Indicators: Type errors in any of the 7 wrapper files
    Evidence: .sisyphus/evidence/task-7-simple-wrappers.txt

  Scenario: No `as any` in migrated call sites
    Tool: Bash
    Preconditions: Task 7 applied
    Steps:
      1. For each file: grep 'as any' in the wrapper file
      2. Assert zero matches in new/changed lines (existing `as any` in unrelated code is OK)
    Expected Result: Zero `as any` in typed proxyCall/proxySend/createViemTxObject lines
    Failure Indicators: `as any` found at call sites
    Evidence: .sisyphus/evidence/task-7-no-any-casts.txt
  ```

  **Commit**: YES (groups with Tasks 8-11)
  - Message: `refactor(contractkit): migrate simple wrappers to typed contract calls`
  - Files: All 7 wrapper files listed above
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`

- [x] 8. Migrate medium wrappers batch (9 wrappers: Accounts, SortedOracles, LockedGold, Reserve, Escrow, GoldToken, CeloToken, StableToken, Erc20)

  **What to do**:
  - Migrate wrappers with 10-21 call sites each:
    - `Accounts.ts` — 21 proxyCall/proxySend + 11 createViemTxObject (32 total)
    - `SortedOracles.ts` — ~10 calls
    - `LockedGold.ts` — ~15 calls
    - `Reserve.ts` — ~10 calls
    - `Escrow.ts` — ~8 calls
    - `GoldTokenWrapper.ts` — ~5 calls (uses goldTokenABI)
    - `CeloTokenWrapper.ts` — ~5 calls (uses goldTokenABI)
    - `StableTokenWrapper.ts` — ~8 calls (uses stableTokenABI)
    - `Erc20Wrapper.ts` — ~5 calls (uses ierc20ABI)
  - Same migration pattern as pilot (Task 6) and simple batch (Task 7)
  - Special attention to Accounts.ts — largest in this batch, has complex signature methods (crypto operations), many createViemTxObject calls
  - For `Erc20Wrapper`: uses `ierc20ABI` — a generic ERC20 ABI, may not have all method names for custom tokens. Use `ierc20ABI` as the type param.
  - For `CeloTokenWrapper` and `GoldTokenWrapper`: both use `goldTokenABI`
  - For `StableTokenWrapper`: uses `stableTokenABI`

  **Must NOT do**:
  - Do NOT change the crypto signing logic in Accounts.ts — only change contract call patterns
  - Do NOT change `solidityBytesToString` / `stringToSolidityBytes` usage if they're still needed for type conversion
  - Do NOT change public API

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 9 files, medium complexity, follows established pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 7, 9, 10, 11)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 5, 6

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts` — Completed pilot (Task 6). Follow this pattern.
  - `packages/sdk/contractkit/src/wrappers/Accounts.ts:1-80` — Largest in this batch. Note the crypto imports and complex methods.
  - `packages/sdk/contractkit/src/wrappers/Accounts.ts:43-63` — Property initializer pattern for proxyCall/proxySend
  - `packages/sdk/contractkit/src/wrappers/LockedGold.ts` — Medium complexity
  - `packages/sdk/contractkit/src/wrappers/SortedOracles.ts` — Medium complexity
  - `packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts` — Uses ierc20ABI (generic ERC20)

  **Test References**:
  - `packages/sdk/contractkit/src/wrappers/Accounts.test.ts`
  - `packages/sdk/contractkit/src/wrappers/SortedOracles.test.ts`
  - `packages/sdk/contractkit/src/wrappers/LockedGold.test.ts`
  - `packages/sdk/contractkit/src/wrappers/Reserve.test.ts`
  - `packages/sdk/contractkit/src/wrappers/Escrow.test.ts`
  - `packages/sdk/contractkit/src/wrappers/GoldToken.test.ts`
  - `packages/sdk/contractkit/src/wrappers/StableToken.test.ts`

  **WHY Each Reference Matters**:
  - Each wrapper file is a migration target — apply same pattern as pilot
  - Accounts.ts is the most complex with crypto signing + many createViemTxObject calls
  - Test files prove runtime behavior unchanged

  **Acceptance Criteria**:
  - [x] All 9 wrappers extend `BaseWrapper<typeof specificABI>`
  - [x] All proxyCall/proxySend/createViemTxObject calls use typed overloads
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0
  - [x] Tests pass for all migrated wrappers

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Medium wrappers compile and tests pass
    Tool: Bash
    Preconditions: Tasks 1-6, 8 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Run `yarn workspace @celo/contractkit run test -- --testPathPattern '(Accounts|SortedOracles|LockedGold|Reserve|Escrow|GoldToken|StableToken)'`
      4. Assert all tests pass
    Expected Result: Build passes, all tests pass
    Failure Indicators: Type errors in any wrapper, test failures
    Evidence: .sisyphus/evidence/task-8-medium-wrappers.txt
  ```

  **Commit**: YES (groups with Tasks 7, 9-11)
  - Message: `refactor(contractkit): migrate medium wrappers to typed contract calls`
  - Files: All 9 wrapper files
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`

- [x] 9. Migrate complex wrappers batch (5 wrappers: Validators, Election, MultiSig, Attestations, FeeHandler)

  **What to do**:
  - Migrate complex wrappers (10-23 call sites each, complex struct transforms):
    - `Validators.ts` — 23 calls, complex validator group/member structs
    - `Election.ts` — ~18 calls, election result structs
    - `MultiSig.ts` — ~12 calls, transaction structs
    - `Attestations.ts` — ~10 calls, attestation state structs
    - `FeeHandler.ts` — ~8 calls
  - Same migration pattern as pilot
  - These wrappers have complex output parsers that transform contract results into TypeScript objects (e.g., `ValidatorGroup`, `ElectionResult`, `Transaction`). These struct-building parsers must be KEPT since viem returns tuples, not named objects.
  - For parsers that transform tuples to structs (common in Validators, Election): keep the parser function, just type the input correctly

  **Must NOT do**:
  - Do NOT remove struct-building output parsers — they convert tuples to named objects
  - Do NOT change struct type definitions
  - Do NOT simplify complex methods — only change the proxyCall/proxySend/createViemTxObject calls

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex struct transformers, careful type reasoning needed
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 7, 8, 10, 11)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 5, 6

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts` — Pilot pattern (Task 6)
  - `packages/sdk/contractkit/src/wrappers/Validators.ts` — Largest in this batch, complex validator structs
  - `packages/sdk/contractkit/src/wrappers/Election.ts` — Election result parsing
  - `packages/sdk/contractkit/src/wrappers/MultiSig.ts` — MultiSig transaction handling
  - `packages/sdk/contractkit/src/wrappers/Attestations.ts` — Attestation state
  - `packages/sdk/contractkit/src/wrappers/FeeHandler.ts` — Fee handler

  **Test References**:
  - `packages/sdk/contractkit/src/wrappers/Validators.test.ts`
  - `packages/sdk/contractkit/src/wrappers/Election.test.ts`
  - `packages/sdk/contractkit/src/wrappers/Attestations.test.ts`

  **WHY Each Reference Matters**:
  - Each wrapper is a migration target with complex struct output parsers
  - Test files validate that struct building still works after migration

  **Acceptance Criteria**:
  - [x] All 5 wrappers extend `BaseWrapper<typeof specificABI>`
  - [x] All typed call sites, struct parsers preserved
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0
  - [x] Tests pass

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Complex wrappers compile and tests pass
    Tool: Bash
    Preconditions: Tasks 1-6, 9 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Run `yarn workspace @celo/contractkit run test -- --testPathPattern '(Validators|Election|Attestations)'`
      4. Assert tests pass
    Expected Result: Build passes, tests pass
    Failure Indicators: Type errors, test failures in struct-heavy wrappers
    Evidence: .sisyphus/evidence/task-9-complex-wrappers.txt
  ```

  **Commit**: YES (groups with Tasks 7-8, 10-11)
  - Message: `refactor(contractkit): migrate complex wrappers to typed contract calls`
  - Files: All 5 wrapper files
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`

- [x] 10. Migrate ReleaseGold (largest wrapper — 36 call sites)

  **What to do**:
  - Migrate `packages/sdk/contractkit/src/wrappers/ReleaseGold.ts`:
    - Import `releaseGoldABI` from `@celo/abis`
    - `extends BaseWrapper<typeof releaseGoldABI>`
    - Migrate all 36 proxyCall/proxySend/createViemTxObject calls
    - ReleaseGold has many simple getter methods (addresses, booleans, amounts) + several send transactions
  - Special note: ReleaseGold is also used ad-hoc in CLI via `kit.connection.getViemContract(releaseGoldABI as any, address)` — this is OUT OF SCOPE (CLI code). Only migrate the wrapper.

  **Must NOT do**:
  - Do NOT change CLI's ReleaseGold usage (`packages/cli/src/commands/releasegold/release-gold-base.ts`)
  - Do NOT change public API

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Largest wrapper file, 36 call sites, needs careful systematic migration
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 7, 8, 9, 11)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 5, 6

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/ReleaseGold.ts` — Complete file. 36 call sites, systematic migration.
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts` — Pilot pattern (Task 6)

  **API/Type References**:
  - `node_modules/@celo/abis/dist/types/releaseGold.d.ts` — `releaseGoldABI` const type

  **WHY Each Reference Matters**:
  - ReleaseGold.ts is the largest single file — needs dedicated attention
  - Pilot pattern guides the migration approach

  **Acceptance Criteria**:
  - [x] `ReleaseGoldWrapper extends BaseWrapper<typeof releaseGoldABI>`
  - [x] All 36 call sites use typed overloads
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: ReleaseGold compiles with typed calls
    Tool: Bash
    Preconditions: Tasks 1-6, 10 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Grep for 'as any' in ReleaseGold.ts call sites: grep -n 'as any' packages/sdk/contractkit/src/wrappers/ReleaseGold.ts
      4. Assert zero matches in proxyCall/proxySend/createViemTxObject lines
    Expected Result: Build passes, no `as any` in typed call sites
    Failure Indicators: Type errors, `as any` workarounds
    Evidence: .sisyphus/evidence/task-10-releasegold.txt
  ```

  **Commit**: YES (groups with Tasks 7-9, 11)
  - Message: `refactor(contractkit): migrate ReleaseGold to typed contract calls`
  - Files: `packages/sdk/contractkit/src/wrappers/ReleaseGold.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`

- [x] 11. Migrate Governance (32 call sites, complex struct transforms)

  **What to do**:
  - Migrate `packages/sdk/contractkit/src/wrappers/Governance.ts`:
    - Import `governanceABI` from `@celo/abis`
    - `extends BaseWrapperForGoverning<typeof governanceABI>` (Governance extends BaseWrapperForGoverning, not BaseWrapper directly)
    - Migrate all 32 proxyCall/proxySend/createViemTxObject calls
    - Governance has the most complex struct transforms (ProposalRecord, VoteRecord, ProposalStage, etc.) — all parsers must be preserved
    - Note: Governance.ts is ~800+ lines, second largest wrapper

  **Must NOT do**:
  - Do NOT simplify governance struct parsers
  - Do NOT change ProposalStage enum or governance types
  - Do NOT change governance ProposalBuilder (out of scope — uses dynamic method names)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Most complex wrapper with governance structs, extends BaseWrapperForGoverning, 32 call sites
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 7, 8, 9, 10)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 5, 6

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/Governance.ts` — Complete file. 32 call sites, complex struct transforms.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts` — Base class (made generic in Task 5)
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts` — Pilot pattern (Task 6)

  **API/Type References**:
  - `node_modules/@celo/abis/dist/types/governance.d.ts` — `governanceABI` const type (2084 lines — largest ABI)

  **Test References**:
  - `packages/sdk/contractkit/src/wrappers/Governance.test.ts` — Extensive tests that MUST pass

  **WHY Each Reference Matters**:
  - Governance.ts is the most complex wrapper — needs dedicated expert attention
  - BaseWrapperForGoverning is its base class — must be generic (from Task 5)
  - governance.d.ts at 2084 lines is the largest ABI type — highest risk for tsc perf
  - Governance.test.ts is comprehensive — validates all struct building

  **Acceptance Criteria**:
  - [x] `GovernanceWrapper extends BaseWrapperForGoverning<typeof governanceABI>`
  - [x] All 32 call sites use typed overloads
  - [x] All struct parsers preserved
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0
  - [x] Governance tests pass

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Governance compiles and tests pass
    Tool: Bash
    Preconditions: Tasks 1-6, 11 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0
      3. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test -- --testPathPattern Governance`
      4. Assert all tests pass
    Expected Result: Build passes, governance tests pass
    Failure Indicators: Type errors (likely from 2084-line ABI type inference), test failures
    Evidence: .sisyphus/evidence/task-11-governance.txt
  ```

  **Commit**: YES (groups with Tasks 7-10)
  - Message: `refactor(contractkit): migrate Governance to typed contract calls`
  - Files: `packages/sdk/contractkit/src/wrappers/Governance.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`

- [x] 12. Full build + test + lint verification

  **What to do**:
  - Run full build in dependency order:
    1. `yarn workspace @celo/connect run build`
    2. `yarn workspace @celo/contractkit run build`
    3. `yarn workspace @celo/celocli run build` (downstream)
    4. `yarn workspace @celo/governance run build` (downstream)
  - Run full test suite: `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
  - Run lint: `yarn lint && yarn fmt:diff`
  - Run format fix if needed: `yarn fmt`
  - Benchmark final tsc time: `time yarn workspace @celo/contractkit run tsc --noEmit` (3 runs, compare to baseline)

  **Must NOT do**:
  - Do NOT skip downstream builds (CLI, governance)
  - Do NOT skip lint/format

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Running build/test/lint commands, analyzing output, fixing issues
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5
  - **Blocks**: Tasks 13, 14
  - **Blocked By**: Tasks 7-11

  **References**:
  - `AGENTS.md` — Build/test/lint commands
  - `.sisyphus/evidence/task-3-tsc-baseline.txt` — Baseline timing for comparison

  **Acceptance Criteria**:
  - [x] All 4 packages build: connect, contractkit, celocli, governance
  - [x] Full contractkit test suite passes with Anvil
  - [x] `yarn lint && yarn fmt:diff` exit 0
  - [x] tsc timing ≤ 2x baseline

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Full build pipeline passes
    Tool: Bash
    Preconditions: All tasks 1-11 applied
    Steps:
      1. Run `yarn workspace @celo/connect run build` — assert exit 0
      2. Run `yarn workspace @celo/contractkit run build` — assert exit 0
      3. Run `yarn workspace @celo/celocli run build` — assert exit 0
      4. Run `yarn workspace @celo/governance run build` — assert exit 0
      5. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — assert all pass
      6. Run `yarn lint && yarn fmt:diff` — assert exit 0
      7. Run `time yarn workspace @celo/contractkit run tsc --noEmit` (3x), compare median to baseline
    Expected Result: All builds pass, all tests pass, lint clean, timing ≤ 2x
    Failure Indicators: Any build/test/lint failure, timing > 2x baseline
    Evidence: .sisyphus/evidence/task-12-full-verification.txt
  ```

  **Commit**: NO (verification only)

- [x] 13. Type-safety proof — add intentional-typo compile test

  **What to do**:
  - Create a type-level test file: `packages/sdk/contractkit/src/__type-tests__/typed-contracts.test-d.ts` (or similar)
  - In this file, write type assertions that verify:
    1. Correct method name compiles: `proxyCall(accountsContract, 'isAccount')` → OK
    2. Incorrect method name fails: `// @ts-expect-error` + `proxyCall(accountsContract, 'isAcount')` → ERROR
    3. Correct args compile: method with `(address: string)` arg accepts string
    4. Return type is inferred: method returning boolean has `Promise<boolean>` return
  - Run `yarn workspace @celo/contractkit run tsc --noEmit` to verify @ts-expect-error annotations are correct

  **Must NOT do**:
  - Do NOT create runtime tests for this — these are compile-time type checks only
  - Do NOT leave uncommented type errors in the codebase

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small type test file creation
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 14)
  - **Parallel Group**: Wave 5
  - **Blocks**: F1-F4
  - **Blocked By**: Task 12

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Accounts.ts` — Example typed wrapper to test against
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — proxyCall typed overloads
  - TypeScript `@ts-expect-error` docs — directive for expected type errors

  **WHY Each Reference Matters**:
  - Need a concrete typed wrapper to construct test cases
  - proxyCall overloads are what we're proving work

  **Acceptance Criteria**:
  - [x] Type test file exists
  - [x] `@ts-expect-error` on typo lines — tsc passes (errors expected and caught)
  - [x] `yarn workspace @celo/contractkit run tsc --noEmit` → exit 0

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Type safety assertions compile correctly
    Tool: Bash
    Preconditions: Tasks 1-12, 13 applied
    Steps:
      1. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      2. Assert exit code 0 (all @ts-expect-error directives are satisfied)
      3. Temporarily remove one @ts-expect-error directive from a typo line
      4. Run `yarn workspace @celo/contractkit run tsc --noEmit`
      5. Assert exit code 1 (the typo is now a real error)
      6. Restore the @ts-expect-error directive
    Expected Result: Type test file validates type safety is working
    Failure Indicators: @ts-expect-error not satisfied (overload isn't constraining), or typo compiles without error
    Evidence: .sisyphus/evidence/task-13-type-safety-proof.txt
  ```

  **Commit**: YES
  - Message: `test(contractkit): add compile-time type safety verification for typed contracts`
  - Files: `packages/sdk/contractkit/src/__type-tests__/typed-contracts.test-d.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run tsc --noEmit`

- [x] 14. Downstream build verification (CLI, governance)

  **What to do**:
  - Verify all downstream packages build correctly:
    1. `yarn workspace @celo/celocli run build` — CLI uses `@celo/connect` and `@celo/contractkit`
    2. `yarn workspace @celo/governance run build` — governance uses contractkit
    3. `RUN_ANVIL_TESTS=true yarn workspace @celo/celocli run test` — CLI tests
    4. `RUN_ANVIL_TESTS=true yarn workspace @celo/governance run test` — governance tests
  - If any downstream build fails, identify the root cause (likely ViemContract type change or missing default type param)
  - Fix any issues in `@celo/connect` or `@celo/contractkit` (NOT in downstream packages)

  **Must NOT do**:
  - Do NOT change CLI code or governance code
  - If downstream breaks, fix in connect/contractkit, not downstream

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Running builds and tests, minimal code changes expected
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 13)
  - **Parallel Group**: Wave 5
  - **Blocks**: F1-F4
  - **Blocked By**: Task 12

  **References**:
  - `packages/cli/package.json` — CLI dependencies on connect/contractkit
  - `packages/sdk/governance/package.json` — Governance dependencies

  **Acceptance Criteria**:
  - [x] `yarn workspace @celo/celocli run build` → exit 0
  - [x] `yarn workspace @celo/governance run build` → exit 0
  - [x] CLI tests pass
  - [x] Governance tests pass

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Downstream packages build and test
    Tool: Bash
    Preconditions: Tasks 1-12 applied
    Steps:
      1. Run `yarn workspace @celo/celocli run build` — assert exit 0
      2. Run `yarn workspace @celo/governance run build` — assert exit 0
      3. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/celocli run test` — assert pass
      4. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/governance run test` — assert pass
    Expected Result: All downstream builds and tests pass
    Failure Indicators: Type errors in CLI/governance referencing ViemContract or proxyCall
    Evidence: .sisyphus/evidence/task-14-downstream.txt
  ```

  **Commit**: NO (verification only, fix any issues in connect/contractkit)

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run `tsc --noEmit`, grep for patterns). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `yarn workspace @celo/connect run build && yarn workspace @celo/contractkit run build && yarn lint && yarn fmt:diff`. Review all changed files for: `as any`/`@ts-ignore` (must not exist in new typed call sites), empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real QA** — `unspecified-high`
  Run full test suite: `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`. Run downstream: `yarn workspace @celo/celocli run build && yarn workspace @celo/governance run build`. Execute type-safety proof: introduce typo in a proxyCall, verify tsc fails. Remove typo. Run `yarn build` for full repo sanity.
  Output: `Tests [N/N pass] | Downstream Build [PASS/FAIL] | Type Safety [PASS/FAIL] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT Have" compliance: no CLI changes, no governance ProposalBuilder changes, no DKG changes, no AbstractFeeCurrencyWrapper changes. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Scope [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor(connect): make ViemContract generic over ABI type` — `viem-contract.ts`, `viem-tx-object.ts`
- **Wave 2**: `refactor(contractkit): add typed ABI map and generic proxyCall/proxySend` — `contract-factory-cache.ts`, `BaseWrapper.ts`, `BaseWrapperForGoverning.ts`
- **Wave 3**: `refactor(contractkit): migrate EpochManager to typed contract calls (pilot)` — `EpochManager.ts`
- **Wave 4**: `refactor(contractkit): migrate all wrappers to typed contract calls` — all 23 remaining wrapper files
- **Wave 5**: `test(contractkit): add type-safety compile verification` — test file + verification

---

## Success Criteria

### Verification Commands
```bash
# Build all affected packages
yarn workspace @celo/connect run build          # Expected: exit 0
yarn workspace @celo/contractkit run build       # Expected: exit 0
yarn workspace @celo/celocli run build           # Expected: exit 0
yarn workspace @celo/governance run build        # Expected: exit 0

# Full test suite
RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test  # Expected: all pass

# Lint
yarn lint && yarn fmt:diff                       # Expected: exit 0

# Type safety proof (manual verification by agent)
# Introduce typo 'isAcount' in Accounts.ts proxyCall → tsc --noEmit fails
# Correct back to 'isAccount' → tsc --noEmit passes

# Compilation time
time yarn workspace @celo/contractkit run tsc --noEmit  # Expected: ≤2x baseline
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] All tests pass
- [x] All downstream consumers build
- [x] Compilation time within budget
