[**@celo/explorer**](../../README.md)

***

[@celo/explorer](../../README.md) / [sourcify](../README.md) / fetchMetadata

# Function: fetchMetadata()

> **fetchMetadata**(`connection`, `contract`, `strict`): `Promise`\<`null` \| [`Metadata`](../classes/Metadata.md)\>

Defined in: [sourcify.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L179)

Fetch the sourcify response and instantiate a Metadata wrapper class around it.
Try a full_match but fallback to partial_match when not strict.

## Parameters

### connection

`Connection`

@celo/connect instance

### contract

`string`

the address of the contract to query

### strict

`boolean` = `false`

only allow full matches https://docs.sourcify.dev/docs/full-vs-partial-match/

## Returns

`Promise`\<`null` \| [`Metadata`](../classes/Metadata.md)\>

Metadata or null
