[@celo/wallet-local](../README.md) / [local-signer](../modules/local_signer.md) / LocalSigner

# Class: LocalSigner

[local-signer](../modules/local_signer.md).LocalSigner

Signs the EVM transaction using the provided private key

## Implements

- `Signer`

## Table of contents

### Constructors

- [constructor](local_signer.LocalSigner.md#constructor)

### Methods

- [computeSharedSecret](local_signer.LocalSigner.md#computesharedsecret)
- [decrypt](local_signer.LocalSigner.md#decrypt)
- [getNativeKey](local_signer.LocalSigner.md#getnativekey)
- [signPersonalMessage](local_signer.LocalSigner.md#signpersonalmessage)
- [signTransaction](local_signer.LocalSigner.md#signtransaction)
- [signTypedData](local_signer.LocalSigner.md#signtypeddata)

## Constructors

### constructor

• **new LocalSigner**(`privateKey`): [`LocalSigner`](local_signer.LocalSigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

[`LocalSigner`](local_signer.LocalSigner.md)

#### Defined in

[wallet-local/src/local-signer.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L17)

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`publicKey`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.computeSharedSecret

#### Defined in

[wallet-local/src/local-signer.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L70)

___

### decrypt

▸ **decrypt**(`ciphertext`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `Buffer` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.decrypt

#### Defined in

[wallet-local/src/local-signer.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L63)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-local/src/local-signer.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L21)

___

### signPersonalMessage

▸ **signPersonalMessage**(`data`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signPersonalMessage

#### Defined in

[wallet-local/src/local-signer.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L34)

___

### signTransaction

▸ **signTransaction**(`addToV`, `encodedTx`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addToV` | `number` |
| `encodedTx` | `RLPEncodedTx` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-local/src/local-signer.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L25)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signTypedData

#### Defined in

[wallet-local/src/local-signer.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-local/src/local-signer.ts#L50)
