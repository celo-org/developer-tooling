[@celo/utils](../README.md) / future

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

packages/sdk/base/lib/future.d.ts:19

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

packages/sdk/base/lib/future.d.ts:17
