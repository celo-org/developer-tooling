[@celo/contractkit](../README.md) / [Exports](../modules.md) / [mini-kit](../modules/mini_kit.md) / MiniContractKit

# Class: MiniContractKit

[mini-kit](../modules/mini_kit.md).MiniContractKit

MiniContractKit provides a core subset of [ContractKit](../modules/mini_kit.md#contractkit)'s functionality

**`Remarks`**

It is recommended to use this over ContractKit for dApps as it is lighter

**`Param`**

– an instance of @celo/connect Connection

## Table of contents

### Constructors

- [constructor](mini_kit.MiniContractKit.md#constructor)

### Properties

- [celoTokens](mini_kit.MiniContractKit.md#celotokens)
- [connection](mini_kit.MiniContractKit.md#connection)
- [contracts](mini_kit.MiniContractKit.md#contracts)
- [registry](mini_kit.MiniContractKit.md#registry)

### Methods

- [getTotalBalance](mini_kit.MiniContractKit.md#gettotalbalance)
- [getWallet](mini_kit.MiniContractKit.md#getwallet)

## Constructors

### constructor

• **new MiniContractKit**(`connection`): [`MiniContractKit`](mini_kit.MiniContractKit.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |

#### Returns

[`MiniContractKit`](mini_kit.MiniContractKit.md)

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L63)

## Properties

### celoTokens

• `Readonly` **celoTokens**: [`CeloTokens`](celo_tokens.CeloTokens.md)

helper for interacting with CELO & stable tokens

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L61)

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L63)

___

### contracts

• `Readonly` **contracts**: [`MiniContractCache`](mini_contract_cache.MiniContractCache.md)

factory for subset of core contract's kit wrappers

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L59)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

core contract's address registry

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L57)

## Methods

### getTotalBalance

▸ **getTotalBalance**(`address`): `Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`BigNumber`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<[`EachCeloToken`](../modules/celo_tokens.md#eachcelotoken)\<`BigNumber`\>\>

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L74)

___

### getWallet

▸ **getWallet**(): `undefined` \| `ReadOnlyWallet`

#### Returns

`undefined` \| `ReadOnlyWallet`

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:69](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L69)
