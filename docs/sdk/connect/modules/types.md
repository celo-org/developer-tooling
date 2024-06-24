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

- [CIP64TXProperties](../interfaces/types.CIP64TXProperties.md)
- [CeloParams](../interfaces/types.CeloParams.md)
- [CeloTxObject](../interfaces/types.CeloTxObject.md)
- [EIP1559TXProperties](../interfaces/types.EIP1559TXProperties.md)
- [EncodedTransaction](../interfaces/types.EncodedTransaction.md)
- [Error](../interfaces/types.Error.md)
- [EthereumLegacyTXProperties](../interfaces/types.EthereumLegacyTXProperties.md)
- [FormattedCeloTx](../interfaces/types.FormattedCeloTx.md)
- [HttpProvider](../interfaces/types.HttpProvider.md)
- [JsonRpcPayload](../interfaces/types.JsonRpcPayload.md)
- [JsonRpcResponse](../interfaces/types.JsonRpcResponse.md)
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
- [WithSig](types.md#withsig)

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

[packages/sdk/connect/src/types.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L17)

___

### Address

Ƭ **Address**: `string`

#### Defined in

[packages/sdk/connect/src/types.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L10)

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

[packages/sdk/connect/src/types.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L96)

___

### CeloTx

Ƭ **CeloTx**: `TransactionConfig` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\> & \{ `accessList?`: `AccessList` ; `type?`: [`TransactionTypes`](types.md#transactiontypes)  }

#### Defined in

[packages/sdk/connect/src/types.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L36)

___

### CeloTxPending

Ƭ **CeloTxPending**: `Transaction` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\>

#### Defined in

[packages/sdk/connect/src/types.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L93)

___

### CeloTxReceipt

Ƭ **CeloTxReceipt**: `TransactionReceipt` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\>

#### Defined in

[packages/sdk/connect/src/types.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L94)

___

### CeloTxWithSig

Ƭ **CeloTxWithSig**: [`WithSig`](types.md#withsig)\<[`CeloTx`](types.md#celotx)\>

#### Defined in

[packages/sdk/connect/src/types.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L39)

___

### Hex

Ƭ **Hex**: \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/types.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L12)

___

### HexOrMissing

Ƭ **HexOrMissing**: [`Hex`](types.md#hex) \| `undefined`

#### Defined in

[packages/sdk/connect/src/types.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L19)

___

### TransactionTypes

Ƭ **TransactionTypes**: ``"ethereum-legacy"`` \| ``"eip1559"`` \| ``"cip64"``

#### Defined in

[packages/sdk/connect/src/types.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L53)

___

### WithSig

Ƭ **WithSig**\<`T`\>: `T` & \{ `r`: `string` ; `s`: `string` ; `v`: `number` ; `yParity`: ``0`` \| ``1``  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/sdk/connect/src/types.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L38)
