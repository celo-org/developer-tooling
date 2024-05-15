[@celo/contractkit](../README.md) / [Exports](../modules.md) / identity/claims/claim

# Module: identity/claims/claim

## Table of contents

### Type Aliases

- [Claim](identity_claims_claim.md#claim)
- [ClaimPayload](identity_claims_claim.md#claimpayload)
- [DomainClaim](identity_claims_claim.md#domainclaim)
- [KeybaseClaim](identity_claims_claim.md#keybaseclaim)
- [NameClaim](identity_claims_claim.md#nameclaim)
- [StorageClaim](identity_claims_claim.md#storageclaim)

### Variables

- [ClaimType](identity_claims_claim.md#claimtype)
- [DOMAIN\_TXT\_HEADER](identity_claims_claim.md#domain_txt_header)
- [KeybaseClaimType](identity_claims_claim.md#keybaseclaimtype)
- [SignedClaimType](identity_claims_claim.md#signedclaimtype)

### Functions

- [createDomainClaim](identity_claims_claim.md#createdomainclaim)
- [createNameClaim](identity_claims_claim.md#createnameclaim)
- [createStorageClaim](identity_claims_claim.md#createstorageclaim)
- [hashOfClaim](identity_claims_claim.md#hashofclaim)
- [hashOfClaims](identity_claims_claim.md#hashofclaims)
- [isOfType](identity_claims_claim.md#isoftype)
- [serializeClaim](identity_claims_claim.md#serializeclaim)

## Type Aliases

### Claim

Ƭ **Claim**: [`DomainClaim`](identity_claims_claim.md#domainclaim) \| [`KeybaseClaim`](identity_claims_claim.md#keybaseclaim) \| [`NameClaim`](identity_claims_claim.md#nameclaim) \| [`AccountClaim`](identity_claims_account.md#accountclaim) \| [`StorageClaim`](identity_claims_claim.md#storageclaim)

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L50)

___

### ClaimPayload

Ƭ **ClaimPayload**\<`K`\>: `K` extends typeof [`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain) ? [`DomainClaim`](identity_claims_claim.md#domainclaim) : `K` extends typeof [`NAME`](../enums/identity_claims_types.ClaimTypes.md#name) ? [`NameClaim`](identity_claims_claim.md#nameclaim) : `K` extends typeof [`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase) ? [`KeybaseClaim`](identity_claims_claim.md#keybaseclaim) : `K` extends typeof [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account) ? [`AccountClaim`](identity_claims_account.md#accountclaim) : [`StorageClaim`](identity_claims_claim.md#storageclaim)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/identity_claims_types.ClaimTypes.md) |

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L52)

___

### DomainClaim

Ƭ **DomainClaim**: `t.TypeOf`\<typeof `DomainClaimType`\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L47)

___

### KeybaseClaim

Ƭ **KeybaseClaim**: `t.TypeOf`\<typeof [`KeybaseClaimType`](identity_claims_claim.md#keybaseclaimtype)\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L12)

___

### NameClaim

Ƭ **NameClaim**: `t.TypeOf`\<typeof `NameClaimType`\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L48)

___

### StorageClaim

Ƭ **StorageClaim**: `t.TypeOf`\<typeof `StorageClaimType`\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L49)

## Variables

### ClaimType

• `Const` **ClaimType**: `UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>, `TypeC`\<\{ `name`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`NAME`](../enums/identity_claims_types.ClaimTypes.md#name)\>  }\>, `TypeC`\<\{ `address`: `StringC` = t.string; `filteredDataPaths`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage)\>  }\>]\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L33)

___

### DOMAIN\_TXT\_HEADER

• `Const` **DOMAIN\_TXT\_HEADER**: ``"celo-site-verification"``

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L46)

___

### KeybaseClaimType

• `Const` **KeybaseClaimType**: `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L6)

___

### SignedClaimType

• `Const` **SignedClaimType**: `TypeC`\<\{ `claim`: `UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>, `TypeC`\<\{ `name`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`NAME`](../enums/identity_claims_types.ClaimTypes.md#name)\>  }\>, `TypeC`\<\{ `address`: `StringC` = t.string; `filteredDataPaths`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage)\>  }\>]\> = ClaimType; `signature`: `StringC` = SignatureType }\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L41)

## Functions

### createDomainClaim

▸ **createDomainClaim**(`domain`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `timestamp` | `number` |
| `type` | [`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain) |

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L87)

___

### createNameClaim

▸ **createNameClaim**(`name`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `timestamp` | `number` |
| `type` | [`NAME`](../enums/identity_claims_types.ClaimTypes.md#name) |

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L81)

___

### createStorageClaim

▸ **createStorageClaim**(`storageURL`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageURL` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `filteredDataPaths` | `string` |
| `timestamp` | `number` |
| `type` | [`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage) |

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L93)

___

### hashOfClaim

▸ **hashOfClaim**(`claim`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | [`Claim`](identity_claims_claim.md#claim) |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L68)

___

### hashOfClaims

▸ **hashOfClaims**(`claims`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claims` | [`Claim`](identity_claims_claim.md#claim)[] |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L72)

___

### isOfType

▸ **isOfType**\<`K`\>(`type`): (`data`: [`Claim`](identity_claims_claim.md#claim)) => data is ClaimPayload\<K\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/identity_claims_types.ClaimTypes.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |

#### Returns

`fn`

▸ (`data`): data is ClaimPayload\<K\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Claim`](identity_claims_claim.md#claim) |

##### Returns

data is ClaimPayload\<K\>

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L64)

___

### serializeClaim

▸ **serializeClaim**(`claim`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | [`Claim`](identity_claims_claim.md#claim) |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/identity/claims/claim.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/claims/claim.ts#L77)
