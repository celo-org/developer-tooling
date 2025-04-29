[**@celo/connect**](../../README.md)

***

[@celo/connect](../../modules.md) / [connection](../README.md) / Connection

# Class: Connection

Defined in: [packages/sdk/connect/src/connection.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L57)

Connection is a Class for connecting to Celo, sending Transactions, etc

## Param

an instance of web3

## Optional

wallet a child class of WalletBase

## Optional

handleRevert sets handleRevert on the web3.eth instance passed in

## Constructors

### Constructor

> **new Connection**(`web3`, `wallet?`, `handleRevert?`): `Connection`

Defined in: [packages/sdk/connect/src/connection.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L63)

#### Parameters

##### web3

`Web3`

##### wallet?

[`ReadOnlyWallet`](../../wallet/interfaces/ReadOnlyWallet.md)

##### handleRevert?

`boolean` = `true`

#### Returns

`Connection`

## Properties

### paramsPopulator

> `readonly` **paramsPopulator**: [`TxParamsNormalizer`](../../utils/tx-params-normalizer/classes/TxParamsNormalizer.md)

Defined in: [packages/sdk/connect/src/connection.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L60)

***

### rpcCaller

> **rpcCaller**: [`RpcCaller`](../../utils/rpc-caller/interfaces/RpcCaller.md)

Defined in: [packages/sdk/connect/src/connection.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L61)

***

### wallet?

> `optional` **wallet**: [`ReadOnlyWallet`](../../wallet/interfaces/ReadOnlyWallet.md)

Defined in: [packages/sdk/connect/src/connection.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L63)

***

### web3

> `readonly` **web3**: `Web3`

Defined in: [packages/sdk/connect/src/connection.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L63)

## Accessors

### defaultAccount

#### Get Signature

> **get** **defaultAccount**(): `undefined` \| `` `0x${string}` ``

Defined in: [packages/sdk/connect/src/connection.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L115)

Default account for generated transactions (eg. tx.from)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultAccount**(`address`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L107)

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

Defined in: [packages/sdk/connect/src/connection.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L139)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultFeeCurrency**(`address`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L135)

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

Defined in: [packages/sdk/connect/src/connection.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L123)

##### Returns

`number`

#### Set Signature

> **set** **defaultGasInflationFactor**(`factor`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L119)

##### Parameters

###### factor

`number`

##### Returns

`void`

## Methods

### addAccount()

> **addAccount**(`privateKey`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L147)

#### Parameters

##### privateKey

`string`

#### Returns

`void`

***

### chainId()

> **chainId**(): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:405](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L405)

#### Returns

`Promise`\<`number`\>

***

### coinbase()

> **coinbase**(): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:427](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L427)

#### Returns

`Promise`\<`string`\>

***

### estimateGas()

> **estimateGas**(`tx`, `gasEstimator`, `caller`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:357](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L357)

#### Parameters

##### tx

[`CeloTx`](../../types/type-aliases/CeloTx.md)

##### gasEstimator

(`tx`) => `Promise`\<`number`\>

##### caller

(`tx`) => `Promise`\<`string`\>

#### Returns

`Promise`\<`number`\>

***

### estimateGasWithInflationFactor()

> **estimateGasWithInflationFactor**(`tx`, `gasEstimator?`, `caller?`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:388](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L388)

#### Parameters

##### tx

[`CeloTx`](../../types/type-aliases/CeloTx.md)

##### gasEstimator?

(`tx`) => `Promise`\<`number`\>

##### caller?

(`tx`) => `Promise`\<`string`\>

#### Returns

`Promise`\<`number`\>

***

### gasPrice()

> **gasPrice**(`feeCurrency?`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:433](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L433)

#### Parameters

##### feeCurrency?

`string`

#### Returns

`Promise`\<`string`\>

***

### getAbiCoder()

> **getAbiCoder**(): [`AbiCoder`](../../abi-types/interfaces/AbiCoder.md)

Defined in: [packages/sdk/connect/src/connection.ts:384](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L384)

#### Returns

[`AbiCoder`](../../abi-types/interfaces/AbiCoder.md)

***

### getAccounts()

> **getAccounts**(): `Promise`\<`` `0x${string}` ``[]\>

Defined in: [packages/sdk/connect/src/connection.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L182)

#### Returns

`Promise`\<`` `0x${string}` ``[]\>

***

### getBalance()

> **getBalance**(`address`, `defaultBlock?`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:483](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L483)

#### Parameters

##### address

`string`

##### defaultBlock?

[`BlockNumber`](../../index/type-aliases/BlockNumber.md)

#### Returns

`Promise`\<`string`\>

***

### getBlock()

> **getBlock**(`blockHashOrBlockNumber`, `fullTxObjects`): `Promise`\<[`Block`](../../index/interfaces/Block.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:458](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L458)

#### Parameters

##### blockHashOrBlockNumber

[`BlockNumber`](../../index/type-aliases/BlockNumber.md)

##### fullTxObjects

`boolean` = `true`

#### Returns

`Promise`\<[`Block`](../../index/interfaces/Block.md)\>

***

### getBlockHeader()

> **getBlockHeader**(`blockHashOrBlockNumber`): `Promise`\<[`BlockHeader`](../../index/interfaces/BlockHeader.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:471](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L471)

#### Parameters

##### blockHashOrBlockNumber

[`BlockNumber`](../../index/type-aliases/BlockNumber.md)

#### Returns

`Promise`\<[`BlockHeader`](../../index/interfaces/BlockHeader.md)\>

***

### getBlockNumber()

> **getBlockNumber**(): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:449](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L449)

#### Returns

`Promise`\<`number`\>

***

### getLocalAccounts()

> **getLocalAccounts**(): `` `0x${string}` ``[]

Defined in: [packages/sdk/connect/src/connection.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L176)

#### Returns

`` `0x${string}` ``[]

***

### getMaxPriorityFeePerGas()

> **getMaxPriorityFeePerGas**(`feeCurrency?`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:442](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L442)

#### Parameters

##### feeCurrency?

`string`

#### Returns

`Promise`\<`string`\>

***

### getNodeAccounts()

> **getNodeAccounts**(): `Promise`\<`` `0x${string}` ``[]\>

Defined in: [packages/sdk/connect/src/connection.ts:171](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L171)

#### Returns

`Promise`\<`` `0x${string}` ``[]\>

***

### getTransaction()

> **getTransaction**(`transactionHash`): `Promise`\<[`CeloTxPending`](../../types/type-aliases/CeloTxPending.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:492](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L492)

#### Parameters

##### transactionHash

`string`

#### Returns

`Promise`\<[`CeloTxPending`](../../types/type-aliases/CeloTxPending.md)\>

***

### getTransactionCount()

> **getTransactionCount**(`address`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:416](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L416)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`number`\>

***

### getTransactionReceipt()

> **getTransactionReceipt**(`txhash`): `Promise`\<`null` \| [`CeloTxReceipt`](../../types/type-aliases/CeloTxReceipt.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:500](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L500)

#### Parameters

##### txhash

`string`

#### Returns

`Promise`\<`null` \| [`CeloTxReceipt`](../../types/type-aliases/CeloTxReceipt.md)\>

***

### hexToAscii()

> **hexToAscii**(`hex`): `string`

Defined in: [packages/sdk/connect/src/connection.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L100)

#### Parameters

##### hex

`string`

#### Returns

`string`

***

### isListening()

> **isListening**(): `Promise`\<`boolean`\>

Defined in: [packages/sdk/connect/src/connection.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L190)

#### Returns

`Promise`\<`boolean`\>

***

### isLocalAccount()

> **isLocalAccount**(`address?`): `boolean`

Defined in: [packages/sdk/connect/src/connection.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L143)

#### Parameters

##### address?

`` `0x${string}` ``

#### Returns

`boolean`

***

### isSyncing()

> **isSyncing**(): `Promise`\<`boolean`\>

Defined in: [packages/sdk/connect/src/connection.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L194)

#### Returns

`Promise`\<`boolean`\>

***

### keccak256()

> **keccak256**(`value`): `string`

Defined in: [packages/sdk/connect/src/connection.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L96)

#### Parameters

##### value

`string` | `BN`

#### Returns

`string`

***

### nonce()

> **nonce**(`address`): `Promise`\<`number`\>

Defined in: [packages/sdk/connect/src/connection.ts:423](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L423)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`number`\>

***

### removeAccount()

> **removeAccount**(`address`): `void`

Defined in: [packages/sdk/connect/src/connection.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L159)

#### Parameters

##### address

`string`

#### Returns

`void`

***

### sendSignedTransaction()

> **sendSignedTransaction**(`signedTransactionData`): `Promise`\<[`TransactionResult`](../../utils/tx-result/classes/TransactionResult.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:332](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L332)

#### Parameters

##### signedTransactionData

`string`

#### Returns

`Promise`\<[`TransactionResult`](../../utils/tx-result/classes/TransactionResult.md)\>

***

### sendTransaction()

> **sendTransaction**(`tx`): `Promise`\<[`TransactionResult`](../../utils/tx-result/classes/TransactionResult.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:218](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L218)

Send a transaction to celo-blockchain.

Similar to `web3.eth.sendTransaction()` but with following differences:
 - applies connections tx's defaults
 - estimatesGas before sending
 - returns a `TransactionResult` instead of `PromiEvent`

#### Parameters

##### tx

[`CeloTx`](../../types/type-aliases/CeloTx.md)

#### Returns

`Promise`\<[`TransactionResult`](../../utils/tx-result/classes/TransactionResult.md)\>

***

### sendTransactionObject()

> **sendTransactionObject**(`txObj`, `tx?`): `Promise`\<[`TransactionResult`](../../utils/tx-result/classes/TransactionResult.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:234](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L234)

#### Parameters

##### txObj

[`CeloTxObject`](../../types/interfaces/CeloTxObject.md)\<`any`\>

##### tx?

`Omit`\<[`CeloTx`](../../types/type-aliases/CeloTx.md), `"data"`\>

#### Returns

`Promise`\<[`TransactionResult`](../../utils/tx-result/classes/TransactionResult.md)\>

***

### setFeeMarketGas()

> **setFeeMarketGas**(`tx`): `Promise`\<[`CeloTx`](../../types/type-aliases/CeloTx.md)\>

Defined in: [packages/sdk/connect/src/connection.ts:336](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L336)

#### Parameters

##### tx

[`CeloTx`](../../types/type-aliases/CeloTx.md)

#### Returns

`Promise`\<[`CeloTx`](../../types/type-aliases/CeloTx.md)\>

***

### setProvider()

> **setProvider**(`provider`): `boolean`

Defined in: [packages/sdk/connect/src/connection.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L78)

#### Parameters

##### provider

[`Provider`](../../types/interfaces/Provider.md)

#### Returns

`boolean`

***

### sign()

> **sign**(`dataToSign`, `address`): `Promise`\<`string`\>

Defined in: [packages/sdk/connect/src/connection.ts:305](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L305)

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

Defined in: [packages/sdk/connect/src/connection.ts:266](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L266)

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

Defined in: [packages/sdk/connect/src/connection.ts:525](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L525)

#### Returns

`void`
