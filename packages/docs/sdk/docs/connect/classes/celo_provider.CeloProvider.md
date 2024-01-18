[@celo/connect](../README.md) / [Exports](../modules.md) / [celo-provider](../modules/celo_provider.md) / CeloProvider

# Class: CeloProvider

[celo-provider](../modules/celo_provider.md).CeloProvider

## Implements

- [`Provider`](../interfaces/types.Provider.md)

## Table of contents

### Constructors

- [constructor](celo_provider.CeloProvider.md#constructor)

### Properties

- [connection](celo_provider.CeloProvider.md#connection)
- [existingProvider](celo_provider.CeloProvider.md#existingprovider)

### Accessors

- [connected](celo_provider.CeloProvider.md#connected)

### Methods

- [addAccount](celo_provider.CeloProvider.md#addaccount)
- [getAccounts](celo_provider.CeloProvider.md#getaccounts)
- [isLocalAccount](celo_provider.CeloProvider.md#islocalaccount)
- [removeAccount](celo_provider.CeloProvider.md#removeaccount)
- [send](celo_provider.CeloProvider.md#send)
- [stop](celo_provider.CeloProvider.md#stop)
- [supportsSubscriptions](celo_provider.CeloProvider.md#supportssubscriptions)

## Constructors

### constructor

• **new CeloProvider**(`existingProvider`, `connection`): [`CeloProvider`](celo_provider.CeloProvider.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `existingProvider` | [`Provider`](../interfaces/types.Provider.md) |
| `connection` | [`Connection`](connection.Connection.md) |

#### Returns

[`CeloProvider`](celo_provider.CeloProvider.md)

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L53)

## Properties

### connection

• `Readonly` **connection**: [`Connection`](connection.Connection.md)

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L53)

___

### existingProvider

• `Readonly` **existingProvider**: [`Provider`](../interfaces/types.Provider.md)

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L53)

## Accessors

### connected

• `get` **connected**(): `any`

#### Returns

`any`

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:260](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L260)

## Methods

### addAccount

▸ **addAccount**(`privateKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L58)

___

### getAccounts

▸ **getAccounts**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L68)

___

### isLocalAccount

▸ **isLocalAccount**(`address?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address?` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L72)

___

### removeAccount

▸ **removeAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L63)

___

### send

▸ **send**(`payload`, `callback`): `void`

Send method as expected by web3.js

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`JsonRpcPayload`](../interfaces/types.JsonRpcPayload.md) |
| `callback` | [`Callback`](../modules/types.md#callback)\<[`JsonRpcResponse`](../interfaces/types.JsonRpcResponse.md)\> |

#### Returns

`void`

#### Implementation of

[Provider](../interfaces/types.Provider.md).[send](../interfaces/types.Provider.md#send)

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L79)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L158)

___

### supportsSubscriptions

▸ **supportsSubscriptions**(): `any`

#### Returns

`any`

#### Defined in

[packages/sdk/connect/src/celo-provider.ts:264](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L264)
