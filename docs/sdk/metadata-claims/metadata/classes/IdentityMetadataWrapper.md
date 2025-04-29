[**@celo/metadata-claims**](../../README.md)

***

[@celo/metadata-claims](../../README.md) / [metadata](../README.md) / IdentityMetadataWrapper

# Class: IdentityMetadataWrapper

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L34)

## Constructors

### Constructor

> **new IdentityMetadataWrapper**(`data`): `IdentityMetadataWrapper`

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:157](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L157)

#### Parameters

##### data

###### claims

(\{ `address`: `string`; `publicKey`: `undefined` \| `string`; `timestamp`: `number`; `type`: [`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account); \} \| \{ `timestamp`: `number`; `type`: [`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase); `username`: `string`; \} \| \{ `domain`: `string`; `timestamp`: `number`; `type`: [`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain); \} \| \{ `rpcUrl`: `string`; `timestamp`: `number`; `type`: [`RPC_URL`](../../types/enumerations/ClaimTypes.md#rpc_url); \} \| \{ `name`: `string`; `timestamp`: `number`; `type`: [`NAME`](../../types/enumerations/ClaimTypes.md#name); \} \| \{ `address`: `string`; `filteredDataPaths`: `string`; `timestamp`: `number`; `type`: [`STORAGE`](../../types/enumerations/ClaimTypes.md#storage); \} \| \{ `timestamp`: `number`; `type`: [`ATTESTATION_SERVICE_URL`](../../types/enumerations/ClaimTypes.md#attestation_service_url); `url`: `string`; \})[] = `...`

###### meta

\{ `address`: `string`; `signature`: `string`; \} = `MetaType`

###### meta.address

`string` = `AddressType`

###### meta.signature

`string` = `SignatureType`

#### Returns

`IdentityMetadataWrapper`

## Properties

### data

> **data**: `object`

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L35)

#### claims

> **claims**: (\{ `address`: `string`; `publicKey`: `undefined` \| `string`; `timestamp`: `number`; `type`: [`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account); \} \| \{ `timestamp`: `number`; `type`: [`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase); `username`: `string`; \} \| \{ `domain`: `string`; `timestamp`: `number`; `type`: [`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain); \} \| \{ `rpcUrl`: `string`; `timestamp`: `number`; `type`: [`RPC_URL`](../../types/enumerations/ClaimTypes.md#rpc_url); \} \| \{ `name`: `string`; `timestamp`: `number`; `type`: [`NAME`](../../types/enumerations/ClaimTypes.md#name); \} \| \{ `address`: `string`; `filteredDataPaths`: `string`; `timestamp`: `number`; `type`: [`STORAGE`](../../types/enumerations/ClaimTypes.md#storage); \} \| \{ `timestamp`: `number`; `type`: [`ATTESTATION_SERVICE_URL`](../../types/enumerations/ClaimTypes.md#attestation_service_url); `url`: `string`; \})[]

#### meta

> **meta**: `object` = `MetaType`

##### meta.address

> **address**: `string` = `AddressType`

##### meta.signature

> **signature**: `string` = `SignatureType`

## Accessors

### claims

#### Get Signature

> **get** **claims**(): (\{ `address`: `string`; `publicKey`: `undefined` \| `string`; `timestamp`: `number`; `type`: [`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account); \} \| \{ `timestamp`: `number`; `type`: [`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase); `username`: `string`; \} \| \{ `domain`: `string`; `timestamp`: `number`; `type`: [`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain); \} \| \{ `rpcUrl`: `string`; `timestamp`: `number`; `type`: [`RPC_URL`](../../types/enumerations/ClaimTypes.md#rpc_url); \} \| \{ `name`: `string`; `timestamp`: `number`; `type`: [`NAME`](../../types/enumerations/ClaimTypes.md#name); \} \| \{ `address`: `string`; `filteredDataPaths`: `string`; `timestamp`: `number`; `type`: [`STORAGE`](../../types/enumerations/ClaimTypes.md#storage); \} \| \{ `timestamp`: `number`; `type`: [`ATTESTATION_SERVICE_URL`](../../types/enumerations/ClaimTypes.md#attestation_service_url); `url`: `string`; \})[]

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:161](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L161)

##### Returns

(\{ `address`: `string`; `publicKey`: `undefined` \| `string`; `timestamp`: `number`; `type`: [`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account); \} \| \{ `timestamp`: `number`; `type`: [`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase); `username`: `string`; \} \| \{ `domain`: `string`; `timestamp`: `number`; `type`: [`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain); \} \| \{ `rpcUrl`: `string`; `timestamp`: `number`; `type`: [`RPC_URL`](../../types/enumerations/ClaimTypes.md#rpc_url); \} \| \{ `name`: `string`; `timestamp`: `number`; `type`: [`NAME`](../../types/enumerations/ClaimTypes.md#name); \} \| \{ `address`: `string`; `filteredDataPaths`: `string`; `timestamp`: `number`; `type`: [`STORAGE`](../../types/enumerations/ClaimTypes.md#storage); \} \| \{ `timestamp`: `number`; `type`: [`ATTESTATION_SERVICE_URL`](../../types/enumerations/ClaimTypes.md#attestation_service_url); `url`: `string`; \})[]

## Methods

### addClaim()

> **addClaim**(`claim`, `signer`): `Promise`\<\{ `address`: `string`; `publicKey`: `undefined` \| `string`; `timestamp`: `number`; `type`: [`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account); \} \| \{ `timestamp`: `number`; `type`: [`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase); `username`: `string`; \} \| \{ `domain`: `string`; `timestamp`: `number`; `type`: [`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain); \} \| \{ `rpcUrl`: `string`; `timestamp`: `number`; `type`: [`RPC_URL`](../../types/enumerations/ClaimTypes.md#rpc_url); \} \| \{ `name`: `string`; `timestamp`: `number`; `type`: [`NAME`](../../types/enumerations/ClaimTypes.md#name); \} \| \{ `address`: `string`; `filteredDataPaths`: `string`; `timestamp`: `number`; `type`: [`STORAGE`](../../types/enumerations/ClaimTypes.md#storage); \} \| \{ `timestamp`: `number`; `type`: [`ATTESTATION_SERVICE_URL`](../../types/enumerations/ClaimTypes.md#attestation_service_url); `url`: `string`; \}\>

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:181](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L181)

#### Parameters

##### claim

[`Claim`](../../claim/type-aliases/Claim.md)

##### signer

`Signer`

#### Returns

`Promise`\<\{ `address`: `string`; `publicKey`: `undefined` \| `string`; `timestamp`: `number`; `type`: [`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account); \} \| \{ `timestamp`: `number`; `type`: [`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase); `username`: `string`; \} \| \{ `domain`: `string`; `timestamp`: `number`; `type`: [`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain); \} \| \{ `rpcUrl`: `string`; `timestamp`: `number`; `type`: [`RPC_URL`](../../types/enumerations/ClaimTypes.md#rpc_url); \} \| \{ `name`: `string`; `timestamp`: `number`; `type`: [`NAME`](../../types/enumerations/ClaimTypes.md#name); \} \| \{ `address`: `string`; `filteredDataPaths`: `string`; `timestamp`: `number`; `type`: [`STORAGE`](../../types/enumerations/ClaimTypes.md#storage); \} \| \{ `timestamp`: `number`; `type`: [`ATTESTATION_SERVICE_URL`](../../types/enumerations/ClaimTypes.md#attestation_service_url); `url`: `string`; \}\>

***

### filterClaims()

> **filterClaims**\<`K`\>(`type`): [`ClaimPayload`](../../claim/type-aliases/ClaimPayload.md)\<`K`\>[]

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:242](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L242)

#### Type Parameters

##### K

`K` *extends* [`ClaimTypes`](../../types/enumerations/ClaimTypes.md)

#### Parameters

##### type

`K`

#### Returns

[`ClaimPayload`](../../claim/type-aliases/ClaimPayload.md)\<`K`\>[]

***

### findClaim()

> **findClaim**\<`K`\>(`type`): `undefined` \| [`ClaimPayload`](../../claim/type-aliases/ClaimPayload.md)\<`K`\>

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:238](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L238)

#### Type Parameters

##### K

`K` *extends* [`ClaimTypes`](../../types/enumerations/ClaimTypes.md)

#### Parameters

##### type

`K`

#### Returns

`undefined` \| [`ClaimPayload`](../../claim/type-aliases/ClaimPayload.md)\<`K`\>

***

### hashOfClaims()

> **hashOfClaims**(): `string`

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L165)

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L169)

#### Returns

`string`

***

### fetchFromURL()

> `static` **fetchFromURL**(`contractKitOrAccountsWrapper`, `url`, `tries`): `Promise`\<`IdentityMetadataWrapper`\>

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L47)

#### Parameters

##### contractKitOrAccountsWrapper

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

##### url

`string`

##### tries

`number` = `3`

#### Returns

`Promise`\<`IdentityMetadataWrapper`\>

***

### fromEmpty()

> `static` **fromEmpty**(`address`): `IdentityMetadataWrapper`

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L37)

#### Parameters

##### address

`string`

#### Returns

`IdentityMetadataWrapper`

***

### fromFile()

> `static` **fromFile**(`contractKitOrAccountsWrapper`, `path`): `Promise`\<`IdentityMetadataWrapper`\>

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L66)

#### Parameters

##### contractKitOrAccountsWrapper

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

##### path

`string`

#### Returns

`Promise`\<`IdentityMetadataWrapper`\>

***

### fromRawString()

> `static` **fromRawString**(`contractKitOrAccountsWrapper`, `rawData`): `Promise`\<`IdentityMetadataWrapper`\>

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L114)

#### Parameters

##### contractKitOrAccountsWrapper

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

##### rawData

`string`

#### Returns

`Promise`\<`IdentityMetadataWrapper`\>

***

### verifySigner()

> `static` **verifySigner**(`contractKitOrAccountsWrapper`, `hash`, `signature`, `metadata`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L77)

#### Parameters

##### contractKitOrAccountsWrapper

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

##### hash

`any`

##### signature

`any`

##### metadata

`any`

#### Returns

`Promise`\<`boolean`\>

***

### verifySignerForAddress()

> `static` **verifySignerForAddress**(`contractKitOrAccountsWrapper`, `hash`, `signature`, `address`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/metadata-claims/src/metadata.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/metadata.ts#L91)

#### Parameters

##### contractKitOrAccountsWrapper

[`AccountMetadataSignerGetters`](../../types/type-aliases/AccountMetadataSignerGetters.md)

##### hash

`any`

##### signature

`any`

##### address

`string`

#### Returns

`Promise`\<`boolean`\>
