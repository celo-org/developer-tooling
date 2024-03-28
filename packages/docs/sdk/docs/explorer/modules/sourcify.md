[@celo/explorer](../README.md) / sourcify

# Module: sourcify

## Table of contents

### Classes

- [Metadata](../classes/sourcify.Metadata.md)

### Interfaces

- [MetadataResponse](../interfaces/sourcify.MetadataResponse.md)

### Functions

- [fetchMetadata](sourcify.md#fetchmetadata)
- [tryGetProxyImplementation](sourcify.md#trygetproxyimplementation)

## Functions

### fetchMetadata

▸ **fetchMetadata**(`connection`, `contract`, `strict?`): `Promise`\<[`Metadata`](../classes/sourcify.Metadata.md) \| ``null``\>

Fetch the sourcify or celoscan response and instantiate a Metadata wrapper class around it.
Try a full_match but fallback to partial_match when not strict. (only valid for sourcify)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `connection` | `Connection` | `undefined` | @celo/connect instance |
| `contract` | `string` | `undefined` | the address of the contract to query |
| `strict` | `boolean` | `false` | only allow full matches https://docs.sourcify.dev/docs/full-vs-partial-match/ |

#### Returns

`Promise`\<[`Metadata`](../classes/sourcify.Metadata.md) \| ``null``\>

Metadata or null

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:185](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L185)

___

### tryGetProxyImplementation

▸ **tryGetProxyImplementation**(`connection`, `contract`): `Promise`\<`Address` \| `undefined`\>

Use heuristics to determine if the contract can be a proxy
and extract the implementation.
Available scenarios:
- _getImplementation() exists
- getImplementation() exists
- _implementation() exists
- implementation() exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `connection` | `Connection` | @celo/connect instance |
| `contract` | `string` | the address of the contract to query |

#### Returns

`Promise`\<`Address` \| `undefined`\>

the implementation address or null

#### Defined in

[packages/sdk/explorer/src/sourcify.ts:300](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L300)
