[@celo/connect](../README.md) / [Exports](../modules.md) / [utils/rpc-caller](../modules/utils_rpc_caller.md) / HttpRpcCaller

# Class: HttpRpcCaller

[utils/rpc-caller](../modules/utils_rpc_caller.md).HttpRpcCaller

## Implements

- [`RpcCaller`](../interfaces/utils_rpc_caller.RpcCaller.md)

## Table of contents

### Constructors

- [constructor](utils_rpc_caller.HttpRpcCaller.md#constructor)

### Properties

- [httpProvider](utils_rpc_caller.HttpRpcCaller.md#httpprovider)
- [jsonrpcVersion](utils_rpc_caller.HttpRpcCaller.md#jsonrpcversion)

### Methods

- [call](utils_rpc_caller.HttpRpcCaller.md#call)
- [send](utils_rpc_caller.HttpRpcCaller.md#send)

## Constructors

### constructor

• **new HttpRpcCaller**(`httpProvider`, `jsonrpcVersion?`): [`HttpRpcCaller`](utils_rpc_caller.HttpRpcCaller.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `httpProvider` | [`HttpProvider`](../interfaces/types.HttpProvider.md) | `undefined` |
| `jsonrpcVersion` | `string` | `'2.0'` |

#### Returns

[`HttpRpcCaller`](utils_rpc_caller.HttpRpcCaller.md)

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L72)

## Properties

### httpProvider

• `Readonly` **httpProvider**: [`HttpProvider`](../interfaces/types.HttpProvider.md)

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L72)

___

### jsonrpcVersion

• `Readonly` **jsonrpcVersion**: `string` = `'2.0'`

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L72)

## Methods

### call

▸ **call**(`method`, `params`): `Promise`\<[`JsonRpcResponse`](../interfaces/types.JsonRpcResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params` | `any`[] |

#### Returns

`Promise`\<[`JsonRpcResponse`](../interfaces/types.JsonRpcResponse.md)\>

#### Implementation of

[RpcCaller](../interfaces/utils_rpc_caller.RpcCaller.md).[call](../interfaces/utils_rpc_caller.RpcCaller.md#call)

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L74)

___

### send

▸ **send**(`payload`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`JsonRpcPayload`](../interfaces/types.JsonRpcPayload.md) |
| `callback` | (`error`: ``null`` \| [`Error`](../interfaces/types.Error.md), `result?`: [`JsonRpcResponse`](../interfaces/types.JsonRpcResponse.md)) => `void` |

#### Returns

`void`

#### Implementation of

[RpcCaller](../interfaces/utils_rpc_caller.RpcCaller.md).[send](../interfaces/utils_rpc_caller.RpcCaller.md#send)

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L92)
