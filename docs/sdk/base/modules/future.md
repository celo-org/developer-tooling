[@celo/base](../README.md) / future

# Module: future

## Table of contents

### Classes

- [Future](../classes/future.Future.md)

### Functions

- [pipeToFuture](future.md#pipetofuture)
- [toFuture](future.md#tofuture)

## Functions

### pipeToFuture

▸ **pipeToFuture**\<`A`\>(`p`, `future`): [`Future`](../classes/future.Future.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Promise`\<`A`\> |
| `future` | [`Future`](../classes/future.Future.md)\<`A`\> |

#### Returns

[`Future`](../classes/future.Future.md)\<`A`\>

#### Defined in

[packages/sdk/base/src/future.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L51)

___

### toFuture

▸ **toFuture**\<`A`\>(`p`): [`Future`](../classes/future.Future.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Promise`\<`A`\> |

#### Returns

[`Future`](../classes/future.Future.md)\<`A`\>

#### Defined in

[packages/sdk/base/src/future.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/future.ts#L46)
