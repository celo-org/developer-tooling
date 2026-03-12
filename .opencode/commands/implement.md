---
description: Full implementation pipeline — build, review, test, fix, QA, security, arch, approve
subtask: true
---

You are the implementation orchestrator. You execute a full pipeline to implement a spec, ensuring the code builds and all tests pass before finishing.

**Spec file**: $ARGUMENTS

Read the spec file first to understand the full scope and Acceptance Criteria.

**IMPORTANT**: When invoking any agent below, ALWAYS pass the spec file path (`$ARGUMENTS`) so the agent can read it directly. Every agent needs access to the spec to do its job.

Execute the following pipeline. Each step uses a specialized agent. If any step FAILs, fix and retry (max 3 retries per step unless noted otherwise). If a step still fails after retries, stop and report.

---

## Step 1: Build

Use the **builder** agent to implement the production code against the spec.

Input: the spec file path (`$ARGUMENTS`)
Expected output: `BUILD: COMPLETE`

---

## Step 2: Review (quality loop)

Use the **reviewer** agent to review the diff for quality and spec adherence.

Input: the spec file path (`$ARGUMENTS`)
Expected output: `VERDICT: PASS` or `VERDICT: FAIL`

If FAIL:
1. Use the **fixer** agent with the reviewer's issue list to fix the problems.
2. Re-run the **reviewer** agent with the spec file path.
3. Repeat up to 3 times. If still FAIL after 3 rounds, stop and report.

---

## Step 3: Test

Use the **tester** agent to write tests and run the FULL test suite, INCLUDING Anvil tests.

Input: the spec file path (`$ARGUMENTS`)
Expected output: `VERDICT: PASS` or `VERDICT: FAIL`

**IMPORTANT**: The tester MUST run tests with `RUN_ANVIL_TESTS=true` for all affected packages (value must be `'true'`, not `'1'`). Anvil tests are NOT optional. Anvil **v1.0.0** must be installed (`foundryup --install 1.0.0`). Tests MUST be run via the package's `test` script (NOT raw `jest`) because the scripts set `NODE_OPTIONS=--experimental-vm-modules` required for `@viem/anvil`. If the tester skips Anvil tests or treats their failures as acceptable without proving they are pre-existing on the baseline branch, the verdict is automatically FAIL and the tester must be re-invoked.

**CLI TESTS**: ~92 of 98 `@celo/celocli` test suites fail with a pre-existing `buffer-equal-constant-time` / `@azure/identity` prototype error (reproduces on clean `master`). For CLI changes, verify TypeScript compiles with `yarn run --top-level tsc -b packages/cli/tsconfig.json` and run the 6 utility test suites that pass. Do NOT waste retries on this crash.

If FAIL:
1. Use the **fixer** agent with the tester's failure report.
2. Re-run the **tester** agent with the spec file path.
3. Repeat up to 3 times.

---

## Step 3.5: Anvil test verification

**This step is mandatory and cannot be skipped.**

Before proceeding, verify that Anvil v1.0.0 is installed:
```bash
which anvil || (curl -L https://foundry.paradigm.xyz | bash && foundryup --install 1.0.0)
anvil --version  # must show 1.0.0
```

Run the full test suite with Anvil tests for ALL affected packages. **ALWAYS use the package's `test` script**, never raw `jest`:
```bash
RUN_ANVIL_TESTS=true yarn workspace <package> run test
```
The `test` scripts set `NODE_OPTIONS=--experimental-vm-modules` which is required for `@viem/anvil`. Without it, tests crash with `TypeError: A dynamic import callback was invoked without --experimental-vm-modules`.

**For `@celo/celocli`**: ~92 of 98 test suites fail with a pre-existing `buffer-equal-constant-time` crash. Verify CLI changes compile with `yarn run --top-level tsc -b packages/cli/tsconfig.json` and run the 6 utility test suites that pass. Do NOT use fixer cycles on this crash.

If any test fails:
1. Stash your changes: `git stash`
2. Rebuild the package on baseline: `yarn workspace <package> run build`
3. Run the same test on baseline: `RUN_ANVIL_TESTS=true yarn workspace <package> run test`
4. Record whether it passes or fails.
5. Restore changes: `git stash pop`
6. If it PASSES on baseline but FAILS on your branch → REGRESSION → use the **fixer** agent to fix it.
7. If it FAILS on baseline too → PRE-EXISTING → document with baseline output as proof. This does NOT block the pipeline.
8. If inline snapshots fail due to changed contract addresses / block numbers / epoch numbers → update with `jest -u` (devchain-state dependent, not a code regression).

Repeat until zero regressions remain.

---

## Step 4: Build verification

Run `yarn build:changes` yourself to verify only affected packages build. If it fails:
1. Use the **fixer** agent with the build error output.
2. Re-run `yarn build:changes`.
3. Repeat up to 3 times.

If `yarn build:changes` is not sufficient (e.g. cross-package dependencies), fall back to `yarn build`.

---

## Step 5: Lint & format verification

Run `yarn lint` and `yarn fmt:diff` yourself. If either fails:
1. Run `yarn fmt` to auto-fix formatting.
2. Use the **fixer** agent for any remaining lint errors.
3. Re-verify with `yarn lint` and `yarn fmt:diff`.
4. Repeat up to 3 times.

---

## Step 6: Changeset

Check if a changeset is needed (it is if any public API was changed or a bug was fixed). If needed:
1. Identify which packages were changed and determine the correct bump type:
   - `major` for breaking API changes
   - `minor` for new features / additions
   - `patch` for bug fixes
2. Create a changeset file at `.changeset/<descriptive-slug>.md` with the following format:
   ```
   ---
   '<package-name>': <bump-type>
   ---

   <Brief description of the change for the changelog>
   ```
3. If multiple packages are affected, list each one in the frontmatter.

---

## Step 7: QA gate

Use the **qa** agent to verify test coverage against the locked AC.

Input: the spec file path (`$ARGUMENTS`)
Expected output: `VERDICT: PASS` or `VERDICT: FAIL`

If FAIL:
1. Use the **tester** agent to add missing tests identified by QA, passing the spec file path.
2. Use the **fixer** agent if tests fail.
3. Re-run **qa** with the spec file path.
4. Repeat up to 3 times.

---

## Step 8: Security gate

Use the **security** agent to review for security issues.

Input: the spec file path (`$ARGUMENTS`)
Expected output: `VERDICT: PASS` or `VERDICT: FAIL`

If FAIL:
1. Use the **fixer** agent with the security findings.
2. Re-run **security** with the spec file path.
3. Repeat up to 3 times.

---

## Step 9: Architecture gate

Use the **architect** agent to review design and maintainability.

Input: the spec file path (`$ARGUMENTS`)
Expected output: `VERDICT: PASS` or `VERDICT: FAIL`

If FAIL:
1. Use the **fixer** agent with the architecture concerns.
2. Re-run **architect** with the spec file path.
3. Repeat up to 3 times.

---

## Step 10: Final approval

Use the **approver** agent for final verification.

Input: the spec file path (`$ARGUMENTS`) and a summary of all prior gate results.
Expected output: `VERDICT: APPROVED` or `VERDICT: REJECTED`

**IMPORTANT**: The approver MUST independently run Anvil tests (`RUN_ANVIL_TESTS=true`, using package `test` scripts, with Anvil v1.0.0). If the approver does not run Anvil tests, or approves despite untested Anvil suites, the approval is invalid. Any test regression (test that passes on baseline but fails on the branch) is an automatic REJECTED. The pre-existing CLI `buffer-equal-constant-time` crash is NOT a regression.

If REJECTED:
1. Use the **fixer** agent with the rejection reasons.
2. Re-run the **approver** agent with the spec file path.
3. Repeat up to 2 times. If still rejected, stop and report all remaining issues.

---

## Completion

When the approver returns `VERDICT: APPROVED`:
1. Print a summary of all changes made (file list + brief descriptions).
2. Print all gate results: reviewer, tester, QA, security, architect, approver.
3. Print: `IMPLEMENTATION: COMPLETE`

If the pipeline cannot complete (any step exhausted its retries):
1. Print which step failed and why.
2. Print all gate results collected so far.
3. Print: `IMPLEMENTATION: INCOMPLETE — manual intervention required`
