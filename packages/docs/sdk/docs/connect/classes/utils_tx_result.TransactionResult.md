[@celo/connect](../README.md) / [Exports](../modules.md) / [utils/tx-result](../modules/utils_tx_result.md) / TransactionResult

# Class: TransactionResult

[utils/tx-result](../modules/utils_tx_result.md).TransactionResult

Replacement interface for web3's `PromiEvent`. Instead of emiting events
to signal different stages, eveything is exposed as a promise. Which ends
up being nicer when doing promise/async based programming.

## Table of contents

### Constructors

- [constructor](utils_tx_result.TransactionResult.md#constructor)

### Methods

- [getHash](utils_tx_result.TransactionResult.md#gethash)
- [waitReceipt](utils_tx_result.TransactionResult.md#waitreceipt)

## Constructors

### constructor

• **new TransactionResult**(`pe`): [`TransactionResult`](utils_tx_result.TransactionResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pe` | [`PromiEvent`](../interfaces/index.PromiEvent.md)\<`any`\> |

#### Returns

[`TransactionResult`](utils_tx_result.TransactionResult.md)

#### Defined in

[packages/sdk/connect/src/utils/tx-result.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-result.ts#L23)

## Methods

### getHash

▸ **getHash**(): `Promise`\<`string`\>

Get (& wait for) transaction hash

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/connect/src/utils/tx-result.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-result.ts#L46)

___

### waitReceipt

▸ **waitReceipt**(): `Promise`\<[`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

Get (& wait for) transaction receipt

#### Returns

`Promise`\<[`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

#### Defined in

[packages/sdk/connect/src/utils/tx-result.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-result.ts#L58)
