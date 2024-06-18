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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L115)
=======
[packages/sdk/contractkit/src/kit.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L113)
>>>>>>> l2-integrate

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

factory for core contract's native web3 wrappers

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L106)
=======
[packages/sdk/contractkit/src/kit.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L104)
>>>>>>> l2-integrate

___

### celoTokens

• `Readonly` **celoTokens**: [`CeloTokens`](celo_tokens.CeloTokens.md)

helper for interacting with CELO & stable tokens

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L110)
=======
[packages/sdk/contractkit/src/kit.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L108)
>>>>>>> l2-integrate

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L115)
=======
[packages/sdk/contractkit/src/kit.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L113)
>>>>>>> l2-integrate

___

### contracts

• `Readonly` **contracts**: [`WrapperCache`](contract_cache.WrapperCache.md)

factory for core contract's kit wrappers

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L108)
=======
[packages/sdk/contractkit/src/kit.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L106)
>>>>>>> l2-integrate

___

### gasPriceSuggestionMultiplier

• **gasPriceSuggestionMultiplier**: `number` = `5`

**`Deprecated`**

no longer needed since gasPrice is available on node rpc

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L113)
=======
[packages/sdk/contractkit/src/kit.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L111)
>>>>>>> l2-integrate

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

core contract's address registry

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L104)
=======
[packages/sdk/contractkit/src/kit.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L102)
>>>>>>> l2-integrate

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:264](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L264)
=======
[packages/sdk/contractkit/src/kit.ts:237](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L237)
>>>>>>> l2-integrate

• `set` **defaultAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:260](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L260)
=======
[packages/sdk/contractkit/src/kit.ts:233](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L233)
>>>>>>> l2-integrate

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:280](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L280)
=======
[packages/sdk/contractkit/src/kit.ts:253](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L253)
>>>>>>> l2-integrate

• `set` **defaultFeeCurrency**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:276](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L276)
=======
[packages/sdk/contractkit/src/kit.ts:249](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L249)
>>>>>>> l2-integrate

___

### gasInflationFactor

• `get` **gasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L272)
=======
[packages/sdk/contractkit/src/kit.ts:245](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L245)
>>>>>>> l2-integrate

• `set` **gasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:268](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L268)
=======
[packages/sdk/contractkit/src/kit.ts:241](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L241)
>>>>>>> l2-integrate

___

### web3

• `get` **web3**(): `default`

#### Returns

`default`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:311](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L311)
=======
[packages/sdk/contractkit/src/kit.ts:284](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L284)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:256](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L256)
=======
[packages/sdk/contractkit/src/kit.ts:229](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L229)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L222)
=======
[packages/sdk/contractkit/src/kit.ts:220](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L220)
>>>>>>> l2-integrate

___

### getEpochSize

▸ **getEpochSize**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:207](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L207)
=======
[packages/sdk/contractkit/src/kit.ts:205](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L205)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L212)
=======
[packages/sdk/contractkit/src/kit.ts:210](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L210)
>>>>>>> l2-integrate

___

### getHumanReadableNetworkConfig

▸ **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:193](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L193)
=======
[packages/sdk/contractkit/src/kit.ts:191](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L191)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L217)
=======
[packages/sdk/contractkit/src/kit.ts:215](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L215)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L143)
=======
[packages/sdk/contractkit/src/kit.ts:141](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L141)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:126](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L126)
=======
[packages/sdk/contractkit/src/kit.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L124)
>>>>>>> l2-integrate

___

### getWallet

▸ **getWallet**(): `undefined` \| `ReadOnlyWallet`

#### Returns

`undefined` \| `ReadOnlyWallet`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L122)
=======
[packages/sdk/contractkit/src/kit.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L120)
>>>>>>> l2-integrate

___

### isListening

▸ **isListening**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:284](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L284)
=======
[packages/sdk/contractkit/src/kit.ts:257](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L257)
>>>>>>> l2-integrate

___

### isSyncing

▸ **isSyncing**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

<<<<<<< HEAD
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
=======
[packages/sdk/contractkit/src/kit.ts:261](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L261)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:292](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L292)
=======
[packages/sdk/contractkit/src/kit.ts:265](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L265)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:296](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L296)
=======
[packages/sdk/contractkit/src/kit.ts:269](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L269)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:200](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L200)
=======
[packages/sdk/contractkit/src/kit.ts:198](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L198)
>>>>>>> l2-integrate

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

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:303](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L303)
=======
[packages/sdk/contractkit/src/kit.ts:276](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L276)
>>>>>>> l2-integrate

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/sdk/contractkit/src/kit.ts:307](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L307)
=======
[packages/sdk/contractkit/src/kit.ts:280](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L280)
>>>>>>> l2-integrate
