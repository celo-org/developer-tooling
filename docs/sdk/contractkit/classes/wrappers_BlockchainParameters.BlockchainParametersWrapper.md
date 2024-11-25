[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/BlockchainParameters](../modules/wrappers_BlockchainParameters.md) / BlockchainParametersWrapper

# Class: BlockchainParametersWrapper

[wrappers/BlockchainParameters](../modules/wrappers_BlockchainParameters.md).BlockchainParametersWrapper

Network parameters that are configurable by governance.

**`Deprecated`**

Contract will be complete removed see https://specs.celo.org/smart_contract_updates_from_l1.html

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`BlockchainParameters`\>

  ↳ **`BlockchainParametersWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#eventtypes)
- [events](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#events)
- [getBlockGasLimit](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getblockgaslimit)
- [getEpochNumber](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getepochnumber)
- [getEpochSize](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getepochsize)
- [getIntrinsicGasForAlternativeFeeCurrency](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getintrinsicgasforalternativefeecurrency)
- [getUptimeLookbackWindow](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getuptimelookbackwindow)
- [methodIds](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#methodids)
- [setBlockGasLimit](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#setblockgaslimit)
- [setIntrinsicGasForAlternativeFeeCurrency](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#setintrinsicgasforalternativefeecurrency)
- [setUptimeLookbackWindow](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#setuptimelookbackwindow)

### Accessors

- [address](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#address)

### Methods

- [getConfig](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getconfig)
- [getEpochNumberOfBlock](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getepochnumberofblock)
- [getEpochSizeNumber](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getepochsizenumber)
- [getFirstBlockNumberForEpoch](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getfirstblocknumberforepoch)
- [getLastBlockNumberForEpoch](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getlastblocknumberforepoch)
- [getPastEvents](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#getpastevents)
- [version](wrappers_BlockchainParameters.BlockchainParametersWrapper.md#version)

## Constructors

### constructor

• **new BlockchainParametersWrapper**(`connection`, `contract`): [`BlockchainParametersWrapper`](wrappers_BlockchainParameters.BlockchainParametersWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `BlockchainParameters` |

#### Returns

[`BlockchainParametersWrapper`](wrappers_BlockchainParameters.BlockchainParametersWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`BlockchainParameters`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[eventTypes](wrappers_BaseWrapper.BaseWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BlockGasLimitSet` | `ContractEvent`\<`string`\> |
| `IntrinsicGasForAlternativeFeeCurrencySet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `UptimeLookbackWindowSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `activationEpoch`: `string` ; `window`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getBlockGasLimit

• **getBlockGasLimit**: (...`args`: []) => `Promise`\<`BigNumber`\>

Getting the block gas limit.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Getting the block gas limit.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L35)

___

### getEpochNumber

• **getEpochNumber**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L105)

___

### getEpochSize

• **getEpochSize**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L107)

___

### getIntrinsicGasForAlternativeFeeCurrency

• **getIntrinsicGasForAlternativeFeeCurrency**: (...`args`: []) => `Promise`\<`BigNumber`\>

Get the extra intrinsic gas for transactions, where gas is paid using non-gold currency.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Get the extra intrinsic gas for transactions, where gas is paid using non-gold currency.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L18)

___

### getUptimeLookbackWindow

• **getUptimeLookbackWindow**: (...`args`: []) => `Promise`\<`number`\>

Getting the uptime lookback window.

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

Getting the uptime lookback window.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L55)

___

### methodIds

• **methodIds**: `Record`\<``"blockGasLimit"`` \| ``"intrinsicGasForAlternativeFeeCurrency"`` \| ``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"initialize"`` \| ``"getVersionNumber"`` \| ``"uptimeLookbackWindow"`` \| ``"setBlockGasLimit"`` \| ``"setIntrinsicGasForAlternativeFeeCurrency"`` \| ``"setUptimeLookbackWindow"`` \| ``"getUptimeLookbackWindow"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### setBlockGasLimit

• **setBlockGasLimit**: (...`args`: [gasLimit: string \| number]) => `CeloTransactionObject`\<`void`\>

Setting the block gas limit.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Setting the block gas limit.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [gasLimit: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L40)

___

### setIntrinsicGasForAlternativeFeeCurrency

• **setIntrinsicGasForAlternativeFeeCurrency**: (...`args`: [gas: string \| number]) => `CeloTransactionObject`\<`void`\>

Setting the extra intrinsic gas for transactions, where gas is paid using non-gold currency.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Setting the extra intrinsic gas for transactions, where gas is paid using non-gold currency.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [gas: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L27)

___

### setUptimeLookbackWindow

• **setUptimeLookbackWindow**: (...`args`: [window: string \| number]) => `CeloTransactionObject`\<`void`\>

Setting the uptime lookback window.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Setting the uptime lookback window.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [window: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L63)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Inherited from

BaseWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getConfig

▸ **getConfig**(): `Promise`\<[`BlockchainParametersConfig`](../interfaces/wrappers_BlockchainParameters.BlockchainParametersConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`BlockchainParametersConfig`](../interfaces/wrappers_BlockchainParameters.BlockchainParametersConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L45)

___

### getEpochNumberOfBlock

▸ **getEpochNumberOfBlock**(`blockNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L94)

___

### getEpochSizeNumber

▸ **getEpochSizeNumber**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L68)

___

### getFirstBlockNumberForEpoch

▸ **getFirstBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L74)

___

### getLastBlockNumberForEpoch

▸ **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BlockchainParameters.ts#L84)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` \| ``"BlockGasLimitSet"`` \| ``"IntrinsicGasForAlternativeFeeCurrencySet"`` \| ``"UptimeLookbackWindowSet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
