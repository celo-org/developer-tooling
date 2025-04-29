[**@celo/metadata-claims**](../../README.md)

***

[@celo/metadata-claims](../../README.md) / [verify](../README.md) / verifyDomainRecord

# Function: verifyDomainRecord()

> **verifyDomainRecord**(`accountMeta`, `claim`, `address`, `dnsResolver`): `Promise`\<`undefined` \| `string`\>

Defined in: [packages/sdk/metadata-claims/src/verify.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/verify.ts#L76)

It verifies if a DNS domain includes in the TXT records an entry with name
`celo-site-verification` and a valid signature in base64

## Parameters

### accountMeta

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

### claim

#### domain

`string` = `t.string`

#### timestamp

`number` = `TimestampType`

#### type

[`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain) = `...`

### address

`string`

### dnsResolver

`dnsResolverFunction` = `...`

## Returns

`Promise`\<`undefined` \| `string`\>
