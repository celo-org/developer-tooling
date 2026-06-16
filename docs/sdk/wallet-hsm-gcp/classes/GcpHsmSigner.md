[**@celo/wallet-hsm-gcp v8.0.4**](../README.md)

***

[@celo/wallet-hsm-gcp](../README.md) / GcpHsmSigner

# Class: GcpHsmSigner

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L19)

## Implements

- `Signer`

## Constructors

### Constructor

> **new GcpHsmSigner**(`client`, `versionName`, `publicKey`): `GcpHsmSigner`

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L24)

#### Parameters

##### client

`KeyManagementServiceClient`

##### versionName

`string`

##### publicKey

`BigNumber`

#### Returns

`GcpHsmSigner`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`_publicKey`): `Promise`\<`Buffer`\>

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L119)

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

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L113)

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

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L109)

#### Returns

`string`

#### Implementation of

`Signer.getNativeKey`

***

### signPersonalMessage()

> **signPersonalMessage**(`data`): `Promise`\<`Signature`\>

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L82)

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

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L70)

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

Defined in: [wallet-hsm-gcp/src/gcp-hsm-signer.ts:98](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-gcp/src/gcp-hsm-signer.ts#L98)

#### Parameters

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<`Signature`\>

#### Implementation of

`Signer.signTypedData`
