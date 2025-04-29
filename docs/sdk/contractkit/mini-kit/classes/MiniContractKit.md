[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [mini-kit](../README.md) / MiniContractKit

# Class: MiniContractKit

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L55)

MiniContractKit provides a core subset of [ContractKit](../variables/ContractKit.md)'s functionality

## Remarks

It is recommended to use this over ContractKit for dApps as it is lighter

## Param

– an instance of @celo/connect Connection

## Constructors

### Constructor

> **new MiniContractKit**(`connection`): `MiniContractKit`

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L63)

#### Parameters

##### connection

`Connection`

#### Returns

`MiniContractKit`

## Properties

### celoTokens

> `readonly` **celoTokens**: [`CeloTokens`](../../celo-tokens/classes/CeloTokens.md)

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L61)

helper for interacting with CELO & stable tokens

***

### connection

> `readonly` **connection**: `Connection`

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L63)

***

### contracts

> `readonly` **contracts**: [`MiniContractCache`](../../mini-contract-cache/classes/MiniContractCache.md)

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L59)

factory for subset of core contract's kit wrappers

***

### registry

> `readonly` **registry**: [`AddressRegistry`](../../address-registry/classes/AddressRegistry.md)

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L57)

core contract's address registry

## Methods

### getTotalBalance()

> **getTotalBalance**(`address`): `Promise`\<[`EachCeloToken`](../../celo-tokens/type-aliases/EachCeloToken.md)\<`BigNumber`\>\>

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L74)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<[`EachCeloToken`](../../celo-tokens/type-aliases/EachCeloToken.md)\<`BigNumber`\>\>

***

### getWallet()

> **getWallet**(): `undefined` \| `ReadOnlyWallet`

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:69](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L69)

#### Returns

`undefined` \| `ReadOnlyWallet`
