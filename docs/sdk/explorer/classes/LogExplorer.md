[**@celo/explorer v5.1.1**](../README.md)

***

[@celo/explorer](../README.md) / LogExplorer

# Class: LogExplorer

Defined in: [log-explorer.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L15)

## Constructors

### Constructor

> **new LogExplorer**(`kit`, `contractDetails`): `LogExplorer`

Defined in: [log-explorer.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L18)

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

Defined in: [log-explorer.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L20)

## Methods

### fetchTxReceipt()

> **fetchTxReceipt**(`txhash`): `Promise`\<`null` \| `TransactionReceipt`\>

Defined in: [log-explorer.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L51)

#### Parameters

##### txhash

`string`

#### Returns

`Promise`\<`null` \| `TransactionReceipt`\>

***

### getKnownLogs()

> **getKnownLogs**(`tx`): `EventLog`[]

Defined in: [log-explorer.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L61)

#### Parameters

##### tx

`TransactionReceipt`

#### Returns

`EventLog`[]

***

### tryParseLog()

> **tryParseLog**(`log`): `null` \| `EventLog`

Defined in: [log-explorer.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/explorer/src/log-explorer.ts#L72)

#### Parameters

##### log

`Log`\<`bigint`, `number`, `false`\>

#### Returns

`null` \| `EventLog`
