[**@celo/explorer v5.0.16-beta.0**](../README.md)

***

[@celo/explorer](../README.md) / BlockExplorer

# Class: BlockExplorer

Defined in: [block-explorer.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L64)

## Constructors

### Constructor

> **new BlockExplorer**(`kit`, `contractDetails`): `BlockExplorer`

Defined in: [block-explorer.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L68)

#### Parameters

##### kit

`ContractKit`

##### contractDetails

[`ContractDetails`](../interfaces/ContractDetails.md)[]

#### Returns

`BlockExplorer`

## Properties

### contractDetails

> `readonly` **contractDetails**: [`ContractDetails`](../interfaces/ContractDetails.md)[]

Defined in: [block-explorer.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L68)

## Methods

### buildCallDetails()

> **buildCallDetails**(`contract`, `abi`, `input`): [`CallDetails`](../interfaces/CallDetails.md)

Defined in: [block-explorer.ts:267](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L267)

#### Parameters

##### contract

[`ContractDetails`](../interfaces/ContractDetails.md)

##### abi

`ABIDefinition`

##### input

`string`

#### Returns

[`CallDetails`](../interfaces/CallDetails.md)

***

### fetchBlock()

> **fetchBlock**(`blockNumber`): `Promise`\<`Block`\>

Defined in: [block-explorer.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L94)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockByHash()

> **fetchBlockByHash**(`blockHash`): `Promise`\<`Block`\>

Defined in: [block-explorer.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L91)

#### Parameters

##### blockHash

`string`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockRange()

> **fetchBlockRange**(`from`, `to`): `Promise`\<`Block`[]\>

Defined in: [block-explorer.ts:98](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L98)

#### Parameters

##### from

`number`

##### to

`number`

#### Returns

`Promise`\<`Block`[]\>

***

### getContractMappingFromCore()

> **getContractMappingFromCore**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

Defined in: [block-explorer.ts:305](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L305)

Returns the ContractMapping for the contract at that address, or undefined
by looking up the contract address in the core mappings.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

***

### getContractMappingFromSourcify()

> **getContractMappingFromSourcify**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

Defined in: [block-explorer.ts:315](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L315)

Returns the ContractMapping for the contract at that address, or undefined
by looking up the contract address in Sourcify.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

***

### getContractMappingFromSourcifyAsProxy()

> **getContractMappingFromSourcifyAsProxy**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

Defined in: [block-explorer.ts:345](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L345)

Returns the ContractMapping for the contract at that address, or undefined
by looking up the contract address in Sourcify but using heuristis to treat
it as a proxy.

This function is also included by the proxyImplementationOverrides map,
which can be used to override the implementation address for a given proxy.
This is exceptionally useful for parsing governence proposals that either
initialize a proxy or upgrade it, and then calls methods on the new implementation.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

***

### getContractMappingWithSelector()

> **getContractMappingWithSelector**(`address`, `selector`, `strategies`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

Defined in: [block-explorer.ts:374](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L374)

Uses all of the strategies available to find a contract mapping that contains
the given method selector.

#### Parameters

##### address

`string`

##### selector

`string`

##### strategies

(`address`) => `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>[] = `...`

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

The ContractMapping for the contract which has the function selector, or undefined

***

### ~~getContractMethodAbi()~~

> **getContractMethodAbi**(`address`, `selector`, `onlyCoreContracts`): `Promise`\<`null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)\>

Defined in: [block-explorer.ts:175](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L175)

#### Parameters

##### address

`string`

##### selector

`string`

##### onlyCoreContracts

`boolean` = `false`

#### Returns

`Promise`\<`null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)\>

The contract name and ABI of the method or null if not found

#### Deprecated

use getContractMappingWithSelector instead
Returns the contract name and ABI of the method by looking up
the contract address either in all possible contract mappings.

***

### ~~getContractMethodAbiFallback()~~

> **getContractMethodAbiFallback**(`address`, `selector`): `null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)

Defined in: [block-explorer.ts:247](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L247)

#### Parameters

##### address

`string`

##### selector

`string`

#### Returns

`null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)

The contract name and ABI of the method or null if not found

#### Deprecated

use getContractMappingWithSelector instead
Returns the contract name and ABI of the method by looking up
the selector in a list of known functions.

***

### getContractMethodAbiFromCore()

> **getContractMethodAbiFromCore**(`address`, `selector`): `Promise`\<`null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)\>

Defined in: [block-explorer.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L199)

Returns the contract name and ABI of the method by looking up
the contract address but only in core contracts

#### Parameters

##### address

`string`

##### selector

`string`

#### Returns

`Promise`\<`null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)\>

The contract name and ABI of the method or null if not found

***

### ~~getContractMethodAbiFromSourcify()~~

> **getContractMethodAbiFromSourcify**(`address`, `selector`): `Promise`\<`null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)\>

Defined in: [block-explorer.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L222)

#### Parameters

##### address

`string`

##### selector

`string`

#### Returns

`Promise`\<`null` \| [`ContractNameAndMethodAbi`](../interfaces/ContractNameAndMethodAbi.md)\>

The contract name and ABI of the method or null if not found

#### Deprecated

use getContractMappingWithSelector instead
Returns the contract name and ABI of the method by looking up
the contract address in Sourcify.

***

### parseBlock()

> **parseBlock**(`block`): `Promise`\<[`ParsedBlock`](../interfaces/ParsedBlock.md)\>

Defined in: [block-explorer.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L106)

#### Parameters

##### block

`Block`

#### Returns

`Promise`\<[`ParsedBlock`](../interfaces/ParsedBlock.md)\>

***

### setProxyOverride()

> **setProxyOverride**(`proxyAddress`, `implementationAddress`): `Promise`\<`void`\>

Defined in: [block-explorer.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L86)

#### Parameters

##### proxyAddress

`string`

##### implementationAddress

`string`

#### Returns

`Promise`\<`void`\>

***

### tryParseTx()

> **tryParseTx**(`tx`): `Promise`\<`null` \| [`ParsedTx`](../interfaces/ParsedTx.md)\>

Defined in: [block-explorer.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L123)

#### Parameters

##### tx

`CeloTxPending`

#### Returns

`Promise`\<`null` \| [`ParsedTx`](../interfaces/ParsedTx.md)\>

***

### tryParseTxInput()

> **tryParseTxInput**(`address`, `input`): `Promise`\<`null` \| [`CallDetails`](../interfaces/CallDetails.md)\>

Defined in: [block-explorer.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L135)

#### Parameters

##### address

`string`

##### input

`string`

#### Returns

`Promise`\<`null` \| [`CallDetails`](../interfaces/CallDetails.md)\>

***

### updateContractDetailsMapping()

> **updateContractDetailsMapping**(`name`, `address`): `Promise`\<`void`\>

Defined in: [block-explorer.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L76)

#### Parameters

##### name

`CeloContract`

##### address

`string`

#### Returns

`Promise`\<`void`\>
