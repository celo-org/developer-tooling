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

[packages/sdk/contractkit/src/base.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L50)

___

### CeloTokenContract

Ƭ **CeloTokenContract**: [`StableTokenContract`](base.md#stabletokencontract) \| [`CeloToken`](../enums/base.CeloContract.md#celotoken) \| [`GoldToken`](../enums/base.CeloContract.md#goldtoken)

#### Defined in

[packages/sdk/contractkit/src/base.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L42)

___

### StableTokenContract

Ƭ **StableTokenContract**: [`StableToken`](../enums/base.CeloContract.md#stabletoken) \| [`StableTokenEUR`](../enums/base.CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../enums/base.CeloContract.md#stabletokenbrl)

#### Defined in

[packages/sdk/contractkit/src/base.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L37)

## Variables

### AllContracts

• `Const` **AllContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L52)

___

### ProxyContracts

• `Const` **ProxyContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L63)

___

### RegisteredContracts

• `Const` **RegisteredContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L54)

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

[packages/sdk/contractkit/src/base.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L57)

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

[packages/sdk/contractkit/src/base.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L60)
