[**@celo/contractkit v11.0.1**](../README.md)

***

[@celo/contractkit](../globals.md) / newKit

# Function: newKit()

> **newKit**(`url`, `wallet?`, `options?`): [`ContractKit`](../classes/ContractKit.md)

Defined in: [contractkit/src/kit.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L31)

Creates a new instance of `ContractKit` given a nodeUrl

## Parameters

### url

`string`

CeloBlockchain node url

### wallet?

`ReadOnlyWallet`

to reuse or add a wallet different than the default (example ledger-wallet)

### options?

[`HttpProviderOptions`](../type-aliases/HttpProviderOptions.md)

to pass to the HttpProvider constructor

## Returns

[`ContractKit`](../classes/ContractKit.md)
