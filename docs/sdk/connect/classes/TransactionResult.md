[**@celo/connect v7.0.0-beta.0**](../README.md)

***

[@celo/connect](../globals.md) / TransactionResult

# Class: TransactionResult

Defined in: [packages/sdk/connect/src/utils/tx-result.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-result.ts#L19)

Replacement interface for web3's `PromiEvent`. Instead of emiting events
to signal different stages, eveything is exposed as a promise. Which ends
up being nicer when doing promise/async based programming.

## Constructors

### Constructor

> **new TransactionResult**(`pe`): `TransactionResult`

Defined in: [packages/sdk/connect/src/utils/tx-result.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-result.ts#L23)

#### Parameters

##### pe

[`PromiEvent`](../interfaces/PromiEvent.md)\<`any`\>

#### Returns

`TransactionResult`

## Methods

### getHash()

> **getHash**(): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/utils/tx-result.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-result.ts#L46)

Get (& wait for) transaction hash

#### Returns

`Promise`\<`string`\>

***

### waitReceipt()

> **waitReceipt**(): `Promise`\<[`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>

Defined in: [packages/sdk/connect/src/utils/tx-result.ts:58](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-result.ts#L58)

Get (& wait for) transaction receipt

#### Returns

`Promise`\<[`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>
