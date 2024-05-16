[@celo/base](../README.md) / address

# Module: address

## Table of contents

### Type Aliases

- [Address](address.md#address)
- [StrongAddress](address.md#strongaddress)

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
- [isNullAddress](address.md#isnulladdress)
- [mapAddressListDataOnto](address.md#mapaddresslistdataonto)
- [mapAddressListOnto](address.md#mapaddresslistonto)
- [normalizeAddress](address.md#normalizeaddress)
- [normalizeAddressWith0x](address.md#normalizeaddresswith0x)
- [trimLeading0x](address.md#trimleading0x)

## Type Aliases

### Address

Ƭ **Address**: `string`

#### Defined in

[packages/sdk/base/src/address.ts:3](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L3)

___

### StrongAddress

Ƭ **StrongAddress**: \`0x$\{string}\`

#### Defined in

[packages/sdk/base/src/address.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L5)

## Variables

### NULL\_ADDRESS

• `Const` **NULL\_ADDRESS**: ``"0x0000000000000000000000000000000000000000"``

#### Defined in

[packages/sdk/base/src/address.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L32)

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

[packages/sdk/base/src/address.ts:30](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L30)

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

[packages/sdk/base/src/address.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L18)

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

[packages/sdk/base/src/address.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L7)

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

[packages/sdk/base/src/address.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L34)

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

[packages/sdk/base/src/address.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L23)

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

[packages/sdk/base/src/address.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L28)

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

[packages/sdk/base/src/address.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L26)

___

### isNullAddress

▸ **isNullAddress**(`a`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/base/src/address.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L11)

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

[packages/sdk/base/src/address.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L71)

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

[packages/sdk/base/src/address.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L38)

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

[packages/sdk/base/src/address.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L9)

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

[packages/sdk/base/src/address.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L13)

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

[packages/sdk/base/src/address.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/address.ts#L16)
