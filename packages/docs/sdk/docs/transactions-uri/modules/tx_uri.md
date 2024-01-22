[@celo/transactions-uri](../README.md) / tx-uri

# Module: tx-uri

## Table of contents

### Functions

- [QrFromUri](tx_uri.md#qrfromuri)
- [buildUri](tx_uri.md#builduri)
- [parseUri](tx_uri.md#parseuri)

## Functions

### QrFromUri

▸ **QrFromUri**(`uri`, `type`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |
| `type` | ``"svg"`` \| ``"terminal"`` \| ``"utf8"`` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[tx-uri.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/transactions-uri/src/tx-uri.ts#L114)

___

### buildUri

▸ **buildUri**(`tx`, `functionName?`, `abiTypes?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tx` | `CeloTx` | `undefined` |
| `functionName?` | `string` | `undefined` |
| `abiTypes` | `string`[] | `[]` |

#### Returns

`string`

#### Defined in

[tx-uri.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/transactions-uri/src/tx-uri.ts#L65)

___

### parseUri

▸ **parseUri**(`uri`): `CeloTx`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`CeloTx`

#### Defined in

[tx-uri.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/transactions-uri/src/tx-uri.ts#L26)
