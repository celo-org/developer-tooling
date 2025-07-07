[**@celo/connect v7.0.0-beta.1**](../README.md)

***

[@celo/connect](../globals.md) / Connection

# Class: Connection

Defined in: [packages/sdk/connect/src/connection.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L57)

Connection is a Class for connecting to Celo, sending Transactions, etc

## Param

an instance of web3

## Param

a child class of WalletBase

## Param

sets handleRevert on the web3.eth instance passed in

## Constructors

### Constructor

> **new Connection**(`web3`, `wallet?`, `handleRevert?`): `Connection`

Defined in: [packages/sdk/connect/src/connection.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L63)

#### Parameters

##### web3

`Web3`

##### wallet?

[`ReadOnlyWallet`](../interfaces/ReadOnlyWallet.md)

##### handleRevert?

`boolean` = `true`

#### Returns

`Connection`

## Properties

### paramsPopulator

> `readonly` **paramsPopulator**: `TxParamsNormalizer`

Defined in: [packages/sdk/connect/src/connection.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L60)

***

### rpcCaller

> **rpcCaller**: [`RpcCaller`](../interfaces/RpcCaller.md)

Defined in: [packages/sdk/connect/src/connection.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L61)

***

### wallet?

> `optional` **wallet**: [`ReadOnlyWallet`](../interfaces/ReadOnlyWallet.md)

Defined in: [packages/sdk/connect/src/connection.ts:65](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L65)

***

### web3

> `readonly` **web3**: `Web3`

Defined in: [packages/sdk/connect/src/connection.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L64)

## Accessors

### defaultAccount

#### Get Signature

> **get** **defaultAccount**(): `undefined` \| `` `0x${string}` ``

Defined in: [packages/sdk/connect/src/connection.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L119)

Default account for generated transactions (eg. tx.from)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultAccount**(`address`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L111)

Set default account for generated transactions (eg. tx.from )

##### Parameters

###### address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### defaultFeeCurrency

#### Get Signature

> **get** **defaultFeeCurrency**(): `undefined` \| `` `0x${string}` ``

Defined in: [packages/sdk/connect/src/connection.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L143)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultFeeCurrency**(`address`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L139)

Set the ERC20 address for the token to use to pay for transaction fees.
The ERC20 address SHOULD be whitelisted for gas, but this is not checked or enforced.

Set to `null` to use CELO

##### Parameters

###### address

ERC20 address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### defaultGasInflationFactor

#### Get Signature

> **get** **defaultGasInflationFactor**(): `number`

Defined in: [packages/sdk/connect/src/connection.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L127)

##### Returns

`number`

#### Set Signature

> **set** **defaultGasInflationFactor**(`factor`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L123)

##### Parameters

###### factor

`number`

##### Returns

`void`

## Methods

### addAccount()

> **addAccount**(`privateKey`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:151](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L151)

#### Parameters

##### privateKey

`string`

#### Returns

`void`

***

### chainId()

> **chainId**(): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:409](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L409)

#### Returns

`Promise`\<`number`\>

***

### coinbase()

> **coinbase**(): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:431](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L431)

#### Returns

`Promise`\<`string`\>

***

### estimateGas()

> **estimateGas**(`tx`, `gasEstimator`, `caller`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:361](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L361)

#### Parameters

##### tx

[`CeloTx`](../type-aliases/CeloTx.md)

##### gasEstimator

(`tx`) => `Promise`\<`number`\>

##### caller

(`tx`) => `Promise`\<`string`\>

#### Returns

`Promise`\<`number`\>

***

### estimateGasWithInflationFactor()

> **estimateGasWithInflationFactor**(`tx`, `gasEstimator?`, `caller?`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:392](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L392)

#### Parameters

##### tx

[`CeloTx`](../type-aliases/CeloTx.md)

##### gasEstimator?

(`tx`) => `Promise`\<`number`\>

##### caller?

(`tx`) => `Promise`\<`string`\>

#### Returns

`Promise`\<`number`\>

***

### gasPrice()

> **gasPrice**(`feeCurrency?`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:437](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L437)

#### Parameters

##### feeCurrency?

`string`

#### Returns

`Promise`\<`string`\>

***

### getAbiCoder()

> **getAbiCoder**(): [`AbiCoder`](../interfaces/AbiCoder.md)

Defined in: [packages/sdk/connect/src/connection.ts:388](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L388)

#### Returns

[`AbiCoder`](../interfaces/AbiCoder.md)

***

### getAccounts()

> **getAccounts**(): `Promise`\<`` `0x${string}` ``[]\>

Defined in: [packages/sdk/connect/src/connection.ts:186](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L186)

#### Returns

`Promise`\<`` `0x${string}` ``[]\>

***

### getBalance()

> **getBalance**(`address`, `defaultBlock?`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:487](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L487)

#### Parameters

##### address

`string`

##### defaultBlock?

[`BlockNumber`](../type-aliases/BlockNumber.md)

#### Returns

`Promise`\<`string`\>

***

### getBlock()

> **getBlock**(`blockHashOrBlockNumber`, `fullTxObjects`): `Promise`\<[`Block`](../interfaces/Block.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:462](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L462)

#### Parameters

##### blockHashOrBlockNumber

[`BlockNumber`](../type-aliases/BlockNumber.md)

##### fullTxObjects

`boolean` = `true`

#### Returns

`Promise`\<[`Block`](../interfaces/Block.md)\>

***

### getBlockHeader()

> **getBlockHeader**(`blockHashOrBlockNumber`): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:475](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L475)

#### Parameters

##### blockHashOrBlockNumber

[`BlockNumber`](../type-aliases/BlockNumber.md)

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

***

### getBlockNumber()

> **getBlockNumber**(): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:453](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L453)

#### Returns

`Promise`\<`number`\>

***

### getLocalAccounts()

> **getLocalAccounts**(): `` `0x${string}` ``[]

Defined in: [packages/sdk/connect/src/connection.ts:180](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L180)

#### Returns

`` `0x${string}` ``[]

***

### getMaxPriorityFeePerGas()

> **getMaxPriorityFeePerGas**(`feeCurrency?`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:446](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L446)

#### Parameters

##### feeCurrency?

`string`

#### Returns

`Promise`\<`string`\>

***

### getNodeAccounts()

> **getNodeAccounts**(): `Promise`\<`` `0x${string}` ``[]\>

Defined in: [packages/sdk/connect/src/connection.ts:175](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L175)

#### Returns

`Promise`\<`` `0x${string}` ``[]\>

***

### getTransaction()

> **getTransaction**(`transactionHash`): `Promise`\<[`CeloTxPending`](../type-aliases/CeloTxPending.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:496](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L496)

#### Parameters

##### transactionHash

`string`

#### Returns

`Promise`\<[`CeloTxPending`](../type-aliases/CeloTxPending.md)\>

***

### getTransactionCount()

> **getTransactionCount**(`address`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:420](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L420)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`number`\>

***

### getTransactionReceipt()

> **getTransactionReceipt**(`txhash`): `Promise`\<`null` \| [`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:504](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L504)

#### Parameters

##### txhash

`string`

#### Returns

`Promise`\<`null` \| [`CeloTxReceipt`](../type-aliases/CeloTxReceipt.md)\>

***

### hexToAscii()

> **hexToAscii**(`hex`): `string`

Defined in: [packages/sdk/connect/src/connection.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L104)

#### Parameters

##### hex

`string`

#### Returns

`string`

***

### isListening()

> **isListening**(): `Promise`\<`boolean`\>

Defined in: [packages/sdk/connect/src/connection.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L194)

#### Returns

`Promise`\<`boolean`\>

***

### isLocalAccount()

> **isLocalAccount**(`address?`): `boolean`

Defined in: [packages/sdk/connect/src/connection.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L147)

#### Parameters

##### address?

`` `0x${string}` ``

#### Returns

`boolean`

***

### isSyncing()

> **isSyncing**(): `Promise`\<`boolean`\>

Defined in: [packages/sdk/connect/src/connection.ts:198](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L198)

#### Returns

`Promise`\<`boolean`\>

***

### keccak256()

> **keccak256**(`value`): `string`

Defined in: [packages/sdk/connect/src/connection.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L100)

#### Parameters

##### value

`string` | `BN`

#### Returns

`string`

***

### nonce()

> **nonce**(`address`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:427](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L427)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`number`\>

***

### removeAccount()

> **removeAccount**(`address`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:163](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L163)

#### Parameters

##### address

`string`

#### Returns

`void`

***

### sendSignedTransaction()

> **sendSignedTransaction**(`signedTransactionData`): `Promise`\<[`TransactionResult`](TransactionResult.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:336](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L336)

#### Parameters

##### signedTransactionData

`string`

#### Returns

`Promise`\<[`TransactionResult`](TransactionResult.md)\>

***

### sendTransaction()

> **sendTransaction**(`tx`): `Promise`\<[`TransactionResult`](TransactionResult.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L222)

Send a transaction to celo-blockchain.

Similar to `web3.eth.sendTransaction()` but with following differences:
 - applies connections tx's defaults
 - estimatesGas before sending
 - returns a `TransactionResult` instead of `PromiEvent`

#### Parameters

##### tx

[`CeloTx`](../type-aliases/CeloTx.md)

#### Returns

`Promise`\<[`TransactionResult`](TransactionResult.md)\>

***

### sendTransactionObject()

> **sendTransactionObject**(`txObj`, `tx?`): `Promise`\<[`TransactionResult`](TransactionResult.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:238](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L238)

#### Parameters

##### txObj

[`CeloTxObject`](../interfaces/CeloTxObject.md)\<`any`\>

##### tx?

`Omit`\<[`CeloTx`](../type-aliases/CeloTx.md), `"data"`\>

#### Returns

`Promise`\<[`TransactionResult`](TransactionResult.md)\>

***

### setFeeMarketGas()

> **setFeeMarketGas**(`tx`): `Promise`\<[`CeloTx`](../type-aliases/CeloTx.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:340](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L340)

#### Parameters

##### tx

[`CeloTx`](../type-aliases/CeloTx.md)

#### Returns

`Promise`\<[`CeloTx`](../type-aliases/CeloTx.md)\>

***

### setProvider()

> **setProvider**(`provider`): `boolean`

Defined in: [packages/sdk/connect/src/connection.ts:82](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L82)

#### Parameters

##### provider

[`Provider`](../interfaces/Provider.md)

#### Returns

`boolean`

***

### sign()

> **sign**(`dataToSign`, `address`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:309](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L309)

#### Parameters

##### dataToSign

`string`

##### address

`string` | `number`

#### Returns

`Promise`\<`string`\>

***

### signTypedData()

> **signTypedData**(`signer`, `typedData`, `version`): `Promise`\<`Signature`\>

Defined in: [packages/sdk/connect/src/connection.ts:270](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L270)

#### Parameters

##### signer

`string`

##### typedData

`EIP712TypedData`

##### version

`null` | `1` | `3` | `4` | `5`

#### Returns

`Promise`\<`Signature`\>

***

### stop()

> **stop**(): `void`

Defined in: [packages/sdk/connect/src/connection.ts:529](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L529)

#### Returns

`void`
