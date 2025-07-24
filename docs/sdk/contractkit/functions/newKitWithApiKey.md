[**@celo/contractkit v10.0.1-cc13.0**](../README.md)

***

[@celo/contractkit](../globals.md) / newKitWithApiKey

# Function: newKitWithApiKey()

> **newKitWithApiKey**(`url`, `apiKey`, `wallet?`): [`ContractKit`](../classes/ContractKit.md)

Defined in: [contractkit/src/kit.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L48)

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

to reuse or add a wallet different than the default (example ledger-wallet)

## Returns

[`ContractKit`](../classes/ContractKit.md)
