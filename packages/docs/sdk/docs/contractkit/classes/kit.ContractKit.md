[@celo/contractkit](../README.md) / [Exports](../modules.md) / [kit](../modules/kit.md) / ContractKit

# Class: ContractKit

[kit](../modules/kit.md).ContractKit

## Table of contents

### Constructors

- [constructor](kit.ContractKit.md#constructor)

### Properties

- [\_web3Contracts](kit.ContractKit.md#_web3contracts)
- [celoTokens](kit.ContractKit.md#celotokens)
- [connection](kit.ContractKit.md#connection)
- [contracts](kit.ContractKit.md#contracts)
- [gasPriceSuggestionMultiplier](kit.ContractKit.md#gaspricesuggestionmultiplier)
- [registry](kit.ContractKit.md#registry)

### Accessors

- [defaultAccount](kit.ContractKit.md#defaultaccount)
- [defaultFeeCurrency](kit.ContractKit.md#defaultfeecurrency)
- [gasInflationFactor](kit.ContractKit.md#gasinflationfactor)
- [web3](kit.ContractKit.md#web3)

### Methods

- [addAccount](kit.ContractKit.md#addaccount)
- [getEpochNumberOfBlock](kit.ContractKit.md#getepochnumberofblock)
- [getEpochSize](kit.ContractKit.md#getepochsize)
- [getFirstBlockNumberForEpoch](kit.ContractKit.md#getfirstblocknumberforepoch)
- [getHumanReadableNetworkConfig](kit.ContractKit.md#gethumanreadablenetworkconfig)
- [getLastBlockNumberForEpoch](kit.ContractKit.md#getlastblocknumberforepoch)
- [getNetworkConfig](kit.ContractKit.md#getnetworkconfig)
- [getTotalBalance](kit.ContractKit.md#gettotalbalance)
- [getWallet](kit.ContractKit.md#getwallet)
- [isListening](kit.ContractKit.md#islistening)
- [isSyncing](kit.ContractKit.md#issyncing)
- [sendTransaction](kit.ContractKit.md#sendtransaction)
- [sendTransactionObject](kit.ContractKit.md#sendtransactionobject)
- [setFeeCurrency](kit.ContractKit.md#setfeecurrency)
- [signTypedData](kit.ContractKit.md#signtypeddata)
- [stop](kit.ContractKit.md#stop)

## Constructors

### constructor

• **new ContractKit**(`connection`): [`ContractKit`](kit.ContractKit.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |

#### Returns

[`ContractKit`](kit.ContractKit.md)

#### Defined in

[packages/sdk/contractkit/src/kit.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L112)

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

factory for core contract's native web3 wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L103)

___

### celoTokens

• `Readonly` **celoTokens**: [`CeloTokens`](celo_tokens.CeloTokens.md)

helper for interacting with CELO & stable tokens

#### Defined in

[packages/sdk/contractkit/src/kit.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L107)

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L112)

___

### contracts

• `Readonly` **contracts**: [`WrapperCache`](contract_cache.WrapperCache.md)

factory for core contract's kit wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L105)

___

### gasPriceSuggestionMultiplier

• **gasPriceSuggestionMultiplier**: `number` = `5`

**`Deprecated`**

no longer needed since gasPrice is available on node rpc

#### Defined in

[packages/sdk/contractkit/src/kit.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L110)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

core contract's address registry

#### Defined in

[packages/sdk/contractkit/src/kit.ts:101](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L101)

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:232](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L232)

• `set` **defaultAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L228)

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:248](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L248)

• `set` **defaultFeeCurrency**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:244](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L244)

___

### gasInflationFactor

• `get` **gasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:240](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L240)

• `set` **gasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:236](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L236)

___

### web3

• `get` **web3**(): `default`

#### Returns

`default`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:279](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L279)

## Methods

### addAccount

▸ **addAccount**(`privateKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:224](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L224)

___

### getEpochNumberOfBlock

▸ **getEpochNumberOfBlock**(`blockNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:215](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L215)

___

### getEpochSize

▸ **getEpochSize**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:200](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L200)

___

### getFirstBlockNumberForEpoch

▸ **getFirstBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:205](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L205)

___

### getHumanReadableNetworkConfig

▸ **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:186](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L186)

___

### getLastBlockNumberForEpoch

▸ **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:210](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L210)

___

### getNetworkConfig

▸ **getNetworkConfig**(`humanReadable?`): `Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `humanReadable` | `boolean` | `false` |

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:140](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L140)

___

### getTotalBalance

▸ **getTotalBalance**(`address`): `Promise`\<`AccountBalance`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`AccountBalance`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L123)

___

### getWallet

▸ **getWallet**(): `undefined` \| `ReadOnlyWallet`

#### Returns

`undefined` \| `ReadOnlyWallet`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L119)

___

### isListening

▸ **isListening**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:252](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L252)

___

### isSyncing

▸ **isSyncing**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:256](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L256)

___

### sendTransaction

▸ **sendTransaction**(`tx`): `Promise`\<`TransactionResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`Promise`\<`TransactionResult`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:260](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L260)

___

### sendTransactionObject

▸ **sendTransactionObject**(`txObj`, `tx?`): `Promise`\<`TransactionResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txObj` | `CeloTxObject`\<`any`\> |
| `tx?` | `Omit`\<`CeloTx`, ``"data"``\> |

#### Returns

`Promise`\<`TransactionResult`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:264](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L264)

___

### setFeeCurrency

▸ **setFeeCurrency**(`tokenContract`): `Promise`\<`void`\>

Set CeloToken to use to pay for gas fees

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenContract` | [`CeloTokenContract`](../modules/base.md#celotokencontract) | CELO (GoldToken) or a supported StableToken contract |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:192](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L192)

___

### signTypedData

▸ **signTypedData**(`signer`, `typedData`): `Promise`\<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `string` |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`\<`Signature`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:271](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L271)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L275)
