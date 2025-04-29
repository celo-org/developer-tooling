[**@celo/explorer**](../../README.md)

***

[@celo/explorer](../../README.md) / [sourcify](../README.md) / MetadataResponse

# Interface: MetadataResponse

Defined in: [sourcify.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L50)

MetadataResponse interface for the `metadata.json` file that the sourcify repo returns.
All fields are optional because we don't really _know_ what we get from the API, thus
we need to enforce the structure at runtime.

## Properties

### output?

> `optional` **output**: `object`

Defined in: [sourcify.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L51)

#### abi?

> `optional` **abi**: `AbiItem`[]

***

### settings?

> `optional` **settings**: `object`

Defined in: [sourcify.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L54)

#### compilationTarget?

> `optional` **compilationTarget**: `Record`\<`string`, `string`\>
