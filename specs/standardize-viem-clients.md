# Standardize All Packages to Use Viem Clients Directly

## Architecture Review

### Current State — Two Coexisting Paradigms

1. **Legacy (web3-based)**: `@celo/connect` defines a `Connection` class wrapping a JSON-RPC `Provider` and exposing a `web3` getter via `createWeb3Shim()`. `@celo/contractkit` builds on this (`ContractKit → Connection → Web3 shim`). All legacy SDK packages (`contractkit`, `connect`, `governance`, `explorer`, `metadata-claims`, `transactions-uri`) and CLI test infrastructure depend on this.

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
   - AC-7.2: All migrated tests pass with `RUN_ANVIL_TESTS=1`
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
    - AC-10.4: Anvil tests pass with `RUN_ANVIL_TESTS=1`
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

---

AC_LOCKED: YES
