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

[packages/sdk/connect/src/connection.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L63)

## Properties

### paramsPopulator

• `Readonly` **paramsPopulator**: [`TxParamsNormalizer`](utils_tx_params_normalizer.TxParamsNormalizer.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L60)

___

### rpcCaller

• **rpcCaller**: [`RpcCaller`](../interfaces/utils_rpc_caller.RpcCaller.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L61)

___

### wallet

• `Optional` **wallet**: [`ReadOnlyWallet`](../interfaces/wallet.ReadOnlyWallet.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L63)

___

### web3

• `Readonly` **web3**: `default`

#### Defined in

[packages/sdk/connect/src/connection.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L63)

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| \`0x$\{string}\`

Default account for generated transactions (eg. tx.from)

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/connection.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L115)

• `set` **defaultAccount**(`address`): `void`

Set default account for generated transactions (eg. tx.from )

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:107](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L107)

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| \`0x$\{string}\`

#### Returns

`undefined` \| \`0x$\{string}\`

#### Defined in

[packages/sdk/connect/src/connection.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L139)

• `set` **defaultFeeCurrency**(`address`): `void`

Set the ERC20 address for the token to use to pay for transaction fees.
The ERC20 address SHOULD be whitelisted for gas, but this is not checked or enforced.

Set to `null` to use CELO

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `undefined` \| \`0x$\{string}\` | ERC20 address |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L135)

___

### defaultGasInflationFactor

• `get` **defaultGasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

[packages/sdk/connect/src/connection.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L123)

• `set` **defaultGasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L119)

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

[packages/sdk/connect/src/connection.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L147)

___

### chainId

▸ **chainId**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:407](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L407)

___

### coinbase

▸ **coinbase**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:429](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L429)

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

[packages/sdk/connect/src/connection.ts:359](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L359)

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

[packages/sdk/connect/src/connection.ts:390](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L390)

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

[packages/sdk/connect/src/connection.ts:435](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L435)

___

### getAbiCoder

▸ **getAbiCoder**(): [`AbiCoder`](../interfaces/abi_types.AbiCoder.md)

#### Returns

[`AbiCoder`](../interfaces/abi_types.AbiCoder.md)

#### Defined in

[packages/sdk/connect/src/connection.ts:386](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L386)

___

### getAccounts

▸ **getAccounts**(): `Promise`\<\`0x$\{string}\`[]\>

#### Returns

`Promise`\<\`0x$\{string}\`[]\>

#### Defined in

[packages/sdk/connect/src/connection.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L182)

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

[packages/sdk/connect/src/connection.ts:478](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L478)

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

[packages/sdk/connect/src/connection.ts:453](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L453)

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

[packages/sdk/connect/src/connection.ts:466](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L466)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:444](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L444)

___

### getLocalAccounts

▸ **getLocalAccounts**(): \`0x$\{string}\`[]

#### Returns

\`0x$\{string}\`[]

#### Defined in

[packages/sdk/connect/src/connection.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L176)

___

### getNodeAccounts

▸ **getNodeAccounts**(): `Promise`\<\`0x$\{string}\`[]\>

#### Returns

`Promise`\<\`0x$\{string}\`[]\>

#### Defined in

[packages/sdk/connect/src/connection.ts:171](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L171)

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

[packages/sdk/connect/src/connection.ts:487](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L487)

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

[packages/sdk/connect/src/connection.ts:418](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L418)

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

[packages/sdk/connect/src/connection.ts:495](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L495)

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

[packages/sdk/connect/src/connection.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L100)

___

### isListening

▸ **isListening**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L190)

___

### isLocalAccount

▸ **isLocalAccount**(`address?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address?` | \`0x$\{string}\` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/connect/src/connection.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L143)

___

### isSyncing

▸ **isSyncing**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/connect/src/connection.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L194)

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

[packages/sdk/connect/src/connection.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L96)

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

[packages/sdk/connect/src/connection.ts:425](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L425)

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

[packages/sdk/connect/src/connection.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L159)

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

[packages/sdk/connect/src/connection.ts:332](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L332)

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

[packages/sdk/connect/src/connection.ts:218](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L218)

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

[packages/sdk/connect/src/connection.ts:234](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L234)

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

[packages/sdk/connect/src/connection.ts:336](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L336)

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

[packages/sdk/connect/src/connection.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L78)

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

[packages/sdk/connect/src/connection.ts:305](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L305)

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

[packages/sdk/connect/src/connection.ts:266](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L266)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[packages/sdk/connect/src/connection.ts:520](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/connection.ts#L520)
