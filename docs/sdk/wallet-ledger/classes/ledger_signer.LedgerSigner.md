[@celo/wallet-ledger](../README.md) / [ledger-signer](../modules/ledger_signer.md) / LedgerSigner

# Class: LedgerSigner

[ledger-signer](../modules/ledger_signer.md).LedgerSigner

Signs the EVM transaction with a Ledger device

## Implements

- `Signer`

## Table of contents

### Constructors

- [constructor](ledger_signer.LedgerSigner.md#constructor)

### Methods

- [computeSharedSecret](ledger_signer.LedgerSigner.md#computesharedsecret)
- [decrypt](ledger_signer.LedgerSigner.md#decrypt)
- [getNativeKey](ledger_signer.LedgerSigner.md#getnativekey)
- [signPersonalMessage](ledger_signer.LedgerSigner.md#signpersonalmessage)
- [signTransaction](ledger_signer.LedgerSigner.md#signtransaction)
- [signTypedData](ledger_signer.LedgerSigner.md#signtypeddata)

## Constructors

### constructor

• **new LedgerSigner**(`ledger`, `derivationPath`, `ledgerAddressValidation`, `appConfiguration?`): [`LedgerSigner`](ledger_signer.LedgerSigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ledger` | `default` |
| `derivationPath` | `string` |
| `ledgerAddressValidation` | [`AddressValidation`](../enums/ledger_wallet.AddressValidation.md) |
| `appConfiguration` | `Object` |
| `appConfiguration.appName` | `string` |
| `appConfiguration.arbitraryDataEnabled` | `number` |
| `appConfiguration.version` | `string` |

#### Returns

[`LedgerSigner`](ledger_signer.LedgerSigner.md)

#### Defined in

[wallet-ledger/src/ledger-signer.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L26)

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`_publicKey`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_publicKey` | `string` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.computeSharedSecret

#### Defined in

[wallet-ledger/src/ledger-signer.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L212)

___

### decrypt

▸ **decrypt**(`_ciphertext`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ciphertext` | `Buffer` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.decrypt

#### Defined in

[wallet-ledger/src/ledger-signer.ts:206](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L206)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-ledger/src/ledger-signer.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L42)

___

### signPersonalMessage

▸ **signPersonalMessage**(`data`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signPersonalMessage

#### Defined in

[wallet-ledger/src/ledger-signer.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L97)

___

### signTransaction

▸ **signTransaction**(`_addToV`, `encodedTx`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_addToV` | `number` |
| `encodedTx` | `RLPEncodedTx` \| `LegacyEncodedTx` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-ledger/src/ledger-signer.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L46)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signTypedData

#### Defined in

[wallet-ledger/src/ledger-signer.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-signer.ts#L117)
