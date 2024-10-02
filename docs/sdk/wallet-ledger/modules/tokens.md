[@celo/wallet-ledger](../README.md) / tokens

# Module: tokens

## Table of contents

### Interfaces

- [API](../interfaces/tokens.API.md)
- [TokenInfo](../interfaces/tokens.TokenInfo.md)

### Functions

- [legacyTokenInfoByAddressAndChainId](tokens.md#legacytokeninfobyaddressandchainid)
- [list](tokens.md#list)
- [listLegacy](tokens.md#listlegacy)
- [tokenInfoByAddressAndChainId](tokens.md#tokeninfobyaddressandchainid)

## Functions

### legacyTokenInfoByAddressAndChainId

▸ **legacyTokenInfoByAddressAndChainId**(`contract`, `chainId`): `undefined` \| ``null`` \| [`TokenInfo`](../interfaces/tokens.TokenInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |
| `chainId` | `number` |

#### Returns

`undefined` \| ``null`` \| [`TokenInfo`](../interfaces/tokens.TokenInfo.md)

#### Defined in

[wallet-ledger/src/tokens.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L14)

___

### list

▸ **list**(): [`TokenInfo`](../interfaces/tokens.TokenInfo.md)[]

list all the ERC20 tokens informations

#### Returns

[`TokenInfo`](../interfaces/tokens.TokenInfo.md)[]

#### Defined in

[wallet-ledger/src/tokens.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L23)

___

### listLegacy

▸ **listLegacy**(): [`TokenInfo`](../interfaces/tokens.TokenInfo.md)[]

#### Returns

[`TokenInfo`](../interfaces/tokens.TokenInfo.md)[]

#### Defined in

[wallet-ledger/src/tokens.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L24)

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

[wallet-ledger/src/tokens.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/tokens.ts#L9)
