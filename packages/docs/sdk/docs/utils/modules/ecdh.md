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

[packages/sdk/utils/src/ecdh.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L18)

___

### ensureUncompressed

▸ **ensureUncompressed**(`publicKey`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`any`

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

[packages/sdk/utils/src/ecdh.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L10)

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

[packages/sdk/utils/src/ecdh.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecdh.ts#L40)
