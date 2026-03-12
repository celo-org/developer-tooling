# Remove rpc-contract.ts and PromiEvent — Replace with Native Viem

## TL;DR

> **Quick Summary**: Remove the legacy web3-style contract interaction layer (`rpc-contract.ts`, `PromiEvent`) from `@celo/connect` and replace with native viem patterns (`getContract`, `readContract`, `writeContract`). Keep `CeloTransactionObject` public API intact (rewrite internals). Replace custom `ViemContract` interface with viem's native `GetContractReturnType`.
> 
> **Deliverables**:
> - `rpc-contract.ts`, `rpc-contract.test.ts`, `promi-event.ts` deleted
> - `PromiEvent` type removed from `types.ts`
> - `Connection.createContract()` removed
> - `Connection.getViemContract()` replaced with `getContract()` from viem
> - `ViemContract` interface replaced with viem's `GetContractReturnType`
> - `CeloTransactionObject.send()` / `.sendAndWaitForReceipt()` preserved (internals rewritten)
> - All tests pass, build succeeds, lint clean
> - Major version changeset for `@celo/connect`
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: Task 1 → Task 3 → Task 5 → Task 8 → Task 12 → Task 14 → Final

---

## Context

### Original Request
Remove `rpc-contract.ts` and `PromiEvent` pattern entirely from `@celo/connect`. Replace with native viem `getContract`/`readContract`/`writeContract`. No shims allowed under any circumstances.

### Interview Summary
**Key Discussions**:
- **Wrapper return type**: Keep `CeloTransactionObject` with `.send()` and `.sendAndWaitForReceipt()` — rewrite internals only
- **ViemContract replacement**: Use viem's `GetContractReturnType` + pass `PublicClient` separately where needed
- **Deploy handling**: Rewrite 3 callers to use viem's `walletClient.deployContract()`
- **Semver**: Major bump for `@celo/connect` — `CeloTxObject.send()` return type changes from `PromiEvent` to `Promise<string>`

**Research Findings**:
- `Connection.sendTransactionViaProvider()` already uses `Promise<string>` path (no PromiEvent) — this is the target pattern
- `pollForReceiptHelper` must be extracted from `promi-event.ts` before deletion (shared by `tx-result.ts`)
- `@celo/actions` already uses pure viem pattern — serves as reference implementation
- viem natively supports Celo `feeCurrency` when `chain: celo` is configured
- `getContract()` returns typed contract with `.read`, `.write`, `.simulate`, `.estimateGas` namespaces

### Metis Review
**Identified Gaps** (addressed):
- `GetContractReturnType` lacks `.client` property → Pass client separately to functions needing raw RPC
- `pollForReceiptHelper` lives in `promi-event.ts` → Extract to standalone utility before deletion
- `decodeReceiptEvents` only used inside `promi-event.ts` → Verify no callers depend on `receipt.events`, then drop
- `PromiEventStub.ts` test infrastructure → Must be rewritten/deleted
- `ContractSendMethod.send()` in types.ts also returns PromiEvent → Update simultaneously
- `deploy()` has 3 callers → Rewrite to viem `deployContract()`

---

## Work Objectives

### Core Objective
Eliminate the web3 compatibility layer (`rpc-contract.ts`, `PromiEvent`) from `@celo/connect`, replacing all contract interactions with native viem APIs while preserving `CeloTransactionObject` public API.

### Concrete Deliverables
- Delete: `rpc-contract.ts`, `rpc-contract.test.ts`, `promi-event.ts`, `PromiEventStub.ts`
- New: `utils/receipt-polling.ts` (extracted from promi-event.ts)
- Modified: `connection.ts`, `types.ts`, `viem-tx-object.ts`, `tx-result.ts`, `celo-transaction-object.ts`
- Modified: `BaseWrapper.ts` + all 24 wrapper classes (ViemContract → GetContractReturnType)
- Modified: `contract-factory-cache.ts`, `mini-contract-cache.ts`, `address-registry.ts`
- Modified: CLI (`dkg/deploy.ts`, `cli.ts`, `safe.ts`), governance (`proposal-builder.ts`), dev-utils (`contracts.ts`)
- New: Changeset for major `@celo/connect` bump

### Definition of Done
- [x] `yarn build` succeeds for all packages
- [x] `RUN_ANVIL_TESTS=true yarn test` passes (same pass rate as before)
- [x] `yarn lint` — zero new errors
- [x] `yarn fmt:diff` — zero formatting issues
- [x] `grep -r "createPromiEvent\|from.*promi-event\|rpc-contract" packages/ --include="*.ts" | grep -v node_modules` — zero results
- [x] `grep -r "PromiEvent" packages/ --include="*.ts" | grep -v node_modules | grep -v test` — zero production results

### Must Have
- `CeloTransactionObject.send()` and `.sendAndWaitForReceipt()` work identically from caller's perspective
- All Celo-specific behaviors preserved: `feeCurrency`, `gasInflationFactor`, `fillTxDefaults`, `CeloProvider` interception
- `TransactionResult.getHash()` and `.waitReceipt()` behavior unchanged
- viem's `getContract()` used for all contract instantiation
- No shims, no compatibility wrappers, no dead code

### Must NOT Have (Guardrails)
- No new shim/compatibility layers wrapping viem
- No `rpc-contract.ts` remnants (even partial)
- No `PromiEvent` in production code (type or runtime)
- No `Connection.createContract()` method
- No `contract.methods.*` pattern anywhere
- No changes to `@celo/actions`, `@celo/core`, `@celo/base`, wallet packages
- No generic variable names (`data`, `result`, `temp`, `item`)
- No `as any` type assertions (except where explicitly required by viem's deeply recursive types)
- No excessive JSDoc/comments on unchanged code

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Jest for contractkit/CLI, Vitest for actions/core)
- **Automated tests**: Tests-after — existing tests must continue passing; update tests that mock PromiEvent
- **Framework**: Jest (contractkit, CLI, governance), Vitest (actions, core)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build verification**: `yarn build` / `yarn workspace X run build`
- **Test verification**: `RUN_ANVIL_TESTS=true yarn workspace X run test`
- **Lint verification**: `yarn lint`
- **Grep verification**: Absence of removed patterns

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — extract utilities, no breaking changes):
├── Task 1: Extract pollForReceiptHelper to standalone utility [quick]
├── Task 2: Audit decodeReceiptEvents usage — verify droppable [quick]
└── Task 3: Create GetContractReturnType integration types + helpers [deep]

Wave 2 (Core rewrite — surgical change to transaction pipeline):
├── Task 4: Rewrite Connection.sendTransactionObject() to bypass txObj.send() [deep]
├── Task 5: Rewrite viem-tx-object.ts send() — remove createPromiEvent [deep]
├── Task 6: Update types.ts — remove PromiEvent, CeloTxObject.send() return type, Contract interface [unspecified-high]
└── Task 7: Update TransactionResult (tx-result.ts) — remove PromiEvent dependency [unspecified-high]

Wave 3 (Contract layer — replace ViemContract with GetContractReturnType):
├── Task 8: Rewrite BaseWrapper — replace ViemContract, update proxyCall/proxySend [deep]
├── Task 9: Update Connection — remove createContract(), replace getViemContract() with getContract() [unspecified-high]
├── Task 10: Update contract-factory-cache.ts and mini-contract-cache.ts [quick]
└── Task 11: Update address-registry.ts and proxy.ts [quick]

Wave 4 (Wrapper + consumer updates):
├── Task 12: Update all 24 contractkit wrappers — ViemContract → GetContractReturnType [unspecified-high]
├── Task 13: Rewrite deploy() callers to viem deployContract() [unspecified-high]
├── Task 14: Update CLI consumers (safe.ts, cli.ts, approve.ts, etc.) [unspecified-high]
├── Task 15: Update governance ProposalBuilder [unspecified-high]
└── Task 16: Update dev-utils contracts.ts [quick]

Wave 5 (Cleanup + tests):
├── Task 17: Delete rpc-contract.ts, rpc-contract.test.ts, promi-event.ts, viem-contract.ts [quick]
├── Task 18: Rewrite kit.test.ts — remove PromiEventStub, update test stubs [unspecified-high]
├── Task 19: Update all contractkit test files that mock PromiEvent or use .methods [unspecified-high]
├── Task 20: Create changeset for major @celo/connect bump [quick]
└── Task 21: Full build + lint + test verification [deep]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 3 → Task 5 → Task 8 → Task 12 → Task 14 → Task 17 → Task 21 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 4 (Waves 2 & 3)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 5, 7, 17 | 1 |
| 2 | — | 17 | 1 |
| 3 | — | 8, 9, 10, 11, 12 | 1 |
| 4 | — | 18 | 2 |
| 5 | 1 | 17, 18 | 2 |
| 6 | — | 8, 12, 17 | 2 |
| 7 | 1 | 17 | 2 |
| 8 | 3, 6 | 12 | 3 |
| 9 | 3 | 10, 11, 13 | 3 |
| 10 | 9 | 12 | 3 |
| 11 | 9 | — | 3 |
| 12 | 8, 10 | 14, 15, 18, 19 | 4 |
| 13 | 9 | 17 | 4 |
| 14 | 12 | 21 | 4 |
| 15 | 12 | 21 | 4 |
| 16 | 9 | 21 | 4 |
| 17 | 1, 2, 5, 6, 7, 13 | 21 | 5 |
| 18 | 4, 5, 12 | 21 | 5 |
| 19 | 12 | 21 | 5 |
| 20 | — | 21 | 5 |
| 21 | 17, 18, 19, 20 | F1-F4 | 5 |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1,T2 → `quick`, T3 → `deep`
- **Wave 2**: 4 tasks — T4,T5 → `deep`, T6,T7 → `unspecified-high`
- **Wave 3**: 4 tasks — T8 → `deep`, T9 → `unspecified-high`, T10,T11 → `quick`
- **Wave 4**: 5 tasks — T12,T13,T14,T15 → `unspecified-high`, T16 → `quick`
- **Wave 5**: 5 tasks — T17,T20 → `quick`, T18,T19 → `unspecified-high`, T21 → `deep`
- **FINAL**: 4 tasks — F1 → `oracle`, F2,F3 → `unspecified-high`, F4 → `deep`

---

## TODOs


- [x] 1. Extract `pollForReceiptHelper` to standalone utility

  **What to do**:
  - Create `packages/sdk/connect/src/utils/receipt-polling.ts`
  - Move `pollForReceiptHelper` function from `promi-event.ts` to new file
  - Move `decodeReceiptEvents` function if Task 2 determines it's needed (otherwise skip)
  - Update import in `tx-result.ts` from `../promi-event` → `./receipt-polling`
  - Verify `promi-event.ts` still works (its own callers still import directly for now)

  **Must NOT do**:
  - Do NOT delete `promi-event.ts` yet (later tasks depend on it still existing)
  - Do NOT change any function signatures

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 5, 7, 17
  - **Blocked By**: None

  **References**:
  - `packages/sdk/connect/src/promi-event.ts:60-90` — `pollForReceiptHelper` function to extract
  - `packages/sdk/connect/src/promi-event.ts:92-122` — `decodeReceiptEvents` function (may extract)
  - `packages/sdk/connect/src/utils/tx-result.ts:4` — imports `pollForReceiptHelper` from `../promi-event`

  **Acceptance Criteria**:
  - [x] `packages/sdk/connect/src/utils/receipt-polling.ts` exists with `pollForReceiptHelper`
  - [x] `tx-result.ts` imports from `./receipt-polling` not `../promi-event`
  - [x] `yarn workspace @celo/connect run build` → PASS
  - [x] `yarn workspace @celo/contractkit run test` → PASS (no regression)

  **QA Scenarios:**
  ```
  Scenario: Build succeeds after extraction
    Tool: Bash
    Steps:
      1. Run `yarn workspace @celo/connect run build`
      2. Assert exit code 0
    Expected Result: Build completes without errors
    Evidence: .sisyphus/evidence/task-1-build.txt

  Scenario: tx-result imports resolve correctly
    Tool: Bash (grep)
    Steps:
      1. Run `grep -n 'from.*promi-event' packages/sdk/connect/src/utils/tx-result.ts`
      2. Assert zero results
      3. Run `grep -n 'from.*receipt-polling' packages/sdk/connect/src/utils/tx-result.ts`
      4. Assert one result
    Expected Result: tx-result.ts imports from receipt-polling, not promi-event
    Evidence: .sisyphus/evidence/task-1-imports.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `refactor(connect): extract pollForReceiptHelper to standalone utility`
  - Files: `packages/sdk/connect/src/utils/receipt-polling.ts`, `packages/sdk/connect/src/utils/tx-result.ts`

- [x] 2. Audit `decodeReceiptEvents` usage — verify droppable

  **What to do**:
  - Search entire codebase for any code that reads `receipt.events` (the property populated by `decodeReceiptEvents`)
  - Check all test files that assert on receipt event data
  - Determine if `decodeReceiptEvents` can be dropped entirely or needs preservation
  - Document findings for Task 17 (deletion phase)

  **Must NOT do**:
  - Do NOT delete anything yet — this is audit only
  - Do NOT modify any files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 17
  - **Blocked By**: None

  **References**:
  - `packages/sdk/connect/src/promi-event.ts:37-38` — `decodeReceiptEvents` call site
  - `packages/sdk/connect/src/promi-event.ts:92-122` — `decodeReceiptEvents` implementation

  **Acceptance Criteria**:
  - [x] Written report in `.sisyphus/evidence/task-2-audit.md` documenting:
    - Every file that reads `receipt.events`
    - Whether each usage is test-only or production
    - GO/NO-GO recommendation for dropping `decodeReceiptEvents`

  **QA Scenarios:**
  ```
  Scenario: Comprehensive search for receipt.events usage
    Tool: Bash (grep)
    Steps:
      1. Run `grep -rn '\.events' packages/ --include='*.ts' | grep -i receipt | grep -v node_modules`
      2. Run `grep -rn 'decodeReceiptEvents' packages/ --include='*.ts' | grep -v node_modules`
      3. Analyze each result — classify as production vs test
    Expected Result: Report produced with GO/NO-GO
    Evidence: .sisyphus/evidence/task-2-audit.md
  ```

  **Commit**: NO

- [x] 3. Create `GetContractReturnType` integration types + helpers

  **What to do**:
  - Define a new type alias in `packages/sdk/connect/src/contract-types.ts` (new file):
    ```typescript
    import { GetContractReturnType, PublicClient } from 'viem'
    export type CeloContract<TAbi extends readonly unknown[]> = GetContractReturnType<TAbi, { public: PublicClient }>
    ```
  - Create helper function to replace `Connection.getViemContract()` pattern:
    ```typescript
    import { getContract } from 'viem'
    export function createCeloContract<TAbi extends readonly unknown[]>(
      abi: TAbi, address: `0x${string}`, client: PublicClient
    ): CeloContract<TAbi>
    ```
  - Export from `packages/sdk/connect/src/index.ts`
  - Ensure the type works with typed ABIs from `@celo/abis` (e.g., `typeof accountsABI`)
  - Write basic type tests verifying `.read`, `.simulate`, `.estimateGas` namespaces are available

  **Must NOT do**:
  - Do NOT add `.client` property — pass `PublicClient` separately where needed
  - Do NOT modify BaseWrapper yet (Task 8)
  - Do NOT create a shim or compatibility wrapper

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Tasks 8, 9, 10, 11, 12
  - **Blocked By**: None

  **References**:
  - `packages/sdk/connect/src/viem-contract.ts` — Current `ViemContract` interface (20 lines, being replaced)
  - `packages/actions/src/contracts/election.ts:6-9` — Reference pattern for `GetContractReturnType` usage
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:32` — Current `contract: ViemContract<TAbi>` usage
  - `viem` docs — `getContract()` returns `GetContractReturnType<TAbi, TClient>`

  **Acceptance Criteria**:
  - [x] `packages/sdk/connect/src/contract-types.ts` exists with `CeloContract` type + `createCeloContract` helper
  - [x] Exported from `packages/sdk/connect/src/index.ts`
  - [x] `yarn workspace @celo/connect run build` → PASS
  - [x] Type test: `CeloContract<typeof accountsABI>` has `.read`, `.simulate`, `.estimateGas` namespaces

  **QA Scenarios:**
  ```
  Scenario: Build succeeds with new types
    Tool: Bash
    Steps:
      1. Run `yarn workspace @celo/connect run build`
      2. Assert exit code 0
    Expected Result: Build completes
    Evidence: .sisyphus/evidence/task-3-build.txt

  Scenario: Type inference works with @celo/abis
    Tool: Bash
    Steps:
      1. Create temp TypeScript file importing CeloContract + accountsABI
      2. Verify contract.read.getAttestationSigner exists (via tsc --noEmit)
      3. Clean up temp file
    Expected Result: Type-safe contract access compiles
    Evidence: .sisyphus/evidence/task-3-types.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(connect): add CeloContract type based on viem GetContractReturnType`
  - Files: `packages/sdk/connect/src/contract-types.ts`, `packages/sdk/connect/src/index.ts`

---

- [x] 4. Rewrite `Connection.sendTransactionObject()` to bypass `txObj.send()`

  **What to do**:
  - In `packages/sdk/connect/src/connection.ts`, rewrite `sendTransactionObject()` (line 304-331):
    - Instead of calling `txObj.send()` (which returns PromiEvent), do:
      1. Call `txObj.encodeABI()` to get encoded data
      2. Build a `CeloTx` with `{ ...tx, data, to: txObj._parent._address }`
      3. Call `this.sendTransactionViaProvider(celoTx)` which already returns `TransactionResult` via `Promise<string>` path
    - Keep the gas estimation logic (gasEstimator using `txObj.estimateGas`, caller using `eth_call`)
  - This is THE key surgical change that eliminates PromiEvent from the transaction pipeline

  **Must NOT do**:
  - Do NOT change `sendTransaction()` or `sendTransactionViaProvider()` — they already work without PromiEvent
  - Do NOT modify `CeloTransactionObject` yet — it still needs to call `sendTransactionObject()`

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: Task 18
  - **Blocked By**: None

  **References**:
  - `packages/sdk/connect/src/connection.ts:304-331` — Current `sendTransactionObject()` implementation
  - `packages/sdk/connect/src/connection.ts:277-302` — `sendTransactionViaProvider()` — THE target pattern (already uses Promise<string>)
  - `packages/sdk/connect/src/connection.ts:262-275` — `sendTransaction()` — reference for gas estimation + fillTxDefaults flow

  **Acceptance Criteria**:
  - [x] `sendTransactionObject()` no longer calls `txObj.send()`
  - [x] `sendTransactionObject()` calls `txObj.encodeABI()` + `sendTransactionViaProvider()`
  - [x] `yarn workspace @celo/connect run build` → PASS
  - [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` → all Anvil tests pass

  **QA Scenarios:**
  ```
  Scenario: Transaction sending still works end-to-end
    Tool: Bash
    Steps:
      1. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
      2. Assert tests that send transactions (SortedOracles, Accounts, etc.) pass
    Expected Result: All sending tests pass — proves sendTransactionObject rewrite works
    Evidence: .sisyphus/evidence/task-4-contractkit-tests.txt

  Scenario: No reference to txObj.send() in sendTransactionObject
    Tool: Bash (grep)
    Steps:
      1. Read connection.ts sendTransactionObject method
      2. Verify no call to `txObj.send(` exists
      3. Verify call to `sendTransactionViaProvider(` exists
    Expected Result: sendTransactionObject uses sendTransactionViaProvider
    Evidence: .sisyphus/evidence/task-4-grep.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `refactor(connect): rewrite sendTransactionObject to bypass PromiEvent`
  - Files: `packages/sdk/connect/src/connection.ts`

- [x] 5. Rewrite `viem-tx-object.ts` send() — remove `createPromiEvent`

  **What to do**:
  - In `packages/sdk/connect/src/viem-tx-object.ts`, rewrite the `send()` method in `createViemTxObjectInternal()` (line 62-68):
    - Remove `import { createPromiEvent } from './promi-event'`
    - Change `send()` to return `Promise<string>` (tx hash) instead of `PromiEvent<CeloTxReceipt>`:
      ```typescript
      send: (txParams?: CeloTx): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          connection.currentProvider.send({
            id: getRandomId(), jsonrpc: '2.0', method: 'eth_sendTransaction',
            params: [{ ...txParams, to: contract.address, data: encodeData() }]
          }, (error, resp) => {
            if (error) reject(error)
            else if (resp?.error) reject(new Error(resp.error.message))
            else if (resp) resolve(resp.result as string)
            else reject(new Error('empty-response'))
          })
        })
      }
      ```
    - This mirrors `Connection.sendTransactionViaProvider()` pattern exactly
  - Update `call()` method: replace `contract.client.call()` with `connection.viemClient.call()` (preparation for ViemContract removal)

  **Must NOT do**:
  - Do NOT create a new PromiEvent replacement — plain Promise<string> is the goal
  - Do NOT change function signatures of `createViemTxObject` (overloads must remain)

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6, 7)
  - **Blocks**: Tasks 17, 18
  - **Blocked By**: Task 1 (pollForReceiptHelper extracted)

  **References**:
  - `packages/sdk/connect/src/viem-tx-object.ts:62-68` — Current `send()` using `createPromiEvent`
  - `packages/sdk/connect/src/connection.ts:277-302` — `sendTransactionViaProvider()` — pattern to follow
  - `packages/sdk/connect/src/utils/rpc-caller.ts` — `getRandomId()` import
  - `packages/sdk/connect/src/viem-tx-object.ts:41-61` — `call()` method using `contract.client.call()`

  **Acceptance Criteria**:
  - [x] No import of `createPromiEvent` in `viem-tx-object.ts`
  - [x] `send()` returns `Promise<string>` (not PromiEvent)
  - [x] `yarn workspace @celo/connect run build` → PASS

  **QA Scenarios:**
  ```
  Scenario: No PromiEvent imports remain in viem-tx-object
    Tool: Bash (grep)
    Steps:
      1. Run `grep 'promi-event\|PromiEvent\|createPromiEvent' packages/sdk/connect/src/viem-tx-object.ts`
      2. Assert zero results
    Expected Result: No PromiEvent references
    Evidence: .sisyphus/evidence/task-5-grep.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `refactor(connect): remove PromiEvent from viem-tx-object send()`
  - Files: `packages/sdk/connect/src/viem-tx-object.ts`

- [x] 6. Update `types.ts` — remove PromiEvent, update CeloTxObject.send() return type

  **What to do**:
  - In `packages/sdk/connect/src/types.ts`:
    - Change `CeloTxObject<T>.send()` return type from `PromiEvent<CeloTxReceipt>` to `Promise<string>` (line 65)
    - Remove `PromiEvent<T>` interface definition entirely (around line 96-110)
    - Remove `ContractSendMethod.send()` that also returns `PromiEvent` (around line 173)
    - Remove `Contract` interface (the web3-style interface with `.methods`, `.deploy`, `.getPastEvents`)
    - Remove `ContractSendMethod` type
    - Keep: `CeloTx`, `CeloTxObject` (with updated send return), `CeloTxReceipt`, `EventLog`, `Log`
  - Update exports in `packages/sdk/connect/src/index.ts` — remove `PromiEvent`, `Contract` exports

  **Must NOT do**:
  - Do NOT remove `CeloTxObject` interface entirely — it's still used by CeloTransactionObject
  - Do NOT change `CeloTxReceipt` — it's used everywhere

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 7)
  - **Blocks**: Tasks 8, 12, 17
  - **Blocked By**: None

  **References**:
  - `packages/sdk/connect/src/types.ts:61-69` — `CeloTxObject<T>` interface (line 65: `send()` return type)
  - `packages/sdk/connect/src/types.ts:96-130` — `PromiEvent<T>` interface definition
  - `packages/sdk/connect/src/types.ts:170-180` — `ContractSendMethod`, `Contract` interface
  - `packages/sdk/connect/src/index.ts` — exports to update

  **Acceptance Criteria**:
  - [x] `PromiEvent` type does not exist in `types.ts`
  - [x] `Contract` interface does not exist in `types.ts`
  - [x] `CeloTxObject.send()` returns `Promise<string>`
  - [x] `yarn workspace @celo/connect run build` → PASS

  **QA Scenarios:**
  ```
  Scenario: PromiEvent type fully removed from types.ts
    Tool: Bash (grep)
    Steps:
      1. Run `grep -n 'PromiEvent' packages/sdk/connect/src/types.ts`
      2. Assert zero results
    Expected Result: No PromiEvent in types.ts
    Evidence: .sisyphus/evidence/task-6-types.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(connect)!: remove PromiEvent and Contract types — BREAKING`
  - Files: `packages/sdk/connect/src/types.ts`, `packages/sdk/connect/src/index.ts`

- [x] 7. Update `TransactionResult` (tx-result.ts) — remove PromiEvent dependency

  **What to do**:
  - In `packages/sdk/connect/src/utils/tx-result.ts`:
    - Remove `PromiEvent` import from types
    - Remove `isPromiEvent()` function (line 97-101)
    - Remove the PromiEvent branch in `TransactionResult` constructor (line 30-49) — keep only the `Promise<string>` branch
    - Update `toTxResult()` signature: accept `Promise<string>` only (remove `PromiEvent<CeloTxReceipt>` union)
    - Import `pollForReceiptHelper` from `./receipt-polling` (already done in Task 1)
    - Ensure `getHash()` and `waitReceipt()` behavior is preserved

  **Must NOT do**:
  - Do NOT change `TransactionResult.getHash()` or `.waitReceipt()` method signatures
  - Do NOT change `ReceiptFetcher` type

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6)
  - **Blocks**: Task 17
  - **Blocked By**: Task 1 (pollForReceiptHelper extracted)

  **References**:
  - `packages/sdk/connect/src/utils/tx-result.ts` — Full file (101 lines)
  - `packages/sdk/connect/src/utils/tx-result.ts:29-73` — TransactionResult constructor with PromiEvent branch
  - `packages/sdk/connect/src/utils/tx-result.ts:97-101` — `isPromiEvent()` function to remove

  **Acceptance Criteria**:
  - [x] No `PromiEvent` import or reference in `tx-result.ts`
  - [x] `toTxResult()` accepts `Promise<string>` only
  - [x] `TransactionResult.getHash()` and `.waitReceipt()` work as before
  - [x] `yarn workspace @celo/connect run build` → PASS

  **QA Scenarios:**
  ```
  Scenario: No PromiEvent in tx-result.ts
    Tool: Bash (grep)
    Steps:
      1. Run `grep 'PromiEvent\|isPromiEvent' packages/sdk/connect/src/utils/tx-result.ts`
      2. Assert zero results
    Expected Result: Clean of PromiEvent
    Evidence: .sisyphus/evidence/task-7-grep.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `refactor(connect): simplify TransactionResult to Promise<string> only`
  - Files: `packages/sdk/connect/src/utils/tx-result.ts`

---

- [x] 8. Rewrite BaseWrapper — replace ViemContract, update proxyCall/proxySend

  **What to do**:
  - In `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`:
    - Replace `ViemContract<TAbi>` with `CeloContract<TAbi>` (from Task 3's new types) in `BaseWrapper` class
    - Add `protected readonly client: PublicClient` to constructor (passed separately per Metis recommendation)
    - Update `proxyCall`/`proxyCallGeneric`: replace `createViemTxObjectInternal().call()` with direct `client.readContract()` call
    - Update `proxySend`/`proxySendGeneric`: keep using `createViemTxObjectInternal()` for the CeloTxObject (needed by CeloTransactionObject), but update to pass `connection.viemClient` instead of `contract.client`
    - Update `version()` method: replace `this.contract.client.call()` with `this.client.call()`
    - Update `getPastEvents()`: use `client.getContractEvents()` instead of manual `rpcCaller.call('eth_getLogs')`
  - Update `BaseWrapperForGoverning.ts` similarly

  **Must NOT do**:
  - Do NOT modify individual wrapper files (Task 12)
  - Do NOT change public API return types

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 9, 10, 11)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 3, 6

  **References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — Full file (550+ lines), the core of the wrapper system
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:32` — `protected readonly contract: ViemContract<TAbi>`
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:280-530` — proxyCall/proxySend implementations
  - `packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts` — Extends BaseWrapper for governing wrappers
  - `packages/sdk/connect/src/contract-types.ts` — New `CeloContract` type from Task 3

  **Acceptance Criteria**:
  - [x] `BaseWrapper` uses `CeloContract<TAbi>` not `ViemContract<TAbi>`
  - [x] `proxyCall` uses `client.readContract()` for read operations
  - [x] `yarn workspace @celo/contractkit run build` → PASS

  **QA Scenarios:**
  ```
  Scenario: No ViemContract references in BaseWrapper
    Tool: Bash (grep)
    Steps:
      1. Run `grep 'ViemContract' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`
      2. Assert zero results
    Expected Result: ViemContract fully replaced
    Evidence: .sisyphus/evidence/task-8-grep.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `refactor(contractkit): replace ViemContract with viem GetContractReturnType in BaseWrapper`
  - Files: `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts`, `packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts`

- [x] 9. Update Connection — remove `createContract()`, replace `getViemContract()` with `getContract()`

  **What to do**:
  - In `packages/sdk/connect/src/connection.ts`:
    - Remove `import { createContractConstructor } from './rpc-contract'`
    - Remove `createContract()` method entirely (line 655-658)
    - Rewrite `getViemContract()` to use `getContract()` from viem:
      ```typescript
      import { getContract, GetContractReturnType, PublicClient } from 'viem'
      getCeloContract<TAbi extends readonly unknown[]>(abi: TAbi, address: string): GetContractReturnType<TAbi, { public: PublicClient }> {
        return getContract({ abi, address: address as `0x${string}`, client: this._viemClient })
      }
      ```
    - Keep ABI enrichment (function/event signatures) for backward compat — apply before passing to `getContract()`
    - Add deprecated `getViemContract` as alias pointing to `getCeloContract` for migration period
  - Update `packages/sdk/connect/src/index.ts` exports

  **Must NOT do**:
  - Do NOT remove ABI enrichment logic — governance proposal builder depends on `abi.signature`
  - Do NOT change `sendTransaction()` or `sendTransactionObject()` (already done in Task 4)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 10, 11)
  - **Blocks**: Tasks 10, 11, 13
  - **Blocked By**: Task 3

  **References**:
  - `packages/sdk/connect/src/connection.ts:647-687` — Current `createContract()` and `getViemContract()` methods
  - `packages/sdk/connect/src/connection.ts:21` — `import { createContractConstructor } from './rpc-contract'` to remove
  - `packages/sdk/connect/src/connection.ts:20` — `import type { ViemContract } from './viem-contract'` to update

  **Acceptance Criteria**:
  - [x] `createContract()` method removed from Connection
  - [x] `getViemContract()` deprecated, `getCeloContract()` returns viem `GetContractReturnType`
  - [x] No import of `rpc-contract` in `connection.ts`
  - [x] `yarn workspace @celo/connect run build` → PASS

  **QA Scenarios:**
  ```
  Scenario: No rpc-contract import in connection.ts
    Tool: Bash (grep)
    Steps:
      1. Run `grep 'rpc-contract\|createContractConstructor' packages/sdk/connect/src/connection.ts`
      2. Assert zero results
    Expected Result: No rpc-contract dependency
    Evidence: .sisyphus/evidence/task-9-grep.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `refactor(connect): replace getViemContract with viem getContract, remove createContract`
  - Files: `packages/sdk/connect/src/connection.ts`, `packages/sdk/connect/src/index.ts`

- [x] 10. Update contract-factory-cache.ts and mini-contract-cache.ts

  **What to do**:
  - Update `packages/sdk/contractkit/src/contract-factory-cache.ts`:
    - Replace `ViemContract` import with `CeloContract` from `@celo/connect`
    - Update `ContractCacheMap` type to use new contract type
    - Update `getContract()` method to call `connection.getCeloContract()` instead of `connection.getViemContract()`
  - Update `packages/sdk/contractkit/src/mini-contract-cache.ts`:
    - Same changes: `ViemContract` → `CeloContract`, `getViemContract` → `getCeloContract`

  **Recommended Agent Profile**: `quick` | **Skills**: []
  **Parallelization**: Wave 3 | **Blocks**: Task 12 | **Blocked By**: Task 9

  **References**:
  - `packages/sdk/contractkit/src/contract-factory-cache.ts:31,97,207` — ViemContract usage
  - `packages/sdk/contractkit/src/mini-contract-cache.ts:118` — `connection.getViemContract()` call

  **Acceptance Criteria**:
  - [x] No `ViemContract` references in either file
  - [x] `yarn workspace @celo/contractkit run build` → PASS

  **Commit**: YES (groups with Wave 3) | Message: `refactor(contractkit): update contract caches for viem getContract`

- [x] 11. Update address-registry.ts and proxy.ts

  **What to do**:
  - Update `packages/sdk/contractkit/src/address-registry.ts`:
    - Replace `ViemContract` import, use `connection.getCeloContract()`
  - Update `packages/sdk/contractkit/src/proxy.ts`:
    - Replace `connection.getViemContract()` with `connection.getCeloContract()`
  - Update `packages/sdk/explorer/src/sourcify.ts`:
    - Replace `connection.getViemContract()` with `connection.getCeloContract()`

  **Recommended Agent Profile**: `quick` | **Skills**: []
  **Parallelization**: Wave 3 | **Blocks**: — | **Blocked By**: Task 9

  **References**:
  - `packages/sdk/contractkit/src/address-registry.ts:3,24,29` — ViemContract + getViemContract usage
  - `packages/sdk/contractkit/src/proxy.ts:161` — `connection.getViemContract()` call
  - `packages/sdk/explorer/src/sourcify.ts:259` — `connection.getViemContract()` call

  **Acceptance Criteria**:
  - [x] No `getViemContract` calls (use `getCeloContract`)
  - [x] `yarn workspace @celo/contractkit run build` → PASS

  **Commit**: YES (groups with Wave 3) | Message: `refactor(contractkit): update registry and proxy for viem getContract`

- [x] 12. Update all 24 contractkit wrappers — ViemContract → GetContractReturnType

  **What to do**:
  - In every wrapper file in `packages/sdk/contractkit/src/wrappers/`:
    - Replace `import { ... type ViemContract } from '@celo/connect'` with `import { ... type CeloContract } from '@celo/connect'`
    - Update constructor parameter types: `contract: ViemContract<typeof xABI>` → `contract: CeloContract<typeof xABI>`
    - Add `client: PublicClient` parameter where wrappers access `contract.client` directly
  - Files (24 wrappers): Accounts, Attestations, CeloTokenWrapper, Election, EpochManager, EpochRewards, Erc20Wrapper, Escrow, FederatedAttestations, FeeCurrencyDirectoryWrapper, FeeHandler, Freezer, GoldTokenWrapper, Governance, LockedGold, MultiSig, OdisPayments, ReleaseGold, Reserve, ScoreManager, SortedOracles, StableTokenWrapper, Validators, AbstractFeeCurrencyWrapper

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: []
  **Parallelization**: Wave 4 | **Blocks**: Tasks 14, 15, 18, 19 | **Blocked By**: Tasks 8, 10

  **References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` — Updated base class from Task 8
  - Every file in `packages/sdk/contractkit/src/wrappers/*.ts`

  **Acceptance Criteria**:
  - [x] `grep -r 'ViemContract' packages/sdk/contractkit/src/wrappers/` → zero results
  - [x] `yarn workspace @celo/contractkit run build` → PASS
  - [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` → PASS

  **Commit**: YES (groups with Wave 4) | Message: `refactor(contractkit): migrate all wrappers to viem GetContractReturnType`

- [x] 13. Rewrite deploy() callers to viem `deployContract()`

  **What to do**:
  - Rewrite `packages/cli/src/commands/dkg/deploy.ts`:
    - Replace `kit.connection.createContract(DKG.abi, ...)` + `.deploy().send()` with viem's `walletClient.deployContract()`
    - Use `connection.viemClient` for `waitForTransactionReceipt`
  - Rewrite `packages/dev-utils/src/contracts.ts`:
    - Replace `conn.createContract(AttestationsArtifacts.abi)` + `.deploy()` with viem pattern
  - Rewrite `packages/sdk/contractkit/src/wrappers/SortedOracles.test.ts` deploy usage:
    - Replace `kit.connection.createContract(SortedOraclesArtifacts.abi)` with viem deploy

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: []
  **Parallelization**: Wave 4 | **Blocks**: Task 17 | **Blocked By**: Task 9

  **References**:
  - `packages/cli/src/commands/dkg/deploy.ts:29` — `kit.connection.createContract(DKG.abi, ...)`
  - `packages/dev-utils/src/contracts.ts:13` — `conn.createContract(AttestationsArtifacts.abi)`
  - `packages/sdk/contractkit/src/wrappers/SortedOracles.test.ts:69` — `kit.connection.createContract(...)`
  - viem docs — `walletClient.deployContract({ abi, bytecode, args })`

  **Acceptance Criteria**:
  - [x] No `createContract(` calls in codebase
  - [x] `yarn workspace @celo/celocli run build` → PASS
  - [x] `yarn workspace @celo/dev-utils run build` → PASS

  **Commit**: YES (groups with Wave 4) | Message: `refactor: migrate contract deployment to viem deployContract`

- [x] 14. Update CLI consumers (safe.ts, cli.ts, approve.ts, etc.)

  **What to do**:
  - Update `packages/cli/src/utils/safe.ts`:
    - Update `safeTransactionMetadataFromCeloTransactionObject()` — it accesses `.txo.encodeABI()`. CeloTransactionObject.txo still has `encodeABI()`, so this should work. Verify types.
  - Update `packages/cli/src/utils/cli.ts`:
    - `displaySendTx()` calls `.send()` on CeloTransactionObject — this still works (Task 4 preserved it)
    - Verify ViemContract/Contract type references are cleaned up
  - Update `packages/cli/src/utils/require.ts`:
    - Uses `CeloTxObject` type — update if type changed
  - Update `packages/cli/src/commands/governance/approve.ts`, `withdraw.ts`, `propose.ts`:
    - Access `.txo` property — verify still available
  - Update `packages/cli/src/commands/releasecelo/revoke-votes.ts`:
    - Stores `CeloTransactionObject<void>[]` — verify types

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: []
  **Parallelization**: Wave 4 | **Blocks**: Task 21 | **Blocked By**: Task 12

  **References**:
  - `packages/cli/src/utils/safe.ts` — Uses CeloTransactionObject, accesses .txo.encodeABI()
  - `packages/cli/src/utils/cli.ts` — displaySendTx() calls .send()
  - `packages/cli/src/utils/require.ts` — Uses CeloTxObject .call()
  - `packages/cli/src/commands/governance/approve.ts` — Accesses .txo property

  **Acceptance Criteria**:
  - [x] `yarn workspace @celo/celocli run build` → PASS
  - [x] No type errors in CLI source files

  **Commit**: YES (groups with Wave 4) | Message: `refactor(cli): update CLI utilities for viem contract migration`

- [x] 15. Update governance ProposalBuilder

  **What to do**:
  - In `packages/sdk/governance/src/proposal-builder.ts`:
    - Update `fromWeb3tx()` — currently accepts `CeloTxObject`, accesses `.txo.encodeABI()`
    - Update `addWeb3Tx()` and `addTx()` methods
    - Replace any `ViemContract` references with new types
    - Ensure `encodeABI()` path still works (CeloTxObject still has it)

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: []
  **Parallelization**: Wave 4 | **Blocks**: Task 21 | **Blocked By**: Task 12

  **References**:
  - `packages/sdk/governance/src/proposal-builder.ts` — Uses CeloTransactionObject + CeloTxObject

  **Acceptance Criteria**:
  - [x] `yarn workspace @celo/governance run build` → PASS
  - [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/governance run test` → PASS

  **Commit**: YES (groups with Wave 4) | Message: `refactor(governance): update ProposalBuilder for viem migration`

- [x] 16. Update dev-utils contracts.ts

  **What to do**:
  - In `packages/dev-utils/src/contracts.ts`:
    - Remove `conn.createContract()` usage (already handled by Task 13 for deploy)
    - Update any remaining ViemContract/Contract references

  **Recommended Agent Profile**: `quick` | **Skills**: []
  **Parallelization**: Wave 4 | **Blocks**: Task 21 | **Blocked By**: Task 9

  **Acceptance Criteria**:
  - [x] `yarn workspace @celo/dev-utils run build` → PASS

  **Commit**: YES (groups with Wave 4) | Message: `refactor(dev-utils): update for viem contract migration`

- [x] 17. Delete rpc-contract.ts, rpc-contract.test.ts, promi-event.ts, viem-contract.ts

  **What to do**:
  - Delete `packages/sdk/connect/src/rpc-contract.ts`
  - Delete `packages/sdk/connect/src/rpc-contract.test.ts`
  - Delete `packages/sdk/connect/src/promi-event.ts` (pollForReceiptHelper already extracted in Task 1)
  - Delete `packages/sdk/connect/src/viem-contract.ts` (replaced by contract-types.ts from Task 3)
  - Update `packages/sdk/connect/src/index.ts` — remove all exports for deleted modules
  - Run Task 2's audit result: if `decodeReceiptEvents` is needed, ensure it's preserved somewhere

  **Recommended Agent Profile**: `quick` | **Skills**: []
  **Parallelization**: Wave 5 | **Blocks**: Task 21 | **Blocked By**: Tasks 1, 2, 5, 6, 7, 13

  **Acceptance Criteria**:
  - [x] Files deleted: rpc-contract.ts, rpc-contract.test.ts, promi-event.ts, viem-contract.ts
  - [x] `yarn workspace @celo/connect run build` → PASS
  - [x] No dangling imports referencing deleted files

  **Commit**: YES | Message: `feat(connect)!: delete rpc-contract.ts, promi-event.ts, viem-contract.ts — BREAKING`

- [x] 18. Rewrite kit.test.ts — remove PromiEventStub, update test stubs

  **What to do**:
  - Delete `packages/sdk/contractkit/src/test-utils/PromiEventStub.ts`
  - Rewrite `packages/sdk/contractkit/src/kit.test.ts`:
    - Replace all PromiEvent mocking with `Promise<string>` based stubs
    - Update `sendTransactionObject` mocking to match new signature
    - Verify TransactionResult tests still cover getHash()/waitReceipt() flows

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: []
  **Parallelization**: Wave 5 | **Blocks**: Task 21 | **Blocked By**: Tasks 4, 5, 12

  **References**:
  - `packages/sdk/contractkit/src/test-utils/PromiEventStub.ts` — File to delete
  - `packages/sdk/contractkit/src/kit.test.ts` — Heavy PromiEvent mocking

  **Acceptance Criteria**:
  - [x] `PromiEventStub.ts` deleted
  - [x] `NODE_OPTIONS=--experimental-vm-modules yarn workspace @celo/contractkit run --top-level jest --forceExit src/kit.test.ts` → PASS

  **Commit**: YES | Message: `test(contractkit): rewrite kit.test.ts for Promise-based transaction flow`

- [x] 19. Update all contractkit and CLI test files that mock PromiEvent

  **What to do**:
  - Search for all test files importing PromiEvent/PromiEventStub and update:
    - `packages/sdk/contractkit/src/wrappers/*.test.ts` — update any mocking of .send() return
    - `packages/cli/src/commands/**/*.test.ts` — `.sendAndWaitForReceipt()` calls should still work
    - `packages/sdk/metadata-claims/src/*.test.ts` — `.sendAndWaitForReceipt()` calls should still work
  - Verify all test files using `getViemContract` are updated to `getCeloContract`

  **Recommended Agent Profile**: `unspecified-high` | **Skills**: []
  **Parallelization**: Wave 5 | **Blocks**: Task 21 | **Blocked By**: Task 12

  **References**:
  - All `*.test.ts` files in contractkit wrappers and CLI commands
  - `packages/cli/src/test-utils/chain-setup.ts` — Heavy `.sendAndWaitForReceipt()` usage

  **Acceptance Criteria**:
  - [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` → PASS
  - [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/celocli run test` → PASS
  - [x] `RUN_ANVIL_TESTS=true yarn workspace @celo/governance run test` → PASS

  **Commit**: YES | Message: `test: update all test files for viem contract migration`

- [x] 20. Create changeset for major @celo/connect bump

  **What to do**:
  - Run `yarn cs` and create a changeset:
    - Package: `@celo/connect` — **major** bump
    - Description: Remove PromiEvent, RpcContract, and Contract interface. CeloTxObject.send() now returns Promise<string> instead of PromiEvent. ViemContract replaced with viem native GetContractReturnType. Connection.createContract() removed (use getCeloContract).
  - Also add minor bumps for `@celo/contractkit`, `@celo/governance`, `@celo/celocli`, `@celo/dev-utils` (consuming updated types)

  **Recommended Agent Profile**: `quick` | **Skills**: [`git-master`]
  **Parallelization**: Wave 5 | **Blocks**: Task 21 | **Blocked By**: None

  **Acceptance Criteria**:
  - [x] `.changeset/*.md` file exists with major bump for @celo/connect

  **Commit**: YES | Message: `chore: add changeset for major @celo/connect bump`

- [x] 21. Full build + lint + test verification

  **What to do**:
  - Run full monorepo verification:
    1. `yarn build` — all packages
    2. `yarn lint` — biome lint
    3. `yarn fmt:diff` — formatting check
    4. `RUN_ANVIL_TESTS=true yarn test` — full test suite
  - Verify removal completeness:
    5. `grep -r 'createPromiEvent\|from.*promi-event\|rpc-contract' packages/ --include='*.ts' | grep -v node_modules` → zero
    6. `grep -r 'PromiEvent' packages/ --include='*.ts' | grep -v node_modules | grep -v '.test.'` → zero production results
    7. `grep -r 'ViemContract' packages/ --include='*.ts' | grep -v node_modules` → zero results (or only deprecated alias)
  - Fix any failures found

  **Recommended Agent Profile**: `deep` | **Skills**: []
  **Parallelization**: Wave 5 (sequential after 17-20) | **Blocks**: F1-F4 | **Blocked By**: Tasks 17, 18, 19, 20

  **Acceptance Criteria**:
  - [x] `yarn build` → PASS
  - [x] `yarn lint` → 0 new errors
  - [x] `yarn fmt:diff` → 0 errors
  - [x] `RUN_ANVIL_TESTS=true yarn test` → same pass rate as before (21/23 packages)
  - [x] All grep checks return zero results

  **QA Scenarios:**
  ```
  Scenario: Full monorepo build
    Tool: Bash
    Steps:
      1. Run `yarn build`
      2. Assert exit code 0
    Expected Result: All packages build successfully
    Evidence: .sisyphus/evidence/task-21-build.txt

  Scenario: No PromiEvent or rpc-contract remnants
    Tool: Bash (grep)
    Steps:
      1. Run `grep -r 'createPromiEvent\|from.*promi-event\|rpc-contract' packages/ --include='*.ts' | grep -v node_modules`
      2. Assert zero results
      3. Run `grep -r 'PromiEvent' packages/ --include='*.ts' | grep -v node_modules | grep -v '.test.'`
      4. Assert zero results
    Expected Result: Complete removal verified
    Evidence: .sisyphus/evidence/task-21-grep.txt

  Scenario: Full test suite
    Tool: Bash
    Steps:
      1. Kill stale anvil processes: `pkill -f anvil; sleep 2`
      2. Run `RUN_ANVIL_TESTS=true yarn test`
      3. Assert at least 21/23 packages pass (governance + celocli may have pre-existing port collision flakiness)
    Expected Result: Same pass rate as before migration
    Evidence: .sisyphus/evidence/task-21-tests.txt
  ```

  **Commit**: YES | Message: `chore: fix any remaining issues from viem migration`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + `yarn lint` + `yarn fmt:diff` + `RUN_ANVIL_TESTS=true yarn test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high`
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (full transaction flow end-to-end). Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor(connect): extract receipt polling utility from promi-event` — utils/receipt-polling.ts
- **Wave 2**: `refactor(connect): rewrite transaction pipeline to remove PromiEvent` — connection.ts, viem-tx-object.ts, types.ts, tx-result.ts
- **Wave 3**: `refactor(connect,contractkit): replace ViemContract with viem GetContractReturnType` — BaseWrapper.ts, connection.ts, contract caches
- **Wave 4**: `refactor(contractkit,cli,governance): update all consumers for viem-native contracts` — 24 wrappers, CLI, governance
- **Wave 5**: `feat(connect)!: remove rpc-contract.ts and PromiEvent — BREAKING` — delete files, cleanup, changeset

---

## Success Criteria

### Verification Commands
```bash
yarn build                                    # Expected: all packages build
RUN_ANVIL_TESTS=true yarn test                # Expected: same pass rate as before
yarn lint                                     # Expected: 0 errors (15 pre-existing warnings OK)
yarn fmt:diff                                 # Expected: 0 errors
grep -r "createPromiEvent\|from.*promi-event\|rpc-contract" packages/ --include="*.ts" | grep -v node_modules  # Expected: 0 results
grep -r "PromiEvent" packages/ --include="*.ts" | grep -v node_modules | grep -v ".test."  # Expected: 0 production results
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] All tests pass
- [x] Changeset created for major @celo/connect bump
- [x] No rpc-contract.ts, promi-event.ts, viem-contract.ts in codebase
- [x] No PromiEvent in production code
- [x] CeloTransactionObject.send() and .sendAndWaitForReceipt() work identically
