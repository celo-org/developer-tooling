[**@celo/explorer**](../../README.md)

***

[@celo/explorer](../../README.md) / [sourcify](../README.md) / tryGetProxyImplementation

# Function: tryGetProxyImplementation()

> **tryGetProxyImplementation**(`connection`, `contract`): `Promise`\<`undefined` \| `string`\>

Defined in: [sourcify.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/sourcify.ts#L228)

Use heuristics to determine if the contract can be a proxy
and extract the implementation.
Available scenarios:
- _getImplementation() exists
- getImplementation() exists
- _implementation() exists
- implementation() exists

## Parameters

### connection

`Connection`

@celo/connect instance

### contract

`string`

the address of the contract to query

## Returns

`Promise`\<`undefined` \| `string`\>

the implementation address or null
