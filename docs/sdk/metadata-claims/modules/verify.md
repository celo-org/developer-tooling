[@celo/metadata-claims](../README.md) / verify

# Module: verify

## Table of contents

### Functions

- [verifyAccountClaim](verify.md#verifyaccountclaim)
- [verifyClaim](verify.md#verifyclaim)
- [verifyDomainRecord](verify.md#verifydomainrecord)

## Functions

### verifyAccountClaim

▸ **verifyAccountClaim**(`accountMeta`, `claim`, `address`, `tries?`): `Promise`\<`undefined` \| `string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountMeta` | [`AccountMetadataSignerGetters`](types.md#accountmetadatasignergetters) | `undefined` |
| `claim` | `Object` | `undefined` |
| `claim.address` | `string` | `AddressType` |
| `claim.publicKey` | `undefined` \| `string` | `undefined` |
| `claim.timestamp` | `number` | `TimestampType` |
| `claim.type` | [`ACCOUNT`](../enums/types.ClaimTypes.md#account) | `undefined` |
| `address` | `string` | `undefined` |
| `tries` | `number` | `3` |

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[packages/sdk/metadata-claims/src/verify.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/verify.ts#L37)

___

### verifyClaim

▸ **verifyClaim**(`accountMeta`, `claim`, `address`, `tries?`): `Promise`\<`undefined` \| `string`\>

Verifies a claim made by an account, i.e. whether a claim can be verified to be correct

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `accountMeta` | [`AccountMetadataSignerGetters`](types.md#accountmetadatasignergetters) | `undefined` | - |
| `claim` | [`Claim`](claim.md#claim) | `undefined` | The claim to verify |
| `address` | `string` | `undefined` | The address that is making the claim |
| `tries` | `number` | `3` | - |

#### Returns

`Promise`\<`undefined` \| `string`\>

If valid, returns undefined. If invalid or unable to verify, returns a string with the error

#### Defined in

[packages/sdk/metadata-claims/src/verify.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/verify.ts#L18)

___

### verifyDomainRecord

▸ **verifyDomainRecord**(`accountMeta`, `claim`, `address`, `dnsResolver?`): `Promise`\<`undefined` \| `string`\>

It verifies if a DNS domain includes in the TXT records an entry with name
`celo-site-verification` and a valid signature in base64

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountMeta` | [`AccountMetadataSignerGetters`](types.md#accountmetadatasignergetters) | `undefined` |
| `claim` | `Object` | `undefined` |
| `claim.domain` | `string` | `t.string` |
| `claim.timestamp` | `number` | `TimestampType` |
| `claim.type` | [`DOMAIN`](../enums/types.ClaimTypes.md#domain) | `undefined` |
| `address` | `string` | `undefined` |
| `dnsResolver` | `dnsResolverFunction` | `undefined` |

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[packages/sdk/metadata-claims/src/verify.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/verify.ts#L76)
