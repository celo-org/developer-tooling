[**@celo/connect v7.0.0-beta.0**](../README.md)

***

[@celo/connect](../globals.md) / HttpRpcCaller

# Class: HttpRpcCaller

Defined in: [packages/sdk/connect/src/utils/rpc-caller.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L71)

## Implements

- [`RpcCaller`](../interfaces/RpcCaller.md)

## Constructors

### Constructor

> **new HttpRpcCaller**(`httpProvider`, `jsonrpcVersion`): `HttpRpcCaller`

Defined in: [packages/sdk/connect/src/utils/rpc-caller.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L72)

#### Parameters

##### httpProvider

[`HttpProvider`](../interfaces/HttpProvider.md)

##### jsonrpcVersion

`string` = `'2.0'`

#### Returns

`HttpRpcCaller`

## Properties

### httpProvider

> `readonly` **httpProvider**: [`HttpProvider`](../interfaces/HttpProvider.md)

Defined in: [packages/sdk/connect/src/utils/rpc-caller.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L72)

***

### jsonrpcVersion

> `readonly` **jsonrpcVersion**: `string` = `'2.0'`

Defined in: [packages/sdk/connect/src/utils/rpc-caller.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L72)

## Methods

### call()

> **call**(`method`, `params`): `Promise`\<[`JsonRpcResponse`](../interfaces/JsonRpcResponse.md)\>

Defined in: [packages/sdk/connect/src/utils/rpc-caller.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L74)

#### Parameters

##### method

`string`

##### params

`any`[]

#### Returns

`Promise`\<[`JsonRpcResponse`](../interfaces/JsonRpcResponse.md)\>

#### Implementation of

[`RpcCaller`](../interfaces/RpcCaller.md).[`call`](../interfaces/RpcCaller.md#call)

***

### send()

> **send**(`payload`, `callback`): `void`

Defined in: [packages/sdk/connect/src/utils/rpc-caller.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/rpc-caller.ts#L92)

#### Parameters

##### payload

[`JsonRpcPayload`](../interfaces/JsonRpcPayload.md)

##### callback

(`error`, `result?`) => `void`

#### Returns

`void`

#### Implementation of

[`RpcCaller`](../interfaces/RpcCaller.md).[`send`](../interfaces/RpcCaller.md#send)
