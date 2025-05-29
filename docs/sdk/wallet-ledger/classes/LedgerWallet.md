[**@celo/wallet-ledger v8.0.0-beta.2**](../README.md)

***

[@celo/wallet-ledger](../README.md) / LedgerWallet

# Class: LedgerWallet

Defined in: [wallet-ledger/src/ledger-wallet.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L60)

## Extends

- `RemoteWallet`\<[`LedgerSigner`](LedgerSigner.md)\>

## Implements

- `ReadOnlyWallet`

## Constructors

### Constructor

> **new LedgerWallet**(`transport`, `derivationPathIndexes`, `baseDerivationPath`, `changeIndexes`, `ledgerAddressValidation`): `LedgerWallet`

Defined in: [wallet-ledger/src/ledger-wallet.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L78)

#### Parameters

##### transport

`any` = `{}`

Transport to connect the ledger device

##### derivationPathIndexes

`number`[] = `...`

number array of "address_index" for the base derivation path.
Default: Array[0..5].
Example: [3, 99, 53] will retrieve the derivation paths of
[`${baseDerivationPath}/0/3`, `${baseDerivationPath}/0/99`, `${baseDerivationPath}/0/53`]

##### baseDerivationPath

`string` = `CELO_BASE_DERIVATION_PATH`

base derivation path. Default: "44'/52752'/0'"

##### changeIndexes

`number`[] = `...`

number array of "change" for the base derivation path.
Default: [0].
Example: [0, 1] will retrieve the derivation paths of [`${baseDerivationPath}/0/${address_index}`, `${baseDerivationPath}/1/${address_index}`, `${baseDerivationPath}/2/${address_index}`]

##### ledgerAddressValidation

[`AddressValidation`](../enumerations/AddressValidation.md) = `AddressValidation.firstTransactionPerAddress`

AddressValidation enum to validate addresses. Default: AddressValidation.firstTransactionPerAddress

#### Returns

`LedgerWallet`

#### Overrides

`RemoteWallet<LedgerSigner>.constructor`

## Properties

### baseDerivationPath

> `readonly` **baseDerivationPath**: `string` = `CELO_BASE_DERIVATION_PATH`

Defined in: [wallet-ledger/src/ledger-wallet.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L81)

base derivation path. Default: "44'/52752'/0'"

***

### changeIndexes

> `readonly` **changeIndexes**: `number`[]

Defined in: [wallet-ledger/src/ledger-wallet.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L82)

number array of "change" for the base derivation path.
Default: [0].
Example: [0, 1] will retrieve the derivation paths of [`${baseDerivationPath}/0/${address_index}`, `${baseDerivationPath}/1/${address_index}`, `${baseDerivationPath}/2/${address_index}`]

***

### derivationPathIndexes

> `readonly` **derivationPathIndexes**: `number`[]

Defined in: [wallet-ledger/src/ledger-wallet.ts:80](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L80)

number array of "address_index" for the base derivation path.
Default: Array[0..5].
Example: [3, 99, 53] will retrieve the derivation paths of
[`${baseDerivationPath}/0/3`, `${baseDerivationPath}/0/99`, `${baseDerivationPath}/0/53`]

***

### isSetupFinished()

> **isSetupFinished**: () => `boolean`

Defined in: wallet-remote/lib/remote-wallet.d.ts:51

#### Returns

`boolean`

#### Inherited from

`RemoteWallet.isSetupFinished`

***

### ledger

> **ledger**: `undefined` \| `Eth`

Defined in: [wallet-ledger/src/ledger-wallet.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L64)

***

### ledgerAddressValidation

> `readonly` **ledgerAddressValidation**: [`AddressValidation`](../enumerations/AddressValidation.md) = `AddressValidation.firstTransactionPerAddress`

Defined in: [wallet-ledger/src/ledger-wallet.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L83)

AddressValidation enum to validate addresses. Default: AddressValidation.firstTransactionPerAddress

***

### transport

> `readonly` **transport**: `any` = `{}`

Defined in: [wallet-ledger/src/ledger-wallet.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L79)

Transport to connect the ledger device

***

### MIN\_VERSION\_EIP1559

> `static` **MIN\_VERSION\_EIP1559**: `string` = `'1.2.0'`

Defined in: [wallet-ledger/src/ledger-wallet.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L63)

***

### MIN\_VERSION\_SUPPORTED

> `static` **MIN\_VERSION\_SUPPORTED**: `string` = `'1.0.0'`

Defined in: [wallet-ledger/src/ledger-wallet.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L61)

***

### MIN\_VERSION\_TOKEN\_DATA

> `static` **MIN\_VERSION\_TOKEN\_DATA**: `string` = `'1.0.2'`

Defined in: [wallet-ledger/src/ledger-wallet.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L62)

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`address`, `publicKey`): `Promise`\<`Buffer`\>

Defined in: wallet-base/lib/wallet-base.d.ts:64

Computes the shared secret (an ECDH key exchange object) between two accounts

#### Parameters

##### address

`string`

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`ReadOnlyWallet.computeSharedSecret`

#### Inherited from

`RemoteWallet.computeSharedSecret`

***

### decrypt()

> **decrypt**(`address`, `ciphertext`): `Promise`\<`Buffer`\>

Defined in: wallet-base/lib/wallet-base.d.ts:60

#### Parameters

##### address

`string`

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`ReadOnlyWallet.decrypt`

#### Inherited from

`RemoteWallet.decrypt`

***

### getAccounts()

> **getAccounts**(): `string`[]

Defined in: wallet-remote/lib/remote-wallet.d.ts:27

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

`ReadOnlyWallet.getAccounts`

#### Inherited from

`RemoteWallet.getAccounts`

***

### hasAccount()

> **hasAccount**(`address?`): `boolean`

Defined in: wallet-remote/lib/remote-wallet.d.ts:32

Returns true if account is in the remote wallet

#### Parameters

##### address?

`string`

Account to check

#### Returns

`boolean`

#### Implementation of

`ReadOnlyWallet.hasAccount`

#### Inherited from

`RemoteWallet.hasAccount`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: wallet-remote/lib/remote-wallet.d.ts:15

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`\<`void`\>

#### Inherited from

`RemoteWallet.init`

***

### removeAccount()

> **removeAccount**(`_address`): `void`

Defined in: wallet-base/lib/wallet-base.d.ts:23

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

##### \_address

`string`

The address of the account to be removed

#### Returns

`void`

#### Implementation of

`ReadOnlyWallet.removeAccount`

#### Inherited from

`RemoteWallet.removeAccount`

***

### rlpEncodedTxForLedger()

> **rlpEncodedTxForLedger**(`txParams`): `Promise`\<`RLPEncodedTx`\>

Defined in: [wallet-ledger/src/ledger-wallet.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L107)

#### Parameters

##### txParams

`CeloTx`

#### Returns

`Promise`\<`RLPEncodedTx`\>

***

### signPersonalMessage()

> **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

Defined in: wallet-remote/lib/remote-wallet.d.ts:43

#### Parameters

##### address

`string`

Address of the account to sign with

##### data

`string`

Hex string message to sign

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

`ReadOnlyWallet.signPersonalMessage`

#### Inherited from

`RemoteWallet.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Defined in: [wallet-ledger/src/ledger-wallet.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L95)

Signs the EVM transaction using the signer pulled from the from field

#### Parameters

##### txParams

`CeloTx`

EVM transaction

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

`ReadOnlyWallet.signTransaction`

#### Overrides

`RemoteWallet.signTransaction`

***

### signTypedData()

> **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

Defined in: wallet-remote/lib/remote-wallet.d.ts:49

#### Parameters

##### address

`string`

Address of the account to sign with

##### typedData

`EIP712TypedData`

the typed data object

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

`ReadOnlyWallet.signTypedData`

#### Inherited from

`RemoteWallet.signTypedData`
