[@celo/contractkit](../README.md) / [Exports](../modules.md) / [identity/metadata](../modules/identity_metadata.md) / IdentityMetadataWrapper

# Class: IdentityMetadataWrapper

[identity/metadata](../modules/identity_metadata.md).IdentityMetadataWrapper

## Table of contents

### Constructors

- [constructor](identity_metadata.IdentityMetadataWrapper.md#constructor)

### Properties

- [data](identity_metadata.IdentityMetadataWrapper.md#data)

### Accessors

- [claims](identity_metadata.IdentityMetadataWrapper.md#claims)

### Methods

- [addClaim](identity_metadata.IdentityMetadataWrapper.md#addclaim)
- [filterClaims](identity_metadata.IdentityMetadataWrapper.md#filterclaims)
- [findClaim](identity_metadata.IdentityMetadataWrapper.md#findclaim)
- [hashOfClaims](identity_metadata.IdentityMetadataWrapper.md#hashofclaims)
- [toString](identity_metadata.IdentityMetadataWrapper.md#tostring)
- [fetchFromURL](identity_metadata.IdentityMetadataWrapper.md#fetchfromurl)
- [fromEmpty](identity_metadata.IdentityMetadataWrapper.md#fromempty)
- [fromFile](identity_metadata.IdentityMetadataWrapper.md#fromfile)
- [fromRawString](identity_metadata.IdentityMetadataWrapper.md#fromrawstring)
- [verifySigner](identity_metadata.IdentityMetadataWrapper.md#verifysigner)
- [verifySignerForAddress](identity_metadata.IdentityMetadataWrapper.md#verifysignerforaddress)

## Constructors

### constructor

• **new IdentityMetadataWrapper**(`data`): [`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `Object` | `undefined` |
| `data.claims` | (\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/identity_claims_types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage)  })[] | `undefined` |
| `data.meta` | `Object` | `MetaType` |
| `data.meta.address` | `string` | `AddressType` |
| `data.meta.signature` | `string` | `SignatureType` |

#### Returns

[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:154](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L154)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `claims` | (\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/identity_claims_types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage)  })[] |
| `meta` | \{ `address`: `string` = AddressType; `signature`: `string` = SignatureType } |
| `meta.address` | `string` |
| `meta.signature` | `string` |

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L32)

## Accessors

### claims

• `get` **claims**(): (\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/identity_claims_types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage)  })[]

#### Returns

(\{ `address`: `string` = AddressType; `publicKey`: `undefined` \| `string` ; `timestamp`: `number` = TimestampType; `type`: [`ACCOUNT`](../enums/identity_claims_types.ClaimTypes.md#account)  } \| \{ `timestamp`: `number` = TimestampType; `type`: [`KEYBASE`](../enums/identity_claims_types.ClaimTypes.md#keybase) ; `username`: `string` = t.string } \| \{ `domain`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`DOMAIN`](../enums/identity_claims_types.ClaimTypes.md#domain)  } \| \{ `name`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`NAME`](../enums/identity_claims_types.ClaimTypes.md#name)  } \| \{ `address`: `string` = t.string; `filteredDataPaths`: `string` = t.string; `timestamp`: `number` = TimestampType; `type`: [`STORAGE`](../enums/identity_claims_types.ClaimTypes.md#storage)  })[]

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L158)

## Methods

### addClaim

▸ **addClaim**(`claim`, `signer`): `Promise`\<[`Claim`](../modules/identity_claims_claim.md#claim)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | [`Claim`](../modules/identity_claims_claim.md#claim) |
| `signer` | `Signer` |

#### Returns

`Promise`\<[`Claim`](../modules/identity_claims_claim.md#claim)\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L173)

___

### filterClaims

▸ **filterClaims**\<`K`\>(`type`): [`ClaimPayload`](../modules/identity_claims_claim.md#claimpayload)\<`K`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/identity_claims_types.ClaimTypes.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |

#### Returns

[`ClaimPayload`](../modules/identity_claims_claim.md#claimpayload)\<`K`\>[]

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:213](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L213)

___

### findClaim

▸ **findClaim**\<`K`\>(`type`): `undefined` \| [`ClaimPayload`](../modules/identity_claims_claim.md#claimpayload)\<`K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`ClaimTypes`](../enums/identity_claims_types.ClaimTypes.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |

#### Returns

`undefined` \| [`ClaimPayload`](../modules/identity_claims_claim.md#claimpayload)\<`K`\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:209](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L209)

___

### hashOfClaims

▸ **hashOfClaims**(): `string`

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:162](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L162)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L166)

___

### fetchFromURL

▸ **fetchFromURL**(`contractKitOrAccountsWrapper`, `url`, `tries?`): `Promise`\<[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contractKitOrAccountsWrapper` | `KitOrAccountsWrapper` | `undefined` |
| `url` | `string` | `undefined` |
| `tries` | `number` | `3` |

#### Returns

`Promise`\<[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L44)

___

### fromEmpty

▸ **fromEmpty**(`address`): [`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L34)

___

### fromFile

▸ **fromFile**(`contractKitOrAccountsWrapper`, `path`): `Promise`\<[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | `KitOrAccountsWrapper` |
| `path` | `string` |

#### Returns

`Promise`\<[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L63)

___

### fromRawString

▸ **fromRawString**(`contractKitOrAccountsWrapper`, `rawData`): `Promise`\<[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | `KitOrAccountsWrapper` |
| `rawData` | `string` |

#### Returns

`Promise`\<[`IdentityMetadataWrapper`](identity_metadata.IdentityMetadataWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L111)

___

### verifySigner

▸ **verifySigner**(`contractKitOrAccountsWrapper`, `hash`, `signature`, `metadata`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | `KitOrAccountsWrapper` |
| `hash` | `any` |
| `signature` | `any` |
| `metadata` | `any` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L74)

___

### verifySignerForAddress

▸ **verifySignerForAddress**(`contractKitOrAccountsWrapper`, `hash`, `signature`, `address`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractKitOrAccountsWrapper` | `KitOrAccountsWrapper` |
| `hash` | `any` |
| `signature` | `any` |
| `address` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/identity/metadata.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L88)
