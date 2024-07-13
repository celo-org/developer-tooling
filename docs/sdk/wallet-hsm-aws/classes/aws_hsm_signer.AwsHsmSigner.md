[@celo/wallet-hsm-aws](../README.md) / [aws-hsm-signer](../modules/aws_hsm_signer.md) / AwsHsmSigner

# Class: AwsHsmSigner

[aws-hsm-signer](../modules/aws_hsm_signer.md).AwsHsmSigner

## Implements

- `Signer`

## Table of contents

### Constructors

- [constructor](aws_hsm_signer.AwsHsmSigner.md#constructor)

### Methods

- [computeSharedSecret](aws_hsm_signer.AwsHsmSigner.md#computesharedsecret)
- [decrypt](aws_hsm_signer.AwsHsmSigner.md#decrypt)
- [getNativeKey](aws_hsm_signer.AwsHsmSigner.md#getnativekey)
- [signPersonalMessage](aws_hsm_signer.AwsHsmSigner.md#signpersonalmessage)
- [signTransaction](aws_hsm_signer.AwsHsmSigner.md#signtransaction)
- [signTypedData](aws_hsm_signer.AwsHsmSigner.md#signtypeddata)

## Constructors

### constructor

• **new AwsHsmSigner**(`kms`, `keyId`, `publicKey`): [`AwsHsmSigner`](aws_hsm_signer.AwsHsmSigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kms` | `KMS` |
| `keyId` | `string` |
| `publicKey` | `BigNumber` |

#### Returns

[`AwsHsmSigner`](aws_hsm_signer.AwsHsmSigner.md)

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L25)

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

[wallet-hsm-aws/src/aws-hsm-signer.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L117)

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

[wallet-hsm-aws/src/aws-hsm-signer.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L111)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L107)

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

[wallet-hsm-aws/src/aws-hsm-signer.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L84)

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

[wallet-hsm-aws/src/aws-hsm-signer.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L72)

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

[wallet-hsm-aws/src/aws-hsm-signer.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L96)
