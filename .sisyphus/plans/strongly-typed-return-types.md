# Strongly-Typed Return Types — Replace Decoder with viem Native `decodeFunctionResult`

## TL;DR

> **Quick Summary**: Replace the legacy `viemAbiCoder.decodeParameters` decoder in `createViemTxObjectInternal` with viem's native `decodeFunctionResult`, then constrain the `PreParsedOutput` generic in proxyCall overloads to `ContractFunctionReturnType`, and update all ~50 output parsers across 24 wrapper files to accept properly typed return values instead of `any`.
>
> **Deliverables**:
> - `viem-tx-object.ts` uses `decodeFunctionResult` instead of `viemAbiCoder.decodeParameters`
> - `PreParsedOutput` in proxyCall typed overloads becomes `ContractFunctionReturnType<TAbi, 'view'|'pure', TFunctionName>`
> - All 13 `(res: any)` output parsers replaced with strongly typed versions
> - All 9 manually-typed parsers updated to use ABI-derived types
> - All ~30 simple helper parsers (valueToBigNumber etc.) verified working with native bigint
> - Zero `as any` or `as unknown as X` at any call site
> - All 258 tests passing, snapshots updated
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Tasks 4-11 (parallel) → Task 12 → Task 13 → Final Wave

---

## Context

### Original Request
User requested "Option A — no shortcuts, no shims, if architecture is not ok just burn it and rebuild it" for making proxyCall output parsers strongly typed via viem's `ContractFunctionReturnType`.

### Interview Summary
**Key Discussions**:
- This is the 3rd plan in a series: `strongly-typed-contracts` (typed ABIs) → `typed-overload-fix` (typed function names) → **this plan** (typed return values)
- The remaining gap: `PreParsedOutput` in proxyCall overloads is a free generic parameter, not constrained by ABI return types
- ~13 output parsers use `(res: any)`, ~9 use manually specified object shapes, ~30+ use helper functions
- User explicitly forbids `as any`, `as unknown as X`, shims, or shortcuts

**Research Findings**:
- viem's `decodeFunctionResult`: auto-unwraps single returns, returns readonly tuples for multi-returns, native bigint (not string)
- `ContractFunctionReturnType`: resolves to unwrapped type for single, readonly tuple for multi, void for none
- All `valueToX` helpers accept bigint natively (BigNumber.Value includes bigint) — ONLY `parseInt(bigint)` breaks (1 instance in EpochManager.ts)
- Array indexing `res[0]` works on both arrays and objects — existing parser code survives format change
- 258 tests passing, 12 inline snapshots, 144 return value assertions — snapshots will need updating

### Gap Analysis (Self-conducted)
**Identified Gaps** (addressed in plan):
- `parseInt()` in EpochManager.ts line 60 will break with bigint → fixed by replacing with `Number()` or `valueToInt()`
- Passthrough calls (no parser) will return different types at runtime → addressed by ensuring wrapper type annotations are correct
- `viem-abi-coder.ts` exports used by BaseWrapper.ts (line 12) → must verify no other consumers before considering cleanup
- `createViemTxObjectInternal` currently returns `CeloTxObject<unknown>` → must thread `ContractFunctionReturnType` through return type
- `DecodedParamsObject` type and `__length__` property no longer relevant → must check no other consumers

---

## Work Objectives

### Core Objective
Replace the legacy decode pipeline (`viemAbiCoder.decodeParameters` + `bigintToString` + manual single-value unwrapping + `__length__` stripping) with viem's native `decodeFunctionResult`, achieving compile-time type safety from ABI definition through to output parser parameter types.

### Concrete Deliverables
- `packages/sdk/connect/src/viem-tx-object.ts` — `call()` uses `decodeFunctionResult` instead of `viemAbiCoder.decodeParameters`
- `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — proxyCall typed overloads constrain `PreParsedOutput` to `ContractFunctionReturnType`
- All 24 wrapper files — output parsers accept ABI-derived types instead of `any`
- `packages/sdk/connect/src/viem-abi-coder.ts` — `decodeParameters` removed or deprecated (if no other consumers)
- All 258 contractkit tests pass, 12 snapshots updated

### Definition of Done
- [x] `tsc --noEmit` passes for connect, contractkit, CLI, governance with zero errors
- [x] `yarn workspace @celo/contractkit run test` → 258 tests pass
- [x] `yarn workspace @celo/connect run test` → all tests pass
- [x] `yarn lint` → no new warnings
- [x] Zero `as any` or `as unknown as X` in any changed file (grep verification)
- [x] Every `proxyCall` with a typed contract + output parser has `PreParsedOutput` = `ContractFunctionReturnType`

### Must Have
- Full compile-time type safety: typo in parser property access → compile error
- Native bigint values from viem (no string conversion shim)
- All existing public API return types preserved (`Promise<BigNumber>`, `Promise<number>`, etc.)
- All 258 tests passing

### Must NOT Have (Guardrails)
- NO `as any`, `as unknown as X` at any proxyCall call site or in any output parser
- NO changes to CLI files (`packages/cli/`)
- NO changes to `ProposalBuilder` or DKG code
- NO changes to `AbstractFeeCurrencyWrapper` (inline ABI, out of scope)
- NO changes to public API return types
- NO backward-compatibility shim wrapping `decodeFunctionResult` output to look like `decodeParameters` format
- NO adding `bigintToString()` calls anywhere — native bigint must flow through
- NO over-abstraction: simple inline parsers should stay inline, don't extract to utility functions unnecessarily
- NO unnecessary JSDoc additions — keep comment style matching existing codebase

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Jest, 258 tests, inline snapshots)
- **Automated tests**: YES (tests-after — update snapshots, fix failures)
- **Framework**: Jest (`yarn workspace @celo/contractkit run test`)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Type safety**: `tsc --noEmit` for connect + contractkit + CLI + governance
- **Tests**: `yarn workspace @celo/contractkit run test` and `yarn workspace @celo/connect run test`
- **Lint**: `yarn lint`
- **Grep audits**: Zero `as any` in changed files

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — sequential, 3 tasks):
├── Task 1: Replace decoder in viem-tx-object.ts [deep]
├── Task 2: Update proxyCall/proxyCallGeneric overloads in BaseWrapper.ts [deep]
└── Task 3: Fix EpochManager parseInt + verify valueToX helpers with bigint [quick]

Wave 2 (Wrapper updates — MAX PARALLEL, 8 tasks):
├── Task 4: Governance.ts output parsers (depends: 1, 2) [unspecified-high]
├── Task 5: Validators.ts output parsers (depends: 1, 2) [unspecified-high]
├── Task 6: Attestations.ts output parsers (depends: 1, 2) [unspecified-high]
├── Task 7: EpochManager.ts + EpochRewards.ts output parsers (depends: 1, 2, 3) [unspecified-high]
├── Task 8: Election.ts + SortedOracles.ts output parsers (depends: 1, 2) [unspecified-high]
├── Task 9: Accounts.ts + Escrow.ts + FederatedAttestations.ts output parsers (depends: 1, 2) [unspecified-high]
├── Task 10: Reserve.ts + MultiSig.ts + OdisPayments.ts + ScoreManager.ts output parsers (depends: 1, 2) [unspecified-high]
└── Task 11: FeeCurrencyDirectoryWrapper.ts + Freezer.ts + FeeHandler.ts + token wrappers (depends: 1, 2) [unspecified-high]

Wave 3 (Integration + Cleanup — 2 tasks):
├── Task 12: Full build + type check across all downstream packages (depends: 4-11) [deep]
└── Task 13: Update snapshots + run full test suite + fix failures (depends: 12) [deep]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 2 → Tasks 4-11 (parallel) → Task 12 → Task 13 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 8 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 2, 3, 4-11 | 1 |
| 2 | 1 | 4-11 | 1 |
| 3 | 1 | 7 | 1 |
| 4-11 | 1, 2 | 12 | 2 |
| 12 | 4-11 | 13 | 3 |
| 13 | 12 | F1-F4 | 3 |
| F1-F4 | 13 | — | FINAL |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1 → `deep`, T2 → `deep`, T3 → `quick`
- **Wave 2**: 8 tasks — T4-T11 → `unspecified-high`
- **Wave 3**: 2 tasks — T12 → `deep`, T13 → `deep`
- **Wave FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs


- [x] 1. Replace decoder in `viem-tx-object.ts` with viem's `decodeFunctionResult`

  **What to do**:
  - In `packages/sdk/connect/src/viem-tx-object.ts`, replace the `call()` method body (lines 51-71):
    - Remove the dynamic `import('./viem-abi-coder')` call (line 66)
    - Remove `viemAbiCoder.decodeParameters(methodAbi.outputs, result.data)` (line 67)
    - Remove the manual single-value unwrapping `if (methodAbi.outputs.length === 1) return decoded[0]` (line 68)
    - Remove the `__length__` stripping `const { __length__, ...rest } = decoded` (line 69)
    - Replace ALL of the above with a single call to viem's `decodeFunctionResult`:
      ```typescript
      import { decodeFunctionResult } from 'viem'
      // inside call():
      return decodeFunctionResult({
        abi: contract.abi as Abi,
        functionName: functionName as ContractFunctionName<Abi>,
        data: result.data,
      })
      ```
  - Add `decodeFunctionResult` to the viem import at line 2 (alongside `encodeFunctionData`)
  - Add `Abi` to the type import at line 1 if not already present
  - The `encodeData` and `send` and `estimateGas` methods remain UNCHANGED
  - The `ContractRef` interface remains UNCHANGED
  - Both overloads of `createViemTxObject` remain UNCHANGED

  **Must NOT do**:
  - Do NOT add any `bigintToString()` conversion — native bigint must flow through
  - Do NOT change the `send()`, `estimateGas()`, or `encodeABI()` methods
  - Do NOT change the `createViemTxObject` overload signatures
  - Do NOT change `CeloTxObject<unknown>` return type yet (this is addressed in overloads)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core architectural change requiring precise understanding of decoder behavior differences
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser interaction needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (sequential foundation)
  - **Blocks**: Tasks 2, 3, 4-11
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `packages/sdk/connect/src/viem-tx-object.ts:51-71` — Current `call()` implementation with `viemAbiCoder.decodeParameters`. This is the EXACT code to replace.
  - `packages/sdk/connect/src/viem-abi-coder.ts:167-183` — Current `decodeParameters` implementation showing `bigintToString` conversion and `__length__` metadata. Understand what you're removing.
  - `packages/sdk/connect/src/viem-abi-coder.ts:66-74` — `bigintToString` function that converts bigint→string recursively. This conversion is being ELIMINATED.

  **API/Type References**:
  - `node_modules/viem/utils/abi/decodeFunctionResult.ts` — viem's native decoder. Single return → unwrapped value. Multi return → readonly tuple. No `__length__`.
  - `packages/sdk/connect/src/types.ts:61-79` — `CeloTxObject<T>` interface. The `call()` method returns `Promise<T>`. Currently T=unknown.
  - `packages/sdk/connect/src/viem-tx-object.ts:15-18` — `ContractRef` interface (abi + address). Stays unchanged.

  **WHY Each Reference Matters**:
  - viem-tx-object.ts:51-71 — This is the ONLY place you're editing. Read the full `call()` method to understand the flow.
  - viem-abi-coder.ts:167-183 — Understand the OLD decoder so you know what behavior you're replacing (bigint→string, __length__, manual unwrapping).
  - decodeFunctionResult.ts — Understand the NEW decoder behavior: auto-unwraps single returns, returns arrays for multi, keeps native bigint.

  **Acceptance Criteria**:
  - [x] `decodeFunctionResult` imported and used in `call()` method
  - [x] `viemAbiCoder.decodeParameters` no longer called in viem-tx-object.ts
  - [x] No `bigintToString` anywhere in viem-tx-object.ts
  - [x] No `__length__` destructuring in viem-tx-object.ts
  - [x] `yarn workspace @celo/connect run build` passes

  **QA Scenarios:**

  ```
  Scenario: Verify decoder replacement compiles
    Tool: Bash
    Preconditions: Task changes applied
    Steps:
      1. Run `yarn workspace @celo/connect run build`
      2. Check exit code is 0
      3. Run `grep -n 'viemAbiCoder.decodeParameters' packages/sdk/connect/src/viem-tx-object.ts`
      4. Verify grep returns no results (exit code 1)
      5. Run `grep -n 'decodeFunctionResult' packages/sdk/connect/src/viem-tx-object.ts`
      6. Verify grep returns at least 1 match
    Expected Result: Build succeeds, old decoder gone, new decoder present
    Failure Indicators: Build fails with type errors, or old decoder still present
    Evidence: .sisyphus/evidence/task-1-decoder-replacement.txt

  Scenario: Verify no bigintToString shim added
    Tool: Bash
    Preconditions: Task changes applied
    Steps:
      1. Run `grep -n 'bigintToString' packages/sdk/connect/src/viem-tx-object.ts`
      2. Verify grep returns no results (exit code 1)
    Expected Result: Zero occurrences of bigintToString in viem-tx-object.ts
    Failure Indicators: Any match found
    Evidence: .sisyphus/evidence/task-1-no-biginttostring.txt
  ```

  **Evidence to Capture:**
  - [x] task-1-decoder-replacement.txt — build output + grep results
  - [x] task-1-no-biginttostring.txt — grep output confirming no shim

  **Commit**: YES (group with Task 2, 3)
  - Message: `refactor(connect): replace viemAbiCoder.decodeParameters with viem decodeFunctionResult`
  - Files: `packages/sdk/connect/src/viem-tx-object.ts`
  - Pre-commit: `yarn workspace @celo/connect run build`

- [x] 2. Constrain `PreParsedOutput` in proxyCall typed overloads to `ContractFunctionReturnType`

  **What to do**:
  - In `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`, update the 4 TYPED proxyCall overloads (lines 305-355):
    - Replace the free `PreParsedOutput` generic parameter with `ContractFunctionReturnType<TAbi, 'view' | 'pure', TFunctionName>`
    - In overloads that have `parseOutput: (o: PreParsedOutput) => Output`, change to `parseOutput: (o: ContractFunctionReturnType<TAbi, 'view' | 'pure', TFunctionName>) => Output`
    - In overloads WITHOUT an output parser, the return type should now be `Promise<ContractFunctionReturnType<TAbi, 'view' | 'pure', TFunctionName>>`
  - Update the UNTYPED proxyCall overloads (lines 357-397) to keep `PreParsedOutput` as-is (backward compat for dynamic callers)
  - Update `proxyCallGeneric` overloads (lines 467-505) similarly — keep `PreParsedOutput` free since TAbi is unresolved in generic classes
  - Add `import type { ContractFunctionReturnType } from 'viem'` to BaseWrapper.ts imports
  - Do NOT touch `proxySend` or `proxySendGeneric` — they don't have output parsers
  - Do NOT touch `proxyCallGenericImpl` implementation (lines 536-565) — only the overload signatures change

  **Must NOT do**:
  - Do NOT modify the implementation functions (`proxyCallGenericImpl`, `proxySendGenericImpl`)
  - Do NOT add `as any` or `as unknown as X` anywhere
  - Do NOT change untyped overloads (AbiItem[] contract type) — these are for backward compat
  - Do NOT change `proxyCallGeneric` overloads (used by generic intermediate classes)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex TypeScript generics requiring precise understanding of overload resolution and viem type system
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 1)
  - **Parallel Group**: Wave 1 (sequential)
  - **Blocks**: Tasks 4-11
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:305-355` — Current typed proxyCall overloads. These are the EXACT signatures to modify.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:357-397` — Untyped overloads. Do NOT change these.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:467-505` — proxyCallGeneric overloads. Do NOT change these (TAbi is unresolved generic).
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:536-565` — `proxyCallGenericImpl`. Do NOT change implementation.

  **API/Type References**:
  - `node_modules/viem/types/contract.ts:217-246` — `ContractFunctionReturnType` definition. Single → unwrapped, Multi → readonly tuple, None → void.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:20-23` — `ContractLike<TAbi>` interface.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:13` — Current viem type imports (add `ContractFunctionReturnType` here).

  **WHY Each Reference Matters**:
  - BaseWrapper.ts:305-355 — These overloads define the type contract between proxyCall and wrapper call sites. Changing `PreParsedOutput` here makes parsers receive typed values.
  - viem ContractFunctionReturnType — This is the TARGET type. Understand how it resolves for single vs multi returns to get the overloads right.
  - BaseWrapper.ts:357-397 — These MUST stay unchanged. If you accidentally modify them, CLI and dynamic callers will break.

  **Acceptance Criteria**:
  - [x] `ContractFunctionReturnType` imported in BaseWrapper.ts
  - [x] Typed proxyCall overloads use `ContractFunctionReturnType<TAbi, 'view' | 'pure', TFunctionName>` instead of free `PreParsedOutput`
  - [x] Untyped overloads unchanged
  - [x] proxyCallGeneric overloads unchanged
  - [x] `yarn workspace @celo/contractkit run build` passes (or shows only expected errors in wrapper files that need Task 4-11 updates)

  **QA Scenarios:**

  ```
  Scenario: Verify overload signatures constrain PreParsedOutput
    Tool: Bash
    Preconditions: Task 1 and 2 changes applied
    Steps:
      1. Run `grep -n 'ContractFunctionReturnType' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
      2. Verify at least 4 matches (one per typed overload with output parser)
      3. Run `grep -c 'PreParsedOutput' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
      4. Verify count is LOWER than before (PreParsedOutput removed from typed overloads but may remain in untyped/generic)
    Expected Result: ContractFunctionReturnType present in typed overloads, PreParsedOutput only in untyped/generic
    Failure Indicators: Zero matches for ContractFunctionReturnType, or PreParsedOutput still in typed overloads
    Evidence: .sisyphus/evidence/task-2-overload-types.txt

  Scenario: Verify untyped overloads unchanged
    Tool: Bash
    Preconditions: Task 2 changes applied
    Steps:
      1. Run `git diff packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
      2. Verify diff does NOT include changes to lines 357-397 (untyped overloads)
      3. Verify diff does NOT include changes to lines 467-505 (proxyCallGeneric)
      4. Verify diff does NOT include changes to lines 536-583 (impl functions)
    Expected Result: Only typed overloads (lines 305-355) and imports changed
    Failure Indicators: Changes outside typed overloads or imports
    Evidence: .sisyphus/evidence/task-2-diff-scope.txt
  ```

  **Evidence to Capture:**
  - [x] task-2-overload-types.txt — grep results showing ContractFunctionReturnType usage
  - [x] task-2-diff-scope.txt — git diff showing only typed overloads changed

  **Commit**: YES (group with Task 1, 3)
  - Message: `refactor(connect): replace viemAbiCoder.decodeParameters with viem decodeFunctionResult`
  - Files: `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
  - Pre-commit: `yarn workspace @celo/connect run build`

- [x] 3. Fix EpochManager `parseInt()` and verify valueToX helpers with bigint

  **What to do**:
  - In `packages/sdk/contractkit/src/wrappers/EpochManager.ts`, line 60:
    - Replace `parseInt(result.status)` with `Number(result.status)` or `valueToInt(result.status)`
    - `parseInt(bigint)` returns NaN, but `Number(bigint)` and `valueToInt(bigint)` both work correctly
  - Verify that `valueToBigNumber`, `valueToInt`, `valueToString`, `valueToFrac`, `fixidityValueToBigNumber` all accept bigint:
    - Read their definitions in BaseWrapper.ts:169-182
    - They use `BigNumber.Value` which includes `bigint` — should work
  - Check if `fromFixed` from `@celo/utils/lib/fixidity` accepts BigNumber constructed from bigint

  **Must NOT do**:
  - Do NOT add `bigintToString` conversion
  - Do NOT change the public return type of `getEpochProcessingStatus`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line fix + verification of existing helper functions
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 7
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts:54-70` — `getEpochProcessingStatus` parser. Line 60 has `parseInt(result.status)` which breaks with bigint.
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:169-182` — All valueToX helper definitions. Verify they accept bigint.

  **API/Type References**:
  - BigNumber.js docs — `BigNumber.Value` = `string | number | bigint | BigNumber`

  **WHY Each Reference Matters**:
  - EpochManager.ts:60 — This is the ONLY `parseInt()` call on decoded values in the entire codebase. It's the only breaking change from the bigint switch.
  - BaseWrapper.ts:169-182 — Confirm these helpers accept bigint natively. If any don't, they need updating too.

  **Acceptance Criteria**:
  - [x] `parseInt(result.status)` replaced with `Number(result.status)` or `valueToInt(result.status)`
  - [x] No `parseInt()` calls on decoded contract values in any wrapper file
  - [x] `yarn workspace @celo/contractkit run build` does not fail on EpochManager.ts

  **QA Scenarios:**

  ```
  Scenario: Verify parseInt removal
    Tool: Bash
    Preconditions: Task 3 changes applied
    Steps:
      1. Run `grep -n 'parseInt' packages/sdk/contractkit/src/wrappers/EpochManager.ts`
      2. Verify zero results
      3. Run `grep -rn 'parseInt.*result\|parseInt.*res\[\|parseInt.*stat' packages/sdk/contractkit/src/wrappers/*.ts`
      4. Verify zero results (no parseInt on decoded values anywhere)
    Expected Result: Zero parseInt calls on decoded contract values
    Failure Indicators: Any match found
    Evidence: .sisyphus/evidence/task-3-parseint-removed.txt
  ```

  **Evidence to Capture:**
  - [x] task-3-parseint-removed.txt — grep results confirming no parseInt on decoded values

  **Commit**: YES (group with Task 1, 2)
  - Message: `refactor(connect): replace viemAbiCoder.decodeParameters with viem decodeFunctionResult`
  - Files: `packages/sdk/contractkit/src/wrappers/EpochManager.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run build`

- [x] 4. Strongly type Governance.ts output parsers (5 `any` parsers + 3 manual parsers)

  **What to do**:
  - Replace ALL `(res: any)` output parsers with types derived from viem's `ContractFunctionReturnType`:
    - Line 410: `getProposalMetadata` — `(res: any)` accesses `res[0]` through `res[4]`. Type should be the return tuple of `getProposal(uint256)` from governanceABI.
    - Line 443: `getProposalTransaction` — `(res: any)` accesses `res[0]`, `res[1]`, `res[2]`. Type should be return tuple of `getProposalTransaction(uint256, uint256)`.
    - Line 664: `getUpvoteRecord` — `(o: any)` accesses `o[0]`, `o[1]`. Type should be return tuple of `getUpvoteRecord(address)`.
    - Line 738: `getVotes` — `(res: any)` accesses `res[0]`, `res[1]`, `res[2]`. Type should be return tuple of `getVoteTotals(uint256)`.
    - Line 752: `getQueue` — `(arraysObject: any)` accesses `arraysObject[0]`, `arraysObject[1]`. Type should be return tuple of `getQueue()`.
  - Replace manually typed parsers with ABI-derived types:
    - Line 171: `_stageDurations` — `(res: { 0: string; 1: string; 2: string })` should use return type of `stageDurations()`. With viem, this will be a `readonly [bigint, bigint, bigint]` tuple.
    - Line 186: `_getParticipationParameters` — `(res: { 0: string; 1: string; 2: string; 3: string })` should use return type of `getParticipationParameters()`.
    - Line 215: `_getHotfixRecord` — `(res: { 0: boolean; 1: boolean; 2: boolean; 3: string })` should use return type of `getHotfixRecord(bytes32)`.
  - For each parser, the new type will be a readonly tuple (e.g., `readonly [string, bigint, bigint, bigint, string]`) — update index access and conversion calls accordingly:
    - Values that were `string` (from bigintToString) will now be `bigint` — `valueToBigNumber(res[1])` still works since BigNumber accepts bigint
    - `valueToInt(res[3])` still works since BigNumber.Value includes bigint
    - Address values remain `string` (`0x${string}`)
    - Boolean values remain `boolean`

  **Must NOT do**:
  - Do NOT use `as any` or type assertions to work around type errors
  - Do NOT change public return types (`ProposalMetadata`, `ProposalTransaction`, `UpvoteRecord`, `Votes`, `HotfixRecord`)
  - Do NOT modify `_upvote`, `_revokeUpvote`, `_approve`, `_voteSend`, `_votePartially`, `_execute` (proxySend calls)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple parser updates in a complex file requiring ABI type knowledge
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5-11)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/Governance.ts:171-225` — All manually-typed parsers (_stageDurations, _getParticipationParameters, _getHotfixRecord)
  - `packages/sdk/contractkit/src/wrappers/Governance.ts:410-452` — `getProposalMetadata` and `getProposalTransaction` parsers with `(res: any)`
  - `packages/sdk/contractkit/src/wrappers/Governance.ts:664-761` — `getUpvoteRecord`, `getVotes`, `getQueue` parsers with `(res: any)` / `(o: any)` / `(arraysObject: any)`

  **API/Type References**:
  - `node_modules/@celo/abis/` — `governanceABI` const-typed ABI. Use this to determine exact return types for each function.
  - `packages/sdk/contractkit/src/wrappers/Governance.ts:1-50` — Existing type imports and interface definitions (`ProposalMetadata`, `Votes`, etc.)

  **Acceptance Criteria**:
  - [x] Zero `(res: any)` or `(o: any)` or `(arraysObject: any)` in Governance.ts output parsers
  - [x] All 8 parsers use ABI-derived types (readonly tuples or ContractFunctionReturnType)
  - [x] `tsc --noEmit` for contractkit shows no new errors in Governance.ts

  **QA Scenarios:**

  ```
  Scenario: Zero any-typed output parsers in Governance.ts
    Tool: Bash
    Preconditions: Task 4 changes applied
    Steps:
      1. Run `grep -n '(res: any)\|(o: any)\|(arraysObject: any)\|(state: any)\|(stat: any)\|(result: any)' packages/sdk/contractkit/src/wrappers/Governance.ts`
      2. Verify zero results
    Expected Result: No any-typed output parser parameters
    Failure Indicators: Any match found
    Evidence: .sisyphus/evidence/task-4-governance-no-any.txt

  Scenario: Governance.ts compiles cleanly
    Tool: Bash
    Preconditions: Tasks 1, 2, 4 applied
    Steps:
      1. Run `npx tsc --noEmit -p packages/sdk/contractkit/tsconfig.json 2>&1 | grep -i 'Governance'`
      2. Verify zero error lines mentioning Governance
    Expected Result: No type errors in Governance.ts
    Failure Indicators: Type error lines mentioning Governance.ts
    Evidence: .sisyphus/evidence/task-4-governance-tsc.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type Governance.ts output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/Governance.ts`

- [x] 5. Strongly type Validators.ts output parsers (1 `any` parser + 3 manual parsers)

  **What to do**:
  - Replace `(res: any)` in `getValidatorMembershipHistoryExtraData` (line 481):
    - Type should be return tuple of `getMembershipHistory(address)` from validatorsABI
    - This is a multi-return function — viem returns `readonly [string[], string[], bigint, bigint]`
    - Parser accesses `res[2]` and `res[3]` with `valueToInt()`
  - Replace manually typed parsers:
    - Line 82: `_getValidatorLockedGoldRequirements` — `(res: { 0: string; 1: string })` → use ABI return type
    - Line 92: `_getGroupLockedGoldRequirements` — `(res: { 0: string; 1: string })` → use ABI return type
    - Line 462: `getValidatorMembershipHistory` — `(res: { 0: string[]; 1: string[] })` → use ABI return type

  **Must NOT do**:
  - Do NOT change public return types (`GroupMembership[]`, `MembershipHistoryExtraData`, `LockedGoldRequirements`)
  - Do NOT use `as any`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6-11)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Validators.ts:82-96` — `_getValidatorLockedGoldRequirements` and `_getGroupLockedGoldRequirements` with manual `{ 0: string; 1: string }` types
  - `packages/sdk/contractkit/src/wrappers/Validators.ts:462-490` — `getValidatorMembershipHistory` and `getValidatorMembershipHistoryExtraData` parsers
  - `node_modules/@celo/abis/` — `validatorsABI` for exact return types

  **Acceptance Criteria**:
  - [x] Zero `any` in Validators.ts output parsers
  - [x] All 4 parsers use ABI-derived types
  - [x] No manual `{ 0: string; 1: string }` shapes in parser parameters

  **QA Scenarios:**
  ```
  Scenario: Zero any-typed output parsers in Validators.ts
    Tool: Bash
    Steps:
      1. Run `grep -n '(res: any)' packages/sdk/contractkit/src/wrappers/Validators.ts`
      2. Verify zero results
    Expected Result: No any-typed output parser parameters
    Evidence: .sisyphus/evidence/task-5-validators-no-any.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type Validators.ts output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/Validators.ts`

- [x] 6. Strongly type Attestations.ts output parsers (3 `any` parsers)

  **What to do**:
  - Replace ALL `(res: any)` / `(state: any)` / `(stat: any)` parsers:
    - Line 108: `getUnselectedRequest` — `(res: any)` → use return type of `getUnselectedRequest(string, address)` from attestationsABI
    - Line 153: `getAttestationState` — `(state: any)` → use return type of `getAttestationState(string, address, address)`
    - Line 162: `getAttestationStat` — `(stat: any)` → use return type of `getAttestationStats(string, address)`
  - These functions return multi-value tuples — viem returns readonly tuples with bigint for uint types

  **Must NOT do**:
  - Do NOT change public return types (`AttestationStateForIssuer`, `AttestationStat`)
  - Do NOT use `as any`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Attestations.ts:108-170` — All 3 output parsers with `any`
  - `node_modules/@celo/abis/` — `attestationsABI` for exact return types

  **Acceptance Criteria**:
  - [x] Zero `any` in Attestations.ts output parsers
  - [x] All 3 parsers use ABI-derived types

  **QA Scenarios:**
  ```
  Scenario: Zero any-typed output parsers in Attestations.ts
    Tool: Bash
    Steps:
      1. Run `grep -n '(res: any)\|(state: any)\|(stat: any)' packages/sdk/contractkit/src/wrappers/Attestations.ts`
      2. Verify zero results
    Expected Result: No any-typed output parser parameters
    Evidence: .sisyphus/evidence/task-6-attestations-no-any.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type Attestations.ts output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/Attestations.ts`

- [x] 7. Strongly type EpochManager.ts + EpochRewards.ts output parsers (1 + 2 `any` parsers)

  **What to do**:
  - **EpochManager.ts**:
    - Line 54: `getEpochProcessingStatus` — `(result: any)` → use return type of `getEpochProcessingState()` from epochManagerABI
    - Parser accesses `result.status`, `result.perValidatorReward`, etc. — with viem these will be tuple positional access
    - The `parseInt(result.status)` was already fixed in Task 3 — this task updates the TYPE of the parser parameter
  - **EpochRewards.ts**:
    - Line 8: `getRewardsMultiplierParameters` — `(res: any)` → use return type of `getRewardsMultiplierParameters()`
    - Line 19: `getTargetVotingYieldParameters` — `(res: any)` → use return type of `getTargetVotingYieldParameters()`
    - Both parsers use `fromFixed()` on the values — `fromFixed(new BigNumber(bigint))` works correctly

  **Must NOT do**:
  - Do NOT use `as any`
  - Do NOT change public return types

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts:54-70` — `getEpochProcessingStatus` parser
  - `packages/sdk/contractkit/src/wrappers/EpochRewards.ts:8-28` — Both `any` parsers
  - `node_modules/@celo/abis/` — `epochManagerABI`, `epochRewardsABI`

  **Acceptance Criteria**:
  - [x] Zero `(result: any)` in EpochManager.ts
  - [x] Zero `(res: any)` in EpochRewards.ts
  - [x] Both files compile cleanly

  **QA Scenarios:**
  ```
  Scenario: Zero any-typed output parsers in EpochManager + EpochRewards
    Tool: Bash
    Steps:
      1. Run `grep -n '(result: any)\|(res: any)' packages/sdk/contractkit/src/wrappers/EpochManager.ts packages/sdk/contractkit/src/wrappers/EpochRewards.ts`
      2. Verify zero results
    Expected Result: No any-typed output parser parameters in either file
    Evidence: .sisyphus/evidence/task-7-epoch-no-any.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type EpochManager + EpochRewards output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/EpochManager.ts`, `packages/sdk/contractkit/src/wrappers/EpochRewards.ts`

- [x] 8. Strongly type Election.ts + SortedOracles.ts output parsers (1 manual + 1 any-spread)

  **What to do**:
  - **Election.ts**:
    - Line 75: `_electableValidators` — `(res: { min: string; max: string })` → use return type of `electableValidators()` from electionABI
    - With viem, this returns `readonly [bigint, bigint]` — update to `(res: readonly [bigint, bigint])` and access `res[0]`, `res[1]`
  - **SortedOracles.ts**:
    - Line 80: `_medianRate` — `(...args: any[])` on the property type (not the parser). Check if there's an actual output parser or just passthrough.
    - Verify all other parsers in SortedOracles.ts (valueToInt, valueToBigNumber) work with bigint — they should.

  **Must NOT do**:
  - Do NOT change public return types
  - Do NOT use `as any`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Election.ts:75-83` — `_electableValidators` manual type
  - `packages/sdk/contractkit/src/wrappers/SortedOracles.ts:68-135` — All proxyCall usages
  - `node_modules/@celo/abis/` — `electionABI`, `sortedOraclesABI`

  **Acceptance Criteria**:
  - [x] No manual object shapes in Election.ts parsers
  - [x] All SortedOracles.ts parsers verified working with bigint

  **QA Scenarios:**
  ```
  Scenario: No manual shapes in Election + SortedOracles
    Tool: Bash
    Steps:
      1. Run `grep -n '{ min: string' packages/sdk/contractkit/src/wrappers/Election.ts`
      2. Verify zero results
    Expected Result: No manual object shapes in parser params
    Evidence: .sisyphus/evidence/task-8-election-sorted.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type Election + SortedOracles output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/Election.ts`, `packages/sdk/contractkit/src/wrappers/SortedOracles.ts`

- [x] 9. Strongly type Accounts.ts + Escrow.ts + FederatedAttestations.ts output parsers

  **What to do**:
  - **Accounts.ts**:
    - Line 398: `getDataEncryptionKey` — `(res: any)` → use return type of `getDataEncryptionKey(address)` from accountsABI
    - This is a single-return bytes function — viem will return a `0x${string}` directly (unwrapped)
  - **Escrow.ts**: Verify all passthrough calls return correct types with new decoder. No explicit parsers to update.
  - **FederatedAttestations.ts**: Verify all passthrough calls return correct types. No explicit parsers to update.

  **Must NOT do**:
  - Do NOT change public return types
  - Do NOT use `as any`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Accounts.ts:398-404` — `getDataEncryptionKey` with `(res: any)`
  - `packages/sdk/contractkit/src/wrappers/Escrow.ts` — Passthrough calls, no explicit parsers
  - `packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts` — Passthrough calls
  - `node_modules/@celo/abis/` — `accountsABI`, `escrowABI`, `federatedAttestationsABI`

  **Acceptance Criteria**:
  - [x] Zero `(res: any)` in Accounts.ts output parsers
  - [x] All three files compile cleanly

  **QA Scenarios:**
  ```
  Scenario: Zero any-typed parsers in Accounts.ts
    Tool: Bash
    Steps:
      1. Run `grep -n '(res: any)' packages/sdk/contractkit/src/wrappers/Accounts.ts`
      2. Verify zero results
    Expected Result: No any-typed output parser parameters
    Evidence: .sisyphus/evidence/task-9-accounts-no-any.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type Accounts + Escrow + FederatedAttestations output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/Accounts.ts`

- [x] 10. Strongly type Reserve.ts + MultiSig.ts + OdisPayments.ts + ScoreManager.ts output parsers

  **What to do**:
  - **Reserve.ts**: Multiple parsers using `valueToBigNumber`, `valueToFixidityString`. All use helper functions that accept bigint. Verify they compile. Also check `getAssetAllocationWeights` (line 74) and `getAssetAllocationSymbols` (line 85) which have typed array parsers `(weights: string[])` / `(symbols: string[])` — these may need updating since viem might return different array types.
  - **MultiSig.ts**: Parsers use `valueToBigNumber` and `valueToInt` — should work with bigint. Verify.
  - **OdisPayments.ts**: Single `valueToBigNumber` parser — should work. Verify.
  - **ScoreManager.ts**: Uses `fixidityValueToBigNumber` — should work since it goes through BigNumber. Verify.

  **Must NOT do**:
  - Do NOT change public return types
  - Do NOT use `as any`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Reserve.ts:28-130` — All parsers
  - `packages/sdk/contractkit/src/wrappers/MultiSig.ts:62-172` — All proxyCall usages
  - `packages/sdk/contractkit/src/wrappers/OdisPayments.ts:11` — Single parser
  - `packages/sdk/contractkit/src/wrappers/ScoreManager.ts:8-13` — Both parsers

  **Acceptance Criteria**:
  - [x] All four files compile cleanly with new decoder output
  - [x] No new `as any` in any of the four files

  **QA Scenarios:**
  ```
  Scenario: All four files compile cleanly
    Tool: Bash
    Steps:
      1. Run `npx tsc --noEmit -p packages/sdk/contractkit/tsconfig.json 2>&1 | grep -i 'Reserve\|MultiSig\|OdisPayments\|ScoreManager'`
      2. Verify zero error lines
    Expected Result: No type errors in any of the four files
    Evidence: .sisyphus/evidence/task-10-reserve-multisig.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type Reserve + MultiSig + OdisPayments + ScoreManager output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/Reserve.ts`, `packages/sdk/contractkit/src/wrappers/MultiSig.ts`, `packages/sdk/contractkit/src/wrappers/OdisPayments.ts`, `packages/sdk/contractkit/src/wrappers/ScoreManager.ts`

- [x] 11. Strongly type FeeCurrencyDirectoryWrapper.ts + Freezer.ts + FeeHandler.ts + token wrappers

  **What to do**:
  - **FeeCurrencyDirectoryWrapper.ts**: 3 manually-typed parsers:
    - Line 17: `getCurrencies` — `(addresses: string[])` → verify type matches viem ABI return
    - Line 30: `getExchangeRate` — `(res: { numerator: string; denominator: string })` → use ABI return type
    - Line 42: `getCurrencyConfig` — `(res: { oracle: string; intrinsicGas: string })` → use ABI return type
  - **Freezer.ts**: Single passthrough `isFrozen` — verify boolean return works.
  - **FeeHandler.ts**: Single passthrough `owner` — verify string return works.
  - **Erc20Wrapper.ts** + **CeloTokenWrapper.ts** + **GoldTokenWrapper.ts** + **StableTokenWrapper.ts**: Token wrappers use `proxyCallGeneric` with `valueToBigNumber`/`valueToInt` — verify they compile. These use generic TAbi so `ContractFunctionReturnType` won't resolve at compile time — proxyCallGeneric keeps free PreParsedOutput.
  - **LockedGold.ts**: Multiple passthrough + `valueToBigNumber` parsers — verify compilation.
  - **ReleaseGold.ts**: Multiple passthrough + `valueToBigNumber` parsers — verify compilation.

  **Must NOT do**:
  - Do NOT change public return types
  - Do NOT use `as any`
  - Do NOT modify `proxyCallGeneric` overloads (Task 2 explicitly preserved them)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 1, 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts:17-50` — All 3 manually-typed parsers
  - `packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:20-68` — proxyCallGeneric with valueToBigNumber
  - `packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:19-30` — proxyCallGeneric with valueToInt
  - `packages/sdk/contractkit/src/wrappers/LockedGold.ts` — Multiple proxyCall usages
  - `packages/sdk/contractkit/src/wrappers/ReleaseGold.ts` — Multiple proxyCall usages
  - `node_modules/@celo/abis/` — `feeCurrencyDirectoryABI`, `ierc20ABI`, `goldTokenABI`, `stableTokenABI`, `lockedGoldABI`

  **Acceptance Criteria**:
  - [x] No manual `{ numerator: string; denominator: string }` shapes in FeeCurrencyDirectory
  - [x] All token wrapper files compile cleanly
  - [x] LockedGold.ts and ReleaseGold.ts compile cleanly

  **QA Scenarios:**
  ```
  Scenario: No manual shapes in FeeCurrencyDirectory
    Tool: Bash
    Steps:
      1. Run `grep -n '{ numerator: string\|{ oracle: string' packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts`
      2. Verify zero results
    Expected Result: No manual object shapes in parser params
    Evidence: .sisyphus/evidence/task-11-fee-currency.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): strongly type FeeCurrencyDirectory + token wrapper output parsers`
  - Files: `packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts`, (+ verified-only files)

- [x] 12. Full build + type check across all downstream packages

  **What to do**:
  - Run `yarn workspace @celo/connect run build` — must pass
  - Run `yarn workspace @celo/contractkit run build` — must pass
  - Run `yarn workspace @celo/celocli run build` — must pass (no changes, but verify not broken)
  - Run `yarn workspace @celo/governance run build` — must pass (uses contractkit wrappers)
  - Run `yarn lint` — must pass with no new warnings
  - Run `grep -rn 'as any\|as unknown as' packages/sdk/contractkit/src/wrappers/*.ts` — verify zero NEW instances (only pre-existing in BaseWrapper eventTypes/methodIds)
  - If any build fails, fix the type errors in the failing file

  **Must NOT do**:
  - Do NOT fix errors by adding `as any` or `as unknown as X`
  - Do NOT change files outside the scope (no CLI changes, no ProposalBuilder changes)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: May need to diagnose and fix complex cross-package type errors
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 4-11 (all Wave 2)

  **References**:
  - All wrapper files from Tasks 4-11
  - `packages/sdk/connect/src/viem-tx-object.ts` — Task 1 changes
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — Task 2 changes
  - `packages/cli/` — Must not be broken (verify with build)
  - `packages/sdk/governance/` — Must not be broken (verify with build)

  **Acceptance Criteria**:
  - [x] `yarn workspace @celo/connect run build` passes
  - [x] `yarn workspace @celo/contractkit run build` passes
  - [x] `yarn workspace @celo/celocli run build` passes
  - [x] `yarn workspace @celo/governance run build` passes
  - [x] `yarn lint` passes (no new warnings)
  - [x] Zero new `as any` in wrapper files

  **QA Scenarios:**
  ```
  Scenario: Full downstream build passes
    Tool: Bash
    Steps:
      1. Run `yarn workspace @celo/connect run build && yarn workspace @celo/contractkit run build && yarn workspace @celo/celocli run build && yarn workspace @celo/governance run build`
      2. Verify all exit code 0
      3. Run `yarn lint`
      4. Verify exit code 0
      5. Run `grep -rn 'as any' packages/sdk/contractkit/src/wrappers/*.ts | grep -v 'eventTypes\|methodIds\|methods:\|deploy.*any\|events.*any\|arguments.*any'`
      6. Count results — should be zero or only pre-existing instances
    Expected Result: All builds pass, lint clean, no new `as any`
    Failure Indicators: Any build fails, lint errors, or new `as any` found
    Evidence: .sisyphus/evidence/task-12-full-build.txt
  ```

  **Commit**: YES (if fixes needed)
  - Message: `fix(contractkit): resolve cross-package type errors from return type migration`

- [x] 13. Update snapshots + run full test suite + fix failures

  **What to do**:
  - Run `yarn workspace @celo/contractkit run test` — expect some snapshot failures
  - Update snapshots: `yarn workspace @celo/contractkit run --top-level jest -u`
  - Re-run tests to confirm 258 pass
  - Run `yarn workspace @celo/connect run test` — expect viem-abi-coder.test.ts may need updates
  - If any test fails beyond snapshots:
    - Read the test to understand what it asserts
    - Fix the test to match new behavior (bigint instead of string)
    - Ensure the FIX is in the test, not in the implementation (don't add shims)
  - Snapshot files to update (5 files, 12 snapshots):
    - `Governance.test.ts` — string values become bigint in config snapshots
    - `LockedGold.test.ts` — BigNumber comparisons (likely still pass)
    - `EpochManager.test.ts` — status field, reward values
    - `ScoreManager.test.ts` — Fixidity-encoded values
    - `FeeCurrencyDirectoryWrapper.test.ts` — nested object structures

  **Must NOT do**:
  - Do NOT skip failing tests — fix them
  - Do NOT add `bigintToString` conversion to make old tests pass
  - Do NOT change test assertions to use `any` types

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: May need to diagnose complex test failures and understand snapshot diffs
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after Task 12)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 12

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Governance.test.ts` — 5 snapshots with string values
  - `packages/sdk/contractkit/src/wrappers/EpochManager.test.ts` — 5 snapshots
  - `packages/sdk/contractkit/src/wrappers/ScoreManager.test.ts` — 2 snapshots
  - `packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.test.ts` — 4 snapshots
  - `packages/sdk/contractkit/src/wrappers/LockedGold.test.ts` — 3 snapshots
  - `packages/sdk/connect/src/viem-abi-coder.test.ts` — 6 direct decoder tests (may need updating)

  **Acceptance Criteria**:
  - [x] `yarn workspace @celo/contractkit run test` — 258 tests pass
  - [x] `yarn workspace @celo/connect run test` — all tests pass
  - [x] All 12 snapshots updated to reflect new format
  - [x] Zero skipped or pending tests

  **QA Scenarios:**
  ```
  Scenario: Full test suite passes
    Tool: Bash
    Preconditions: All tasks 1-12 complete
    Steps:
      1. Run `yarn workspace @celo/contractkit run test 2>&1 | tail -20`
      2. Verify output shows 258 passing tests, 0 failures
      3. Run `yarn workspace @celo/connect run test 2>&1 | tail -10`
      4. Verify all tests pass
    Expected Result: All tests pass in both packages
    Failure Indicators: Any test failure, snapshot mismatch, or timeout
    Evidence: .sisyphus/evidence/task-13-test-results.txt
  ```

  **Commit**: YES
  - Message: `test(contractkit): update snapshots for bigint return values`
  - Files: All `*.test.ts` files that changed

---
## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run tsc, grep). For each "Must NOT Have": search codebase for forbidden patterns (`as any`, `as unknown as X` in changed files) — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` for connect + contractkit + CLI + governance. Run `yarn lint`. Run `yarn workspace @celo/contractkit run test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high`
  Start from clean state. Run full contractkit test suite. Run connect test suite. Verify type safety by attempting to introduce a typo in 3 wrapper output parsers — confirm `tsc` catches each. Verify that passthrough calls still return correct types. Save evidence.
  Output: `Type Safety [N/N] | Tests [N/N pass] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor(connect): replace viemAbiCoder.decodeParameters with decodeFunctionResult` — viem-tx-object.ts, BaseWrapper.ts
- **Wave 2 (per wrapper group)**: `refactor(contractkit): strongly type {wrapper} output parsers` — per task file list
- **Wave 3**: `test(contractkit): update snapshots for bigint return values` — test files

---

## Success Criteria

### Verification Commands
```bash
# Type safety
yarn workspace @celo/connect run build          # Expected: success
yarn workspace @celo/contractkit run build       # Expected: success
yarn workspace @celo/celocli run build           # Expected: success (no changes, but verify not broken)
yarn workspace @celo/governance run build        # Expected: success

# Tests
yarn workspace @celo/contractkit run test        # Expected: 258 tests pass
yarn workspace @celo/connect run test            # Expected: all tests pass

# Lint
yarn lint                                        # Expected: no new warnings

# Zero any/unknown casts in changed files
grep -rn 'as any\|as unknown as' packages/sdk/contractkit/src/wrappers/*.ts packages/sdk/connect/src/viem-tx-object.ts
# Expected: only pre-existing instances (eventTypes, methodIds in BaseWrapper)
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] All tests pass
- [x] Zero new `as any` or `as unknown as X`
- [x] All 13 `(res: any)` parsers replaced with typed versions
- [x] `PreParsedOutput` constrained to `ContractFunctionReturnType` in typed overloads
