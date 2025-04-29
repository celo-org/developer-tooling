[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [mini-kit](../README.md) / newKit

# Function: newKit()

> **newKit**(`url`, `wallet?`, `options?`): [`MiniContractKit`](../classes/MiniContractKit.md)

Defined in: [packages/sdk/contractkit/src/mini-kit.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/mini-kit.ts#L21)

Creates a new instance of `MiniMiniContractKit` given a nodeUrl

## Parameters

### url

`string`

CeloBlockchain node url

### wallet?

`ReadOnlyWallet`

### options?

`HttpProviderOptions`

## Returns

[`MiniContractKit`](../classes/MiniContractKit.md)

## Optional

wallet to reuse or add a wallet different than the default (example ledger-wallet)

## Optional

options to pass to the Web3 HttpProvider constructor
