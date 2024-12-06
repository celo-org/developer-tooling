[@celo/metadata-claims](../README.md) / [metadata](../modules/metadata.md) / IdentityMetadataWrapper

# Class: IdentityMetadataWrapper

[metadata](../modules/metadata.md).IdentityMetadataWrapper

## Table of contents

### Constructors

- [constructor](metadata.IdentityMetadataWrapper.md#constructor)

### Properties

- [data](metadata.IdentityMetadataWrapper.md#data)

### Accessors

- [claims](metadata.IdentityMetadataWrapper.md#claims)

### Methods

- [addClaim](metadata.IdentityMetadataWrapper.md#addclaim)
- [filterClaims](metadata.IdentityMetadataWrapper.md#filterclaims)
- [findClaim](metadata.IdentityMetadataWrapper.md#findclaim)
- [hashOfClaims](metadata.IdentityMetadataWrapper.md#hashofclaims)
- [toString](metadata.IdentityMetadataWrapper.md#tostring)
- [fetchFromURL](metadata.IdentityMetadataWrapper.md#fetchfromurl)
- [fromEmpty](metadata.IdentityMetadataWrapper.md#fromempty)
- [fromFile](metadata.IdentityMetadataWrapper.md#fromfile)
- [fromRawString](metadata.IdentityMetadataWrapper.md#fromrawstring)
- [verifySigner](metadata.IdentityMetadataWrapper.md#verifysigner)
- [verifySignerForAddress](metadata.IdentityMetadataWrapper.md#verifysignerforaddress)

## Constructors

### constructor

• **new IdentityMetadataWrapper**(`data`): [`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `Object` | `undefined` |
| `data.claims` | (\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/types.ClaimTypes.md#domain)  } \| \{ `rpcUrl`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/types.ClaimTypes.md#storage)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`ATTESTATION_SERVICE_URL`](../enums/types.ClaimTypes.md#attestation_service_url) ; `url`: `string` = UrlType })[] | `undefined` |
| `data.meta` | `Object` | `MetaType` |
| `data.meta.address` | `string` | `AddressType` |
| `data.meta.signature` | `string` | `SignatureType` |

#### Returns

[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:157](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L157)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `claims` | (\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/types.ClaimTypes.md#domain)  } \| \{ `rpcUrl`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/types.ClaimTypes.md#storage)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`ATTESTATION_SERVICE_URL`](../enums/types.ClaimTypes.md#attestation_service_url) ; `url`: `string` = UrlType })[] |
| `meta` | \{ `address`: `string` = AddressType; `signature`: `string` = SignatureType } |
| `meta.address` | `string` |
| `meta.signature` | `string` |

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L35)

## Accessors

### claims

• `get` **claims**(): (\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/types.ClaimTypes.md#domain)  } \| \{ `rpcUrl`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/types.ClaimTypes.md#storage)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`ATTESTATION_SERVICE_URL`](../enums/types.ClaimTypes.md#attestation_service_url) ; `url`: `string` = UrlType })[]

#### Returns

(\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/types.ClaimTypes.md#domain)  } \| \{ `rpcUrl`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/types.ClaimTypes.md#storage)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`ATTESTATION_SERVICE_URL`](../enums/types.ClaimTypes.md#attestation_service_url) ; `url`: `string` = UrlType })[]

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:161](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L161)

## Methods

### addClaim

▸ **addClaim**(`claim`, `signer`): `Promise`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/types.ClaimTypes.md#domain)  } \| \{ `rpcUrl`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/types.ClaimTypes.md#storage)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`ATTESTATION_SERVICE_URL`](../enums/types.ClaimTypes.md#attestation_service_url) ; `url`: `string` = UrlType }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | [`Claim`](../modules/claim.md#claim) |
| `signer` | `Signer` |

#### Returns

`Promise`\<\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/types.ClaimTypes.md#domain)  } \| \{ `rpcUrl`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`RPC_URL`](../enums/types.ClaimTypes.md#rpc_url)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/types.ClaimTypes.md#storage)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`ATTESTATION_SERVICE_URL`](../enums/types.ClaimTypes.md#attestation_service_url) ; `url`: `string` = UrlType }\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L176)

___

### filterClaims

▸ **filterClaims**\<`K`\>(`type`): [`ClaimPayload`](../modules/claim.md#claimpayload)\<`K`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/types.ClaimTypes.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |

#### Returns

[`ClaimPayload`](../modules/claim.md#claimpayload)\<`K`\>[]

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L226)

___

### findClaim

▸ **findClaim**\<`K`\>(`type`): `undefined` \| [`ClaimPayload`](../modules/claim.md#claimpayload)\<`K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/types.ClaimTypes.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |

#### Returns

`undefined` \| [`ClaimPayload`](../modules/claim.md#claimpayload)\<`K`\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L222)

___

### hashOfClaims

▸ **hashOfClaims**(): `string`

#### Returns

`string`

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L165)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L169)

___

### fetchFromURL

▸ **fetchFromURL**(`contractKitOrAccountsWrapper`, `url`, `tries?`): `Promise`\<[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contractKitOrAccountsWrapper` | [`AccountMetadataSignerGetters`](../modules/types.md#accountmetadatasignergetters) | `undefined` |
| `url` | `string` | `undefined` |
| `tries` | `number` | `3` |

#### Returns

`Promise`\<[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L47)

___

### fromEmpty

▸ **fromEmpty**(`address`): [`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L37)

___

### fromFile

▸ **fromFile**(`contractKitOrAccountsWrapper`, `path`): `Promise`\<[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | [`AccountMetadataSignerGetters`](../modules/types.md#accountmetadatasignergetters) |
| `path` | `string` |

#### Returns

`Promise`\<[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L66)

___

### fromRawString

▸ **fromRawString**(`contractKitOrAccountsWrapper`, `rawData`): `Promise`\<[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | [`AccountMetadataSignerGetters`](../modules/types.md#accountmetadatasignergetters) |
| `rawData` | `string` |

#### Returns

`Promise`\<[`IdentityMetadataWrapper`](metadata.IdentityMetadataWrapper.md)\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L114)

___

### verifySigner

▸ **verifySigner**(`contractKitOrAccountsWrapper`, `hash`, `signature`, `metadata`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | [`AccountMetadataSignerGetters`](../modules/types.md#accountmetadatasignergetters) |
| `hash` | `any` |
| `signature` | `any` |
| `metadata` | `any` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L77)

___

### verifySignerForAddress

▸ **verifySignerForAddress**(`contractKitOrAccountsWrapper`, `hash`, `signature`, `address`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | [`AccountMetadataSignerGetters`](../modules/types.md#accountmetadatasignergetters) |
| `hash` | `any` |
| `signature` | `any` |
| `address` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/metadata-claims/src/metadata.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L91)
