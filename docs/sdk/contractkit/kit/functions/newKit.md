[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [kit](../README.md) / newKit

# Function: newKit()

> **newKit**(`url`, `wallet?`, `options?`): [`ContractKit`](../classes/ContractKit.md)

Defined in: [packages/sdk/contractkit/src/kit.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L36)

Creates a new instance of `ContractKit` given a nodeUrl

## Parameters

### url

`string`

CeloBlockchain node url

### wallet?

`ReadOnlyWallet`

### options?

`HttpProviderOptions`

## Returns

[`ContractKit`](../classes/ContractKit.md)

## Optional

wallet to reuse or add a wallet different than the default (example ledger-wallet)

## Optional

options to pass to the Web3 HttpProvider constructor
