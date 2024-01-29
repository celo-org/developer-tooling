[@celo/wallet-hsm-azure](../README.md) / [azure-key-vault-client](../modules/azure_key_vault_client.md) / AzureKeyVaultClient

# Class: AzureKeyVaultClient

[azure-key-vault-client](../modules/azure_key_vault_client.md).AzureKeyVaultClient

Provides an abstraction on Azure Key Vault for performing signing operations

## Table of contents

### Constructors

- [constructor](azure_key_vault_client.AzureKeyVaultClient.md#constructor)

### Methods

- [getKeyId](azure_key_vault_client.AzureKeyVaultClient.md#getkeyid)
- [getKeys](azure_key_vault_client.AzureKeyVaultClient.md#getkeys)
- [getPublicKey](azure_key_vault_client.AzureKeyVaultClient.md#getpublickey)
- [getSecret](azure_key_vault_client.AzureKeyVaultClient.md#getsecret)
- [hasKey](azure_key_vault_client.AzureKeyVaultClient.md#haskey)
- [signMessage](azure_key_vault_client.AzureKeyVaultClient.md#signmessage)

## Constructors

### constructor

• **new AzureKeyVaultClient**(`vaultName`, `credential?`): [`AzureKeyVaultClient`](azure_key_vault_client.AzureKeyVaultClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultName` | `string` |
| `credential?` | `TokenCredential` |

#### Returns

[`AzureKeyVaultClient`](azure_key_vault_client.AzureKeyVaultClient.md)

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L44)

## Methods

### getKeyId

▸ **getKeyId**(`keyName`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L75)

___

### getKeys

▸ **getKeys**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L54)

___

### getPublicKey

▸ **getPublicKey**(`keyName`): `Promise`\<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L62)

___

### getSecret

▸ **getSecret**(`secretName`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretName` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:131](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L131)

___

### hasKey

▸ **hasKey**(`keyName`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L119)

___

### signMessage

▸ **signMessage**(`message`, `keyName`): `Promise`\<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Buffer` |
| `keyName` | `string` |

#### Returns

`Promise`\<`Signature`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L82)
