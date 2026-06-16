[**@celo/explorer v5.1.0**](../README.md)

***

[@celo/explorer](../README.md) / BlockExplorer

# Class: BlockExplorer

Defined in: [block-explorer.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L59)

## Constructors

### Constructor

> **new BlockExplorer**(`kit`, `contractDetails`): `BlockExplorer`

Defined in: [block-explorer.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L63)

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

Defined in: [block-explorer.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L65)

## Methods

### buildCallDetails()

> **buildCallDetails**(`contract`, `abi`, `input`): [`CallDetails`](../interfaces/CallDetails.md)

Defined in: [block-explorer.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L150)

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

Defined in: [block-explorer.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L95)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockByHash()

> **fetchBlockByHash**(`blockHash`): `Promise`\<`Block`\>

Defined in: [block-explorer.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L89)

#### Parameters

##### blockHash

`string`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockRange()

> **fetchBlockRange**(`from`, `to`): `Promise`\<`Block`[]\>

Defined in: [block-explorer.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L102)

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

Defined in: [block-explorer.ts:188](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L188)

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

Defined in: [block-explorer.ts:198](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L198)

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

Defined in: [block-explorer.ts:225](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L225)

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

Defined in: [block-explorer.ts:254](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L254)

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

### parseBlock()

> **parseBlock**(`block`): `Promise`\<[`ParsedBlock`](../interfaces/ParsedBlock.md)\>

Defined in: [block-explorer.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L110)

#### Parameters

##### block

`Block`

#### Returns

`Promise`\<[`ParsedBlock`](../interfaces/ParsedBlock.md)\>

***

### setProxyOverride()

> **setProxyOverride**(`proxyAddress`, `implementationAddress`): `Promise`\<`void`\>

Defined in: [block-explorer.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L84)

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

Defined in: [block-explorer.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L127)

#### Parameters

##### tx

`Transaction`

#### Returns

`Promise`\<`null` \| [`ParsedTx`](../interfaces/ParsedTx.md)\>

***

### tryParseTxInput()

> **tryParseTxInput**(`address`, `input`): `Promise`\<`null` \| [`CallDetails`](../interfaces/CallDetails.md)\>

Defined in: [block-explorer.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L139)

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

Defined in: [block-explorer.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L74)

#### Parameters

##### name

`CeloContract`

##### address

`string`

#### Returns

`Promise`\<`void`\>
