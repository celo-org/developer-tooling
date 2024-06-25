[@celo/contractkit](../README.md) / [Exports](../modules.md) / celo-tokens

# Module: celo-tokens

## Table of contents

### Enumerations

- [StableToken](../enums/celo_tokens.StableToken.md)
- [Token](../enums/celo_tokens.Token.md)

### Classes

- [CeloTokens](../classes/celo_tokens.CeloTokens.md)

### Interfaces

- [CeloTokenInfo](../interfaces/celo_tokens.CeloTokenInfo.md)
- [StableTokenInfo](../interfaces/celo_tokens.StableTokenInfo.md)

### Type Aliases

- [CeloTokenType](celo_tokens.md#celotokentype)
- [CeloTokenWrapper](celo_tokens.md#celotokenwrapper)
- [EachCeloToken](celo_tokens.md#eachcelotoken)

### Variables

- [celoTokenInfos](celo_tokens.md#celotokeninfos)
- [stableTokenInfos](celo_tokens.md#stabletokeninfos)

### Functions

- [isStableTokenContract](celo_tokens.md#isstabletokencontract)

## Type Aliases

### CeloTokenType

Ƭ **CeloTokenType**: [`StableToken`](../enums/celo_tokens.StableToken.md) \| [`Token`](../enums/celo_tokens.Token.md)

#### Defined in

packages/sdk/base/lib/currencies.d.ts:15

___

### CeloTokenWrapper

Ƭ **CeloTokenWrapper**: [`GoldTokenWrapper`](../classes/wrappers_GoldTokenWrapper.GoldTokenWrapper.md) \| [`StableTokenWrapper`](../classes/wrappers_StableTokenWrapper.StableTokenWrapper.md)

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L14)

___

### EachCeloToken

Ƭ **EachCeloToken**\<`T`\>: \{ [key in CeloTokenType]?: T }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L10)

## Variables

### celoTokenInfos

• `Const` **celoTokenInfos**: \{ [key in CeloTokenType]: CeloTokenInfo }

Basic info for each supported celo token, including stable tokens

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L44)

___

### stableTokenInfos

• `Const` **stableTokenInfos**: \{ [key in StableToken]: StableTokenInfo }

Basic info for each stable token

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L26)

## Functions

### isStableTokenContract

▸ **isStableTokenContract**(`contract`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`CeloContract`](../enums/base.CeloContract.md) |

#### Returns

`boolean`

#### Defined in

[packages/sdk/contractkit/src/celo-tokens.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/celo-tokens.ts#L251)
