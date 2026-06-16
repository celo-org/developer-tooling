[**@celo/explorer v5.1.1**](../README.md)

***

[@celo/explorer](../README.md) / BlockExplorer

# Class: BlockExplorer

Defined in: [block-explorer.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L60)

## Constructors

### Constructor

> **new BlockExplorer**(`kit`, `contractDetails`): `BlockExplorer`

Defined in: [block-explorer.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L64)

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

Defined in: [block-explorer.ts:66](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L66)

## Methods

### buildCallDetails()

> **buildCallDetails**(`contract`, `abi`, `input`): [`CallDetails`](../interfaces/CallDetails.md)

Defined in: [block-explorer.ts:151](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L151)

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

Defined in: [block-explorer.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L96)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockByHash()

> **fetchBlockByHash**(`blockHash`): `Promise`\<`Block`\>

Defined in: [block-explorer.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L90)

#### Parameters

##### blockHash

`string`

#### Returns

`Promise`\<`Block`\>

***

### fetchBlockRange()

> **fetchBlockRange**(`from`, `to`): `Promise`\<`Block`[]\>

Defined in: [block-explorer.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L103)

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

Defined in: [block-explorer.ts:189](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L189)

Returns the ContractMapping for the contract at that address, or undefined
by looking up the contract address in the core mappings.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

***

### getContractMappingFromExplorer()

> **getContractMappingFromExplorer**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

Defined in: [block-explorer.ts:256](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L256)

Returns the ContractMapping for the contract at that address by looking up
its verified ABI on the chain's block explorer (Blockscout / Celoscan).

Useful when Sourcify does not have the contract (or its v1 API is
unavailable) but the contract is verified on the canonical celo explorer.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

***

### getContractMappingFromExplorerAsProxy()

> **getContractMappingFromExplorerAsProxy**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

Defined in: [block-explorer.ts:280](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L280)

Like getContractMappingFromExplorer, but treats the address as a proxy and
resolves the implementation ABI. Honors proxyImplementationOverride, so a
proxy upgraded earlier in the same proposal resolves to its new
implementation's ABI.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

The ContractMapping for the contract at that address, or undefined

***

### getContractMappingFromSourcify()

> **getContractMappingFromSourcify**(`address`): `Promise`\<`undefined` \| [`ContractMapping`](../interfaces/ContractMapping.md)\>

Defined in: [block-explorer.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L199)

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

Defined in: [block-explorer.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L226)

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

Defined in: [block-explorer.ts:309](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L309)

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

Defined in: [block-explorer.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L111)

#### Parameters

##### block

`Block`

#### Returns

`Promise`\<[`ParsedBlock`](../interfaces/ParsedBlock.md)\>

***

### setProxyOverride()

> **setProxyOverride**(`proxyAddress`, `implementationAddress`): `Promise`\<`void`\>

Defined in: [block-explorer.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L85)

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

Defined in: [block-explorer.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L128)

#### Parameters

##### tx

`Transaction`

#### Returns

`Promise`\<`null` \| [`ParsedTx`](../interfaces/ParsedTx.md)\>

***

### tryParseTxInput()

> **tryParseTxInput**(`address`, `input`): `Promise`\<`null` \| [`CallDetails`](../interfaces/CallDetails.md)\>

Defined in: [block-explorer.ts:140](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L140)

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

Defined in: [block-explorer.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/block-explorer.ts#L75)

#### Parameters

##### name

`CeloContract`

##### address

`string`

#### Returns

`Promise`\<`void`\>
