[**@celo/contractkit v10.0.0**](../README.md)

***

[@celo/contractkit](../globals.md) / ContractKit

# Class: ContractKit

Defined in: [contractkit/src/kit.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L88)

## Constructors

### Constructor

> **new ContractKit**(`connection`): `ContractKit`

Defined in: [contractkit/src/kit.ts:101](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L101)

#### Parameters

##### connection

`Connection`

#### Returns

`ContractKit`

## Properties

### \_web3Contracts

> `readonly` **\_web3Contracts**: `Web3ContractCache`

Defined in: [contractkit/src/kit.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L92)

factory for core contract's native web3 wrappers

***

### celoTokens

> `readonly` **celoTokens**: [`CeloTokens`](CeloTokens.md)

Defined in: [contractkit/src/kit.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L96)

helper for interacting with CELO & stable tokens

***

### connection

> `readonly` **connection**: `Connection`

Defined in: [contractkit/src/kit.ts:101](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L101)

***

### contracts

> `readonly` **contracts**: `WrapperCache`

Defined in: [contractkit/src/kit.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L94)

factory for core contract's kit wrappers

***

### ~~gasPriceSuggestionMultiplier~~

> **gasPriceSuggestionMultiplier**: `number` = `5`

Defined in: [contractkit/src/kit.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L99)

#### Deprecated

no longer needed since gasPrice is available on node rpc

***

### registry

> `readonly` **registry**: `AddressRegistry`

Defined in: [contractkit/src/kit.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L90)

core contract's address registry

## Accessors

### defaultAccount

#### Get Signature

> **get** **defaultAccount**(): `undefined` \| `` `0x${string}` ``

Defined in: [contractkit/src/kit.ts:229](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L229)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultAccount**(`address`): `void`

Defined in: [contractkit/src/kit.ts:225](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L225)

##### Parameters

###### address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### defaultFeeCurrency

#### Get Signature

> **get** **defaultFeeCurrency**(): `undefined` \| `` `0x${string}` ``

Defined in: [contractkit/src/kit.ts:245](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L245)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultFeeCurrency**(`address`): `void`

Defined in: [contractkit/src/kit.ts:241](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L241)

##### Parameters

###### address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### gasInflationFactor

#### Get Signature

> **get** **gasInflationFactor**(): `number`

Defined in: [contractkit/src/kit.ts:237](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L237)

##### Returns

`number`

#### Set Signature

> **set** **gasInflationFactor**(`factor`): `void`

Defined in: [contractkit/src/kit.ts:233](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L233)

##### Parameters

###### factor

`number`

##### Returns

`void`

***

### web3

#### Get Signature

> **get** **web3**(): `Web3`

Defined in: [contractkit/src/kit.ts:276](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L276)

##### Returns

`Web3`

## Methods

### addAccount()

> **addAccount**(`privateKey`): `void`

Defined in: [contractkit/src/kit.ts:221](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L221)

#### Parameters

##### privateKey

`string`

#### Returns

`void`

***

### getEpochNumberOfBlock()

> **getEpochNumberOfBlock**(`blockNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:207](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L207)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getEpochSize()

> **getEpochSize**(): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:189](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L189)

#### Returns

`Promise`\<`number`\>

epoch duration (in seconds)

***

### getFirstBlockNumberForEpoch()

> **getFirstBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:195](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L195)

#### Parameters

##### epochNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getHumanReadableNetworkConfig()

> **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

Defined in: [contractkit/src/kit.ts:172](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L172)

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

***

### getLastBlockNumberForEpoch()

> **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:201](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L201)

#### Parameters

##### epochNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getNetworkConfig()

> **getNetworkConfig**(`humanReadable`): `Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

Defined in: [contractkit/src/kit.ts:129](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L129)

#### Parameters

##### humanReadable

`boolean` = `false`

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

***

### getTotalBalance()

> **getTotalBalance**(`address`): `Promise`\<`AccountBalance`\>

Defined in: [contractkit/src/kit.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L112)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`AccountBalance`\>

***

### getWallet()

> **getWallet**(): `undefined` \| `ReadOnlyWallet`

Defined in: [contractkit/src/kit.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L108)

#### Returns

`undefined` \| `ReadOnlyWallet`

***

### isListening()

> **isListening**(): `Promise`\<`boolean`\>

Defined in: [contractkit/src/kit.ts:249](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L249)

#### Returns

`Promise`\<`boolean`\>

***

### isSyncing()

> **isSyncing**(): `Promise`\<`boolean`\>

Defined in: [contractkit/src/kit.ts:253](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L253)

#### Returns

`Promise`\<`boolean`\>

***

### sendTransaction()

> **sendTransaction**(`tx`): `Promise`\<`TransactionResult`\>

Defined in: [contractkit/src/kit.ts:257](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L257)

#### Parameters

##### tx

`CeloTx`

#### Returns

`Promise`\<`TransactionResult`\>

***

### sendTransactionObject()

> **sendTransactionObject**(`txObj`, `tx?`): `Promise`\<`TransactionResult`\>

Defined in: [contractkit/src/kit.ts:261](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L261)

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

Defined in: [contractkit/src/kit.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L179)

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

Defined in: [contractkit/src/kit.ts:268](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L268)

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

Defined in: [contractkit/src/kit.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L272)

#### Returns

`void`
