# Issues — Viem-Native Contract Migration

## 2026-02-26 Uncommitted formatting changes
- 25 files have Biome formatting changes (line wrapping for 100-char limit) that are NOT committed
- `EpochManager.test.ts` has a `@ts-expect-error` on line 146 that needs to be DIRECTLY above the line accessing `electionContract.contract` (line 149), but formatting broke the proximity → TS2578 "Unused @ts-expect-error" + TS2445 protected access error
- Fix: extract `electionContract.contract` to a local variable with `@ts-expect-error` on the line directly above it
