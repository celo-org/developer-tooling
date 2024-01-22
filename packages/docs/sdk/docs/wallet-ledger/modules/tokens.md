[@celo/wallet-ledger](../README.md) / tokens

# Module: tokens

## Table of contents

### Interfaces

- [API](../interfaces/tokens.API.md)
- [TokenInfo](../interfaces/tokens.TokenInfo.md)

### Functions

- [compareLedgerAppVersions](tokens.md#compareledgerappversions)
- [list](tokens.md#list)
- [tokenInfoByAddressAndChainId](tokens.md#tokeninfobyaddressandchainid)

## Functions

### compareLedgerAppVersions

▸ **compareLedgerAppVersions**(`version1`, `version2`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `version1` | `string` |
| `version2` | `string` |

#### Returns

`number`

-1: version1 < version2,
 0: version1 == version2,
 1: version1 > version2

#### Defined in

[wallet-ledger/src/tokens.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L33)

___

### list

▸ **list**(): [`TokenInfo`](../interfaces/tokens.TokenInfo.md)[]

list all the ERC20 tokens informations

#### Returns

[`TokenInfo`](../interfaces/tokens.TokenInfo.md)[]

#### Defined in

[wallet-ledger/src/tokens.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L16)

___

### tokenInfoByAddressAndChainId

▸ **tokenInfoByAddressAndChainId**(`contract`, `chainId`): `undefined` \| ``null`` \| [`TokenInfo`](../interfaces/tokens.TokenInfo.md)

Retrieve the token information by a given contract address and chainId if any

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |
| `chainId` | `number` |

#### Returns

`undefined` \| ``null`` \| [`TokenInfo`](../interfaces/tokens.TokenInfo.md)

#### Defined in

[wallet-ledger/src/tokens.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L8)
