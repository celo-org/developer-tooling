[@celo/connect](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / PromiEvent

# Interface: PromiEvent\<T\>

[index](../modules/index.md).PromiEvent

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Promise`\<`T`\>

  ↳ **`PromiEvent`**

## Table of contents

### Properties

- [[toStringTag]](index.PromiEvent.md#[tostringtag])

### Methods

- [catch](index.PromiEvent.md#catch)
- [finally](index.PromiEvent.md#finally)
- [on](index.PromiEvent.md#on)
- [once](index.PromiEvent.md#once)
- [then](index.PromiEvent.md#then)

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

Promise.[toStringTag]

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:176

## Methods

### catch

▸ **catch**\<`TResult`\>(`onrejected?`): `Promise`\<`T` \| `TResult`\>

Attaches a callback for only the rejection of the Promise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onrejected?` | ``null`` \| (`reason`: `any`) => `TResult` \| `PromiseLike`\<`TResult`\> | The callback to execute when the Promise is rejected. |

#### Returns

`Promise`\<`T` \| `TResult`\>

A Promise for the completion of the callback.

#### Inherited from

Promise.catch

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1556

___

### finally

▸ **finally**(`onfinally?`): `Promise`\<`T`\>

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onfinally?` | ``null`` \| () => `void` | The callback to execute when the Promise is settled (fulfilled or rejected). |

#### Returns

`Promise`\<`T`\>

A Promise for the completion of the callback.

#### Inherited from

Promise.finally

#### Defined in

node_modules/typescript/lib/lib.es2018.promise.d.ts:29

___

### on

▸ **on**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"sending"`` |
| `handler` | (`payload`: `object`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:94

▸ **on**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"sent"`` |
| `handler` | (`payload`: `object`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:99

▸ **on**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"transactionHash"`` |
| `handler` | (`receipt`: `string`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:104

▸ **on**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"receipt"`` |
| `handler` | (`receipt`: `TransactionReceipt`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:109

▸ **on**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"confirmation"`` |
| `handler` | (`confNumber`: `number`, `receipt`: `TransactionReceipt`, `latestBlockHash?`: `string`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:114

▸ **on**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"error"`` |
| `handler` | (`error`: `Error`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:119

▸ **on**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"error"`` \| ``"sending"`` \| ``"transactionHash"`` \| ``"sent"`` \| ``"receipt"`` \| ``"confirmation"`` |
| `handler` | (`error`: `string` \| `object` \| `TransactionReceipt` \| `Error`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:121

___

### once

▸ **once**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"sending"`` |
| `handler` | (`payload`: `object`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:62

▸ **once**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"sent"`` |
| `handler` | (`payload`: `object`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:67

▸ **once**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"transactionHash"`` |
| `handler` | (`transactionHash`: `string`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:72

▸ **once**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"receipt"`` |
| `handler` | (`receipt`: `TransactionReceipt`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:77

▸ **once**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"confirmation"`` |
| `handler` | (`confirmationNumber`: `number`, `receipt`: `TransactionReceipt`, `latestBlockHash?`: `string`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:82

▸ **once**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"error"`` |
| `handler` | (`error`: `Error`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:87

▸ **once**(`type`, `handler`): [`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"error"`` \| ``"sending"`` \| ``"transactionHash"`` \| ``"sent"`` \| ``"receipt"`` \| ``"confirmation"`` |
| `handler` | (`error`: `string` \| `object` \| `TransactionReceipt` \| `Error`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<`T`\>

#### Defined in

node_modules/web3-core/types/index.d.ts:89

___

### then

▸ **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`\<`TResult1` \| `TResult2`\>

Attaches callbacks for the resolution and/or rejection of the Promise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult1` | `T` |
| `TResult2` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onfulfilled?` | ``null`` \| (`value`: `T`) => `TResult1` \| `PromiseLike`\<`TResult1`\> | The callback to execute when the Promise is resolved. |
| `onrejected?` | ``null`` \| (`reason`: `any`) => `TResult2` \| `PromiseLike`\<`TResult2`\> | The callback to execute when the Promise is rejected. |

#### Returns

`Promise`\<`TResult1` \| `TResult2`\>

A Promise for the completion of which ever callback is executed.

#### Inherited from

Promise.then

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1549
