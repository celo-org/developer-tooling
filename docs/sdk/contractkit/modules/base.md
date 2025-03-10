[@celo/contractkit](../README.md) / [Exports](../modules.md) / base

# Module: base

## Table of contents

### Enumerations

- [CeloContract](../enums/base.CeloContract.md)

### Type Aliases

- [CeloToken](base.md#celotoken)
- [CeloTokenContract](base.md#celotokencontract)
- [StableTokenContract](base.md#stabletokencontract)

### Variables

- [AllContracts](base.md#allcontracts)
- [ProxyContracts](base.md#proxycontracts)
- [RegisteredContracts](base.md#registeredcontracts)

### Functions

- [stripProxy](base.md#stripproxy)
- [suffixProxy](base.md#suffixproxy)

## Type Aliases

### CeloToken

Ƭ **CeloToken**: [`CeloTokenContract`](base.md#celotokencontract)

Deprecated alias for CeloTokenContract.

**`Deprecated`**

Use CeloTokenContract instead

#### Defined in

[packages/sdk/contractkit/src/base.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L58)

___

### CeloTokenContract

Ƭ **CeloTokenContract**: [`StableTokenContract`](base.md#stabletokencontract) \| [`CeloToken`](../enums/base.CeloContract.md#celotoken) \| [`GoldToken`](../enums/base.CeloContract.md#goldtoken)

#### Defined in

[packages/sdk/contractkit/src/base.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L50)

___

### StableTokenContract

Ƭ **StableTokenContract**: [`StableToken`](../enums/base.CeloContract.md#stabletoken) \| [`StableTokenEUR`](../enums/base.CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../enums/base.CeloContract.md#stabletokenbrl)

#### Defined in

[packages/sdk/contractkit/src/base.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L45)

## Variables

### AllContracts

• `Const` **AllContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L60)

___

### ProxyContracts

• `Const` **ProxyContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L71)

___

### RegisteredContracts

• `Const` **RegisteredContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L62)

## Functions

### stripProxy

▸ **stripProxy**(`contract`): [`CeloContract`](../enums/base.CeloContract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`CeloContract`](../enums/base.CeloContract.md) |

#### Returns

[`CeloContract`](../enums/base.CeloContract.md)

#### Defined in

[packages/sdk/contractkit/src/base.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L65)

___

### suffixProxy

▸ **suffixProxy**(`contract`): [`CeloContract`](../enums/base.CeloContract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`CeloContract`](../enums/base.CeloContract.md) |

#### Returns

[`CeloContract`](../enums/base.CeloContract.md)

#### Defined in

[packages/sdk/contractkit/src/base.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L68)
