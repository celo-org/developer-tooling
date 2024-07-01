[@celo/connect](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / FormattedCeloTx

# Interface: FormattedCeloTx

[types](../modules/types.md).FormattedCeloTx

## Table of contents

### Properties

- [accessList](types.FormattedCeloTx.md#accesslist)
- [chainId](types.FormattedCeloTx.md#chainid)
- [data](types.FormattedCeloTx.md#data)
- [feeCurrency](types.FormattedCeloTx.md#feecurrency)
- [from](types.FormattedCeloTx.md#from)
- [gas](types.FormattedCeloTx.md#gas)
- [gasPrice](types.FormattedCeloTx.md#gasprice)
- [maxFeeInFeeCurrency](types.FormattedCeloTx.md#maxfeeinfeecurrency)
- [maxFeePerGas](types.FormattedCeloTx.md#maxfeepergas)
- [maxPriorityFeePerGas](types.FormattedCeloTx.md#maxpriorityfeepergas)
- [nonce](types.FormattedCeloTx.md#nonce)
- [to](types.FormattedCeloTx.md#to)
- [type](types.FormattedCeloTx.md#type)
- [value](types.FormattedCeloTx.md#value)

## Properties

### accessList

• `Optional` **accessList**: [`AccessListRaw`](../modules/types.md#accesslistraw)

#### Defined in

[packages/sdk/connect/src/types.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L35)

___

### chainId

• **chainId**: `number`

#### Defined in

[packages/sdk/connect/src/types.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L23)

___

### data

• **data**: `undefined` \| `string`

#### Defined in

[packages/sdk/connect/src/types.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L26)

___

### feeCurrency

• `Optional` **feeCurrency**: [`HexOrMissing`](../modules/types.md#hexormissing)

#### Defined in

[packages/sdk/connect/src/types.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L28)

___

### from

• **from**: [`HexOrMissing`](../modules/types.md#hexormissing)

#### Defined in

[packages/sdk/connect/src/types.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L24)

___

### gas

• **gas**: [`HexOrMissing`](../modules/types.md#hexormissing)

#### Defined in

[packages/sdk/connect/src/types.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L29)

___

### gasPrice

• `Optional` **gasPrice**: \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/types.ts:30](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L30)

___

### maxFeeInFeeCurrency

• `Optional` **maxFeeInFeeCurrency**: \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/types.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L33)

___

### maxFeePerGas

• `Optional` **maxFeePerGas**: \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/types.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L31)

___

### maxPriorityFeePerGas

• `Optional` **maxPriorityFeePerGas**: \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/types.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L32)

___

### nonce

• **nonce**: `number` \| [`HexOrMissing`](../modules/types.md#hexormissing)

#### Defined in

[packages/sdk/connect/src/types.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L34)

___

### to

• **to**: [`HexOrMissing`](../modules/types.md#hexormissing)

#### Defined in

[packages/sdk/connect/src/types.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L25)

___

### type

• **type**: [`TransactionTypes`](../modules/types.md#transactiontypes)

#### Defined in

[packages/sdk/connect/src/types.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L36)

___

### value

• **value**: [`HexOrMissing`](../modules/types.md#hexormissing)

#### Defined in

[packages/sdk/connect/src/types.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L27)
