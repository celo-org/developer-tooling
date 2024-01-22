[@celo/connect](../README.md) / [Exports](../modules.md) / utils/rpc-caller

# Module: utils/rpc-caller

## Table of contents

### Classes

- [HttpRpcCaller](../classes/utils_rpc_caller.HttpRpcCaller.md)

### Interfaces

- [RpcCaller](../interfaces/utils_rpc_caller.RpcCaller.md)

### Functions

- [getRandomId](utils_rpc_caller.md#getrandomid)
- [rpcCallHandler](utils_rpc_caller.md#rpccallhandler)

## Functions

### getRandomId

▸ **getRandomId**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L36)

___

### rpcCallHandler

▸ **rpcCallHandler**(`payload`, `handler`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`JsonRpcPayload`](../interfaces/types.JsonRpcPayload.md) |
| `handler` | (`p`: [`JsonRpcPayload`](../interfaces/types.JsonRpcPayload.md)) => `Promise`\<`any`\> |
| `callback` | [`Callback`](types.md#callback)\<[`JsonRpcResponse`](../interfaces/types.JsonRpcResponse.md)\> |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/utils/rpc-caller.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L8)
