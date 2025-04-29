[**@celo/connect**](../../../README.md)

***

[@celo/connect](../../../modules.md) / [utils/tx-params-normalizer](../README.md) / TxParamsNormalizer

# Class: TxParamsNormalizer

Defined in: [packages/sdk/connect/src/utils/tx-params-normalizer.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-params-normalizer.ts#L18)

## Constructors

### Constructor

> **new TxParamsNormalizer**(`connection`): `TxParamsNormalizer`

Defined in: [packages/sdk/connect/src/utils/tx-params-normalizer.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-params-normalizer.ts#L21)

#### Parameters

##### connection

[`Connection`](../../../connection/classes/Connection.md)

#### Returns

`TxParamsNormalizer`

## Properties

### connection

> `readonly` **connection**: [`Connection`](../../../connection/classes/Connection.md)

Defined in: [packages/sdk/connect/src/utils/tx-params-normalizer.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-params-normalizer.ts#L21)

## Methods

### populate()

> **populate**(`celoTxParams`): `Promise`\<[`CeloTx`](../../../types/type-aliases/CeloTx.md)\>

Defined in: [packages/sdk/connect/src/utils/tx-params-normalizer.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/tx-params-normalizer.ts#L23)

#### Parameters

##### celoTxParams

[`CeloTx`](../../../types/type-aliases/CeloTx.md)

#### Returns

`Promise`\<[`CeloTx`](../../../types/type-aliases/CeloTx.md)\>
