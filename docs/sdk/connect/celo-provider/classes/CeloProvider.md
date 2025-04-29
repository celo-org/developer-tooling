[**@celo/connect**](../../README.md)

***

[@celo/connect](../../modules.md) / [celo-provider](../README.md) / CeloProvider

# Class: CeloProvider

Defined in: [packages/sdk/connect/src/celo-provider.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L48)

## Implements

- [`Provider`](../../types/interfaces/Provider.md)

## Constructors

### Constructor

> **new CeloProvider**(`existingProvider`, `connection`): `CeloProvider`

Defined in: [packages/sdk/connect/src/celo-provider.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L56)

#### Parameters

##### existingProvider

[`Provider`](../../types/interfaces/Provider.md)

##### connection

[`Connection`](../../connection/classes/Connection.md)

#### Returns

`CeloProvider`

## Properties

### connection

> `readonly` **connection**: [`Connection`](../../connection/classes/Connection.md)

Defined in: [packages/sdk/connect/src/celo-provider.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L56)

***

### existingProvider

> `readonly` **existingProvider**: [`Provider`](../../types/interfaces/Provider.md)

Defined in: [packages/sdk/connect/src/celo-provider.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L56)

## Accessors

### connected

#### Get Signature

> **get** **connected**(): `any`

Defined in: [packages/sdk/connect/src/celo-provider.ts:287](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L287)

##### Returns

`any`

## Methods

### addAccount()

> **addAccount**(`privateKey`): `void`

Defined in: [packages/sdk/connect/src/celo-provider.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L61)

#### Parameters

##### privateKey

`string`

#### Returns

`void`

***

### getAccounts()

> **getAccounts**(): `Promise`\<`string`[]\>

Defined in: [packages/sdk/connect/src/celo-provider.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L71)

#### Returns

`Promise`\<`string`[]\>

***

### isLocalAccount()

> **isLocalAccount**(`address?`): `boolean`

Defined in: [packages/sdk/connect/src/celo-provider.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L75)

#### Parameters

##### address?

`string`

#### Returns

`boolean`

***

### removeAccount()

> **removeAccount**(`address`): `void`

Defined in: [packages/sdk/connect/src/celo-provider.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L66)

#### Parameters

##### address

`string`

#### Returns

`void`

***

### send()

> **send**(`payload`, `callback`): `void`

Defined in: [packages/sdk/connect/src/celo-provider.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L82)

Send method as expected by web3.js

#### Parameters

##### payload

[`JsonRpcPayload`](../../types/interfaces/JsonRpcPayload.md)

##### callback

[`Callback`](../../types/type-aliases/Callback.md)\<[`JsonRpcResponse`](../../types/interfaces/JsonRpcResponse.md)\>

#### Returns

`void`

#### Implementation of

[`Provider`](../../types/interfaces/Provider.md).[`send`](../../types/interfaces/Provider.md#send)

***

### stop()

> **stop**(): `void`

Defined in: [packages/sdk/connect/src/celo-provider.ts:161](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L161)

#### Returns

`void`

***

### supportsSubscriptions()

> **supportsSubscriptions**(): `any`

Defined in: [packages/sdk/connect/src/celo-provider.ts:291](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L291)

#### Returns

`any`

***

### toEip1193Provider()

> **toEip1193Provider**(): [`Eip1193Provider`](../../types/interfaces/Eip1193Provider.md)

Defined in: [packages/sdk/connect/src/celo-provider.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/celo-provider.ts#L173)

#### Returns

[`Eip1193Provider`](../../types/interfaces/Eip1193Provider.md)
