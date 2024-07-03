[@celo/utils](../README.md) / address

# Module: address

## Table of contents

### Type Aliases

- [Address](address.md#address)

### Variables

- [NULL\_ADDRESS](address.md#null_address)

### Functions

- [bufferToHex](address.md#buffertohex)
- [ensureLeading0x](address.md#ensureleading0x)
- [eqAddress](address.md#eqaddress)
- [findAddressIndex](address.md#findaddressindex)
- [getAddressChunks](address.md#getaddresschunks)
- [hexToBuffer](address.md#hextobuffer)
- [isHexString](address.md#ishexstring)
- [isValidAddress](address.md#isvalidaddress)
- [isValidChecksumAddress](address.md#isvalidchecksumaddress)
- [isValidPrivateKey](address.md#isvalidprivatekey)
- [mapAddressListDataOnto](address.md#mapaddresslistdataonto)
- [mapAddressListOnto](address.md#mapaddresslistonto)
- [normalizeAddress](address.md#normalizeaddress)
- [normalizeAddressWith0x](address.md#normalizeaddresswith0x)
- [privateKeyToAddress](address.md#privatekeytoaddress)
- [privateKeyToPublicKey](address.md#privatekeytopublickey)
- [publicKeyToAddress](address.md#publickeytoaddress)
- [toChecksumAddress](address.md#tochecksumaddress)
- [trimLeading0x](address.md#trimleading0x)

## Type Aliases

### Address

Ƭ **Address**: `string`

#### Defined in

packages/sdk/base/lib/address.d.ts:2

## Variables

### NULL\_ADDRESS

• `Const` **NULL\_ADDRESS**: ``"0x0000000000000000000000000000000000000000"``

#### Defined in

packages/sdk/base/lib/address.d.ts:14

## Functions

### bufferToHex

▸ **bufferToHex**(`buf`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

\`0x$\{string}\`

#### Defined in

packages/sdk/base/lib/address.d.ts:13

___

### ensureLeading0x

▸ **ensureLeading0x**(`input`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

\`0x$\{string}\`

#### Defined in

packages/sdk/base/lib/address.d.ts:9

___

### eqAddress

▸ **eqAddress**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |
| `b` | `string` |

#### Returns

`boolean`

#### Defined in

packages/sdk/base/lib/address.d.ts:4

___

### findAddressIndex

▸ **findAddressIndex**(`address`, `addresses`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `addresses` | `string`[] |

#### Returns

`number`

#### Defined in

packages/sdk/base/lib/address.d.ts:15

___

### getAddressChunks

▸ **getAddressChunks**(`input`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`[]

#### Defined in

packages/sdk/base/lib/address.d.ts:10

___

### hexToBuffer

▸ **hexToBuffer**(`input`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`Buffer`

#### Defined in

packages/sdk/base/lib/address.d.ts:12

___

### isHexString

▸ **isHexString**(`input`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`boolean`

#### Defined in

packages/sdk/base/lib/address.d.ts:11

___

### isValidAddress

▸ **isValidAddress**(`input`): input is \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

input is \`0x$\{string}\`

#### Defined in

[packages/sdk/utils/src/address.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/address.ts#L46)

___

### isValidChecksumAddress

▸ **isValidChecksumAddress**(`hexAddress`, `eip1191ChainId?`): `boolean`

Checks if the address is a valid checksummed address.

See toChecksumAddress' documentation for details about the eip1191ChainId parameter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexAddress` | `string` |
| `eip1191ChainId?` | `BigIntLike` |

#### Returns

`boolean`

#### Defined in

node_modules/@ethereumjs/util/dist/account.d.ts:65

___

### isValidPrivateKey

▸ **isValidPrivateKey**(`privateKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/utils/src/address.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/address.ts#L43)

___

### mapAddressListDataOnto

▸ **mapAddressListDataOnto**\<`T`\>(`data`, `oldAddress`, `newAddress`, `initialValue`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |
| `oldAddress` | `string`[] |
| `newAddress` | `string`[] |
| `initialValue` | `T` |

#### Returns

`T`[]

#### Defined in

packages/sdk/base/lib/address.d.ts:17

___

### mapAddressListOnto

▸ **mapAddressListOnto**(`oldAddress`, `newAddress`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldAddress` | `string`[] |
| `newAddress` | `string`[] |

#### Returns

`any`[]

#### Defined in

packages/sdk/base/lib/address.d.ts:16

___

### normalizeAddress

▸ **normalizeAddress**(`a`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |

#### Returns

`string`

#### Defined in

packages/sdk/base/lib/address.d.ts:5

___

### normalizeAddressWith0x

▸ **normalizeAddressWith0x**(`a`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |

#### Returns

\`0x$\{string}\`

#### Defined in

packages/sdk/base/lib/address.d.ts:7

___

### privateKeyToAddress

▸ **privateKeyToAddress**(`privateKey`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

\`0x$\{string}\`

#### Defined in

[packages/sdk/utils/src/address.ts:30](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/address.ts#L30)

___

### privateKeyToPublicKey

▸ **privateKeyToPublicKey**(`privateKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/address.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/address.ts#L35)

___

### publicKeyToAddress

▸ **publicKeyToAddress**(`publicKey`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

\`0x$\{string}\`

#### Defined in

[packages/sdk/utils/src/address.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/address.ts#L38)

___

### toChecksumAddress

▸ **toChecksumAddress**(`hexAddress`, `eip1191ChainId?`): `string`

Returns a checksummed address.

If an eip1191ChainId is provided, the chainId will be included in the checksum calculation. This
has the effect of checksummed addresses for one chain having invalid checksums for others.
For more details see [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191).

WARNING: Checksums with and without the chainId will differ and the EIP-1191 checksum is not
backwards compatible to the original widely adopted checksum format standard introduced in
[EIP-55](https://eips.ethereum.org/EIPS/eip-55), so this will break in existing applications.
Usage of this EIP is therefore discouraged unless you have a very targeted use case.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexAddress` | `string` |
| `eip1191ChainId?` | `BigIntLike` |

#### Returns

`string`

#### Defined in

node_modules/@ethereumjs/util/dist/account.d.ts:59

___

### trimLeading0x

▸ **trimLeading0x**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

packages/sdk/base/lib/address.d.ts:8
