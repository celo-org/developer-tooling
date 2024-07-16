[@celo/utils](../README.md) / io

# Module: io

## Table of contents

### Type Aliases

- [Address](io.md#address)
- [Signature](io.md#signature)

### Variables

- [AddressType](io.md#addresstype)
- [JSONStringType](io.md#jsonstringtype)
- [PublicKeyType](io.md#publickeytype)
- [SaltType](io.md#salttype)
- [SignatureType](io.md#signaturetype)
- [URL\_REGEX](io.md#url_regex)
- [UrlType](io.md#urltype)

### Functions

- [isValidUrl](io.md#isvalidurl)

## Type Aliases

### Address

Ƭ **Address**: `t.TypeOf`\<typeof [`AddressType`](io.md#addresstype)\>

#### Defined in

[packages/sdk/utils/src/io.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L66)

___

### Signature

Ƭ **Signature**: `t.TypeOf`\<typeof [`SignatureType`](io.md#signaturetype)\>

#### Defined in

[packages/sdk/utils/src/io.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L65)

## Variables

### AddressType

• `Const` **AddressType**: `Type`\<`string`, `string`, `unknown`\>

#### Defined in

[packages/sdk/utils/src/io.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L38)

___

### JSONStringType

• `Const` **JSONStringType**: `Type`\<`string`, `string`, `unknown`\>

#### Defined in

[packages/sdk/utils/src/io.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L23)

___

### PublicKeyType

• `Const` **PublicKeyType**: `Type`\<`string`, `string`, `unknown`\>

#### Defined in

[packages/sdk/utils/src/io.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L50)

___

### SaltType

• `Const` **SaltType**: `StringC` = `t.string`

#### Defined in

[packages/sdk/utils/src/io.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L63)

___

### SignatureType

• `Const` **SignatureType**: `StringC` = `t.string`

#### Defined in

[packages/sdk/utils/src/io.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L62)

___

### URL\_REGEX

• `Const` **URL\_REGEX**: `RegExp`

#### Defined in

packages/sdk/base/lib/io.d.ts:1

___

### UrlType

• `Const` **UrlType**: `Type`\<`string`, `string`, `unknown`\>

#### Defined in

[packages/sdk/utils/src/io.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/io.ts#L11)

## Functions

### isValidUrl

▸ **isValidUrl**(`url`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`boolean`

#### Defined in

packages/sdk/base/lib/io.d.ts:3
