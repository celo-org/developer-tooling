[@celo/contractkit](../README.md) / [Exports](../modules.md) / identity/claims/verify

# Module: identity/claims/verify

## Table of contents

### Functions

- [verifyAccountClaim](identity_claims_verify.md#verifyaccountclaim)
- [verifyClaim](identity_claims_verify.md#verifyclaim)
- [verifyDomainRecord](identity_claims_verify.md#verifydomainrecord)

## Functions

### verifyAccountClaim

▸ **verifyAccountClaim**(`kit`, `claim`, `address`, `tries?`): `Promise`\<`undefined` \| `string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `kit` | [`ContractKit`](../classes/kit.ContractKit.md) | `undefined` |
| `claim` | `Object` | `undefined` |
| `claim.address` | `string` | `AddressType` |
| `claim.publicKey` | `undefined` \| `string` | `undefined` |
| `claim.timestamp` | `number` | `TimestampType` |
| `claim.type` | [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account) | `undefined` |
| `address` | `string` | `undefined` |
| `tries` | `number` | `3` |

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/verify.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/verify.ts#L33)

___

### verifyClaim

▸ **verifyClaim**(`kit`, `claim`, `address`, `tries?`): `Promise`\<`undefined` \| `string`\>

Verifies a claim made by an account, i.e. whether a claim can be verified to be correct

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `kit` | [`ContractKit`](../classes/kit.ContractKit.md) | `undefined` | ContractKit object |
| `claim` | [`Claim`](identity_claims_claim.md#claim) | `undefined` | The claim to verify |
| `address` | `string` | `undefined` | The address that is making the claim |
| `tries` | `number` | `3` | - |

#### Returns

`Promise`\<`undefined` \| `string`\>

If valid, returns undefined. If invalid or unable to verify, returns a string with the error

#### Defined in

[packages/sdk/contractkit/src/identity/claims/verify.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/verify.ts#L19)

___

### verifyDomainRecord

▸ **verifyDomainRecord**(`kit`, `claim`, `address`, `dnsResolver?`): `Promise`\<`undefined` \| `string`\>

It verifies if a DNS domain includes in the TXT records an entry with name
`celo-site-verification` and a valid signature in base64

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `kit` | [`ContractKit`](../classes/kit.ContractKit.md) | `undefined` |
| `claim` | `Object` | `undefined` |
| `claim.domain` | `string` | `t.string` |
| `claim.timestamp` | `number` | `TimestampType` |
| `claim.type` | [`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain) | `undefined` |
| `address` | `string` | `undefined` |
| `dnsResolver` | `dnsResolverFunction` | `undefined` |

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/verify.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/verify.ts#L76)
