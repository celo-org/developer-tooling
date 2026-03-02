# Viem Migration Cleanup: Deprecated Code, Dead Code, and Connection Internals

## TL;DR

> **Quick Summary**: Remove 15 deprecated items (0 references), delete 5 dead code artifacts, and refactor Connection class internals to use viem natively (~300 LOC) while preserving its public API. Contract wrappers are already viem-native; Connection is the last non-viem layer.
> 
> **Deliverables**:
> - 15 deprecated types/functions/exports removed
> - 5 dead code files/functions cleaned up
> - Connection class internally refactored: read methods use viemClient directly, rpcCaller kept for external compatibility
> - All 830+ existing tests continue to pass
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1-4 (parallel) → Task 5+6 (parallel) → Task 7 → Task 8 → Task 9 → Final

---

## Context

### Original Request
User requested items 1-5: remove deprecated types, migrate CLI from ContractKit to viem, kill Connection class, kill ContractKit, clean dead code. Research revealed @celo/actions only covers ~15% of ContractKit, blocking full CLI migration and ContractKit removal. Scoped down to "everything feasible now."

### Interview Summary
**Key Discussions**:
- User confirmed: "you can remove celo/connect if it really makes sense, but in contractKit there is quite a bit of business logic - this cannot be easily removed"
- User chose "Everything feasible now" scope: deprecated cleanup + dead code + Connection internals

**Research Findings**:
- 15 deprecated items with 0 references are safe to delete
- 5 dead code items across CLI utils and SDK utils
- Connection class has ~20 public methods; most map directly to viem equivalents
- Contract wrappers are ALREADY viem-native (CeloContract = GetContractReturnType<TAbi, PublicClient>)
- Viem's `celo` chain definition natively supports feeCurrency, CIP-64 serialization, and fee estimation
- Gas inflation factor is the ONLY Celo-specific concept that viem doesn't handle natively
- CeloProvider's signing interception is still needed (Connection uses wallet, not viem WalletClient) but can drop rpcCaller dependency

### Metis Review
**Identified Gaps** (addressed):
- Confirmed web3 is fully gone from contract layer — no plan-breaking web3 coexistence
- Connection refactoring is ~300 LOC internal change, not a 100-file rewrite
- Must preserve gasInflationFactor as custom middleware
- 4 CLI `rpcCaller.call()` sites must be preserved (rpcCaller property kept for backward compat)
- Reference pattern: `@celo/viem-account-ledger` for wallet→viem Account adaptation

---

## Work Objectives

### Core Objective
Remove all deprecated/dead code and refactor Connection class internals to use viem natively, while preserving the public API and rpcCaller property for external consumers.

### Concrete Deliverables
- 15 deprecated exports removed from 8 packages
- 5 dead code items removed from CLI utils and SDK utils
- Connection class: same public API, viem-native internals
- CeloProvider simplified: no longer uses rpcCaller, delegates to viemClient.request() and existingProvider.send()
- RpcCaller kept as public property for external CLI consumers, but Connection's own methods bypass it
- TxParamsNormalizer simplified: uses Connection methods instead of raw rpcCaller

### Definition of Done
- [ ] `yarn build` succeeds across all packages
- [ ] `yarn lint` passes with no new errors
- [ ] `yarn test` passes (or `yarn test:changes` for affected packages)
- [ ] Zero `@deprecated` items with 0 references remain
- [ ] Connection class no longer uses RpcCaller for basic RPC calls
- [ ] No regressions in any existing test suite

### Must Have
- All 15 deprecated items with 0 references removed
- Dead code removed (exchange.ts fns, celoHistory constants, command.ts parsers)
- Connection internals use viem PublicClient/WalletClient for read/write operations
- Gas inflation factor preserved as custom middleware
- All existing tests pass unchanged

### Must NOT Have (Guardrails)
- Do NOT change Connection's public API signature (method names, parameters, return types)
- Do NOT remove ContractKit — it stays as-is, just uses viem-native Connection internals
- Do NOT migrate CLI commands from getKit() to getPublicClient() — that's a separate future plan
- Do NOT remove GoldToken, LockedGold enums, or CELO_BASE_DERIVATION_PATH — they have active references
- Do NOT touch the `@celo/actions` or `@celo/core` packages
- Do NOT introduce new npm dependencies
- Do NOT change the Provider interface type definition — external consumers depend on it

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: Tests-after (existing tests must pass; no new tests needed for deletions)
- **Framework**: Jest (legacy SDK + CLI), Vitest (modern packages)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build verification**: Use Bash — `yarn build` / `yarn workspace X run build`
- **Test verification**: Use Bash — `yarn workspace X run test` / jest/vitest single file
- **Lint verification**: Use Bash — `yarn lint`
- **Reference verification**: Use Bash/grep — confirm removed items have 0 remaining references

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — safe deletions, fully independent):
├── Task 1: Remove deprecated items from contractkit/base.ts, governance, cryptographic-utils [quick]
├── Task 2: Remove deprecated items from metadata-claims, explorer, wallet-rpc [quick]
├── Task 3: Remove ProviderOwner from dev-utils [quick]
├── Task 4: Remove dead code (exchange.ts, celoHistory.ts, command.ts, printValueMap2) [quick]

Wave 2 (After Wave 1 — Connection refactoring, core):
├── Task 5: Refactor Connection read methods — replace rpcCaller.call() with viemClient [deep]
├── Task 6: Refactor TxParamsNormalizer — replace rpcCaller.call with Connection method [quick]
├── Task 7: Simplify CeloProvider — remove rpcCaller dependency, use viemClient + existingProvider [deep]

Wave 3 (After Wave 2 — build & verify):
├── Task 8: Build all affected packages, run lint [quick]
├── Task 9: Run full test suites for connect, contractkit, CLI [unspecified-high]

Wave FINAL (After ALL tasks — independent review):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Full QA — run affected test suites end-to-end (unspecified-high)
├── Task F4: Scope fidelity check (deep)

Critical Path: Task 1-4 (parallel) → Task 5+6 (parallel) → Task 7 → Task 8 → Task 9 → Final
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 8, 9 | 1 |
| 2 | — | 8, 9 | 1 |
| 3 | — | 8, 9 | 1 |
| 4 | — | 8, 9 | 1 |
| 5 | — | 7, 8, 9 | 2 |
| 6 | — | 8, 9 | 2 |
| 7 | 5 | 8, 9 | 2 |
| 8 | 1-7 | 9 | 3 |
| 9 | 8 | F1-F4 | 3 |
| F1-F4 | 9 | — | FINAL |

### Agent Dispatch Summary

- **Wave 1**: **4** — T1-T4 → `quick`
- **Wave 2**: **3** — T5 → `deep`, T6 → `quick` (parallel with T5), T7 → `deep` (after T5)
- **Wave 3**: **2** — T8 → `quick`, T9 → `unspecified-high`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Remove deprecated items: contractkit, governance, cryptographic-utils

  **What to do**:
  - Delete `CeloToken` type alias from `packages/sdk/contractkit/src/base.ts:50` (`export type CeloToken = CeloTokenContract`)
  - Delete `isRegistered` method alias from `packages/sdk/governance/src/proposal-builder.ts:101`
  - Delete `buildFunctionCallToExternalContract` method alias from `packages/sdk/governance/src/proposal-builder.ts:158`
  - Delete `formatNonAccentedCharacters` function from `packages/sdk/cryptographic-utils/src/account.ts:166`
  - Remove these from barrel exports (index.ts) in each package if they're re-exported
  - Build each affected package: `yarn workspace @celo/contractkit run build`, `yarn workspace @celo/governance run build`, `yarn workspace @celo/cryptographic-utils run build`

  **Must NOT do**:
  - Do NOT remove `GoldToken` or `LockedGold` enum members (10+ and 50+ references respectively)
  - Do NOT remove `ContractABIs` export (has 1 internal usage)
  - Do NOT remove `ReleaseGold` deprecated methods (5+ references)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: None

  **References**:
  - `packages/sdk/contractkit/src/base.ts:50` — CeloToken type alias to delete
  - `packages/sdk/governance/src/proposal-builder.ts:101,158` — Two method aliases to delete
  - `packages/sdk/cryptographic-utils/src/account.ts:166` — formatNonAccentedCharacters function to delete

  **Acceptance Criteria**:
  - [ ] `grep -r 'export type CeloToken' packages/sdk/contractkit/src/base.ts` returns 0 results
  - [ ] `grep -r 'isRegistered' packages/sdk/governance/src/proposal-builder.ts` returns 0 results
  - [ ] `grep -r 'formatNonAccentedCharacters' packages/sdk/cryptographic-utils/src/` returns 0 results
  - [ ] All 3 affected packages build successfully

  **QA Scenarios:**
  ```
  Scenario: Deprecated items fully removed and builds pass
    Tool: Bash
    Steps:
      1. grep -rn 'export type CeloToken' packages/sdk/contractkit/src/base.ts
      2. grep -rn 'isRegistered\|buildFunctionCallToExternalContract' packages/sdk/governance/src/proposal-builder.ts
      3. grep -rn 'formatNonAccentedCharacters' packages/sdk/cryptographic-utils/src/
      4. yarn workspace @celo/contractkit run build
      5. yarn workspace @celo/governance run build
      6. yarn workspace @celo/cryptographic-utils run build
    Expected Result: Steps 1-3 return 0 matches; steps 4-6 exit code 0
    Evidence: .sisyphus/evidence/task-1-deprecated-removed.txt
  ```

  **Commit**: YES (groups with Tasks 2, 3, 4)
  - Message: `refactor: remove deprecated types and dead code with zero references`

- [ ] 2. Remove deprecated items: metadata-claims, explorer, wallet-rpc

  **What to do**:
  - In `packages/sdk/metadata-claims/src/types.ts:23`: Remove `ATTESTATION_SERVICE_URL` enum member
  - In `packages/sdk/metadata-claims/src/claim.ts:43`: Remove `AttestationServiceUrlClaimType` zod schema
  - In `packages/sdk/metadata-claims/src/claim.ts:73`: Remove `AttestationServiceUrlClaim` type
  - In `packages/sdk/explorer/src/block-explorer.ts:180,227,244`: Remove three deprecated methods (`getContractMethodAbi`, `getContractMethodAbiFromSourcify`, `getContractMethodAbiFromKnownFunctions`)
  - For wallet-rpc: Check if entire package can be removed or just the deprecated class declarations
  - Remove from barrel exports if present

  **Must NOT do**:
  - Do NOT remove AttestationServiceUrl deserialization if needed for reading old metadata files (verify first)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: None

  **References**:
  - `packages/sdk/metadata-claims/src/types.ts:23` — ATTESTATION_SERVICE_URL enum member
  - `packages/sdk/metadata-claims/src/claim.ts:43,73` — AttestationServiceUrlClaimType and type
  - `packages/sdk/explorer/src/block-explorer.ts:180,227,244` — Three deprecated methods
  - `packages/sdk/wallets/wallet-rpc/` — Entire package deprecated per forum post

  **Acceptance Criteria**:
  - [ ] Zero grep matches for removed items in their respective files
  - [ ] `yarn workspace @celo/metadata-claims run build` succeeds
  - [ ] `yarn workspace @celo/explorer run build` succeeds

  **QA Scenarios:**
  ```
  Scenario: Deprecated items removed and builds pass
    Tool: Bash
    Steps:
      1. grep -rn 'ATTESTATION_SERVICE_URL\|AttestationServiceUrlClaim' packages/sdk/metadata-claims/src/
      2. grep -n 'getContractMethodAbi' packages/sdk/explorer/src/block-explorer.ts
      3. yarn workspace @celo/metadata-claims run build
      4. yarn workspace @celo/explorer run build
    Expected Result: Steps 1-2 return 0 matches; steps 3-4 exit code 0
    Evidence: .sisyphus/evidence/task-2-deprecated-removed.txt
  ```

  **Commit**: YES (groups with Tasks 1, 3, 4)
  - Message: `refactor: remove deprecated types and dead code with zero references`

- [ ] 3. Remove ProviderOwner type from dev-utils

  **What to do**:
  - Delete `ProviderOwner` type alias from `packages/dev-utils/src/test-utils.ts:68`
  - Remove from barrel exports if re-exported
  - Build: `yarn workspace @celo/dev-utils run build`

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: None

  **References**:
  - `packages/dev-utils/src/test-utils.ts:68` — ProviderOwner type to delete (marked @deprecated, 0 source refs)

  **Acceptance Criteria**:
  - [ ] `grep -rn 'ProviderOwner' packages/dev-utils/src/` returns 0 results
  - [ ] `yarn workspace @celo/dev-utils run build` succeeds

  **QA Scenarios:**
  ```
  Scenario: ProviderOwner removed and build passes
    Tool: Bash
    Steps:
      1. grep -rn 'ProviderOwner' packages/dev-utils/src/
      2. yarn workspace @celo/dev-utils run build
    Expected Result: Step 1 returns 0 matches; step 2 exit code 0
    Evidence: .sisyphus/evidence/task-3-providerowner-removed.txt
  ```

  **Commit**: YES (groups with Tasks 1, 2, 4)
  - Message: `refactor: remove deprecated types and dead code with zero references`

- [ ] 4. Remove dead code: exchange.ts functions, celoHistory constants, command.ts parsers, printValueMap2

  **What to do**:
  - In `packages/cli/src/utils/exchange.ts`: Remove `checkNotDangerousExchange`, `calculateExpectedSlippage`, `swapArguments` functions. If the file becomes empty, delete it entirely. Also remove `exchange.test.ts` if it only tests these functions.
  - In `packages/sdk/utils/src/celoHistory.ts`: Remove `DOLLAR_AMOUNT_FOR_ESTIMATE` and `CELO_AMOUNT_FOR_ESTIMATE` constants. If file becomes empty, delete it and remove from index.ts.
  - In `packages/cli/src/utils/command.ts`: Remove `parseIntRange`, `parseAddressArray`, `parseHexString` functions. Keep the rest of command.ts (CustomFlags, etc.).
  - In `packages/cli/src/utils/cli.ts`: Remove `printValueMap2` function (superseded by printValueMapRecursive). Also remove its test if there is one.
  - Build: `yarn workspace @celo/celocli run build`, `yarn workspace @celo/utils run build`

  **Must NOT do**:
  - Do NOT remove `ElectionResultsCache` (has 1 active reference in validator/status.ts — needs investigation first)
  - Do NOT remove other functions from these files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: None

  **References**:
  - `packages/cli/src/utils/exchange.ts` — 3 dead functions (0 command refs, only test refs)
  - `packages/sdk/utils/src/celoHistory.ts` — 2 dead constants (0 external refs)
  - `packages/cli/src/utils/command.ts` — 3 dead parser functions (0 external refs)
  - `packages/cli/src/utils/cli.ts` — printValueMap2 (superseded by printValueMapRecursive)

  **Acceptance Criteria**:
  - [ ] `grep -rn 'checkNotDangerousExchange\|calculateExpectedSlippage\|swapArguments' packages/cli/src/` returns 0 results
  - [ ] `grep -rn 'DOLLAR_AMOUNT_FOR_ESTIMATE\|CELO_AMOUNT_FOR_ESTIMATE' packages/sdk/utils/src/` returns 0 results
  - [ ] `grep -rn 'parseIntRange\|parseAddressArray\|parseHexString' packages/cli/src/utils/command.ts` returns 0 results
  - [ ] `grep -rn 'printValueMap2' packages/cli/src/` returns 0 results
  - [ ] `yarn workspace @celo/celocli run build` succeeds
  - [ ] `yarn workspace @celo/utils run build` succeeds

  **QA Scenarios:**
  ```
  Scenario: Dead code removed and builds pass
    Tool: Bash
    Steps:
      1. grep -rn 'checkNotDangerousExchange' packages/cli/src/
      2. grep -rn 'DOLLAR_AMOUNT_FOR_ESTIMATE' packages/sdk/utils/src/
      3. grep -rn 'parseIntRange' packages/cli/src/utils/command.ts
      4. grep -rn 'printValueMap2' packages/cli/src/
      5. yarn workspace @celo/celocli run build
      6. yarn workspace @celo/utils run build
    Expected Result: Steps 1-4 return 0 matches; steps 5-6 exit code 0
    Evidence: .sisyphus/evidence/task-4-dead-code-removed.txt
  ```

  **Commit**: YES (groups with Tasks 1, 2, 3)
  - Message: `refactor: remove deprecated types and dead code with zero references`

- [ ] 5. Refactor Connection internals: replace RpcCaller usage with viemClient for all read methods

  **What to do**:
  - In `connection.ts`, refactor ALL read-path methods that currently go through `this.rpcCaller.call(method, params)` to use `this._viemClient` directly:
    - `getBlockNumber()` → `this._viemClient.getBlockNumber()` (returns bigint, convert to number)
    - `getBalance(address, defaultBlock?)` → `this._viemClient.getBalance({ address })` (returns bigint, convert to hex string for backward compat)
    - `getBlock(blockHashOrBlockNumber, fullTxObjects)` → `this._viemClient.getBlock(...)` then run through `outputBlockFormatter` for shape compat
    - `getTransaction(hash)` → `this._viemClient.getTransaction({ hash })` then run through `outputCeloTxFormatter`
    - `getTransactionReceipt(hash)` → `this._viemClient.getTransactionReceipt({ hash })` then run through `outputCeloTxReceiptFormatter`
    - `getTransactionCount(address)` → `this._viemClient.getTransactionCount({ address })`
    - `chainId()` → `this._viemClient.getChainId()`
    - `gasPrice(feeCurrency?)` → `this._viemClient.request({ method: 'eth_gasPrice', params: feeCurrency ? [feeCurrency] : [] })`
    - `getMaxPriorityFeePerGas(feeCurrency?)` → `this._viemClient.request({ method: 'eth_maxPriorityFeePerGas', params: feeCurrency ? [feeCurrency] : [] })`
    - `getNodeAccounts()` → `this._viemClient.request({ method: 'eth_accounts', params: [] })`
    - `getStorageAt(address, position)` → `this._viemClient.getStorageAt({ address, slot: pos })`
    - `defaultGasEstimator(tx)` → `this._viemClient.request({ method: 'eth_estimateGas', params: [tx] })` (keep raw RPC since viem's estimateGas may apply different formatting)
    - `defaultCaller(tx)` → `this._viemClient.request({ method: 'eth_call', params: [{data, to, from}, 'latest'] })`
  - **KEEP `rpcCaller` as a public property** — it's used by 4 CLI production files (`account/lock.ts`, `account/unlock.ts`, `utils/governance.ts`, `test-utils/multisigUtils.ts`) and 2 CLI test utilities (`mockRpc.ts`, `deterministic-test-helpers.ts`). Do NOT remove it.
  - **KEEP `HttpRpcCaller` export** from `@celo/connect` index.ts — CLI test utils import it for mocking.
  - Remove the `viemClient` transport's dependency on `rpcCaller`: Currently `_viemClient` uses a custom transport that calls `rpcCaller.call()`. Instead, create the PublicClient with `http()` transport from viem directly using the provider URL, OR use `custom()` transport wrapping the raw provider (NOT rpcCaller). This breaks the circular dependency: Connection → rpcCaller → provider vs Connection → viemClient → provider.
  - **Return type compatibility**: All methods MUST return the same types as before. Use formatters where viem's native return types differ (e.g., `bigint` → hex string for `getBalance`).
  - For methods where viem doesn't have a direct equivalent with feeCurrency param (gasPrice, getMaxPriorityFeePerGas), use `this._viemClient.request()` for raw JSON-RPC.

  **Must NOT do**:
  - Do NOT remove `rpcCaller` property or `RpcCaller`/`HttpRpcCaller` types — they're used externally
  - Do NOT change any public method signatures or return types
  - Do NOT change TxParamsNormalizer yet (that's Task 6)
  - Do NOT touch CeloProvider (that's Task 7)
  - Do NOT change viemClient's public accessor — keep `get viemClient(): PublicClient`

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex refactoring of 15+ methods with return type compatibility requirements
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 6, but NOT Task 7)
  - **Parallel Group**: Wave 2 (with Tasks 6)
  - **Blocks**: Tasks 7, 8, 9
  - **Blocked By**: None (Wave 1 tasks are in different packages)

  **References**:

  **Pattern References**:
  - `packages/sdk/connect/src/connection.ts:80-571` — ALL methods to refactor, each with its `rpcCaller.call()` pattern
  - `packages/sdk/connect/src/utils/formatter.ts` — Output formatters (`outputBlockFormatter`, `outputCeloTxFormatter`, etc.) needed for shape compatibility
  - `packages/sdk/connect/src/types.ts` — `Block`, `CeloTx`, `CeloTxReceipt`, `CeloTxPending` types that define return shapes

  **API/Type References**:
  - `packages/sdk/connect/src/utils/rpc-caller.ts:117-123` — `RpcCaller` interface (must keep)
  - `packages/sdk/connect/src/utils/rpc-caller.ts:125-183` — `HttpRpcCaller` class (must keep)
  - `packages/sdk/connect/src/index.ts:6` — `export * from './utils/rpc-caller'` (must keep)

  **External Consumer References** (rpcCaller users — DO NOT break these):
  - `packages/cli/src/commands/account/lock.ts:26` — `kit.connection.rpcCaller.call('personal_lockAccount', [...])`
  - `packages/cli/src/commands/account/unlock.ts:46` — `kit.connection.rpcCaller.call('personal_unlockAccount', [...])`
  - `packages/cli/src/utils/governance.ts:36` — `kit.connection.rpcCaller.call('eth_call', [...])`
  - `packages/cli/src/test-utils/multisigUtils.ts:61` — `kit.connection.rpcCaller.call('eth_getBlockByNumber', [...])`
  - `packages/cli/src/test-utils/mockRpc.ts:1,5` — `import { HttpRpcCaller } from '@celo/connect'` + spy on prototype
  - `packages/cli/src/test-utils/deterministic-test-helpers.ts:1,7,35,43,52` — Same spy pattern on `HttpRpcCaller.prototype.call`

  **Test References**:
  - `packages/sdk/connect/src/connection.test.ts:53-97` — Tests that mock `connection.rpcCaller.call` — these MUST still pass (they test the public rpcCaller API)
  - `packages/sdk/connect/src/utils/rpc-caller.test.ts` — Tests for HttpRpcCaller class itself — MUST still pass

  **Acceptance Criteria**:
  - [ ] All Connection read methods internally use `this._viemClient` instead of `this.rpcCaller.call()` for their primary path
  - [ ] `connection.rpcCaller` property still exists and works (for external CLI callers)
  - [ ] `HttpRpcCaller` is still exported from `@celo/connect`
  - [ ] `yarn workspace @celo/connect run build` succeeds
  - [ ] `yarn workspace @celo/connect run test` passes (all existing tests)
  - [ ] Return types of all methods unchanged (verify via `tsc --noEmit`)

  **QA Scenarios:**
  ```
  Scenario: Connection read methods use viemClient internally
    Tool: Bash
    Preconditions: @celo/connect package builds successfully
    Steps:
      1. yarn workspace @celo/connect run build
      2. grep -c 'rpcCaller.call' packages/sdk/connect/src/connection.ts
      3. yarn workspace @celo/connect run test
    Expected Result: Step 1 exit 0. Step 2 count is 0 or very low (only sendTransaction/sign paths). Step 3 all tests pass.
    Evidence: .sisyphus/evidence/task-5-connection-viemclient.txt

  Scenario: External rpcCaller consumers still work
    Tool: Bash
    Preconditions: connection.rpcCaller property preserved
    Steps:
      1. grep -n 'rpcCaller!' packages/sdk/connect/src/connection.ts (verify property exists)
      2. grep -n "export \* from './utils/rpc-caller'" packages/sdk/connect/src/index.ts (verify export)
      3. yarn workspace @celo/celocli run build
    Expected Result: All greps find matches; CLI build succeeds
    Evidence: .sisyphus/evidence/task-5-rpcaller-compat.txt
  ```

  **Commit**: YES (groups with Tasks 6, 7)
  - Message: `refactor(connect): replace Connection internals with native viem`
  - Files: `packages/sdk/connect/src/connection.ts`
  - Pre-commit: `yarn workspace @celo/connect run test`

- [ ] 6. Refactor TxParamsNormalizer: replace rpcCaller usage with Connection methods

  **What to do**:
  - In `tx-params-normalizer.ts`, the class uses `this.connection.rpcCaller.call('eth_maxPriorityFeePerGas', [])` on line 62. Replace this with `this.connection.getMaxPriorityFeePerGas()` which will now use viemClient internally (from Task 5).
  - The rest of TxParamsNormalizer already delegates to Connection methods (`this.connection.getTransactionCount()`, `this.connection.estimateGas()`, `this.connection.gasPrice()`, `this.connection.chainId()`) — these are fine.
  - Verify the single `rpcCaller.call` usage at line 62 is the ONLY direct RPC call in this file.
  - Keep `TxParamsNormalizer` class and its interface unchanged — `paramsPopulator` is a public `readonly` property on Connection used by CeloProvider.
  - This is a minimal change: 1 line replacement.

  **Must NOT do**:
  - Do NOT change the `populate()` method signature or return type
  - Do NOT change how Connection constructs TxParamsNormalizer
  - Do NOT remove the class (it's referenced by CeloProvider via `connection.paramsPopulator`)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line change in a small file
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 5)
  - **Parallel Group**: Wave 2 (with Task 5)
  - **Blocks**: Tasks 7, 8, 9
  - **Blocked By**: None directly, but depends on Task 5's `getMaxPriorityFeePerGas()` being viem-native

  **References**:
  - `packages/sdk/connect/src/utils/tx-params-normalizer.ts:62-66` — The single `rpcCaller.call` to replace
  - `packages/sdk/connect/src/connection.ts:439-444` — `getMaxPriorityFeePerGas()` method (replacement target)
  - `packages/sdk/connect/src/utils/tx-params-normalizer.test.ts:46` — Test that mocks `connection.rpcCaller` — will need updating to mock `connection.getMaxPriorityFeePerGas` instead

  **Acceptance Criteria**:
  - [ ] Zero occurrences of `rpcCaller` in `tx-params-normalizer.ts`
  - [ ] `yarn workspace @celo/connect run build` succeeds
  - [ ] `yarn workspace @celo/connect run test` passes

  **QA Scenarios:**
  ```
  Scenario: TxParamsNormalizer no longer uses rpcCaller directly
    Tool: Bash
    Steps:
      1. grep -n 'rpcCaller' packages/sdk/connect/src/utils/tx-params-normalizer.ts
      2. yarn workspace @celo/connect run build
      3. yarn workspace @celo/connect run test
    Expected Result: Step 1 returns 0 matches. Steps 2-3 exit code 0.
    Evidence: .sisyphus/evidence/task-6-normalizer-refactored.txt
  ```

  **Commit**: YES (groups with Tasks 5, 7)
  - Message: `refactor(connect): replace Connection internals with native viem`
  - Files: `packages/sdk/connect/src/utils/tx-params-normalizer.ts`, `packages/sdk/connect/src/utils/tx-params-normalizer.test.ts`

- [ ] 7. Simplify CeloProvider: remove rpcCaller dependency, use Connection methods

  **What to do**:
  - In `celo-provider.ts`, there are 2 usages of `connection.rpcCaller`:
    - Line 215: `this.connection.rpcCaller.call('eth_sendRawTransaction', [signedTx.raw])` — Replace with `this.connection.viemClient.request({ method: 'eth_sendRawTransaction', params: [signedTx.raw] })`
    - Line 225: `this.connection.rpcCaller.send(payload, callback)` in `forwardSend()` — This is the passthrough for non-intercepted methods. Replace with calling the raw provider: `this.existingProvider.send!(payload, callback)` (CeloProvider already has `existingProvider` as a public `readonly` property)
  - **Evaluate whether CeloProvider's signing interception can be simplified**: The signing interception (handleSendTransaction, handleSignTransaction, handleSignPersonalMessage, handleSignTypedData) uses the wallet via `this.connection.wallet!.signTransaction(filledParams)`. This is still needed because viem's WalletClient with a local Account would handle it, but Connection doesn't use WalletClient — it just has a `wallet?: ReadOnlyWallet`. **Keep the signing interception for now** — removing it requires switching Connection to use WalletClient, which is a bigger change than "Connection internals refactoring."
  - **Simplify `handleSendTransaction`**: Currently it locks nonce, signs, then calls `rpcCaller.call('eth_sendRawTransaction')`. Replace the rpcCaller call with `this.connection.viemClient.request()`.
  - **Simplify `forwardSend`**: Replace `this.connection.rpcCaller.send(payload, callback)` with `this.existingProvider.send!(payload, callback)` — this removes the dependency on Connection's rpcCaller for the forwarding path.
  - Keep all the provider delegation functions (on, once, removeListener, etc.) — they proxy to `existingProvider` and are unrelated to rpcCaller.

  **Must NOT do**:
  - Do NOT remove CeloProvider class — it's still needed for signing interception and provider interface compliance
  - Do NOT remove the signing interception (handleSendTransaction etc.) — wallet-based signing still requires it
  - Do NOT change CeloProvider's constructor signature
  - Do NOT change the `send()` method signature (it implements the Provider interface)
  - Do NOT remove `nonceLock` — concurrent transaction protection is still needed

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Must understand interaction between Connection, CeloProvider, wallet, and rpcCaller to refactor safely
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 5 for viemClient being properly set up)
  - **Parallel Group**: Wave 2, but starts after Task 5 completes
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: Task 5 (needs viemClient to be independent of rpcCaller)

  **References**:

  **Pattern References**:
  - `packages/sdk/connect/src/celo-provider.ts:211-222` — `handleSendTransaction` with rpcCaller → replace with viemClient.request()
  - `packages/sdk/connect/src/celo-provider.ts:224-226` — `forwardSend` with rpcCaller.send → replace with existingProvider.send
  - `packages/sdk/connect/src/celo-provider.ts:202-209` — `handleSignTransaction` — keep as-is (uses paramsPopulator + wallet)
  - `packages/sdk/connect/src/celo-provider.ts:48-60` — Constructor with `existingProvider` already available as `readonly`

  **API/Type References**:
  - `packages/sdk/connect/src/types.ts` — `Provider` interface that CeloProvider implements
  - `packages/sdk/connect/src/connection.ts:86-88` — `viemClient` accessor used by CeloProvider as replacement

  **Test References**:
  - `packages/sdk/connect/src/celo-provider.test.ts` (if it exists) — verify tests pass after changes
  - Integration tested via `connection.test.ts` and contractkit test suite

  **Acceptance Criteria**:
  - [ ] Zero occurrences of `rpcCaller` in `celo-provider.ts`
  - [ ] `rpcCallHandler` import can be removed from celo-provider.ts if no longer used (check `forwardSend` and intercepted methods)
  - [ ] `yarn workspace @celo/connect run build` succeeds
  - [ ] `yarn workspace @celo/connect run test` passes

  **QA Scenarios:**
  ```
  Scenario: CeloProvider no longer depends on rpcCaller
    Tool: Bash
    Steps:
      1. grep -n 'rpcCaller' packages/sdk/connect/src/celo-provider.ts
      2. yarn workspace @celo/connect run build
      3. yarn workspace @celo/connect run test
    Expected Result: Step 1 returns 0 matches. Steps 2-3 exit code 0.
    Evidence: .sisyphus/evidence/task-7-celoprovider-simplified.txt

  Scenario: Transaction signing still works end-to-end
    Tool: Bash
    Preconditions: Anvil devchain running (via test setup)
    Steps:
      1. RUN_ANVIL_TESTS=true yarn workspace @celo/connect run test
      2. yarn workspace @celo/contractkit run test
    Expected Result: All tests pass
    Failure Indicators: "signTransaction" or "sendTransaction" test failures
    Evidence: .sisyphus/evidence/task-7-signing-e2e.txt
  ```

  **Commit**: YES (groups with Tasks 5, 6)
  - Message: `refactor(connect): replace Connection internals with native viem`
  - Files: `packages/sdk/connect/src/celo-provider.ts`

- [ ] 8. Build all affected packages and run lint

  **What to do**:
  - Run `yarn build` to build ALL packages in topological order. This verifies no cross-package type errors were introduced.
  - Run `yarn lint` to verify no linting violations.
  - Run `yarn fmt:diff` to verify formatting.
  - If build fails: identify the failing package, read the error, fix it. Common issues:
    - Import paths changed → update imports
    - Type mismatches from viem return types (bigint vs number vs hex string) → add conversion
    - Missing exports → re-export if needed
  - If lint fails: run `yarn fmt` to auto-fix formatting, then review any remaining lint errors.

  **Must NOT do**:
  - Do NOT change any logic — only fix build/lint errors introduced by Tasks 1-7
  - Do NOT suppress type errors with `as any` or `@ts-ignore`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Running build commands and fixing compilation errors
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential after Wave 2)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 9
  - **Blocked By**: Tasks 1-7 (all implementation)

  **References**:
  - AGENTS.md build commands section — `yarn build`, `yarn lint`, `yarn fmt:diff`
  - Any error messages from the build output will point to specific files

  **Acceptance Criteria**:
  - [ ] `yarn build` exits with code 0
  - [ ] `yarn lint` exits with code 0
  - [ ] `yarn fmt:diff` exits with code 0

  **QA Scenarios:**
  ```
  Scenario: Full monorepo build and lint pass
    Tool: Bash
    Steps:
      1. yarn build
      2. yarn lint
      3. yarn fmt:diff
    Expected Result: All 3 exit code 0
    Failure Indicators: TypeScript compilation errors, biome lint errors
    Evidence: .sisyphus/evidence/task-8-build-lint.txt
  ```

  **Commit**: NO (verification only)

- [ ] 9. Run full test suites for all affected packages

  **What to do**:
  - Run test suites for ALL affected packages, one by one:
    - `yarn workspace @celo/connect run test` — Core connection tests
    - `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — ContractKit integration (needs Anvil). Uses `NODE_OPTIONS=--experimental-vm-modules` from package.json script.
    - `yarn workspace @celo/governance run test` — Governance tests
    - `yarn workspace @celo/metadata-claims run test` — Metadata claims tests
    - `yarn workspace @celo/explorer run test` — Explorer tests
    - `yarn workspace @celo/cryptographic-utils run test` — Crypto utils tests
    - `yarn workspace @celo/dev-utils run test` — Dev utils tests
    - `yarn workspace @celo/utils run test` — Utils tests
    - `RUN_ANVIL_TESTS=true NODE_OPTIONS=--experimental-vm-modules yarn workspace @celo/celocli run --top-level jest --forceExit` — CLI tests (needs Anvil + experimental-vm-modules)
  - If tests fail: analyze the failure, fix it if it's caused by our changes. If it's a pre-existing flaky test unrelated to our changes, document it but don't block on it.
  - **Anvil requirement**: Install Anvil v1.0.0 if not present (`foundryup --install 1.0.0`). Set `RUN_ANVIL_TESTS=true`.
  - Record pass/fail counts for each package.

  **Must NOT do**:
  - Do NOT skip any package that was modified in Tasks 1-7
  - Do NOT mark tests as "expected failures" — all tests must pass
  - Do NOT use `--no-verify` or skip test hooks

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Long-running test suites across 9 packages, needs patience and failure analysis
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential, after Task 8)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4 (Final verification)
  - **Blocked By**: Task 8 (build must pass first)

  **References**:
  - AGENTS.md test commands section — framework per package (Jest vs Vitest), NODE_OPTIONS requirements
  - `packages/sdk/connect/src/connection.test.ts` — Key test file for Connection refactoring
  - `packages/sdk/connect/src/utils/tx-params-normalizer.test.ts` — Key test for TxParamsNormalizer changes
  - `packages/sdk/connect/src/utils/rpc-caller.test.ts` — RpcCaller tests (should still pass, class is kept)

  **Acceptance Criteria**:
  - [ ] `yarn workspace @celo/connect run test` — all pass
  - [ ] `RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test` — all pass
  - [ ] `yarn workspace @celo/governance run test` — all pass
  - [ ] `yarn workspace @celo/metadata-claims run test` — all pass
  - [ ] `yarn workspace @celo/explorer run test` — all pass
  - [ ] `yarn workspace @celo/cryptographic-utils run test` — all pass
  - [ ] `yarn workspace @celo/dev-utils run test` — all pass
  - [ ] `yarn workspace @celo/utils run test` — all pass
  - [ ] CLI tests pass (see command above)

  **QA Scenarios:**
  ```
  Scenario: All affected package test suites pass
    Tool: Bash
    Steps:
      1. yarn workspace @celo/connect run test 2>&1 | tail -20
      2. RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test 2>&1 | tail -20
      3. yarn workspace @celo/governance run test 2>&1 | tail -20
      4. yarn workspace @celo/explorer run test 2>&1 | tail -20
      5. yarn workspace @celo/cryptographic-utils run test 2>&1 | tail -20
      6. yarn workspace @celo/dev-utils run test 2>&1 | tail -20
      7. yarn workspace @celo/utils run test 2>&1 | tail -20
      8. yarn workspace @celo/metadata-claims run test 2>&1 | tail -20
      9. RUN_ANVIL_TESTS=true NODE_OPTIONS=--experimental-vm-modules yarn workspace @celo/celocli run --top-level jest --forceExit 2>&1 | tail -30
    Expected Result: All 9 exit code 0 with "Tests: X passed" in output
    Failure Indicators: "FAIL" in any test output, non-zero exit code
    Evidence: .sisyphus/evidence/task-9-full-tests.txt
  ```

  **Commit**: NO (verification only — if fixes needed, they go into a fixup commit)

---
## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `bun test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Full QA** — `unspecified-high`
  Start from clean state. Run ALL test suites for affected packages: `yarn workspace @celo/connect run test`, `yarn workspace @celo/contractkit run test` (with RUN_ANVIL_TESTS=true), representative CLI tests. Save evidence.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance. Detect cross-task contamination.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `refactor: remove deprecated types and dead code with zero references` — all deprecated/dead code files
- **Wave 2**: `refactor(connect): replace Connection internals with native viem` — connection.ts, celo-provider.ts, rpc-caller.ts, tx-params-normalizer.ts
- **Wave 3**: No commit (verification only)

---

## Success Criteria

### Verification Commands
```bash
yarn build                    # Expected: success
yarn lint                     # Expected: no new errors
yarn workspace @celo/connect run test     # Expected: all pass
RUN_ANVIL_TESTS=true yarn workspace @celo/contractkit run test  # Expected: 258 pass
RUN_ANVIL_TESTS=true NODE_OPTIONS=--experimental-vm-modules yarn workspace @celo/celocli run --top-level jest --forceExit  # Expected: all pass
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All tests pass
- [ ] Zero deprecated items with 0 references remain
- [ ] Connection class uses viem natively for RPC calls
