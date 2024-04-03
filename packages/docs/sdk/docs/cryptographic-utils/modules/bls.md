[@celo/cryptographic-utils](../README.md) / [Exports](../modules.md) / bls

# Module: bls

## Table of contents

### Variables

- [BLS\_POP\_SIZE](bls.md#bls_pop_size)
- [BLS\_PUBLIC\_KEY\_SIZE](bls.md#bls_public_key_size)

### Functions

- [blsPrivateKeyToProcessedPrivateKey](bls.md#blsprivatekeytoprocessedprivatekey)
- [getBlsPoP](bls.md#getblspop)
- [getBlsPublicKey](bls.md#getblspublickey)

## Variables

### BLS\_POP\_SIZE

• `Const` **BLS\_POP\_SIZE**: ``48``

#### Defined in

[cryptographic-utils/src/bls.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/bls.ts#L11)

___

### BLS\_PUBLIC\_KEY\_SIZE

• `Const` **BLS\_PUBLIC\_KEY\_SIZE**: ``96``

#### Defined in

[cryptographic-utils/src/bls.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/bls.ts#L10)

## Functions

### blsPrivateKeyToProcessedPrivateKey

▸ **blsPrivateKeyToProcessedPrivateKey**(`privateKeyHex`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKeyHex` | `string` |

#### Returns

`Buffer`

#### Defined in

[cryptographic-utils/src/bls.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/bls.ts#L13)

___

### getBlsPoP

▸ **getBlsPoP**(`address`, `privateKeyHex`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `privateKeyHex` | `string` |

#### Returns

`string`

#### Defined in

[cryptographic-utils/src/bls.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/bls.ts#L51)

___

### getBlsPublicKey

▸ **getBlsPublicKey**(`privateKeyHex`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKeyHex` | `string` |

#### Returns

`string`

#### Defined in

[cryptographic-utils/src/bls.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/bls.ts#L46)
