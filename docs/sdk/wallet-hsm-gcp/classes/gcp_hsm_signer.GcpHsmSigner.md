[@celo/wallet-hsm-gcp](../README.md) / [gcp-hsm-signer](../modules/gcp_hsm_signer.md) / GcpHsmSigner

# Class: GcpHsmSigner

[gcp-hsm-signer](../modules/gcp_hsm_signer.md).GcpHsmSigner

## Implements

- `Signer`

## Table of contents

### Constructors

- [constructor](gcp_hsm_signer.GcpHsmSigner.md#constructor)

### Methods

- [computeSharedSecret](gcp_hsm_signer.GcpHsmSigner.md#computesharedsecret)
- [decrypt](gcp_hsm_signer.GcpHsmSigner.md#decrypt)
- [getNativeKey](gcp_hsm_signer.GcpHsmSigner.md#getnativekey)
- [signPersonalMessage](gcp_hsm_signer.GcpHsmSigner.md#signpersonalmessage)
- [signTransaction](gcp_hsm_signer.GcpHsmSigner.md#signtransaction)
- [signTypedData](gcp_hsm_signer.GcpHsmSigner.md#signtypeddata)

## Constructors

### constructor

• **new GcpHsmSigner**(`client`, `versionName`, `publicKey`): [`GcpHsmSigner`](gcp_hsm_signer.GcpHsmSigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `KeyManagementServiceClient` |
| `versionName` | `string` |
| `publicKey` | `BigNumber` |

#### Returns

[`GcpHsmSigner`](gcp_hsm_signer.GcpHsmSigner.md)

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-signer.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L24)

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`_publicKey`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_publicKey` | `string` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.computeSharedSecret

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-signer.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L115)

___

### decrypt

▸ **decrypt**(`_ciphertext`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ciphertext` | `Buffer` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.decrypt

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-signer.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L109)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-signer.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L105)

___

### signPersonalMessage

▸ **signPersonalMessage**(`data`): `Promise`\<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`\<`Signature`\>

#### Implementation of

Signer.signPersonalMessage

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-signer.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L82)

___

### signTransaction

▸ **signTransaction**(`addToV`, `encodedTx`): `Promise`\<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addToV` | `number` |
| `encodedTx` | `RLPEncodedTx` |

#### Returns

`Promise`\<`Signature`\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-signer.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L70)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`\<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`\<`Signature`\>

#### Implementation of

Signer.signTypedData

#### Defined in

[wallet-hsm-gcp/src/gcp-hsm-signer.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L94)
