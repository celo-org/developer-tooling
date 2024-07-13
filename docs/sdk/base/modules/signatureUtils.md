[@celo/base](../README.md) / signatureUtils

# Module: signatureUtils

## Table of contents

### Interfaces

- [Signature](../interfaces/signatureUtils.Signature.md)
- [Signer](../interfaces/signatureUtils.Signer.md)

### Variables

- [POP\_SIZE](signatureUtils.md#pop_size)
- [SignatureBase](signatureUtils.md#signaturebase)

### Functions

- [NativeSigner](signatureUtils.md#nativesigner)
- [serializeSignature](signatureUtils.md#serializesignature)

## Variables

### POP\_SIZE

• `Const` **POP\_SIZE**: ``65``

#### Defined in

[packages/sdk/base/src/signatureUtils.ts:1](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/signatureUtils.ts#L1)

___

### SignatureBase

• `Const` **SignatureBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `NativeSigner` | (`signFn`: (`message`: `string`, `signer`: `string`) => `Promise`\<`string`\>, `signer`: `string`) => [`Signer`](../interfaces/signatureUtils.Signer.md) |
| `serializeSignature` | (`signature`: [`Signature`](../interfaces/signatureUtils.Signature.md)) => `string` |

#### Defined in

[packages/sdk/base/src/signatureUtils.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/signatureUtils.ts#L33)

## Functions

### NativeSigner

▸ **NativeSigner**(`signFn`, `signer`): [`Signer`](../interfaces/signatureUtils.Signer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signFn` | (`message`: `string`, `signer`: `string`) => `Promise`\<`string`\> |
| `signer` | `string` |

#### Returns

[`Signer`](../interfaces/signatureUtils.Signer.md)

#### Defined in

[packages/sdk/base/src/signatureUtils.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/signatureUtils.ts#L8)

___

### serializeSignature

▸ **serializeSignature**(`signature`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | [`Signature`](../interfaces/signatureUtils.Signature.md) |

#### Returns

`string`

#### Defined in

[packages/sdk/base/src/signatureUtils.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/signatureUtils.ts#L26)
