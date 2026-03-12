# Task 1: Widen BaseWrapper.contract Type - Learnings

## Key Findings

### Type Widening Success
- Successfully widened `BaseWrapper.contract` from `ContractLike<TAbi>` to `CeloContract<TAbi>`
- `CeloContract<TAbi>` = `GetContractReturnType<TAbi, PublicClient>` from viem
- Provides `.read`, `.write`, `.simulate`, `.estimateGas` typed namespaces

### Import Path
- `CeloContract` is exported from `@celo/connect` (re-exported from `contract-types.ts`)
- Import: `import { CeloContract } from '@celo/connect'`

### Subclass Updates Required
- Found 4 wrapper subclasses that override `contract` property with `ContractLike`:
  1. `AttestationsWrapper` - updated to `CeloContract<typeof attestationsABI>`
  2. `SortedOraclesWrapper` - updated to `CeloContract<typeof sortedOraclesABI>`
  3. `BaseWrapperForGoverning` - updated to `CeloContract<TAbi>`
  4. `EpochManagerWrapper` - added explicit type annotation to `_contract` getter

### Naming Conflict Resolution
- `SortedOracles.ts` had naming conflict: `CeloContract` enum from `../base` vs type from `@celo/connect`
- Solution: Aliased enum import as `CeloContractEnum`
- Updated all enum usages: `CeloContract.StableToken` → `CeloContractEnum.StableToken`

### Type Inference Issue
- `EpochManagerWrapper._contract` getter had inferred type too long for compiler
- Solution: Added explicit type annotation `CeloContract<typeof epochManagerABI>`

### Preserved Interfaces
- `ContractLike` interface kept alive (still used by `proxyCallGeneric`, `ContractRef`, etc.)
- `contractConnections` WeakMap kept (maps contract instances to Connection)

## Build Results
- Full monorepo: ✓ PASSED
- @celo/celocli: ✓ PASSED
- @celo/governance: ✓ PASSED

## Next Steps
- Task 2: Update `proxyCall` to use `.read` methods
- Task 3: Update `proxySend` to use `.write` methods

## Task 22: Type Test Assertions for .read Property

### Completed
- Added 4 new type assertions (Tests 13-16) to `typed-contracts.test-d.ts`
- Tests verify `.read` property access on `CeloContract<TAbi>` instances
- All tests follow existing patterns in the file (void expressions, @ts-expect-error directives)

### Key Patterns Observed
1. **Type test file structure**: Uses void expressions to test type compilation without runtime execution
2. **Error testing**: Uses `@ts-expect-error` comments to verify intentional type errors are caught
3. **CeloContract type**: Provides `.read`, `.write`, `.simulate`, `.estimateGas` namespaces via viem's `GetContractReturnType`
4. **Method filtering**: `.read` only exposes view/pure methods; `.write` only exposes state-changing methods

### Tests Added
- **Test 13**: Verify `.read.isAccount` resolves to correct function type (valid view method)
- **Test 14**: Verify function assignment works (callable with correct args)
- **Test 15**: Verify invalid method names are rejected (nonExistentFunction)
- **Test 16**: Verify send-only methods are rejected by `.read` (createAccount)

### Build Status
- `yarn workspace @celo/contractkit run build` ✅ PASSED
- All type assertions compile without errors
- Existing proxyCall/proxySend tests remain intact (not removed)

### Notes for Task 23
- When removing proxyCall/proxySend tests in Task 23, keep Tests 13-16 (the new .read assertions)
- The .read assertions provide the replacement type safety for the viem-based API

## Task 2: Arg Coercion Helper Functions (COMPLETED)

### Implementation Details
- Added `toViemAddress(v: string): \`0x${string}\`` at line 186-188
  - Uses existing `ensureLeading0x` import from `@celo/base/lib/address`
  - Casts result to viem's strict hex address type
  - Handles address coercion for `.read` calls

- Added `toViemBigInt(v: BigNumber.Value): bigint` at line 191-193
  - Converts BigNumber/string/number to bigint
  - Uses `.toFixed(0)` to avoid scientific notation issues
  - Handles numeric coercion for `.read` calls

### Key Insights
- Both functions placed alongside existing utility functions (valueToBigNumber, valueToString, etc.)
- No new dependencies needed - leverages existing imports
- Functions are properly exported and available for wrapper files to import
- Build verification: `yarn workspace @celo/contractkit run build` ✓
- Full monorepo build: `yarn build` ✓ (all packages exit code 0)
- Linting: No issues found

### Why These Helpers Matter
- `proxyCall` with viem's `.read` is strict about types (requires `0x${string}` for addresses, `bigint` for numbers)
- These helpers bridge the gap between wrapper's loose public API types and viem's strict types
- Replaces implicit coercion that `encodeFunctionData` was doing in the old proxyCall chain
- Note: `coerceArgsForAbi` only handled `bool` and `bytesN` - address/bigint coercion was never explicit

### Files Modified
- `packages/sdk/contractkit/src/wrappers/BaseWrapper.ts` (lines 185-193)

### Verification
- TypeScript definitions generated correctly
- Functions exported in `.d.ts` file
- No downstream breakage in monorepo

## Task 2: ScoreManager.ts - Completed

**Changes Made:**
- Replaced 2 `proxyCall` usages in ScoreManager.ts with direct `this.contract.read` calls
- Updated import: removed `proxyCall`, added `toViemAddress`
- Both methods follow the same pattern:
  - `getGroupScore(group: string)` → async arrow function with `toViemAddress(group)` coercion
  - `getValidatorScore(signer: string)` → async arrow function with `toViemAddress(signer)` coercion
  - Both apply `fixidityValueToBigNumber(res.toString())` output parser

**Build Status:** ✅ PASS (yarn workspace @celo/contractkit run build)

**Key Pattern Confirmed:**
- Args passed as array to `.read.functionName([args])`
- `toViemAddress()` converts string addresses to viem's `0x${string}` type
- Output parsers remain inline after `.toString()` call on bigint results

## Task 2: EpochRewards.ts - Completed

### Changes Made
- Replaced all 6 `proxyCall` usages with direct `this.contract.read` calls
- Removed `proxyCall` from import statement
- Kept `valueToBigNumber` in import (used by getTargetValidatorEpochPayment)

### Key Patterns Applied
1. **No-arg functions**: `.read.functionName()` (no array needed)
2. **Name mismatches handled**:
   - `getCommunityReward` → `.read.getCommunityRewardFraction()`
   - `_getCarbonOffsettingPartner` → `.read.carbonOffsettingPartner()`
   - `getTargetValidatorEpochPayment` → `.read.targetValidatorEpochPayment()`
3. **Tuple outputs**: Access via array indexing `res[0]`, `res[1]`, etc.
4. **Type annotations**: Private methods can have return type annotations (e.g., `Promise<string>`)

### Verification
- ✅ Zero `proxyCall` remaining in file
- ✅ `proxyCall` removed from import
- ✅ `yarn workspace @celo/contractkit run build` passes (exit code 0)
- ✅ No TypeScript errors in EpochRewards.ts

### Notes
- CeloContract<TAbi> is GetContractReturnType<TAbi, PublicClient> from viem
- This provides type-safe `.read`, `.write`, `.simulate`, `.estimateGas` namespaces
- Other wrappers (Freezer, FeeCurrencyDirectoryWrapper) already using `.read` successfully

## Task 4: FederatedAttestations.ts - All 4 proxyCall Replacements Complete

### Summary
Successfully replaced all 4 `proxyCall` usages in FederatedAttestations.ts with direct `this.contract.read` calls.

### Key Learnings

1. **Function Signature Conversions**:
   - `lookupIdentifiers(account: address, trustedIssuers: address[])` → async function with output parser
   - `lookupAttestations(identifier: bytes32, trustedIssuers: address[])` → async function with output parser
   - `validateAttestationSig(identifier: bytes32, issuer: address, account: address, signer: address, issuedOn: uint64, v: uint8, r: bytes32, s: bytes32)` → passthrough
   - `getUniqueAttestationHash(identifier: bytes32, issuer: address, account: address, signer: address, issuedOn: uint64)` → passthrough

2. **Type Coercion Patterns**:
   - Address params: `toViemAddress(param)` 
   - bytes32 params: `param as \`0x${string}\``
   - uint64 params: `toViemBigInt(param)`
   - uint8 params (v): `v as unknown as number` (special case - uint8 stays as number)
   - bytes32 arrays (r, s): `param as \`0x${string}\``

3. **Output Handling**:
   - Viem `.read` returns readonly arrays → spread with `[...res]` for mutable arrays
   - uint256[] outputs → `.map((v) => v.toString())` for string conversion
   - bytes32[] outputs → cast with `as string[]`
   - address[] outputs → cast with `as string[]`

4. **Import Updates**:
   - Removed: `proxyCall`
   - Added: `toViemAddress`, `toViemBigInt`
   - Kept: `proxySend` (for write functions)

5. **Build Verification**:
   - `yarn workspace @celo/contractkit run build` passes
   - `yarn lint` passes with no issues
   - All 4 functions converted successfully
   - All proxySend calls remain untouched

### File Changes
- File: `packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts`
- Lines modified: 4 (import), 16-25 (lookupIdentifiers), 41-53 (lookupAttestations), 68-88 (validateAttestationSig), 93-108 (getUniqueAttestationHash)
- Total lines: 203 (was 171)
- Zero `proxyCall` remaining in file

## Task 4: Escrow.ts - Completed

### Changes Made
- Replaced all 5 `proxyCall` usages with direct `this.contract.read` calls
- Removed `proxyCall` from import statement
- Added `toViemAddress` to import statement
- Kept all 4 `proxySend` calls untouched (transfer, withdraw, revoke, transferWithTrustedIssuers)

### Conversion Details

**1. escrowedPayments(paymentId)** - bytes32 parameter
```typescript
escrowedPayments = async (paymentId: string) => {
  const res = await this.contract.read.escrowedPayments([paymentId as `0x${string}`])
  return {
    recipientIdentifier: res[0] as string,
    sender: res[1] as string,
    token: res[2] as string,
    value: res[3].toString(),
    sentIndex: res[4].toString(),
    timestamp: res[6].toString(),
    expirySeconds: res[7].toString(),
    minAttestations: res[8].toString(),
  }
}
```
NOTE: paymentId is bytes32, so cast to `0x${string}` directly (not toViemAddress)

**2. getReceivedPaymentIds(identifier)** - bytes32 parameter
```typescript
getReceivedPaymentIds = async (identifier: string) => {
  const res = await this.contract.read.getReceivedPaymentIds([identifier as `0x${string}`])
  return [...res] as string[]
}
```
NOTE: identifier is bytes32, so cast to `0x${string}` directly

**3. getSentPaymentIds(sender)** - address parameter
```typescript
getSentPaymentIds = async (sender: string) => {
  const res = await this.contract.read.getSentPaymentIds([toViemAddress(sender)])
  return [...res] as string[]
}
```
NOTE: sender is an address, so use toViemAddress()

**4. getDefaultTrustedIssuers()** - no parameters
```typescript
getDefaultTrustedIssuers = async () => {
  const res = await this.contract.read.getDefaultTrustedIssuers()
  return [...res] as string[]
}
```

**5. getTrustedIssuersPerPayment(paymentId)** - address parameter
```typescript
getTrustedIssuersPerPayment = async (paymentId: string) => {
  const res = await this.contract.read.getTrustedIssuersPerPayment([toViemAddress(paymentId)])
  return [...res] as string[]
}
```
NOTE: paymentId is an address (temporary wallet), so use toViemAddress()

### Key Insight: Parameter Type Distinction
- **bytes32 parameters** (identifiers, payment IDs in escrowedPayments): Cast directly to `0x${string}`
- **address parameters** (sender, paymentId in getTrustedIssuersPerPayment): Use `toViemAddress()`
- The distinction is critical: bytes32 and address are different types in Solidity

### Verification
- ✅ Zero `proxyCall` remaining in file
- ✅ `proxyCall` removed from import
- ✅ `toViemAddress` added to import
- ✅ All 4 `proxySend` calls preserved
- ✅ `yarn workspace @celo/contractkit run build` passes (exit code 0)
- ✅ All 4 Escrow tests pass (transfer, withdraw, attestation checks)
- ✅ No TypeScript errors

### Test Results
```
PASS src/wrappers/Escrow.test.ts (5.809 s)
  Escrow Wrapper
    ✓ transfer with trusted issuers should set TrustedIssuersPerPayment (924 ms)
    ✓ withdraw should be successful after transferWithTrustedIssuers (1035 ms)
    ✓ withdraw should revert if attestation is not registered (661 ms)
    ✓ withdraw should revert if attestation is registered by issuer not on the trusted issuers list (845 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

## Task: Accounts.ts - 14 proxyCall Replacements Complete

### Summary
Replaced all 14 `proxyCall` usages in Accounts.ts with direct `this.contract.read` calls.

### Conversions
- **8 address→StrongAddress methods** (getAttestationSigner, getVoteSigner, getValidatorSigner, voteSignerToAccount, validatorSignerToAccount, signerToAccount): Single address arg, returns `0x${string}` which IS StrongAddress
- **2 boolean methods** (hasAuthorizedAttestationSigner, isAccount): straightforward
- **1 name mismatch** (isSigner → `isAuthorizedSigner`): Critical — wrapper name differs from ABI name
- **1 private passthrough** (_getName → `getName`): Used internally by `getName()`
- **1 with output parser** (getDataEncryptionKey): `solidityBytesToString(res)` on viem bytes return
- **1 complex output parser** (getPaymentDelegation): Tuple destructured to `{0: address, 1: bigint.toString()}`
- **2 string return** (getWalletAddress, getMetadataURL): Direct passthrough

### Key Pattern
- All 14 methods take a single address parameter → `[toViemAddress(arg)]`
- StrongAddress = `0x${string}` = viem address return type — no cast needed
- 17 `proxySend` calls preserved untouched

### Build Status
- ✅ `yarn workspace @celo/contractkit run build` passes (exit code 0)
- ✅ Zero `proxyCall` remaining in file
- ✅ `proxyCall` removed from import, `toViemAddress` added

## Task: LockedGold.ts - 11 proxyCall Replacements Complete

### Changes Made
- Replaced all 11 `proxyCall` usages with direct `this.contract.read` calls
- Removed `proxyCall` from import, added `toViemAddress` and `toViemBigInt`
- Kept all 7 `proxySend` calls untouched

### Conversion Details

| Method | ABI Name | Params | Notes |
|--------|----------|--------|-------|
| `_getAccountTotalDelegatedFraction` | `getAccountTotalDelegatedFraction` | address | `.toString()` output |
| `_getTotalDelegatedCelo` | `totalDelegatedCelo` | address | NAME MISMATCH, `.toString()` output |
| `_getDelegateesOfDelegator` | `getDelegateesOfDelegator` | address | `[...res] as string[]` spread |
| `getAccountTotalLockedGold` | `getAccountTotalLockedGold` | address | `valueToBigNumber` output |
| `getTotalLockedGold` | `getTotalLockedGold` | none | `valueToBigNumber` output |
| `getAccountNonvotingLockedGold` | `getAccountNonvotingLockedGold` | address | `valueToBigNumber` output |
| `_getUnlockingPeriod` | `unlockingPeriod` | none | NAME MISMATCH |
| `_getAccountTotalGovernanceVotingPower` | `getAccountTotalGovernanceVotingPower` | address | `valueToBigNumber` output |
| `_getPendingWithdrawals` | `getPendingWithdrawals` | address | Complex tuple with spread arrays |
| `_getPendingWithdrawal` | `getPendingWithdrawal` | address, uint256 | `toViemBigInt` for index |
| `_getTotalPendingWithdrawalsCount` | `getTotalPendingWithdrawalsCount` | address | `valueToBigNumber` output |

### Key Patterns
- 2 NAME MISMATCHES: `_getUnlockingPeriod` → `unlockingPeriod`, `_getTotalDelegatedCelo` → `totalDelegatedCelo`
- `toViemBigInt` needed for `_getPendingWithdrawal`'s `index` parameter (uint256)
- Pending withdrawals tuples: spread readonly arrays with `[...res[0]]` and `[...res[1]]`
- Single pending withdrawal: direct `.toString()` on indexed bigint results

### Build Status
- ✅ `yarn workspace @celo/contractkit run build` passes (exit code 0)
- ✅ Zero `proxyCall` remaining in file
- ✅ All 7 `proxySend` calls preserved

## Task: EpochManager.ts - All 14 proxyCall Replacements Complete

### Summary
Replaced all 14 `proxyCall` usages with direct `this.contract.read` calls. All 5 `proxySend` calls preserved.

### Conversion Categories

**No-arg BigNumber returns (3):** `epochDuration`, `firstKnownEpoch`, `getCurrentEpochNumber`
- Pattern: `async () => { const res = await this.contract.read.X(); return valueToInt(res.toString()) }`

**uint256-arg BigNumber returns (3):** `getFirstBlockAtEpoch`, `getLastBlockAtEpoch`, `getEpochNumberOfBlock`
- Pattern: `async (param: BigNumber.Value) => { ... this.contract.read.X([toViemBigInt(param)]) ... }`

**Address-arg string return (1):** `processedGroups`
- Pattern: `async (group: string) => { ... this.contract.read.X([toViemAddress(group)]) ... }`

**Boolean returns (4):** `isOnEpochProcess`, `isEpochProcessingStarted`, `isIndividualProcessing`, `isTimeForNextEpoch`
- Pattern: `async (): Promise<boolean> => { return this.contract.read.X() }`

**Array returns (2):** `getElectedAccounts`, `getElectedSigners`
- Pattern: `async (): Promise<string[]> => { const res = await ...; return [...res] as string[] }`
- Spread readonly arrays from viem

**Tuple/complex return (1):** `getEpochProcessingStatus`
- NAME MISMATCH: `.read.epochProcessing()` (not `.read.getEpochProcessingStatus()`)
- Access tuple indices for BigNumber conversion

### Build Status
- ✅ `yarn workspace @celo/contractkit run build` passes (exit code 0)
- ✅ Zero `proxyCall` remaining
- ✅ 5 `proxySend` calls untouched

## Task: SortedOracles.ts - 9 proxyCall Replacements Complete

### Changes Made
- Replaced all 9 `proxyCall` usages with direct `this.contract.read` calls
- Removed `proxyCall` from import, added `toViemAddress`
- Kept 2 `proxySend` calls untouched (_removeExpiredReports, _report)

### Conversions
1. `_numRates(target)` → `.read.numRates([toViemAddress(target)])` → `valueToInt(res.toString())`
2. `_medianRate(target)` → `.read.medianRate([toViemAddress(target)])` → `{ 0: string, 1: string }`
3. `_isOracle(target, oracle)` → `.read.isOracle([toViemAddress(target), toViemAddress(oracle)])` → boolean
4. `_getOracles(target)` → `.read.getOracles([toViemAddress(target)])` → `[...res] as string[]`
5. `reportExpirySeconds()` → `.read.reportExpirySeconds()` → `valueToBigNumber(res.toString())`
6. `_getTokenReportExpirySeconds(target)` → `.read.getTokenReportExpirySeconds([toViemAddress(target)])`
7. `_isOldestReportExpired(target)` → `.read.isOldestReportExpired([toViemAddress(target)])` → `{ 0: boolean, 1: Address }`
8. `_getRates(target)` → `.read.getRates([toViemAddress(target)])` → 3 arrays spread+mapped
9. `_getTimestamps(target)` → `.read.getTimestamps([toViemAddress(target)])` → 3 arrays spread+mapped

### Key Patterns
- `(...args: any[])` typed methods (_isOracle, _isOldestReportExpired) → replaced with explicit typed params
- All params are addresses → only `toViemAddress` needed, no `toViemBigInt`
- Complex tuple returns (getRates, getTimestamps) → spread readonly arrays, map bigints to strings
- `CeloContractEnum` alias preserved from Task 1
- Build: ✅ PASS

## Task: Attestations.ts - All 11 proxyCall Replacements Complete

### Summary
Replaced all 11 `proxyCall` usages with direct `this.contract.read` calls. Two `proxySend` calls preserved (`withdraw`, `_revoke`).

### Key Findings

**1. ABI Name Mismatch Confirmed:**
- `getAttestationStat` (wrapper method) → `.read.getAttestationStats` (ABI has trailing 's')
- `getPendingWithdrawals` (wrapper method) → `.read.pendingWithdrawals` (ABI: mapping getter)
- `_getAttestationRequestFee` (wrapper method) → `.read.getAttestationRequestFee` (ABI matches)

**2. pendingWithdrawals Takes 2 Address Params:**
- ABI: `pendingWithdrawals(address, address) returns (uint256)` — double mapping
- Original proxyCall inferred 2 params from ABI but JSDoc was confusing (two `@param account`)
- Converted to `getPendingWithdrawals(account: string, token: string)`
- Must check ABI for hidden multi-param signatures on mapping getters

**3. Conversion Patterns Applied:**
- bytes32 params: `identifier as \`0x${string}\``
- address params: `toViemAddress(param)`
- No uint256 input params needed in this file (no `toViemBigInt` import)
- bytes32[] param in batchGetAttestationStats: `identifiers.map((id) => id as \`0x${string}\``)`
- Readonly arrays from viem: `[...res]` for mutable arrays
- bigint outputs: `.toString()` then `valueToInt()` or `valueToBigNumber()`

**4. Complex Tuple Parsers Preserved Inline:**
- `getUnselectedRequest` → 3-field tuple: blockNumber, attestationsRequested, attestationRequestFeeToken
- `getAttestationState` → 1-field tuple: attestationState
- `getAttestationStat` → 2-field tuple: completed, total
- `_batchGetAttestationStats` → 4-array tuple with numeric keys (0,1,2,3)

**5. Build Verification:**
- ✅ `yarn workspace @celo/contractkit run build` passes (exit code 0)
- ✅ Zero `proxyCall` remaining (only `proxySend` in import + 2 usages)
- ✅ `toViemAddress` added to import, `proxyCall` removed

### Conversions Detail (11 total)
1. `attestationExpiryBlocks()` → no args
2. `attestationRequestFees(token)` → 1 address arg
3. `selectIssuersWaitBlocks()` → no args
4. `getUnselectedRequest(identifier, account)` → bytes32 + address, tuple output
5. `getAttestationIssuers(identifier, account)` → bytes32 + address, array output
6. `getAttestationState(identifier, account, issuer)` → bytes32 + 2 addresses, tuple output
7. `getAttestationStat(identifier, account)` → bytes32 + address, tuple output (ABI: getAttestationStats!)
8. `_getAttestationRequestFee(token)` → 1 address arg
9. `getPendingWithdrawals(account, token)` → 2 address args (double mapping!)
10. `lookupAccountsForIdentifier(identifier)` → 1 bytes32 arg, array output
11. `_batchGetAttestationStats(identifiers)` → bytes32[] arg, 4-array tuple output

## Task: Election.ts - All 24 proxyCall Replacements Complete

### Summary
Replaced all 24 `proxyCall` usages in Election.ts with direct `this.contract.read` calls. Zero `proxyCall` remaining. All 5 `proxySend` calls preserved untouched.

### Import Changes
- Removed: `proxyCall`, `identity`, `tupleParser`
- Added: `toViemAddress`, `toViemBigInt`
- Kept: `proxySend`, `fixidityValueToBigNumber`, `valueToBigNumber`, `valueToInt`

### Conversion Patterns Used

**14 private methods converted:**
1. `_electableValidators` → `.read.electableValidators()` — tuple output `[bigint, bigint]` → `{min, max}` BigNumbers
2. `_electNValidatorSigners(min, max)` → `.read.electNValidatorSigners([toViemBigInt, toViemBigInt])` — uint256 params
3. `_electValidatorSigners()` → `.read.electValidatorSigners()` — address[] output spread
4. `_getTotalVotesForGroup(group)` → `.read.getTotalVotesForGroup([toViemAddress])` — bigint→BigNumber
5. `_getActiveVotesForGroup(group)` → `.read.getActiveVotesForGroup([toViemAddress])` — bigint→BigNumber
6. `_getPendingVotesForGroupByAccount(group, account)` → `.read.getPendingVotesForGroupByAccount([toViemAddress, toViemAddress])`
7. `_getActiveVotesForGroupByAccount(group, account)` → `.read.getActiveVotesForGroupByAccount([toViemAddress, toViemAddress])`
8. `_getGroupsVotedForByAccountInternal(account)` → `.read.getGroupsVotedForByAccount([toViemAddress])` — address[] spread
9. `_hasActivatablePendingVotes(account, group)` → `.read.hasActivatablePendingVotes([toViemAddress, toViemAddress])` — bool passthrough
10. `_maxNumGroupsVotedFor()` → `.read.maxNumGroupsVotedFor()` — bigint→BigNumber
11. `_getGroupEligibility(group)` → `.read.getGroupEligibility([toViemAddress])` — bool passthrough
12. `_getNumVotesReceivable(group)` → `.read.getNumVotesReceivable([toViemAddress])` — bigint→BigNumber
13. `_getTotalVotesForEligibleValidatorGroups()` → `.read.getTotalVotesForEligibleValidatorGroups()` — complex tuple (address[], uint256[])
14. `_getGroupEpochRewardsBasedOnScore(group, rewards, score)` → `.read.getGroupEpochRewardsBasedOnScore([toViemAddress, toViemBigInt, toViemBigInt])`

**10 public methods converted:**
15. `electabilityThreshold` → `.read.getElectabilityThreshold()` — NAME MISMATCH (method→ABI)
16. `validatorSignerAddressFromSet(signerIndex, blockNumber)` → `.read.validatorSignerAddressFromSet([toViemBigInt, toViemBigInt])` — returns StrongAddress
17. `validatorSignerAddressFromCurrentSet(index)` → `.read.validatorSignerAddressFromCurrentSet([toViemBigInt])` — was using tupleParser(identity)
18. `numberValidatorsInSet(blockNumber)` → `.read.numberValidatorsInSet([toViemBigInt])` — returns number via valueToInt
19. `numberValidatorsInCurrentSet()` → `.read.numberValidatorsInCurrentSet()` — returns number via valueToInt
20. `getTotalVotes()` → `.read.getTotalVotes()` — bigint→BigNumber
21. `getCurrentValidatorSigners()` → `.read.getCurrentValidatorSigners()` — address[] spread
22. `getTotalVotesForGroupByAccount(group, account)` → `.read.getTotalVotesForGroupByAccount([toViemAddress, toViemAddress])`
23. `getGroupsVotedForByAccount(account)` → `.read.getGroupsVotedForByAccount([toViemAddress])` — address[] spread
24. `getTotalVotesByAccount(account)` → `.read.getTotalVotesByAccount([toViemAddress])` — bigint→BigNumber

### Key Insights
- `tupleParser(identity)` was used for `validatorSignerAddressFromCurrentSet` — replaced with explicit `toViemBigInt` conversion
- viem `.read` returns `0x${string}` for addresses which IS `StrongAddress` — no cast needed for return types
- Methods typed as `(...args: any[]) => Promise<boolean>` (like `_hasActivatablePendingVotes`, `_getGroupEligibility`) were replaced with explicit typed params
- `numberValidatorsInSet/numberValidatorsInCurrentSet` take/return uint256 in ABI but expose `number` in wrapper via `valueToInt`

### Build Status
- ✅ Zero `proxyCall` remaining in Election.ts
- ✅ Zero Election.ts build errors (verified via `grep -i Election` on build output)
- ⚠️ Pre-existing error in Attestations.ts (line 241, pendingWithdrawals arg count mismatch) — NOT from this task

## Validators.ts Conversion (Wave 4)
- 23 proxyCall usages converted in single edit operation (all bottom-up, no conflicts)
- 16 proxySend calls left untouched
- Key ABI name mismatches confirmed: getMembershipHistory, getGroupNumMembers, slashingMultiplierResetPeriod, commissionUpdateDelay, deprecated_downtimeGracePeriod
- `tupleParser` kept in imports — still used by 3 proxySend calls (setNextCommissionUpdate, registerValidator, registerValidatorNoBls)
- Private methods with untyped args got explicit typed params (address: string, index: number)
- Readonly viem arrays spread with `[...res]` in _getRegisteredValidators, _getValidatorGroup, getRegisteredValidatorGroupsAddresses, getValidatorMembershipHistory
- Build passed clean on first attempt — no type errors from conversion

## Governance.ts Conversion (Wave 4 - Heaviest file)

### Stats
- 30 proxyCall usages converted to viem .read calls in a single edit pass
- All proxySend calls (12) left untouched
- Build passes (exit code 0), zero proxyCall matches remaining

### Key Patterns Applied
- **Private methods with no input parser** (`_getConstitution`, `_getProposalStage`, `_getVoteRecord`, `_getDequeue`): These passed args through directly in web3. For viem, the private method now accepts typed params and internally converts with `toViemAddress`/`toViemBigInt`/`BigInt()`. Callers updated accordingly (e.g., removed `valueToString()` wrapper from `_getProposalStage` caller).
- **Name mismatches critical**: `getProposalMetadata` → `.read.getProposal()`, `getApprover` → `.read.approver()`, `getSecurityCouncil` → `.read.securityCouncil()`, `getVotes` → `.read.getVoteTotals()`, `minQuorumSize` → `.read.minQuorumSizeInCurrentSet()`, `getRefundedDeposits` → `.read.refundedDeposits()`
- **`tupleParser(identity)`** for address args: replaced with `toViemAddress(addr)`
- **`tupleParser(stringIdentity)`** for address args: replaced with `toViemAddress(addr)` 
- **`stringIdentity` output**: replaced with `as Promise<string>` cast since viem returns `` `0x${string}` ``
- **Complex input parser (`hotfixToParams`)**: Had to convert each param element individually — `BigInt(v)` for uint256[], `as \`0x${string}\`` for addresses/bytes
- **viem returns for enum (uint256)**: Used `Number(res)` instead of `valueToInt(res)` since viem returns `bigint` which is not `BigNumber.Value`
- **Import cleanup**: Removed `proxyCall`, `identity`, `stringIdentity`. Kept `tupleParser` (used by proxySend `approveHotfix`/`prepareHotfix`)
- **Readonly arrays**: Preserved existing `[...spread]` pattern for viem readonly array returns (getQueue, getDequeue)
