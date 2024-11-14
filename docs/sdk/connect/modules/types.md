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
- [CIP66TXProperties](../interfaces/types.CIP66TXProperties.md)
- [CeloParams](../interfaces/types.CeloParams.md)
- [CeloTxObject](../interfaces/types.CeloTxObject.md)
- [EIP1559TXProperties](../interfaces/types.EIP1559TXProperties.md)
- [Eip1193Provider](../interfaces/types.Eip1193Provider.md)
- [Eip1193RequestArguments](../interfaces/types.Eip1193RequestArguments.md)
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

[packages/sdk/connect/src/types.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L19)

___

### Address

Ƭ **Address**: `string`

#### Defined in

[packages/sdk/connect/src/types.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L11)

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

[packages/sdk/connect/src/types.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L105)

___

### CeloTx

Ƭ **CeloTx**: `TransactionConfig` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\> & \{ `accessList?`: `AccessList` ; `type?`: [`TransactionTypes`](types.md#transactiontypes)  }

#### Defined in

[packages/sdk/connect/src/types.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L39)

___

### CeloTxPending

Ƭ **CeloTxPending**: `Transaction` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\>

#### Defined in

[packages/sdk/connect/src/types.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L102)

___

### CeloTxReceipt

Ƭ **CeloTxReceipt**: `TransactionReceipt` & `Partial`\<[`CeloParams`](../interfaces/types.CeloParams.md)\>

#### Defined in

[packages/sdk/connect/src/types.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L103)

___

### CeloTxWithSig

Ƭ **CeloTxWithSig**: [`WithSig`](types.md#withsig)\<[`CeloTx`](types.md#celotx)\>

#### Defined in

[packages/sdk/connect/src/types.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L42)

___

### Hex

Ƭ **Hex**: \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/types.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L13)

___

### HexOrMissing

Ƭ **HexOrMissing**: [`Hex`](types.md#hex) \| `undefined`

#### Defined in

[packages/sdk/connect/src/types.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L21)

___

### TransactionTypes

Ƭ **TransactionTypes**: ``"ethereum-legacy"`` \| ``"eip1559"`` \| ``"cip42"`` \| ``"cip64"`` \| ``"cip66"``

#### Defined in

[packages/sdk/connect/src/types.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L56)

___

### WithSig

Ƭ **WithSig**\<`T`\>: `T` & \{ `r`: `string` ; `s`: `string` ; `v`: `number` ; `yParity`: ``0`` \| ``1``  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/sdk/connect/src/types.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/types.ts#L41)
