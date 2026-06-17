[**@celo/governance v5.1.12**](../README.md)

***

[@celo/governance](../README.md) / ProposalBuilder

# Class: ProposalBuilder

Defined in: [proposal-builder.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L33)

Builder class to construct proposals from JSON or transaction objects.

## Constructors

### Constructor

> **new ProposalBuilder**(`kit`, `builders`, `registryAdditions`): `ProposalBuilder`

Defined in: [proposal-builder.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L36)

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

Defined in: [proposal-builder.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L34)

***

### registryAdditions

> `readonly` **registryAdditions**: [`RegistryAdditions`](../interfaces/RegistryAdditions.md) = `{}`

Defined in: [proposal-builder.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L39)

## Methods

### addEncodedTx()

> **addEncodedTx**(`data`, `params`): `number`

Defined in: [proposal-builder.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L85)

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

Defined in: [proposal-builder.ts:287](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L287)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)

#### Returns

`number`

***

### addProxyRepointingTx()

> **addProxyRepointingTx**(`contract`, `newImplementationAddress`): `void`

Defined in: [proposal-builder.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L70)

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

Defined in: [proposal-builder.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L46)

Build calls all of the added build steps and returns the final proposal.

#### Returns

`Promise`\<`ProposalTransaction`[]\>

A constructed Proposal object (i.e. a list of ProposalTransaction)

***

### buildCallToCoreContract()

> **buildCallToCoreContract**(`tx`): `Promise`\<`ProposalTransaction`\>

Defined in: [proposal-builder.ts:203](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L203)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### buildCallToExternalContract()

> **buildCallToExternalContract**(`tx`): `Promise`\<`ProposalTransaction`\>

Defined in: [proposal-builder.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L116)

#### Parameters

##### tx

[`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### fromEncodedTx()

> **fromEncodedTx**(`data`, `params`): `ProposalTransaction`

Defined in: [proposal-builder.ts:59](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L59)

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

Defined in: [proposal-builder.ts:244](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L244)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md) | [`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### getRegistryAddition()

> **getRegistryAddition**(`contract`): `undefined` \| `string`

Defined in: [proposal-builder.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L91)

#### Parameters

##### contract

`CeloContract`

#### Returns

`undefined` \| `string`

***

### isRegistryContract()

> **isRegistryContract**(`contract`): `boolean`

Defined in: [proposal-builder.ts:94](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L94)

#### Parameters

##### contract

`CeloContract`

#### Returns

`boolean`

***

### lookupExternalMethodABI()

> **lookupExternalMethodABI**(`address`, `tx`): `Promise`\<`null` \| `AbiItem`\>

Defined in: [proposal-builder.ts:98](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L98)

#### Parameters

##### address

`string`

##### tx

[`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`null` \| `AbiItem`\>

***

### resolveCoreMethodABIFromRepoint()

> **resolveCoreMethodABIFromRepoint**(`tx`, `proxyAddress`): `Promise`\<`null` \| `AbiItem`\>

Defined in: [proposal-builder.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L173)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)

##### proxyAddress

`string`

#### Returns

`Promise`\<`null` \| `AbiItem`\>

***

### setRegistryAddition()

> **setRegistryAddition**(`contract`, `address`): `string`

Defined in: [proposal-builder.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L88)

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

Defined in: [proposal-builder.ts:149](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L149)

#### Parameters

##### abi

`AbiItem`

##### args

`any`[]

#### Returns

`any`[]
