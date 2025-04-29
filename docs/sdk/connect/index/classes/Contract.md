[**@celo/connect**](../../README.md)

***

[@celo/connect](../../modules.md) / [index](../README.md) / Contract

# Class: Contract

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:26

## Constructors

### Constructor

> **new Contract**(`jsonInterface`, `address?`, `options?`): `Contract`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:27

#### Parameters

##### jsonInterface

`AbiItem`[]

##### address?

`string`

##### options?

`ContractOptions`

#### Returns

`Contract`

## Properties

### defaultAccount

> **defaultAccount**: `null` \| `string`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:37

***

### defaultBlock

> **defaultBlock**: [`BlockNumber`](../type-aliases/BlockNumber.md)

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:38

***

### defaultChain

> **defaultChain**: `chain`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:41

***

### defaultCommon

> **defaultCommon**: `Common`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:39

***

### defaultHardfork

> **defaultHardfork**: `hardfork`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:40

***

### events

> **events**: `any`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:65

***

### handleRevert

> **handleRevert**: `boolean`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:45

***

### methods

> **methods**: `any`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:53

***

### options

> **options**: `Options`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:47

***

### transactionBlockTimeout

> **transactionBlockTimeout**: `number`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:44

***

### transactionConfirmationBlocks

> **transactionConfirmationBlocks**: `number`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:43

***

### transactionPollingTimeout

> **transactionPollingTimeout**: `number`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:42

## Methods

### clone()

> **clone**(): `Contract`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:49

#### Returns

`Contract`

***

### deploy()

> **deploy**(`options`): [`ContractSendMethod`](../interfaces/ContractSendMethod.md)

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:51

#### Parameters

##### options

`DeployOptions`

#### Returns

[`ContractSendMethod`](../interfaces/ContractSendMethod.md)

***

### getPastEvents()

#### Call Signature

> **getPastEvents**(`event`): `Promise`\<`EventData`[]\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:67

##### Parameters

###### event

`string`

##### Returns

`Promise`\<`EventData`[]\>

#### Call Signature

> **getPastEvents**(`event`, `options`, `callback`): `Promise`\<`EventData`[]\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:68

##### Parameters

###### event

`string`

###### options

[`PastEventOptions`](../interfaces/PastEventOptions.md)

###### callback

(`error`, `events`) => `void`

##### Returns

`Promise`\<`EventData`[]\>

#### Call Signature

> **getPastEvents**(`event`, `options`): `Promise`\<`EventData`[]\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:73

##### Parameters

###### event

`string`

###### options

[`PastEventOptions`](../interfaces/PastEventOptions.md)

##### Returns

`Promise`\<`EventData`[]\>

#### Call Signature

> **getPastEvents**(`event`, `callback`): `Promise`\<`EventData`[]\>

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:74

##### Parameters

###### event

`string`

###### callback

(`error`, `events`) => `void`

##### Returns

`Promise`\<`EventData`[]\>

***

### once()

#### Call Signature

> **once**(`event`, `callback`): `void`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:55

##### Parameters

###### event

`string`

###### callback

(`error`, `event`) => `void`

##### Returns

`void`

#### Call Signature

> **once**(`event`, `options`, `callback`): `void`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:59

##### Parameters

###### event

`string`

###### options

`EventOptions`

###### callback

(`error`, `event`) => `void`

##### Returns

`void`

***

### setProvider()

> `static` **setProvider**(`provider`, `accounts?`): `void`

Defined in: node\_modules/web3-eth-contract/types/index.d.ts:33

#### Parameters

##### provider

`provider`

##### accounts?

`Accounts`

#### Returns

`void`
