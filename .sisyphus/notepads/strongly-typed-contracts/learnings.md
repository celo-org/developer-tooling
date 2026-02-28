# Learnings

## 2026-02-27 Session Start
- Plan: strongly-typed-contracts (1341 lines, 18 tasks)
- Branch: pahor/removeViem
- Key files: viem-contract.ts (16 lines), viem-tx-object.ts, BaseWrapper.ts, contract-factory-cache.ts
- All 24 wrappers in packages/sdk/contractkit/src/wrappers/

## Task 13: Type-Level Test File (2026-02-27)
- Created `__type-tests__/typed-contracts.test-d.ts` with 8 type assertions
- Used `void` operator to suppress unused variable warnings (cleaner than underscore prefix)
- @ts-expect-error directives verify compile-time type checking works
- Verification: Removing @ts-expect-error causes TS2769 error (No overload matches)
- tsconfig.json includes .test-d.ts files in type checking (not excluded like .test.ts)
- Build passes with all type assertions in place
- Key insight: Type-only test files don't need runtime execution, just tsc --noEmit
