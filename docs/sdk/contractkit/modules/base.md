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

[packages/sdk/contractkit/src/base.ts:49](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L49)

___

### CeloTokenContract

Ƭ **CeloTokenContract**: [`StableTokenContract`](base.md#stabletokencontract) \| [`GoldToken`](../enums/base.CeloContract.md#goldtoken)

#### Defined in

[packages/sdk/contractkit/src/base.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L44)

___

### StableTokenContract

Ƭ **StableTokenContract**: [`StableToken`](../enums/base.CeloContract.md#stabletoken) \| [`StableTokenEUR`](../enums/base.CeloContract.md#stabletokeneur) \| [`StableTokenBRL`](../enums/base.CeloContract.md#stabletokenbrl)

#### Defined in

[packages/sdk/contractkit/src/base.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L39)

## Variables

### AllContracts

• `Const` **AllContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L51)

___

### ProxyContracts

• `Const` **ProxyContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L62)

___

### RegisteredContracts

• `Const` **RegisteredContracts**: [`CeloContract`](../enums/base.CeloContract.md)[]

#### Defined in

[packages/sdk/contractkit/src/base.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L53)

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

[packages/sdk/contractkit/src/base.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L56)

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

[packages/sdk/contractkit/src/base.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/base.ts#L59)
