[**@celo/utils v8.0.3-beta.0**](../README.md)

***

[@celo/utils](../README.md) / SignatureUtils

# Variable: SignatureUtils

> `const` **SignatureUtils**: `object`

Defined in: [packages/sdk/utils/src/signatureUtils.ts:235](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/signatureUtils.ts#L235)

## Type declaration

### LocalSigner()

> **LocalSigner**: (`privateKey`) => `Signer`

#### Parameters

##### privateKey

`string`

#### Returns

`Signer`

### NativeSigner()

> **NativeSigner**: (`signFn`, `signer`) => `Signer`

#### Parameters

##### signFn

(`message`, `signer`) => `Promise`\<`string`\>

##### signer

`string`

#### Returns

`Signer`

### parseSignature()

> **parseSignature**: (`message`, `signature`, `signer`) => `object`

#### Parameters

##### message

`string`

##### signature

`string`

##### signer

`string`

#### Returns

`object`

##### r

> **r**: `string`

##### s

> **s**: `string`

##### v

> **v**: `number`

### parseSignatureWithoutPrefix()

> **parseSignatureWithoutPrefix**: (`messageHash`, `signature`, `signer`) => `object`

#### Parameters

##### messageHash

`string`

##### signature

`string`

##### signer

`string`

#### Returns

`object`

##### r

> **r**: `string`

##### s

> **s**: `string`

##### v

> **v**: `number`

### recoverEIP712TypedDataSignerRsv()

> **recoverEIP712TypedDataSignerRsv**: (`typedData`, `signature`) => `string`

Recover signer from RSV-serialized signature over signed typed data.

#### Parameters

##### typedData

`EIP712TypedData`

EIP712 typed data

##### signature

`string`

RSV signature of signed type data by signer

#### Returns

`string`

string signer, or throws error if parsing fails

### recoverEIP712TypedDataSignerVrs()

> **recoverEIP712TypedDataSignerVrs**: (`typedData`, `signature`) => `string`

Recover signer from VRS-serialized signature over signed typed data.

#### Parameters

##### typedData

`EIP712TypedData`

EIP712 typed data

##### signature

`string`

VRS signature of signed type data by signer

#### Returns

`string`

string signer, or throws error if parsing fails

### serializeSignature()

> **serializeSignature**: (`signature`) => `string`

#### Parameters

##### signature

`Signature`

#### Returns

`string`

### signMessage()

> **signMessage**: (`message`, `privateKey`, `address`) => `object`

#### Parameters

##### message

`string`

##### privateKey

`string`

##### address

`string`

#### Returns

`object`

##### r

> **r**: `string`

##### s

> **s**: `string`

##### v

> **v**: `number`

### signMessageWithoutPrefix()

> **signMessageWithoutPrefix**: (`messageHash`, `privateKey`, `address`) => `object`

#### Parameters

##### messageHash

`string`

##### privateKey

`string`

##### address

`string`

#### Returns

`object`

##### r

> **r**: `string`

##### s

> **s**: `string`

##### v

> **v**: `number`

### verifyEIP712TypedDataSigner()

> **verifyEIP712TypedDataSigner**: (`typedData`, `signature`, `signer`) => `boolean`

#### Parameters

##### typedData

`EIP712TypedData`

EIP712 typed data

##### signature

`string`

VRS or SRV signature of `typedData` by `signer`

##### signer

`string`

address to verify signed the `typedData`

#### Returns

`boolean`

boolean, true if `signer` is a possible signer of `signature`
