[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/BaseWrapper](../README.md) / BaseWrapper

# Class: `abstract` BaseWrapper\<T\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L29)

**`Internal`**

-- use its children

## Extended by

- [`AbstractFeeCurrencyWrapper`](../../AbstractFeeCurrencyWrapper/classes/AbstractFeeCurrencyWrapper.md)
- [`AccountsWrapper`](../../Accounts/classes/AccountsWrapper.md)
- [`AttestationsWrapper`](../../Attestations/classes/AttestationsWrapper.md)
- [`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md)
- [`EpochRewardsWrapper`](../../EpochRewards/classes/EpochRewardsWrapper.md)
- [`Erc20Wrapper`](../../Erc20Wrapper/classes/Erc20Wrapper.md)
- [`EscrowWrapper`](../../Escrow/classes/EscrowWrapper.md)
- [`FederatedAttestationsWrapper`](../../FederatedAttestations/classes/FederatedAttestationsWrapper.md)
- [`FeeHandlerWrapper`](../../FeeHandler/classes/FeeHandlerWrapper.md)
- [`FreezerWrapper`](../../Freezer/classes/FreezerWrapper.md)
- [`MultiSigWrapper`](../../MultiSig/classes/MultiSigWrapper.md)
- [`OdisPaymentsWrapper`](../../OdisPayments/classes/OdisPaymentsWrapper.md)
- [`ReserveWrapper`](../../Reserve/classes/ReserveWrapper.md)
- [`ScoreManagerWrapper`](../../ScoreManager/classes/ScoreManagerWrapper.md)
- [`SortedOraclesWrapper`](../../SortedOracles/classes/SortedOraclesWrapper.md)

## Type Parameters

### T

`T` *extends* `Contract`

## Constructors

### Constructor

> **new BaseWrapper**\<`T`\>(`connection`, `contract`): `BaseWrapper`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`T`

#### Returns

`BaseWrapper`\<`T`\>

## Properties

### events

> **events**: `T`\[`"events"`\]

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`T`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

***

### methodIds

> **methodIds**: `Record`\<keyof `T`\[`"methods"`\], `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

## Methods

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

keyof `T`\[`"events"`\]

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

***

### version()

> **version**(): `Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`T`\[`"methods"`\] *extends* `object` ? [`ContractVersion`](../../../versions/classes/ContractVersion.md) : `never`\>
