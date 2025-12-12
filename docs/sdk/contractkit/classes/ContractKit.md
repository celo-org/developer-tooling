[**@celo/contractkit v10.0.3**](../README.md)

***

[@celo/contractkit](../globals.md) / ContractKit

# Class: ContractKit

Defined in: [contractkit/src/kit.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L89)

## Constructors

### Constructor

> **new ContractKit**(`connection`): `ContractKit`

Defined in: [contractkit/src/kit.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L102)

#### Parameters

##### connection

`Connection`

#### Returns

`ContractKit`

## Properties

### \_web3Contracts

> `readonly` **\_web3Contracts**: `Web3ContractCache`

Defined in: [contractkit/src/kit.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L93)

factory for core contract's native web3 wrappers

***

### celoTokens

> `readonly` **celoTokens**: [`CeloTokens`](CeloTokens.md)

Defined in: [contractkit/src/kit.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L97)

helper for interacting with CELO & stable tokens

***

### connection

> `readonly` **connection**: `Connection`

Defined in: [contractkit/src/kit.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L102)

***

### contracts

> `readonly` **contracts**: `WrapperCache`

Defined in: [contractkit/src/kit.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L95)

factory for core contract's kit wrappers

***

### ~~gasPriceSuggestionMultiplier~~

> **gasPriceSuggestionMultiplier**: `number` = `5`

Defined in: [contractkit/src/kit.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L100)

#### Deprecated

no longer needed since gasPrice is available on node rpc

***

### registry

> `readonly` **registry**: `AddressRegistry`

Defined in: [contractkit/src/kit.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L91)

core contract's address registry

## Accessors

### defaultAccount

#### Get Signature

> **get** **defaultAccount**(): `undefined` \| `` `0x${string}` ``

Defined in: [contractkit/src/kit.ts:230](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L230)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultAccount**(`address`): `void`

Defined in: [contractkit/src/kit.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L226)

##### Parameters

###### address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### defaultFeeCurrency

#### Get Signature

> **get** **defaultFeeCurrency**(): `undefined` \| `` `0x${string}` ``

Defined in: [contractkit/src/kit.ts:246](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L246)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultFeeCurrency**(`address`): `void`

Defined in: [contractkit/src/kit.ts:242](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L242)

##### Parameters

###### address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### gasInflationFactor

#### Get Signature

> **get** **gasInflationFactor**(): `number`

Defined in: [contractkit/src/kit.ts:238](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L238)

##### Returns

`number`

#### Set Signature

> **set** **gasInflationFactor**(`factor`): `void`

Defined in: [contractkit/src/kit.ts:234](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L234)

##### Parameters

###### factor

`number`

##### Returns

`void`

***

### web3

#### Get Signature

> **get** **web3**(): `Web3`

Defined in: [contractkit/src/kit.ts:277](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L277)

##### Returns

`Web3`

## Methods

### addAccount()

> **addAccount**(`privateKey`): `void`

Defined in: [contractkit/src/kit.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L222)

#### Parameters

##### privateKey

`string`

#### Returns

`void`

***

### getEpochNumberOfBlock()

> **getEpochNumberOfBlock**(`blockNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:208](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L208)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getEpochSize()

> **getEpochSize**(): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L190)

#### Returns

`Promise`\<`number`\>

epoch duration (in seconds)

***

### getFirstBlockNumberForEpoch()

> **getFirstBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:196](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L196)

#### Parameters

##### epochNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getHumanReadableNetworkConfig()

> **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

Defined in: [contractkit/src/kit.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L173)

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

***

### getLastBlockNumberForEpoch()

> **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L202)

#### Parameters

##### epochNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getNetworkConfig()

> **getNetworkConfig**(`humanReadable`): `Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

Defined in: [contractkit/src/kit.ts:130](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L130)

#### Parameters

##### humanReadable

`boolean` = `false`

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

***

### getTotalBalance()

> **getTotalBalance**(`address`): `Promise`\<`AccountBalance`\>

Defined in: [contractkit/src/kit.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L113)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`AccountBalance`\>

***

### getWallet()

> **getWallet**(): `undefined` \| `ReadOnlyWallet`

Defined in: [contractkit/src/kit.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L109)

#### Returns

`undefined` \| `ReadOnlyWallet`

***

### isListening()

> **isListening**(): `Promise`\<`boolean`\>

Defined in: [contractkit/src/kit.ts:250](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L250)

#### Returns

`Promise`\<`boolean`\>

***

### isSyncing()

> **isSyncing**(): `Promise`\<`boolean`\>

Defined in: [contractkit/src/kit.ts:254](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L254)

#### Returns

`Promise`\<`boolean`\>

***

### sendTransaction()

> **sendTransaction**(`tx`): `Promise`\<`TransactionResult`\>

Defined in: [contractkit/src/kit.ts:258](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L258)

#### Parameters

##### tx

`CeloTx`

#### Returns

`Promise`\<`TransactionResult`\>

***

### sendTransactionObject()

> **sendTransactionObject**(`txObj`, `tx?`): `Promise`\<`TransactionResult`\>

Defined in: [contractkit/src/kit.ts:262](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L262)

#### Parameters

##### txObj

`CeloTxObject`\<`any`\>

##### tx?

`Omit`\<`CeloTx`, `"data"`\>

#### Returns

`Promise`\<`TransactionResult`\>

***

### setFeeCurrency()

> **setFeeCurrency**(`address`): `void`

Defined in: [contractkit/src/kit.ts:180](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L180)

Set an addressed to use to pay for gas fees

#### Parameters

##### address

`` `0x${string}` ``

any hexadecimal address

#### Returns

`void`

#### Dev

Throws if supplied address is not a valid hexadecimal address

***

### signTypedData()

> **signTypedData**(`signer`, `typedData`): `Promise`\<`Signature`\>

Defined in: [contractkit/src/kit.ts:269](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L269)

#### Parameters

##### signer

`string`

##### typedData

`EIP712TypedData`

#### Returns

`Promise`\<`Signature`\>

***

### stop()

> **stop**(): `void`

Defined in: [contractkit/src/kit.ts:273](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L273)

#### Returns

`void`
