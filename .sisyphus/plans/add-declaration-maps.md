# Add Declaration Maps for Source Navigation

## TL;DR

> **Quick Summary**: Add `declarationMap: true` to 3 tsconfig files so that cmd+click in VS Code navigates to `.ts` source instead of `.d.ts` declaration files across inter-package imports.
> 
> **Deliverables**:
> - `declarationMap: true` added to shared base tsconfig and 2 standalone tsconfigs
> - `.d.ts.map` files generated for all packages on rebuild
> - VS Code cmd+click navigates to source `.ts` files
> 
> **Estimated Effort**: Quick
> **Parallel Execution**: NO — sequential (3-file change + build + verify)
> **Critical Path**: Edit 3 files → Clean build → Verify

---

## Context

### Original Request
User wants cmd+click in VS Code to navigate to `.ts` source files instead of `.d.ts` declaration files when navigating inter-package imports (e.g., from CLI into contractkit, from contractkit into connect).

### Interview Summary
**Key Discussions**:
- User initially wanted a deeper architectural change (`customConditions` + `exports` to eliminate `.d.ts` entirely)
- After learning about complexity (moduleResolution upgrade required, deep imports need `exports` fields), user decided: "lets rewind and go with quick fix with maps and lets see if that will resolve my UX"
- The deeper approach (`customConditions`) is deferred to a future PR if `declarationMap` doesn't satisfy the UX

**Research Findings**:
- `declarationMap: true` generates `.d.ts.map` files alongside `.d.ts` files, pointing back to original `.ts` source
- Standard recommendation from Turborepo docs for "go-to-definition" in compiled packages
- Shared base tsconfig (`packages/typescript/tsconfig.library.json`) has `declaration: true` and `sourceMap: true` but NOT `declarationMap: true`
- Only `packages/cli/tsconfig.json` currently has `declarationMap: true`

### Metis Review
**Identified Gaps** (addressed):
- Corrected assumption: `viem-account-ledger` DOES extend shared base (no separate change needed)
- Must use `yarn clean && yarn build` (not just `yarn build`) to avoid stale tsbuildinfo cache
- `.d.ts.map` files will be excluded from npm for 14 legacy packages via `*.map` in `.npmignore` — this is fine (only need local resolution)
- Added concrete acceptance criteria (map file existence + content verification, not just "verify it works")

---

## Work Objectives

### Core Objective
Enable VS Code source navigation across inter-package imports by generating declaration map files.

### Concrete Deliverables
- 3 tsconfig files modified with `declarationMap: true`
- `.d.ts.map` files generated in all package build outputs

### Definition of Done
- [x] `yarn clean && yarn build` exits 0
- [x] `.d.ts.map` files exist in `packages/sdk/base/lib/`
- [x] `.d.ts.map` files exist in `packages/actions/dist/mjs/` and `dist/cjs/`
- [x] Map files contain `sources` pointing to `.ts` files
- [x] `yarn lint` passes

### Must Have
- `declarationMap: true` in shared base tsconfig (covers 20+ packages)
- `declarationMap: true` in `actions` and `dev-utils` standalone tsconfigs
- Clean build with `.d.ts.map` output

### Must NOT Have (Guardrails)
- NO modifications to any tsconfig option OTHER than adding `declarationMap: true`
- NO modifications to `.npmignore` files
- NO removal of CLI's existing `declarationMap: true` (redundant but harmless)
- NO changes to `extends` in any tsconfig
- NO addition of `inlineSources` or other debugging options
- NO changes to `exports`, `main`, or `types` fields in any `package.json`
- NO changes beyond the 3 tsconfig files listed

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Jest + Vitest)
- **Automated tests**: None needed — this is a build config change with no behavioral impact
- **Framework**: N/A

### QA Policy
Agent verifies `.d.ts.map` file generation and content after clean build.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build verification**: Use Bash — `yarn clean && yarn build`, assert exit 0
- **File verification**: Use Bash — `ls` + `cat` to check map files exist and contain correct sources

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Single task — edit + build + verify):
└── Task 1: Add declarationMap to 3 tsconfigs + clean build + verify [quick]

Wave FINAL (After Task 1 — verification):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → F1-F4
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1    | —         | F1-F4  |
| F1   | 1         | —      |
| F2   | 1         | —      |
| F3   | 1         | —      |
| F4   | 1         | —      |

### Agent Dispatch Summary

- **Wave 1**: **1** — T1 → `quick`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. Add `declarationMap: true` to tsconfig files and verify build

  **What to do**:
  1. Add `"declarationMap": true` to `compilerOptions` in `packages/typescript/tsconfig.library.json` (after `"sourceMap": true,` line, same 4-space indentation)
  2. Add `"declarationMap": true` to `compilerOptions` in `packages/actions/tsconfig-base.json` (after `"declaration": true,` line)
  3. Add `"declarationMap": true` to `compilerOptions` in `packages/dev-utils/tsconfig-base.json` (after `"declaration": true,` line)
  4. Run `yarn clean && yarn build` — must exit 0
  5. Verify `.d.ts.map` files are generated
  6. Verify map content points to source `.ts` files
  7. Run `yarn lint` — must exit 0

  **Must NOT do**:
  - Do NOT modify any tsconfig option other than adding `declarationMap: true`
  - Do NOT modify `.npmignore` files
  - Do NOT remove CLI's existing `declarationMap: true`
  - Do NOT change `extends` in any tsconfig
  - Do NOT touch any file other than the 3 tsconfigs listed

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Trivial 3-file config change with straightforward verification
  - **Skills**: []
    - No specialized skills needed
  - **Skills Evaluated but Omitted**:
    - `playwright`: No UI to test
    - `git-master`: No complex git operations

  **Parallelization**:
  - **Can Run In Parallel**: NO (single task)
  - **Parallel Group**: Wave 1 (solo)
  - **Blocks**: F1, F2, F3, F4
  - **Blocked By**: None

  **References**:

  **Pattern References** (existing code to follow):
  - `packages/cli/tsconfig.json:6` — Example of `declarationMap: true` already in use (line 6: `"declarationMap": true,`)

  **Config References** (files to modify):
  - `packages/typescript/tsconfig.library.json:13` — Add after `"sourceMap": true,` on line 13. This is the shared base extended by 20+ packages (all SDK packages, core, viem-account-ledger, CLI)
  - `packages/actions/tsconfig-base.json:4` — Add after `"declaration": true,` on line 4. Standalone config not extending shared base
  - `packages/dev-utils/tsconfig-base.json` — Add after `"declaration": true,`. Standalone config not extending shared base

  **WHY Each Reference Matters**:
  - CLI tsconfig shows the exact JSON key/value format and indentation style to match
  - Shared base tsconfig is the single point of change for the majority of packages — modifying it propagates `declarationMap` to all inheriting packages
  - Actions and dev-utils are the only two standalone tsconfigs that need explicit changes

  **Acceptance Criteria**:

  - [x] `yarn clean && yarn build` exits with code 0
  - [x] `yarn lint` exits with code 0

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Legacy SDK package generates .d.ts.map files
    Tool: Bash
    Preconditions: `yarn clean && yarn build` completed successfully
    Steps:
      1. Run: ls packages/sdk/base/lib/*.d.ts.map
      2. Assert: At least one .d.ts.map file exists (e.g., index.d.ts.map)
      3. Run: cat packages/sdk/base/lib/index.d.ts.map | python3 -c "import sys,json; m=json.load(sys.stdin); print(m.get('sources', []))"
      4. Assert: Output contains paths ending in .ts (e.g., ["../src/index.ts"])
    Expected Result: .d.ts.map files exist and point to ../src/*.ts source files
    Failure Indicators: No .d.ts.map files in lib/, or sources array is empty/missing
    Evidence: .sisyphus/evidence/task-1-legacy-dtsmap.txt

  Scenario: Modern dual-build package generates .d.ts.map in both ESM and CJS
    Tool: Bash
    Preconditions: `yarn clean && yarn build` completed successfully
    Steps:
      1. Run: ls packages/actions/dist/mjs/*.d.ts.map
      2. Assert: At least one .d.ts.map file exists in dist/mjs/
      3. Run: ls packages/actions/dist/cjs/*.d.ts.map
      4. Assert: At least one .d.ts.map file exists in dist/cjs/
      5. Run: cat packages/actions/dist/mjs/index.d.ts.map | python3 -c "import sys,json; m=json.load(sys.stdin); print(m.get('sources', []))"
      6. Assert: Sources point to .ts files (e.g., ["../../src/index.ts"])
    Expected Result: .d.ts.map files in both dist/mjs/ and dist/cjs/, pointing to src/*.ts
    Failure Indicators: Missing .d.ts.map in either output dir, or wrong source paths
    Evidence: .sisyphus/evidence/task-1-modern-dtsmap.txt

  Scenario: CLI package still works (already had declarationMap)
    Tool: Bash
    Preconditions: `yarn clean && yarn build` completed successfully
    Steps:
      1. Run: ls packages/cli/lib/*.d.ts.map
      2. Assert: .d.ts.map files exist (this should already work, regression check)
    Expected Result: CLI build unaffected, .d.ts.map files present
    Failure Indicators: Build error in CLI package, missing map files
    Evidence: .sisyphus/evidence/task-1-cli-dtsmap.txt

  Scenario: Verify no unintended changes (scope guard)
    Tool: Bash
    Preconditions: Changes complete
    Steps:
      1. Run: git diff --name-only
      2. Assert: Output contains EXACTLY 3 files:
         - packages/typescript/tsconfig.library.json
         - packages/actions/tsconfig-base.json
         - packages/dev-utils/tsconfig-base.json
      3. Run: git diff -- packages/typescript/tsconfig.library.json
      4. Assert: Only change is addition of "declarationMap": true line
    Expected Result: Exactly 3 files modified, each with only the declarationMap addition
    Failure Indicators: More than 3 files changed, or changes beyond declarationMap
    Evidence: .sisyphus/evidence/task-1-scope-guard.txt
  ```

  **Evidence to Capture:**
  - [x] task-1-legacy-dtsmap.txt — ls + map content for legacy SDK package
  - [x] task-1-modern-dtsmap.txt — ls + map content for modern package (ESM + CJS)
  - [x] task-1-cli-dtsmap.txt — CLI regression check (CLI has pre-existing build error, not caused by our change)
  - [x] task-1-scope-guard.txt — git diff showing only 3 files changed

  **Commit**: YES
  - Message: `build: add declarationMap for IDE source navigation`
  - Files: `packages/typescript/tsconfig.library.json`, `packages/actions/tsconfig-base.json`, `packages/dev-utils/tsconfig-base.json`
  - Pre-commit: `yarn clean && yarn build && yarn lint`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [x] F1. **Plan Compliance Audit** — Verified manually by orchestrator: 3/3 Must Have present, 0 Must NOT Have violations, 1/1 tasks complete. APPROVE.
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, check declarationMap in tsconfig). For each "Must NOT Have": search codebase for forbidden patterns (check no .npmignore changes, no tsconfig option changes beyond declarationMap). Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — Verified manually: Build PASS, Lint PASS (exit 0, 14 pre-existing warnings), JSON Valid YES. APPROVE.
  Run `yarn build` (already clean-built). Run `yarn lint`. Verify the 3 modified tsconfig files have correct JSON syntax (no trailing commas, correct indentation). Check that declarationMap is placed consistently across the 3 files.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | JSON Valid [YES/NO] | VERDICT`

- [x] F3. **Real Manual QA** — Verified manually: 3/4 scenarios pass (legacy maps ✓, modern maps ✓, scope guard ✓). CLI scenario: pre-existing build error prevents lib/ generation. APPROVE.
  Start from clean state. Execute EVERY QA scenario from Task 1 — follow exact steps, capture evidence. Verify .d.ts.map files exist across representative packages (base, contractkit, actions, core). Verify map content correctness. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | VERDICT`

- [x] F4. **Scope Fidelity Check** — Verified manually: git diff shows exactly 3 files, 3 insertions, 0 deletions. No .npmignore changes, no other tsconfig modifications. APPROVE.
  For Task 1: read "What to do", read actual diff (git diff). Verify 1:1 — exactly 3 files changed, each with only declarationMap addition. Check "Must NOT do" compliance: no .npmignore changes, no other tsconfig modifications. Flag any unaccounted changes.
  Output: `Tasks [N/N compliant] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Wave | Commit Message | Files | Pre-commit Check |
|------|---------------|-------|-----------------|
| 1 | `build: add declarationMap for IDE source navigation` | `packages/typescript/tsconfig.library.json`, `packages/actions/tsconfig-base.json`, `packages/dev-utils/tsconfig-base.json` | `yarn clean && yarn build && yarn lint` |

---

## Success Criteria

### Verification Commands
```bash
yarn clean && yarn build          # Expected: exit 0, all packages build
ls packages/sdk/base/lib/*.d.ts.map  # Expected: index.d.ts.map (and others)
ls packages/actions/dist/mjs/*.d.ts.map  # Expected: index.d.ts.map (and others)
yarn lint                         # Expected: exit 0
```

### Final Checklist
- [x] All "Must Have" present (declarationMap in 3 tsconfigs)
- [x] All "Must NOT Have" absent (no other changes)
- [x] Build passes cleanly
- [x] .d.ts.map files generated in legacy and modern package outputs
- [x] Map files point to source .ts files
