[@celo/connect](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / Contract

# Class: Contract

[index](../modules/index.md).Contract

## Table of contents

### Constructors

- [constructor](index.Contract.md#constructor)

### Properties

- [defaultAccount](index.Contract.md#defaultaccount)
- [defaultBlock](index.Contract.md#defaultblock)
- [defaultChain](index.Contract.md#defaultchain)
- [defaultCommon](index.Contract.md#defaultcommon)
- [defaultHardfork](index.Contract.md#defaulthardfork)
- [events](index.Contract.md#events)
- [handleRevert](index.Contract.md#handlerevert)
- [methods](index.Contract.md#methods)
- [options](index.Contract.md#options)
- [transactionBlockTimeout](index.Contract.md#transactionblocktimeout)
- [transactionConfirmationBlocks](index.Contract.md#transactionconfirmationblocks)
- [transactionPollingTimeout](index.Contract.md#transactionpollingtimeout)

### Methods

- [clone](index.Contract.md#clone)
- [deploy](index.Contract.md#deploy)
- [getPastEvents](index.Contract.md#getpastevents)
- [once](index.Contract.md#once)
- [setProvider](index.Contract.md#setprovider)

## Constructors

### constructor

• **new Contract**(`jsonInterface`, `address?`, `options?`): [`Contract`](index.Contract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `AbiItem`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`Contract`](index.Contract.md)

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:27

## Properties

### defaultAccount

• **defaultAccount**: ``null`` \| `string`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:37

___

### defaultBlock

• **defaultBlock**: [`BlockNumber`](../modules/index.md#blocknumber)

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:38

___

### defaultChain

• **defaultChain**: `chain`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:41

___

### defaultCommon

• **defaultCommon**: `Common`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:39

___

### defaultHardfork

• **defaultHardfork**: `hardfork`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:40

___

### events

• **events**: `any`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:65

___

### handleRevert

• **handleRevert**: `boolean`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:45

___

### methods

• **methods**: `any`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:53

___

### options

• **options**: `Options`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:47

___

### transactionBlockTimeout

• **transactionBlockTimeout**: `number`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:44

___

### transactionConfirmationBlocks

• **transactionConfirmationBlocks**: `number`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:43

___

### transactionPollingTimeout

• **transactionPollingTimeout**: `number`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:42

## Methods

### clone

▸ **clone**(): [`Contract`](index.Contract.md)

#### Returns

[`Contract`](index.Contract.md)

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:49

___

### deploy

▸ **deploy**(`options`): [`ContractSendMethod`](../interfaces/index.ContractSendMethod.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `DeployOptions` |

#### Returns

[`ContractSendMethod`](../interfaces/index.ContractSendMethod.md)

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:51

___

### getPastEvents

▸ **getPastEvents**(`event`): `Promise`\<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |

#### Returns

`Promise`\<`EventData`[]\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:67

▸ **getPastEvents**(`event`, `options`, `callback`): `Promise`\<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `options` | [`PastEventOptions`](../interfaces/index.PastEventOptions.md) |
| `callback` | (`error`: `Error`, `events`: `EventData`[]) => `void` |

#### Returns

`Promise`\<`EventData`[]\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:68

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `options` | [`PastEventOptions`](../interfaces/index.PastEventOptions.md) |

#### Returns

`Promise`\<`EventData`[]\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:73

▸ **getPastEvents**(`event`, `callback`): `Promise`\<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | (`error`: `Error`, `events`: `EventData`[]) => `void` |

#### Returns

`Promise`\<`EventData`[]\>

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:74

___

### once

▸ **once**(`event`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | (`error`: `Error`, `event`: `EventData`) => `void` |

#### Returns

`void`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:55

▸ **once**(`event`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `options` | `EventOptions` |
| `callback` | (`error`: `Error`, `event`: `EventData`) => `void` |

#### Returns

`void`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:59

___

### setProvider

▸ **setProvider**(`provider`, `accounts?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `provider` |
| `accounts?` | `Accounts` |

#### Returns

`void`

#### Defined in

node_modules/web3-eth-contract/types/index.d.ts:33
