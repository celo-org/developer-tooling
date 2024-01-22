[@celo/wallet-ledger](../README.md) / [ledger-wallet](../modules/ledger_wallet.md) / LedgerWallet

# Class: LedgerWallet

[ledger-wallet](../modules/ledger_wallet.md).LedgerWallet

## Hierarchy

- `RemoteWallet`\<[`LedgerSigner`](ledger_signer.LedgerSigner.md)\>

  ↳ **`LedgerWallet`**

## Implements

- `ReadOnlyWallet`

## Table of contents

### Constructors

- [constructor](ledger_wallet.LedgerWallet.md#constructor)

### Properties

- [baseDerivationPath](ledger_wallet.LedgerWallet.md#basederivationpath)
- [derivationPathIndexes](ledger_wallet.LedgerWallet.md#derivationpathindexes)
- [isSetupFinished](ledger_wallet.LedgerWallet.md#issetupfinished)
- [ledgerAddressValidation](ledger_wallet.LedgerWallet.md#ledgeraddressvalidation)
- [transport](ledger_wallet.LedgerWallet.md#transport)

### Methods

- [computeSharedSecret](ledger_wallet.LedgerWallet.md#computesharedsecret)
- [decrypt](ledger_wallet.LedgerWallet.md#decrypt)
- [getAccounts](ledger_wallet.LedgerWallet.md#getaccounts)
- [hasAccount](ledger_wallet.LedgerWallet.md#hasaccount)
- [init](ledger_wallet.LedgerWallet.md#init)
- [removeAccount](ledger_wallet.LedgerWallet.md#removeaccount)
- [signPersonalMessage](ledger_wallet.LedgerWallet.md#signpersonalmessage)
- [signTransaction](ledger_wallet.LedgerWallet.md#signtransaction)
- [signTypedData](ledger_wallet.LedgerWallet.md#signtypeddata)

## Constructors

### constructor

• **new LedgerWallet**(`derivationPathIndexes?`, `baseDerivationPath?`, `transport?`, `ledgerAddressValidation?`): [`LedgerWallet`](ledger_wallet.LedgerWallet.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `derivationPathIndexes` | `number`[] | `undefined` | number array of "address_index" for the base derivation path. Default: Array[0..9]. Example: [3, 99, 53] will retrieve the derivation paths of [`${baseDerivationPath}/3`, `${baseDerivationPath}/99`, `${baseDerivationPath}/53`] |
| `baseDerivationPath` | `string` | `CELO_BASE_DERIVATION_PATH` | base derivation path. Default: "44'/52752'/0'/0" |
| `transport` | `any` | `{}` | Transport to connect the ledger device |
| `ledgerAddressValidation` | [`AddressValidation`](../enums/ledger_wallet.AddressValidation.md) | `AddressValidation.firstTransactionPerAddress` | - |

#### Returns

[`LedgerWallet`](ledger_wallet.LedgerWallet.md)

#### Overrides

RemoteWallet\&lt;LedgerSigner\&gt;.constructor

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L55)

## Properties

### baseDerivationPath

• `Readonly` **baseDerivationPath**: `string` = `CELO_BASE_DERIVATION_PATH`

base derivation path. Default: "44'/52752'/0'/0"

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L57)

___

### derivationPathIndexes

• `Readonly` **derivationPathIndexes**: `number`[]

number array of "address_index" for the base derivation path.
Default: Array[0..9].
Example: [3, 99, 53] will retrieve the derivation paths of
[`${baseDerivationPath}/3`, `${baseDerivationPath}/99`, `${baseDerivationPath}/53`]

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L56)

___

### isSetupFinished

• **isSetupFinished**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Inherited from

RemoteWallet.isSetupFinished

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:51

___

### ledgerAddressValidation

• `Readonly` **ledgerAddressValidation**: [`AddressValidation`](../enums/ledger_wallet.AddressValidation.md) = `AddressValidation.firstTransactionPerAddress`

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L59)

___

### transport

• `Readonly` **transport**: `any` = `{}`

Transport to connect the ledger device

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L58)

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`address`, `publicKey`): `Promise`\<`Buffer`\>

Computes the shared secret (an ECDH key exchange object) between two accounts

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

ReadOnlyWallet.computeSharedSecret

#### Inherited from

RemoteWallet.computeSharedSecret

#### Defined in

wallet-base/lib/wallet-base.d.ts:64

___

### decrypt

▸ **decrypt**(`address`, `ciphertext`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `ciphertext` | `Buffer` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

ReadOnlyWallet.decrypt

#### Inherited from

RemoteWallet.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

ReadOnlyWallet.getAccounts

#### Inherited from

RemoteWallet.getAccounts

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:27

___

### hasAccount

▸ **hasAccount**(`address?`): `boolean`

Returns true if account is in the remote wallet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address?` | `string` | Account to check |

#### Returns

`boolean`

#### Implementation of

ReadOnlyWallet.hasAccount

#### Inherited from

RemoteWallet.hasAccount

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:32

___

### init

▸ **init**(): `Promise`\<`void`\>

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`\<`void`\>

#### Inherited from

RemoteWallet.init

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:15

___

### removeAccount

▸ **removeAccount**(`_address`): `void`

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | `string` |

#### Returns

`void`

#### Implementation of

ReadOnlyWallet.removeAccount

#### Inherited from

RemoteWallet.removeAccount

#### Defined in

wallet-base/lib/wallet-base.d.ts:23

___

### signPersonalMessage

▸ **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `data` | `string` | Hex string message to sign |

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signPersonalMessage

#### Inherited from

RemoteWallet.signPersonalMessage

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:43

___

### signTransaction

▸ **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `CeloTx` |

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

ReadOnlyWallet.signTransaction

#### Overrides

RemoteWallet.signTransaction

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L70)

___

### signTypedData

▸ **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `typedData` | `EIP712TypedData` | the typed data object |

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signTypedData

#### Inherited from

RemoteWallet.signTypedData

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:49
