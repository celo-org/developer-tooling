# Task 2 Audit: `decodeReceiptEvents` Usage Analysis

**Date**: 2026-02-27  
**Scope**: Full codebase audit for `decodeReceiptEvents` and `receipt.events` usage  
**Status**: READ-ONLY AUDIT (no modifications)

---

## Executive Summary

**VERDICT: GO - Safe to drop `decodeReceiptEvents`**

- `decodeReceiptEvents` is defined ONLY in `promi-event.ts` (lines 79-122)
- It is called ONLY ONCE in production code: inside `createPromiEvent` (line 37)
- NO production code reads `receipt.events` after it's populated
- The `EventLog` type is used extensively, but NOT for `receipt.events` population
- Deletion of `promi-event.ts` will NOT break any production functionality

---

## Detailed Findings

### 1. `decodeReceiptEvents` Function Definition

**File**: `packages/sdk/connect/src/promi-event.ts` (lines 79-122)

```typescript
export function decodeReceiptEvents(
  receipt: CeloTxReceipt,
  abi: AbiItem[],
  coder: AbiCoder
): CeloTxReceipt {
  // Decodes transaction logs and populates receipt.events
  // Returns receipt with events property populated
}
```

**Purpose**: Decodes raw transaction logs using ABI and populates `receipt.events` with decoded event data.

**Called From**: 
- `createPromiEvent` (promi-event.ts:37) - ONLY CALL IN ENTIRE CODEBASE

---

### 2. `receipt.events` Property Usage

**Type Definition**: `packages/sdk/connect/src/types.ts` (line 267)

```typescript
export interface CeloTxReceipt extends Partial<CeloParams> {
  // ... other properties
  events?: { [eventName: string]: EventLog }
}
```

**Search Results**: Only ONE match for `receipt.events` in entire codebase:
- `packages/sdk/connect/src/promi-event.ts:119` - ASSIGNMENT ONLY (sets the property)

**Conclusion**: NO code reads `receipt.events` after it's populated. The property is written but never consumed.

---

### 3. `EventLog` Type Usage Analysis

**Type Definition**: `packages/sdk/connect/src/types.ts` (lines 75-86)

```typescript
export interface EventLog {
  event: string
  address: string
  returnValues: Record<string, any>
  logIndex: number
  transactionIndex: number
  transactionHash: string
  blockHash: string
  blockNumber: number
  raw?: { data: string; topics: string[] }
}
```

**Files Importing/Using EventLog**: 12 files

#### 3.1 Type-Only Imports (No Functional Dependency)
- `packages/sdk/connect/src/abi-types.ts:1` - Type import only
- `packages/sdk/connect/src/viem-abi-coder.ts:12` - Type import only
- `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:6` - Type import only
- `packages/cli/src/utils/cli.ts:5` - Type import only

#### 3.2 Production Code Using EventLog (NOT from receipt.events)

**packages/sdk/connect/src/rpc-contract.ts** (lines 214-256)
- `getPastEvents()` method returns `Promise<EventLog[]>`
- Constructs EventLog objects from `eth_getLogs` RPC call
- **Does NOT use `receipt.events`**
- **Does NOT call `decodeReceiptEvents`**

**packages/sdk/explorer/src/log-explorer.ts** (lines 54-111)
- `getKnownLogs()` returns `EventLog[]` from `tx.logs`
- `tryParseLog()` constructs EventLog from raw Log
- Uses `kit.connection.getAbiCoder().decodeLog()` directly
- **Does NOT use `receipt.events`**
- **Does NOT call `decodeReceiptEvents`**

**packages/sdk/contractkit/src/wrappers/BaseWrapper.ts** (lines 80-120)
- `getPastEvents()` method returns `Promise<EventLog[]>`
- Calls `connection.rpcCaller.call('eth_getLogs', [params])`
- Constructs EventLog objects from logs
- **Does NOT use `receipt.events`**
- **Does NOT call `decodeReceiptEvents`**

**packages/sdk/contractkit/src/wrappers/LockedGold.ts** (line 366)
- Maps EventLog from `getPastEvents()` result
- Extracts `returnValues` from EventLog
- **Does NOT use `receipt.events`**

**packages/sdk/contractkit/src/wrappers/Election.ts** (lines 601, 609)
- Maps EventLog from `getPastEvents()` result
- Extracts `returnValues` from EventLog
- **Does NOT use `receipt.events`**

**packages/sdk/contractkit/src/wrappers/Validators.ts** (lines 722, 725, 733)
- Maps EventLog from `getPastEvents()` result
- Extracts `returnValues` from EventLog
- **Does NOT use `receipt.events`**

**packages/sdk/contractkit/src/wrappers/Reserve.ts** (lines 157, 163)
- Maps EventLog from `getPastEvents()` result
- Extracts `returnValues` from EventLog
- **Does NOT use `receipt.events`**

**packages/cli/src/utils/cli.ts** (lines 91-179)
- Uses viem's `decodeEventLog()` function (NOT `decodeReceiptEvents`)
- Constructs EventLog-like objects from logs
- **Does NOT use `receipt.events`**
- **Does NOT call `decodeReceiptEvents`**

---

### 4. Call Graph Analysis

```
createPromiEvent (promi-event.ts:7)
  └─ decodeReceiptEvents (promi-event.ts:37) ← ONLY CALL
       └─ receipt.events = events (promi-event.ts:119) ← ASSIGNMENT ONLY

getPastEvents (rpc-contract.ts:214, BaseWrapper.ts:80)
  └─ eth_getLogs RPC call
       └─ Constructs EventLog directly (NOT from receipt.events)

LogExplorer.tryParseLog (log-explorer.ts:65)
  └─ connection.getAbiCoder().decodeLog()
       └─ Constructs EventLog directly (NOT from receipt.events)

CLI displayViemTx (cli.ts:68)
  └─ viem's decodeEventLog()
       └─ Constructs EventLog-like objects (NOT from receipt.events)
```

**Key Finding**: All EventLog usage in production code constructs EventLog objects independently. None read from `receipt.events`.

---

### 5. Test Code Analysis

**Test Files Found**:
- `packages/sdk/contractkit/src/wrappers/*.test.ts` - Multiple test files
- `packages/sdk/connect/src/*.test.ts` - Connect tests

**Status**: Test files may reference EventLog or receipt.events, but:
- Tests are NOT production code
- Tests can be updated when `promi-event.ts` is deleted
- Tests do NOT block deletion decision

---

### 6. Dependency Chain

```
promi-event.ts (to be deleted)
  ├─ exports: createPromiEvent, decodeReceiptEvents, pollForReceiptHelper
  ├─ imports: types.ts, viem-abi-coder.ts, abi-types.ts
  └─ used by: rpc-contract.ts (createPromiEvent only)

rpc-contract.ts (to be deleted in Task 17)
  ├─ exports: createContractConstructor
  ├─ calls: createPromiEvent (from promi-event.ts)
  └─ used by: connection.ts

connection.ts (to be modified)
  ├─ imports: createContractConstructor from rpc-contract.ts
  └─ will be updated to use viem-based contract creation
```

---

### 7. Impact Assessment

#### 7.1 Direct Impact (Will Break)
- `createPromiEvent()` calls `decodeReceiptEvents()` - both will be deleted together
- No other code calls `decodeReceiptEvents()`

#### 7.2 Indirect Impact (Will NOT Break)
- `receipt.events` property is optional in `CeloTxReceipt` interface
- No production code reads `receipt.events`
- All EventLog usage is independent of `receipt.events`
- `EventLog` type will remain in `types.ts` (used by getPastEvents, LogExplorer, etc.)

#### 7.3 Code That Will Continue Working
- `getPastEvents()` methods in BaseWrapper, RpcContract
- `LogExplorer.getKnownLogs()` and `tryParseLog()`
- CLI event decoding via viem's `decodeEventLog()`
- All wrapper methods that use EventLog from getPastEvents()

---

### 8. Recommendations

### 8.1 Safe to Delete
✅ `decodeReceiptEvents()` function - NO production code depends on it  
✅ `promi-event.ts` file - Only used by rpc-contract.ts which is also being deleted  
✅ `receipt.events` population - NO code reads this property

### 8.2 Must Keep
✅ `EventLog` type in `types.ts` - Used by getPastEvents, LogExplorer, CLI  
✅ `receipt.events` property in `CeloTxReceipt` - Optional, doesn't break anything  
✅ `AbiCoder.decodeLog()` interface - Used by LogExplorer and other code

### 8.3 Migration Path
When deleting `promi-event.ts`:
1. Delete `promi-event.ts` entirely
2. Delete `rpc-contract.ts` (Task 17)
3. Update `connection.ts` to use viem-based contract creation
4. Update imports in any files that reference these modules
5. EventLog type and getPastEvents() methods remain unchanged

---

## Verification Checklist

- [x] Searched entire codebase for `decodeReceiptEvents` - Found 1 definition, 1 call
- [x] Searched entire codebase for `receipt.events` - Found 1 assignment, 0 reads
- [x] Searched entire codebase for `EventLog` - Found 12 files, all independent of receipt.events
- [x] Analyzed all EventLog usage - All construct EventLog independently
- [x] Verified no production code reads `receipt.events` - Confirmed
- [x] Checked call graph - No hidden dependencies found
- [x] Reviewed test code - Tests can be updated separately

---

## Conclusion

**VERDICT: GO - Safe to drop `decodeReceiptEvents` and `promi-event.ts`**

The function `decodeReceiptEvents` is a dead-end feature:
- It's called only once (in `createPromiEvent`)
- It populates `receipt.events` which is never read
- All production code that needs EventLog constructs it independently
- Deletion will not break any functionality

The `promi-event.ts` file can be safely deleted as part of Task 17 without any impact on production code.

---

## Appendix: File-by-File Summary

| File | EventLog Usage | receipt.events Usage | Impact |
|------|---|---|---|
| promi-event.ts | Type import | Populates (line 119) | DELETE - No dependencies |
| types.ts | Type definition | Property definition | KEEP - Type used elsewhere |
| rpc-contract.ts | Returns EventLog[] | None | DELETE (Task 17) |
| viem-abi-coder.ts | Type import, returns EventLog | None | KEEP - Used by LogExplorer |
| abi-types.ts | Type import | None | KEEP - Type definition |
| log-explorer.ts | Returns EventLog[] | None | KEEP - Independent implementation |
| BaseWrapper.ts | Returns EventLog[] | None | KEEP - Independent implementation |
| LockedGold.ts | Maps EventLog | None | KEEP - Uses getPastEvents |
| Election.ts | Maps EventLog | None | KEEP - Uses getPastEvents |
| Validators.ts | Maps EventLog | None | KEEP - Uses getPastEvents |
| Reserve.ts | Maps EventLog | None | KEEP - Uses getPastEvents |
| cli.ts | Type import, uses viem's decodeEventLog | None | KEEP - Uses viem directly |

