[@celo/wallet-hsm-azure](../README.md) / [azure-hsm-signer](../modules/azure_hsm_signer.md) / AzureHSMSigner

# Class: AzureHSMSigner

[azure-hsm-signer](../modules/azure_hsm_signer.md).AzureHSMSigner

Signs the EVM transaction using an HSM key in Azure Key Vault

## Implements

- `Signer`

## Table of contents

### Constructors

- [constructor](azure_hsm_signer.AzureHSMSigner.md#constructor)

### Methods

- [computeSharedSecret](azure_hsm_signer.AzureHSMSigner.md#computesharedsecret)
- [decrypt](azure_hsm_signer.AzureHSMSigner.md#decrypt)
- [getNativeKey](azure_hsm_signer.AzureHSMSigner.md#getnativekey)
- [signPersonalMessage](azure_hsm_signer.AzureHSMSigner.md#signpersonalmessage)
- [signTransaction](azure_hsm_signer.AzureHSMSigner.md#signtransaction)
- [signTypedData](azure_hsm_signer.AzureHSMSigner.md#signtypeddata)

## Constructors

### constructor

• **new AzureHSMSigner**(`keyVaultClient`, `keyName`): [`AzureHSMSigner`](azure_hsm_signer.AzureHSMSigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyVaultClient` | [`AzureKeyVaultClient`](azure_key_vault_client.AzureKeyVaultClient.md) |
| `keyName` | `string` |

#### Returns

[`AzureHSMSigner`](azure_hsm_signer.AzureHSMSigner.md)

#### Defined in

[wallet-hsm-azure/src/azure-hsm-signer.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L15)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L81)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L75)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-hsm-azure/src/azure-hsm-signer.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L71)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L39)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L23)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-hsm-signer.ts#L57)
