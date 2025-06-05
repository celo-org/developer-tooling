[**@celo/metadata-claims v1.0.4-beta.0**](../../README.md)

***

[@celo/metadata-claims](../../README.md) / [verify](../README.md) / verifyClaim

# Function: verifyClaim()

> **verifyClaim**(`accountMeta`, `claim`, `address`, `tries`): `Promise`\<`undefined` \| `string`\>

Defined in: [packages/sdk/metadata-claims/src/verify.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/verify.ts#L18)

Verifies a claim made by an account, i.e. whether a claim can be verified to be correct

## Parameters

### accountMeta

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

AccountMetadataSignerGetters object

### claim

[`Claim`](../../claim/type-aliases/Claim.md)

The claim to verify

### address

`string`

The address that is making the claim

### tries

`number` = `3`

## Returns

`Promise`\<`undefined` \| `string`\>

If valid, returns undefined. If invalid or unable to verify, returns a string with the error
