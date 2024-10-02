[@celo/governance](../README.md) / [proposals](../modules/proposals.md) / ProposalBuilder

# Class: ProposalBuilder

[proposals](../modules/proposals.md).ProposalBuilder

Builder class to construct proposals from JSON or transaction objects.

## Table of contents

### Constructors

- [constructor](proposals.ProposalBuilder.md#constructor)

### Properties

- [buildFunctionCallToExternalContract](proposals.ProposalBuilder.md#buildfunctioncalltoexternalcontract)
- [externalCallProxyRepoint](proposals.ProposalBuilder.md#externalcallproxyrepoint)
- [isRegistered](proposals.ProposalBuilder.md#isregistered)
- [registryAdditions](proposals.ProposalBuilder.md#registryadditions)

### Methods

- [addJsonTx](proposals.ProposalBuilder.md#addjsontx)
- [addProxyRepointingTx](proposals.ProposalBuilder.md#addproxyrepointingtx)
- [addTx](proposals.ProposalBuilder.md#addtx)
- [addWeb3Tx](proposals.ProposalBuilder.md#addweb3tx)
- [build](proposals.ProposalBuilder.md#build)
- [buildCallToCoreContract](proposals.ProposalBuilder.md#buildcalltocorecontract)
- [buildCallToExternalContract](proposals.ProposalBuilder.md#buildcalltoexternalcontract)
- [fromJsonTx](proposals.ProposalBuilder.md#fromjsontx)
- [fromWeb3tx](proposals.ProposalBuilder.md#fromweb3tx)
- [getRegistryAddition](proposals.ProposalBuilder.md#getregistryaddition)
- [isRegistryContract](proposals.ProposalBuilder.md#isregistrycontract)
- [lookupExternalMethodABI](proposals.ProposalBuilder.md#lookupexternalmethodabi)
- [setRegistryAddition](proposals.ProposalBuilder.md#setregistryaddition)
- [transformArgs](proposals.ProposalBuilder.md#transformargs)

## Constructors

### constructor

• **new ProposalBuilder**(`kit`, `builders?`, `registryAdditions?`): [`ProposalBuilder`](proposals.ProposalBuilder.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `kit` | `ContractKit` | `undefined` |
| `builders` | () => `Promise`\<`ProposalTransaction`\>[] | `[]` |
| `registryAdditions` | `RegistryAdditions` | `{}` |

#### Returns

[`ProposalBuilder`](proposals.ProposalBuilder.md)

#### Defined in

[proposals.ts:241](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L241)

## Properties

### buildFunctionCallToExternalContract

• **buildFunctionCallToExternalContract**: (`tx`: [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md)) => `Promise`\<`ProposalTransaction`\>

#### Type declaration

▸ (`tx`): `Promise`\<`ProposalTransaction`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md) |

##### Returns

`Promise`\<`ProposalTransaction`\>

#### Defined in

[proposals.ts:384](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L384)

___

### externalCallProxyRepoint

• **externalCallProxyRepoint**: `Map`\<`string`, `string`\>

#### Defined in

[proposals.ts:239](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L239)

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

[proposals.ts:324](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L324)

___

### registryAdditions

• `Readonly` **registryAdditions**: `RegistryAdditions` = `{}`

#### Defined in

[proposals.ts:244](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L244)

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

[proposals.ts:460](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L460)

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

[proposals.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L275)

___

### addTx

▸ **addTx**(`tx`, `params?`): `void`

Adds a Celo transaction to the list for proposal construction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTransactionObject`\<`any`\> | A Celo transaction object to add to the proposal. |
| `params` | `Partial`\<`ProposalTxParams`\> | Optional parameters for how the transaction should be executed. |

#### Returns

`void`

#### Defined in

[proposals.ts:301](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L301)

___

### addWeb3Tx

▸ **addWeb3Tx**(`tx`, `params`): `number`

Adds a Web3 transaction to the list for proposal construction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTxObject`\<`any`\> | A Web3 transaction object to add to the proposal. |
| `params` | `ProposalTxParams` | Parameters for how the transaction should be executed. |

#### Returns

`number`

#### Defined in

[proposals.ts:293](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L293)

___

### build

▸ **build**(): `Promise`\<`ProposalTransaction`[]\>

Build calls all of the added build steps and returns the final proposal.

#### Returns

`Promise`\<`ProposalTransaction`[]\>

A constructed Proposal object (i.e. a list of ProposalTransaction)

#### Defined in

[proposals.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L251)

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

[proposals.ts:405](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L405)

___

### buildCallToExternalContract

▸ **buildCallToExternalContract**(`tx`): `Promise`\<`ProposalTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md) |

#### Returns

`Promise`\<`ProposalTransaction`\>

#### Defined in

[proposals.ts:348](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L348)

___

### fromJsonTx

▸ **fromJsonTx**(`tx`): `Promise`\<`ProposalTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md) |

#### Returns

`Promise`\<`ProposalTransaction`\>

#### Defined in

[proposals.ts:435](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L435)

___

### fromWeb3tx

▸ **fromWeb3tx**(`tx`, `params`): `ProposalTransaction`

Converts a Web3 transaction into a proposal transaction object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTxObject`\<`any`\> | A Web3 transaction object to convert. |
| `params` | `ProposalTxParams` | Parameters for how the transaction should be executed. |

#### Returns

`ProposalTransaction`

#### Defined in

[proposals.ts:264](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L264)

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

[proposals.ts:314](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L314)

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

[proposals.ts:317](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L317)

___

### lookupExternalMethodABI

▸ **lookupExternalMethodABI**(`address`, `tx`): `Promise`\<``null`` \| `AbiItem`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposals.ProposalTransactionJSON.md) |

#### Returns

`Promise`\<``null`` \| `AbiItem`\>

#### Defined in

[proposals.ts:326](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L326)

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

[proposals.ts:311](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L311)

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

[proposals.ts:386](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/governance/src/proposals.ts#L386)
