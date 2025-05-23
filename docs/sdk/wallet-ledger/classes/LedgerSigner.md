[**@celo/wallet-ledger v8.0.0-beta.2**](../README.md)

***

[@celo/wallet-ledger](../README.md) / LedgerSigner

# Class: LedgerSigner

Defined in: [wallet-ledger/src/ledger-signer.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L19)

Signs the EVM transaction with a Ledger device

## Implements

- `Signer`

## Constructors

### Constructor

> **new LedgerSigner**(`ledger`, `derivationPath`, `ledgerAddressValidation`, `appConfiguration`): `LedgerSigner`

Defined in: [wallet-ledger/src/ledger-signer.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L26)

#### Parameters

##### ledger

`Eth`

##### derivationPath

`string`

##### ledgerAddressValidation

[`AddressValidation`](../enumerations/AddressValidation.md)

##### appConfiguration

###### appName

`string`

###### arbitraryDataEnabled

`number`

###### version

`string`

#### Returns

`LedgerSigner`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`_publicKey`): `Promise`\<`Buffer`\>

Defined in: [wallet-ledger/src/ledger-signer.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L212)

#### Parameters

##### \_publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`Signer.computeSharedSecret`

***

### decrypt()

> **decrypt**(`_ciphertext`): `Promise`\<`Buffer`\>

Defined in: [wallet-ledger/src/ledger-signer.ts:206](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L206)

#### Parameters

##### \_ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`Signer.decrypt`

***

### getNativeKey()

> **getNativeKey**(): `string`

Defined in: [wallet-ledger/src/ledger-signer.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L42)

#### Returns

`string`

#### Implementation of

`Signer.getNativeKey`

***

### signPersonalMessage()

> **signPersonalMessage**(`data`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-ledger/src/ledger-signer.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L97)

#### Parameters

##### data

`string`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`_addToV`, `encodedTx`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-ledger/src/ledger-signer.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L46)

Signs the message and returns an EVM transaction

#### Parameters

##### \_addToV

`number`

##### encodedTx

is the RLPEncoded transaction object

`RLPEncodedTx` | `LegacyEncodedTx`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signTransaction`

***

### signTypedData()

> **signTypedData**(`typedData`): `Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

Defined in: [wallet-ledger/src/ledger-signer.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L117)

#### Parameters

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<\{ `r`: `Buffer`; `s`: `Buffer`; `v`: `number`; \}\>

#### Implementation of

`Signer.signTypedData`
