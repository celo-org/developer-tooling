[@celo/connect](../README.md) / [Exports](../modules.md) / [connection](../modules/connection.md) / Connection

# Class: Connection

[connection](../modules/connection.md).Connection

Connection is a Class for connecting to Celo, sending Transactions, etc

**`Param`**

an instance of web3

**`Optional`**

wallet a child class of WalletBase

**`Optional`**

handleRevert sets handleRevert on the web3.eth instance passed in

## Table of contents

### Constructors

- [constructor](connection.Connection.md#constructor)

### Properties

- [paramsPopulator](connection.Connection.md#paramspopulator)
- [rpcCaller](connection.Connection.md#rpccaller)
- [wallet](connection.Connection.md#wallet)
- [web3](connection.Connection.md#web3)

### Accessors

- [defaultAccount](connection.Connection.md#defaultaccount)
- [defaultFeeCurrency](connection.Connection.md#defaultfeecurrency)
- [defaultGasInflationFactor](connection.Connection.md#defaultgasinflationfactor)

### Methods

- [addAccount](connection.Connection.md#addaccount)
- [chainId](connection.Connection.md#chainid)
- [coinbase](connection.Connection.md#coinbase)
- [estimateGas](connection.Connection.md#estimategas)
- [estimateGasWithInflationFactor](connection.Connection.md#estimategaswithinflationfactor)
- [gasPrice](connection.Connection.md#gasprice)
- [getAbiCoder](connection.Connection.md#getabicoder)
- [getAccounts](connection.Connection.md#getaccounts)
- [getBalance](connection.Connection.md#getbalance)
- [getBlock](connection.Connection.md#getblock)
- [getBlockHeader](connection.Connection.md#getblockheader)
- [getBlockNumber](connection.Connection.md#getblocknumber)
- [getLocalAccounts](connection.Connection.md#getlocalaccounts)
- [getNodeAccounts](connection.Connection.md#getnodeaccounts)
- [getTransaction](connection.Connection.md#gettransaction)
- [getTransactionCount](connection.Connection.md#gettransactioncount)
- [getTransactionReceipt](connection.Connection.md#gettransactionreceipt)
- [hexToAscii](connection.Connection.md#hextoascii)
- [isListening](connection.Connection.md#islistening)
- [isLocalAccount](connection.Connection.md#islocalaccount)
- [isSyncing](connection.Connection.md#issyncing)
- [keccak256](connection.Connection.md#keccak256)
- [nonce](connection.Connection.md#nonce)
- [removeAccount](connection.Connection.md#removeaccount)
- [sendSignedTransaction](connection.Connection.md#sendsignedtransaction)
- [sendTransaction](connection.Connection.md#sendtransaction)
- [sendTransactionObject](connection.Connection.md#sendtransactionobject)
- [setFeeMarketGas](connection.Connection.md#setfeemarketgas)
- [setProvider](connection.Connection.md#setprovider)
- [sign](connection.Connection.md#sign)
- [signTypedData](connection.Connection.md#signtypeddata)
- [stop](connection.Connection.md#stop)

## Constructors

### constructor

• **new Connection**(`web3`, `wallet?`, `handleRevert?`): [`Connection`](connection.Connection.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `default` | `undefined` |
| `wallet?` | [`ReadOnlyWallet`](../interfaces/wallet.ReadOnlyWallet.md) | `undefined` |
| `handleRevert` | `boolean` | `true` |

#### Returns

[`Connection`](connection.Connection.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L62)

## Properties

### paramsPopulator

• `Readonly` **paramsPopulator**: [`TxParamsNormalizer`](utils_tx_params_normalizer.TxParamsNormalizer.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L59)

___

### rpcCaller

• **rpcCaller**: [`RpcCaller`](../interfaces/utils_rpc_caller.RpcCaller.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L60)

___

### wallet

• `Optional` **wallet**: [`ReadOnlyWallet`](../interfaces/wallet.ReadOnlyWallet.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L62)

___

### web3

• `Readonly` **web3**: `default`

#### Defined in

[packages/sdk/connect/src/connection.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L62)

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| `string`

Default account for generated transactions (eg. tx.from)

#### Returns

`undefined` \| `string`

#### Defined in

[packages/sdk/connect/src/connection.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L114)

• `set` **defaultAccount**(`address`): `void`

Set default account for generated transactions (eg. tx.from )

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L106)

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/sdk/connect/src/connection.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L138)

• `set` **defaultFeeCurrency**(`address`): `void`

Set the ERC20 address for the token to use to pay for transaction fees.
The ERC20 must be whitelisted for gas.

Set to `null` to use CELO

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `undefined` \| `string` | ERC20 address |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:134](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L134)

___

### defaultGasInflationFactor

• `get` **defaultGasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/connect/src/connection.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L122)

• `set` **defaultGasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:118](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L118)

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

[packages/sdk/connect/src/connection.ts:146](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L146)

___

### chainId

▸ **chainId**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:404](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L404)

___

### coinbase

▸ **coinbase**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:426](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L426)

___

### estimateGas

▸ **estimateGas**(`tx`, `gasEstimator?`, `caller?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`CeloTx`](../modules/types.md#celotx) |
| `gasEstimator` | (`tx`: [`CeloTx`](../modules/types.md#celotx)) => `Promise`\<`number`\> |
| `caller` | (`tx`: [`CeloTx`](../modules/types.md#celotx)) => `Promise`\<`string`\> |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:356](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L356)

___

### estimateGasWithInflationFactor

▸ **estimateGasWithInflationFactor**(`tx`, `gasEstimator?`, `caller?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`CeloTx`](../modules/types.md#celotx) |
| `gasEstimator?` | (`tx`: [`CeloTx`](../modules/types.md#celotx)) => `Promise`\<`number`\> |
| `caller?` | (`tx`: [`CeloTx`](../modules/types.md#celotx)) => `Promise`\<`string`\> |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:387](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L387)

___

### gasPrice

▸ **gasPrice**(`feeCurrency?`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `feeCurrency?` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:432](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L432)

___

### getAbiCoder

▸ **getAbiCoder**(): [`AbiCoder`](../interfaces/abi_types.AbiCoder.md)

#### Returns

[`AbiCoder`](../interfaces/abi_types.AbiCoder.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:383](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L383)

___

### getAccounts

▸ **getAccounts**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/connect/src/connection.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L179)

___

### getBalance

▸ **getBalance**(`address`, `defaultBlock?`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `defaultBlock?` | [`BlockNumber`](../modules/index.md#blocknumber) |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:475](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L475)

___

### getBlock

▸ **getBlock**(`blockHashOrBlockNumber`, `fullTxObjects?`): `Promise`\<[`Block`](../interfaces/index.Block.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `blockHashOrBlockNumber` | [`BlockNumber`](../modules/index.md#blocknumber) | `undefined` |
| `fullTxObjects` | `boolean` | `true` |

#### Returns

`Promise`\<[`Block`](../interfaces/index.Block.md)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:450](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L450)

___

### getBlockHeader

▸ **getBlockHeader**(`blockHashOrBlockNumber`): `Promise`\<[`BlockHeader`](../interfaces/index.BlockHeader.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHashOrBlockNumber` | [`BlockNumber`](../modules/index.md#blocknumber) |

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/index.BlockHeader.md)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:463](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L463)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:441](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L441)

___

### getLocalAccounts

▸ **getLocalAccounts**(): `string`[]

#### Returns

`string`[]

#### Defined in

[packages/sdk/connect/src/connection.ts:175](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L175)

___

### getNodeAccounts

▸ **getNodeAccounts**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/connect/src/connection.ts:170](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L170)

___

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`\<[`CeloTxPending`](../modules/types.md#celotxpending)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionHash` | `string` |

#### Returns

`Promise`\<[`CeloTxPending`](../modules/types.md#celotxpending)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:484](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L484)

___

### getTransactionCount

▸ **getTransactionCount**(`address`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:415](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L415)

___

### getTransactionReceipt

▸ **getTransactionReceipt**(`txhash`): `Promise`\<``null`` \| [`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txhash` | `string` |

#### Returns

`Promise`\<``null`` \| [`CeloTxReceipt`](../modules/types.md#celotxreceipt)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:492](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L492)

___

### hexToAscii

▸ **hexToAscii**(`hex`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/connection.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L99)

___

### isListening

▸ **isListening**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:187](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L187)

___

### isLocalAccount

▸ **isLocalAccount**(`address?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address?` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/connect/src/connection.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L142)

___

### isSyncing

▸ **isSyncing**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:191](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L191)

___

### keccak256

▸ **keccak256**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `BN` |

#### Returns

`string`

#### Defined in

[packages/sdk/connect/src/connection.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L95)

___

### nonce

▸ **nonce**(`address`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:422](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L422)

___

### removeAccount

▸ **removeAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L158)

___

### sendSignedTransaction

▸ **sendSignedTransaction**(`signedTransactionData`): `Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signedTransactionData` | `string` |

#### Returns

`Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:329](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L329)

___

### sendTransaction

▸ **sendTransaction**(`tx`): `Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

Send a transaction to celo-blockchain.

Similar to `web3.eth.sendTransaction()` but with following differences:
 - applies connections tx's defaults
 - estimatesGas before sending
 - returns a `TransactionResult` instead of `PromiEvent`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`CeloTx`](../modules/types.md#celotx) |

#### Returns

`Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:215](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L215)

___

### sendTransactionObject

▸ **sendTransactionObject**(`txObj`, `tx?`): `Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txObj` | [`CeloTxObject`](../interfaces/types.CeloTxObject.md)\<`any`\> |
| `tx?` | `Omit`\<[`CeloTx`](../modules/types.md#celotx), ``"data"``\> |

#### Returns

`Promise`\<[`TransactionResult`](utils_tx_result.TransactionResult.md)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:231](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L231)

___

### setFeeMarketGas

▸ **setFeeMarketGas**(`tx`): `Promise`\<[`CeloTx`](../modules/types.md#celotx)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`CeloTx`](../modules/types.md#celotx) |

#### Returns

`Promise`\<[`CeloTx`](../modules/types.md#celotx)\>

#### Defined in

[packages/sdk/connect/src/connection.ts:333](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L333)

___

### setProvider

▸ **setProvider**(`provider`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`Provider`](../interfaces/types.Provider.md) |

#### Returns

`boolean`

#### Defined in

[packages/sdk/connect/src/connection.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L77)

___

### sign

▸ **sign**(`dataToSign`, `address`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataToSign` | `string` |
| `address` | `string` \| `number` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:302](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L302)

___

### signTypedData

▸ **signTypedData**(`signer`, `typedData`, `version?`): `Promise`\<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `string` |
| `typedData` | `EIP712TypedData` |
| `version?` | ``1`` \| ``3`` \| ``4`` \| ``5`` |

#### Returns

`Promise`\<`Signature`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:263](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L263)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:517](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L517)
