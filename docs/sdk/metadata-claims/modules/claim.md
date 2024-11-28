[@celo/metadata-claims](../README.md) / claim

# Module: claim

## Table of contents

### Type Aliases

- [Claim](claim.md#claim)
- [ClaimPayload](claim.md#claimpayload)
- [DomainClaim](claim.md#domainclaim)
- [KeybaseClaim](claim.md#keybaseclaim)
- [NameClaim](claim.md#nameclaim)
- [RpcUrlClaim](claim.md#rpcurlclaim)
- [StorageClaim](claim.md#storageclaim)

### Variables

- [ClaimType](claim.md#claimtype)
- [DOMAIN\_TXT\_HEADER](claim.md#domain_txt_header)
- [KeybaseClaimType](claim.md#keybaseclaimtype)
- [SignedClaimType](claim.md#signedclaimtype)

### Functions

- [createDomainClaim](claim.md#createdomainclaim)
- [createNameClaim](claim.md#createnameclaim)
- [createRpcUrlClaim](claim.md#createrpcurlclaim)
- [createStorageClaim](claim.md#createstorageclaim)
- [hashOfClaim](claim.md#hashofclaim)
- [hashOfClaims](claim.md#hashofclaims)
- [isOfType](claim.md#isoftype)
- [serializeClaim](claim.md#serializeclaim)

## Type Aliases

### Claim

Ƭ **Claim**: [`DomainClaim`](claim.md#domainclaim) \| [`RpcUrlClaim`](claim.md#rpcurlclaim) \| [`KeybaseClaim`](claim.md#keybaseclaim) \| [`NameClaim`](claim.md#nameclaim) \| [`AccountClaim`](account.md#accountclaim) \| [`StorageClaim`](claim.md#storageclaim)

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L58)

___

### ClaimPayload

Ƭ **ClaimPayload**\<`K`\>: `K` extends typeof [`DOMAIN`](../enums/types.ClaimTypes.md#domain) ? [`DomainClaim`](claim.md#domainclaim) : `K` extends typeof [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url) ? [`RpcUrlClaim`](claim.md#rpcurlclaim) : `K` extends typeof [`NAME`](../enums/types.ClaimTypes.md#name) ? [`NameClaim`](claim.md#nameclaim) : `K` extends typeof [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ? [`KeybaseClaim`](claim.md#keybaseclaim) : `K` extends typeof [`ACCOUNT`](../enums/types.ClaimTypes.md#account) ? [`AccountClaim`](account.md#accountclaim) : [`StorageClaim`](claim.md#storageclaim)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/types.ClaimTypes.md) |

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L66)

___

### DomainClaim

Ƭ **DomainClaim**: `t.TypeOf`\<typeof `DomainClaimType`\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L54)

___

### KeybaseClaim

Ƭ **KeybaseClaim**: `t.TypeOf`\<typeof [`KeybaseClaimType`](claim.md#keybaseclaimtype)\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L12)

___

### NameClaim

Ƭ **NameClaim**: `t.TypeOf`\<typeof `NameClaimType`\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L56)

___

### RpcUrlClaim

Ƭ **RpcUrlClaim**: `t.TypeOf`\<typeof `RpcUrlClaimType`\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L55)

___

### StorageClaim

Ƭ **StorageClaim**: `t.TypeOf`\<typeof `StorageClaimType`\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L57)

## Variables

### ClaimType

• `Const` **ClaimType**: `UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `rpcUrl`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>, `TypeC`\<\{ `name`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`NAME`](../enums/types.ClaimTypes.md#name)\>  }\>, `TypeC`\<\{ `address`: `StringC` = t.string; `filteredDataPaths`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`STORAGE`](../enums/types.ClaimTypes.md#storage)\>  }\>]\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L39)

___

### DOMAIN\_TXT\_HEADER

• `Const` **DOMAIN\_TXT\_HEADER**: ``"celo-site-verification"``

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L53)

___

### KeybaseClaimType

• `Const` **KeybaseClaimType**: `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L6)

___

### SignedClaimType

• `Const` **SignedClaimType**: `TypeC`\<\{ `claim`: `UnionC`\<[`Type`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  }, `any`, `unknown`\>, `TypeC`\<\{ `domain`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`DOMAIN`](../enums/types.ClaimTypes.md#domain)\>  }\>, `TypeC`\<\{ `rpcUrl`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)\>  }\>, `TypeC`\<\{ `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`KEYBASE`](../enums/types.ClaimTypes.md#keybase)\> ; `username`: `StringC` = t.string }\>, `TypeC`\<\{ `name`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`NAME`](../enums/types.ClaimTypes.md#name)\>  }\>, `TypeC`\<\{ `address`: `StringC` = t.string; `filteredDataPaths`: `StringC` = t.string; `timestamp`: `NumberC` = TimestampType; `type`: `LiteralC`\<[`STORAGE`](../enums/types.ClaimTypes.md#storage)\>  }\>]\> = ClaimType; `signature`: `StringC` = SignatureType }\>

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L48)

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

[packages/sdk/metadata-claims/src/claim.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L103)

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

[packages/sdk/metadata-claims/src/claim.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L97)

___

### createRpcUrlClaim

▸ **createRpcUrlClaim**(`rpcUrl`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpcUrl` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `rpcUrl` | `string` |
| `timestamp` | `number` |
| `type` | [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url) |

#### Defined in

[packages/sdk/metadata-claims/src/claim.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L109)

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

[packages/sdk/metadata-claims/src/claim.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L115)

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

[packages/sdk/metadata-claims/src/claim.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L84)

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

[packages/sdk/metadata-claims/src/claim.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L88)

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

[packages/sdk/metadata-claims/src/claim.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L80)

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

[packages/sdk/metadata-claims/src/claim.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L93)
