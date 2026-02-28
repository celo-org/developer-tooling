# Replace proxyCall with Direct viem .read

## TL;DR

> **Quick Summary**: Eliminate the stringly-typed `proxyCall(this.contract, 'functionName')` indirection layer by replacing it with direct viem `.read.functionName()` property access. The contract object IS already a viem `GetContractReturnType` at runtime — we just need to widen the type and use its native typed methods.
> 
> **Deliverables**:
> - `BaseWrapper.contract` typed as `CeloContract<TAbi>` (exposing `.read`/`.write`)
> - All `proxyCall` usages (~90) replaced with direct `.read` calls
> - `proxyCall` overloads removed from BaseWrapper (except `proxyCallGeneric` kept for generic classes)
> - Type-test file updated for `.read`/`.write` type safety
> - All existing tests pass unchanged
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Tasks 4-15 (parallel) → Task 16 → Tasks F1-F4

---

## Context

### Original Request
The `proxyCall` pattern dispatches contract function calls via string literals (`proxyCall(this.contract, 'isAuthorizedSigner')`). This was necessary during the web3 era but is now redundant — the contract object is already a viem `GetContractReturnType` with typed `.read.functionName()` methods. User wants to replace stringly-typed dispatch with property access.

### Interview Summary
**Key Discussions**:
- Contract object IS already `GetContractReturnType` at runtime (created via `viem.getContract()`)
- `proxyCallGenericImpl` does exactly what `.read` does: `encodeFunctionData → client.call → decodeFunctionResult`
- `coerceArgsForAbi` in the proxyCall chain only handles 2 edge cases: `bool` coercion and `bytesN` padding
- `proxySend` returns `CeloTransactionObject` which is richer than `.write` — separate concern

**Research Findings**:
- 90 `proxyCall` usages across 18 wrapper files
- 106 `proxySend` usages — NOT in scope (architecturally different: `_parent._address` dependency)
- 28 `proxyCallGeneric`/`proxySendGeneric` usages in 3 generic base classes — keep alive, convert last
- `StrongAddress` = `` `0x${string}` `` = viem's address type — exact match
- Wrappers accept `string` for addresses (intentional widening) — `.read` expects `` `0x${string}` ``

### Metis Review
**Identified Gaps** (addressed):
- `coerceArgsForAbi` scope is narrower than assumed — only `bool` and `bytesN`, NOT address/bigint
- Return values are already `bigint` from `decodeFunctionResult` — no behavior change
- `_parent._address` is actively used by `Connection.sendTransactionObject()` — confirms proxySend is separate scope
- `contractConnections` WeakMap must stay until ALL proxy functions removed (including Generic)
- No direct unit tests for proxyCall — regressions caught only by integration tests
- `typed-contracts.test-d.ts` explicitly tests proxyCall — needs updating
- `BaseWrapperForGoverning` also declares `contract: ContractLike<TAbi>` — must be updated too

---

## Work Objectives

### Core Objective
Replace all `proxyCall` string-based function dispatch with direct `this.contract.read.functionName()` property access, making function references refactor-safe and eliminating redundant indirection.

### Concrete Deliverables
- `BaseWrapper.contract` and `BaseWrapperForGoverning.contract` typed as `CeloContract<TAbi>`
- All 90 `proxyCall` usages across 18 concrete wrapper files replaced with `.read` calls
- `proxyCall` overloads + `proxyCallGenericImpl` removed (or deprecated)
- `proxyCallGeneric` kept for Erc20Wrapper/CeloTokenWrapper (generic TAbi)
- Type-test file updated to verify `.read`/`.write` type safety
- Utility exports (`valueToBigNumber`, `valueToString`, `tupleParser`, etc.) preserved
- All existing tests pass without modification

### Definition of Done
- [x] `yarn build` passes (exit code 0)
- [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` passes (258+ tests)
- [x] `yarn workspace @celo/celocli run build` passes
- [x] `yarn workspace @celo/governance run build` passes
- [x] `yarn lint` produces no new warnings
- [x] Zero `proxyCall` usages remain in concrete wrapper files (only `proxyCallGeneric` in generic classes)

### Must Have
- All `proxyCall` → `.read` replacements preserve identical runtime behavior
- Wrapper public API unchanged: same method names, same parameter types, same return types
- Output transformers preserved inline (e.g., `valueToBigNumber(res.toString())`)
- Input coercion handled in wrapper methods where needed

### Must NOT Have (Guardrails)
- **NO public API changes** — callers must not notice any difference
- **NO proxySend changes** — write/transaction side is out of scope
- **NO generic wrapper conversion** — Erc20Wrapper/CeloTokenWrapper keep `proxyCallGeneric`
- **NO removal of BaseWrapper utility exports** (`valueToBigNumber`, `valueToString`, `tupleParser`, `fixidityValueToBigNumber`, etc.) — external packages import them
- **NO removal of `contractConnections` WeakMap** — still needed by `proxyCallGeneric`/`proxySendGeneric`
- **NO `as any` casts** to work around type mismatches — use proper type narrowing
- **NO removal of `createViemTxObject`/`createViemTxObjectInternal`** — still used by proxySend and direct callers

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after (this is a refactor — existing tests are the safety net)
- **Framework**: Jest (contractkit), Vitest (core/actions)
- **Strategy**: Run existing test suite after each wrapper conversion. No new tests needed unless behavior changes.

### QA Policy
Every task MUST verify via `yarn workspace @celo/contractkit run build` + `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` after changes.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Type safety**: `tsc --noEmit` via `yarn build` — compile-time verification
- **Runtime correctness**: Anvil integration tests — `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
- **Downstream compat**: `yarn workspace @celo/celocli run build && yarn workspace @celo/governance run build`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — sequential, must complete first):
├── Task 1: Widen BaseWrapper.contract type to CeloContract<TAbi> [quick]
├── Task 2: Update typed-contracts.test-d.ts for .read type safety [quick]
└── Task 3: Create arg coercion helpers (address, bigint) [quick]

Wave 2 (Simple wrappers — MAX PARALLEL, 8 tasks):
├── Task 4: Freezer (2 proxyCall, simplest) [quick]
├── Task 5: ScoreManager (2 proxyCall) [quick]
├── Task 6: OdisPayments (2 proxyCall) [quick]
├── Task 7: FeeCurrencyDirectoryWrapper (3 proxyCall) [quick]
├── Task 8: EpochRewards (5 proxyCall) [quick]
├── Task 9: Escrow (5 proxyCall) [quick]
├── Task 10: FederatedAttestations (5 proxyCall) [quick]
└── Task 11: Reserve (12 proxyCall) [unspecified-low]

Wave 3 (Complex wrappers — parallel, 7 tasks):
├── Task 12: Accounts (15 proxyCall) [unspecified-high]
├── Task 13: Attestations (11 proxyCall) [unspecified-high]
├── Task 14: Election (22 proxyCall) [unspecified-high]
├── Task 15: EpochManager (15 proxyCall) [unspecified-high]
├── Task 16: LockedGold (13 proxyCall) [unspecified-high]
├── Task 17: MultiSig (12 proxyCall) [unspecified-high]
└── Task 18: SortedOracles (9 proxyCall) [unspecified-high]

Wave 4 (Heaviest wrappers + cleanup — parallel where possible):
├── Task 19: Governance (30 proxyCall, heaviest) [deep]
├── Task 20: Validators (31 proxyCall) [deep]
├── Task 21: ReleaseGold (23 proxyCall) [deep]
├── Task 22: StableTokenWrapper + FeeHandler + GoldTokenWrapper (remaining small wrappers) [unspecified-high]
└── Task 23: Remove dead proxyCall code from BaseWrapper [quick]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 2 → Task 3 → any Wave 2 task → any Wave 3 task → Task 23 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 8 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 2, 3, all wrapper tasks |
| 2 | 1 | 23 |
| 3 | 1 | 4-22 |
| 4-11 | 1, 3 | 23 |
| 12-18 | 1, 3 | 23 |
| 19-22 | 1, 3 | 23 |
| 23 | 4-22 | F1-F4 |
| F1-F4 | 23 | — |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1 `quick`, T2 `quick`, T3 `quick`
- **Wave 2**: 8 tasks — T4-T7 `quick`, T8-T10 `quick`, T11 `unspecified-low`
- **Wave 3**: 7 tasks — T12-T18 `unspecified-high`
- **Wave 4**: 5 tasks — T19-T21 `deep`, T22 `unspecified-high`, T23 `quick`
- **FINAL**: 4 tasks — F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [x] 1. Widen BaseWrapper.contract type from ContractLike to CeloContract

  **What to do**:
  - In `BaseWrapper.ts`: Change `protected readonly contract: ContractLike<TAbi>` to `protected readonly contract: CeloContract<TAbi>`
  - Add import for `CeloContract` from `@celo/connect/lib/contract-types`
  - In `BaseWrapperForGoverning` (same file or separate — check): update its `contract` parameter type similarly
  - Keep `ContractLike` interface alive — it's still used by `ContractRef` in viem-tx-object.ts and by `proxyCallGeneric`
  - Verify the `contractConnections.set(contract, connection)` in constructor still works (CeloContract extends ContractLike)
  - Run full monorepo build to verify no downstream breakage

  **Must NOT do**:
  - Do NOT remove `ContractLike` — still needed by generic helpers and viem-tx-object.ts
  - Do NOT change constructor parameter types — CeloContract satisfies ContractLike, so callers won't break
  - Do NOT touch any proxyCall usages yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (sequential)
  - **Blocks**: All other tasks
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:20-23` — `ContractLike` interface definition
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:40-50` — `BaseWrapper` class constructor, contract property
  - `packages/sdk/connect/src/contract-types.ts:9-10` — `CeloContract` type definition (`GetContractReturnType<TAbi, PublicClient>`)

  **API/Type References**:
  - `viem` → `GetContractReturnType<TAbi, PublicClient>` — this is what `CeloContract` resolves to, provides `.read`/`.write`/`.simulate`

  **WHY Each Reference Matters**:
  - `BaseWrapper.ts:40-50`: This is the TARGET — change the contract type here
  - `contract-types.ts:9-10`: This is the SOURCE type to use (`CeloContract`)
  - `BaseWrapper.ts:20-23`: Must verify `CeloContract` satisfies `ContractLike` — `GetContractReturnType` has `abi` and `address` properties

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Full monorepo build passes after type change
    Tool: Bash
    Preconditions: Type change applied to BaseWrapper.contract
    Steps:
      1. Run `yarn build`
      2. Assert exit code 0
      3. Run `yarn workspace @celo/celocli run build`
      4. Assert exit code 0
      5. Run `yarn workspace @celo/governance run build`
      6. Assert exit code 0
    Expected Result: All 3 build commands succeed with exit code 0
    Failure Indicators: Any tsc error mentioning ContractLike, CeloContract, or .read/.write
    Evidence: .sisyphus/evidence/task-1-monorepo-build.txt

  Scenario: Contract .read property is accessible in wrapper code
    Tool: Bash
    Preconditions: Type change applied
    Steps:
      1. In a wrapper file (e.g., Freezer.ts), add a temporary line: `private _test = this.contract.read`
      2. Run `yarn workspace @celo/contractkit run build`
      3. Assert it compiles without error
      4. Remove the temporary line
    Expected Result: `.read` is a valid property on `this.contract` after type widening
    Failure Indicators: TypeScript error "Property 'read' does not exist on type 'CeloContract<...>'"
    Evidence: .sisyphus/evidence/task-1-read-accessible.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): widen BaseWrapper.contract type to CeloContract<TAbi>`
  - Files: `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
  - Pre-commit: `yarn build`

---

- [x] 2. Update typed-contracts.test-d.ts for .read/.write type safety

  **What to do**:
  - Read `packages/sdk/contractkit/src/__type-tests__/typed-contracts.test-d.ts`
  - Update/add type assertions that verify:
    - `this.contract.read.functionName` resolves to correct function type
    - `.read` method return types match `ContractFunctionReturnType`
    - Function name autocomplete works (invalid names cause type error)
  - Keep existing proxyCall type tests if proxyCall still exists (it won't be removed until Task 23)
  - Add new tests for the `.read` access pattern

  **Must NOT do**:
  - Do NOT remove proxyCall type tests yet — proxyCall is still used until Wave 2-4

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (after Task 1)
  - **Parallel Group**: Wave 1 (sequential)
  - **Blocks**: Task 23
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `packages/sdk/contractkit/src/__type-tests__/typed-contracts.test-d.ts` — Existing type test file with proxyCall assertions

  **API/Type References**:
  - `viem` → `ContractFunctionReturnType`, `ContractFunctionName`, `ContractFunctionArgs` — types used for assertion

  **WHY Each Reference Matters**:
  - `typed-contracts.test-d.ts`: Contains the existing type-level tests that verify compile-time type safety of contract interactions — new `.read` tests go here

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Type test file compiles without errors
    Tool: Bash
    Preconditions: Type test file updated with .read assertions
    Steps:
      1. Run `yarn workspace @celo/contractkit run build`
      2. Assert exit code 0
      3. Verify type test file is included in compilation (check tsconfig)
    Expected Result: Build succeeds, type assertions compile
    Failure Indicators: tsc error in typed-contracts.test-d.ts
    Evidence: .sisyphus/evidence/task-2-type-tests.txt

  Scenario: Invalid .read function name causes compile error
    Tool: Bash
    Preconditions: Type tests include negative case
    Steps:
      1. Verify the test-d.ts file contains an `@ts-expect-error` for invalid function name on `.read`
      2. Run build — the `@ts-expect-error` should be consumed (meaning the error exists)
    Expected Result: Build passes, confirming invalid function names ARE caught at compile time
    Failure Indicators: "Unused @ts-expect-error" warning (would mean invalid names are NOT caught)
    Evidence: .sisyphus/evidence/task-2-negative-type-test.txt
  ```

  **Commit**: YES (groups with Task 1)
  - Message: `test(contractkit): add .read/.write type safety assertions`
  - Files: `packages/sdk/contractkit/src/__type-tests__/typed-contracts.test-d.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run build`

---

- [x] 3. Create arg coercion helpers for .read calls

  **What to do**:
  - In BaseWrapper.ts (or a new `wrappers/coerce.ts` utility), add:
    - `toViemAddress(v: string): \`0x\${string}\`` — ensures `0x` prefix, casts to viem address type
    - `toViemBigInt(v: BigNumber.Value): bigint` — converts BigNumber/string/number to bigint
  - These replace the implicit coercion that `coerceArgsForAbi` did in the proxyCall chain
  - Export them so wrapper files can import and use in `.read` calls
  - Keep `coerceArgsForAbi` alive — still used by `createViemTxObjectInternal` for proxySend

  **Must NOT do**:
  - Do NOT remove `coerceArgsForAbi` — still used by proxySend/proxyCallGeneric path
  - Do NOT change `coerceArgsForAbi` behavior

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 4-22
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `packages/sdk/connect/src/viem-abi-coder.ts:54-62` — `coerceArgsForAbi` implementation (the pattern being replaced)
  - `packages/sdk/base/src/address.ts:5` — `StrongAddress` = `` `0x${string}` `` definition
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:253-270` — existing utility functions (`valueToBigNumber`, `valueToString`) — follow this pattern

  **WHY Each Reference Matters**:
  - `coerceArgsForAbi`: Shows what implicit coercion was happening — the new helpers must cover same cases
  - `StrongAddress`: The target address type — `toViemAddress` must produce this
  - `BaseWrapper.ts:253-270`: Pattern for where/how to add utility functions in this file

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Coercion helpers compile and work correctly
    Tool: Bash
    Preconditions: Helpers added to BaseWrapper.ts or coerce.ts
    Steps:
      1. Run `yarn workspace @celo/contractkit run build`
      2. Assert exit code 0
      3. Verify helpers are exported (grep for export in output)
    Expected Result: Build passes, helpers are importable
    Failure Indicators: tsc error or missing export
    Evidence: .sisyphus/evidence/task-3-coerce-helpers.txt

  Scenario: toViemBigInt handles all BigNumber.Value variants
    Tool: Bash
    Preconditions: Helper function exists
    Steps:
      1. Write a quick inline test in the test file or use node -e to verify:
         - `toViemBigInt('1000')` → `1000n`
         - `toViemBigInt(1000)` → `1000n`
         - `toViemBigInt(new BigNumber('1000'))` → `1000n`
      2. Assert all produce correct bigint values
    Expected Result: All BigNumber.Value variants convert to correct bigint
    Failure Indicators: TypeError or incorrect value
    Evidence: .sisyphus/evidence/task-3-bigint-coercion.txt
  ```

  **Commit**: YES (groups with Task 1)
  - Message: `refactor(contractkit): add toViemAddress and toViemBigInt coercion helpers`
  - Files: `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
  - Pre-commit: `yarn workspace @celo/contractkit run build`

---

- [x] 4. Replace proxyCall with .read in Freezer (simplest wrapper — 2 calls)

  **What to do**:
  - Replace all `proxyCall(this.contract, ...)` with direct `this.contract.read.functionName()` calls
  - For passthroughs (no parser): `isFrozen = async (target: string) => this.contract.read.isFrozen([toViemAddress(target)])`
  - For proxySend: leave untouched (out of scope)
  - Import coercion helpers from BaseWrapper
  - Run build + tests to verify

  **Must NOT do**:
  - Do NOT touch proxySend calls
  - Do NOT change public method signatures

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5-11)
  - **Blocks**: Task 23
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Freezer.ts` — Entire file, 2 proxyCall usages. Simplest wrapper — use as the TEMPLATE for all subsequent conversions.

  **Acceptance Criteria**:
  ```
  Scenario: Freezer wrapper works after proxyCall removal
    Tool: Bash
    Steps:
      1. Run `yarn workspace @celo/contractkit run build` — assert exit 0
      2. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — assert all pass
      3. `grep -n 'proxyCall' packages/sdk/contractkit/src/wrappers/Freezer.ts` — assert zero matches
    Expected Result: Build passes, tests pass, no proxyCall remaining
    Evidence: .sisyphus/evidence/task-4-freezer.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): replace proxyCall with .read in Freezer`
  - Files: `packages/sdk/contractkit/src/wrappers/Freezer.ts`

---

- [x] 5-11. Replace proxyCall with .read in remaining Wave 2 wrappers (ScoreManager, OdisPayments, FeeCurrencyDirectory, EpochRewards, Escrow, FederatedAttestations, Reserve)

  **What to do** (repeat for EACH wrapper file listed below):
  - Replace all `proxyCall(this.contract, 'functionName')` with `this.contract.read.functionName()`
  - For calls WITH output parser: `async (...args) => { const res = await this.contract.read.functionName([...coercedArgs]); return parseOutput(res) }`
  - For calls WITHOUT output parser (passthrough): `async (...args) => this.contract.read.functionName([toViemAddress(arg)])`
  - For calls with input parser: apply the input transformation before passing to `.read`
  - Use `toViemAddress()` for address params, `toViemBigInt()` for uint256 params
  - Keep proxySend calls untouched
  - After each file: run build to verify

  **Files (one task per file, all run in parallel):**
  - Task 5: `ScoreManager.ts` — 2 proxyCall
  - Task 6: `OdisPayments.ts` — 2 proxyCall
  - Task 7: `FeeCurrencyDirectoryWrapper.ts` — 3 proxyCall
  - Task 8: `EpochRewards.ts` — 5 proxyCall
  - Task 9: `Escrow.ts` — 5 proxyCall
  - Task 10: `FederatedAttestations.ts` — 5 proxyCall
  - Task 11: `Reserve.ts` — 12 proxyCall

  **Must NOT do**:
  - Do NOT touch proxySend calls
  - Do NOT change public method signatures or return types
  - Do NOT use `as any` — use proper coercion helpers

  **Recommended Agent Profile**:
  - **Category**: `quick` (Tasks 5-10), `unspecified-low` (Task 11 — Reserve is bigger)
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (all Wave 2 tasks run in parallel)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 23
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `packages/sdk/contractkit/src/wrappers/ScoreManager.ts` — 2 proxyCall, simple fixidity parsers
  - `packages/sdk/contractkit/src/wrappers/OdisPayments.ts` — 2 proxyCall, BigNumber parser
  - `packages/sdk/contractkit/src/wrappers/FeeCurrencyDirectoryWrapper.ts` — 3 proxyCall
  - `packages/sdk/contractkit/src/wrappers/EpochRewards.ts` — 5 proxyCall, fixidity + string parsers
  - `packages/sdk/contractkit/src/wrappers/Escrow.ts` — 5 proxyCall, address + BigNumber parsers
  - `packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts` — 5 proxyCall, tuple destructuring
  - `packages/sdk/contractkit/src/wrappers/Reserve.ts` — 12 proxyCall, BigNumber + fixidity parsers
  - `packages/sdk/contractkit/src/wrappers/Freezer.ts` — Use Task 4's completed conversion as TEMPLATE

  **Acceptance Criteria (per file):**
  ```
  Scenario: Wrapper works after proxyCall removal
    Tool: Bash
    Steps:
      1. `yarn workspace @celo/contractkit run build` — assert exit 0
      2. `grep -n 'proxyCall' packages/sdk/contractkit/src/wrappers/{File}.ts` — assert zero matches (proxyCall only, not proxyCallGeneric)
      3. `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — assert all pass
    Expected Result: Build passes, no proxyCall remaining, tests pass
    Evidence: .sisyphus/evidence/task-{N}-{wrapper-name}.txt
  ```

  **Commit**: YES (one commit per wrapper file)
  - Message: `refactor(contractkit): replace proxyCall with .read in {WrapperName}`

---

- [x] 12-18. Replace proxyCall with .read in Wave 3 wrappers (Accounts, Attestations, Election, EpochManager, LockedGold, MultiSig, SortedOracles)

  **What to do**: Same pattern as Wave 2 but these are more complex — more proxyCall usages, more parsers, more name mismatches.

  **Files:**
  - Task 12: `Accounts.ts` — 15 proxyCall. **Note**: `isSigner` maps to `isAuthorizedSigner` (name mismatch). Many return `StrongAddress`.
  - Task 13: `Attestations.ts` — 11 proxyCall. `getAttestationStat` maps to `getAttestationStats` (name mismatch). Complex tuple parsers.
  - Task 14: `Election.ts` — 22 proxyCall. Complex array/tuple parsers, `validatorSignerAddressFromCurrentSet` returns `StrongAddress`.
  - Task 15: `EpochManager.ts` — 15 proxyCall. Mix of annotated (6) and unannotated (9). `getElectedAccounts`/`getElectedSigners` spread readonly arrays.
  - Task 16: `LockedGold.ts` — 13 proxyCall. BigNumber parsers, tuple destructuring for pending withdrawals.
  - Task 17: `MultiSig.ts` — 12 proxyCall. Array mapping, BigNumber parsers, `getTransaction` complex tuple.
  - Task 18: `SortedOracles.ts` — 9 proxyCall. `_numRates`/`_isOracle` are private with `...args: any[]`.

  **Must NOT do**:
  - Do NOT change public method signatures or return types
  - Do NOT touch proxySend calls
  - Do NOT use `as any` for type mismatches — use coercion helpers

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (all Wave 3 tasks run in parallel)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 23
  - **Blocked By**: Tasks 1, 3

  **References**:
  - Each wrapper file in `packages/sdk/contractkit/src/wrappers/{Name}.ts`
  - Completed Wave 2 files (especially Freezer/Reserve) — use as conversion TEMPLATE
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — coercion helpers (`toViemAddress`, `toViemBigInt`)

  **Acceptance Criteria (per file):**
  ```
  Scenario: Wrapper works after proxyCall removal
    Tool: Bash
    Steps:
      1. `yarn workspace @celo/contractkit run build` — assert exit 0
      2. `grep -n 'proxyCall' packages/sdk/contractkit/src/wrappers/{Name}.ts` — assert zero matches
      3. `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — assert all pass
    Expected Result: Build passes, no proxyCall remaining, tests pass
    Evidence: .sisyphus/evidence/task-{N}-{wrapper-name}.txt
  ```

  **Commit**: YES (one commit per wrapper file)
  - Message: `refactor(contractkit): replace proxyCall with .read in {WrapperName}`

---

- [x] 19-22. Replace proxyCall with .read in Wave 4 wrappers (Governance, Validators, ReleaseGold, remaining small wrappers)

  **What to do**: Heaviest wrappers. Governance has 30+ proxyCall, Validators has 31, ReleaseGold has 23. These have the most complex output parsers and name mismatches.

  **Files:**
  - Task 19: `Governance.ts` — 30 proxyCall. `getProposalMetadata` maps to `getProposal` (name mismatch). Complex stage/vote parsers. **Heaviest file.**
  - Task 20: `Validators.ts` — 31 proxyCall. `getValidatorMembershipHistory` maps to `getMembershipHistory`, `getValidatorGroupSize` maps to `getGroupNumMembers` (name mismatches). Complex membership/group parsers.
  - Task 21: `ReleaseGold.ts` — 23 proxyCall. 9 name mismatches (`getBeneficiary`→`beneficiary`, `getReleaseOwner`→`releaseOwner`, etc.). Complex schedule/revocation tuple parsers.
  - Task 22: `StableTokenWrapper.ts` + `FeeHandler.ts` + `GoldTokenWrapper.ts` — remaining small wrappers (5+5+2 proxyCall). Group into one task.

  **Must NOT do**:
  - Do NOT change public method signatures or return types
  - Do NOT touch proxySend calls
  - Do NOT touch Erc20Wrapper.ts or CeloTokenWrapper.ts (generic classes — out of scope)

  **Recommended Agent Profile**:
  - **Category**: `deep` (Tasks 19-21), `unspecified-high` (Task 22)
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (all Wave 4 tasks run in parallel)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 23
  - **Blocked By**: Tasks 1, 3

  **References**:
  - Each wrapper file in `packages/sdk/contractkit/src/wrappers/{Name}.ts`
  - Completed Wave 2-3 files — established conversion patterns

  **Acceptance Criteria (per file):**
  ```
  Scenario: Wrapper works after proxyCall removal
    Tool: Bash
    Steps:
      1. `yarn workspace @celo/contractkit run build` — assert exit 0
      2. `grep -n 'proxyCall' packages/sdk/contractkit/src/wrappers/{Name}.ts` — assert zero matches
      3. `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — assert all pass
    Expected Result: Build passes, no proxyCall remaining, tests pass
    Evidence: .sisyphus/evidence/task-{N}-{wrapper-name}.txt
  ```

  **Commit**: YES (one commit per wrapper file or group)
  - Message: `refactor(contractkit): replace proxyCall with .read in {WrapperName}`

---

- [x] 23. Remove dead proxyCall code from BaseWrapper

  **What to do**:
  - Remove all `proxyCall` overloads (typed + untyped) from BaseWrapper.ts
  - Remove `proxyCallGenericImpl` function
  - Keep `proxyCallGeneric` overloads + implementation — still used by Erc20Wrapper/CeloTokenWrapper
  - Keep `proxySend`, `proxySendGeneric`, `proxySendGenericImpl` — out of scope
  - Keep `contractConnections` WeakMap — still needed by proxyCallGeneric/proxySend
  - Keep ALL utility exports (`valueToBigNumber`, `valueToString`, `tupleParser`, etc.)
  - Remove `proxyCall` from `import` statements in ALL wrapper files that no longer use it
  - Update proxyCall type tests in typed-contracts.test-d.ts — remove proxyCall tests, keep .read tests

  **Must NOT do**:
  - Do NOT remove `proxyCallGeneric` or `proxySendGeneric` — still used by generic wrappers
  - Do NOT remove `proxySend` or `proxySendGenericImpl`
  - Do NOT remove `contractConnections` WeakMap
  - Do NOT remove utility exports (`valueToBigNumber`, `valueToString`, etc.)
  - Do NOT remove `createViemTxObject` or `createViemTxObjectInternal`

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (after all Wave 2-4)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 4-22 (all wrapper conversions)

  **References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:304-393` — proxyCall overloads to remove
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:532-561` — proxyCallGenericImpl to remove
  - `packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts` — uses proxyCallGeneric (must NOT break)
  - `packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts` — uses proxyCallGeneric (must NOT break)

  **Acceptance Criteria:**
  ```
  Scenario: Dead code removed, surviving code works
    Tool: Bash
    Steps:
      1. `yarn build` — assert exit 0
      2. `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — assert all pass
      3. `grep -n 'proxyCall(' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — should match only proxyCallGeneric
      4. `grep -rn 'proxyCall' packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts` — should match proxyCallGeneric (still used)
      5. `yarn workspace @celo/celocli run build` — assert exit 0
      6. `yarn workspace @celo/governance run build` — assert exit 0
    Expected Result: Build passes, tests pass, only proxyCallGeneric remains
    Evidence: .sisyphus/evidence/task-23-cleanup.txt

  Scenario: No proxyCall in any concrete wrapper file
    Tool: Bash
    Steps:
      1. `grep -rn 'proxyCall(this\.contract' packages/sdk/contractkit/src/wrappers/*.ts | grep -v Generic | grep -v Erc20 | grep -v CeloToken`
      2. Assert zero matches
    Expected Result: Zero proxyCall(this.contract usages in concrete wrappers
    Evidence: .sisyphus/evidence/task-23-zero-proxycall.txt
  ```

  **Commit**: YES
  - Message: `refactor(contractkit): remove dead proxyCall overloads from BaseWrapper`
  - Files: `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`, all wrapper import updates
  - Pre-commit: `yarn build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Verify: zero `proxyCall(this.contract,` in concrete wrappers (only `proxyCallGeneric` in Erc20Wrapper/CeloTokenWrapper). Check evidence files exist.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `yarn build` + `yarn lint` + `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`. Review changed files for: `as any`/`@ts-ignore`, empty catches, console.log, commented-out code. Check AI slop: excessive comments, over-abstraction, unnecessary wrappers around `.read` calls.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high`
  Run full contractkit test suite + connect test suite + CLI build. Verify type safety: try introducing a typo in a `.read.functionName` call in 3 wrapper files — confirm `tsc` catches each. Run downstream: `yarn workspace @celo/governance run test`.
  Output: `Type Safety [N/N] | Tests [N/N pass] | Downstream [N/N] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance: no proxySend changes, no generic wrapper changes, no public API changes, no removed exports. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor(contractkit): widen BaseWrapper.contract type to CeloContract<TAbi>` + helpers + type tests
- **Wave 2-4 (per wrapper)**: `refactor(contractkit): replace proxyCall with .read in {WrapperName}` — per wrapper file
- **Cleanup**: `refactor(contractkit): remove unused proxyCall overloads from BaseWrapper`
- **Changeset**: Run `yarn cs` after cleanup — patch bump for `@celo/contractkit` (internal refactor, no public API change)

---

## Success Criteria

### Verification Commands
```bash
# Full build
yarn build                                        # Expected: exit code 0

# Contractkit tests (with Anvil)
RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test  # Expected: 258+ tests pass

# Connect tests
yarn workspace @celo/connect run test             # Expected: 85 tests pass

# Downstream builds
yarn workspace @celo/celocli run build            # Expected: exit code 0
yarn workspace @celo/governance run build          # Expected: exit code 0

# Lint
yarn lint                                         # Expected: no new warnings

# Zero proxyCall in concrete wrappers
grep -rn 'proxyCall(this\.contract' packages/sdk/contractkit/src/wrappers/*.ts | grep -v 'Generic\|Erc20\|CeloToken'
# Expected: zero matches
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] All tests pass
- [x] Zero `proxyCall(this.contract,` in concrete wrapper files
- [x] `proxyCallGeneric` still works in Erc20Wrapper/CeloTokenWrapper
- [x] All utility exports from BaseWrapper preserved
- [x] Public API unchanged (same method signatures)
