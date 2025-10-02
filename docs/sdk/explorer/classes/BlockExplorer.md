[**@celo/explorer v5.0.18-alpha.0**](../README.md)

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

Defined in: [block-explorer.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L70)

## Methods

### buildCallDetails()

> **buildCallDetails**(`contract`, `abi`, `input`): [`CallDetails`](../interfaces/CallDetails.md)

Defined in: [block-explorer.ts:270](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L270)

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

Defined in: [block-explorer.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L97)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockByHash()

> **fetchBlockByHash**(`blockHash`): `Promise`\<`Block`\>

Defined in: [block-explorer.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L94)

#### Parameters

##### blockHash

`string`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockRange()

> **fetchBlockRange**(`from`, `to`): `Promise`\<`Block`[]\>

Defined in: [block-explorer.ts:101](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L101)

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

Defined in: [block-explorer.ts:308](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L308)

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

Defined in: [block-explorer.ts:318](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L318)

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

Defined in: [block-explorer.ts:348](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L348)

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

Defined in: [block-explorer.ts:377](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L377)

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

Defined in: [block-explorer.ts:178](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L178)

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

Defined in: [block-explorer.ts:250](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L250)

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

Defined in: [block-explorer.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L202)

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

Defined in: [block-explorer.ts:225](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L225)

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

Defined in: [block-explorer.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L109)

#### Parameters

##### block

`Block`

#### Returns

`Promise`\<[`ParsedBlock`](../interfaces/ParsedBlock.md)\>

***

### setProxyOverride()

> **setProxyOverride**(`proxyAddress`, `implementationAddress`): `Promise`\<`void`\>

Defined in: [block-explorer.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L89)

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

Defined in: [block-explorer.ts:126](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L126)

#### Parameters

##### tx

`CeloTxPending`

#### Returns

`Promise`\<`null` \| [`ParsedTx`](../interfaces/ParsedTx.md)\>

***

### tryParseTxInput()

> **tryParseTxInput**(`address`, `input`): `Promise`\<`null` \| [`CallDetails`](../interfaces/CallDetails.md)\>

Defined in: [block-explorer.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L138)

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

Defined in: [block-explorer.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L79)

#### Parameters

##### name

`CeloContract`

##### address

`string`

#### Returns

`Promise`\<`void`\>
