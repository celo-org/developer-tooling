[**@celo/connect v7.0.0-beta.0**](../README.md)

***

[@celo/connect](../globals.md) / AbiCoder

# Interface: AbiCoder

Defined in: [packages/sdk/connect/src/abi-types.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L54)

**`Internal`**

## Methods

### decodeLog()

> **decodeLog**(`inputs`, `hexString`, `topics`): [`EventLog`](EventLog.md)

Defined in: [packages/sdk/connect/src/abi-types.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L55)

#### Parameters

##### inputs

[`AbiInput`](AbiInput.md)[]

##### hexString

`string`

##### topics

`string`[]

#### Returns

[`EventLog`](EventLog.md)

***

### decodeParameter()

> **decodeParameter**(`type`, `hex`): `any`

Defined in: [packages/sdk/connect/src/abi-types.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L64)

#### Parameters

##### type

`string`

##### hex

`string`

#### Returns

`any`

***

### decodeParameters()

#### Call Signature

> **decodeParameters**(`types`, `hex`): [`DecodedParamsArray`](DecodedParamsArray.md)

Defined in: [packages/sdk/connect/src/abi-types.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L66)

##### Parameters

###### types

`string`[]

###### hex

`string`

##### Returns

[`DecodedParamsArray`](DecodedParamsArray.md)

#### Call Signature

> **decodeParameters**(`types`, `hex`): [`DecodedParamsObject`](DecodedParamsObject.md)

Defined in: [packages/sdk/connect/src/abi-types.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L67)

##### Parameters

###### types

[`AbiInput`](AbiInput.md)[]

###### hex

`string`

##### Returns

[`DecodedParamsObject`](DecodedParamsObject.md)

***

### encodeEventSignature()

> **encodeEventSignature**(`name`): `string`

Defined in: [packages/sdk/connect/src/abi-types.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L60)

#### Parameters

##### name

`string` | `object`

#### Returns

`string`

***

### encodeFunctionCall()

> **encodeFunctionCall**(`jsonInterface`, `parameters`): `string`

Defined in: [packages/sdk/connect/src/abi-types.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L61)

#### Parameters

##### jsonInterface

`object`

##### parameters

`any`[]

#### Returns

`string`

***

### encodeFunctionSignature()

> **encodeFunctionSignature**(`name`): `string`

Defined in: [packages/sdk/connect/src/abi-types.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L62)

#### Parameters

##### name

`string` | `object`

#### Returns

`string`

***

### encodeParameter()

> **encodeParameter**(`type`, `parameter`): `string`

Defined in: [packages/sdk/connect/src/abi-types.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L57)

#### Parameters

##### type

`string`

##### parameter

`any`

#### Returns

`string`

***

### encodeParameters()

> **encodeParameters**(`types`, `paramaters`): `string`

Defined in: [packages/sdk/connect/src/abi-types.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/abi-types.ts#L58)

#### Parameters

##### types

`string`[]

##### paramaters

`any`[]

#### Returns

`string`
