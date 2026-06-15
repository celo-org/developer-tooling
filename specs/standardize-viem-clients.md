# Standardize All Packages to Use Viem Clients Directly

## Architecture Review

### Current State — Two Coexisting Paradigms

1. **Legacy (web3-based)**: `@celo/connect` defines a `Connection` class wrapping a JSON-RPC `Provider`. The actual web3.js npm package has already been removed — all RPC calls go through raw JSON-RPC via `rpcCaller.call(...)` and ABI encoding uses viem internally (`abi-coder.ts`, `rpc-contract.ts`). However, `@celo/contractkit` exposes a `get web3(): any` backward-compat shim (lines 138-202 of `kit.ts`) that emulates `web3.eth.*` and `web3.utils.*` using `Connection` methods. `@celo/dev-utils` has `createWeb3Shim()` for test harnesses. All legacy SDK packages and CLI test infrastructure depend on this shim surface.

2. **Modern (viem-based)**: `@celo/actions` defines canonical types (`PublicCeloClient`, `WalletCeloClient`, `CeloClient`, `Clients`) in `src/client.ts`. The CLI's `BaseCommand` already constructs `publicClient` and `walletClient` via viem. `@celo/dev-utils` provides `viem_testWithAnvil()`. `@celo/viem-account-ledger` is pure viem.

### Architecture Concerns

- **Dual paradigm increases coupling and maintenance burden** — every new feature must consider both paths
- **Web3 shim is a compatibility layer with no unique functionality** — viem covers all use cases
- **Wallet packages become obsolete** — viem's account abstraction (`privateKeyToAccount`, custom accounts) replaces them
- **Single atomic PR** — all changes land together to avoid intermediate broken states

### Complexity Hotspots

- `@celo/contractkit` — deep dependency on `Connection.web3`, `Web3ContractCache`, `@celo/abis/web3/*`
- CLI — dual `getKit()` + `getPublicClient()` pattern throughout commands
- `@celo/governance` — heavy use of `kit.web3.utils.*`
- DKG commands — heavily web3-dependent (may be candidates for removal)

### Key Finding: web3.js npm Package Already Removed

The web3.js library is **not** in any `package.json` dependencies. What remains is:
- A **web3-like API surface** (`kit.web3` property, `Web3` type alias, `createWeb3Shim()`)
- These are pure TypeScript shims over `Connection` methods and viem utilities
- The shim exists solely for backward compatibility; removing it is a surface-level change, not a deep architectural one

## Current Migration Status

### Already Completed (Commit 7fe8c4478)

- `Connection` class no longer wraps a `Web3` instance — uses raw JSON-RPC + viem internally
- `Connection.createContract()` replaces `new web3.eth.Contract(abi, address)`
- `viemAbiCoder` (in `abi-coder.ts`) replaces web3 ABI coder
- `RpcContract` (in `rpc-contract.ts`) replaces web3 Contract class
- `web3-contract-cache.ts` uses `@celo/abis` (viem ABIs) for ABI source
- All wrapper classes use `Connection.createContract()` instead of `new web3.eth.Contract()`
- `newKitFromProvider()` factory added as the recommended entry point

### Remaining Web3 Surface (Quantified)

| Pattern | Count | Location |
|---|---|---|
| `kit.web3` references | **67** | Test files across contractkit, CLI |
| `createWeb3Shim` | **3** | Definition + call in dev-utils, comment in connection.ts |
| `web3.eth.*` method calls | **43** | Test files and dev-utils helpers |
| `web3.utils.*` method calls | **16** | Test files and CLI chain-setup |
| `newKitFromWeb3` call sites | **~217** | Test files (2 definitions + ~215 calls) |
| `@celo/abis/web3/` imports | **24** | Governance source + test files |
| `testLocallyWithWeb3Node` | **~554** | CLI test helper used in nearly all CLI tests |
| `Web3ContractCache` | **16** | Internal contractkit class (cosmetic) |
| `displayWeb3Tx` | **11** | CLI DKG commands utility |
| `getWeb3ForKit` | **4** | Deprecated helper in setupForKits.ts |
| `Web3` type imports | **76** | From `@celo/connect` across packages |

## Specification

### Canonical Client Types

All packages MUST use types from `@celo/actions/src/client.ts`:

| Type | Definition | Purpose |
|---|---|---|
| `PublicCeloClient` | `PublicClient<Transport, CeloChain, undefined>` | Read-only on-chain queries |
| `WalletCeloClient` | `WalletClient<Transport, CeloChain, Account>` | Signing & sending transactions |
| `CeloClient` | `Client<Transport, CeloChain>` | Base type for generic contexts |
| `Clients` | `{ public: PublicCeloClient, wallet?: WalletCeloClient }` | Combined client bag |

For tests, `@celo/dev-utils` exports `TestClientExtended` (via `createTestClient` + `publicActions` + `walletActions`).

### Client Construction Sites

| Context | Construction Site | Pattern |
|---|---|---|
| **Library packages** (`actions`, `core`) | Caller constructs clients | Functions accept `PublicCeloClient` / `WalletCeloClient` as params |
| **CLI** (`celocli`) | `BaseCommand.getPublicClient()` / `getWalletClient()` | Factory methods; transport from `--node` flag |
| **Tests** | `@celo/dev-utils` → `viem_testWithAnvil()` | Anvil-based; snapshot/revert per test |
| **User applications** | Users call `createPublicClient()` directly | Documented in migration guide |

### Transport & Chain Configuration

- **Transport**: `http()`, `webSocket()`, or `ipc()` from viem
- **Chain**: `celo` or `celoSepolia` from `viem/chains`; custom chain for dev/anvil
- **RPC URL**: Passed via transport factory; no global singleton

### Account/Signer Handling

| Environment | Mechanism | Result |
|---|---|---|
| Private key (Node/CLI) | `privateKeyToAccount(key)` → `createWalletClient({ account })` | `WalletCeloClient` |
| Ledger (Node/CLI) | `@celo/viem-account-ledger` → `ledgerToWalletClient()` | `WalletCeloClient` |
| RPC-managed (Node) | `createRpcWalletClient()` | `WalletCeloClient` |
| Browser wallet | Out of scope (standard viem patterns) | Documented |

### Migration Tiers

**Tier 1 — Core (blocking):**

| Package | Migration |
|---|---|
| `@celo/connect` | Remove `createWeb3Shim()`, `Web3` type, `Connection.web3` getter. Keep `Connection` class stripped of shim. |
| `@celo/contractkit` | Replace `@celo/abis/web3/*` with viem ABIs + `getContract()`. Constructor accepts `PublicCeloClient`. Remove `getWeb3ForKit()`, `SimpleHttpProvider`, `SimpleIpcProvider` |
| `@celo/celocli` | Remove `getKit()`, `getWeb3()`, `_kit`, `_web3`. All commands use `getPublicClient()` / `getWalletClient()` |

**Tier 2 — Dependent SDK packages:**

| Package | Dependency to Remove |
|---|---|
| `@celo/governance` | `kit.web3.utils.*`, `@celo/abis/web3/*` |
| `@celo/explorer` | `connection.web3.eth.*`, `connection.web3.utils.*` |
| `@celo/metadata-claims` | `newKitFromWeb3()` in tests |
| `@celo/transactions-uri` | `newKitFromWeb3()` in tests |

**Tier 3 — Wallet packages (deprecate):**

`wallet-base`, `wallet-local`, `wallet-ledger`, `wallet-hsm-*`, `wallet-remote` — mark `@deprecated`, stop importing in monorepo.

### Packages Already on Viem (No Changes)

`@celo/actions`, `@celo/core`, `@celo/viem-account-ledger`, `@celo/base`, `@celo/phone-utils`, `@celo/cryptographic-utils`, `@celo/keystores`

## Detailed Implementation Plan

### Phase 1: Governance Production Code (2 files)

| File | Line(s) | Current | Replacement |
|---|---|---|---|
| `packages/sdk/governance/src/proposals.ts` | 1-2 | `ABI as GovernanceABI` from `@celo/abis/web3/Governance`, `ABI as RegistryABI` from `@celo/abis/web3/Registry` | Import viem ABIs from `@celo/abis` (e.g., `governanceABI`, `registryABI`) |
| `packages/sdk/governance/src/interactive-proposal-builder.ts` | 138 | `require('@celo/abis/web3/${subPath}${contractName}').ABI` | `require('@celo/abis/${contractName}')` or static import from `@celo/abis` |

### Phase 2: Test Infrastructure (5 files)

These changes unblock the mass test file migration.

| File | Change |
|---|---|
| `packages/dev-utils/src/anvil-test.ts` | Modify `testWithAnvilL2()` to provide `Provider` (or `TestClientExtended`) instead of `Web3` shim to callbacks. Alternatively, have it provide both a `kit` (via `newKitFromProvider`) and a `provider`, eliminating the need for callers to call `newKitFromWeb3()`. |
| `packages/dev-utils/src/test-utils.ts` | Remove `createWeb3Shim()` function and `Web3` type import. Update `testWithWeb3()` to use viem client. |
| `packages/dev-utils/src/ganache-test.ts` | Rewrite `timeTravel()`, `mineBlocks()`, `getContractFromEvent()` etc. to accept a `Provider` or viem `TestClient` instead of `Web3` shim. Most of these only need `jsonRpcCall()` which takes a provider. |
| `packages/dev-utils/src/chain-setup.ts` | Replace `new web3.eth.Contract(abi, address)` with `Connection.createContract(abi, address)` or viem `getContract()`. Replace `web3.eth.getTransactionReceipt()` with viem or Connection equivalent. |
| `packages/dev-utils/src/contracts.ts` | Replace `new client.eth.Contract(abi).deploy(...).send(...)` with viem `deployContract()` or raw RPC. |

### Phase 3: Remove Core Shims (4 files)

| File | Line(s) | Change |
|---|---|---|
| `packages/sdk/connect/src/connection.ts` | 63 | Remove `export type Web3 = any` |
| `packages/sdk/contractkit/src/kit.ts` | 76-84 | Remove `newKitFromWeb3()` definition |
| `packages/sdk/contractkit/src/kit.ts` | 138-202 | Remove `get web3(): any` shim |
| `packages/sdk/contractkit/src/mini-kit.ts` | 50-58 | Remove `newKitFromWeb3()` definition |
| `packages/sdk/contractkit/src/setupForKits.ts` | 141-148 | Remove `getWeb3ForKit()` |

### Phase 4: Mass Test File Migration (~111 files)

#### 4A: Replace `newKitFromWeb3(client)` (~217 call sites)

**Pattern**: `newKitFromWeb3(client)` → `newKitFromProvider(provider)` (where `provider` comes from the updated test harness)

If Phase 2 changes `testWithAnvilL2()` to directly provide a `provider`, then:
```typescript
// Before
testWithAnvilL2('test name', async (client: Web3) => {
  const kit = newKitFromWeb3(client)
  ...
})

// After
testWithAnvilL2('test name', async (provider: Provider) => {
  const kit = newKitFromProvider(provider)
  ...
})
```

#### 4B: Replace `kit.web3.eth.*` calls (67 references)

| Current Pattern | Viem/Connection Replacement |
|---|---|
| `kit.web3.eth.getAccounts()` | `kit.connection.getAccounts()` |
| `kit.web3.eth.getBlockNumber()` | `kit.connection.getBlockNumber()` |
| `kit.web3.eth.getChainId()` | `kit.connection.chainId()` |
| `kit.web3.eth.getBlock(n)` | `kit.connection.getBlock(n)` |
| `kit.web3.eth.getBalance(addr)` | `kit.connection.getBalance(addr)` |
| `kit.web3.eth.getTransactionReceipt(hash)` | `kit.connection.getTransactionReceipt(hash)` |
| `kit.web3.eth.sign(data, addr)` | `kit.connection.sign(data, addr)` |
| `kit.web3.eth.sendTransaction(tx)` | `kit.connection.sendTransaction(tx)` |
| `kit.web3.eth.accounts.create()` | `import { generatePrivateKey, privateKeyToAddress } from 'viem/accounts'` |
| `kit.web3.currentProvider` | `kit.connection.currentProvider` |

#### 4C: Replace `kit.web3.utils.*` calls (16 references)

| Current Pattern | Viem Replacement |
|---|---|
| `kit.web3.utils.toWei('1', 'ether')` | `parseEther('1').toString()` from `viem` |
| `kit.web3.utils.toWei('1', 'gwei')` | `parseGwei('1').toString()` from `viem` |
| `kit.web3.utils.soliditySha3(...)` | `keccak256(encodePacked(...))` from `viem` |
| `kit.web3.utils.sha3(...)` | `keccak256(toBytes(...))` from `viem` |
| `kit.web3.utils.toChecksumAddress(addr)` | `getAddress(addr)` from `viem` |
| `kit.web3.utils.isAddress(addr)` | `isAddress(addr)` from `viem` |
| `kit.web3.utils.keccak256(val)` | `keccak256(val)` from `viem` |

#### 4D: Replace `@celo/abis/web3/*` factory functions (24 imports)

| Current | Replacement |
|---|---|
| `import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'` + `newReleaseGold(kit.web3, addr)` | `import { releaseGoldABI } from '@celo/abis'` + `kit.connection.createContract(releaseGoldABI, addr)` |
| `import { newRegistry } from '@celo/abis/web3/Registry'` + `newRegistry(kit.web3, addr)` | `import { registryABI } from '@celo/abis'` + `kit.connection.createContract(registryABI, addr)` |
| Same pattern for `newElection`, `newMultiSig`, `newSortedOracles`, `newGoldToken`, `newAttestations`, `newICeloVersionedContract` | Same pattern: import viem ABI from `@celo/abis` + `connection.createContract()` |

#### 4E: Replace `testLocallyWithWeb3Node` (~554 call sites)

The function only extracts the RPC URL from `web3.currentProvider`. Options:
1. **Rename to `testLocallyWithNode()`** and accept `{ currentProvider: Provider }` or `string` (URL directly)
2. **Keep function signature** accepting any object with `currentProvider` — since `Connection` has `currentProvider`, callers can pass `kit.connection` instead of `kit.web3`

Recommended: rename + accept `kit.connection` (which has `.currentProvider`).

#### 4F: Replace dev-utils helpers in CLI tests

| Function | Current signature | New signature |
|---|---|---|
| `timeTravel(seconds, web3)` | Accepts `Web3` shim | Accept `Provider` or `Connection` |
| `mineBlocks(count, web3)` | Accepts `Web3` shim | Accept `Provider` or `Connection` |
| `impersonateAccount(web3, address)` | Accepts `Web3` shim | Accept `Provider` or `Connection` |
| `stopImpersonatingAccount(web3, address)` | Accepts `Web3` shim | Accept `Provider` or `Connection` |
| `withImpersonatedAccount(web3, address, fn)` | Accepts `Web3` shim | Accept `Provider` or `Connection` |
| `setBalance(web3, address, balance)` | Accepts `Web3` shim | Accept `Provider` or `Connection` |
| `setCode(web3, address, code)` | Accepts `Web3` shim | Accept `Provider` or `Connection` |

These all only need `jsonRpcCall()`, which takes a `Provider`.

### Phase 5: Cosmetic Cleanup

| Item | Change |
|---|---|
| `Web3ContractCache` class | Rename to `ContractCache` |
| `web3-contract-cache.ts` file | Rename to `contract-cache.ts` |
| `displayWeb3Tx()` in CLI | Rename to `displayTx()` |
| `testLocallyWithWeb3Node()` | Rename to `testLocallyWithNode()` |
| `setupForKits.ts` | Remove if empty after `getWeb3ForKit()` removal |

### Identified Blockers and Mitigations

| # | Blocker | Severity | Mitigation |
|---|---|---|---|
| B1 | `ganache-test.ts` `getContractFromEvent()` uses `client.eth.getPastLogs()` and `client.utils.sha3()` | Medium | Rewrite to use raw RPC `eth_getLogs` + viem `keccak256()` |
| B2 | `dev-utils/contracts.ts` `deployAttestationsContract()` uses `new client.eth.Contract(abi).deploy(...).send(...)` | Medium | Rewrite using viem `deployContract()` or raw `eth_sendTransaction` |
| B3 | `@celo/abis/web3/*` factories used in governance production code | High | Switch to viem ABI imports from `@celo/abis` — must verify ABI format compatibility |
| B4 | `testLocallyWithWeb3Node` has 554 call sites | Low | Mechanical find-replace; function only uses `.currentProvider` |
| B5 | `newKitFromWeb3` has ~217 call sites | Low | Mechanical find-replace; already delegates to `newKitFromProvider` |
| B6 | `dev-utils/chain-setup.ts` uses `new web3.eth.Contract(abi, address)` for direct contract calls | Medium | Use `Connection.createContract()` or viem `getContract()` |

## Acceptance Criteria

1. **AC-1: `createWeb3Shim` Elimination**
   - AC-1.1: `grep -r "createWeb3Shim" packages/` returns zero results
   - AC-1.2: The `Web3` interface type is removed from `@celo/connect`'s public exports
   - AC-1.3: `Connection.web3` getter is removed. `Connection` class is preserved but stripped of the Web3 shim.

2. **AC-2: Canonical Client Type Adoption**
   - AC-2.1: `PublicCeloClient` and `WalletCeloClient` remain in `@celo/actions/src/client.ts` as single source of truth
   - AC-2.2: All packages that used `Connection` or `kit.web3` now use `PublicCeloClient` / `WalletCeloClient`
   - AC-2.3: `grep -r "kit\.web3\b" packages/` returns zero results
   - AC-2.4: `grep -r "@celo/abis/web3/" packages/` returns zero results
   - AC-2.5: `@celo/abis/web3/*` contract constructors are rewritten to accept viem `PublicClient` instead of the `Web3` shim

3. **AC-3: CLI Migration**
   - AC-3.1: `BaseCommand` no longer has `_kit`, `_web3`, `getKit()`, `getWeb3()`, or `newWeb3()`
   - AC-3.2: All CLI commands use `this.getPublicClient()` / `this.getWalletClient()` exclusively
   - AC-3.3: `testLocallyWithWeb3Node()` is removed; tests use viem-based harness
   - AC-3.4: Zero `import { Web3 } from '@celo/connect'` in `packages/cli/`
   - AC-3.5: Zero `import { newKitFromWeb3 } from '@celo/contractkit'` in `packages/cli/`

4. **AC-4: `@celo/connect` Cleanup**
   - AC-4.1: `@celo/connect` no longer exports `Web3` type
   - AC-4.2: `setupForKits.ts` exports removed from `@celo/contractkit`
   - AC-4.3: `Connection.web3` is gone. `Connection` class remains without the shim.

5. **AC-5: `@celo/contractkit` Refactoring**
   - AC-5.1: `Web3ContractCache` replaced with viem-based contract cache
   - AC-5.2: `ContractKit` constructor accepts `PublicCeloClient` (optionally `WalletCeloClient`)
   - AC-5.3: `newKit()` / `newKitFromWeb3()` replaced with viem-transport factory
   - AC-5.4: `kit.web3` property is removed

6. **AC-6: Dependent SDK Packages**
   - AC-6.1: `@celo/governance` uses viem ABIs and `PublicCeloClient`
   - AC-6.2: `@celo/explorer` uses viem client methods
   - AC-6.3: All test files use viem client construction

7. **AC-7: Test Infrastructure**
   - AC-7.1: `viem_testWithAnvil()` is the sole Anvil test harness; legacy `testWithAnvilL2()` removed
   - AC-7.2: All migrated tests pass with `RUN_ANVIL_TESTS=true`
   - AC-7.3: `yarn test` passes across the monorepo

8. **AC-8: Account/Signer Handling**
   - AC-8.1: Private-key signing uses `privateKeyToAccount()` → `createWalletClient()`
   - AC-8.2: Ledger uses `@celo/viem-account-ledger`
   - AC-8.3: RPC accounts use `createRpcWalletClient()` pattern
   - AC-8.4: Legacy wallet packages deprecated with `@deprecated` tags, not imported by production code

9. **AC-9: Documentation**
   - AC-9.1: `MIGRATION-TO-VIEM.md` updated to reflect completed migration
   - AC-9.2: `AGENTS.md` updated to state one paradigm (viem-based)
   - AC-9.3: Migrated package READMEs show viem-based usage examples

10. **AC-10: Build & CI**
    - AC-10.1: `yarn build` succeeds with zero TypeScript errors
    - AC-10.2: `yarn lint` passes
    - AC-10.3: `yarn test` passes
    - AC-10.4: Anvil tests pass with `RUN_ANVIL_TESTS=true`
    - AC-10.5: Changesets created for all packages with public API changes (major bumps for `connect`, `contractkit`)

## Non-goals

1. **Removing `@celo/contractkit` entirely** — refactored to use viem internally but continues to exist as a convenience wrapper
2. **Removing `@celo/connect` entirely** — stripped of Web3 shim but retains needed types (`CeloTx`, `CeloTxReceipt`, etc.)
3. **Browser wallet integration** — out of scope; architecture supports it via standard viem patterns
4. **Migrating external consumers** — major version bump + migration guide provided, but their code is not part of this work
5. **Removing `@celo/abis` web3 exports** — the web3 constructors are rewritten for viem, but old web3 exports may remain as deprecated aliases for external consumers
6. **HSM wallet viem implementations** — separate effort; legacy wallet packages deprecated not deleted
7. **Performance optimization** — this is a correctness/architecture change
8. **DKG commands removal** — DKG commands will be migrated to viem as part of this work, not removed

## Resolved Decisions

| # | Question | Decision |
|---|---|---|
| Q1 | Should `@celo/contractkit` continue as a wrapper or be absorbed into `@celo/actions`? | **Keep contractkit** as a convenience wrapper that internally uses viem |
| Q2 | Should `Connection` class be preserved (without shim) or removed entirely? | **Keep `Connection`** stripped of the Web3 shim |
| Q3 | Are DKG CLI commands actively used? | **Migrate them** to viem |
| Q4 | Should wallet packages be deprecated in-place or unpublished? | **Deprecate in-place** — mark `@deprecated`, stop importing in monorepo, keep publishing for external consumers |
| Q5 | Should `@celo/abis/web3/*` constructors be rewritten for viem? | **Yes** — rewrite to accept viem `PublicClient` |
| Q6 | Semver bumps? | **Major** for `@celo/connect` and `@celo/contractkit`; minor/patch for others |
| Q7 | One large PR or phased? | **One large PR** — all changes land atomically |

## Open Questions

None — all questions resolved.

---

AC_LOCKED: YES
