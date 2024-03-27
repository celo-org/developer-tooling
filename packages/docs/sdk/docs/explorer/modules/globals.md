[@celo/explorer](../README.md) / globals

# Module: globals

## Table of contents

### Functions

- [fetchMock](globals.md#fetchmock)

## Functions

### fetchMock

▸ **fetchMock**(`input?`, `init?`): `Promise`\<`Response`\>

Also callable as fetch(). Use `typeof fetch` in your code to define
a field that accepts both `fetch()` and a fetch-mock sandbox.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input?` | `string` \| `Request` |
| `init?` | `RequestInit` |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[packages/sdk/explorer/src/globals.d.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/globals.d.ts#L5)
