[@celo/contractkit](../README.md) / [Exports](../modules.md) / base

# Module: base

## Table of contents

### Enumerations

- [CeloContract](../enums/base.CeloContract.md)

### Type Aliases

- [CeloToken](base.md#celotoken)
- [CeloTokenContract](base.md#celotokencontract)
- [ExchangeContract](base.md#exchangecontract)
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

[packages/sdk/contractkit/src/base.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L51)

___

### CeloTokenContract

Ƭ **CeloTokenContract**: [`StableTokenContract`](base.md#stabletokencontract) \| [`GoldToken`](../enums/base.CeloContract.md#goldtoken)

#### Defined in

[packages/sdk/contractkit/src/base.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L46)

___

### ExchangeContract

Ƭ **ExchangeContract**: [`Exchange`](../enums/base.CeloContract.md#exchange) \| [`ExchangeEUR`](../enums/base.CeloContract.md#exchangeeur) \| [`ExchangeBRL`](../enums/base.CeloContract.md#exchangebrl)

#### Defined in

[packages/sdk/contractkit/src/base.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L41)

___

### StableTokenContract

Ƭ **StableTokenContract**: [`StableToken`](../enums/base.CeloContract.md#stabletoken) \| [`StableTokenEUR`](../enums/base.CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../enums/base.CeloContract.md#stabletokenbrl)

#### Defined in

[packages/sdk/contractkit/src/base.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L36)

## Variables

### AllContracts

• `Const` **AllContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L53)

___

### ProxyContracts

• `Const` **ProxyContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L64)

___

### RegisteredContracts

• `Const` **RegisteredContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L55)

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

[packages/sdk/contractkit/src/base.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L58)

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

[packages/sdk/contractkit/src/base.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L61)
