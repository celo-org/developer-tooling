[@celo/wallet-ledger](../README.md) / [tokens](../modules/tokens.md) / API

# Interface: API

[tokens](../modules/tokens.md).API

## Table of contents

### Properties

- [byContractKey](tokens.API.md#bycontractkey)
- [list](tokens.API.md#list)

## Properties

### byContractKey

• **byContractKey**: (`arg0`: `string`) => `undefined` \| ``null`` \| [`TokenInfo`](tokens.TokenInfo.md)

#### Type declaration

▸ (`arg0`): `undefined` \| ``null`` \| [`TokenInfo`](tokens.TokenInfo.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `string` |

##### Returns

`undefined` \| ``null`` \| [`TokenInfo`](tokens.TokenInfo.md)

#### Defined in

[wallet-ledger/src/tokens.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L45)

___

### list

• **list**: () => [`TokenInfo`](tokens.TokenInfo.md)[]

#### Type declaration

▸ (): [`TokenInfo`](tokens.TokenInfo.md)[]

##### Returns

[`TokenInfo`](tokens.TokenInfo.md)[]

#### Defined in

[wallet-ledger/src/tokens.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L46)
