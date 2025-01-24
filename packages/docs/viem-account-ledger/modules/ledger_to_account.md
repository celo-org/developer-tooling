[@celo/viem-account-ledger](../README.md) / [Modules](../modules.md) / ledger-to-account

# Module: ledger-to-account

## Table of contents

### Type Aliases

- [LedgerAccount](ledger_to_account.md#ledgeraccount)

### Variables

- [CELO\_BASE\_DERIVATION\_PATH](ledger_to_account.md#celo_base_derivation_path)
- [DEFAULT\_DERIVATION\_PATH](ledger_to_account.md#default_derivation_path)

### Functions

- [ledgerToAccount](ledger_to_account.md#ledgertoaccount)

## Type Aliases

### LedgerAccount

Ƭ **LedgerAccount**: `LocalAccount`\<``"ledger"``\>

#### Defined in

[ledger-to-account.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/viem-account-ledger/src/ledger-to-account.ts#L16)

## Variables

### CELO\_BASE\_DERIVATION\_PATH

• `Const` **CELO\_BASE\_DERIVATION\_PATH**: `string`

#### Defined in

[ledger-to-account.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/viem-account-ledger/src/ledger-to-account.ts#L19)

___

### DEFAULT\_DERIVATION\_PATH

• `Const` **DEFAULT\_DERIVATION\_PATH**: `string`

#### Defined in

[ledger-to-account.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/viem-account-ledger/src/ledger-to-account.ts#L20)

## Functions

### ledgerToAccount

▸ **ledgerToAccount**(`options`): `Promise`\<[`LedgerAccount`](ledger_to_account.md#ledgeraccount)\>

A function to create a ledger account for viem

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `options` | `Object` | `undefined` |  |
| `options.baseDerivationPath?` | `string` | `DEFAULT_DERIVATION_PATH` | defaults to "m/44'/60'/0" |
| `options.derivationPathIndex?` | `string` \| `number` | `0` | aka addressIndex |
| `options.transport` | `default` | `undefined` | a Ledger Transport |

#### Returns

`Promise`\<[`LedgerAccount`](ledger_to_account.md#ledgeraccount)\>

a viem LocalAccount<"ledger">

#### Defined in

[ledger-to-account.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/viem-account-ledger/src/ledger-to-account.ts#L37)
