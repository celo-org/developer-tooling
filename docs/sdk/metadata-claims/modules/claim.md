[@celo/metadata-claims](../README.md) / claim

# Module: claim

## Table of contents

### Type Aliases

- [Claim](claim.md#claim)
- [ClaimPayload](claim.md#claimpayload)
- [DomainClaim](claim.md#domainclaim)
- [KeybaseClaim](claim.md#keybaseclaim)
- [NameClaim](claim.md#nameclaim)
- [StorageClaim](claim.md#storageclaim)

### Variables

- [ClaimType](claim.md#claimtype)
- [DOMAIN\_TXT\_HEADER](claim.md#domain_txt_header)
- [KeybaseClaimType](claim.md#keybaseclaimtype)
- [SignedClaimType](claim.md#signedclaimtype)

### Functions

- [createDomainClaim](claim.md#createdomainclaim)
- [createNameClaim](claim.md#createnameclaim)
- [createStorageClaim](claim.md#createstorageclaim)
- [hashOfClaim](claim.md#hashofclaim)
- [hashOfClaims](claim.md#hashofclaims)
- [isOfType](claim.md#isoftype)
- [serializeClaim](claim.md#serializeclaim)

## Type Aliases

### Claim

Ƭ **Claim**: [`DomainClaim`](claim.md#domainclaim) \| [`KeybaseClaim`](claim.md#keybaseclaim) \| [`NameClaim`](claim.md#nameclaim) \| [`AccountClaim`](account.md#accountclaim) \| [`StorageClaim`](claim.md#storageclaim)

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L50)

___

### ClaimPayload

Ƭ **ClaimPayload**\<`K`\>: `K` extends typeof [`DOMAIN`](../enums/types.ClaimTypes.md#domain) ? [`DomainClaim`](claim.md#domainclaim) : `K` extends typeof [`NAME`](../enums/types.ClaimTypes.md#name) ? [`NameClaim`](claim.md#nameclaim) : `K` extends typeof [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ? [`KeybaseClaim`](claim.md#keybaseclaim) : `K` extends typeof [`ACCOUNT`](../enums/types.ClaimTypes.md#account) ? [`AccountClaim`](account.md#accountclaim) : [`StorageClaim`](claim.md#storageclaim)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/types.ClaimTypes.md) |

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L52)

___

### DomainClaim

Ƭ **DomainClaim**: `t.TypeOf`\<typeof `DomainClaimType`\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L47)

___

### KeybaseClaim

Ƭ **KeybaseClaim**: `t.TypeOf`\<typeof [`KeybaseClaimType`](claim.md#keybaseclaimtype)\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L12)

___

### NameClaim

Ƭ **NameClaim**: `t.TypeOf`\<typeof `NameClaimType`\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L48)

___

### StorageClaim

Ƭ **StorageClaim**: `t.TypeOf`\<typeof `StorageClaimType`\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L49)

## Variables

### ClaimType

• `Const` **ClaimType**: `UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>, `TypeC`\<\{ `name`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`NAME`](../enums/types.ClaimTypes.md#name)\>  }\>, `TypeC`\<\{ `address`: `StringC` = t.string; `filteredDataPaths`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`STORAGE`](../enums/types.ClaimTypes.md#storage)\>  }\>]\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L33)

___

### DOMAIN\_TXT\_HEADER

• `Const` **DOMAIN\_TXT\_HEADER**: ``"celo-site-verification"``

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L46)

___

### KeybaseClaimType

• `Const` **KeybaseClaimType**: `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L6)

___

### SignedClaimType

• `Const` **SignedClaimType**: `TypeC`\<\{ `claim`: `UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>, `TypeC`\<\{ `name`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`NAME`](../enums/types.ClaimTypes.md#name)\>  }\>, `TypeC`\<\{ `address`: `StringC` = t.string; `filteredDataPaths`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`STORAGE`](../enums/types.ClaimTypes.md#storage)\>  }\>]\> = ClaimType; `signature`: `StringC` = SignatureType }\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L41)

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
| `type` | [`DOMAIN`](../enums/types.ClaimTypes.md#domain) |

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L87)

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
| `type` | [`NAME`](../enums/types.ClaimTypes.md#name) |

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L81)

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
| `type` | [`STORAGE`](../enums/types.ClaimTypes.md#storage) |

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L93)

___

### hashOfClaim

▸ **hashOfClaim**(`claim`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | [`Claim`](claim.md#claim) |

#### Returns

`string`

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L68)

___

### hashOfClaims

▸ **hashOfClaims**(`claims`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claims` | [`Claim`](claim.md#claim)[] |

#### Returns

`string`

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L72)

___

### isOfType

▸ **isOfType**\<`K`\>(`type`): (`data`: [`Claim`](claim.md#claim)) => data is ClaimPayload\<K\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/types.ClaimTypes.md) |

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
| `data` | [`Claim`](claim.md#claim) |

##### Returns

data is ClaimPayload\<K\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L64)

___

### serializeClaim

▸ **serializeClaim**(`claim`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | [`Claim`](claim.md#claim) |

#### Returns

`string`

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L77)
