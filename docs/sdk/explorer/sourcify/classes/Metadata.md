[**@celo/explorer**](../../README.md)

***

[@celo/explorer](../../README.md) / [sourcify](../README.md) / Metadata

# Class: Metadata

Defined in: [sourcify.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L64)

Wrapper class for a metadata.json response from sourcify.
Because the response's true structure is unknown this wrapper implements
light runtime verification.

## Constructors

### Constructor

> **new Metadata**(`connection`, `address`, `response`): `Metadata`

Defined in: [sourcify.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L73)

#### Parameters

##### connection

`Connection`

##### address

`string`

##### response

`any`

#### Returns

`Metadata`

## Properties

### abi

> **abi**: `null` \| `AbiItem`[] = `null`

Defined in: [sourcify.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L65)

***

### contractName

> **contractName**: `null` \| `string` = `null`

Defined in: [sourcify.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L66)

***

### fnMapping

> **fnMapping**: `Map`\<`string`, `ABIDefinition`\>

Defined in: [sourcify.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L67)

## Accessors

### response

#### Set Signature

> **set** **response**(`value`): `void`

Defined in: [sourcify.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L83)

##### Parameters

###### value

[`MetadataResponse`](../interfaces/MetadataResponse.md)

##### Returns

`void`

## Methods

### abiForMethod()

> **abiForMethod**(`query`): `AbiItem`[]

Defined in: [sourcify.ts:152](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L152)

Find the AbiItem for methods that match the provided method name.
The function can return more than one AbiItem if the query string
provided doesn't contain arguments as there can be multiple
definitions with different arguments.

#### Parameters

##### query

`string`

#### Returns

`AbiItem`[]

and array of AbiItems matching the query

***

### abiForSelector()

> **abiForSelector**(`selector`): `null` \| `AbiItem`

Defined in: [sourcify.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L136)

Find the AbiItem for a given function selector

#### Parameters

##### selector

`string`

the 4-byte selector of the function call

#### Returns

`null` \| `AbiItem`

an AbiItem if found or null

***

### toContractMapping()

> **toContractMapping**(): [`ContractMapping`](../../base/interfaces/ContractMapping.md)

Defined in: [sourcify.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L119)

Turn the ABI into a mapping of function selectors to ABI items.

#### Returns

[`ContractMapping`](../../base/interfaces/ContractMapping.md)
