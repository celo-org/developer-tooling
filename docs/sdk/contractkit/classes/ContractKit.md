[**@celo/contractkit v11.0.1**](../README.md)

***

[@celo/contractkit](../globals.md) / ContractKit

# Class: ContractKit

Defined in: [contractkit/src/kit.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L83)

## Constructors

### Constructor

> **new ContractKit**(`connection`): `ContractKit`

Defined in: [contractkit/src/kit.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L93)

#### Parameters

##### connection

`Connection`

#### Returns

`ContractKit`

## Properties

### \_contracts

> `readonly` **\_contracts**: `ContractCache`

Defined in: [contractkit/src/kit.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L87)

factory for core contract's native contract wrappers

***

### celoTokens

> `readonly` **celoTokens**: [`CeloTokens`](CeloTokens.md)

Defined in: [contractkit/src/kit.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L91)

helper for interacting with CELO & stable tokens

***

### connection

> `readonly` **connection**: `Connection`

Defined in: [contractkit/src/kit.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L93)

***

### contracts

> `readonly` **contracts**: `WrapperCache`

Defined in: [contractkit/src/kit.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L89)

factory for core contract's kit wrappers

***

### registry

> `readonly` **registry**: `AddressRegistry`

Defined in: [contractkit/src/kit.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L85)

core contract's address registry

## Accessors

### defaultAccount

#### Get Signature

> **get** **defaultAccount**(): `undefined` \| `` `0x${string}` ``

Defined in: [contractkit/src/kit.ts:220](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L220)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultAccount**(`address`): `void`

Defined in: [contractkit/src/kit.ts:216](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L216)

##### Parameters

###### address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### defaultFeeCurrency

#### Get Signature

> **get** **defaultFeeCurrency**(): `undefined` \| `` `0x${string}` ``

Defined in: [contractkit/src/kit.ts:236](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L236)

##### Returns

`undefined` \| `` `0x${string}` ``

#### Set Signature

> **set** **defaultFeeCurrency**(`address`): `void`

Defined in: [contractkit/src/kit.ts:232](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L232)

##### Parameters

###### address

`undefined` | `` `0x${string}` ``

##### Returns

`void`

***

### gasInflationFactor

#### Get Signature

> **get** **gasInflationFactor**(): `number`

Defined in: [contractkit/src/kit.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L228)

##### Returns

`number`

#### Set Signature

> **set** **gasInflationFactor**(`factor`): `void`

Defined in: [contractkit/src/kit.ts:224](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L224)

##### Parameters

###### factor

`number`

##### Returns

`void`

## Methods

### addAccount()

> **addAccount**(`privateKey`): `void`

Defined in: [contractkit/src/kit.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L212)

#### Parameters

##### privateKey

`string`

#### Returns

`void`

***

### getEpochNumberOfBlock()

> **getEpochNumberOfBlock**(`blockNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:198](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L198)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getEpochSize()

> **getEpochSize**(): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:180](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L180)

#### Returns

`Promise`\<`number`\>

epoch duration (in seconds)

***

### getFirstBlockNumberForEpoch()

> **getFirstBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:186](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L186)

#### Parameters

##### epochNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getHumanReadableNetworkConfig()

> **getHumanReadableNetworkConfig**(): `Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

Defined in: [contractkit/src/kit.ts:163](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L163)

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

***

### getLastBlockNumberForEpoch()

> **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

Defined in: [contractkit/src/kit.ts:192](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L192)

#### Parameters

##### epochNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getNetworkConfig()

> **getNetworkConfig**(`humanReadable`): `Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

Defined in: [contractkit/src/kit.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L121)

#### Parameters

##### humanReadable

`boolean` = `false`

#### Returns

`Promise`\<[`NetworkConfig`](../interfaces/NetworkConfig.md) \| `Record`\<`never`, `unknown`\>\>

***

### getTotalBalance()

> **getTotalBalance**(`address`): `Promise`\<`AccountBalance`\>

Defined in: [contractkit/src/kit.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L104)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`AccountBalance`\>

***

### getWallet()

> **getWallet**(): `undefined` \| `ReadOnlyWallet`

Defined in: [contractkit/src/kit.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L100)

#### Returns

`undefined` \| `ReadOnlyWallet`

***

### sendTransaction()

> **sendTransaction**(`tx`): `Promise`\<`` `0x${string}` ``\>

Defined in: [contractkit/src/kit.ts:240](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L240)

#### Parameters

##### tx

`CeloTx`

#### Returns

`Promise`\<`` `0x${string}` ``\>

***

### setFeeCurrency()

> **setFeeCurrency**(`address`): `void`

Defined in: [contractkit/src/kit.ts:170](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L170)

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

Defined in: [contractkit/src/kit.ts:244](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L244)

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

Defined in: [contractkit/src/kit.ts:248](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/kit.ts#L248)

#### Returns

`void`
