[**@celo/connect v7.0.0**](../README.md)

***

[@celo/connect](../globals.md) / PromiEvent

# Interface: PromiEvent\<T\>

Defined in: node\_modules/web3-core/types/index.d.ts:61

## Extends

- `Promise`\<`T`\>

## Type Parameters

### T

`T`

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

Defined in: node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:176

#### Inherited from

`Promise.[toStringTag]`

## Methods

### catch()

> **catch**\<`TResult`\>(`onrejected?`): `Promise`\<`T` \| `TResult`\>

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1556

Attaches a callback for only the rejection of the Promise.

#### Type Parameters

##### TResult

`TResult` = `never`

#### Parameters

##### onrejected?

The callback to execute when the Promise is rejected.

`null` | (`reason`) => `TResult` \| `PromiseLike`\<`TResult`\>

#### Returns

`Promise`\<`T` \| `TResult`\>

A Promise for the completion of the callback.

#### Inherited from

`Promise.catch`

***

### finally()

> **finally**(`onfinally?`): `Promise`\<`T`\>

Defined in: node\_modules/typescript/lib/lib.es2018.promise.d.ts:29

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

#### Parameters

##### onfinally?

The callback to execute when the Promise is settled (fulfilled or rejected).

`null` | () => `void`

#### Returns

`Promise`\<`T`\>

A Promise for the completion of the callback.

#### Inherited from

`Promise.finally`

***

### on()

#### Call Signature

> **on**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:94

##### Parameters

###### type

`"sending"`

###### handler

(`payload`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **on**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:99

##### Parameters

###### type

`"sent"`

###### handler

(`payload`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **on**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:104

##### Parameters

###### type

`"transactionHash"`

###### handler

(`receipt`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **on**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:109

##### Parameters

###### type

`"receipt"`

###### handler

(`receipt`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **on**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:114

##### Parameters

###### type

`"confirmation"`

###### handler

(`confNumber`, `receipt`, `latestBlockHash?`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **on**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:119

##### Parameters

###### type

`"error"`

###### handler

(`error`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **on**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:121

##### Parameters

###### type

`"error"` | `"sending"` | `"transactionHash"` | `"sent"` | `"receipt"` | `"confirmation"`

###### handler

(`error`) => `void`

##### Returns

`PromiEvent`\<`T`\>

***

### once()

#### Call Signature

> **once**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:62

##### Parameters

###### type

`"sending"`

###### handler

(`payload`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **once**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:67

##### Parameters

###### type

`"sent"`

###### handler

(`payload`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **once**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:72

##### Parameters

###### type

`"transactionHash"`

###### handler

(`transactionHash`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **once**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:77

##### Parameters

###### type

`"receipt"`

###### handler

(`receipt`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **once**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:82

##### Parameters

###### type

`"confirmation"`

###### handler

(`confirmationNumber`, `receipt`, `latestBlockHash?`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **once**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:87

##### Parameters

###### type

`"error"`

###### handler

(`error`) => `void`

##### Returns

`PromiEvent`\<`T`\>

#### Call Signature

> **once**(`type`, `handler`): `PromiEvent`\<`T`\>

Defined in: node\_modules/web3-core/types/index.d.ts:89

##### Parameters

###### type

`"error"` | `"sending"` | `"transactionHash"` | `"sent"` | `"receipt"` | `"confirmation"`

###### handler

(`error`) => `void`

##### Returns

`PromiEvent`\<`T`\>

***

### then()

> **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`\<`TResult1` \| `TResult2`\>

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1549

Attaches callbacks for the resolution and/or rejection of the Promise.

#### Type Parameters

##### TResult1

`TResult1` = `T`

##### TResult2

`TResult2` = `never`

#### Parameters

##### onfulfilled?

The callback to execute when the Promise is resolved.

`null` | (`value`) => `TResult1` \| `PromiseLike`\<`TResult1`\>

##### onrejected?

The callback to execute when the Promise is rejected.

`null` | (`reason`) => `TResult2` \| `PromiseLike`\<`TResult2`\>

#### Returns

`Promise`\<`TResult1` \| `TResult2`\>

A Promise for the completion of which ever callback is executed.

#### Inherited from

`Promise.then`
