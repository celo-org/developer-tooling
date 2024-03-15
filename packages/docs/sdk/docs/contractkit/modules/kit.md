[@celo/contractkit](../README.md) / [Exports](../modules.md) / kit

# Module: kit

## Table of contents

### References

- [API\_KEY\_HEADER\_KEY](kit.md#api_key_header_key)
- [HttpProviderOptions](kit.md#httpprovideroptions)

### Classes

- [ContractKit](../classes/kit.ContractKit.md)

### Interfaces

- [NetworkConfig](../interfaces/kit.NetworkConfig.md)

### Functions

- [newKit](kit.md#newkit)
- [newKitFromWeb3](kit.md#newkitfromweb3)
- [newKitWithApiKey](kit.md#newkitwithapikey)

## References

### API\_KEY\_HEADER\_KEY

Re-exports [API_KEY_HEADER_KEY](setupForKits.md#api_key_header_key)

___

### HttpProviderOptions

Re-exports [HttpProviderOptions](setupForKits.md#httpprovideroptions)

## Functions

### newKit

▸ **newKit**(`url`, `wallet?`, `options?`): [`ContractKit`](../classes/kit.ContractKit.md)

Creates a new instance of `ContractKit` given a nodeUrl

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | CeloBlockchain node url |
| `wallet?` | `ReadOnlyWallet` | - |
| `options?` | `HttpProviderOptions` | - |

#### Returns

[`ContractKit`](../classes/kit.ContractKit.md)

**`Optional`**

wallet to reuse or add a wallet different than the default (example ledger-wallet)

**`Optional`**

options to pass to the Web3 HttpProvider constructor

#### Defined in

[packages/sdk/contractkit/src/kit.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L39)

___

### newKitFromWeb3

▸ **newKitFromWeb3**(`web3`, `wallet?`): [`ContractKit`](../classes/kit.ContractKit.md)

Creates a new instance of the `ContractKit` with a web3 instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | Web3 instance |
| `wallet` | `ReadOnlyWallet` | - |

#### Returns

[`ContractKit`](../classes/kit.ContractKit.md)

#### Defined in

[packages/sdk/contractkit/src/kit.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L59)

___

### newKitWithApiKey

▸ **newKitWithApiKey**(`url`, `apiKey`, `wallet?`): [`ContractKit`](../classes/kit.ContractKit.md)

Creates a new instance of `ContractKit` given a nodeUrl and apiKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | CeloBlockchain node url |
| `apiKey` | `string` | to include in the http request header |
| `wallet?` | `ReadOnlyWallet` | - |

#### Returns

[`ContractKit`](../classes/kit.ContractKit.md)

**`Optional`**

wallet to reuse or add a wallet different than the default (example ledger-wallet)

#### Defined in

[packages/sdk/contractkit/src/kit.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L50)
