# Fix Typed Overloads — Strongly Typed Contracts Without Escape Hatches

## TL;DR

> **Quick Summary**: Eliminate all type-safety escape hatches from proxyCall/proxySend/createViemTxObject. Introduce `proxyCallGeneric`/`proxySendGeneric` for generic intermediate classes using ViemContract covariance (zero casts). Migrate all 147 direct createViemTxObject wrapper calls to proxyCall/proxySend.
>
> **Deliverables**:
> - Zero-escape-hatch proxyCall/proxySend overloads that catch method name typos at compile time
> - proxyCallGeneric/proxySendGeneric for Erc20Wrapper/CeloTokenWrapper (no casts, no `as any`, no `as unknown`)
> - All wrapper createViemTxObject calls migrated to typed proxyCall/proxySend
> - createViemTxObject reduced to only typed + untyped-mutable overloads (no `ViemContract<Abi>` + `string` escape hatch)
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 → Task 2 → Tasks 3-12 (parallel) → Task 13

---

## Context

### Original Request
Fix the typed proxyCall/proxySend overloads so that method name typos are actually caught at compile time. Previous implementation had escape-hatch overloads that accepted `string` functionName for typed contracts, silently allowing any method name string through.

### Interview Summary
**Key Decisions**:
- NO `as any`, NO `as unknown as X` at any call site — absolutely forbidden
- NO escape-hatch overloads that accept `string` for typed contracts
- If the architecture can't support it, tear it down and rebuild
- Generic intermediate classes (Erc20Wrapper, CeloTokenWrapper) must compile cleanly without casts

**Research Findings**:
- **ViemContract covariance**: ViemContract has only `readonly` properties using TAbi → covariant. `ViemContract<TAbi extends Abi>` is naturally assignable to `ViemContract<readonly unknown[]>` without any cast. VERIFIED with type-level test.
- **TypeScript limitation**: `ContractFunctionName<TAbi>` cannot be evaluated for unresolved generic type parameters. This is a language limitation — not solvable with overloads, conditional types, or phantom types.
- **Oracle recommendation**: Separate non-overloaded `proxyCallGeneric`/`proxySendGeneric` functions for generic intermediate classes. Not an escape hatch because TypeScript overloads can't fall through to a DIFFERENT function.

### Current State (uncommitted changes on `pahor/removeViem`)
- 10 commits of strongly-typed wrapper migration already in git
- Uncommitted changes in viem-tx-object.ts, BaseWrapper.ts, CeloTokenWrapper.ts, Election.ts, Erc20Wrapper.ts, Governance.ts
- These uncommitted changes are PARTIAL — they have the right direction but include escape-hatch overloads and `as unknown as` casts
- Current state: 0 type errors but type safety NOT working (typos not caught)

---

## Work Objectives

### Core Objective
Make proxyCall/proxySend catch method name typos at compile time for ALL concrete wrapper classes, while cleanly supporting generic intermediate classes and dynamic callers — with ZERO type assertions at any call site.

### Concrete Deliverables
- Modified `viem-tx-object.ts`: createViemTxObject with 2 overloads (typed + untyped-mutable) + non-exported internal helper
- Modified `BaseWrapper.ts`: proxyCall/proxySend typed overloads + proxyCallGeneric/proxySendGeneric
- Modified Erc20Wrapper.ts, CeloTokenWrapper.ts using proxyCallGeneric/proxySendGeneric
- 8 wrapper files with all direct createViemTxObject calls converted to proxyCall/proxySend
- All existing tests passing unchanged

### Definition of Done
- [x] `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit` → 0 errors
- [x] Introduce `'getAttestationSignerTYPO'` in Accounts.ts proxyCall → tsc MUST error
- [x] Introduce `'authorizeAttestationSignerTYPO'` in Accounts.ts proxySend → tsc MUST error
- [x] Introduce typo in direct wrapper method body → tsc MUST error (no createViemTxObject escape)
- [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` → all 258 tests pass
- [x] `npx tsc -p packages/cli/tsconfig.json --noEmit` → 0 errors
- [x] `npx tsc -p packages/sdk/governance/tsconfig.json --noEmit` → 0 errors
- [x] `yarn lint && yarn fmt:diff` → clean
- [x] Zero `as any` or `as unknown as` at ANY proxyCall/proxySend/createViemTxObject CALL SITE
- [x] `as` keyword ONLY inside `createViemTxObjectInternal` body (non-exported, 1 occurrence: `contract.abi as AbiItem[]` for viem encoding)

### Must Have
- Compile-time function name checking for ALL concrete wrapper classes
- Clean compilation of generic intermediate classes (Erc20Wrapper, CeloTokenWrapper) without casts
- Untyped overloads for CLI/ProposalBuilder/dynamic callers preserved
- Public API types identical (no breaking changes)

### Must NOT Have (Guardrails)
- `as any` at any call site — FORBIDDEN
- `as unknown as X` at any call site — FORBIDDEN
- Overloads that accept `string` functionName for `ViemContract<Abi>` (the escape hatch)
- Changes to CLI files, governance ProposalBuilder, DKG
- Changes to AbstractFeeCurrencyWrapper (inline ABI, out of scope)
- Changes to test files (they must pass unchanged)
- New runtime behavior — all changes are type-level only

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Jest + Anvil)
- **Automated tests**: Tests-after (existing test suite must pass unchanged)
- **Framework**: Jest with `--experimental-vm-modules`

### QA Policy
Every task includes agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Type checking**: `npx tsc -p <tsconfig> --noEmit`
- **Tests**: `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
- **Type safety proof**: Introduce deliberate typos → verify tsc catches them

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — sequential, must complete first):
├── Task 1: createViemTxObject overhaul (remove escape hatch, add internal) [deep]
├── Task 2: BaseWrapper proxyCall/proxySend + proxyCallGeneric/proxySendGeneric [deep]

Wave 2 (Generic intermediate classes — after Wave 1):
├── Task 3: Erc20Wrapper + CeloTokenWrapper migration [quick]

Wave 3 (Wrapper createViemTxObject migration — MAX PARALLEL after Wave 2):
├── Task 4: Election.ts — 26 calls [unspecified-high]
├── Task 5: Validators.ts — 18 calls [unspecified-high]
├── Task 6: Accounts.ts — 15 calls [unspecified-high]
├── Task 7: Governance.ts — 14 calls [unspecified-high]
├── Task 8: SortedOracles.ts — 11 calls [unspecified-high]
├── Task 9: ReleaseGold.ts — 10 calls + MultiSig.ts — 10 calls [unspecified-high]
├── Task 10: LockedGold.ts — 7 calls [quick]
└── Task 11: Attestations.ts + EpochRewards.ts + FederatedAttestations.ts — 8 calls [quick]

Wave 4 (Verification — after ALL):
├── Task 12: Type safety proof + full build/test/lint [deep]

Wave FINAL:
├── Task F1: Plan compliance audit [oracle]
├── Task F2: Code quality review [unspecified-high]
├── Task F3: Full QA [unspecified-high]
├── Task F4: Scope fidelity check [deep]

Critical Path: Task 1 → Task 2 → Task 3 → Tasks 4-11 → Task 12 → F1-F4
Parallel Speedup: ~60% faster than sequential (Wave 3 runs 8 tasks in parallel)
Max Concurrent: 8 (Wave 3)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1    | —         | 2      |
| 2    | 1         | 3-11   |
| 3    | 2         | 4-11   |
| 4-11 | 3         | 12     |
| 12   | 4-11      | F1-F4  |
| F1-F4| 12        | —      |

### Agent Dispatch Summary

- **Wave 1**: 2 tasks — T1 → `deep`, T2 → `deep`
- **Wave 2**: 1 task — T3 → `quick`
- **Wave 3**: 8 tasks — T4-T8 → `unspecified-high`, T9 → `unspecified-high`, T10-T11 → `quick`
- **Wave 4**: 1 task — T12 → `deep`
- **Final**: 4 tasks — F1 → `oracle`, F2-F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. Overhaul createViemTxObject in viem-tx-object.ts

  **What to do**:
  - Remove the escape-hatch Overload 2 (`ViemContract<Abi>` + `string` + `unknown[]`)
  - Keep ONLY two public overloads:
    - Overload 1 (fully typed): `ViemContract<TAbi extends Abi>` + `ContractFunctionName<TAbi>` + `ContractFunctionArgs<...>` → `CeloTxObject<unknown>`
    - Overload 2 (untyped fallback): `ViemContract` (mutable `AbiItem[]` default) + `string` + `unknown[]` → `CeloTxObject<O>`
  - Extract the ENTIRE function body into a non-exported `createViemTxObjectInternal`:
    ```typescript
    function createViemTxObjectInternal(
      connection: Connection,
      contract: ViemContract<readonly unknown[]>,
      functionName: string,
      args: unknown[]
    ): CeloTxObject<unknown>
    ```
  - The public overloaded `createViemTxObject` implementation just delegates to `createViemTxObjectInternal`
  - `createViemTxObjectInternal` body uses `contract.abi as AbiItem[]` for encoding (the ONE allowed internal cast — necessary because viem's encodeFunctionData requires specific ABI types)
  - Export `createViemTxObjectInternal` as a NAMED internal export so proxyCallGeneric/proxySendGeneric can use it
  - Build connect: `yarn workspace @celo/connect run build`

  **Must NOT do**:
  - Add any overload accepting `ViemContract<Abi>` with `string` functionName
  - Export createViemTxObjectInternal as a public API (use `/** @internal */`)
  - Change runtime behavior

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires careful understanding of TypeScript overload resolution and type-level guarantees
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (sequential)
  - **Blocks**: Task 2
  - **Blocked By**: None

  **References**:
  - `packages/sdk/connect/src/viem-tx-object.ts` — ENTIRE FILE. Current overloads at lines 10-47, implementation at 48-119. Must restructure all of it.
  - `packages/sdk/connect/src/viem-contract.ts` — ViemContract interface definition. Note the `readonly` properties (covariant TAbi).
  - `packages/sdk/connect/src/abi-types.ts` — AbiItem type. The ONE internal cast target.
  - `viem` npm package — `Abi`, `ContractFunctionName`, `ContractFunctionArgs`, `encodeFunctionData` types

  **Acceptance Criteria**:
  - [ ] `yarn workspace @celo/connect run build` succeeds
  - [ ] Only 2 public overloads visible (typed + untyped-mutable)
  - [ ] `createViemTxObjectInternal` exported with `/** @internal */` JSDoc

  **QA Scenarios**:

  ```
  Scenario: Connect package builds cleanly
    Tool: Bash
    Steps:
      1. Run `yarn workspace @celo/connect run build`
      2. Check exit code is 0
    Expected Result: Build succeeds with no errors
    Evidence: .sisyphus/evidence/task-1-connect-build.txt

  Scenario: Only 2 public overloads in .d.ts output
    Tool: Bash
    Steps:
      1. Run `grep 'export declare function createViemTxObject' packages/sdk/connect/lib/viem-tx-object.d.ts | wc -l`
      2. Assert count is exactly 2 (typed + untyped-mutable overloads, NOT 3)
    Expected Result: Exactly 2 overload declarations
    Evidence: .sisyphus/evidence/task-1-overload-count.txt
  ```

  **Commit**: YES
  - Message: `refactor(connect): remove escape-hatch overload from createViemTxObject, add internal helper`
  - Files: `packages/sdk/connect/src/viem-tx-object.ts`
  - Pre-commit: `yarn workspace @celo/connect run build`

---

- [x] 2. Add proxyCallGeneric/proxySendGeneric + fix proxyCall/proxySend in BaseWrapper.ts

  **What to do**:
  - **Keep existing typed overloads** of proxyCall (4 variants) and proxySend (2 variants) — these are correct and work for concrete classes
  - **Keep existing untyped overloads** of proxyCall (4 variants) and proxySend (2 variants) — these use `ViemContract` (mutable AbiItem[]) for dynamic callers
  - **Fix the implementation bodies**: The proxyCall and proxySend IMPLEMENTATION SIGNATURES accept `ViemContract<readonly unknown[]>`. Inside the body, they call createViemTxObject. Since createViemTxObject no longer has the escape hatch, the implementation body should call `createViemTxObjectInternal` directly (imported from connect).
  - **Add new exported functions** (NOT overloads of proxyCall/proxySend):
    ```typescript
    /**
     * Like proxyCall, but without compile-time function name checking.
     * Use ONLY in generic intermediate classes where TAbi is unresolved.
     * @internal
     */
    export function proxyCallGeneric<InputArgs extends any[], Output>(
      contract: ViemContract<readonly unknown[]>,
      functionName: string
    ): (...args: InputArgs) => Promise<Output>
    // + 3 more overload-style variants (with parseInputArgs, parseOutput, both)
    ```
    Same for `proxySendGeneric`.
  - The proxyCallGeneric/proxySendGeneric functions accept `ViemContract<readonly unknown[]>` (widest type). Due to covariance, `ViemContract<TAbi extends Abi>` is assignable to this WITHOUT casts.
  - proxyCallGeneric/proxySendGeneric internally call `createViemTxObjectInternal` (imported from connect), NOT the overloaded createViemTxObject.
  - Ensure `createViemTxObjectInternal` is imported from `@celo/connect` (add to connect's index.ts exports if needed)

  **Must NOT do**:
  - Add any overload to proxyCall/proxySend that accepts `ViemContract<Abi>` with `string` (the escape hatch)
  - Use `as any` or `as unknown as` anywhere
  - Change proxyCall/proxySend typed overload signatures

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex TypeScript overload architecture, must understand covariance and overload resolution
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (after Task 1)
  - **Blocks**: Tasks 3-11
  - **Blocked By**: Task 1

  **References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — ENTIRE FILE. proxyCall at ~lines 286-390, proxySend at ~lines 400-467. Must restructure.
  - `packages/sdk/connect/src/viem-tx-object.ts` — createViemTxObjectInternal (from Task 1)
  - `packages/sdk/connect/src/index.ts` — may need to export createViemTxObjectInternal
  - `packages/sdk/connect/src/viem-contract.ts` — ViemContract type definition (covariance via readonly properties)

  **Acceptance Criteria**:
  - [ ] `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit` shows ONLY errors from Erc20Wrapper/CeloTokenWrapper and direct createViemTxObject calls (NOT from proxyCall/proxySend typed sites)
  - [ ] `grep -rn 'as any\|as unknown' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` returns zero matches
  - [ ] proxyCallGeneric and proxySendGeneric are exported

  **QA Scenarios**:

  ```
  Scenario: Typed proxyCall catches typo in concrete class
    Tool: Bash
    Preconditions: BaseWrapper.ts has the new overloads
    Steps:
      1. In Accounts.ts, change `'getAttestationSigner'` to `'getAttestationSignerTYPO'` in line 63
      2. Run `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1 | grep TYPO`
      3. MUST show a type error
      4. Revert the change
    Expected Result: Type error on the typo line, mentioning the string doesn't match ContractFunctionName
    Evidence: .sisyphus/evidence/task-2-typo-proxyCall.txt

  Scenario: proxyCallGeneric accepts generic ViemContract without cast
    Tool: Bash
    Steps:
      1. Create a temp .ts file that imports proxyCallGeneric and calls it with ViemContract<TAbi extends Abi>
      2. Run tsc --noEmit on it
      3. MUST compile with zero errors
      4. Delete temp file
    Expected Result: Zero type errors
    Evidence: .sisyphus/evidence/task-2-covariance-proof.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): add proxyCallGeneric/proxySendGeneric, wire proxyCall/proxySend to internal helper`
  - Files: `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`, possibly `packages/sdk/connect/src/index.ts`
  - Pre-commit: `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1 | grep -c "error TS"` (should show errors ONLY from files not yet migrated)

---

- [x] 3. Migrate Erc20Wrapper + CeloTokenWrapper to proxyCallGeneric/proxySendGeneric

  **What to do**:
  - In `Erc20Wrapper.ts`:
    - Import `proxyCallGeneric`, `proxySendGeneric` from `./BaseWrapper`
    - Keep `TAbi extends Abi = typeof ierc20ABI` constraint (communicates intent)
    - Replace ALL `proxyCall(this.contract, ...)` with `proxyCallGeneric(this.contract, ...)`
    - Replace ALL `proxySend(this.connection, this.contract, ...)` with `proxySendGeneric(this.connection, this.contract, ...)`
    - `this.contract` is `ViemContract<TAbi>` where `TAbi extends Abi` → assignable to `ViemContract<readonly unknown[]>` via covariance → ZERO CASTS
  - In `CeloTokenWrapper.ts`:
    - Same pattern: import and use proxyCallGeneric/proxySendGeneric
    - Keep `TAbi extends Abi = typeof goldTokenABI` constraint
  - Verify that GoldTokenWrapper and StableTokenWrapper (concrete subclasses) still use proxyCall/proxySend (typed) for their OWN methods — they should NOT need changes

  **Must NOT do**:
  - Use `as any`, `as unknown as`, or any type assertion
  - Change GoldTokenWrapper or StableTokenWrapper
  - Change the class hierarchy or generic constraints (beyond Abi)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward function name replacement, ~15 lines across 2 files
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (after Task 2)
  - **Blocks**: Tasks 4-11
  - **Blocked By**: Task 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts` — 6 proxyCall/proxySend calls to migrate
  - `packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts` — 4 proxyCall/proxySend calls to migrate
  - `packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts` — verify NO changes needed (concrete, uses typed proxyCall/proxySend)
  - `packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts` — verify NO changes needed (concrete, uses typed proxyCall/proxySend)

  **Acceptance Criteria**:
  - [ ] `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1 | grep 'Erc20Wrapper\|CeloTokenWrapper'` returns zero matches
  - [ ] `grep -n 'as any\|as unknown' packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts` returns zero matches
  - [ ] GoldTokenWrapper and StableTokenWrapper NOT modified (verify with `git diff packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts`)

  **QA Scenarios**:

  ```
  Scenario: Erc20Wrapper compiles without casts
    Tool: Bash
    Steps:
      1. `grep -c 'as any\|as unknown\|proxyCall(' packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts`
      2. Should show 0 for 'as any/unknown', only 'proxyCallGeneric(' calls
    Expected Result: Zero type assertions, only proxyCallGeneric usage
    Evidence: .sisyphus/evidence/task-3-erc20-clean.txt

  Scenario: GoldTokenWrapper typed proxyCall still catches typos
    Tool: Bash
    Steps:
      1. In GoldTokenWrapper.ts, change `'increaseAllowance'` to `'increaseAllowanceTYPO'`
      2. Run tsc --noEmit
      3. MUST show type error
      4. Revert
    Expected Result: Compile error on the typo
    Evidence: .sisyphus/evidence/task-3-goldtoken-typo.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): migrate Erc20Wrapper/CeloTokenWrapper to proxyCallGeneric (zero casts)`
  - Files: `packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts`, `packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts`
  - Pre-commit: `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1 | grep -v 'createViemTxObject' | grep -c 'error TS'` (should be 0 — only createViemTxObject migration errors remain)

---

- [x] 4. Migrate Election.ts — 26 direct createViemTxObject calls to proxyCall/proxySend

  **What to do**:
  - For each `createViemTxObject<T>(...).call()` pattern (read operations):
    - Create a private property: `private _methodName = proxyCall(this.contract, 'methodName', undefined, outputParser)`
    - Replace the inline call with `await this._methodName(args)`
    - The output parser converts the result to the expected type (e.g., `valueToBigNumber`, `stringIdentity`, `identity`)
  - For each `toTransactionObject(conn, createViemTxObject(...))` pattern (write operations):
    - Create a private property: `private _methodName = proxySend(this.connection, this.contract, 'methodName', inputParser?)`
    - Replace the inline call with `this._methodName(args)`
  - Remove `createViemTxObject` import if no longer used
  - Keep ALL existing public method signatures IDENTICAL

  **Must NOT do**:
  - Change any public method signature or return type
  - Use `as any` or `as unknown as`
  - Modify test files

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 26 calls to migrate, mechanical but needs care with output parsers and method argument mapping
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 5-11)
  - **Blocks**: Task 12
  - **Blocked By**: Task 3

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Election.ts` — all 26 createViemTxObject call sites. Run `grep -n createViemTxObject packages/sdk/contractkit/src/wrappers/Election.ts` to list them.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — proxyCall/proxySend signatures and available output parsers (`valueToBigNumber`, `stringIdentity`, `valueToString`, `valueToInt`, `identity`, `tupleParser`)
  - Other wrapper files that already use proxyCall/proxySend property patterns (e.g., `Freezer.ts`, `OdisPayments.ts`) — use as reference for the pattern

  **Acceptance Criteria**:
  - [ ] `grep -c createViemTxObject packages/sdk/contractkit/src/wrappers/Election.ts` returns 1 (import only) or 0
  - [ ] `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1 | grep Election` returns zero errors
  - [ ] `grep -c 'as any\|as unknown' packages/sdk/contractkit/src/wrappers/Election.ts` returns 0

  **QA Scenarios**:

  ```
  Scenario: Election.ts compiles cleanly
    Tool: Bash
    Steps:
      1. Run `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1 | grep Election`
      2. MUST return empty (zero errors)
    Expected Result: Zero type errors in Election.ts
    Evidence: .sisyphus/evidence/task-4-election-tsc.txt

  Scenario: Election method name typo is caught
    Tool: Bash
    Steps:
      1. Change one private proxyCall property's method name to include 'TYPO'
      2. Run tsc --noEmit, verify error
      3. Revert
    Expected Result: Type error on the typo
    Evidence: .sisyphus/evidence/task-4-election-typo.txt
  ```

  **Commit**: YES (groups with Tasks 5-11)
  - Message: `refactor(contractkit): migrate Election.ts createViemTxObject calls to typed proxyCall/proxySend`
  - Files: `packages/sdk/contractkit/src/wrappers/Election.ts`
  - Pre-commit: `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1 | grep Election`

---

- [x] 5. Migrate Validators.ts — 18 direct createViemTxObject calls

  **What to do**: Same pattern as Task 4. Convert all 18 createViemTxObject calls to proxyCall/proxySend properties.

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: `[]`
  **Parallelization**: Wave 3, parallel with Tasks 4,6-11 | **Blocked By**: Task 3 | **Blocks**: Task 12

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Validators.ts` — `grep -n createViemTxObject packages/sdk/contractkit/src/wrappers/Validators.ts`
  - Same BaseWrapper references as Task 4

  **Acceptance Criteria**:
  - [ ] `grep -c createViemTxObject packages/sdk/contractkit/src/wrappers/Validators.ts` ≤ 1
  - [ ] `npx tsc --noEmit 2>&1 | grep Validators` returns zero errors
  - [ ] `grep -c 'as any\|as unknown' packages/sdk/contractkit/src/wrappers/Validators.ts` returns 0

  **QA Scenarios**: Same pattern as Task 4 but for Validators.ts

  **Commit**: YES
  - Message: `refactor(contractkit): migrate Validators.ts createViemTxObject calls to typed proxyCall/proxySend`
  - Files: `packages/sdk/contractkit/src/wrappers/Validators.ts`

---

- [x] 6. Migrate Accounts.ts — 15 direct createViemTxObject calls

  **What to do**: Same pattern as Task 4.

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: `[]`
  **Parallelization**: Wave 3 | **Blocked By**: Task 3 | **Blocks**: Task 12

  **References**: `packages/sdk/contractkit/src/wrappers/Accounts.ts`
  **Acceptance Criteria**: Same pattern. Zero createViemTxObject calls, zero errors, zero casts.
  **Commit**: `refactor(contractkit): migrate Accounts.ts createViemTxObject calls to typed proxyCall/proxySend`

---

- [x] 7. Migrate Governance.ts — 14 direct createViemTxObject calls

  **What to do**: Same pattern as Task 4. Note: Governance.ts also has `proxyCall<[], Address>` explicit type params that were fixed to use `stringIdentity` parser — verify these remain correct.

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: `[]`
  **Parallelization**: Wave 3 | **Blocked By**: Task 3 | **Blocks**: Task 12

  **References**: `packages/sdk/contractkit/src/wrappers/Governance.ts`
  **Acceptance Criteria**: Same pattern.
  **Commit**: `refactor(contractkit): migrate Governance.ts createViemTxObject calls to typed proxyCall/proxySend`

---

- [x] 8. Migrate SortedOracles.ts — 11 direct createViemTxObject calls

  **What to do**: Same pattern as Task 4. Note: SortedOracles has a custom constructor that creates its own ViemContract — verify the contract type is properly typed.

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: `[]`
  **Parallelization**: Wave 3 | **Blocked By**: Task 3 | **Blocks**: Task 12

  **References**: `packages/sdk/contractkit/src/wrappers/SortedOracles.ts`
  **Acceptance Criteria**: Same pattern.
  **Commit**: `refactor(contractkit): migrate SortedOracles.ts createViemTxObject calls to typed proxyCall/proxySend`

---

- [x] 9. Migrate ReleaseGold.ts (10 calls) + MultiSig.ts (10 calls)

  **What to do**: Same pattern as Task 4 for both files.

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: `[]`
  **Parallelization**: Wave 3 | **Blocked By**: Task 3 | **Blocks**: Task 12

  **References**: `packages/sdk/contractkit/src/wrappers/ReleaseGold.ts`, `packages/sdk/contractkit/src/wrappers/MultiSig.ts`
  **Acceptance Criteria**: Same pattern for both files.
  **Commit**: `refactor(contractkit): migrate ReleaseGold.ts + MultiSig.ts createViemTxObject calls to typed proxyCall/proxySend`

---

- [x] 10. Migrate LockedGold.ts — 7 direct createViemTxObject calls

  **What to do**: Same pattern as Task 4.

  **Recommended Agent Profile**: `quick` | **Skills**: `[]`
  **Parallelization**: Wave 3 | **Blocked By**: Task 3 | **Blocks**: Task 12

  **References**: `packages/sdk/contractkit/src/wrappers/LockedGold.ts`
  **Acceptance Criteria**: Same pattern.
  **Commit**: `refactor(contractkit): migrate LockedGold.ts createViemTxObject calls to typed proxyCall/proxySend`

---

- [x] 11. Migrate Attestations.ts (4 calls) + EpochRewards.ts (2 calls) + FederatedAttestations.ts (2 calls)

  **What to do**: Same pattern as Task 4 for all three files.

  **Recommended Agent Profile**: `quick` | **Skills**: `[]`
  **Parallelization**: Wave 3 | **Blocked By**: Task 3 | **Blocks**: Task 12

  **References**: Listed files
  **Acceptance Criteria**: Same pattern for all three.
  **Commit**: `refactor(contractkit): migrate remaining wrapper createViemTxObject calls to typed proxyCall/proxySend`

---

- [x] 12. Full verification: type safety proof + build + test + lint

  **What to do**:
  - **Type safety proof** (CRITICAL):
    1. In Accounts.ts, change a proxyCall method name to `'TYPO'` → tsc MUST error → revert
    2. In Accounts.ts, change a proxySend method name to `'TYPO'` → tsc MUST error → revert
    3. In GoldTokenWrapper.ts, change a proxySend method name to `'TYPO'` → tsc MUST error → revert
    4. Verify NO createViemTxObject calls remain in wrappers: `grep -rn createViemTxObject packages/sdk/contractkit/src/wrappers/*.ts | grep -v 'import\|test\|AbstractFeeCurrency'` → zero matches
    5. Verify NO casts in wrapper files: `grep -rn 'as any\|as unknown' packages/sdk/contractkit/src/wrappers/*.ts | grep -v test` → zero matches
  - **Build**: `yarn workspace @celo/connect run build && yarn workspace @celo/contractkit run build`
  - **Type check downstream**: `npx tsc -p packages/cli/tsconfig.json --noEmit && npx tsc -p packages/sdk/governance/tsconfig.json --noEmit`
  - **Test**: `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
  - **Lint**: `yarn lint && yarn fmt:diff`
  - **Performance**: `time npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit` — must be ≤ 2x baseline (≤ 1.62s, baseline 0.81s)

  **Must NOT do**:
  - Skip any verification step
  - Modify test files to make them pass

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Comprehensive verification across multiple packages, must run ALL checks
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (after ALL migration tasks)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 4-11

  **References**: All files modified in Tasks 1-11

  **Acceptance Criteria**:
  - [ ] ALL Definition of Done items verified (listed in Work Objectives section)

  **QA Scenarios**:

  ```
  Scenario: Type safety — proxyCall typo caught
    Tool: Bash
    Steps:
      1. Edit Accounts.ts: change 'getAttestationSigner' to 'getAttestationSignerTYPO'
      2. Run `npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit 2>&1`
      3. MUST contain error mentioning 'TYPO'
      4. Revert edit
    Expected Result: Compile error on the typo
    Evidence: .sisyphus/evidence/task-12-typo-proxyCall.txt

  Scenario: Type safety — proxySend typo caught
    Tool: Bash
    Steps:
      1. Edit Accounts.ts: change 'authorizeAttestationSigner' in a proxySend call to 'authorizeAttestationSignerTYPO'
      2. Run tsc --noEmit
      3. MUST contain error
      4. Revert
    Expected Result: Compile error
    Evidence: .sisyphus/evidence/task-12-typo-proxySend.txt

  Scenario: Full test suite passes
    Tool: Bash
    Steps:
      1. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
      2. ALL 258 tests must pass
    Expected Result: 258 passing, 0 failing
    Evidence: .sisyphus/evidence/task-12-test-results.txt

  Scenario: Downstream packages compile
    Tool: Bash
    Steps:
      1. Run `npx tsc -p packages/cli/tsconfig.json --noEmit`
      2. Run `npx tsc -p packages/sdk/governance/tsconfig.json --noEmit`
      3. Both must succeed
    Expected Result: Zero errors in both
    Evidence: .sisyphus/evidence/task-12-downstream.txt

  Scenario: No casts in wrapper source files
    Tool: Bash
    Steps:
      1. Run `grep -rn 'as any\|as unknown' packages/sdk/contractkit/src/wrappers/*.ts | grep -v test`
      2. MUST return zero matches
    Expected Result: Zero occurrences of type assertions in wrapper source files
    Evidence: .sisyphus/evidence/task-12-no-casts.txt

  Scenario: Lint and format clean
    Tool: Bash
    Steps:
      1. Run `yarn lint && yarn fmt:diff`
      2. Must exit 0
    Expected Result: Clean
    Evidence: .sisyphus/evidence/task-12-lint.txt
  ```

  **Commit**: NO (verification only, no code changes)

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` for all packages + linter. Review all changed files for: `as any`/`as unknown`, empty catches, console.log in prod, commented-out code. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high`
  Execute EVERY type-safety QA scenario: introduce typos in 3 different concrete wrappers, verify all caught. Test that proxyCallGeneric works in Erc20Wrapper. Test that untyped callers (CLI) still compile.
  Output: `Scenarios [N/N pass] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | VERDICT`

---

## Commit Strategy

| Order | Message | Files |
|-------|---------|-------|
| 1 | `refactor(connect): remove escape-hatch overload from createViemTxObject, add internal helper` | viem-tx-object.ts |
| 2 | `refactor(contractkit): add proxyCallGeneric/proxySendGeneric, wire implementations to internal helper` | BaseWrapper.ts, possibly connect/index.ts |
| 3 | `refactor(contractkit): migrate Erc20Wrapper/CeloTokenWrapper to proxyCallGeneric (zero casts)` | Erc20Wrapper.ts, CeloTokenWrapper.ts |
| 4-11 | `refactor(contractkit): migrate <file> createViemTxObject calls to typed proxyCall/proxySend` | One commit per task |

---

## Success Criteria

### Verification Commands
```bash
# Type check
npx tsc -p packages/sdk/contractkit/tsconfig.json --noEmit  # Expected: 0 errors

# Type safety proof
# (introduce typo, verify error, revert)

# Tests
RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test  # Expected: 258 passing

# Downstream
npx tsc -p packages/cli/tsconfig.json --noEmit  # Expected: 0 errors
npx tsc -p packages/sdk/governance/tsconfig.json --noEmit  # Expected: 0 errors

# Lint
yarn lint && yarn fmt:diff  # Expected: clean

# No casts
grep -rn 'as any\|as unknown' packages/sdk/contractkit/src/wrappers/*.ts | grep -v test  # Expected: 0 matches

# No createViemTxObject in wrappers
grep -rn createViemTxObject packages/sdk/contractkit/src/wrappers/*.ts | grep -v 'import\|test\|AbstractFeeCurrency'  # Expected: 0 matches
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] All tests pass
- [x] Type safety PROVEN (typos caught at compile time)
- [x] Zero casts at any call site
