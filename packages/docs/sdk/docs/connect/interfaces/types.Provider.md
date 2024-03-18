[@celo/connect](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / Provider

# Interface: Provider

[types](../modules/types.md).Provider

## Implemented by

- [`CeloProvider`](../classes/celo_provider.CeloProvider.md)

## Table of contents

### Methods

- [send](types.Provider.md#send)

## Methods

### send

▸ **send**(`payload`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`JsonRpcPayload`](types.JsonRpcPayload.md) |
| `callback` | (`error`: ``null`` \| [`Error`](types.Error.md), `result?`: [`JsonRpcResponse`](types.JsonRpcResponse.md)) => `void` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/types.ts:155](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L155)
