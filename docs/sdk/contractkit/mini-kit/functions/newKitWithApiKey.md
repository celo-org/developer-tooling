[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [mini-kit](../README.md) / newKitWithApiKey

# Function: newKitWithApiKey()

> **newKitWithApiKey**(`url`, `apiKey`, `wallet?`): [`MiniContractKit`](../classes/MiniContractKit.md)

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L32)

Creates a new instance of `MiniContractKit` given a nodeUrl and apiKey

## Parameters

### url

`string`

CeloBlockchain node url

### apiKey

`string`

to include in the http request header

### wallet?

`ReadOnlyWallet`

## Returns

[`MiniContractKit`](../classes/MiniContractKit.md)

## Optional

wallet to reuse or add a wallet different than the default (example ledger-wallet)
