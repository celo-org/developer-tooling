[@celo/explorer](../README.md) / [log-explorer](../modules/log_explorer.md) / LogExplorer

# Class: LogExplorer

[log-explorer](../modules/log_explorer.md).LogExplorer

## Table of contents

### Constructors

- [constructor](log_explorer.LogExplorer.md#constructor)

### Properties

- [contractDetails](log_explorer.LogExplorer.md#contractdetails)

### Methods

- [fetchTxReceipt](log_explorer.LogExplorer.md#fetchtxreceipt)
- [getKnownLogs](log_explorer.LogExplorer.md#getknownlogs)
- [tryParseLog](log_explorer.LogExplorer.md#tryparselog)

## Constructors

### constructor

• **new LogExplorer**(`kit`, `contractDetails`): [`LogExplorer`](log_explorer.LogExplorer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `contractDetails` | [`ContractDetails`](../interfaces/base.ContractDetails.md)[] |

#### Returns

[`LogExplorer`](log_explorer.LogExplorer.md)

#### Defined in

[src/log-explorer.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L17)

## Properties

### contractDetails

• `Readonly` **contractDetails**: [`ContractDetails`](../interfaces/base.ContractDetails.md)[]

#### Defined in

[src/log-explorer.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L17)

## Methods

### fetchTxReceipt

▸ **fetchTxReceipt**(`txhash`): `Promise`\<``null`` \| `CeloTxReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txhash` | `string` |

#### Returns

`Promise`\<``null`` \| `CeloTxReceipt`\>

#### Defined in

[src/log-explorer.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L47)

___

### getKnownLogs

▸ **getKnownLogs**(`tx`): `EventLog`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTxReceipt` |

#### Returns

`EventLog`[]

#### Defined in

[src/log-explorer.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L51)

___

### tryParseLog

▸ **tryParseLog**(`log`): ``null`` \| `EventLog`

#### Parameters

| Name | Type |
| :------ | :------ |
| `log` | `Log` |

#### Returns

``null`` \| `EventLog`

#### Defined in

[src/log-explorer.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L62)
