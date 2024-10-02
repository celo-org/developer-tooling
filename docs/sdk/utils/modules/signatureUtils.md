[@celo/utils](../README.md) / signatureUtils

# Module: signatureUtils

## Table of contents

### References

- [NativeSigner](signatureUtils.md#nativesigner)
- [serializeSignature](signatureUtils.md#serializesignature)

### Interfaces

- [Signature](../interfaces/signatureUtils.Signature.md)
- [Signer](../interfaces/signatureUtils.Signer.md)

### Variables

- [POP\_SIZE](signatureUtils.md#pop_size)
- [SignatureUtils](signatureUtils.md#signatureutils)

### Functions

- [LocalSigner](signatureUtils.md#localsigner)
- [addressToPublicKey](signatureUtils.md#addresstopublickey)
- [guessSigner](signatureUtils.md#guesssigner)
- [hashMessage](signatureUtils.md#hashmessage)
- [hashMessageWithPrefix](signatureUtils.md#hashmessagewithprefix)
- [parseSignature](signatureUtils.md#parsesignature)
- [parseSignatureWithoutPrefix](signatureUtils.md#parsesignaturewithoutprefix)
- [recoverEIP712TypedDataSignerRsv](signatureUtils.md#recovereip712typeddatasignerrsv)
- [recoverEIP712TypedDataSignerVrs](signatureUtils.md#recovereip712typeddatasignervrs)
- [signMessage](signatureUtils.md#signmessage)
- [signMessageWithoutPrefix](signatureUtils.md#signmessagewithoutprefix)
- [signedMessageToPublicKey](signatureUtils.md#signedmessagetopublickey)
- [verifyEIP712TypedDataSigner](signatureUtils.md#verifyeip712typeddatasigner)
- [verifySignature](signatureUtils.md#verifysignature)

## References

### NativeSigner

Renames and re-exports [__type](signatureUtils.md#__type)

___

### serializeSignature

Renames and re-exports [__type](signatureUtils.md#__type)

## Variables

### POP\_SIZE

• `Const` **POP\_SIZE**: ``65``

#### Defined in

packages/sdk/base/lib/signatureUtils.d.ts:1

___

### SignatureUtils

• `Const` **SignatureUtils**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `LocalSigner` | (`privateKey`: `string`) => [`Signer`](../interfaces/signatureUtils.Signer.md) |
| `NativeSigner` | (`signFn`: (`message`: `string`, `signer`: `string`) => `Promise`\<`string`\>, `signer`: `string`) => [`Signer`](../interfaces/signatureUtils.Signer.md) |
| `parseSignature` | (`message`: `string`, `signature`: `string`, `signer`: `string`) => \{ `r`: `string` ; `s`: `string` ; `v`: `number`  } |
| `parseSignatureWithoutPrefix` | (`messageHash`: `string`, `signature`: `string`, `signer`: `string`) => \{ `r`: `string` ; `s`: `string` ; `v`: `number`  } |
| `recoverEIP712TypedDataSignerRsv` | (`typedData`: [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md), `signature`: `string`) => `string` |
| `recoverEIP712TypedDataSignerVrs` | (`typedData`: [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md), `signature`: `string`) => `string` |
| `serializeSignature` | (`signature`: [`Signature`](../interfaces/signatureUtils.Signature.md)) => `string` |
| `signMessage` | (`message`: `string`, `privateKey`: `string`, `address`: `string`) => \{ `r`: `string` ; `s`: `string` ; `v`: `number`  } |
| `signMessageWithoutPrefix` | (`messageHash`: `string`, `privateKey`: `string`, `address`: `string`) => \{ `r`: `string` ; `s`: `string` ; `v`: `number`  } |
| `verifyEIP712TypedDataSigner` | (`typedData`: [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md), `signature`: `string`, `signer`: `string`) => `boolean` |

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:235](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L235)

## Functions

### LocalSigner

▸ **LocalSigner**(`privateKey`): [`Signer`](../interfaces/signatureUtils.Signer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

[`Signer`](../interfaces/signatureUtils.Signer.md)

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L64)

___

### addressToPublicKey

▸ **addressToPublicKey**(`signer`, `signFn`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `string` |
| `signFn` | (`message`: `string`, `signer`: `string`) => `Promise`\<`string`\> |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L43)

___

### guessSigner

▸ **guessSigner**(`message`, `signature`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `signature` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:196](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L196)

___

### hashMessage

▸ **hashMessage**(`message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L39)

___

### hashMessageWithPrefix

▸ **hashMessageWithPrefix**(`message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L34)

___

### parseSignature

▸ **parseSignature**(`message`, `signature`, `signer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `signature` | `string` |
| `signer` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `string` |
| `s` | `string` |
| `v` | `number` |

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L113)

___

### parseSignatureWithoutPrefix

▸ **parseSignatureWithoutPrefix**(`messageHash`, `signature`, `signer`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageHash` | `string` |
| `signature` | `string` |
| `signer` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `string` |
| `s` | `string` |
| `v` | `number` |

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L117)

___

### recoverEIP712TypedDataSignerRsv

▸ **recoverEIP712TypedDataSignerRsv**(`typedData`, `signature`): `string`

Recover signer from RSV-serialized signature over signed typed data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedData` | [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md) | EIP712 typed data |
| `signature` | `string` | RSV signature of signed type data by signer |

#### Returns

`string`

string signer, or throws error if parsing fails

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:153](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L153)

___

### recoverEIP712TypedDataSignerVrs

▸ **recoverEIP712TypedDataSignerVrs**(`typedData`, `signature`): `string`

Recover signer from VRS-serialized signature over signed typed data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedData` | [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md) | EIP712 typed data |
| `signature` | `string` | VRS signature of signed type data by signer |

#### Returns

`string`

string signer, or throws error if parsing fails

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L166)

___

### signMessage

▸ **signMessage**(`message`, `privateKey`, `address`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `privateKey` | `string` |
| `address` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `string` |
| `s` | `string` |
| `v` | `number` |

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L83)

___

### signMessageWithoutPrefix

▸ **signMessageWithoutPrefix**(`messageHash`, `privateKey`, `address`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageHash` | `string` |
| `privateKey` | `string` |
| `address` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `string` |
| `s` | `string` |
| `v` | `number` |

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L91)

___

### signedMessageToPublicKey

▸ **signedMessageToPublicKey**(`message`, `v`, `r`, `s`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `v` | `number` |
| `r` | `string` |
| `s` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L73)

___

### verifyEIP712TypedDataSigner

▸ **verifyEIP712TypedDataSigner**(`typedData`, `signature`, `signer`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedData` | [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md) | EIP712 typed data |
| `signature` | `string` | VRS or SRV signature of `typedData` by `signer` |
| `signer` | `string` | address to verify signed the `typedData` |

#### Returns

`boolean`

boolean, true if `signer` is a possible signer of `signature`

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L179)

___

### verifySignature

▸ **verifySignature**(`message`, `signature`, `signer`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `signature` | `string` |
| `signer` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/utils/src/signatureUtils.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L104)
