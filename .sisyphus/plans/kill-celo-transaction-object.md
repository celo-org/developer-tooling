# Kill CeloTxObject + CeloTransactionObject — Go Viem-Native

## TL;DR

> **Quick Summary**: Eliminate `CeloTxObject`, `CeloTransactionObject`, and `createViemTxObject` — the last major web3-era abstractions. Wrapper methods become eager (return tx hash like viem's `writeContract`). Encoding uses viem's `encodeFunctionData` directly. Reads use `connection.callContract()`.
> 
> **Deliverables**:
> - All wrapper write methods return `Promise<`0x${string}`>` (tx hash) instead of `CeloTransactionObject`
> - `BaseWrapper.encodeFunctionData()` for governance proposals/multisig encoding
> - `connection.callContract()` helper replaces `createViemTxObject(...).call()`
> - All 101 `createViemTxObject` usages replaced with viem-native patterns
> - `displaySendTx` converged into existing `displayViemTx`
> - Dead code removed: `CeloTxObject`, `CeloTransactionObject`, `toTransactionObject`, `CeloTransactionParams`, `createViemTxObject`, `createViemTxObjectInternal`, `proxyCallGeneric`, `proxyCallGenericImpl`, `requireCall`
> 
> **Estimated Effort**: XL
> **Parallel Execution**: YES — 5 waves
> **Critical Path**: Task 1 (foundation) → Task 2 (connection) → Tasks 3-7 (wrappers) → Tasks 8-13 (CLI/governance) → Task 14 (cleanup)

---

## Context

### Original Request
User identified `as unknown as CeloTransactionObject<boolean>` casts as unacceptable, questioned whether `CeloTransactionObject` should exist at all, then drove the design toward fully viem-native patterns: eager sending (return tx hash), native `encodeFunctionData` for encoding, no custom wrapper types.

### Interview Summary
**Key Discussions**:
- `<O>` generic on both `CeloTxObject<O>` and `CeloTransactionObject<O>` is 100% dead — `.call()` never invoked, `.send()` returns `TransactionResult` not `O`
- `CeloTxObject.send()` and `CeloTxObject.call()` are both never called directly — completely dead methods
- `_parent` on `CeloTxObject` is a massive web3 remnant — events/methods/deploy/getPastEvents all stubbed as `{} as any`
- `createViemTxObject` has 101 usages across 28 files serving 3 purposes: send, call (read), encode
- `displayViemTx` already exists in CLI with 27 usages — target pattern for transaction display
- User chose: eager sending (return hash), both eager + encode, full cleanup, hard break, no aliases

**Research Findings**:
- `proxyCallGenericImpl` uses `createViemTxObjectInternal` + `.call()` for 7 read ops in Erc20/CeloToken wrappers
- `AbstractFeeCurrencyWrapper` uses `createViemTxObject` + `.call()` for 5 read ops
- `address-registry.ts` and `sourcify.ts` use `.call()` for reads
- `ProposalBuilder.buildCallToCoreContract()` uses `createViemTxObject` for encoding
- `requireCall` in CLI is dead code (defined, never imported)
- `ProposalBuilder.addTx()` is dead code (defined, never called externally)
- 7+ array-returning methods (Election.activate/revoke, LockedGold.relock, ReleaseGold.relockGold/revoke/revokeAllVotesForGroup/revokeAllVotesForAllGroups)

### Metis Review
**Critical Findings**:
- `proxyCallGenericImpl` read path MUST be addressed before killing `createViemTxObjectInternal`
- `connection.sendTransaction()` is a drop-in replacement for `sendTransactionObject()` — gas estimation is identical
- `Election.revoke()` was missing from array-returning methods list
- `displaySendTx` should converge into existing `displayViemTx`, not be refactored independently
- `LockedGold.relock()` uses `reduceRight()` for index ordering — must preserve send order
- `MultiSig.submitTransaction()` takes `CeloTxObject` parameter — must be updated

---

## Work Objectives

### Core Objective
Eliminate the last major web3-era transaction abstractions (`CeloTxObject`, `CeloTransactionObject`, `createViemTxObject`) and replace with viem-native patterns: eager sending (tx hash return), native `encodeFunctionData`, and direct `connection.callContract()` for reads.

### Concrete Deliverables
- `BaseWrapper.sendTx()` protected method — eager send, returns tx hash
- `BaseWrapper.sendTxUnchecked()` for generic wrappers — same but untyped function name
- `BaseWrapper.encodeFunctionData()` public method — for governance/multisig encoding
- `connection.callContract()` helper — replaces `createViemTxObject(...).call()` pattern
- All 21 wrapper files migrated to eager send pattern
- All 101 `createViemTxObject` call sites replaced
- All 78 `displaySendTx` call sites converged into `displayViemTx`
- Dead types and functions removed from `@celo/connect`

### Definition of Done
- [ ] `yarn build` exits 0 (full monorepo)
- [ ] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` passes
- [ ] `yarn workspace @celo/governance run build && yarn workspace @celo/governance run test` passes
- [ ] `RUN_ANVIL_TESTS=true yarn workspace @celo/celocli run test` passes
- [ ] `yarn lint && yarn fmt:diff` passes
- [ ] Zero `CeloTransactionObject` references in codebase
- [ ] Zero `CeloTxObject` references in codebase (except deprecated re-export if any)
- [ ] Zero `createViemTxObject` references in codebase
- [ ] Zero `displaySendTx` references in codebase

### Must Have
- Wrapper write methods return `Promise<`0x${string}`>` (tx hash)
- `encodeFunctionData()` on BaseWrapper for governance/multisig encoding path
- `connection.callContract()` for read operations without a wrapper
- All existing tests pass (behavior preservation)
- Array-returning methods send sequentially, return `Promise<`0x${string}`[]>`

### Must NOT Have (Guardrails)
- NO new custom wrapper types — no `CeloTransaction`, no `SendableTx`, no intermediate objects
- NO changes to read-only wrapper methods (`.getXxx()`, `.isXxx()`) — they already use `this.contract.read.*`
- NO changes to `@celo/actions` package (already viem-native)
- NO changes to wallet packages (`@celo/wallet-*`), `@celo/base`, `@celo/cryptographic-utils`
- NO "improvements" to event decoding, error handling, or gas estimation while refactoring
- NO documentation additions or JSDoc rewrites beyond updating changed signatures
- NO refactoring existing tests beyond what's necessary for new return types
- NO changes to `TransactionResult` class (can be deprecated later, not in scope)
- PRESERVE `LockedGold.relock()` / `ReleaseGold.relockGold()` send ordering (end-to-start index invariant)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Jest with Anvil for contractkit/governance/CLI, Vitest for modern packages)
- **Automated tests**: Run existing tests — behavior preservation refactor
- **Framework**: Jest with `NODE_OPTIONS=--experimental-vm-modules` for SDK packages

### QA Policy
Every task MUST include agent-executed QA scenarios.
- **Build verification**: `yarn workspace @celo/<pkg> run build` after each wave
- **Test verification**: `RUN_ANVIL_TESTS=true yarn workspace @celo/<pkg> run test` after each wave
- **Lint/format**: `yarn lint && yarn fmt:diff` after final wave
- Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — no public API changes):
├── Task 1: Add sendTx/sendTxUnchecked/encodeFunctionData to BaseWrapper [deep]
├── Task 2: Add connection.callContract() helper + migrate proxyCallGenericImpl [deep]
├── Task 3: Migrate AbstractFeeCurrencyWrapper reads to callContract/contract.read [quick]
└── Task 4: Migrate address-registry.ts + sourcify.ts reads to callContract [quick]

Wave 2 (Wrappers — migrate to eager send):
├── Task 5: Simple wrappers (8 files: Freezer, OdisPayments, Reserve, GoldToken, Attestations, SortedOracles, Escrow, FederatedAttestations) [unspecified-high]
├── Task 6: StableToken + MultiSig + FeeHandler + EpochManager [unspecified-high]
├── Task 7: Erc20Wrapper + CeloTokenWrapper (generic wrappers — sendTxUnchecked) [quick]
├── Task 8: Election + LockedGold (array-returning methods) [deep]
└── Task 9: Governance + Validators + Accounts + ReleaseGold (complex) [deep]

Wave 3 (Governance + ProposalBuilder):
├── Task 10: ProposalBuilder — replace createViemTxObject with encodeFunctionData [unspecified-high]
├── Task 11: proxy.ts setImplementationOnProxy — return encoded data [quick]
└── Task 12: dev-utils/chain-setup.ts — replace createViemTxObject [quick]

Wave 4 (CLI — converge displaySendTx → displayViemTx):
├── Task 13: CLI utils — refactor displaySendTx callers + safe.ts + governance/approve.ts [unspecified-high]
├── Task 14: CLI test utilities — chain-setup, multisigUtils, release-gold test utils [unspecified-high]
├── Task 15: CLI DKG commands — replace createViemTxObject .send()/.call() [quick]
├── Task 16: CLI remaining test files — propose.test, execute.test, etc. [unspecified-high]
└── Task 17: CLI network/contracts.ts + remaining .call() usages [quick]

Wave 5 (Cleanup — remove dead code):
├── Task 18: Kill CeloTransactionObject class + toTransactionObject + CeloTransactionParams [quick]
├── Task 19: Kill CeloTxObject interface + _parent type structure [quick]
├── Task 20: Kill createViemTxObject/Internal + viem-tx-object.ts cleanup [quick]
├── Task 21: Kill proxyCallGeneric/Impl + buildTx/buildTxUnchecked + requireCall + dead ProposalBuilder methods [quick]
├── Task 22: Remove dead imports/exports from @celo/connect index.ts [quick]
└── Task 23: Full verification — build, test, lint across all packages [deep]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 5 → Task 10 → Task 13 → Task 18 → Task 23 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 5-9 |
| 2 | — | 3, 4, 10, 15, 17 |
| 3 | 2 | 21 |
| 4 | 2 | 21 |
| 5 | 1 | 13, 18 |
| 6 | 1 | 13, 18 |
| 7 | 1 | 18 |
| 8 | 1 | 13, 18 |
| 9 | 1 | 10, 13, 18 |
| 10 | 2, 9 | 20 |
| 11 | — | 10 |
| 12 | 2 | 20 |
| 13 | 5, 6, 8, 9 | 18 |
| 14 | 2, 5-9 | 20 |
| 15 | 2 | 20 |
| 16 | 5-9, 14 | 20 |
| 17 | 2 | 20 |
| 18 | 5-9, 13 | 22 |
| 19 | 18 | 22 |
| 20 | 10, 12, 14-17 | 22 |
| 21 | 3, 4, 7, 18 | 22 |
| 22 | 18-21 | 23 |
| 23 | 22 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks — T1 → `deep`, T2 → `deep`, T3 → `quick`, T4 → `quick`
- **Wave 2**: 5 tasks — T5 → `unspecified-high`, T6 → `unspecified-high`, T7 → `quick`, T8 → `deep`, T9 → `deep`
- **Wave 3**: 3 tasks — T10 → `unspecified-high`, T11 → `quick`, T12 → `quick`
- **Wave 4**: 5 tasks — T13 → `unspecified-high`, T14 → `unspecified-high`, T15 → `quick`, T16 → `unspecified-high`, T17 → `quick`
- **Wave 5**: 6 tasks — T18-T22 → `quick`, T23 → `deep`
- **FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + verification = ONE task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.

- [ ] 1. Add `sendTx()`, `sendTxUnchecked()`, and `encodeFunctionData()` to BaseWrapper

  **What to do**:
  - Add `protected async sendTx(functionName, args, txParams?)` method that:
    1. Finds the method ABI from `this.contract.abi`
    2. Calls `coerceArgsForAbi(methodAbi.inputs, args)` for type coercion
    3. Calls viem's `encodeFunctionData({ abi: [methodAbi], args: coercedArgs })` to encode
    4. Calls `this.connection.sendTransaction({ ...txParams, to: this.contract.address, data })` to send
    5. Extracts and returns the tx hash via `result.getHash()` as `\`0x${string}\``
  - Add `protected async sendTxUnchecked(functionName: string, args, txParams?)` — same but accepts any string function name (for Erc20Wrapper/CeloTokenWrapper where TAbi is unresolved)
  - Add `public encodeFunctionData(functionName: string, args: unknown[]): \`0x${string}\`` that does steps 1-3 without sending
  - Import `encodeFunctionData` from `viem` and `coerceArgsForAbi` from `../connect`
  - Keep `buildTx()` and `buildTxUnchecked()` alive for now (other tasks depend on them during transition)

  **Must NOT do**:
  - Do NOT remove `buildTx`/`buildTxUnchecked` yet (Task 21 does that)
  - Do NOT change any wrapper method signatures yet (Wave 2 does that)
  - Do NOT change `CeloTransactionObject` or `CeloTxObject` types

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 5, 6, 7, 8, 9
  - **Blocked By**: None

  **References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:95-130` — existing `buildTx`/`buildTxUnchecked` pattern to follow
  - `packages/sdk/connect/src/viem-tx-object.ts:27-109` — `createViemTxObjectInternal` does coercion + encoding + send object creation — reuse the coercion/encoding logic
  - `packages/sdk/connect/src/viem-abi-coder.ts` — `coerceArgsForAbi` function
  - `packages/sdk/connect/src/connection.ts:266-299` — `connection.sendTransaction()` — this is what sendTx delegates to
  - `packages/sdk/connect/src/utils/tx-result.ts:49` — `TransactionResult.getHash()` returns `Promise<string>`

  **Acceptance Criteria**:
  - [ ] `sendTx()` method exists on BaseWrapper, is protected, returns `Promise<\`0x${string}\`>`
  - [ ] `sendTxUnchecked()` method exists on BaseWrapper, is protected, returns `Promise<\`0x${string}\`>`
  - [ ] `encodeFunctionData()` method exists on BaseWrapper, is public, returns `\`0x${string}\``
  - [ ] `yarn workspace @celo/contractkit run build` exits 0
  - [ ] Existing `buildTx`/`buildTxUnchecked` still work (not removed)

  **QA Scenarios:**
  ```
  Scenario: New methods compile and coexist with buildTx
    Tool: Bash
    Steps:
      1. Run `yarn workspace @celo/contractkit run build` → exit 0
      2. Run `grep -c 'sendTx' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` → ≥ 2 (sendTx + sendTxUnchecked)
      3. Run `grep -c 'encodeFunctionData' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` → ≥ 1
      4. Run `grep -c 'buildTx' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` → ≥ 2 (still present)
    Expected Result: All new methods present, build passes, old methods intact
    Evidence: .sisyphus/evidence/task-1-basewrapper-sendtx.txt
  ```

  **Commit**: NO (groups with Wave 1 commit)

- [ ] 2. Add `connection.callContract()` helper and migrate `proxyCallGenericImpl`

  **What to do**:
  - Add `callContract(contract: ContractRef, functionName: string, args: unknown[]): Promise<unknown>` to Connection class that:
    1. Finds method ABI from contract.abi
    2. Calls `coerceArgsForAbi` + viem's `encodeFunctionData`
    3. Calls `this.viemClient.call({ to: contract.address, data })`
    4. Calls viem's `decodeFunctionResult({ abi, functionName, data: result.data })` to decode
    5. Returns the decoded result
  - This replaces the pattern: `createViemTxObjectInternal(connection, contract, fn, args)` → `.call()`
  - Migrate `proxyCallGenericImpl` in BaseWrapper.ts to use `connection.callContract()` instead of `createViemTxObjectInternal` + `.call()`
  - The `proxyCallGeneric` overloads and `proxyCallGenericImpl` function can be simplified but NOT removed yet (Task 21)

  **Must NOT do**:
  - Do NOT remove `proxyCallGeneric` export (Erc20Wrapper/CeloTokenWrapper still import it)
  - Do NOT remove `createViemTxObjectInternal` yet (other files still use it)

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 3, 4, 10, 15, 17
  - **Blocked By**: None

  **References**:
  - `packages/sdk/connect/src/connection.ts:302-329` — `sendTransactionObject` shows how connection uses txObj internally
  - `packages/sdk/connect/src/viem-tx-object.ts:50-70` — the `.call()` implementation that `callContract` replaces
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:366-395` — `proxyCallGenericImpl` to migrate
  - `packages/sdk/connect/src/viem-abi-coder.ts` — `coerceArgsForAbi`

  **Acceptance Criteria**:
  - [ ] `callContract()` method exists on Connection class
  - [ ] `proxyCallGenericImpl` no longer uses `createViemTxObjectInternal`
  - [ ] `yarn workspace @celo/connect run build` exits 0
  - [ ] `yarn workspace @celo/contractkit run build` exits 0
  - [ ] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` passes (proxyCallGeneric-based reads still work)

  **QA Scenarios:**
  ```
  Scenario: callContract works for read operations
    Tool: Bash
    Steps:
      1. Run `yarn workspace @celo/connect run build` → exit 0
      2. Run `yarn workspace @celo/contractkit run build` → exit 0
      3. Run `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` → all pass
      4. Run `grep 'createViemTxObjectInternal' packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` → 0 matches
    Expected Result: Read operations work via callContract, build passes, tests pass
    Evidence: .sisyphus/evidence/task-2-callcontract.txt
  ```

  **Commit**: NO (groups with Wave 1 commit)

- [ ] 3. Migrate AbstractFeeCurrencyWrapper reads to `callContract` / `contract.read`

  **What to do**:
  - Replace 5 `createViemTxObject(...).call()` usages in `AbstractFeeCurrencyWrapper.ts` with `connection.callContract()` or `contract.read.*`
  - The 5 reads are: `getAdaptedToken`, `name`, `symbol`, `decimals`, and one more `getAdaptedToken` variant
  - Import `callContract` from connection if using that path, or use `contract.read.*` if the contract type supports it

  **Must NOT do**:
  - Do NOT change write methods
  - Do NOT modify the wrapper's public API

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 4, after Tasks 1-2)
  - **Parallel Group**: Wave 1 (after T2 completes)
  - **Blocks**: Task 21
  - **Blocked By**: Task 2

  **References**:
  - `packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts:57-82` — the 5 createViemTxObject calls to replace

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in AbstractFeeCurrencyWrapper.ts
  - [ ] `yarn workspace @celo/contractkit run build` exits 0

  **QA Scenarios:**
  ```
  Scenario: AbstractFeeCurrencyWrapper reads work without createViemTxObject
    Tool: Bash
    Steps:
      1. Run `grep -c 'createViemTxObject' packages/sdk/contractkit/src/wrappers/AbstractFeeCurrencyWrapper.ts` → 0
      2. Run `yarn workspace @celo/contractkit run build` → exit 0
    Expected Result: No createViemTxObject, build passes
    Evidence: .sisyphus/evidence/task-3-feecurrency.txt
  ```

  **Commit**: NO (groups with Wave 1 commit)

- [ ] 4. Migrate `address-registry.ts` and `sourcify.ts` reads to `callContract`

  **What to do**:
  - Replace `createViemTxObject<string>(connection, registryContract, 'getAddressForString', [...]).call()` in `address-registry.ts:38` with `connection.callContract()`
  - Replace `createViemTxObject<Address>(connection, proxyContract, fn, []).call()` in `sourcify.ts:263` with `connection.callContract()`

  **Must NOT do**:
  - Do NOT change the public API of AddressRegistry or sourcify

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 3, after Task 2)
  - **Parallel Group**: Wave 1 (after T2 completes)
  - **Blocks**: Task 21
  - **Blocked By**: Task 2

  **References**:
  - `packages/sdk/contractkit/src/address-registry.ts:38` — createViemTxObject for registry lookup
  - `packages/sdk/explorer/src/sourcify.ts:263` — createViemTxObject for proxy implementation lookup

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in address-registry.ts
  - [ ] Zero `createViemTxObject` in sourcify.ts
  - [ ] `yarn workspace @celo/contractkit run build` exits 0
  - [ ] `yarn workspace @celo/explorer run build` exits 0

  **QA Scenarios:**
  ```
  Scenario: Registry and sourcify reads work without createViemTxObject
    Tool: Bash
    Steps:
      1. Run `grep -c 'createViemTxObject' packages/sdk/contractkit/src/address-registry.ts` → 0
      2. Run `grep -c 'createViemTxObject' packages/sdk/explorer/src/sourcify.ts` → 0
      3. Run `yarn workspace @celo/contractkit run build && yarn workspace @celo/explorer run build` → exit 0
    Expected Result: No createViemTxObject, builds pass
    Evidence: .sisyphus/evidence/task-4-registry-sourcify.txt
  ```

  **Commit**: YES
  - Message: `feat(connect,contractkit): add callContract helper and sendTx/encodeFunctionData to BaseWrapper`
  - Pre-commit: `yarn workspace @celo/connect run build && yarn workspace @celo/contractkit run build && yarn workspace @celo/explorer run build`

- [ ] 5. Migrate simple wrappers to eager send (8 files)

  **What to do**:
  - Replace `buildTx('functionName', [...])` with `this.sendTx('functionName', [...], txParams)` in 8 simple wrapper files
  - Add `txParams?: Omit<CeloTx, 'data'>` parameter to each write method
  - Change return types from `CeloTransactionObject<void>` to `Promise<\`0x${string}\`>`
  - Remove `CeloTransactionObject` import from each file
  - Files: Freezer, OdisPayments, Reserve, GoldTokenWrapper, Attestations, SortedOracles, Escrow, FederatedAttestations
  - **SortedOracles.report()** special case: currently uses `toTransactionObject(this.connection, txo.txo, { from: oracleAddress })` for defaultParams. Replace with: `return this.sendTx('report', [...args], { from: oracleAddress })`

  **Must NOT do**:
  - Do NOT modify read methods
  - Do NOT remove `CeloTransactionObject` type from `@celo/connect` (Task 18)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 6-9)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 13, 18
  - **Blocked By**: Task 1

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Freezer.ts` — 2 methods
  - `packages/sdk/contractkit/src/wrappers/OdisPayments.ts` — 2 methods
  - `packages/sdk/contractkit/src/wrappers/Reserve.ts` — 3 methods
  - `packages/sdk/contractkit/src/wrappers/GoldTokenWrapper.ts` — 3 methods
  - `packages/sdk/contractkit/src/wrappers/Attestations.ts` — 4 methods
  - `packages/sdk/contractkit/src/wrappers/SortedOracles.ts` — 3 methods (report has defaultParams)
  - `packages/sdk/contractkit/src/wrappers/Escrow.ts` — 4 methods
  - `packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts` — 1 method

  **Acceptance Criteria**:
  - [ ] Zero `CeloTransactionObject` in the 8 files
  - [ ] Zero `buildTx` calls in the 8 files
  - [ ] All write methods return `Promise<\`0x${string}\`>`
  - [ ] `yarn workspace @celo/contractkit run build` exits 0

  **QA Scenarios:**
  ```
  Scenario: Simple wrappers build with eager send
    Tool: Bash
    Steps:
      1. Run `grep -rl 'CeloTransactionObject' packages/sdk/contractkit/src/wrappers/{Freezer,OdisPayments,Reserve,GoldTokenWrapper,Attestations,SortedOracles,Escrow,FederatedAttestations}.ts` → 0 matches
      2. Run `yarn workspace @celo/contractkit run build` → exit 0
    Expected Result: No CeloTransactionObject, build passes
    Evidence: .sisyphus/evidence/task-5-simple-wrappers.txt
  ```

  **Commit**: NO (groups with Wave 2 commit)

- [ ] 6. Migrate StableToken + MultiSig + FeeHandler + EpochManager to eager send

  **What to do**:
  - Same pattern as Task 5 but for medium-complexity wrappers
  - **StableToken**: 4 methods (increaseAllowance, decreaseAllowance, mint, burn)
  - **MultiSig**: 3 methods (submitOrConfirmTransaction, confirmTransaction, submitTransaction). **CRITICAL**: `submitOrConfirmTransaction` takes a `CeloTxObject<unknown>` parameter — change to accept `{ to: string, data: string }` or just `data: string` (the encoded calldata). Currently calls `txObject.encodeABI()` — replace with accepting pre-encoded data
  - **FeeHandler**: 3 methods (handle, sell, distribute)
  - **EpochManager**: 4 methods (startNextEpochProcessTx, finishNextEpochProcessTx, processGroupsTx, sendValidatorPayment, setToProcessGroups)

  **Must NOT do**:
  - Do NOT change `MultiSig.getTransaction()` or other read methods

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5, 7-9)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 13, 18
  - **Blocked By**: Task 1

  **References**:
  - `packages/sdk/contractkit/src/wrappers/StableTokenWrapper.ts` — 4 buildTx calls
  - `packages/sdk/contractkit/src/wrappers/MultiSig.ts:39-137` — takes CeloTxObject param, calls .encodeABI()
  - `packages/sdk/contractkit/src/wrappers/FeeHandler.ts` — 3 methods
  - `packages/sdk/contractkit/src/wrappers/EpochManager.ts:94-122` — 5 methods

  **Acceptance Criteria**:
  - [ ] Zero `CeloTransactionObject` in StableToken, MultiSig, FeeHandler, EpochManager
  - [ ] Zero `CeloTxObject` in MultiSig.ts
  - [ ] `yarn workspace @celo/contractkit run build` exits 0

  **QA Scenarios:**
  ```
  Scenario: Medium wrappers build with eager send
    Tool: Bash
    Steps:
      1. Run `grep -c 'CeloTransactionObject\|CeloTxObject' packages/sdk/contractkit/src/wrappers/{StableTokenWrapper,MultiSig,FeeHandler,EpochManager}.ts` → 0 each
      2. Run `yarn workspace @celo/contractkit run build` → exit 0
    Expected Result: No old types, build passes
    Evidence: .sisyphus/evidence/task-6-medium-wrappers.txt
  ```

  **Commit**: NO (groups with Wave 2 commit)

- [ ] 7. Migrate Erc20Wrapper + CeloTokenWrapper to eager send (generic wrappers)

  **What to do**:
  - Replace `buildTxUnchecked` with `sendTxUnchecked` in Erc20Wrapper (approve, transfer, transferFrom) and CeloTokenWrapper (increaseAllowance)
  - Change return types from `CeloTransactionObject<void>` to `Promise<\`0x${string}\`>`
  - Remove `CeloTransactionObject` import
  - Remove `as CeloTransactionObject<void>` casts

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5-6, 8-9)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 18
  - **Blocked By**: Task 1

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Erc20Wrapper.ts:30-54` — 3 buildTxUnchecked calls
  - `packages/sdk/contractkit/src/wrappers/CeloTokenWrapper.ts:40-44` — 1 buildTxUnchecked call

  **Acceptance Criteria**:
  - [ ] Zero `CeloTransactionObject` in Erc20Wrapper.ts and CeloTokenWrapper.ts
  - [ ] Zero `buildTxUnchecked` in both files (replaced with `sendTxUnchecked`)
  - [ ] `yarn workspace @celo/contractkit run build` exits 0

  **Commit**: NO (groups with Wave 2 commit)

- [ ] 8. Migrate Election + LockedGold to eager send (array-returning methods)

  **What to do**:
  - Replace `buildTx` with `sendTx` in all write methods
  - **Array-returning methods** (Election.activate, Election.revoke, Election.revokeVotes, LockedGold.relock):
    - Change return type from `Promise<CeloTransactionObject<boolean>[]>` to `Promise<\`0x${string}\`[]>`
    - Send transactions sequentially inside the method, collect hashes
    - **CRITICAL for LockedGold.relock()**: Preserve `reduceRight()` ordering (end-to-start) — this prevents index shifting when withdrawing multiple pending amounts
  - Remove `CeloTransactionObject` and all `as CeloTransactionObject<boolean>` casts
  - Add `txParams?` parameter to each write method

  **Must NOT do**:
  - Do NOT change send ordering in relock/relockGold (must remain end-to-start)
  - Do NOT modify read methods

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5-7, 9)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 13, 18
  - **Blocked By**: Task 1

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Election.ts:425-530` — activate, revokePending, revokeActive, vote + array methods
  - `packages/sdk/contractkit/src/wrappers/LockedGold.ts:165-192` — relock uses reduceRight for index ordering

  **Acceptance Criteria**:
  - [ ] Zero `CeloTransactionObject` in Election.ts and LockedGold.ts
  - [ ] Array-returning methods return `Promise<\`0x${string}\`[]>`
  - [ ] LockedGold.relock() preserves reduceRight ordering
  - [ ] `yarn workspace @celo/contractkit run build` exits 0
  - [ ] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` passes

  **Commit**: NO (groups with Wave 2 commit)

- [ ] 9. Migrate Governance + Validators + Accounts + ReleaseGold to eager send

  **What to do**:
  - Replace `buildTx` with `sendTx` in all write methods across these 4 complex wrappers
  - Remove ALL `as unknown as CeloTransactionObject<boolean>` casts (6 in Validators.ts)
  - Remove ALL `as CeloTransactionObject<boolean>` casts (5 in Election references from private methods)
  - Change return types from `CeloTransactionObject<void|boolean>` to `Promise<\`0x${string}\`>`
  - Add `txParams?` to each write method
  - **ReleaseGold array methods** (relockGold, revoke, revokeAllVotesForGroup, revokeAllVotesForAllGroups): same pattern as Task 8 — send sequentially, return hash array, preserve reduceRight ordering for relockGold
  - **Accounts conditional branching** (`_authorizeValidatorSignerWithKeys` / `_authorizeValidatorSigner`): keep the branching logic, just change both paths to `sendTx` instead of `buildTx`
  - **Governance**: 6 write methods (upvote, revokeUpvote, approve, vote, votePartially, execute)

  **Must NOT do**:
  - Do NOT use `as any` — the `as unknown as` casts go away entirely since return type is now just `Promise<\`0x${string}\`>`

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5-8)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 10, 13, 18
  - **Blocked By**: Task 1

  **References**:
  - `packages/sdk/contractkit/src/wrappers/Governance.ts` — 6 write methods
  - `packages/sdk/contractkit/src/wrappers/Validators.ts:477-610` — 6 `as unknown as` casts
  - `packages/sdk/contractkit/src/wrappers/Accounts.ts` — conditional branching in authorizeSigner methods
  - `packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:336-660` — array-returning methods + 20+ write methods

  **Acceptance Criteria**:
  - [ ] Zero `CeloTransactionObject` in Governance, Validators, Accounts, ReleaseGold
  - [ ] Zero `as unknown as` casts in Validators.ts
  - [ ] `yarn workspace @celo/contractkit run build` exits 0
  - [ ] `yarn workspace @celo/governance run build` exits 0
  - [ ] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` passes

  **Commit**: YES
  - Message: `refactor(contractkit): migrate wrapper write methods to eager send (return tx hash)`
  - Pre-commit: `yarn workspace @celo/contractkit run build && yarn workspace @celo/governance run build`

- [ ] 10. ProposalBuilder — replace createViemTxObject with encodeFunctionData

  **What to do**:
  - In `buildCallToCoreContract()` (line 219): replace `createViemTxObject(connection, contract, methodName, args)` with viem's `encodeFunctionData({ abi: contract.abi, functionName: methodName, args })` (with coercion via `coerceArgsForAbi`)
  - Replace `fromWeb3tx(tx: CeloTxObject<any>, params)` with `fromEncodedTx(data: string, params: ProposalTxParams)` — it only needs `data` (currently calls `tx.encodeABI()`)
  - Replace `addWeb3Tx(tx: CeloTxObject<any>, params)` with `addEncodedTx(data: string, params: ProposalTxParams)`
  - Remove dead `addTx(tx: CeloTransactionObject<any>, ...)` method (never called)
  - Update `addProxyRepointingTx` to use new encoding pattern
  - Remove imports of `CeloTxObject`, `CeloTransactionObject`, `createViemTxObject`
  - Update the test file `proposal-builder.test.ts` accordingly (it calls `addWeb3Tx`)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 11, 12)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 20
  - **Blocked By**: Tasks 2, 9

  **References**:
  - `packages/sdk/governance/src/proposal-builder.ts:64-108` — fromWeb3tx, addWeb3Tx, addTx
  - `packages/sdk/governance/src/proposal-builder.ts:219` — buildCallToCoreContract uses createViemTxObject
  - `packages/sdk/governance/src/proposal-builder.test.ts:30` — test uses addWeb3Tx
  - `packages/sdk/connect/src/viem-abi-coder.ts` — coerceArgsForAbi for arg coercion before encodeFunctionData

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in proposal-builder.ts
  - [ ] Zero `CeloTxObject` in proposal-builder.ts
  - [ ] Zero `CeloTransactionObject` in proposal-builder.ts
  - [ ] `yarn workspace @celo/governance run build` exits 0
  - [ ] `yarn workspace @celo/governance run test` passes

  **Commit**: NO (groups with Wave 3 commit)

- [ ] 11. proxy.ts setImplementationOnProxy — return encoded data

  **What to do**:
  - `setImplementationOnProxy(address, connection)` currently returns `CeloTxObject` via `createViemTxObject`. Change to return `{ to: string, data: string }` — the encoded proxy repoint calldata + proxy address
  - Or return just `string` (the encoded data) and have ProposalBuilder supply the `to` address
  - Update `ProposalBuilder.addProxyRepointingTx` to use the new return shape

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 10, 12)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 10
  - **Blocked By**: None

  **References**:
  - `packages/sdk/contractkit/src/proxy.ts:160-162` — setImplementationOnProxy
  - `packages/sdk/governance/src/proposal-builder.ts:75-86` — addProxyRepointingTx caller

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in proxy.ts
  - [ ] `yarn workspace @celo/contractkit run build` exits 0

  **Commit**: NO (groups with Wave 3 commit)

- [ ] 12. dev-utils/chain-setup.ts — replace createViemTxObject

  **What to do**:
  - Replace 3 `createViemTxObject(...).send({from})` patterns with `connection.sendTransaction({ to, data: encodeFunctionData(...), from })`
  - Import `encodeFunctionData` from viem, `coerceArgsForAbi` from connect
  - Remove `createViemTxObject` import

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 10, 11)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 20
  - **Blocked By**: Task 2

  **References**:
  - `packages/dev-utils/src/chain-setup.ts:18-65` — 3 createViemTxObject calls

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in chain-setup.ts
  - [ ] `yarn workspace @celo/dev-utils run build` exits 0

  **Commit**: YES
  - Message: `refactor(governance): replace createViemTxObject with encodeFunctionData in ProposalBuilder and chain-setup`

- [ ] 13. CLI — converge displaySendTx into displayViemTx + update safe.ts + governance/approve.ts

  **What to do**:
  - `displayViemTx` already exists at `cli/src/utils/cli.ts:68` with signature `(name, hash: Promise<Address>, client: PublicCeloClient)`. Use this as the target pattern.
  - For ALL CLI command files currently using `displaySendTx('name', wrapper.method(), { from })`: change to `displayViemTx('name', wrapper.method({ from }), publicClient)`
  - **safe.ts**: Replace `tx.txo.encodeABI()` with `wrapper.encodeFunctionData('method', args)` or viem's `encodeFunctionData` directly
  - **governance/approve.ts**: Replace `.txo` access with `wrapper.encodeFunctionData()` for multisig submission. Replace `displaySendTx` calls with `displayViemTx`
  - **governance/withdraw.ts**: Same pattern
  - After all callers migrated, remove `displaySendTx` function definition
  - Remove `CeloTransactionObject` import from cli.ts
  - **NOTE**: This task handles ~78 displaySendTx call sites across ~54 files. Use `ast_grep_search` to find all sites. Work file-by-file.

  **Must NOT do**:
  - Do NOT modify `displayViemTx` function (it's already correct)
  - Do NOT add new transaction display functions

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (touches many CLI files, risk of conflicts)
  - **Parallel Group**: Wave 4 (sequential within wave)
  - **Blocks**: Task 18
  - **Blocked By**: Tasks 5, 6, 8, 9

  **References**:
  - `packages/cli/src/utils/cli.ts:68-139` — `displayViemTx` — the TARGET pattern
  - `packages/cli/src/utils/cli.ts:141-155` — `displaySendTx` — to be REPLACED
  - `packages/cli/src/utils/safe.ts:24-31` — uses `.txo.encodeABI()`
  - `packages/cli/src/commands/governance/approve.ts:170-189` — uses `.txo` for multisig

  **Acceptance Criteria**:
  - [ ] Zero `displaySendTx` in CLI codebase
  - [ ] Zero `CeloTransactionObject` in CLI source (non-test) files
  - [ ] Zero `.txo` access in CLI source files
  - [ ] `yarn workspace @celo/celocli run build` exits 0

  **Commit**: NO (groups with Wave 4 commit)

- [ ] 14. CLI test utilities — replace createViemTxObject in chain-setup, multisigUtils, release-gold

  **What to do**:
  - Replace all `createViemTxObject(...).send()` and `.sendAndWaitForReceipt()` in:
    - `cli/src/test-utils/chain-setup.ts` (~10 calls)
    - `cli/src/test-utils/multisigUtils.ts` (~3 calls)
    - `cli/src/test-utils/release-gold.ts` (~1 call)
  - Pattern: `const data = encodeFunctionData({ abi, functionName, args }); await connection.sendTransaction({ to, data, from }).then(r => r.waitReceipt())`
  - Or use new wrapper methods where wrappers are available
  - Update `.sendAndWaitForReceipt()` calls on wrapper results to just `await wrapperMethod(txParams)` (now eager)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 13, 15-17)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 20
  - **Blocked By**: Tasks 2, 5-9

  **References**:
  - `packages/cli/src/test-utils/chain-setup.ts` — ~10 createViemTxObject + wrapper .sendAndWaitForReceipt calls
  - `packages/cli/src/test-utils/multisigUtils.ts:64-77` — 3 createViemTxObject calls
  - `packages/cli/src/test-utils/release-gold.ts:44-59` — 1 createViemTxObject call

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in CLI test-utils
  - [ ] `yarn workspace @celo/celocli run build` exits 0

  **Commit**: NO (groups with Wave 4 commit)

- [ ] 15. CLI DKG commands — replace createViemTxObject .send()/.call()

  **What to do**:
  - DKG commands use `createViemTxObject` for both `.send()` and `.call()` patterns:
    - `dkg/register.ts` — `.send()` via displayTx
    - `dkg/start.ts` — `.send()` via displayTx
    - `dkg/allowlist.ts` — `.send()` via displayTx
    - `dkg/publish.ts` — `.send()` via displayTx
    - `dkg/get.ts` — `.call()` for reading data (6 calls)
  - For send: use `encodeFunctionData` + `connection.sendTransaction` or displayViemTx
  - For call: use `connection.callContract()` from Task 2

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 13, 14, 16, 17)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 20
  - **Blocked By**: Task 2

  **References**:
  - `packages/cli/src/commands/dkg/register.ts` — createViemTxObject .send()
  - `packages/cli/src/commands/dkg/get.ts:43-68` — 6 createViemTxObject .call() patterns

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in dkg/*.ts
  - [ ] `yarn workspace @celo/celocli run build` exits 0

  **Commit**: NO (groups with Wave 4 commit)

- [ ] 16. CLI remaining test files — propose.test, execute.test, other test files

  **What to do**:
  - Replace all `createViemTxObject` in CLI test files:
    - `governance/propose.test.ts` (6 calls — use `.encodeABI()` for expected values)
    - `governance/execute.test.ts` (2 calls)
    - `governance/executehotfix.test.ts` (4 calls)
    - `governance/approve.test.ts` (1 call)
    - `validator/deregister.test.ts` (3 calls)
    - `epochs/finish.test.ts` (1 call)
    - `epochs/process-groups.test.ts` (4 calls)
  - Also update `.sendAndWaitForReceipt()` calls on wrapper results to just `await wrapperMethod(params)` (now eager)
  - For `.encodeABI()` comparisons in propose.test: use viem's `encodeFunctionData` to compute expected values

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 13-15, 17)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 20
  - **Blocked By**: Tasks 5-9, 14

  **References**:
  - `packages/cli/src/commands/governance/propose.test.ts` — 6 createViemTxObject calls
  - `packages/cli/src/commands/governance/execute.test.ts` — 2 calls
  - `packages/cli/src/commands/governance/executehotfix.test.ts` — 4 calls
  - All other CLI test files with createViemTxObject

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in CLI test files
  - [ ] `yarn workspace @celo/celocli run build` exits 0

  **Commit**: NO (groups with Wave 4 commit)

- [ ] 17. CLI network/contracts.ts + contractkit tests — remaining .call() and .send() usages

  **What to do**:
  - Replace `createViemTxObject<string>(connection, contract, 'functionName', [...]).call()` in `network/contracts.ts:43,64` with `connection.callContract()`
  - Replace all `createViemTxObject` in contractkit test files:
    - `wrappers/Reserve.test.ts` (5 calls)
    - `wrappers/SortedOracles.test.ts` (6 calls)
    - `wrappers/Governance.test.ts` (1 call)
    - `wrappers/Escrow.test.ts` (2 calls)
    - `wrappers/EpochManager.test.ts` (6 calls)
    - `wrappers/ScoreManager.test.ts` (2 calls)
  - Also update `.sendAndWaitForReceipt()` on wrapper results where wrappers are now eager

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 13-16)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 20
  - **Blocked By**: Task 2

  **References**:
  - `packages/cli/src/commands/network/contracts.ts:43,64` — .call() reads
  - `packages/sdk/contractkit/src/wrappers/Reserve.test.ts` — 5 createViemTxObject
  - `packages/sdk/contractkit/src/wrappers/SortedOracles.test.ts` — 6 createViemTxObject

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in contractkit test files and CLI network/contracts.ts
  - [ ] `yarn workspace @celo/contractkit run build` exits 0
  - [ ] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` passes

  **Commit**: YES
  - Message: `refactor(cli): converge displaySendTx into displayViemTx, replace createViemTxObject`

- [ ] 18. Kill CeloTransactionObject class + toTransactionObject + CeloTransactionParams

  **What to do**:
  - Delete `CeloTransactionObject` class and `toTransactionObject` helper from `celo-transaction-object.ts`
  - Delete `CeloTransactionParams` type from `celo-transaction-object.ts`
  - If the file becomes empty, delete it
  - Update `packages/sdk/connect/src/index.ts` to remove the export

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 19-22)
  - **Parallel Group**: Wave 5
  - **Blocks**: Task 22
  - **Blocked By**: Tasks 5-9, 13

  **References**:
  - `packages/sdk/connect/src/utils/celo-transaction-object.ts` — entire file to delete
  - `packages/sdk/connect/src/index.ts:7` — export to remove

  **Acceptance Criteria**:
  - [ ] `celo-transaction-object.ts` deleted or emptied
  - [ ] Zero `CeloTransactionObject` in `@celo/connect` source
  - [ ] `yarn workspace @celo/connect run build` exits 0

  **Commit**: NO (groups with Wave 5 commit)

- [ ] 19. Kill CeloTxObject interface + _parent type structure

  **What to do**:
  - Remove `CeloTxObject<T>` interface from `types.ts`
  - Remove all `_parent` structure fields (events, methods, deploy, getPastEvents)
  - If `connection.sendTransactionObject` still references CeloTxObject, change it to accept `{ encodeABI(): string, address: string, estimateGas(tx?): Promise<number> }` or remove it entirely (Task 20 may handle this)
  - Update any remaining type imports

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 18, 20-22)
  - **Parallel Group**: Wave 5
  - **Blocks**: Task 22
  - **Blocked By**: Task 18

  **References**:
  - `packages/sdk/connect/src/types.ts:61-79` — CeloTxObject interface + _parent
  - `packages/sdk/connect/src/connection.ts:302-329` — sendTransactionObject uses CeloTxObject

  **Acceptance Criteria**:
  - [ ] Zero `CeloTxObject` in types.ts
  - [ ] `yarn workspace @celo/connect run build` exits 0

  **Commit**: NO (groups with Wave 5 commit)

- [ ] 20. Kill createViemTxObject/Internal + clean up viem-tx-object.ts

  **What to do**:
  - Remove `createViemTxObjectInternal` and all `createViemTxObject` overloads from `viem-tx-object.ts`
  - Keep `ContractRef` interface if still used by BaseWrapper or connection
  - If viem-tx-object.ts becomes empty/minimal, clean up or delete
  - Remove export from `index.ts`

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 18-19, 21-22)
  - **Parallel Group**: Wave 5
  - **Blocks**: Task 22
  - **Blocked By**: Tasks 10, 12, 14-17 (all createViemTxObject callers migrated)

  **References**:
  - `packages/sdk/connect/src/viem-tx-object.ts` — functions to remove
  - `packages/sdk/connect/src/index.ts:5` — export to update

  **Acceptance Criteria**:
  - [ ] Zero `createViemTxObject` in @celo/connect source
  - [ ] `yarn workspace @celo/connect run build` exits 0

  **Commit**: NO (groups with Wave 5 commit)

- [ ] 21. Kill proxyCallGeneric/Impl + buildTx/buildTxUnchecked + requireCall + dead ProposalBuilder methods

  **What to do**:
  - Remove `proxyCallGeneric` (5 overloads) and `proxyCallGenericImpl` from BaseWrapper.ts
  - Remove `buildTx` and `buildTxUnchecked` from BaseWrapper.ts
  - Remove `contractConnections` WeakMap if no longer needed (was used by proxyCallGenericImpl)
  - Remove `requireCall` function from `cli/src/utils/require.ts` (dead code — never imported)
  - Remove dead `addTx` and `fromWeb3tx` from ProposalBuilder (if not already removed in Task 10)
  - Clean up imports of removed functions in Erc20Wrapper and CeloTokenWrapper

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 18-20, 22)
  - **Parallel Group**: Wave 5
  - **Blocks**: Task 22
  - **Blocked By**: Tasks 3, 4, 7, 18 (all proxyCallGeneric/buildTx callers migrated)

  **References**:
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:322-395` — proxyCallGeneric overloads + impl
  - `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:95-130` — buildTx/buildTxUnchecked
  - `packages/cli/src/utils/require.ts:26-34` — requireCall (dead code)

  **Acceptance Criteria**:
  - [ ] Zero `proxyCallGeneric` function definitions in BaseWrapper.ts
  - [ ] Zero `buildTx` function definitions in BaseWrapper.ts
  - [ ] Zero `requireCall` in require.ts (function removed)
  - [ ] `yarn workspace @celo/contractkit run build` exits 0
  - [ ] `yarn workspace @celo/celocli run build` exits 0

  **Commit**: NO (groups with Wave 5 commit)

- [ ] 22. Remove dead imports/exports from @celo/connect index.ts + final connect cleanup

  **What to do**:
  - Update `packages/sdk/connect/src/index.ts` to remove exports for deleted files/types
  - Verify no remaining imports of killed types across the entire monorepo
  - Run `yarn build` to verify full monorepo builds

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on all cleanup tasks)
  - **Parallel Group**: Wave 5 (after 18-21)
  - **Blocks**: Task 23
  - **Blocked By**: Tasks 18-21

  **Acceptance Criteria**:
  - [ ] `yarn build` exits 0 (full monorepo)
  - [ ] Zero `CeloTransactionObject` in monorepo (`grep -rl`)
  - [ ] Zero `CeloTxObject` in monorepo
  - [ ] Zero `createViemTxObject` in monorepo

  **Commit**: YES
  - Message: `refactor(connect): remove CeloTxObject, CeloTransactionObject, createViemTxObject`
  - Pre-commit: `yarn build && yarn lint && yarn fmt:diff`

- [ ] 23. Full verification — build, test, lint across all packages

  **What to do**:
  - Run full monorepo build: `yarn build`
  - Run contractkit tests: `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test`
  - Run governance tests: `yarn workspace @celo/governance run test`
  - Run CLI tests: `RUN_ANVIL_TESTS=true yarn workspace @celo/celocli run test`
  - Run lint and format: `yarn lint && yarn fmt:diff`
  - Verify zero references to killed types

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (final verification)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 22

  **Acceptance Criteria**:
  - [ ] `yarn build` exits 0
  - [ ] All contractkit tests pass
  - [ ] All governance tests pass
  - [ ] All CLI tests pass
  - [ ] `yarn lint && yarn fmt:diff` passes
  - [ ] `grep -rl 'CeloTransactionObject' packages/` → 0
  - [ ] `grep -rl 'CeloTxObject' packages/` → 0
  - [ ] `grep -rl 'createViemTxObject' packages/` → 0
  - [ ] `grep -rl 'displaySendTx' packages/` → 0

  **Commit**: NO (verification only)

---
## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + `yarn lint` + `yarn fmt:diff` + `yarn test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if needed)
  Start from clean state. Run full build. Run contractkit tests with Anvil. Run governance tests. Run CLI tests. Verify zero references to killed types. Verify wrapper methods return hex strings.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `feat(connect,contractkit): add callContract helper and sendTx/encodeFunctionData to BaseWrapper`
- **Wave 2**: `refactor(contractkit): migrate wrapper write methods to eager send (return tx hash)`
- **Wave 3**: `refactor(governance): replace createViemTxObject with encodeFunctionData in ProposalBuilder`
- **Wave 4**: `refactor(cli): converge displaySendTx into displayViemTx, replace createViemTxObject`
- **Wave 5**: `refactor(connect): remove CeloTxObject, CeloTransactionObject, createViemTxObject`

---

## Success Criteria

### Verification Commands
```bash
yarn build                                                    # Expected: exits 0
RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test  # Expected: all pass
yarn workspace @celo/governance run test                       # Expected: all pass
RUN_ANVIL_TESTS=true yarn workspace @celo/celocli run test      # Expected: all pass
yarn lint && yarn fmt:diff                                     # Expected: clean
grep -rl "CeloTransactionObject" packages/                     # Expected: 0 matches
grep -rl "CeloTxObject" packages/                              # Expected: 0 matches
grep -rl "createViemTxObject" packages/                        # Expected: 0 matches
grep -rl "displaySendTx" packages/                             # Expected: 0 matches
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All tests pass
- [ ] Zero CeloTransactionObject references
- [ ] Zero CeloTxObject references
- [ ] Zero createViemTxObject references
- [ ] Zero displaySendTx references
- [ ] Wrapper methods return `Promise<`0x${string}`>`
- [ ] encodeFunctionData available on BaseWrapper
- [ ] callContract available on Connection
