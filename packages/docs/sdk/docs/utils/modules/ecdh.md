[@celo/utils](../README.md) / ecdh

# Module: ecdh

## Table of contents

### Functions

- [computeSharedSecret](ecdh.md#computesharedsecret)
- [ensureCompressed](ecdh.md#ensurecompressed)
- [ensureUncompressed](ecdh.md#ensureuncompressed)
- [isCompressed](ecdh.md#iscompressed)
- [trimUncompressedPrefix](ecdh.md#trimuncompressedprefix)

## Functions

### computeSharedSecret

▸ **computeSharedSecret**(`privateKey`, `publicKey`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `publicKey` | `string` |

#### Returns

`Buffer`

#### Defined in

[packages/sdk/utils/src/ecdh.ts:4](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L4)

___

### ensureCompressed

▸ **ensureCompressed**(`publicKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/ecdh.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L21)

___

### ensureUncompressed

▸ **ensureUncompressed**(`publicKey`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[packages/sdk/utils/src/ecdh.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L27)

___

### isCompressed

▸ **isCompressed**(`publicKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/utils/src/ecdh.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L13)

___

### trimUncompressedPrefix

▸ **trimUncompressedPrefix**(`publicKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/ecdh.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L32)
