[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [web3-contract-cache](../README.md) / Web3ContractCache

# Class: Web3ContractCache

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L87)

Native Web3 contracts factory and cache.

Exposes accessors to all `CeloContract` web3 contracts.

Mostly a private cache, kit users would normally use
a contract wrapper

## Constructors

### Constructor

> **new Web3ContractCache**(`registry`): `Web3ContractCache`

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L90)

core contract's address registry

#### Parameters

##### registry

[`AddressRegistry`](../../address-registry/classes/AddressRegistry.md)

#### Returns

`Web3ContractCache`

## Properties

### registry

> `readonly` **registry**: [`AddressRegistry`](../../address-registry/classes/AddressRegistry.md)

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L90)

## Methods

### getAccounts()

> **getAccounts**(): `Promise`\<`Accounts`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L91)

#### Returns

`Promise`\<`Accounts`\>

***

### getAttestations()

> **getAttestations**(): `Promise`\<`Attestations`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L94)

#### Returns

`Promise`\<`Attestations`\>

***

### getCeloToken()

> **getCeloToken**(): `Promise`\<`GoldToken`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:131](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L131)

#### Returns

`Promise`\<`GoldToken`\>

***

### getCeloUnreleasedTreasury()

> **getCeloUnreleasedTreasury**(): `Promise`\<`CeloUnreleasedTreasury`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L97)

#### Returns

`Promise`\<`CeloUnreleasedTreasury`\>

***

### getContract()

> **getContract**\<`C`\>(`contract`, `address?`): `Promise`\<`NonNullable`\<`ContractCacheMap`\[`C`\]\>\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:172](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L172)

Get native web3 contract wrapper

#### Type Parameters

##### C

`C` *extends* [`CeloContract`](../../base/enumerations/CeloContract.md)

#### Parameters

##### contract

`C`

##### address?

`string`

#### Returns

`Promise`\<`NonNullable`\<`ContractCacheMap`\[`C`\]\>\>

***

### getElection()

> **getElection**(): `Promise`\<`Election`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L100)

#### Returns

`Promise`\<`Election`\>

***

### getEpochManager()

> **getEpochManager**(): `Promise`\<`EpochManager`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L103)

#### Returns

`Promise`\<`EpochManager`\>

***

### getEpochManagerEnabler()

> **getEpochManagerEnabler**(): `Promise`\<`EpochManagerEnabler`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L106)

#### Returns

`Promise`\<`EpochManagerEnabler`\>

***

### getEpochRewards()

> **getEpochRewards**(): `Promise`\<`EpochRewards`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L109)

#### Returns

`Promise`\<`EpochRewards`\>

***

### getErc20()

> **getErc20**(`address`): `Promise`\<`IERC20`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L112)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`IERC20`\>

***

### getEscrow()

> **getEscrow**(): `Promise`\<`Escrow`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L115)

#### Returns

`Promise`\<`Escrow`\>

***

### getFederatedAttestations()

> **getFederatedAttestations**(): `Promise`\<`FederatedAttestations`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:118](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L118)

#### Returns

`Promise`\<`FederatedAttestations`\>

***

### getFeeHandler()

> **getFeeHandler**(): `Promise`\<`FeeHandler`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L124)

#### Returns

`Promise`\<`FeeHandler`\>

***

### getFreezer()

> **getFreezer**(): `Promise`\<`Freezer`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L121)

#### Returns

`Promise`\<`Freezer`\>

***

### getGoldToken()

> **getGoldToken**(): `Promise`\<`GoldToken`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L128)

#### Returns

`Promise`\<`GoldToken`\>

***

### getGovernance()

> **getGovernance**(): `Promise`\<`Governance`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:134](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L134)

#### Returns

`Promise`\<`Governance`\>

***

### getLockedCelo()

> **getLockedCelo**(): `Promise`\<`LockedGold`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:141](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L141)

#### Returns

`Promise`\<`LockedGold`\>

***

### getLockedGold()

> **getLockedGold**(): `Promise`\<`LockedGold`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L138)

#### Returns

`Promise`\<`LockedGold`\>

***

### getMultiSig()

> **getMultiSig**(`address`): `Promise`\<`MultiSig`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:144](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L144)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`MultiSig`\>

***

### getOdisPayments()

> **getOdisPayments**(): `Promise`\<`OdisPayments`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L147)

#### Returns

`Promise`\<`OdisPayments`\>

***

### getRegistry()

> **getRegistry**(): `Promise`\<`Registry`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L150)

#### Returns

`Promise`\<`Registry`\>

***

### getReserve()

> **getReserve**(): `Promise`\<`Reserve`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:153](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L153)

#### Returns

`Promise`\<`Reserve`\>

***

### getScoreManager()

> **getScoreManager**(): `Promise`\<`ScoreManager`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:156](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L156)

#### Returns

`Promise`\<`ScoreManager`\>

***

### getSortedOracles()

> **getSortedOracles**(): `Promise`\<`SortedOracles`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L159)

#### Returns

`Promise`\<`SortedOracles`\>

***

### getStableToken()

> **getStableToken**(`stableToken`): `Promise`\<`NonNullable`\<`undefined` \| `Registry` \| `Accounts` \| `IERC20` \| `GoldToken` \| `StableToken` \| `Attestations` \| `CeloUnreleasedTreasury` \| `Election` \| `EpochManager` \| `EpochManagerEnabler` \| `EpochRewards` \| `Escrow` \| `FederatedAttestations` \| `FeeCurrencyDirectory` \| `Freezer` \| `FeeHandler` \| `MentoFeeHandlerSeller` \| `UniswapFeeHandlerSeller` \| `Governance` \| `GovernanceSlasher` \| `LockedGold` \| `MultiSig` \| `OdisPayments` \| `Reserve` \| `ScoreManager` \| `SortedOracles` \| `Validators`\>\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:162](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L162)

#### Parameters

##### stableToken

[`StableToken`](../../celo-tokens/enumerations/StableToken.md) = `StableToken.cUSD`

#### Returns

`Promise`\<`NonNullable`\<`undefined` \| `Registry` \| `Accounts` \| `IERC20` \| `GoldToken` \| `StableToken` \| `Attestations` \| `CeloUnreleasedTreasury` \| `Election` \| `EpochManager` \| `EpochManagerEnabler` \| `EpochRewards` \| `Escrow` \| `FederatedAttestations` \| `FeeCurrencyDirectory` \| `Freezer` \| `FeeHandler` \| `MentoFeeHandlerSeller` \| `UniswapFeeHandlerSeller` \| `Governance` \| `GovernanceSlasher` \| `LockedGold` \| `MultiSig` \| `OdisPayments` \| `Reserve` \| `ScoreManager` \| `SortedOracles` \| `Validators`\>\>

***

### getValidators()

> **getValidators**(): `Promise`\<`Validators`\>

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L165)

#### Returns

`Promise`\<`Validators`\>

***

### invalidateContract()

> **invalidateContract**\<`C`\>(`contract`): `void`

Defined in: [packages/sdk/contractkit/src/web3-contract-cache.ts:191](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L191)

#### Type Parameters

##### C

`C` *extends* [`CeloContract`](../../base/enumerations/CeloContract.md)

#### Parameters

##### contract

`C`

#### Returns

`void`
