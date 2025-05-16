[**@celo/explorer v5.0.16-beta.1**](../README.md)

***

[@celo/explorer](../README.md) / LogExplorer

# Class: LogExplorer

Defined in: [log-explorer.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L14)

## Constructors

### Constructor

> **new LogExplorer**(`kit`, `contractDetails`): `LogExplorer`

Defined in: [log-explorer.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L17)

#### Parameters

##### kit

`ContractKit`

##### contractDetails

[`ContractDetails`](../interfaces/ContractDetails.md)[]

#### Returns

`LogExplorer`

## Properties

### contractDetails

> `readonly` **contractDetails**: [`ContractDetails`](../interfaces/ContractDetails.md)[]

Defined in: [log-explorer.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L17)

## Methods

### fetchTxReceipt()

> **fetchTxReceipt**(`txhash`): `Promise`\<`null` \| `CeloTxReceipt`\>

Defined in: [log-explorer.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L47)

#### Parameters

##### txhash

`string`

#### Returns

`Promise`\<`null` \| `CeloTxReceipt`\>

***

### getKnownLogs()

> **getKnownLogs**(`tx`): `EventLog`[]

Defined in: [log-explorer.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L51)

#### Parameters

##### tx

`CeloTxReceipt`

#### Returns

`EventLog`[]

***

### tryParseLog()

> **tryParseLog**(`log`): `null` \| `EventLog`

Defined in: [log-explorer.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L62)

#### Parameters

##### log

`Log`

#### Returns

`null` \| `EventLog`
