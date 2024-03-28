[@celo/explorer](../README.md) / [block-explorer](../modules/block_explorer.md) / BlockExplorer

# Class: BlockExplorer

[block-explorer](../modules/block_explorer.md).BlockExplorer

## Table of contents

### Constructors

- [constructor](block_explorer.BlockExplorer.md#constructor)

### Properties

- [contractDetails](block_explorer.BlockExplorer.md#contractdetails)

### Methods

- [buildCallDetails](block_explorer.BlockExplorer.md#buildcalldetails)
- [fetchBlock](block_explorer.BlockExplorer.md#fetchblock)
- [fetchBlockByHash](block_explorer.BlockExplorer.md#fetchblockbyhash)
- [fetchBlockRange](block_explorer.BlockExplorer.md#fetchblockrange)
- [getContractMappingFromCore](block_explorer.BlockExplorer.md#getcontractmappingfromcore)
- [getContractMappingFromSourcify](block_explorer.BlockExplorer.md#getcontractmappingfromsourcify)
- [getContractMappingFromSourcifyAsProxy](block_explorer.BlockExplorer.md#getcontractmappingfromsourcifyasproxy)
- [getContractMappingWithSelector](block_explorer.BlockExplorer.md#getcontractmappingwithselector)
- [getContractMethodAbi](block_explorer.BlockExplorer.md#getcontractmethodabi)
- [getContractMethodAbiFallback](block_explorer.BlockExplorer.md#getcontractmethodabifallback)
- [getContractMethodAbiFromCore](block_explorer.BlockExplorer.md#getcontractmethodabifromcore)
- [getContractMethodAbiFromSourcify](block_explorer.BlockExplorer.md#getcontractmethodabifromsourcify)
- [parseBlock](block_explorer.BlockExplorer.md#parseblock)
- [setProxyOverride](block_explorer.BlockExplorer.md#setproxyoverride)
- [tryParseTx](block_explorer.BlockExplorer.md#tryparsetx)
- [tryParseTxInput](block_explorer.BlockExplorer.md#tryparsetxinput)
- [updateContractDetailsMapping](block_explorer.BlockExplorer.md#updatecontractdetailsmapping)

## Constructors

### constructor

• **new BlockExplorer**(`kit`, `contractDetails`): [`BlockExplorer`](block_explorer.BlockExplorer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `contractDetails` | [`ContractDetails`](../interfaces/base.ContractDetails.md)[] |

#### Returns

[`BlockExplorer`](block_explorer.BlockExplorer.md)

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L68)

## Properties

### contractDetails

• `Readonly` **contractDetails**: [`ContractDetails`](../interfaces/base.ContractDetails.md)[]

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L68)

## Methods

### buildCallDetails

▸ **buildCallDetails**(`contract`, `abi`, `input`): [`CallDetails`](../interfaces/block_explorer.CallDetails.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`ContractDetails`](../interfaces/base.ContractDetails.md) |
| `abi` | `ABIDefinition` |
| `input` | `string` |

#### Returns

[`CallDetails`](../interfaces/block_explorer.CallDetails.md)

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:267](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L267)

___

### fetchBlock

▸ **fetchBlock**(`blockNumber`): `Promise`\<`Block`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`Promise`\<`Block`\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L94)

___

### fetchBlockByHash

▸ **fetchBlockByHash**(`blockHash`): `Promise`\<`Block`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHash` | `string` |

#### Returns

`Promise`\<`Block`\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L91)

___

### fetchBlockRange

▸ **fetchBlockRange**(`from`, `to`): `Promise`\<`Block`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

#### Returns

`Promise`\<`Block`[]\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:98](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L98)

___

### getContractMappingFromCore

▸ **getContractMappingFromCore**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

Returns the ContractMapping for the contract at that address, or undefined
by looking up the contract address in the core mappings.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:305](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L305)

___

### getContractMappingFromSourcify

▸ **getContractMappingFromSourcify**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

Returns the ContractMapping for the contract at that address, or undefined
by looking up the contract address on various contract verification services.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:315](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L315)

___

### getContractMappingFromSourcifyAsProxy

▸ **getContractMappingFromSourcifyAsProxy**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

Returns the ContractMapping for the contract at that address, or undefined
by looking up the contract address in Sourcify but using heuristis to treat
it as a proxy.

This function is also included by the proxyImplementationOverrides map,
which can be used to override the implementation address for a given proxy.
This is exceptionally useful for parsing governence proposals that either
initialize a proxy or upgrade it, and then calls methods on the new implementation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:345](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L345)

___

### getContractMappingWithSelector

▸ **getContractMappingWithSelector**(`address`, `selector`, `strategies?`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

Uses all of the strategies available to find a contract mapping that contains
the given method selector.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `selector` | `string` |
| `strategies` | (`address`: `string`) => `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>[] |

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/base.ContractMapping.md)\>

The ContractMapping for the contract which has the function selector, or undefined

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:374](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L374)

___

### getContractMethodAbi

▸ **getContractMethodAbi**(`address`, `selector`, `onlyCoreContracts?`): `Promise`\<``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `address` | `string` | `undefined` |
| `selector` | `string` | `undefined` |
| `onlyCoreContracts` | `boolean` | `false` |

#### Returns

`Promise`\<``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)\>

The contract name and ABI of the method or null if not found

**`Deprecated`**

use getContractMappingWithSelector instead
Returns the contract name and ABI of the method by looking up
the contract address either in all possible contract mappings.

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:175](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L175)

___

### getContractMethodAbiFallback

▸ **getContractMethodAbiFallback**(`address`, `selector`): ``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `selector` | `string` |

#### Returns

``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)

The contract name and ABI of the method or null if not found

**`Deprecated`**

use getContractMappingWithSelector instead
Returns the contract name and ABI of the method by looking up
the selector in a list of known functions.

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:247](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L247)

___

### getContractMethodAbiFromCore

▸ **getContractMethodAbiFromCore**(`address`, `selector`): `Promise`\<``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)\>

Returns the contract name and ABI of the method by looking up
the contract address but only in core contracts

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `selector` | `string` |

#### Returns

`Promise`\<``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)\>

The contract name and ABI of the method or null if not found

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L199)

___

### getContractMethodAbiFromSourcify

▸ **getContractMethodAbiFromSourcify**(`address`, `selector`): `Promise`\<``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `selector` | `string` |

#### Returns

`Promise`\<``null`` \| [`ContractNameAndMethodAbi`](../interfaces/block_explorer.ContractNameAndMethodAbi.md)\>

The contract name and ABI of the method or null if not found

**`Deprecated`**

use getContractMappingWithSelector instead
Returns the contract name and ABI of the method by looking up
the contract address in Sourcify.

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L222)

___

### parseBlock

▸ **parseBlock**(`block`): `Promise`\<[`ParsedBlock`](../interfaces/block_explorer.ParsedBlock.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `Block` |

#### Returns

`Promise`\<[`ParsedBlock`](../interfaces/block_explorer.ParsedBlock.md)\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L106)

___

### setProxyOverride

▸ **setProxyOverride**(`proxyAddress`, `implementationAddress`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyAddress` | `string` |
| `implementationAddress` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L86)

___

### tryParseTx

▸ **tryParseTx**(`tx`): `Promise`\<``null`` \| [`ParsedTx`](../interfaces/block_explorer.ParsedTx.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTxPending` |

#### Returns

`Promise`\<``null`` \| [`ParsedTx`](../interfaces/block_explorer.ParsedTx.md)\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L123)

___

### tryParseTxInput

▸ **tryParseTxInput**(`address`, `input`): `Promise`\<``null`` \| [`CallDetails`](../interfaces/block_explorer.CallDetails.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `input` | `string` |

#### Returns

`Promise`\<``null`` \| [`CallDetails`](../interfaces/block_explorer.CallDetails.md)\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L135)

___

### updateContractDetailsMapping

▸ **updateContractDetailsMapping**(`name`, `address`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `CeloContract` |
| `address` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/explorer/src/block-explorer.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L76)
