[@celo/wallet-ledger](../README.md) / ledger-wallet

# Module: ledger-wallet

## Table of contents

### Enumerations

- [AddressValidation](../enums/ledger_wallet.AddressValidation.md)

### Classes

- [LedgerWallet](../classes/ledger_wallet.LedgerWallet.md)

### Variables

- [CELO\_BASE\_DERIVATION\_PATH](ledger_wallet.md#celo_base_derivation_path)

### Functions

- [newLedgerWalletWithSetup](ledger_wallet.md#newledgerwalletwithsetup)

## Variables

### CELO\_BASE\_DERIVATION\_PATH

• `Const` **CELO\_BASE\_DERIVATION\_PATH**: `string`

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L20)

## Functions

### newLedgerWalletWithSetup

▸ **newLedgerWalletWithSetup**(`transport`, `derivationPathIndexes?`, `baseDerivationPath?`, `ledgerAddressValidation?`, `isCel2?`): `Promise`\<[`LedgerWallet`](../classes/ledger_wallet.LedgerWallet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transport` | `any` |
| `derivationPathIndexes?` | `number`[] |
| `baseDerivationPath?` | `string` |
| `ledgerAddressValidation?` | [`AddressValidation`](../enums/ledger_wallet.AddressValidation.md) |
| `isCel2?` | `boolean` |

#### Returns

`Promise`\<[`LedgerWallet`](../classes/ledger_wallet.LedgerWallet.md)\>

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-wallet.ts#L35)
