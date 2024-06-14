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
- [populateMaxFeeInToken](kit.ContractKit.md#populatemaxfeeintoken)
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

[packages/sdk/contractkit/src/kit.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L115)

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

factory for core contract's native web3 wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L106)

___

### celoTokens

• `Readonly` **celoTokens**: [`CeloTokens`](celo_tokens.CeloTokens.md)

helper for interacting with CELO & stable tokens

#### Defined in

[packages/sdk/contractkit/src/kit.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L110)

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L115)

___

### contracts

• `Readonly` **contracts**: [`WrapperCache`](contract_cache.WrapperCache.md)

factory for core contract's kit wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L108)

___

### gasPriceSuggestionMultiplier

• **gasPriceSuggestionMultiplier**: `number` = `5`

**`Deprecated`**

no longer needed since gasPrice is available on node rpc

#### Defined in

[packages/sdk/contractkit/src/kit.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L113)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

core contract's address registry

#### Defined in

[packages/sdk/contractkit/src/kit.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L104)

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:264](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L264)

• `set` **defaultAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:260](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L260)

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:280](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L280)

• `set` **defaultFeeCurrency**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:276](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L276)

___

### gasInflationFactor

• `get` **gasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L272)

• `set` **gasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:268](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L268)

___

### web3

• `get` **web3**(): `default`

#### Returns

`default`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:311](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L311)

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

[packages/sdk/contractkit/src/kit.ts:256](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L256)

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

[packages/sdk/contractkit/src/kit.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L222)

___

### getEpochSize

▸ **getEpochSize**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:207](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L207)

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

[packages/sdk/contractkit/src/kit.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L212)

___

### getHumanReadableNetworkConfig

▸ **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:193](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L193)

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

[packages/sdk/contractkit/src/kit.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L217)

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

[packages/sdk/contractkit/src/kit.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L143)

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

[packages/sdk/contractkit/src/kit.ts:126](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L126)

___

### getWallet

▸ **getWallet**(): `undefined` \| `ReadOnlyWallet`

#### Returns

`undefined` \| `ReadOnlyWallet`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L122)

___

### isListening

▸ **isListening**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:284](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L284)

___

### isSyncing

▸ **isSyncing**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:288](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L288)

___

### populateMaxFeeInToken

▸ **populateMaxFeeInToken**(`tx`): `Promise`\<`CeloTx`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`Promise`\<`CeloTx`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:227](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L227)

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

[packages/sdk/contractkit/src/kit.ts:292](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L292)

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

[packages/sdk/contractkit/src/kit.ts:296](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L296)

___

### setFeeCurrency

▸ **setFeeCurrency**(`address`): `void`

Set an addressed to use to pay for gas fees

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | \`0x$\{string}\` | any hexadecimal address |

#### Returns

`void`

**`Dev`**

Throws if supplied address is not a valid hexadecimal address

#### Defined in

[packages/sdk/contractkit/src/kit.ts:200](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L200)

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

[packages/sdk/contractkit/src/kit.ts:303](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L303)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:307](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L307)
