[@celo/connect](../README.md) / [Exports](../modules.md) / [utils/tx-params-normalizer](../modules/utils_tx_params_normalizer.md) / TxParamsNormalizer

# Class: TxParamsNormalizer

[utils/tx-params-normalizer](../modules/utils_tx_params_normalizer.md).TxParamsNormalizer

## Table of contents

### Constructors

- [constructor](utils_tx_params_normalizer.TxParamsNormalizer.md#constructor)

### Properties

- [connection](utils_tx_params_normalizer.TxParamsNormalizer.md#connection)

### Methods

- [populate](utils_tx_params_normalizer.TxParamsNormalizer.md#populate)

## Constructors

### constructor

• **new TxParamsNormalizer**(`connection`): [`TxParamsNormalizer`](utils_tx_params_normalizer.TxParamsNormalizer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |

#### Returns

[`TxParamsNormalizer`](utils_tx_params_normalizer.TxParamsNormalizer.md)

#### Defined in

[packages/sdk/connect/src/utils/tx-params-normalizer.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-params-normalizer.ts#L22)

## Properties

### connection

• `Readonly` **connection**: [`Connection`](connection.Connection.md)

#### Defined in

[packages/sdk/connect/src/utils/tx-params-normalizer.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-params-normalizer.ts#L22)

## Methods

### populate

▸ **populate**(`celoTxParams`): `Promise`\<[`CeloTx`](../modules/types.md#celotx)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `celoTxParams` | [`CeloTx`](../modules/types.md#celotx) |

#### Returns

`Promise`\<[`CeloTx`](../modules/types.md#celotx)\>

#### Defined in

[packages/sdk/connect/src/utils/tx-params-normalizer.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-params-normalizer.ts#L24)
