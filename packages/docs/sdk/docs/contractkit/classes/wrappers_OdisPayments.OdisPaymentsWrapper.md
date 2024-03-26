[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/OdisPayments](../modules/wrappers_OdisPayments.md) / OdisPaymentsWrapper

# Class: OdisPaymentsWrapper

[wrappers/OdisPayments](../modules/wrappers_OdisPayments.md).OdisPaymentsWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`OdisPayments`\>

  ↳ **`OdisPaymentsWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_OdisPayments.OdisPaymentsWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_OdisPayments.OdisPaymentsWrapper.md#eventtypes)
- [events](wrappers_OdisPayments.OdisPaymentsWrapper.md#events)
- [methodIds](wrappers_OdisPayments.OdisPaymentsWrapper.md#methodids)
- [payInCUSD](wrappers_OdisPayments.OdisPaymentsWrapper.md#payincusd)
- [totalPaidCUSD](wrappers_OdisPayments.OdisPaymentsWrapper.md#totalpaidcusd)

### Accessors

- [address](wrappers_OdisPayments.OdisPaymentsWrapper.md#address)

### Methods

- [getPastEvents](wrappers_OdisPayments.OdisPaymentsWrapper.md#getpastevents)
- [version](wrappers_OdisPayments.OdisPaymentsWrapper.md#version)

## Constructors

### constructor

• **new OdisPaymentsWrapper**(`connection`, `contract`): [`OdisPaymentsWrapper`](wrappers_OdisPayments.OdisPaymentsWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `OdisPayments` |

#### Returns

[`OdisPaymentsWrapper`](wrappers_OdisPayments.OdisPaymentsWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`OdisPayments`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[eventTypes](wrappers_BaseWrapper.BaseWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `PaymentMade` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `valueInCUSD`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"registryContract"`` \| ``"totalPaidCUSD"`` \| ``"payInCUSD"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### payInCUSD

• **payInCUSD**: (`account`: `string`, `value`: `string` \| `number`) => `CeloTransactionObject`\<`void`\>

**`Notice`**

Sends cUSD to this contract to pay for ODIS quota (for queries).

**`Param`**

The account whose balance to increment.

**`Param`**

The amount in cUSD to pay.

**`Dev`**

Throws if cUSD transfer fails.

#### Type declaration

▸ (`account`, `value`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account whose balance to increment. |
| `value` | `string` \| `number` | The amount in cUSD to pay. |

##### Returns

`CeloTransactionObject`\<`void`\>

**`Notice`**

Sends cUSD to this contract to pay for ODIS quota (for queries).

**`Dev`**

Throws if cUSD transfer fails.

#### Defined in

[packages/sdk/contractkit/src/wrappers/OdisPayments.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/OdisPayments.ts#L23)

___

### totalPaidCUSD

• **totalPaidCUSD**: (`account`: `string`) => `Promise`\<`BigNumber`\>

**`Notice`**

Fetches total amount sent (all-time) for given account to odisPayments

**`Param`**

The account to fetch total amount of funds sent

#### Type declaration

▸ (`account`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account to fetch total amount of funds sent |

##### Returns

`Promise`\<`BigNumber`\>

**`Notice`**

Fetches total amount sent (all-time) for given account to odisPayments

#### Defined in

[packages/sdk/contractkit/src/wrappers/OdisPayments.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/OdisPayments.ts#L11)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Inherited from

BaseWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` \| ``"PaymentMade"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
