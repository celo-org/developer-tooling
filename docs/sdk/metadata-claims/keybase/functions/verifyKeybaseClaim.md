[**@celo/metadata-claims**](../../README.md)

***

[@celo/metadata-claims](../../README.md) / [keybase](../README.md) / verifyKeybaseClaim

# Function: verifyKeybaseClaim()

> **verifyKeybaseClaim**(`accountsInfoGetters`, `claim`, `signer`): `Promise`\<`undefined` \| `string`\>

Defined in: [packages/sdk/metadata-claims/src/keybase.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/keybase.ts#L25)

## Parameters

### accountsInfoGetters

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

### claim

#### timestamp

`number` = `TimestampType`

#### type

[`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase) = `...`

#### username

`string` = `t.string`

### signer

`string`

## Returns

`Promise`\<`undefined` \| `string`\>

a human readable string with claims (non)verifiability or undefined

## Remarks

If verification encounters an error, returns the error message as a string
otherwise returns undefined when successful
