[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/DoubleSigningSlasher](../modules/wrappers_DoubleSigningSlasher.md) / DoubleSigningSlasherWrapper

# Class: DoubleSigningSlasherWrapper

[wrappers/DoubleSigningSlasher](../modules/wrappers_DoubleSigningSlasher.md).DoubleSigningSlasherWrapper

Contract handling slashing for Validator double-signing

## Hierarchy

- [`BaseSlasher`](wrappers_BaseSlasher.BaseSlasher.md)\<`DoubleSigningSlasher`\>

  ↳ **`DoubleSigningSlasherWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#constructor)

### Properties

- [eventTypes](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#eventtypes)
- [events](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#events)
- [methodIds](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#methodids)
- [slashingIncentives](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#slashingincentives)

### Accessors

- [address](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#address)

### Methods

- [getBlockNumberFromHeader](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#getblocknumberfromheader)
- [getPastEvents](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#getpastevents)
- [slashSigner](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#slashsigner)
- [slashValidator](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#slashvalidator)
- [version](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md#version)

## Constructors

### constructor

• **new DoubleSigningSlasherWrapper**(`connection`, `contract`, `contracts`): [`DoubleSigningSlasherWrapper`](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `DoubleSigningSlasher` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`DoubleSigningSlasherWrapper`](wrappers_DoubleSigningSlasher.DoubleSigningSlasherWrapper.md)

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[constructor](wrappers_BaseSlasher.BaseSlasher.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### eventTypes

• **eventTypes**: `EventsEnum`\<`DoubleSigningSlasher`\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[eventTypes](wrappers_BaseSlasher.BaseSlasher.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DoubleSigningSlashPerformed` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `blockNumber`: `string` ; `validator`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `SlashingIncentivesSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `penalty`: `string` ; `reward`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[events](wrappers_BaseSlasher.BaseSlasher.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### methodIds

• **methodIds**: `Record`\<``"slash"`` \| ``"slashingIncentives"`` \| ``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"groupMembershipAtBlock"`` \| ``"setSlashingIncentives"`` \| ``"checkForDoubleSigning"``, `string`\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[methodIds](wrappers_BaseSlasher.BaseSlasher.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### slashingIncentives

• **slashingIncentives**: (...`args`: []) => `Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Returns slashing incentives.

#### Type declaration

▸ (`...args`): `Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Returns slashing incentives.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `penalty`: `BigNumber` ; `reward`: `BigNumber`  }\>

Rewards and penalties for slashing.

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[slashingIncentives](wrappers_BaseSlasher.BaseSlasher.md#slashingincentives)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseSlasher.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseSlasher.ts#L70)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

BaseSlasher.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### getBlockNumberFromHeader

▸ **getBlockNumberFromHeader**(`header`): `Promise`\<`number`\>

Parses block number out of header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | `string` | RLP encoded header |

#### Returns

`Promise`\<`number`\>

Block number.

#### Defined in

[packages/sdk/contractkit/src/wrappers/DoubleSigningSlasher.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DoubleSigningSlasher.ts#L15)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"SlashingIncentivesSet"`` \| ``"DoubleSigningSlashPerformed"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[getPastEvents](wrappers_BaseSlasher.BaseSlasher.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### slashSigner

▸ **slashSigner**(`signerAddress`, `headerA`, `headerB`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Slash a Validator signer for double-signing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signerAddress` | `string` | - |
| `headerA` | `string` | First double signed block header. |
| `headerB` | `string` | Second double signed block header. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/DoubleSigningSlasher.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DoubleSigningSlasher.ts#L38)

___

### slashValidator

▸ **slashValidator**(`validatorAddress`, `headerA`, `headerB`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Slash a Validator for double-signing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validatorAddress` | `string` | Validator to slash. |
| `headerA` | `string` | First double signed block header. |
| `headerB` | `string` | Second double signed block header. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/DoubleSigningSlasher.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/DoubleSigningSlasher.ts#L26)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseSlasher](wrappers_BaseSlasher.BaseSlasher.md).[version](wrappers_BaseSlasher.BaseSlasher.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
