[**@celo/viem-account-ledger v1.2.0-beta.2**](../README.md)

***

[@celo/viem-account-ledger](../globals.md) / ledgerToAccount

# Function: ledgerToAccount()

> **ledgerToAccount**(`options`): `Promise`\<\{ `address`: `` `0x${string}` ``; `nonceManager?`: `NonceManager`; `publicKey`: `` `0x${string}` ``; `sign?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; `signAuthorization?`: (`parameters`) => `Promise`\<`SignAuthorizationReturnType`\>; `signMessage`: (`__namedParameters`) => `Promise`\<`` `0x${string}` ``\>; `signTransaction`: \<`serializer`, `transaction`\>(`transaction`, `options?`) => `Promise`\<`IsNarrowable`\<`TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\>, `` `0x${string}` ``\> *extends* `true` ? `TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\> : `` `0x${string}` ``\>; `signTypedData`: \<`typedData`, `primaryType`\>(`parameters`) => `Promise`\<`` `0x${string}` ``\>; `source`: `"ledger"`; `type`: `"local"`; \}\>

Defined in: [packages/viem-account-ledger/src/ledger-to-account.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/viem-account-ledger/src/ledger-to-account.ts#L45)

A function to create a ledger account for viem

## Parameters

### options

`Parameters`

## Returns

`Promise`\<\{ `address`: `` `0x${string}` ``; `nonceManager?`: `NonceManager`; `publicKey`: `` `0x${string}` ``; `sign?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; `signAuthorization?`: (`parameters`) => `Promise`\<`SignAuthorizationReturnType`\>; `signMessage`: (`__namedParameters`) => `Promise`\<`` `0x${string}` ``\>; `signTransaction`: \<`serializer`, `transaction`\>(`transaction`, `options?`) => `Promise`\<`IsNarrowable`\<`TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\>, `` `0x${string}` ``\> *extends* `true` ? `TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\> : `` `0x${string}` ``\>; `signTypedData`: \<`typedData`, `primaryType`\>(`parameters`) => `Promise`\<`` `0x${string}` ``\>; `source`: `"ledger"`; `type`: `"local"`; \}\>

a viem LocalAccount<"ledger">
