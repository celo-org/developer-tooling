# AGENTS.md

Celo developer-tooling monorepo: TypeScript SDKs and CLIs for the Celo blockchain.
Yarn 4 (Berry) workspaces with ~25 packages under `packages/`, `packages/sdk/`, and `packages/sdk/wallets/`.

## Build Commands

```bash
yarn install                  # install all dependencies (Yarn 4, node-modules linker)
yarn build                    # build all packages (topological order)
yarn build:changes            # build only packages changed since last commit
yarn clean                    # clean all packages

# Build a single package
yarn workspace @celo/core run build
yarn workspace @celo/contractkit run build
```

**Two build output patterns exist:**
- Legacy SDK packages (`packages/sdk/*`): `tsc -b .` -> `lib/` (CommonJS)
- Modern packages (`actions`, `core`, `dev-utils`, `viem-account-ledger`): dual ESM (`dist/mjs/`) + CJS (`dist/cjs/`)

## Lint and Format

```bash
yarn lint                     # biome lint (entire repo)
yarn fmt                      # biome format --write (auto-fix)
yarn fmt:diff                 # biome format (check only, used in CI)
```

Biome 2.0 is the sole linter and formatter. No ESLint. Prettier config exists but is legacy.

## Test Commands

Two test frameworks coexist:

```bash
# Run all tests across the monorepo
yarn test

# Run tests only for changed packages
yarn test:changes

# --- Jest (legacy SDK packages + CLI) ---
# All tests in a package
yarn workspace @celo/base run test
yarn workspace @celo/contractkit run test

# Single test file (Jest)
yarn workspace @celo/base run --top-level jest src/result.test.ts
yarn workspace @celo/contractkit run --top-level jest --forceExit src/wrappers/Accounts.test.ts

# --- Vitest (modern packages: @celo/actions, @celo/core, @celo/viem-account-ledger) ---
# All tests in a package
yarn workspace @celo/core run test

# Single test file (Vitest)
yarn workspace @celo/core run vitest --run src/staking/vote.test.ts
yarn workspace @celo/actions run vitest --run src/contracts/election.test.ts

# Changed files only (Vitest)
yarn workspace @celo/core run vitest --run --changed
```

Some tests require Foundry/Anvil for blockchain simulation. Set `RUN_ANVIL_TESTS=true` to enable.
**Anvil tests are NOT optional.** They MUST be run for any package that has them. Never skip Anvil tests or treat their failures as acceptable.
Test files are co-located: `foo.ts` next to `foo.test.ts`.

### Test Infrastructure Requirements

**Anvil version**: Anvil **v1.0.0** is required. Install with:
```bash
curl -L https://foundry.paradigm.xyz | bash && foundryup --install 1.0.0
```
Other Anvil versions may produce different devchain state (different contract addresses, block numbers, epoch numbers) causing snapshot mismatches. Always verify `anvil --version` shows `1.0.0`.

**NODE_OPTIONS**: Several Jest-based packages require `NODE_OPTIONS=--experimental-vm-modules` because `@viem/anvil` dynamically imports the ESM-only `execa` package. This flag is already set in each package's `test` script in `package.json`. Therefore:
- **ALWAYS** run tests via `yarn workspace <package> run test` (which uses the package's script with correct NODE_OPTIONS).
- **NEVER** run `yarn run --top-level jest` directly for packages that use Anvil — the tests will fail with `TypeError: A dynamic import callback was invoked without --experimental-vm-modules`.
- If you must run a single test file, use: `NODE_OPTIONS=--experimental-vm-modules yarn workspace <package> run --top-level jest --forceExit <path>`

Packages that require `--experimental-vm-modules`:
- `@celo/contractkit` (set in package.json test script)
- `@celo/celocli` (set in package.json test script)
- `@celo/governance` (set in package.json test script)
- `@celo/metadata-claims` (set in package.json test script)
- `@celo/transactions-uri` (set in package.json test script)

**CLI test suite (`@celo/celocli`)**: The `buffer-equal-constant-time` package crashes on Node.js versions where `SlowBuffer` has been removed (Node 25+). A Yarn patch exists in `.yarn/patches/` and is applied via `resolutions` in `package.json`. If you see `TypeError: Cannot read properties of undefined (reading 'prototype')` from `buffer-equal-constant-time`, run `yarn install` to ensure the patch is applied.

**Devchain-state-dependent snapshots**: Inline snapshots in contractkit and governance tests contain contract addresses, block numbers, and epoch numbers that depend on the specific Anvil devchain state file (`@celo/devchain-anvil/l2-devchain.json`). When the devchain state changes (e.g. new contract deployment, different Anvil version), these snapshots must be updated with `jest -u`. Prefer dynamic assertions (e.g. `toBeGreaterThan(0)`, relative comparisons) over hardcoded values where possible.

**`RUN_ANVIL_TESTS` value**: Must be the string `'true'` (not `'1'`). The check in `anvil-test.ts` is `process.env.RUN_ANVIL_TESTS === 'true'`.

## Versioning

Uses [Changesets](https://github.com/changesets/changesets). PRs that change public API or fix bugs need a changeset:

```bash
yarn cs                       # interactive changeset creation
```

## Code Style

### Formatting (enforced by Biome)

- **No semicolons** (Biome `semicolons: asNeeded`)
- **Single quotes** (`'value'` not `"value"`)
- **2-space indentation**, spaces not tabs
- **100-character line width**
- **Trailing commas**: ES5 style
- **Arrow parens**: always (`(x) => x` not `x => x`)
- **Bracket spacing**: `{ a }` not `{a}`
- **LF line endings**

### Imports

- Use `import type { Foo }` or `import { type Foo }` for type-only imports
- General ordering: `@celo/*` scoped packages, third-party packages, relative imports (not strictly enforced)
- Modern packages (`actions`, `core`, `dev-utils`, `viem-account-ledger`) **must** use `.js` extensions on relative imports (required for ESM)
- Legacy SDK packages use extensionless relative imports

### Naming Conventions

- **Files**: kebab-case (`fee-currency.ts`, `anvil-test.ts`). Exception: PascalCase for wrapper classes mapping to contracts (`Governance.ts`, `BaseWrapper.ts`)
- **Functions/variables**: camelCase (`signTransaction`, `getAccounts`)
- **Classes**: PascalCase (`Connection`, `LocalWallet`, `WalletBase`)
- **Types/interfaces**: PascalCase (`StrongAddress`, `PublicCeloClient`)
- **Constants**: SCREAMING_SNAKE_CASE (`NULL_ADDRESS`, `REGISTRY_CONTRACT_ADDRESS`)
- **Enums**: PascalCase name with PascalCase members (`ProposalStage.Queued`)
- **Generic type params**: `T`-prefixed (`TResult`, `TError`, `TSigner`)
- No `I` prefix on interfaces, no `T` prefix on type aliases

### Types

- Use `interface` for object shapes and API contracts
- Use `type` for aliases, unions, intersections, and utility types
- Array shorthand syntax: `string[]` not `Array<string>` (enforced by Biome `useConsistentArrayType: shorthand`)
- Strict null checks enabled; strict mode enabled in all tsconfig files
- `any` is allowed (`noExplicitAny: off`) but prefer specific types

### Exports

- Prefer **named exports** everywhere
- **Default exports** only for CLI commands (oclif requirement: `export default class Balance extends BaseCommand`)
- Barrel files (`index.ts`) use `export * from './module.js'`

### Error Handling

- Custom `Result<T, E>` type in `@celo/base` (`Ok`/`Err` discriminated union) for functional error handling
- `RootError<T>` base class with typed `errorType` field for custom errors
- Standard `try/catch` with `throw new Error(...)` for imperative code
- CLI uses `failWith()` utility for user-facing errors
- Catch params commonly typed as `any` or narrowed with `as`: `catch (err) { const error = err as Error }`

### Functions

- **Arrow functions** for short utilities and class methods needing `this` binding
- **Function declarations** for complex generics, overloads, and top-level public functions
- Class methods use standard method syntax; arrow-assigned class properties when `this` may detach

### Comments

- JSDoc with `@param` for public APIs
- `@deprecated` for deprecated methods
- `@internal` for non-public API
- Inline `//` comments for TODOs and explanations
- Debug logging via `debug` library (`debugFactory('connection:gas-estimation')`)

## Key Lint Rules (Biome)

- `useConst: error` - use `const` over `let` when variable is never reassigned
- `noDoubleEquals: error` - always use `===` / `!==`
- `useForOf: error` - prefer `for...of` over index-based loops
- `noGlobalEval: error` - no `eval()`
- `noTemplateCurlyInString: error` - catches `"${var}"` (should be template literal)
- `useShorthandFunctionType: error` - use `type Fn = () => void` not `type Fn = { (): void }`
- `noUndeclaredDependencies: error` - imports must come from declared dependencies

## TypeScript Configuration

- `strict: true` across all packages
- `noImplicitAny: true`, `noUnusedLocals: true`, `strictNullChecks: true`
- Legacy packages target ES6 with CommonJS modules (`moduleResolution: node`)
- Modern packages target ESNext for ESM, ES2015 for CJS (`moduleResolution: node`)
- CLI targets ES2020 with Node16 module resolution

## Project Patterns

- **Factory functions** over direct construction: `newKit()`, `newKitFromWeb3()`
- **Dependency injection** via constructor params (often `readonly`/`protected readonly`)
- **Wrapper + cache pattern** in contractkit: `WrapperCache` lazily creates contract wrappers
- **Two client paradigms**: legacy web3-based (`Connection`, `ContractKit`) and modern viem-based (`PublicCeloClient`)
- Test utilities in `@celo/dev-utils`: `testWithAnvilL2()` for web3 tests, `viem_testWithAnvil()` for viem tests

## Agentic Workflow

### Subagents (in `.opencode/agents/`)

#### Review & gate agents (read-only)

| Agent | Command | Role | Permissions |
|---|---|---|---|
| `spec` | `/spec <task>` | Produce spec + Acceptance Criteria. Ends with `AC_LOCKED: YES` | read-only, webfetch |
| `qa` | `/qa` | Verify test plan/coverage against AC. Ends with `VERDICT: PASS/FAIL` | read-only, bash |
| `security` | `/security` | Threat-model and review security. Ends with `VERDICT: PASS/FAIL` | read-only, bash |
| `architect` | `/arch` | Review design, coupling, maintainability. Ends with `VERDICT: PASS/FAIL` | read-only, bash |
| `release` | `/release` | Check merge/deploy readiness. Ends with `VERDICT: READY/NOT_READY` | read-only, bash |
| `reviewer` | (via `/implement`) | Reviews diff for quality and spec adherence. Ends with `VERDICT: PASS/FAIL` | read-only, bash |
| `approver` | (via `/implement`) | Final gate: build+lint+test+AC verification. Ends with `VERDICT: APPROVED/REJECTED` | read-only, bash |

#### Implementation agents (can edit code)

| Agent | Command | Role | Permissions |
|---|---|---|---|
| `builder` | (via `/implement`) | Implements production code against a locked spec | edit, bash, webfetch |
| `tester` | (via `/implement`) | Writes tests and runs the test suite | edit, bash |
| `fixer` | (via `/implement`) | Fixes build/lint/test failures from other agents | edit, bash, webfetch |

All agents use `anthropic/claude-opus-4-6`.

### Commands

| Command | Description |
|---|---|
| `/spec <task>` | Architect review + spec authoring → writes `specs/<slug>.md` |
| `/implement <spec-file>` | Full implementation pipeline (build → review → test → build verify → lint → changeset → QA → security → arch → approve) |
| `/qa` | Verify test coverage against AC |
| `/security` | Security review |
| `/arch` | Architecture review |
| `/release` | Release readiness check |

### Workflow: Spec > Implement > Release

```
0) Spec phase:
   /spec <task>  →  specs/<slug>.md  (AC_LOCKED: YES)

1) Implement phase:
   /implement specs/<slug>.md  →  runs the full pipeline:

   ┌─ Step 1: builder        — implements production code
   ├─ Step 2: reviewer       — reviews diff (PASS/FAIL loop with fixer, max 3 retries)
   ├─ Step 3: tester         — writes + runs tests (PASS/FAIL loop with fixer, max 3 retries)
   ├─ Step 4: build verify   — yarn build:changes (loop with fixer, max 3 retries)
   ├─ Step 5: lint/format    — yarn lint + yarn fmt:diff (loop with fixer, max 3 retries)
   ├─ Step 6: changeset      — create changeset if public API changed or bug fixed
   ├─ Step 7: qa gate        — QA agent (PASS/FAIL loop with tester+fixer, max 3 retries)
   ├─ Step 8: security gate  — security agent (PASS/FAIL loop with fixer, max 3 retries)
   ├─ Step 9: arch gate      — architect agent (PASS/FAIL loop with fixer, max 3 retries)
   └─ Step 10: approver      — final verification (APPROVED/REJECTED, max 2 retries)

   Output: IMPLEMENTATION: COMPLETE  or  IMPLEMENTATION: INCOMPLETE

2) Release phase:
   /release  →  VERDICT: READY/NOT_READY
```

Done = approver APPROVED (which implies: build PASS + lint PASS + tests PASS + all gates PASS).
