[**@celo/viem-account-ledger v1.2.0-beta.3**](../README.md)

***

[@celo/viem-account-ledger](../globals.md) / ledgerToWalletClient

# Function: ledgerToWalletClient()

> **ledgerToWalletClient**\<`T`\>(`__namedParameters`): `Promise`\<[`LedgerWalletClient`](../type-aliases/LedgerWalletClient.md)\<`T`\>\>

Defined in: [packages/viem-account-ledger/src/ledger-to-wallet-client.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/viem-account-ledger/src/ledger-to-wallet-client.ts#L8)

## Type Parameters

### T

`T` *extends* `undefined` \| `Chain` = `undefined`

## Parameters

### \_\_namedParameters

#### account?

`` `0x${string}` ``

#### baseDerivationPath?

`string` = `DEFAULT_DERIVATION_PATH`

#### changeIndexes?

`number`[] = `...`

#### derivationPathIndexes?

`number`[] = `...`

#### ledgerAddressValidation?

[`AddressValidation`](../enumerations/AddressValidation.md)

#### transport

`TransportNodeHid`

#### walletClientOptions

`Omit`\<\{ `account?`: `` `0x${string}` `` \| `Account`; `cacheTime?`: `number`; `ccipRead?`: `false` \| \{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \}; `chain?`: `Chain` \| `T`; `key?`: `string`; `name?`: `string`; `pollingInterval?`: `number`; `rpcSchema?`: `undefined`; `transport`: `Transport`; \}, `"account"`\>

## Returns

`Promise`\<[`LedgerWalletClient`](../type-aliases/LedgerWalletClient.md)\<`T`\>\>
