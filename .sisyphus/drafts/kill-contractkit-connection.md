# Draft: Kill ContractKit & Connection — Full Viem Migration

## Requirements (confirmed)
- Remove remaining deprecated types/exports across all packages
- Migrate CLI commands from ContractKit to native viem (@celo/actions)
- Kill the Connection class in @celo/connect
- Kill ContractKit itself
- Clean up dead code, unused exports, unreferenced functions

## User's Words
- "no shims no single renames - I need to start using viem as natively as possible"
- "if the architecture is not right just burn it"
- "you can remove celo/connect if it really makes sense, but in contractKit there is quite a bit of business logic - this cannot be easily removed"

## Research Findings

### 1. Deprecated Items (15 safe to remove, 5 need refactoring)
**Safe to remove (0 references):**
- ProviderOwner type (dev-utils/test-utils.ts)
- CeloToken type alias (contractkit/base.ts)
- isRegistered, buildFunctionCallToExternalContract (governance/proposal-builder.ts)
- formatNonAccentedCharacters (cryptographic-utils/account.ts)
- AttestationServiceUrl types (metadata-claims — 3 items)
- BlockExplorer deprecated methods (explorer — 3 items)
- RPC Wallet classes (wallet-rpc — 2 items)

**NOT safe (still referenced):**
- GoldToken enum (10+ refs)
- LockedGold enum (50+ refs)
- ReleaseGold deprecated methods (5+ refs)
- CELO_BASE_DERIVATION_PATH (3 refs)
- ContractABIs export (1 internal ref)

### 2. ContractKit in CLI — MASSIVE scope
- 99 files with @celo/contractkit imports
- 80 files with getKit() calls
- 13 distinct contract wrappers used
- 127 non-test command files

### 3. Connection class — Replaceable EXCEPT Celo-specific features
Most methods have direct viem equivalents. Celo-specific:
- feeCurrency support (defaultFeeCurrency, gasPrice(feeCurrency?), setFeeMarketGas)
- Gas inflation factor (defaultGasInflationFactor, estimateGasWithInflationFactor)
- CeloProvider (local wallet signing interception)

### 4. @celo/actions — ONLY 15% coverage of ContractKit
**Available:** governance vote, election vote/activate, signerToAccount, registry resolve, contract getters
**MISSING:** ALL of governance (upvote/approve/execute/withdraw/dequeue/hotfix), ALL of validators, ALL of lockedgold, ALL of accounts (except signerToAccount), ALL transfers

### 5. Dead Code (3 high priority, 2 medium)
**High priority:**
- exchange.ts functions (checkNotDangerousExchange, calculateExpectedSlippage, swapArguments)
- celoHistory.ts constants (DOLLAR_AMOUNT_FOR_ESTIMATE, CELO_AMOUNT_FOR_ESTIMATE)
- command.ts parsers (parseIntRange, parseAddressArray, parseHexString)

**Medium:**
- printValueMap2 in cli.ts
- ElectionResultsCache in election.ts (1 ref)

## CRITICAL SCOPE ISSUE

@celo/actions only covers ~15% of ContractKit. Items 2-4 ("migrate CLI", "kill Connection", "kill ContractKit") are NOT feasible as a single work plan. They require first building out @celo/actions to cover the missing 85%.

## Realistic Scope for THIS Plan

### Doable NOW:
1. Remove 15 deprecated items (0 references)
2. Remove 3-5 dead code items
3. Remove/refactor @celo/connect's Connection class (ContractKit can use viem directly)

### Requires @celo/actions expansion first:
4. Migrate CLI commands (blocked: need governance, validators, lockedgold, accounts in @celo/actions)
5. Kill ContractKit (blocked: business logic with no viem replacement)

## Scope Boundaries
- INCLUDE: Deprecated cleanup, dead code removal, Connection replacement
- EXCLUDE (for now): Full CLI migration, killing ContractKit
- FUTURE: Expand @celo/actions, then migrate CLI, then deprecate ContractKit
