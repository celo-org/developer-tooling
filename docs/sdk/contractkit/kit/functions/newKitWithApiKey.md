[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [kit](../README.md) / newKitWithApiKey

# Function: newKitWithApiKey()

> **newKitWithApiKey**(`url`, `apiKey`, `wallet?`): [`ContractKit`](../classes/ContractKit.md)

Defined in: [packages/sdk/contractkit/src/kit.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L47)

Creates a new instance of `ContractKit` given a nodeUrl and apiKey

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

[`ContractKit`](../classes/ContractKit.md)

## Optional

wallet to reuse or add a wallet different than the default (example ledger-wallet)
