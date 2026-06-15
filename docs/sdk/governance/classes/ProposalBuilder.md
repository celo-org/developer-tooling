[**@celo/governance v5.1.10**](../README.md)

***

[@celo/governance](../README.md) / ProposalBuilder

# Class: ProposalBuilder

Defined in: [proposal-builder.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L34)

Builder class to construct proposals from JSON or transaction objects.

## Constructors

### Constructor

> **new ProposalBuilder**(`kit`, `builders`, `registryAdditions`): `ProposalBuilder`

Defined in: [proposal-builder.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L37)

#### Parameters

##### kit

`ContractKit`

##### builders

() => `Promise`\<`ProposalTransaction`\>[] = `[]`

##### registryAdditions

[`RegistryAdditions`](../interfaces/RegistryAdditions.md) = `{}`

#### Returns

`ProposalBuilder`

## Properties

### externalCallProxyRepoint

> **externalCallProxyRepoint**: `Map`\<`string`, `string`\>

Defined in: [proposal-builder.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L35)

***

### registryAdditions

> `readonly` **registryAdditions**: [`RegistryAdditions`](../interfaces/RegistryAdditions.md) = `{}`

Defined in: [proposal-builder.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L40)

## Methods

### addEncodedTx()

> **addEncodedTx**(`data`, `params`): `number`

Defined in: [proposal-builder.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L86)

Adds an encoded transaction to the list for proposal construction.

#### Parameters

##### data

`string`

Hex-encoded function call data.

##### params

[`ProposalTxParams`](../type-aliases/ProposalTxParams.md)

Parameters for how the transaction should be executed.

#### Returns

`number`

***

### addJsonTx()

> **addJsonTx**(`tx`): `number`

Defined in: [proposal-builder.ts:245](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L245)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)

#### Returns

`number`

***

### addProxyRepointingTx()

> **addProxyRepointingTx**(`contract`, `newImplementationAddress`): `void`

Defined in: [proposal-builder.ts:71](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L71)

Adds a transaction to set the implementation on a proxy to the given address.

#### Parameters

##### contract

`CeloContract`

Celo contract name of the proxy which should have its implementation set.

##### newImplementationAddress

`string`

Address of the new contract implementation.

#### Returns

`void`

***

### build()

> **build**(): `Promise`\<`ProposalTransaction`[]\>

Defined in: [proposal-builder.ts:47](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L47)

Build calls all of the added build steps and returns the final proposal.

#### Returns

`Promise`\<`ProposalTransaction`[]\>

A constructed Proposal object (i.e. a list of ProposalTransaction)

***

### buildCallToCoreContract()

> **buildCallToCoreContract**(`tx`): `Promise`\<`ProposalTransaction`\>

Defined in: [proposal-builder.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L169)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### buildCallToExternalContract()

> **buildCallToExternalContract**(`tx`): `Promise`\<`ProposalTransaction`\>

Defined in: [proposal-builder.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L117)

#### Parameters

##### tx

[`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### fromEncodedTx()

> **fromEncodedTx**(`data`, `params`): `ProposalTransaction`

Defined in: [proposal-builder.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L60)

Converts encoded function data into a proposal transaction object.

#### Parameters

##### data

`string`

Hex-encoded function call data.

##### params

[`ProposalTxParams`](../type-aliases/ProposalTxParams.md)

Parameters for how the transaction should be executed.

#### Returns

`ProposalTransaction`

***

### fromJsonTx()

> **fromJsonTx**(`tx`): `Promise`\<`ProposalTransaction`\>

Defined in: [proposal-builder.ts:203](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L203)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md) | [`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### getRegistryAddition()

> **getRegistryAddition**(`contract`): `undefined` \| `string`

Defined in: [proposal-builder.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L92)

#### Parameters

##### contract

`CeloContract`

#### Returns

`undefined` \| `string`

***

### isRegistryContract()

> **isRegistryContract**(`contract`): `boolean`

Defined in: [proposal-builder.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L95)

#### Parameters

##### contract

`CeloContract`

#### Returns

`boolean`

***

### lookupExternalMethodABI()

> **lookupExternalMethodABI**(`address`, `tx`): `Promise`\<`null` \| `AbiItem`\>

Defined in: [proposal-builder.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L99)

#### Parameters

##### address

`string`

##### tx

[`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`null` \| `AbiItem`\>

***

### setRegistryAddition()

> **setRegistryAddition**(`contract`, `address`): `string`

Defined in: [proposal-builder.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L89)

#### Parameters

##### contract

`CeloContract`

##### address

`string`

#### Returns

`string`

***

### transformArgs()

> **transformArgs**(`abi`, `args`): `any`[]

Defined in: [proposal-builder.ts:150](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L150)

#### Parameters

##### abi

`AbiItem`

##### args

`any`[]

#### Returns

`any`[]
