[@celo/connect](../README.md) / [Exports](../modules.md) / types

# Module: types

## Table of contents

### References

- [Block](types.md#block)
- [BlockHeader](types.md#blockheader)
- [BlockNumber](types.md#blocknumber)
- [Contract](types.md#contract)
- [ContractSendMethod](types.md#contractsendmethod)
- [EventLog](types.md#eventlog)
- [Log](types.md#log)
- [PastEventOptions](types.md#pasteventoptions)
- [PromiEvent](types.md#promievent)
- [Sign](types.md#sign)
- [Syncing](types.md#syncing)

### Interfaces

- [CIP42TXProperties](../interfaces/types.CIP42TXProperties.md)
- [CIP64TXProperties](../interfaces/types.CIP64TXProperties.md)
- [CeloParams](../interfaces/types.CeloParams.md)
- [CeloTxObject](../interfaces/types.CeloTxObject.md)
- [EIP1559TXProperties](../interfaces/types.EIP1559TXProperties.md)
- [EncodedTransaction](../interfaces/types.EncodedTransaction.md)
- [Error](../interfaces/types.Error.md)
- [FormattedCeloTx](../interfaces/types.FormattedCeloTx.md)
- [HttpProvider](../interfaces/types.HttpProvider.md)
- [JsonRpcPayload](../interfaces/types.JsonRpcPayload.md)
- [JsonRpcResponse](../interfaces/types.JsonRpcResponse.md)
- [LegacyTXProperties](../interfaces/types.LegacyTXProperties.md)
- [Provider](../interfaces/types.Provider.md)
- [RLPEncodedTx](../interfaces/types.RLPEncodedTx.md)

### Type Aliases

- [AccessListRaw](types.md#accesslistraw)
- [Address](types.md#address)
- [Callback](types.md#callback)
- [CeloTx](types.md#celotx)
- [CeloTxPending](types.md#celotxpending)
- [CeloTxReceipt](types.md#celotxreceipt)
- [CeloTxWithSig](types.md#celotxwithsig)
- [Hex](types.md#hex)
- [HexOrMissing](types.md#hexormissing)
- [TransactionTypes](types.md#transactiontypes)

## References

### Block

Re-exports [Block](../interfaces/index.Block.md)

___

### BlockHeader

Re-exports [BlockHeader](../interfaces/index.BlockHeader.md)

___

### BlockNumber

Re-exports [BlockNumber](index.md#blocknumber)

___

### Contract

Re-exports [Contract](../classes/index.Contract.md)

___

### ContractSendMethod

Re-exports [ContractSendMethod](../interfaces/index.ContractSendMethod.md)

___

### EventLog

Re-exports [EventLog](../interfaces/index.EventLog.md)

___

### Log

Re-exports [Log](../interfaces/index.Log.md)

___

### PastEventOptions

Re-exports [PastEventOptions](../interfaces/index.PastEventOptions.md)

___

### PromiEvent

Re-exports [PromiEvent](../interfaces/index.PromiEvent.md)

___

### Sign

Re-exports [Sign](../interfaces/index.Sign.md)

___

### Syncing

Re-exports [Syncing](../interfaces/index.Syncing.md)

## Type Aliases

### AccessListRaw

Ƭ **AccessListRaw**: [`string`, `string`[]][]

#### Defined in

[packages/sdk/connect/src/types.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L24)

___

### Address

Ƭ **Address**: `string`

#### Defined in

[packages/sdk/connect/src/types.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L9)

___

### Callback

Ƭ **Callback**\<`T`\>: (`error`: [`Error`](../interfaces/types.Error.md) \| ``null``, `result?`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`error`, `result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`Error`](../interfaces/types.Error.md) \| ``null`` |
| `result?` | `T` |

##### Returns

`void`

#### Defined in

[packages/sdk/connect/src/types.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L124)

___

### CeloTx

Ƭ **CeloTx**: `TransactionConfig` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\> & \{ `accessList?`: `AccessList` ; `type?`: [`TransactionTypes`](types.md#transactiontypes)  }

#### Defined in

[packages/sdk/connect/src/types.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L51)

___

### CeloTxPending

Ƭ **CeloTxPending**: `Transaction` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\>

#### Defined in

[packages/sdk/connect/src/types.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L121)

___

### CeloTxReceipt

Ƭ **CeloTxReceipt**: `TransactionReceipt` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\>

#### Defined in

[packages/sdk/connect/src/types.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L122)

___

### CeloTxWithSig

Ƭ **CeloTxWithSig**: [`CeloTx`](types.md#celotx) & \{ `r`: `string` ; `s`: `string` ; `v`: `number` ; `yParity`: ``0`` \| ``1``  }

#### Defined in

[packages/sdk/connect/src/types.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L54)

___

### Hex

Ƭ **Hex**: \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/types.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L11)

___

### HexOrMissing

Ƭ **HexOrMissing**: [`Hex`](types.md#hex) \| `undefined`

#### Defined in

[packages/sdk/connect/src/types.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L26)

___

### TransactionTypes

Ƭ **TransactionTypes**: ``"eip1559"`` \| ``"celo-legacy"`` \| ``"cip42"`` \| ``"cip64"``

#### Defined in

[packages/sdk/connect/src/types.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L68)
