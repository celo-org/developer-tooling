[@celo/connect](../README.md) / [Exports](../modules.md) / [utils/rpc-caller](../modules/utils_rpc_caller.md) / RpcCaller

# Interface: RpcCaller

[utils/rpc-caller](../modules/utils_rpc_caller.md).RpcCaller

## Implemented by

- [`HttpRpcCaller`](../classes/utils_rpc_caller.HttpRpcCaller.md)

## Table of contents

### Properties

- [call](utils_rpc_caller.RpcCaller.md#call)
- [send](utils_rpc_caller.RpcCaller.md#send)

## Properties

### call

• **call**: (`method`: `string`, `params`: `any`[]) => `Promise`\<[`JsonRpcResponse`](types.JsonRpcResponse.md)\>

#### Type declaration

▸ (`method`, `params`): `Promise`\<[`JsonRpcResponse`](types.JsonRpcResponse.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params` | `any`[] |

##### Returns

`Promise`\<[`JsonRpcResponse`](types.JsonRpcResponse.md)\>

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L64)

___

### send

• **send**: (`payload`: [`JsonRpcPayload`](types.JsonRpcPayload.md), `callback`: (`error`: ``null`` \| [`Error`](types.Error.md), `result?`: [`JsonRpcResponse`](types.JsonRpcResponse.md)) => `void`) => `void`

#### Type declaration

▸ (`payload`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`JsonRpcPayload`](types.JsonRpcPayload.md) |
| `callback` | (`error`: ``null`` \| [`Error`](types.Error.md), `result?`: [`JsonRpcResponse`](types.JsonRpcResponse.md)) => `void` |

##### Returns

`void`

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L65)
