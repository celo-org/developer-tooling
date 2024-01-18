[@celo/contractkit](../README.md) / [Exports](../modules.md) / mini-kit

# Module: mini-kit

## Table of contents

### Classes

- [MiniContractKit](../classes/mini_kit.MiniContractKit.md)

### Variables

- [ContractKit](mini_kit.md#contractkit)

### Functions

- [newKit](mini_kit.md#newkit)
- [newKitFromWeb3](mini_kit.md#newkitfromweb3)
- [newKitWithApiKey](mini_kit.md#newkitwithapikey)

## Variables

### ContractKit

• `Const` **ContractKit**: typeof [`MiniContractKit`](../classes/mini_kit.MiniContractKit.md) = `MiniContractKit`

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L82)

## Functions

### newKit

▸ **newKit**(`url`, `wallet?`, `options?`): [`MiniContractKit`](../classes/mini_kit.MiniContractKit.md)

Creates a new instance of `MiniMiniContractKit` given a nodeUrl

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | CeloBlockchain node url |
| `wallet?` | `ReadOnlyWallet` | - |
| `options?` | `HttpProviderOptions` | - |

#### Returns

[`MiniContractKit`](../classes/mini_kit.MiniContractKit.md)

**`Optional`**

wallet to reuse or add a wallet different than the default (example ledger-wallet)

**`Optional`**

options to pass to the Web3 HttpProvider constructor

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L21)

___

### newKitFromWeb3

▸ **newKitFromWeb3**(`web3`, `wallet?`): [`MiniContractKit`](../classes/mini_kit.MiniContractKit.md)

Creates a new instance of the `MiniContractKit` with a web3 instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | Web3 instance |
| `wallet` | `ReadOnlyWallet` | - |

#### Returns

[`MiniContractKit`](../classes/mini_kit.MiniContractKit.md)

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L41)

___

### newKitWithApiKey

▸ **newKitWithApiKey**(`url`, `apiKey`, `wallet?`): [`MiniContractKit`](../classes/mini_kit.MiniContractKit.md)

Creates a new instance of `MiniContractKit` given a nodeUrl and apiKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | CeloBlockchain node url |
| `apiKey` | `string` | to include in the http request header |
| `wallet?` | `ReadOnlyWallet` | - |

#### Returns

[`MiniContractKit`](../classes/mini_kit.MiniContractKit.md)

**`Optional`**

wallet to reuse or add a wallet different than the default (example ledger-wallet)

#### Defined in

[packages/sdk/contractkit/src/mini-kit.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L32)
