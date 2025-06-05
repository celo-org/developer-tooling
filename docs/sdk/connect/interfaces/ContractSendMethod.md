[**@celo/connect v7.0.0-beta.1**](../README.md)

***

[@celo/connect](../globals.md) / ContractSendMethod

# Interface: ContractSendMethod

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:90

## Methods

### call()

> **call**(`options?`, `callback?`): `Promise`\<`any`\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:96

#### Parameters

##### options?

`CallOptions`

##### callback?

(`err`, `result`) => `void`

#### Returns

`Promise`\<`any`\>

***

### encodeABI()

> **encodeABI**(): `string`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:117

#### Returns

`string`

***

### estimateGas()

#### Call Signature

> **estimateGas**(`options`, `callback?`): `Promise`\<`number`\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:101

##### Parameters

###### options

`EstimateGasOptions`

###### callback?

(`err`, `gas`) => `void`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **estimateGas**(`callback`): `Promise`\<`number`\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:106

##### Parameters

###### callback

(`err`, `gas`) => `void`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **estimateGas**(`options`, `callback`): `Promise`\<`number`\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:108

##### Parameters

###### options

`EstimateGasOptions`

###### callback

(`err`, `gas`) => `void`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **estimateGas**(`options`): `Promise`\<`number`\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:113

##### Parameters

###### options

`EstimateGasOptions`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **estimateGas**(): `Promise`\<`number`\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:115

##### Returns

`Promise`\<`number`\>

***

### send()

> **send**(`options`, `callback?`): [`PromiEvent`](PromiEvent.md)\<[`Contract`](../classes/Contract.md)\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:91

#### Parameters

##### options

`SendOptions`

##### callback?

(`err`, `transactionHash`) => `void`

#### Returns

[`PromiEvent`](PromiEvent.md)\<[`Contract`](../classes/Contract.md)\>
