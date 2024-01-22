[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Validators](../modules/wrappers_Validators.md) / ValidatorsWrapper

# Class: ValidatorsWrapper

[wrappers/Validators](../modules/wrappers_Validators.md).ValidatorsWrapper

Contract for voting for validators and managing validator groups.

## Hierarchy

- [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`Validators`\>

  ↳ **`ValidatorsWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Validators.ValidatorsWrapper.md#constructor)

### Properties

- [affiliate](wrappers_Validators.ValidatorsWrapper.md#affiliate)
- [deaffiliate](wrappers_Validators.ValidatorsWrapper.md#deaffiliate)
- [eventTypes](wrappers_Validators.ValidatorsWrapper.md#eventtypes)
- [events](wrappers_Validators.ValidatorsWrapper.md#events)
- [forceDeaffiliateIfValidator](wrappers_Validators.ValidatorsWrapper.md#forcedeaffiliateifvalidator)
- [getAccountLockedGoldRequirement](wrappers_Validators.ValidatorsWrapper.md#getaccountlockedgoldrequirement)
- [getCommissionUpdateDelay](wrappers_Validators.ValidatorsWrapper.md#getcommissionupdatedelay)
- [getDowntimeGracePeriod](wrappers_Validators.ValidatorsWrapper.md#getdowntimegraceperiod)
- [getEpochNumber](wrappers_Validators.ValidatorsWrapper.md#getepochnumber)
- [getEpochSize](wrappers_Validators.ValidatorsWrapper.md#getepochsize)
- [getRegisteredValidatorGroupsAddresses](wrappers_Validators.ValidatorsWrapper.md#getregisteredvalidatorgroupsaddresses)
- [getSlashingMultiplierResetPeriod](wrappers_Validators.ValidatorsWrapper.md#getslashingmultiplierresetperiod)
- [getValidatorGroupSize](wrappers_Validators.ValidatorsWrapper.md#getvalidatorgroupsize)
- [getValidatorMembershipHistory](wrappers_Validators.ValidatorsWrapper.md#getvalidatormembershiphistory)
- [getValidatorMembershipHistoryExtraData](wrappers_Validators.ValidatorsWrapper.md#getvalidatormembershiphistoryextradata)
- [isValidator](wrappers_Validators.ValidatorsWrapper.md#isvalidator)
- [isValidatorGroup](wrappers_Validators.ValidatorsWrapper.md#isvalidatorgroup)
- [methodIds](wrappers_Validators.ValidatorsWrapper.md#methodids)
- [registerValidator](wrappers_Validators.ValidatorsWrapper.md#registervalidator)
- [removeMember](wrappers_Validators.ValidatorsWrapper.md#removemember)
- [resetSlashingMultiplier](wrappers_Validators.ValidatorsWrapper.md#resetslashingmultiplier)
- [setNextCommissionUpdate](wrappers_Validators.ValidatorsWrapper.md#setnextcommissionupdate)
- [updateBlsPublicKey](wrappers_Validators.ValidatorsWrapper.md#updateblspublickey)
- [updateCommission](wrappers_Validators.ValidatorsWrapper.md#updatecommission)

### Accessors

- [address](wrappers_Validators.ValidatorsWrapper.md#address)

### Methods

- [addMember](wrappers_Validators.ValidatorsWrapper.md#addmember)
- [currentSignerSet](wrappers_Validators.ValidatorsWrapper.md#currentsignerset)
- [currentValidatorAccountsSet](wrappers_Validators.ValidatorsWrapper.md#currentvalidatoraccountsset)
- [deregisterValidator](wrappers_Validators.ValidatorsWrapper.md#deregistervalidator)
- [deregisterValidatorGroup](wrappers_Validators.ValidatorsWrapper.md#deregistervalidatorgroup)
- [findValidatorMembershipHistoryIndex](wrappers_Validators.ValidatorsWrapper.md#findvalidatormembershiphistoryindex)
- [getConfig](wrappers_Validators.ValidatorsWrapper.md#getconfig)
- [getEpochNumberOfBlock](wrappers_Validators.ValidatorsWrapper.md#getepochnumberofblock)
- [getEpochSizeNumber](wrappers_Validators.ValidatorsWrapper.md#getepochsizenumber)
- [getGroupLockedGoldRequirements](wrappers_Validators.ValidatorsWrapper.md#getgrouplockedgoldrequirements)
- [getHumanReadableConfig](wrappers_Validators.ValidatorsWrapper.md#gethumanreadableconfig)
- [getLastBlockNumberForEpoch](wrappers_Validators.ValidatorsWrapper.md#getlastblocknumberforepoch)
- [getPastEvents](wrappers_Validators.ValidatorsWrapper.md#getpastevents)
- [getRegisteredValidatorGroups](wrappers_Validators.ValidatorsWrapper.md#getregisteredvalidatorgroups)
- [getRegisteredValidators](wrappers_Validators.ValidatorsWrapper.md#getregisteredvalidators)
- [getRegisteredValidatorsAddresses](wrappers_Validators.ValidatorsWrapper.md#getregisteredvalidatorsaddresses)
- [getValidator](wrappers_Validators.ValidatorsWrapper.md#getvalidator)
- [getValidatorFromSigner](wrappers_Validators.ValidatorsWrapper.md#getvalidatorfromsigner)
- [getValidatorGroup](wrappers_Validators.ValidatorsWrapper.md#getvalidatorgroup)
- [getValidatorLockedGoldRequirements](wrappers_Validators.ValidatorsWrapper.md#getvalidatorlockedgoldrequirements)
- [getValidatorMembershipHistoryIndex](wrappers_Validators.ValidatorsWrapper.md#getvalidatormembershiphistoryindex)
- [getValidatorRewards](wrappers_Validators.ValidatorsWrapper.md#getvalidatorrewards)
- [meetsValidatorBalanceRequirements](wrappers_Validators.ValidatorsWrapper.md#meetsvalidatorbalancerequirements)
- [meetsValidatorGroupBalanceRequirements](wrappers_Validators.ValidatorsWrapper.md#meetsvalidatorgroupbalancerequirements)
- [registerValidatorGroup](wrappers_Validators.ValidatorsWrapper.md#registervalidatorgroup)
- [reorderMember](wrappers_Validators.ValidatorsWrapper.md#reordermember)
- [signerToAccount](wrappers_Validators.ValidatorsWrapper.md#signertoaccount)
- [validatorSignerToAccount](wrappers_Validators.ValidatorsWrapper.md#validatorsignertoaccount)
- [version](wrappers_Validators.ValidatorsWrapper.md#version)

## Constructors

### constructor

• **new ValidatorsWrapper**(`connection`, `contract`, `contracts`): [`ValidatorsWrapper`](wrappers_Validators.ValidatorsWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Validators` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`ValidatorsWrapper`](wrappers_Validators.ValidatorsWrapper.md)

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### affiliate

• **affiliate**: (`group`: `string`) => `CeloTransactionObject`\<`boolean`\>

Affiliates a validator with a group, allowing it to be added as a member.
De-affiliates with the previously affiliated group if present.

**`Param`**

The validator group with which to affiliate.

#### Type declaration

▸ (`group`): `CeloTransactionObject`\<`boolean`\>

Affiliates a validator with a group, allowing it to be added as a member.
De-affiliates with the previously affiliated group if present.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The validator group with which to affiliate. |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:483](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L483)

___

### deaffiliate

• **deaffiliate**: (...`args`: []) => `CeloTransactionObject`\<`boolean`\>

De-affiliates a validator, removing it from the group for which it is a member.
Fails if the account is not a validator with non-zero affiliation.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

De-affiliates a validator, removing it from the group for which it is a member.
Fails if the account is not a validator with non-zero affiliation.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:493](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L493)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Validators`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[eventTypes](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CommissionUpdateDelaySet` | `ContractEvent`\<`string`\> |
| `GroupLockedGoldRequirementsSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `duration`: `string` ; `value`: `string`  }\> |
| `MaxGroupSizeSet` | `ContractEvent`\<`string`\> |
| `MembershipHistoryLengthSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `ValidatorAffiliated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `group`: `string` ; `validator`: `string`  }\> |
| `ValidatorBlsPublicKeyUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `blsPublicKey`: `string` ; `validator`: `string`  }\> |
| `ValidatorDeaffiliated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `group`: `string` ; `validator`: `string`  }\> |
| `ValidatorDeregistered` | `ContractEvent`\<`string`\> |
| `ValidatorEcdsaPublicKeyUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `ecdsaPublicKey`: `string` ; `validator`: `string`  }\> |
| `ValidatorEpochPaymentDistributed` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `group`: `string` ; `groupPayment`: `string` ; `validator`: `string` ; `validatorPayment`: `string`  }\> |
| `ValidatorGroupCommissionUpdateQueued` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `activationBlock`: `string` ; `commission`: `string` ; `group`: `string`  }\> |
| `ValidatorGroupCommissionUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `commission`: `string` ; `group`: `string`  }\> |
| `ValidatorGroupDeregistered` | `ContractEvent`\<`string`\> |
| `ValidatorGroupMemberAdded` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `group`: `string` ; `validator`: `string`  }\> |
| `ValidatorGroupMemberRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `group`: `string` ; `validator`: `string`  }\> |
| `ValidatorGroupMemberReordered` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `group`: `string` ; `validator`: `string`  }\> |
| `ValidatorGroupRegistered` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `commission`: `string` ; `group`: `string`  }\> |
| `ValidatorLockedGoldRequirementsSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `duration`: `string` ; `value`: `string`  }\> |
| `ValidatorRegistered` | `ContractEvent`\<`string`\> |
| `ValidatorScoreParametersSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `adjustmentSpeed`: `string` ; `exponent`: `string`  }\> |
| `ValidatorScoreUpdated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `epochScore`: `string` ; `score`: `string` ; `validator`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### forceDeaffiliateIfValidator

• **forceDeaffiliateIfValidator**: (...`args`: [validatorAccount: string]) => `CeloTransactionObject`\<`void`\>

Removes a validator from the group for which it is a member.

**`Param`**

The validator to deaffiliate from their affiliated validator group.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Removes a validator from the group for which it is a member.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [validatorAccount: string] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:499](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L499)

___

### getAccountLockedGoldRequirement

• **getAccountLockedGoldRequirement**: (...`args`: [account: string]) => `Promise`\<`BigNumber`\>

Returns the Locked Gold requirements for specific account.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the Locked Gold requirements for specific account.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`BigNumber`\>

The Locked Gold requirements for a specific account.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:129](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L129)

___

### getCommissionUpdateDelay

• **getCommissionUpdateDelay**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the update delay, in blocks, for the group commission.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the update delay, in blocks, for the group commission.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L147)

___

### getDowntimeGracePeriod

• **getDowntimeGracePeriod**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the validator downtime grace period

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the validator downtime grace period

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:156](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L156)

___

### getEpochNumber

• **getEpochNumber**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:432](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L432)

___

### getEpochSize

• **getEpochSize**: (...`args`: []) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:434](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L434)

___

### getRegisteredValidatorGroupsAddresses

• **getRegisteredValidatorGroupsAddresses**: () => `Promise`\<`string`[]\>

Get list of registered validator group addresses

#### Type declaration

▸ (): `Promise`\<`string`[]\>

Get list of registered validator group addresses

##### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:393](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L393)

___

### getSlashingMultiplierResetPeriod

• **getSlashingMultiplierResetPeriod**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the reset period, in seconds, for slashing multiplier.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the reset period, in seconds, for slashing multiplier.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L138)

___

### getValidatorGroupSize

• **getValidatorGroupSize**: (`group`: `string`) => `Promise`\<`number`\>

Get the size (amount of members) of a ValidatorGroup

#### Type declaration

▸ (`group`): `Promise`\<`number`\>

Get the size (amount of members) of a ValidatorGroup

##### Parameters

| Name | Type |
| :------ | :------ |
| `group` | `string` |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:380](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L380)

___

### getValidatorMembershipHistory

• **getValidatorMembershipHistory**: (`validator`: `string`) => `Promise`\<[`GroupMembership`](../interfaces/wrappers_Validators.GroupMembership.md)[]\>

Returns the Validator's group membership history

**`Param`**

The validator whose membership history to return.

#### Type declaration

▸ (`validator`): `Promise`\<[`GroupMembership`](../interfaces/wrappers_Validators.GroupMembership.md)[]\>

Returns the Validator's group membership history

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | `string` | The validator whose membership history to return. |

##### Returns

`Promise`\<[`GroupMembership`](../interfaces/wrappers_Validators.GroupMembership.md)[]\>

The group membership history of a validator.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:359](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L359)

___

### getValidatorMembershipHistoryExtraData

• **getValidatorMembershipHistoryExtraData**: (`validator`: `string`) => `Promise`\<[`MembershipHistoryExtraData`](../interfaces/wrappers_Validators.MembershipHistoryExtraData.md)\>

Returns extra data from the Validator's group membership history

**`Param`**

The validator whose membership history to return.

#### Type declaration

▸ (`validator`): `Promise`\<[`MembershipHistoryExtraData`](../interfaces/wrappers_Validators.MembershipHistoryExtraData.md)\>

Returns extra data from the Validator's group membership history

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | `string` | The validator whose membership history to return. |

##### Returns

`Promise`\<[`MembershipHistoryExtraData`](../interfaces/wrappers_Validators.MembershipHistoryExtraData.md)\>

The group membership history of a validator.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:371](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L371)

___

### isValidator

• **isValidator**: (...`args`: [account: string]) => `Promise`\<`boolean`\>

Returns whether a particular account has a registered validator.

**`Param`**

The account.

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Returns whether a particular account has a registered validator.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`boolean`\>

Whether a particular address is a registered validator.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L251)

___

### isValidatorGroup

• **isValidatorGroup**: (...`args`: [account: string]) => `Promise`\<`boolean`\>

Returns whether a particular account has a registered validator group.

**`Param`**

The account.

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Returns whether a particular account has a registered validator group.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`boolean`\>

Whether a particular address is a registered validator group.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:258](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L258)

___

### methodIds

• **methodIds**: `Record`\<``"groupLockedGoldRequirements"`` \| ``"validatorLockedGoldRequirements"`` \| ``"maxGroupSize"`` \| ``"membershipHistoryLength"`` \| ``"slashingMultiplierResetPeriod"`` \| ``"commissionUpdateDelay"`` \| ``"downtimeGracePeriod"`` \| ``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"setCommissionUpdateDelay"`` \| ``"setMaxGroupSize"`` \| ``"setMembershipHistoryLength"`` \| ``"setValidatorScoreParameters"`` \| ``"getMaxGroupSize"`` \| ``"getCommissionUpdateDelay"`` \| ``"setGroupLockedGoldRequirements"`` \| ``"setValidatorLockedGoldRequirements"`` \| ``"registerValidator"`` \| ``"getValidatorScoreParameters"`` \| ``"getMembershipHistory"`` \| ``"calculateEpochScore"`` \| ``"calculateGroupEpochScore"`` \| ``"updateValidatorScoreFromSigner"`` \| ``"distributeEpochPaymentsFromSigner"`` \| ``"deregisterValidator"`` \| ``"affiliate"`` \| ``"deaffiliate"`` \| ``"updateBlsPublicKey"`` \| ``"updateEcdsaPublicKey"`` \| ``"updatePublicKeys"`` \| ``"registerValidatorGroup"`` \| ``"deregisterValidatorGroup"`` \| ``"addMember"`` \| ``"addFirstMember"`` \| ``"removeMember"`` \| ``"reorderMember"`` \| ``"setNextCommissionUpdate"`` \| ``"updateCommission"`` \| ``"getAccountLockedGoldRequirement"`` \| ``"meetsAccountLockedGoldRequirements"`` \| ``"getValidatorBlsPublicKeyFromSigner"`` \| ``"getValidator"`` \| ``"getValidatorGroup"`` \| ``"getGroupNumMembers"`` \| ``"getTopGroupValidators"`` \| ``"getGroupsNumMembers"`` \| ``"getNumRegisteredValidators"`` \| ``"getValidatorLockedGoldRequirements"`` \| ``"getGroupLockedGoldRequirements"`` \| ``"getRegisteredValidators"`` \| ``"getRegisteredValidatorSigners"`` \| ``"getRegisteredValidatorGroups"`` \| ``"isValidatorGroup"`` \| ``"isValidator"`` \| ``"getMembershipInLastEpochFromSigner"`` \| ``"getMembershipInLastEpoch"`` \| ``"forceDeaffiliateIfValidator"`` \| ``"setSlashingMultiplierResetPeriod"`` \| ``"setDowntimeGracePeriod"`` \| ``"resetSlashingMultiplier"`` \| ``"halveSlashingMultiplier"`` \| ``"getValidatorGroupSlashingMultiplier"`` \| ``"groupMembershipInEpoch"``, `string`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### registerValidator

• **registerValidator**: (`ecdsaPublicKey`: `string`, `blsPublicKey`: `string`, `blsPop`: `string`) => `CeloTransactionObject`\<`boolean`\>

Registers a validator unaffiliated with any validator group.

Fails if the account is already a validator or validator group.

**`Param`**

The address that the validator is using for consensus, should match
  the validator signer.

**`Param`**

The ECDSA public key that the validator is using for consensus. 64 bytes.

**`Param`**

The BLS public key that the validator is using for consensus, should pass proof
  of possession. 48 bytes.

**`Param`**

The BLS public key proof-of-possession, which consists of a signature on the
  account address. 96 bytes.

#### Type declaration

▸ (`ecdsaPublicKey`, `blsPublicKey`, `blsPop`): `CeloTransactionObject`\<`boolean`\>

Registers a validator unaffiliated with any validator group.

Fails if the account is already a validator or validator group.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ecdsaPublicKey` | `string` | The ECDSA public key that the validator is using for consensus. 64 bytes. |
| `blsPublicKey` | `string` | The BLS public key that the validator is using for consensus, should pass proof of possession. 48 bytes. |
| `blsPop` | `string` | The BLS public key proof-of-possession, which consists of a signature on the account address. 96 bytes. |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:422](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L422)

___

### removeMember

• **removeMember**: (...`args`: [validator: string]) => `CeloTransactionObject`\<`boolean`\>

Removes a member from a ValidatorGroup
The ValidatorGroup is specified by the `from` of the tx.

**`Param`**

The Validator to remove from the group

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Removes a member from a ValidatorGroup
The ValidatorGroup is specified by the `from` of the tx.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [validator: string] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:540](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L540)

___

### resetSlashingMultiplier

• **resetSlashingMultiplier**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

Resets a group's slashing multiplier if it has been >= the reset period since
the last time the group was slashed.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Resets a group's slashing multiplier if it has been >= the reset period since
the last time the group was slashed.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:508](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L508)

___

### setNextCommissionUpdate

• **setNextCommissionUpdate**: (`commission`: `Value`) => `CeloTransactionObject`\<`void`\>

Queues an update to a validator group's commission.

**`Param`**

Fixidity representation of the commission this group receives on epoch
  payments made to its members. Must be in the range [0, 1.0].

#### Type declaration

▸ (`commission`): `CeloTransactionObject`\<`void`\>

Queues an update to a validator group's commission.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commission` | `Value` | Fixidity representation of the commission this group receives on epoch payments made to its members. Must be in the range [0, 1.0]. |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L87)

___

### updateBlsPublicKey

• **updateBlsPublicKey**: (`blsPublicKey`: `string`, `blsPop`: `string`) => `CeloTransactionObject`\<`boolean`\>

Updates a validator's BLS key.

**`Param`**

The BLS public key that the validator is using for consensus, should pass proof
  of possession. 48 bytes.

**`Param`**

The BLS public key proof-of-possession, which consists of a signature on the
  account address. 96 bytes.

#### Type declaration

▸ (`blsPublicKey`, `blsPop`): `CeloTransactionObject`\<`boolean`\>

Updates a validator's BLS key.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blsPublicKey` | `string` | The BLS public key that the validator is using for consensus, should pass proof of possession. 48 bytes. |
| `blsPop` | `string` | The BLS public key proof-of-possession, which consists of a signature on the account address. 96 bytes. |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True upon success.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:239](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L239)

___

### updateCommission

• **updateCommission**: () => `CeloTransactionObject`\<`void`\>

Updates a validator group's commission based on the previously queued update

#### Type declaration

▸ (): `CeloTransactionObject`\<`void`\>

Updates a validator group's commission based on the previously queued update

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L96)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

BaseWrapperForGoverning.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### addMember

▸ **addMember**(`group`, `validator`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Adds a member to the end of a validator group's list of members.
Fails if `validator` has not set their affiliation to this account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | - |
| `validator` | `string` | The validator to add to the group |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:518](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L518)

___

### currentSignerSet

▸ **currentSignerSet**(): `Promise`\<`string`[]\>

Returns the current set of validator signer addresses

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:633](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L633)

___

### currentValidatorAccountsSet

▸ **currentValidatorAccountsSet**(): `Promise`\<\{ `account`: `string` ; `signer`: `string`  }[]\>

Returns the current set of validator signer and account addresses

#### Returns

`Promise`\<\{ `account`: `string` ; `signer`: `string`  }[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:643](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L643)

___

### deregisterValidator

▸ **deregisterValidator**(`validatorAddress`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

De-registers a validator, removing it from the group for which it is a member.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validatorAddress` | `string` | Address of the validator to deregister |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:440](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L440)

___

### deregisterValidatorGroup

▸ **deregisterValidatorGroup**(`validatorGroupAddress`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

De-registers a validator Group

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validatorGroupAddress` | `string` | Address of the validator group to deregister |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:468](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L468)

___

### findValidatorMembershipHistoryIndex

▸ **findValidatorMembershipHistoryIndex**(`epoch`, `history`): `number`

Returns the index into `history` for `epoch`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epoch` | `number` | The needle. |
| `history` | [`GroupMembership`](../interfaces/wrappers_Validators.GroupMembership.md)[] | The haystack. |

#### Returns

`number`

Index for epoch or -1.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:676](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L676)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`ValidatorsConfig`](../interfaces/wrappers_Validators.ValidatorsConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`ValidatorsConfig`](../interfaces/wrappers_Validators.ValidatorsConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L165)

___

### getEpochNumberOfBlock

▸ **getEpochNumberOfBlock**(`blockNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:590](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L590)

___

### getEpochSizeNumber

▸ **getEpochSizeNumber**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:578](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L578)

___

### getGroupLockedGoldRequirements

▸ **getGroupLockedGoldRequirements**(): `Promise`\<[`LockedGoldRequirements`](../interfaces/wrappers_Validators.LockedGoldRequirements.md)\>

Returns the Locked Gold requirements for validator groups.

#### Returns

`Promise`\<[`LockedGoldRequirements`](../interfaces/wrappers_Validators.LockedGoldRequirements.md)\>

The Locked Gold requirements for validator groups.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L117)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(): `Promise`\<\{ `commissionUpdateDelay`: `string` ; `downtimeGracePeriod`: `BigNumber` ; `groupLockedGoldRequirements`: \{ `duration`: `string` ; `value`: `BigNumber`  } ; `maxGroupSize`: `BigNumber` ; `membershipHistoryLength`: `BigNumber` ; `slashingMultiplierResetPeriod`: `string` ; `validatorLockedGoldRequirements`: \{ `duration`: `string` ; `value`: `BigNumber`  }  }\>

#### Returns

`Promise`\<\{ `commissionUpdateDelay`: `string` ; `downtimeGracePeriod`: `BigNumber` ; `groupLockedGoldRequirements`: \{ `duration`: `string` ; `value`: `BigNumber`  } ; `maxGroupSize`: `BigNumber` ; `membershipHistoryLength`: `BigNumber` ; `slashingMultiplierResetPeriod`: `string` ; `validatorLockedGoldRequirements`: \{ `duration`: `string` ; `value`: `BigNumber`  }  }\>

ValidatorsConfig object

**`Dev`**

Returns human readable configuration of the validators contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L190)

___

### getLastBlockNumberForEpoch

▸ **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochNumber` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:584](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L584)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"CommissionUpdateDelaySet"`` \| ``"GroupLockedGoldRequirementsSet"`` \| ``"MaxGroupSizeSet"`` \| ``"MembershipHistoryLengthSet"`` \| ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"ValidatorAffiliated"`` \| ``"ValidatorBlsPublicKeyUpdated"`` \| ``"ValidatorDeaffiliated"`` \| ``"ValidatorDeregistered"`` \| ``"ValidatorEcdsaPublicKeyUpdated"`` \| ``"ValidatorEpochPaymentDistributed"`` \| ``"ValidatorGroupCommissionUpdateQueued"`` \| ``"ValidatorGroupCommissionUpdated"`` \| ``"ValidatorGroupDeregistered"`` \| ``"ValidatorGroupMemberAdded"`` \| ``"ValidatorGroupMemberRemoved"`` \| ``"ValidatorGroupMemberReordered"`` \| ``"ValidatorGroupRegistered"`` \| ``"ValidatorLockedGoldRequirementsSet"`` \| ``"ValidatorRegistered"`` \| ``"ValidatorScoreParametersSet"`` \| ``"ValidatorScoreUpdated"`` \| ``"allEvents"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getRegisteredValidatorGroups

▸ **getRegisteredValidatorGroups**(): `Promise`\<[`ValidatorGroup`](../interfaces/wrappers_Validators.ValidatorGroup.md)[]\>

Get list of registered validator groups

#### Returns

`Promise`\<[`ValidatorGroup`](../interfaces/wrappers_Validators.ValidatorGroup.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:404](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L404)

___

### getRegisteredValidators

▸ **getRegisteredValidators**(`blockNumber?`): `Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)[]\>

Get list of registered validators

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber?` | `number` |

#### Returns

`Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:398](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L398)

___

### getRegisteredValidatorsAddresses

▸ **getRegisteredValidatorsAddresses**(`blockNumber?`): `Promise`\<`string`[]\>

Get list of registered validator addresses

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber?` | `number` |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:387](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L387)

___

### getValidator

▸ **getValidator**(`address`, `blockNumber?`): `Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)\>

Get Validator information

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `blockNumber?` | `number` |

#### Returns

`Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:286](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L286)

___

### getValidatorFromSigner

▸ **getValidatorFromSigner**(`address`, `blockNumber?`): `Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `blockNumber?` | `number` |

#### Returns

`Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:303](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L303)

___

### getValidatorGroup

▸ **getValidatorGroup**(`address`, `getAffiliates?`, `blockNumber?`): `Promise`\<[`ValidatorGroup`](../interfaces/wrappers_Validators.ValidatorGroup.md)\>

Get ValidatorGroup information

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `address` | `string` | `undefined` |
| `getAffiliates` | `boolean` | `true` |
| `blockNumber?` | `number` | `undefined` |

#### Returns

`Promise`\<[`ValidatorGroup`](../interfaces/wrappers_Validators.ValidatorGroup.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:321](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L321)

___

### getValidatorLockedGoldRequirements

▸ **getValidatorLockedGoldRequirements**(): `Promise`\<[`LockedGoldRequirements`](../interfaces/wrappers_Validators.LockedGoldRequirements.md)\>

Returns the Locked Gold requirements for validators.

#### Returns

`Promise`\<[`LockedGoldRequirements`](../interfaces/wrappers_Validators.LockedGoldRequirements.md)\>

The Locked Gold requirements for validators.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L105)

___

### getValidatorMembershipHistoryIndex

▸ **getValidatorMembershipHistoryIndex**(`account`, `blockNumber?`): `Promise`\<\{ `group`: `string` ; `historyIndex`: `number`  }\>

Returns the group membership for validator account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Address of validator account to retrieve group membership for. |
| `blockNumber?` | `number` | Block number to retrieve group membership at. |

#### Returns

`Promise`\<\{ `group`: `string` ; `historyIndex`: `number`  }\>

Group and membership history index for `validator`.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:657](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L657)

___

### getValidatorRewards

▸ **getValidatorRewards**(`epochNumber`, `useBlockNumber?`): `Promise`\<[`ValidatorReward`](../interfaces/wrappers_Validators.ValidatorReward.md)[]\>

Retrieves ValidatorRewards for epochNumber.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epochNumber` | `number` | The epoch to retrieve ValidatorRewards at. |
| `useBlockNumber?` | `boolean` | - |

#### Returns

`Promise`\<[`ValidatorReward`](../interfaces/wrappers_Validators.ValidatorReward.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:600](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L600)

___

### meetsValidatorBalanceRequirements

▸ **meetsValidatorBalanceRequirements**(`address`): `Promise`\<`boolean`\>

Returns whether an account meets the requirements to register a validator.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`boolean`\>

Whether an account meets the requirements to register a validator.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:265](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L265)

___

### meetsValidatorGroupBalanceRequirements

▸ **meetsValidatorGroupBalanceRequirements**(`address`): `Promise`\<`boolean`\>

Returns whether an account meets the requirements to register a group.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`boolean`\>

Whether an account meets the requirements to register a group.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:278](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L278)

___

### registerValidatorGroup

▸ **registerValidatorGroup**(`commission`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Registers a validator group with no member validators.
Fails if the account is already a validator or validator group.
Fails if the account does not have sufficient weight.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commission` | `BigNumber` | the commission this group receives on epoch payments made to its members. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:457](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L457)

___

### reorderMember

▸ **reorderMember**(`groupAddr`, `validator`, `newIndex`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Reorders a member within a validator group.
Fails if `validator` is not a member of the account's validator group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupAddr` | `string` | The validator group |
| `validator` | `string` | The validator to reorder. |
| `newIndex` | `number` | New position for the validator |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:549](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L549)

___

### signerToAccount

▸ **signerToAccount**(`signerAddress`): `Promise`\<`string`\>

Returns the account associated with `signer`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerAddress` | `string` |

#### Returns

`Promise`\<`string`\>

The associated account.

**`Dev`**

Fails if the `signer` is not an account or previously authorized signer.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L226)

___

### validatorSignerToAccount

▸ **validatorSignerToAccount**(`signerAddress`): `Promise`\<`string`\>

Returns the account associated with `signer`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerAddress` | `string` |

#### Returns

`Promise`\<`string`\>

The associated account.

**`Dev`**

Fails if the `signer` is not an account or currently authorized validator.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Validators.ts:215](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L215)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[version](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
