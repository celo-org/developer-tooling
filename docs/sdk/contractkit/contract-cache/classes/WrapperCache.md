[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [contract-cache](../README.md) / WrapperCache

# Class: WrapperCache

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L110)

Kit ContractWrappers factory & cache.

Provides access to all contract wrappers for celo core contracts

## Remarks

Because it provides access to all contract wrappers it must load all wrappers and the contract ABIs for them
Consider Using MiniWrapperCache, building your own, or if you only need one Wrapper using it directly

## Implements

- [`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md)

## Constructors

### Constructor

> **new WrapperCache**(`connection`, `_web3Contracts`, `registry`): `WrapperCache`

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L112)

#### Parameters

##### connection

`Connection`

##### \_web3Contracts

[`Web3ContractCache`](../../web3-contract-cache/classes/Web3ContractCache.md)

##### registry

[`AddressRegistry`](../../address-registry/classes/AddressRegistry.md)

#### Returns

`WrapperCache`

## Properties

### \_web3Contracts

> `readonly` **\_web3Contracts**: [`Web3ContractCache`](../../web3-contract-cache/classes/Web3ContractCache.md)

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L114)

***

### connection

> `readonly` **connection**: `Connection`

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L113)

***

### registry

> `readonly` **registry**: [`AddressRegistry`](../../address-registry/classes/AddressRegistry.md)

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L115)

## Methods

### getAccounts()

> **getAccounts**(): `Promise`\<[`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:118](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L118)

#### Returns

`Promise`\<[`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md)\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getAccounts`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getaccounts)

***

### getAttestations()

> **getAttestations**(): `Promise`\<[`AttestationsWrapper`](../../wrappers/Attestations/classes/AttestationsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L121)

#### Returns

`Promise`\<[`AttestationsWrapper`](../../wrappers/Attestations/classes/AttestationsWrapper.md)\>

***

### getCeloToken()

> **getCeloToken**(): `Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:153](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L153)

#### Returns

`Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

***

### getContract()

> **getContract**\<`C`\>(`contract`, `address?`): `Promise`\<`NonNullable`\<`WrapperCacheMap`\[`C`\]\>\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:191](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L191)

Get Contract wrapper

#### Type Parameters

##### C

`C` *extends* [`ValidWrappers`](../type-aliases/ValidWrappers.md)

#### Parameters

##### contract

`C`

##### address?

`string`

#### Returns

`Promise`\<`NonNullable`\<`WrapperCacheMap`\[`C`\]\>\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getContract`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getcontract)

***

### getElection()

> **getElection**(): `Promise`\<[`ElectionWrapper`](../../wrappers/Election/classes/ElectionWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L124)

#### Returns

`Promise`\<[`ElectionWrapper`](../../wrappers/Election/classes/ElectionWrapper.md)\>

***

### getEpochManager()

> **getEpochManager**(): `Promise`\<[`EpochManagerWrapper`](../../wrappers/EpochManager/classes/EpochManagerWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:130](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L130)

#### Returns

`Promise`\<[`EpochManagerWrapper`](../../wrappers/EpochManager/classes/EpochManagerWrapper.md)\>

***

### getEpochRewards()

> **getEpochRewards**(): `Promise`\<[`EpochRewardsWrapper`](../../wrappers/EpochRewards/classes/EpochRewardsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L127)

#### Returns

`Promise`\<[`EpochRewardsWrapper`](../../wrappers/EpochRewards/classes/EpochRewardsWrapper.md)\>

***

### getErc20()

> **getErc20**(`address`): `Promise`\<[`Erc20Wrapper`](../../wrappers/Erc20Wrapper/classes/Erc20Wrapper.md)\<`IERC20`\>\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:133](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L133)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<[`Erc20Wrapper`](../../wrappers/Erc20Wrapper/classes/Erc20Wrapper.md)\<`IERC20`\>\>

***

### getEscrow()

> **getEscrow**(): `Promise`\<[`EscrowWrapper`](../../wrappers/Escrow/classes/EscrowWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L136)

#### Returns

`Promise`\<[`EscrowWrapper`](../../wrappers/Escrow/classes/EscrowWrapper.md)\>

***

### getFederatedAttestations()

> **getFederatedAttestations**(): `Promise`\<[`FederatedAttestationsWrapper`](../../wrappers/FederatedAttestations/classes/FederatedAttestationsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L143)

#### Returns

`Promise`\<[`FederatedAttestationsWrapper`](../../wrappers/FederatedAttestations/classes/FederatedAttestationsWrapper.md)\>

***

### getFeeCurrencyDirectory()

> **getFeeCurrencyDirectory**(): `Promise`\<[`FeeCurrencyDirectoryWrapper`](../../wrappers/FeeCurrencyDirectoryWrapper/classes/FeeCurrencyDirectoryWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:146](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L146)

#### Returns

`Promise`\<[`FeeCurrencyDirectoryWrapper`](../../wrappers/FeeCurrencyDirectoryWrapper/classes/FeeCurrencyDirectoryWrapper.md)\>

***

### getFreezer()

> **getFreezer**(): `Promise`\<[`FreezerWrapper`](../../wrappers/Freezer/classes/FreezerWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:140](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L140)

#### Returns

`Promise`\<[`FreezerWrapper`](../../wrappers/Freezer/classes/FreezerWrapper.md)\>

***

### getGoldToken()

> **getGoldToken**(): `Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L150)

#### Returns

`Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getGoldToken`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getgoldtoken)

***

### getGovernance()

> **getGovernance**(): `Promise`\<[`GovernanceWrapper`](../../wrappers/Governance/classes/GovernanceWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:156](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L156)

#### Returns

`Promise`\<[`GovernanceWrapper`](../../wrappers/Governance/classes/GovernanceWrapper.md)\>

***

### getLockedCelo()

> **getLockedCelo**(): `Promise`\<[`LockedGoldWrapper`](../../wrappers/LockedGold/classes/LockedGoldWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:163](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L163)

#### Returns

`Promise`\<[`LockedGoldWrapper`](../../wrappers/LockedGold/classes/LockedGoldWrapper.md)\>

***

### getLockedGold()

> **getLockedGold**(): `Promise`\<[`LockedGoldWrapper`](../../wrappers/LockedGold/classes/LockedGoldWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:160](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L160)

#### Returns

`Promise`\<[`LockedGoldWrapper`](../../wrappers/LockedGold/classes/LockedGoldWrapper.md)\>

***

### getMultiSig()

> **getMultiSig**(`address`): `Promise`\<[`MultiSigWrapper`](../../wrappers/MultiSig/classes/MultiSigWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L166)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<[`MultiSigWrapper`](../../wrappers/MultiSig/classes/MultiSigWrapper.md)\>

***

### getOdisPayments()

> **getOdisPayments**(): `Promise`\<[`OdisPaymentsWrapper`](../../wrappers/OdisPayments/classes/OdisPaymentsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L169)

#### Returns

`Promise`\<[`OdisPaymentsWrapper`](../../wrappers/OdisPayments/classes/OdisPaymentsWrapper.md)\>

***

### getReserve()

> **getReserve**(): `Promise`\<[`ReserveWrapper`](../../wrappers/Reserve/classes/ReserveWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:172](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L172)

#### Returns

`Promise`\<[`ReserveWrapper`](../../wrappers/Reserve/classes/ReserveWrapper.md)\>

***

### getScoreManager()

> **getScoreManager**(): `Promise`\<[`ScoreManagerWrapper`](../../wrappers/ScoreManager/classes/ScoreManagerWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:175](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L175)

#### Returns

`Promise`\<[`ScoreManagerWrapper`](../../wrappers/ScoreManager/classes/ScoreManagerWrapper.md)\>

***

### getSortedOracles()

> **getSortedOracles**(): `Promise`\<[`SortedOraclesWrapper`](../../wrappers/SortedOracles/classes/SortedOraclesWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:178](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L178)

#### Returns

`Promise`\<[`SortedOraclesWrapper`](../../wrappers/SortedOracles/classes/SortedOraclesWrapper.md)\>

***

### getStableToken()

> **getStableToken**(`stableToken`): `Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:181](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L181)

#### Parameters

##### stableToken

[`StableToken`](../../celo-tokens/enumerations/StableToken.md) = `StableToken.cUSD`

#### Returns

`Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>

#### Implementation of

[`ContractCacheType`](../../basic-contract-cache-type/interfaces/ContractCacheType.md).[`getStableToken`](../../basic-contract-cache-type/interfaces/ContractCacheType.md#getstabletoken)

***

### getValidators()

> **getValidators**(): `Promise`\<[`ValidatorsWrapper`](../../wrappers/Validators/classes/ValidatorsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:184](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L184)

#### Returns

`Promise`\<[`ValidatorsWrapper`](../../wrappers/Validators/classes/ValidatorsWrapper.md)\>

***

### invalidateContract()

> **invalidateContract**\<`C`\>(`contract`): `void`

Defined in: [packages/sdk/contractkit/src/contract-cache.ts:215](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/contract-cache.ts#L215)

#### Type Parameters

##### C

`C` *extends* [`ValidWrappers`](../type-aliases/ValidWrappers.md)

#### Parameters

##### contract

`C`

#### Returns

`void`
