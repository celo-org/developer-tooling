[**@celo/base**](../../README.md)

***

[@celo/base](../../README.md) / [signatureUtils](../README.md) / SignatureBase

# Variable: SignatureBase

> `const` **SignatureBase**: `object`

Defined in: [packages/sdk/base/src/signatureUtils.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/signatureUtils.ts#L33)

## Type declaration

### NativeSigner()

> **NativeSigner**: (`signFn`, `signer`) => [`Signer`](../interfaces/Signer.md)

#### Parameters

##### signFn

(`message`, `signer`) => `Promise`\<`string`\>

##### signer

`string`

#### Returns

[`Signer`](../interfaces/Signer.md)

### serializeSignature()

> **serializeSignature**: (`signature`) => `string`

#### Parameters

##### signature

[`Signature`](../interfaces/Signature.md)

#### Returns

`string`
