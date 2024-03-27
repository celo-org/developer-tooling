[@celo/explorer](../README.md) / [sourcify](../modules/sourcify.md) / Metadata

# Class: Metadata

[sourcify](../modules/sourcify.md).Metadata

Wrapper class for a metadata.json response from sourcify.
Because the response's true structure is unknown this wrapper implements
light runtime verification.

## Table of contents

### Constructors

- [constructor](sourcify.Metadata.md#constructor)

### Properties

- [abi](sourcify.Metadata.md#abi)
- [contractName](sourcify.Metadata.md#contractname)
- [fnMapping](sourcify.Metadata.md#fnmapping)
- [implementationAddress](sourcify.Metadata.md#implementationaddress)

### Accessors

- [response](sourcify.Metadata.md#response)

### Methods

- [abiForMethod](sourcify.Metadata.md#abiformethod)
- [abiForSelector](sourcify.Metadata.md#abiforselector)
- [toContractMapping](sourcify.Metadata.md#tocontractmapping)

## Constructors

### constructor

• **new Metadata**(`connection`, `address`, `response`): [`Metadata`](sourcify.Metadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `address` | `string` |
| `response` | [`MetadataResponse`](../interfaces/sourcify.MetadataResponse.md) |

#### Returns

[`Metadata`](sourcify.Metadata.md)

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L76)

## Properties

### abi

• **abi**: ``null`` \| `AbiItem`[] = `null`

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L67)

___

### contractName

• **contractName**: ``null`` \| `string` = `null`

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L68)

___

### fnMapping

• **fnMapping**: `Map`\<`string`, `ABIDefinition`\>

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L70)

___

### implementationAddress

• **implementationAddress**: ``null`` \| `string` = `null`

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:69](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L69)

## Accessors

### response

• `set` **response**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`MetadataResponse`](../interfaces/sourcify.MetadataResponse.md) |

#### Returns

`void`

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L88)

## Methods

### abiForMethod

▸ **abiForMethod**(`query`): `AbiItem`[]

Find the AbiItem for methods that match the provided method name.
The function can return more than one AbiItem if the query string
provided doesn't contain arguments as there can be multiple
definitions with different arguments.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

`AbiItem`[]

and array of AbiItems matching the query

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L158)

___

### abiForSelector

▸ **abiForSelector**(`selector`): ``null`` \| `AbiItem`

Find the AbiItem for a given function selector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `string` | the 4-byte selector of the function call |

#### Returns

``null`` \| `AbiItem`

an AbiItem if found or null

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L142)

___

### toContractMapping

▸ **toContractMapping**(): [`ContractMapping`](../interfaces/base.ContractMapping.md)

Turn the ABI into a mapping of function selectors to ABI items.

#### Returns

[`ContractMapping`](../interfaces/base.ContractMapping.md)

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:125](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L125)
