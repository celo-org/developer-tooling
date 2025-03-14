[@celo/governance](../README.md) / [proposal-builder](../modules/proposal_builder.md) / ProposalBuilder

# Class: ProposalBuilder

[proposal-builder](../modules/proposal_builder.md).ProposalBuilder

Builder class to construct proposals from JSON or transaction objects.

## Table of contents

### Constructors

- [constructor](proposal_builder.ProposalBuilder.md#constructor)

### Properties

- [buildFunctionCallToExternalContract](proposal_builder.ProposalBuilder.md#buildfunctioncalltoexternalcontract)
- [externalCallProxyRepoint](proposal_builder.ProposalBuilder.md#externalcallproxyrepoint)
- [isRegistered](proposal_builder.ProposalBuilder.md#isregistered)
- [registryAdditions](proposal_builder.ProposalBuilder.md#registryadditions)

### Methods

- [addJsonTx](proposal_builder.ProposalBuilder.md#addjsontx)
- [addProxyRepointingTx](proposal_builder.ProposalBuilder.md#addproxyrepointingtx)
- [addTx](proposal_builder.ProposalBuilder.md#addtx)
- [addWeb3Tx](proposal_builder.ProposalBuilder.md#addweb3tx)
- [build](proposal_builder.ProposalBuilder.md#build)
- [buildCallToCoreContract](proposal_builder.ProposalBuilder.md#buildcalltocorecontract)
- [buildCallToExternalContract](proposal_builder.ProposalBuilder.md#buildcalltoexternalcontract)
- [fromJsonTx](proposal_builder.ProposalBuilder.md#fromjsontx)
- [fromWeb3tx](proposal_builder.ProposalBuilder.md#fromweb3tx)
- [getRegistryAddition](proposal_builder.ProposalBuilder.md#getregistryaddition)
- [isRegistryContract](proposal_builder.ProposalBuilder.md#isregistrycontract)
- [lookupExternalMethodABI](proposal_builder.ProposalBuilder.md#lookupexternalmethodabi)
- [setRegistryAddition](proposal_builder.ProposalBuilder.md#setregistryaddition)
- [transformArgs](proposal_builder.ProposalBuilder.md#transformargs)

## Constructors

### constructor

• **new ProposalBuilder**(`kit`, `builders?`, `registryAdditions?`): [`ProposalBuilder`](proposal_builder.ProposalBuilder.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `kit` | `ContractKit` | `undefined` |
| `builders` | () => `Promise`\<`ProposalTransaction`\>[] | `[]` |
| `registryAdditions` | [`RegistryAdditions`](../interfaces/proposals.RegistryAdditions.md) | `{}` |

#### Returns

[`ProposalBuilder`](proposal_builder.ProposalBuilder.md)

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:40](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L40)

## Properties

### buildFunctionCallToExternalContract

• **buildFunctionCallToExternalContract**: (`tx`: [`ExternalProposalTransactionJSON`](../modules/proposals.md#externalproposaltransactionjson)) => `Promise`\<`ProposalTransaction`\>

#### Type declaration

▸ (`tx`): `Promise`\<`ProposalTransaction`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ExternalProposalTransactionJSON`](../modules/proposals.md#externalproposaltransactionjson) |

##### Returns

`Promise`\<`ProposalTransaction`\>

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L182)

___

### externalCallProxyRepoint

• **externalCallProxyRepoint**: `Map`\<`string`, `string`\>

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L38)

___

### isRegistered

• **isRegistered**: (`contract`: `CeloContract`) => `boolean`

#### Type declaration

▸ (`contract`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `CeloContract` |

##### Returns

`boolean`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:122](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L122)

___

### registryAdditions

• `Readonly` **registryAdditions**: [`RegistryAdditions`](../interfaces/proposals.RegistryAdditions.md) = `{}`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L43)

## Methods

### addJsonTx

▸ **addJsonTx**(`tx`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md) |

#### Returns

`number`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:271](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L271)

___

### addProxyRepointingTx

▸ **addProxyRepointingTx**(`contract`, `newImplementationAddress`): `void`

Adds a transaction to set the implementation on a proxy to the given address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `CeloContract` | Celo contract name of the proxy which should have its implementation set. |
| `newImplementationAddress` | `string` | Address of the new contract implementation. |

#### Returns

`void`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L74)

___

### addTx

▸ **addTx**(`tx`, `params?`): `void`

Adds a Celo transaction to the list for proposal construction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTransactionObject`\<`any`\> | A Celo transaction object to add to the proposal. |
| `params` | `Partial`\<[`ProposalTxParams`](../modules/proposals.md#proposaltxparams)\> | Optional parameters for how the transaction should be executed. |

#### Returns

`void`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L100)

___

### addWeb3Tx

▸ **addWeb3Tx**(`tx`, `params`): `number`

Adds a Web3 transaction to the list for proposal construction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTxObject`\<`any`\> | A Web3 transaction object to add to the proposal. |
| `params` | [`ProposalTxParams`](../modules/proposals.md#proposaltxparams) | Parameters for how the transaction should be executed. |

#### Returns

`number`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L92)

___

### build

▸ **build**(): `Promise`\<`ProposalTransaction`[]\>

Build calls all of the added build steps and returns the final proposal.

#### Returns

`Promise`\<`ProposalTransaction`[]\>

A constructed Proposal object (i.e. a list of ProposalTransaction)

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L50)

___

### buildCallToCoreContract

▸ **buildCallToCoreContract**(`tx`): `Promise`\<`ProposalTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md) |

#### Returns

`Promise`\<`ProposalTransaction`\>

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:203](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L203)

___

### buildCallToExternalContract

▸ **buildCallToExternalContract**(`tx`): `Promise`\<`ProposalTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ExternalProposalTransactionJSON`](../modules/proposals.md#externalproposaltransactionjson) |

#### Returns

`Promise`\<`ProposalTransaction`\>

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:146](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L146)

___

### fromJsonTx

▸ **fromJsonTx**(`tx`): `Promise`\<`ProposalTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md) \| [`ExternalProposalTransactionJSON`](../modules/proposals.md#externalproposaltransactionjson) |

#### Returns

`Promise`\<`ProposalTransaction`\>

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:233](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L233)

___

### fromWeb3tx

▸ **fromWeb3tx**(`tx`, `params`): `ProposalTransaction`

Converts a Web3 transaction into a proposal transaction object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTxObject`\<`any`\> | A Web3 transaction object to convert. |
| `params` | [`ProposalTxParams`](../modules/proposals.md#proposaltxparams) | Parameters for how the transaction should be executed. |

#### Returns

`ProposalTransaction`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L63)

___

### getRegistryAddition

▸ **getRegistryAddition**(`contract`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `CeloContract` |

#### Returns

`undefined` \| `string`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L112)

___

### isRegistryContract

▸ **isRegistryContract**(`contract`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `CeloContract` |

#### Returns

`boolean`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L115)

___

### lookupExternalMethodABI

▸ **lookupExternalMethodABI**(`address`, `tx`): `Promise`\<``null`` \| `AbiItem`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `tx` | [`ExternalProposalTransactionJSON`](../modules/proposals.md#externalproposaltransactionjson) |

#### Returns

`Promise`\<``null`` \| `AbiItem`\>

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L124)

___

### setRegistryAddition

▸ **setRegistryAddition**(`contract`, `address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `CeloContract` |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L109)

___

### transformArgs

▸ **transformArgs**(`abi`, `args`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `abi` | `AbiItem` |
| `args` | `any`[] |

#### Returns

`any`[]

#### Defined in

[packages/sdk/governance/src/proposal-builder.ts:184](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposal-builder.ts#L184)
