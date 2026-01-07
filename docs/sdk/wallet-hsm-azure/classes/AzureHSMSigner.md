[**@celo/wallet-hsm-azure v8.0.3**](../README.md)

***

[@celo/wallet-hsm-azure](../README.md) / AzureHSMSigner

# Class: AzureHSMSigner

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L11)

Signs the EVM transaction using an HSM key in Azure Key Vault

## Implements

- `Signer`

## Constructors

### Constructor

> **new AzureHSMSigner**(`keyVaultClient`, `keyName`): `AzureHSMSigner`

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L15)

#### Parameters

##### keyVaultClient

[`AzureKeyVaultClient`](AzureKeyVaultClient.md)

##### keyName

`string`

#### Returns

`AzureHSMSigner`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`_publicKey`): `Promise`\<`Buffer`\>

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L81)

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

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L75)

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

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L71)

#### Returns

`string`

#### Implementation of

`Signer.getNativeKey`

***

### signPersonalMessage()

> **signPersonalMessage**(`data`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L39)

#### Parameters

##### data

`string`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`addToV`, `encodedTx`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L23)

Signs the message and returns an EVM transaction

#### Parameters

##### addToV

`number`

represents the chainId and is added to the recoveryId to prevent replay

##### encodedTx

`RLPEncodedTx`

is the RLPEncoded transaction object

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signTransaction`

***

### signTypedData()

> **signTypedData**(`typedData`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-hsm-azure/src/azure-hsm-signer.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L57)

#### Parameters

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signTypedData`
