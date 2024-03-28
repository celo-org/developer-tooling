[@celo/explorer](../README.md) / [sourcify](../modules/sourcify.md) / MetadataResponse

# Interface: MetadataResponse

[sourcify](../modules/sourcify.md).MetadataResponse

MetadataResponse interface for the `metadata.json` file that the sourcify repo returns.
All fields are optional because we don't really _know_ what we get from the API, thus
we need to enforce the structure at runtime.

## Table of contents

### Properties

- [output](sourcify.MetadataResponse.md#output)
- [settings](sourcify.MetadataResponse.md#settings)

## Properties

### output

• `Optional` **output**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `abi?` | `AbiItem`[] |

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L51)

___

### settings

• `Optional` **settings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compilationTarget?` | `Record`\<`string`, `string`\> |
| `implementation?` | `string` |
| `name?` | `string` |

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L54)
