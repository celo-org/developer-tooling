[@celo/connect](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / ContractSendMethod

# Interface: ContractSendMethod

[index](../modules/index.md).ContractSendMethod

## Table of contents

### Methods

- [call](index.ContractSendMethod.md#call)
- [encodeABI](index.ContractSendMethod.md#encodeabi)
- [estimateGas](index.ContractSendMethod.md#estimategas)
- [send](index.ContractSendMethod.md#send)

## Methods

### call

▸ **call**(`options?`, `callback?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `CallOptions` |
| `callback?` | (`err`: `Error`, `result`: `any`) => `void` |

#### Returns

`Promise`\<`any`\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:96

___

### encodeABI

▸ **encodeABI**(): `string`

#### Returns

`string`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:117

___

### estimateGas

▸ **estimateGas**(`options`, `callback?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `EstimateGasOptions` |
| `callback?` | (`err`: `Error`, `gas`: `number`) => `void` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:101

▸ **estimateGas**(`callback`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`err`: `Error`, `gas`: `number`) => `void` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:106

▸ **estimateGas**(`options`, `callback`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `EstimateGasOptions` |
| `callback` | (`err`: `Error`, `gas`: `number`) => `void` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:108

▸ **estimateGas**(`options`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `EstimateGasOptions` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:113

▸ **estimateGas**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:115

___

### send

▸ **send**(`options`, `callback?`): [`PromiEvent`](index.PromiEvent.md)\<[`Contract`](../classes/index.Contract.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `SendOptions` |
| `callback?` | (`err`: `Error`, `transactionHash`: `string`) => `void` |

#### Returns

[`PromiEvent`](index.PromiEvent.md)\<[`Contract`](../classes/index.Contract.md)\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:91
