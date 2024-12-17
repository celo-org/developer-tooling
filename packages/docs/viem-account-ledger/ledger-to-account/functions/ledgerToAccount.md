[**@celo/viem-account-ledger**](../../README.md)

***

[@celo/viem-account-ledger](../../modules.md) / [ledger-to-account](../README.md) / ledgerToAccount

# Function: ledgerToAccount()

> **ledgerToAccount**(`options`): `Promise`\<[`LedgerAccount`](../type-aliases/LedgerAccount.md)\>

A function to create a ledger account for viem

## Parameters

### options

#### baseDerivationPath

`string` = `DEFAULT_DERIVATION_PATH`

defaults to "m/44'/60'/0"

#### derivationPathIndex

`string` \| `number` = `0`

aka addressIndex

#### transport

`TransportNodeHid`

a Ledger Transport

## Returns

`Promise`\<[`LedgerAccount`](../type-aliases/LedgerAccount.md)\>

a viem LocalAccount<"ledger">

## Defined in

[ledger-to-account.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/viem-account-ledger/src/ledger-to-account.ts#L25)
