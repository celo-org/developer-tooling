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
- [estimateMaxFeeInFeeToken](kit.ContractKit.md#estimatemaxfeeinfeetoken)
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

[packages/sdk/contractkit/src/kit.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L114)

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

factory for core contract's native web3 wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L105)

___

### celoTokens

• `Readonly` **celoTokens**: [`CeloTokens`](celo_tokens.CeloTokens.md)

helper for interacting with CELO & stable tokens

#### Defined in

[packages/sdk/contractkit/src/kit.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L109)

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L114)

___

### contracts

• `Readonly` **contracts**: [`WrapperCache`](contract_cache.WrapperCache.md)

factory for core contract's kit wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L107)

___

### gasPriceSuggestionMultiplier

• **gasPriceSuggestionMultiplier**: `number` = `5`

**`Deprecated`**

no longer needed since gasPrice is available on node rpc

#### Defined in

[packages/sdk/contractkit/src/kit.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L112)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

core contract's address registry

#### Defined in

[packages/sdk/contractkit/src/kit.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L103)

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:332](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L332)

• `set` **defaultAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:328](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L328)

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:348](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L348)

• `set` **defaultFeeCurrency**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:344](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L344)

___

### gasInflationFactor

• `get` **gasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:340](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L340)

• `set` **gasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:336](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L336)

___

### web3

• `get` **web3**(): `default`

#### Returns

`default`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:379](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L379)

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

[packages/sdk/contractkit/src/kit.ts:324](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L324)

___

### estimateMaxFeeInFeeToken

▸ **estimateMaxFeeInFeeToken**(`«destructured»`): `Promise`\<`bigint`\>

For cip 66 transactions (the prefered way to pay for gas with fee tokens on Cel2) it is necessary
to provide the absolute limit one is willing to pay denominated in the token.
In contrast with earlier tx types for fee currencies (celo legacy, cip42, cip 64).

Calulating Estimation requires the gas, maxfeePerGas and the conversion rate from CELO to feeToken
https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0066.md

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `feeCurrency` | \`0x$\{string}\` |
| › `gasLimit` | `bigint` |
| › `maxFeePerGas` | `bigint` |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:298](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L298)

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

[packages/sdk/contractkit/src/kit.ts:244](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L244)

___

### getEpochSize

▸ **getEpochSize**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:220](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L220)

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

[packages/sdk/contractkit/src/kit.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L228)

___

### getHumanReadableNetworkConfig

▸ **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:204](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L204)

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

[packages/sdk/contractkit/src/kit.ts:236](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L236)

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

[packages/sdk/contractkit/src/kit.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L142)

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

[packages/sdk/contractkit/src/kit.ts:125](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L125)

___

### getWallet

▸ **getWallet**(): `undefined` \| `ReadOnlyWallet`

#### Returns

`undefined` \| `ReadOnlyWallet`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L121)

___

### isListening

▸ **isListening**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:352](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L352)

___

### isSyncing

▸ **isSyncing**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:356](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L356)

___

### populateMaxFeeInToken

▸ **populateMaxFeeInToken**(`tx`): `Promise`\<`CeloTx`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionConfig` & `Partial`\<`CeloParams`\> & \{ `accessList?`: `AccessList` ; `type?`: `TransactionTypes`  } & `Pick`\<`Required`\<`CeloTx`\>, ``"feeCurrency"``\> |

#### Returns

`Promise`\<`CeloTx`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:261](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L261)

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

[packages/sdk/contractkit/src/kit.ts:360](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L360)

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

[packages/sdk/contractkit/src/kit.ts:364](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L364)

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

[packages/sdk/contractkit/src/kit.ts:211](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L211)

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

[packages/sdk/contractkit/src/kit.ts:371](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L371)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:375](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L375)
