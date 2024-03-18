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

[packages/sdk/contractkit/src/kit.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L106)

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: [`Web3ContractCache`](web3_contract_cache.Web3ContractCache.md)

factory for core contract's native web3 wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L97)

___

### celoTokens

• `Readonly` **celoTokens**: [`CeloTokens`](celo_tokens.CeloTokens.md)

helper for interacting with CELO & stable tokens

#### Defined in

[packages/sdk/contractkit/src/kit.ts:101](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L101)

___

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L106)

___

### contracts

• `Readonly` **contracts**: [`WrapperCache`](contract_cache.WrapperCache.md)

factory for core contract's kit wrappers

#### Defined in

[packages/sdk/contractkit/src/kit.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L99)

___

### gasPriceSuggestionMultiplier

• **gasPriceSuggestionMultiplier**: `number` = `5`

**`Deprecated`**

no longer needed since gasPrice is available on node rpc

#### Defined in

[packages/sdk/contractkit/src/kit.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L104)

___

### registry

• `Readonly` **registry**: [`AddressRegistry`](address_registry.AddressRegistry.md)

core contract's address registry

#### Defined in

[packages/sdk/contractkit/src/kit.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L95)

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L226)

• `set` **defaultAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L222)

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:242](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L242)

• `set` **defaultFeeCurrency**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:238](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L238)

___

### gasInflationFactor

• `get` **gasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:234](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L234)

• `set` **gasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:230](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L230)

___

### web3

• `get` **web3**(): `default`

#### Returns

`default`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:273](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L273)

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

[packages/sdk/contractkit/src/kit.ts:218](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L218)

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

[packages/sdk/contractkit/src/kit.ts:209](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L209)

___

### getEpochSize

▸ **getEpochSize**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L194)

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

[packages/sdk/contractkit/src/kit.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L199)

___

### getHumanReadableNetworkConfig

▸ **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/kit.NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:180](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L180)

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

[packages/sdk/contractkit/src/kit.ts:204](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L204)

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

[packages/sdk/contractkit/src/kit.ts:134](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L134)

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

[packages/sdk/contractkit/src/kit.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L117)

___

### getWallet

▸ **getWallet**(): `undefined` \| `ReadOnlyWallet`

#### Returns

`undefined` \| `ReadOnlyWallet`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L113)

___

### isListening

▸ **isListening**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:246](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L246)

___

### isSyncing

▸ **isSyncing**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/kit.ts:250](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L250)

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

[packages/sdk/contractkit/src/kit.ts:254](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L254)

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

[packages/sdk/contractkit/src/kit.ts:258](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L258)

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

[packages/sdk/contractkit/src/kit.ts:187](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L187)

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

[packages/sdk/contractkit/src/kit.ts:265](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L265)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/kit.ts:269](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L269)
