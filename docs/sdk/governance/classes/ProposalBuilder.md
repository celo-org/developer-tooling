[**@celo/governance v5.1.9-alpha.0**](../README.md)

***

[@celo/governance](../README.md) / ProposalBuilder

# Class: ProposalBuilder

Defined in: [proposal-builder.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L37)

Builder class to construct proposals from JSON or transaction objects.

## Constructors

### Constructor

> **new ProposalBuilder**(`kit`, `builders`, `registryAdditions`): `ProposalBuilder`

Defined in: [proposal-builder.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L40)

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

### buildFunctionCallToExternalContract()

> **buildFunctionCallToExternalContract**: (`tx`) => `Promise`\<`ProposalTransaction`\>

Defined in: [proposal-builder.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L182)

#### Parameters

##### tx

[`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### externalCallProxyRepoint

> **externalCallProxyRepoint**: `Map`\<`string`, `string`\>

Defined in: [proposal-builder.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L38)

***

### isRegistered()

> **isRegistered**: (`contract`) => `boolean`

Defined in: [proposal-builder.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L122)

#### Parameters

##### contract

`CeloContract`

#### Returns

`boolean`

***

### registryAdditions

> `readonly` **registryAdditions**: [`RegistryAdditions`](../interfaces/RegistryAdditions.md) = `{}`

Defined in: [proposal-builder.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L43)

## Methods

### addJsonTx()

> **addJsonTx**(`tx`): `number`

Defined in: [proposal-builder.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L275)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md)

#### Returns

`number`

***

### addProxyRepointingTx()

> **addProxyRepointingTx**(`contract`, `newImplementationAddress`): `void`

Defined in: [proposal-builder.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L74)

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

### addTx()

> **addTx**(`tx`, `params`): `void`

Defined in: [proposal-builder.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L100)

Adds a Celo transaction to the list for proposal construction.

#### Parameters

##### tx

`CeloTransactionObject`\<`any`\>

A Celo transaction object to add to the proposal.

##### params

`Partial`\<[`ProposalTxParams`](../type-aliases/ProposalTxParams.md)\> = `{}`

Optional parameters for how the transaction should be executed.

#### Returns

`void`

***

### addWeb3Tx()

> **addWeb3Tx**(`tx`, `params`): `number`

Defined in: [proposal-builder.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L92)

Adds a Web3 transaction to the list for proposal construction.

#### Parameters

##### tx

`CeloTxObject`\<`any`\>

A Web3 transaction object to add to the proposal.

##### params

[`ProposalTxParams`](../type-aliases/ProposalTxParams.md)

Parameters for how the transaction should be executed.

#### Returns

`number`

***

### build()

> **build**(): `Promise`\<`ProposalTransaction`[]\>

Defined in: [proposal-builder.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L50)

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

Defined in: [proposal-builder.ts:146](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L146)

#### Parameters

##### tx

[`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### fromJsonTx()

> **fromJsonTx**(`tx`): `Promise`\<`ProposalTransaction`\>

Defined in: [proposal-builder.ts:233](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L233)

#### Parameters

##### tx

[`ProposalTransactionJSON`](../interfaces/ProposalTransactionJSON.md) | [`ExternalProposalTransactionJSON`](../type-aliases/ExternalProposalTransactionJSON.md)

#### Returns

`Promise`\<`ProposalTransaction`\>

***

### fromWeb3tx()

> **fromWeb3tx**(`tx`, `params`): `ProposalTransaction`

Defined in: [proposal-builder.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L63)

Converts a Web3 transaction into a proposal transaction object.

#### Parameters

##### tx

`CeloTxObject`\<`any`\>

A Web3 transaction object to convert.

##### params

[`ProposalTxParams`](../type-aliases/ProposalTxParams.md)

Parameters for how the transaction should be executed.

#### Returns

`ProposalTransaction`

***

### getRegistryAddition()

> **getRegistryAddition**(`contract`): `undefined` \| `string`

Defined in: [proposal-builder.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L112)

#### Parameters

##### contract

`CeloContract`

#### Returns

`undefined` \| `string`

***

### isRegistryContract()

> **isRegistryContract**(`contract`): `boolean`

Defined in: [proposal-builder.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L115)

#### Parameters

##### contract

`CeloContract`

#### Returns

`boolean`

***

### lookupExternalMethodABI()

> **lookupExternalMethodABI**(`address`, `tx`): `Promise`\<`null` \| `AbiItem`\>

Defined in: [proposal-builder.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L124)

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

Defined in: [proposal-builder.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L109)

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

Defined in: [proposal-builder.ts:184](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L184)

#### Parameters

##### abi

`AbiItem`

##### args

`any`[]

#### Returns

`any`[]
