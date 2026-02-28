# Learnings — Viem-Native Contract Migration

## 2026-02-26 Phases 1-4 Complete
- proxyCall/proxySend new signatures: `proxyCall(contract, 'functionName')` instead of `proxyCall(contract.methods.functionName)`
- `createViemTxObject` returns `CeloTxObject` compatible with existing `sendTransactionObject`, `displayTx`, etc
- `coerceArgsForAbi()` bridges web3's lenient types to viem's strict types — used internally by createViemTxObject
- `Connection.getViemContract(abi, address)` returns `ViemContract = { abi, address, client }`
- Public API (`CeloTransactionObject`, wrapper method signatures) is UNCHANGED
- `contract` field in wrappers is `protected` — tests that access it need `@ts-expect-error` placed on correct line
- Callback params in `proxyCall` with `parseOutput` must be typed as `any` — generic `PreParsedOutput` can't be inferred from string function name
- Biome 100-char line width enforced — any long `createViemTxObject(...)` or `proxyCall(...)` calls must be multi-line

## Phase 5 - CLI Production Files Migration (8 files)

- `createViemTxObject` returns `CeloTxObject<O>` where O defaults to `unknown`. When the return value is indexed (e.g., `data[0]`), must use `createViemTxObject<any>(...)` to avoid TS18046.
- `displayTx` accepts `CeloTxObject` — direct drop-in replacement works with `createViemTxObject`.
- DKG commands use `require('./DKG.json')` (CommonJS) or `import DKG from './DKG.json'` — both provide `.abi` property.
- `dkg/deploy.ts` must keep `createContract` because `.deploy()` is not available on `ViemContract`.
- `release-gold-base.ts` only needed `createContract` → `getViemContract` swap since `ReleaseGoldWrapper` now expects `ViemContract` (changed in Phase 4).
- `network/contracts.ts` had inline chained calls (`.createContract(...).methods.foo().call()`) — needed to break into separate variable + `createViemTxObject` call.
- Pre-existing build errors in test files (`.test.ts`) and `governance/approve.ts` are unrelated to this migration — they involve `.methods` on `ViemContract` and `0x${string}` type issues from Phase 4 changes.

## Phase 5b: CLI Test Files Migration (2026-02-26)

### Patterns Applied
- **8 releasecelo test files**: Simple `createContract` → `getViemContract` swap in ReleaseGoldWrapper constructor calls
- **propose.test.ts**: `goldTokenContract.methods.transfer(...).encodeABI()` → `createViemTxObject(kit.connection, goldTokenContract, 'transfer', [...]).encodeABI()`
- **finish.test.ts**: `epochManagerWrapper._contract` is NOT protected (public `_contract`), so no `@ts-expect-error` needed
- **multisigUtils.ts**: `proxy.methods._setAndInitializeImplementation(...)` → `createViemTxObject(kit.connection, proxy, '_setAndInitializeImplementation', [...])`
- **chain-setup.ts**: `electionWrapper.contract` IS protected → needs `@ts-expect-error`
- **release-gold.ts**: Long `contract.methods.initialize(14 args).send(...)` → `createViemTxObject(connection, contract, 'initialize', [14 args]).send(...)`
- **execute/executehotfix tests**: `kit.connection.createContract(ABI, addr)` + `.methods.getValue(key).call()` → `getViemContract` + `createViemTxObject<string>(...).call()`

### Critical Gotcha: @ts-expect-error Positioning
- `@ts-expect-error` applies ONLY to the NEXT LINE
- After biome reformats multiline function calls, `@ts-expect-error` may end up N lines before the actual error
- **Solution**: Place `@ts-expect-error` as inline comment directly above the `.contract` property access line:
  ```typescript
  await createViemTxObject(
    kit.connection,
    // @ts-expect-error accessing protected property
    wrapper.contract,
    'methodName',
    [args]
  )
  ```

### network/contracts.test.ts Mock Rewrite
- Old: mocked `Connection.prototype.createContract`, modified `contract.methods.getVersionNumber`
- New: mocked `Connection.prototype.getViemContract`, returned ViemContract with mocked `client.call`
- For version queries: return ABI-encoded `[1,2,3,4]` as 4 uint256 values (256 hex chars)
- For GovernanceSlasher address: throw execution reverted error
- Used `address!` non-null assertion since `getViemContract` takes `string` not `string | undefined`

### Pre-existing Errors (untouched)
- `governance/approve.ts` has 2 TS2345 errors (string vs `0x${string}`) — not part of this migration

