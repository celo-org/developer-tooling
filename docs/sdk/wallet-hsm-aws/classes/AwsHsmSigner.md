[**@celo/wallet-hsm-aws v7.0.2-beta.0**](../README.md)

***

[@celo/wallet-hsm-aws](../README.md) / AwsHsmSigner

# Class: AwsHsmSigner

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L20)

## Implements

- `Signer`

## Constructors

### Constructor

> **new AwsHsmSigner**(`kms`, `keyId`, `publicKey`): `AwsHsmSigner`

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L25)

#### Parameters

##### kms

`KMS`

##### keyId

`string`

##### publicKey

`BigNumber`

#### Returns

`AwsHsmSigner`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`_publicKey`): `Promise`\<`Buffer`\>

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L117)

#### Parameters

##### \_publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`Signer.computeSharedSecret`

***

### decrypt()

> **decrypt**(`_ciphertext`): `Promise`\<`Buffer`\>

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L111)

#### Parameters

##### \_ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`Signer.decrypt`

***

### getNativeKey()

> **getNativeKey**(): `string`

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L107)

#### Returns

`string`

#### Implementation of

`Signer.getNativeKey`

***

### signPersonalMessage()

> **signPersonalMessage**(`data`): `Promise`\<`Signature`\>

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L84)

#### Parameters

##### data

`string`

#### Returns

`Promise`\<`Signature`\>

#### Implementation of

`Signer.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`addToV`, `encodedTx`): `Promise`\<`Signature`\>

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L72)

Signs the message and returns an EVM transaction

#### Parameters

##### addToV

`number`

represents the chainId and is added to the recoveryId to prevent replay

##### encodedTx

`RLPEncodedTx`

is the RLPEncoded transaction object

#### Returns

`Promise`\<`Signature`\>

#### Implementation of

`Signer.signTransaction`

***

### signTypedData()

> **signTypedData**(`typedData`): `Promise`\<`Signature`\>

Defined in: [wallet-hsm-aws/src/aws-hsm-signer.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-signer.ts#L96)

#### Parameters

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<`Signature`\>

#### Implementation of

`Signer.signTypedData`
