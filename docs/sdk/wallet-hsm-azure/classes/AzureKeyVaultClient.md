[**@celo/wallet-hsm-azure v8.0.0-beta.3**](../README.md)

***

[@celo/wallet-hsm-azure](../README.md) / AzureKeyVaultClient

# Class: AzureKeyVaultClient

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L32)

Provides an abstraction on Azure Key Vault for performing signing operations

## Constructors

### Constructor

> **new AzureKeyVaultClient**(`vaultName`, `credential?`): `AzureKeyVaultClient`

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L44)

#### Parameters

##### vaultName

`string`

##### credential?

`TokenCredential`

#### Returns

`AzureKeyVaultClient`

## Methods

### getKeyId()

> **getKeyId**(`keyName`): `Promise`\<`string`\>

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L75)

#### Parameters

##### keyName

`string`

#### Returns

`Promise`\<`string`\>

***

### getKeys()

> **getKeys**(): `Promise`\<`string`[]\>

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L54)

#### Returns

`Promise`\<`string`[]\>

***

### getPublicKey()

> **getPublicKey**(`keyName`): `Promise`\<`BigNumber`\>

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L62)

#### Parameters

##### keyName

`string`

#### Returns

`Promise`\<`BigNumber`\>

***

### getSecret()

> **getSecret**(`secretName`): `Promise`\<`string`\>

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:131](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L131)

#### Parameters

##### secretName

`string`

#### Returns

`Promise`\<`string`\>

***

### hasKey()

> **hasKey**(`keyName`): `Promise`\<`boolean`\>

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L119)

#### Parameters

##### keyName

`string`

#### Returns

`Promise`\<`boolean`\>

***

### signMessage()

> **signMessage**(`message`, `keyName`): `Promise`\<`Signature`\>

Defined in: [wallet-hsm-azure/src/azure-key-vault-client.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-azure/src/azure-key-vault-client.ts#L82)

#### Parameters

##### message

`Buffer`

##### keyName

`string`

#### Returns

`Promise`\<`Signature`\>
