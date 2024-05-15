[@celo/connect](../README.md) / [Exports](../modules.md) / utils/formatter

# Module: utils/formatter

## Table of contents

### Functions

- [hexToNumber](utils_formatter.md#hextonumber)
- [inputAccessListFormatter](utils_formatter.md#inputaccesslistformatter)
- [inputAddressFormatter](utils_formatter.md#inputaddressformatter)
- [inputBlockNumberFormatter](utils_formatter.md#inputblocknumberformatter)
- [inputCeloTxFormatter](utils_formatter.md#inputcelotxformatter)
- [inputDefaultBlockNumberFormatter](utils_formatter.md#inputdefaultblocknumberformatter)
- [inputSignFormatter](utils_formatter.md#inputsignformatter)
- [outputBigNumberFormatter](utils_formatter.md#outputbignumberformatter)
- [outputBlockFormatter](utils_formatter.md#outputblockformatter)
- [outputBlockHeaderFormatter](utils_formatter.md#outputblockheaderformatter)
- [outputCeloTxFormatter](utils_formatter.md#outputcelotxformatter)
- [outputCeloTxReceiptFormatter](utils_formatter.md#outputcelotxreceiptformatter)
- [outputLogFormatter](utils_formatter.md#outputlogformatter)
- [parseAccessList](utils_formatter.md#parseaccesslist)

## Functions

### hexToNumber

▸ **hexToNumber**(`hex?`): `number` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex?` | `string` |

#### Returns

`number` \| `undefined`

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:223](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L223)

___

### inputAccessListFormatter

▸ **inputAccessListFormatter**(`accessList?`): [`AccessListRaw`](types.md#accesslistraw)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessList?` | `AccessList` |

#### Returns

[`AccessListRaw`](types.md#accesslistraw)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:303](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L303)

___

### inputAddressFormatter

▸ **inputAddressFormatter**(`address?`): `StrongAddress` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address?` | `string` |

#### Returns

`StrongAddress` \| `undefined`

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:320](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L320)

___

### inputBlockNumberFormatter

▸ **inputBlockNumberFormatter**(`blockNumber`): `undefined` \| [`BlockNumber`](index.md#blocknumber)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | [`BlockNumber`](index.md#blocknumber) |

#### Returns

`undefined` \| [`BlockNumber`](index.md#blocknumber)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:168](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L168)

___

### inputCeloTxFormatter

▸ **inputCeloTxFormatter**(`tx`): [`FormattedCeloTx`](../interfaces/types.FormattedCeloTx.md)

Formats the input of a transaction and converts all values to HEX

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`CeloTx`](types.md#celotx) |

#### Returns

[`FormattedCeloTx`](../interfaces/types.FormattedCeloTx.md)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L23)

___

### inputDefaultBlockNumberFormatter

▸ **inputDefaultBlockNumberFormatter**(`blockNumber`): `undefined` \| [`BlockNumber`](index.md#blocknumber)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `undefined` \| ``null`` \| [`BlockNumber`](index.md#blocknumber) |

#### Returns

`undefined` \| [`BlockNumber`](index.md#blocknumber)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:160](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L160)

___

### inputSignFormatter

▸ **inputSignFormatter**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:330](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L330)

___

### outputBigNumberFormatter

▸ **outputBigNumberFormatter**(`hex`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:264](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L264)

___

### outputBlockFormatter

▸ **outputBlockFormatter**(`block`): [`Block`](../interfaces/index.Block.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `any` |

#### Returns

[`Block`](../interfaces/index.Block.md)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L202)

___

### outputBlockHeaderFormatter

▸ **outputBlockHeaderFormatter**(`blockHeader`): [`BlockHeader`](../interfaces/index.BlockHeader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHeader` | `any` |

#### Returns

[`BlockHeader`](../interfaces/index.BlockHeader.md)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:187](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L187)

___

### outputCeloTxFormatter

▸ **outputCeloTxFormatter**(`tx`): [`CeloTxPending`](types.md#celotxpending)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `any` |

#### Returns

[`CeloTxPending`](types.md#celotxpending)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L85)

___

### outputCeloTxReceiptFormatter

▸ **outputCeloTxReceiptFormatter**(`receipt`): [`CeloTxReceipt`](types.md#celotxreceipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | `any` |

#### Returns

[`CeloTxReceipt`](types.md#celotxreceipt)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:131](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L131)

___

### outputLogFormatter

▸ **outputLogFormatter**(`log`): [`Log`](../interfaces/index.Log.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `log` | `any` |

#### Returns

[`Log`](../interfaces/index.Log.md)

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:230](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L230)

___

### parseAccessList

▸ **parseAccessList**(`accessListRaw`): `AccessList`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessListRaw` | `undefined` \| [`AccessListRaw`](types.md#accesslistraw) |

#### Returns

`AccessList`

#### Defined in

[packages/sdk/connect/src/utils/formatter.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/formatter.ts#L272)
