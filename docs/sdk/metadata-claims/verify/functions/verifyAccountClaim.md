[**@celo/metadata-claims v1.0.4-beta.0**](../../README.md)

***

[@celo/metadata-claims](../../README.md) / [verify](../README.md) / verifyAccountClaim

# Function: verifyAccountClaim()

> **verifyAccountClaim**(`accountMeta`, `claim`, `address`, `tries`): `Promise`\<`undefined` \| `string`\>

Defined in: [packages/sdk/metadata-claims/src/verify.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/verify.ts#L37)

## Parameters

### accountMeta

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

### claim

#### address

`string` = `AddressType`

#### publicKey

`undefined` \| `string` = `...`

#### timestamp

`number` = `TimestampType`

#### type

[`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account) = `...`

### address

`string`

### tries

`number` = `3`

## Returns

`Promise`\<`undefined` \| `string`\>
