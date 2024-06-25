[@celo/wallet-ledger](../README.md) / ledger-utils

# Module: ledger-utils

## Table of contents

### Functions

- [meetsVersionRequirements](ledger_utils.md#meetsversionrequirements)
- [transportErrorFriendlyMessage](ledger_utils.md#transporterrorfriendlymessage)

## Functions

### meetsVersionRequirements

▸ **meetsVersionRequirements**(`version`, `«destructured»`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `string` \| `SemVer` |
| `«destructured»` | `Object` |
| › `inclusive?` | `boolean` |
| › `maximum?` | `string` \| `SemVer` |
| › `minimum?` | `string` \| `SemVer` |

#### Returns

`boolean`

#### Defined in

[wallet-ledger/src/ledger-utils.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-utils.ts#L17)

___

### transportErrorFriendlyMessage

▸ **transportErrorFriendlyMessage**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`void`

#### Defined in

[wallet-ledger/src/ledger-utils.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/ledger-utils.ts#L6)
