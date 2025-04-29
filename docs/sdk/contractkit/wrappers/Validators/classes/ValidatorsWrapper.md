[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Validators](../README.md) / ValidatorsWrapper

# Class: ValidatorsWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L81)

Contract for voting for validators and managing validator groups.

## Extends

- [`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md)\<`Validators`\>

## Constructors

### Constructor

> **new ValidatorsWrapper**(`connection`, `contract`, `contracts`): `ValidatorsWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

#### Parameters

##### connection

`Connection`

##### contract

`Validators`

##### contracts

`ContractWrappersForVotingAndRules`

#### Returns

`ValidatorsWrapper`

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`constructor`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#constructor)

## Properties

### affiliate()

> **affiliate**: (`group`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:499](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L499)

Affiliates a validator with a group, allowing it to be added as a member.
De-affiliates with the previously affiliated group if present.

#### Parameters

##### group

`string`

The validator group with which to affiliate.

#### Returns

`CeloTransactionObject`\<`boolean`\>

***

### deaffiliate()

> **deaffiliate**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:509](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L509)

De-affiliates a validator, removing it from the group for which it is a member.
Fails if the account is not a validator with non-zero affiliation.

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

***

### events

> **events**: `object`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### allEvents()

> **allEvents**: (`options?`, `cb?`) => `EventEmitter`

##### Parameters

###### options?

`EventOptions`

###### cb?

`Callback`\<`EventLog`\>

##### Returns

`EventEmitter`

#### CommissionUpdateDelaySet

> **CommissionUpdateDelaySet**: `ContractEvent`\<`string`\>

#### GroupLockedGoldRequirementsSet

> **GroupLockedGoldRequirementsSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `duration`: `string`; `value`: `string`; \}\>

#### MaxGroupSizeSet

> **MaxGroupSizeSet**: `ContractEvent`\<`string`\>

#### MembershipHistoryLengthSet

> **MembershipHistoryLengthSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### ValidatorAffiliated

> **ValidatorAffiliated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `group`: `string`; `validator`: `string`; \}\>

#### ValidatorBlsPublicKeyUpdated

> **ValidatorBlsPublicKeyUpdated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `blsPublicKey`: `string`; `validator`: `string`; \}\>

#### ValidatorDeaffiliated

> **ValidatorDeaffiliated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `group`: `string`; `validator`: `string`; \}\>

#### ValidatorDeregistered

> **ValidatorDeregistered**: `ContractEvent`\<`string`\>

#### ValidatorEcdsaPublicKeyUpdated

> **ValidatorEcdsaPublicKeyUpdated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `ecdsaPublicKey`: `string`; `validator`: `string`; \}\>

#### ValidatorEpochPaymentDistributed

> **ValidatorEpochPaymentDistributed**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `group`: `string`; `groupPayment`: `string`; `validator`: `string`; `validatorPayment`: `string`; \}\>

#### ValidatorGroupCommissionUpdated

> **ValidatorGroupCommissionUpdated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `commission`: `string`; `group`: `string`; \}\>

#### ValidatorGroupCommissionUpdateQueued

> **ValidatorGroupCommissionUpdateQueued**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `activationBlock`: `string`; `commission`: `string`; `group`: `string`; \}\>

#### ValidatorGroupDeregistered

> **ValidatorGroupDeregistered**: `ContractEvent`\<`string`\>

#### ValidatorGroupMemberAdded

> **ValidatorGroupMemberAdded**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `group`: `string`; `validator`: `string`; \}\>

#### ValidatorGroupMemberRemoved

> **ValidatorGroupMemberRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `group`: `string`; `validator`: `string`; \}\>

#### ValidatorGroupMemberReordered

> **ValidatorGroupMemberReordered**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `group`: `string`; `validator`: `string`; \}\>

#### ValidatorGroupRegistered

> **ValidatorGroupRegistered**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `commission`: `string`; `group`: `string`; \}\>

#### ValidatorLockedGoldRequirementsSet

> **ValidatorLockedGoldRequirementsSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `duration`: `string`; `value`: `string`; \}\>

#### ValidatorRegistered

> **ValidatorRegistered**: `ContractEvent`\<`string`\>

#### ValidatorScoreParametersSet

> **ValidatorScoreParametersSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `adjustmentSpeed`: `string`; `exponent`: `string`; \}\>

#### ValidatorScoreUpdated

> **ValidatorScoreUpdated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `epochScore`: `string`; `score`: `string`; `validator`: `string`; \}\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`events`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Validators`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`eventTypes`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#eventtypes)

***

### forceDeaffiliateIfValidator()

> **forceDeaffiliateIfValidator**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:515](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L515)

Removes a validator from the group for which it is a member.

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### getAccountLockedGoldRequirement()

> **getAccountLockedGoldRequirement**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:129](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L129)

Returns the Locked Gold requirements for specific account.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

The Locked Gold requirements for a specific account.

***

### getCommissionUpdateDelay()

> **getCommissionUpdateDelay**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L147)

Returns the update delay, in blocks, for the group commission.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getDowntimeGracePeriod()

> **getDowntimeGracePeriod**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:156](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L156)

Returns the validator downtime grace period

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getEpochNumber()

> **getEpochNumber**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:448](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L448)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getEpochSize()

> **getEpochSize**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:450](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L450)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getRegisteredValidatorGroupsAddresses()

> **getRegisteredValidatorGroupsAddresses**: () => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:402](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L402)

Get list of registered validator group addresses

#### Returns

`Promise`\<`string`[]\>

***

### getSlashingMultiplierResetPeriod()

> **getSlashingMultiplierResetPeriod**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:138](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L138)

Returns the reset period, in seconds, for slashing multiplier.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getValidatorGroupSize()

> **getValidatorGroupSize**: (`group`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:389](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L389)

Get the size (amount of members) of a ValidatorGroup

#### Parameters

##### group

`string`

#### Returns

`Promise`\<`number`\>

***

### getValidatorMembershipHistory()

> **getValidatorMembershipHistory**: (`validator`) => `Promise`\<[`GroupMembership`](../interfaces/GroupMembership.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:368](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L368)

Returns the Validator's group membership history

#### Parameters

##### validator

`string`

The validator whose membership history to return.

#### Returns

`Promise`\<[`GroupMembership`](../interfaces/GroupMembership.md)[]\>

The group membership history of a validator.

***

### getValidatorMembershipHistoryExtraData()

> **getValidatorMembershipHistoryExtraData**: (`validator`) => `Promise`\<[`MembershipHistoryExtraData`](../interfaces/MembershipHistoryExtraData.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:380](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L380)

Returns extra data from the Validator's group membership history

#### Parameters

##### validator

`string`

The validator whose membership history to return.

#### Returns

`Promise`\<[`MembershipHistoryExtraData`](../interfaces/MembershipHistoryExtraData.md)\>

The group membership history of a validator.

***

### isValidator()

> **isValidator**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:252](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L252)

Returns whether a particular account has a registered validator.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`boolean`\>

Whether a particular address is a registered validator.

***

### isValidatorGroup()

> **isValidatorGroup**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:259](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L259)

Returns whether a particular account has a registered validator group.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`boolean`\>

Whether a particular address is a registered validator group.

***

### methodIds

> **methodIds**: `Record`\<`"groupLockedGoldRequirements"` \| `"validatorLockedGoldRequirements"` \| `"maxGroupSize"` \| `"membershipHistoryLength"` \| `"slashingMultiplierResetPeriod"` \| `"commissionUpdateDelay"` \| `"downtimeGracePeriod"` \| `"checkProofOfPossession"` \| `"fractionMulExp"` \| `"getBlockNumberFromHeader"` \| `"getEpochNumber"` \| `"getEpochNumberOfBlock"` \| `"getEpochSize"` \| `"getParentSealBitmap"` \| `"getVerifiedSealBitmapFromHeader"` \| `"hashHeader"` \| `"initialized"` \| `"minQuorumSize"` \| `"minQuorumSizeInCurrentSet"` \| `"numberValidatorsInCurrentSet"` \| `"numberValidatorsInSet"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"validatorAddressFromCurrentSet"` \| `"validatorSignerAddressFromCurrentSet"` \| `"validatorSignerAddressFromSet"` \| `"initialize"` \| `"getVersionNumber"` \| `"updateValidatorScoreFromSigner"` \| `"distributeEpochPaymentsFromSigner"` \| `"registerValidator"` \| `"registerValidatorNoBls"` \| `"deregisterValidator"` \| `"affiliate"` \| `"deaffiliate"` \| `"updateBlsPublicKey"` \| `"updateEcdsaPublicKey"` \| `"deregisterValidatorGroup"` \| `"updatePublicKeys"` \| `"registerValidatorGroup"` \| `"addMember"` \| `"addFirstMember"` \| `"removeMember"` \| `"reorderMember"` \| `"setNextCommissionUpdate"` \| `"updateCommission"` \| `"forceDeaffiliateIfValidator"` \| `"resetSlashingMultiplier"` \| `"halveSlashingMultiplier"` \| `"mintStableToEpochManager"` \| `"getValidatorBlsPublicKeyFromSigner"` \| `"getMembershipHistoryLength"` \| `"getValidatorGroup"` \| `"getTopGroupValidators"` \| `"getTopGroupValidatorsAccounts"` \| `"getGroupsNumMembers"` \| `"getNumRegisteredValidators"` \| `"getValidatorLockedGoldRequirements"` \| `"getGroupLockedGoldRequirements"` \| `"getRegisteredValidatorSigners"` \| `"getRegisteredValidators"` \| `"getRegisteredValidatorGroups"` \| `"getMembershipInLastEpochFromSigner"` \| `"getValidatorGroupSlashingMultiplier"` \| `"groupMembershipInEpoch"` \| `"getValidatorScoreParameters"` \| `"getMembershipHistory"` \| `"calculateGroupEpochScore"` \| `"getMaxGroupSize"` \| `"getCommissionUpdateDelay"` \| `"computeEpochReward"` \| `"setCommissionUpdateDelay"` \| `"setMaxGroupSize"` \| `"setMembershipHistoryLength"` \| `"setValidatorScoreParameters"` \| `"setGroupLockedGoldRequirements"` \| `"setValidatorLockedGoldRequirements"` \| `"setSlashingMultiplierResetPeriod"` \| `"setDowntimeGracePeriod"` \| `"getAccountLockedGoldRequirement"` \| `"getMembershipInLastEpoch"` \| `"calculateEpochScore"` \| `"meetsAccountLockedGoldRequirements"` \| `"getValidator"` \| `"getValidatorsGroup"` \| `"getGroupNumMembers"` \| `"isValidatorGroup"` \| `"isValidator"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`methodIds`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#methodids)

***

### ~~registerValidator()~~

> **registerValidator**: (`ecdsaPublicKey`, `blsPublicKey`, `blsPop`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:432](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L432)

Registers a validator unaffiliated with any validator group.

Fails if the account is already a validator or validator group.

#### Parameters

##### ecdsaPublicKey

`string`

The ECDSA public key that the validator is using for consensus. 64 bytes.

##### blsPublicKey

`string`

The BLS public key that the validator is using for consensus, should pass proof
  of possession. 48 bytes.

##### blsPop

`string`

The BLS public key proof-of-possession, which consists of a signature on the
  account address. 96 bytes.

#### Returns

`CeloTransactionObject`\<`boolean`\>

#### Deprecated

use registerValidatorNoBls

***

### registerValidatorNoBls()

> **registerValidatorNoBls**: (`ecdsaPublicKey`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:442](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L442)

#### Parameters

##### ecdsaPublicKey

`string`

#### Returns

`CeloTransactionObject`\<`boolean`\>

***

### removeMember()

> **removeMember**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:556](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L556)

Removes a member from a ValidatorGroup
The ValidatorGroup is specified by the `from` of the tx.

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

***

### resetSlashingMultiplier()

> **resetSlashingMultiplier**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:524](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L524)

Resets a group's slashing multiplier if it has been >= the reset period since
the last time the group was slashed.

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setNextCommissionUpdate()

> **setNextCommissionUpdate**: (`commission`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L87)

Queues an update to a validator group's commission.

#### Parameters

##### commission

`Value`

Fixidity representation of the commission this group receives on epoch
  payments made to its members. Must be in the range [0, 1.0].

#### Returns

`CeloTransactionObject`\<`void`\>

***

### ~~updateBlsPublicKey()~~

> **updateBlsPublicKey**: (`blsPublicKey`, `blsPop`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:240](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L240)

Updates a validator's BLS key.

#### Parameters

##### blsPublicKey

`string`

The BLS public key that the validator is using for consensus, should pass proof
  of possession. 48 bytes.

##### blsPop

`string`

The BLS public key proof-of-possession, which consists of a signature on the
  account address. 96 bytes.

#### Returns

`CeloTransactionObject`\<`boolean`\>

True upon success.

#### Deprecated

bls keys are not used anymore

***

### updateCommission()

> **updateCommission**: () => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L96)

Updates a validator group's commission based on the previously queued update

#### Returns

`CeloTransactionObject`\<`void`\>

## Accessors

### address

#### Get Signature

> **get** **address**(): `` `0x${string}` ``

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

Contract address

##### Returns

`` `0x${string}` ``

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`address`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#address)

## Methods

### addMember()

> **addMember**(`group`, `validator`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:534](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L534)

Adds a member to the end of a validator group's list of members.
Fails if `validator` has not set their affiliation to this account.

#### Parameters

##### group

`string`

##### validator

`string`

The validator to add to the group

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### currentSignerSet()

> **currentSignerSet**(): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:647](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L647)

Returns the current set of validator signer addresses

#### Returns

`Promise`\<`string`[]\>

***

### currentValidatorAccountsSet()

> **currentValidatorAccountsSet**(): `Promise`\<`object`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:657](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L657)

Returns the current set of validator signer and account addresses

#### Returns

`Promise`\<`object`[]\>

***

### deregisterValidator()

> **deregisterValidator**(`validatorAddress`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:456](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L456)

De-registers a validator, removing it from the group for which it is a member.

#### Parameters

##### validatorAddress

`string`

Address of the validator to deregister

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### deregisterValidatorGroup()

> **deregisterValidatorGroup**(`validatorGroupAddress`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:484](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L484)

De-registers a validator Group

#### Parameters

##### validatorGroupAddress

`string`

Address of the validator group to deregister

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### findValidatorMembershipHistoryIndex()

> **findValidatorMembershipHistoryIndex**(`epoch`, `history`): `number`

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:690](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L690)

Returns the index into `history` for `epoch`.

#### Parameters

##### epoch

`number`

The needle.

##### history

[`GroupMembership`](../interfaces/GroupMembership.md)[]

The haystack.

#### Returns

`number`

Index for epoch or -1.

***

### getConfig()

> **getConfig**(): `Promise`\<[`ValidatorsConfig`](../interfaces/ValidatorsConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L165)

Returns current configuration parameters.

#### Returns

`Promise`\<[`ValidatorsConfig`](../interfaces/ValidatorsConfig.md)\>

***

### getEpochNumberOfBlock()

> **getEpochNumberOfBlock**(`blockNumber`): `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:605](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L605)

#### Parameters

##### blockNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getEpochSizeNumber()

> **getEpochSizeNumber**(): `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:594](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L594)

#### Returns

`Promise`\<`number`\>

***

### getGroupLockedGoldRequirements()

> **getGroupLockedGoldRequirements**(): `Promise`\<[`LockedGoldRequirements`](../interfaces/LockedGoldRequirements.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L117)

Returns the Locked Gold requirements for validator groups.

#### Returns

`Promise`\<[`LockedGoldRequirements`](../interfaces/LockedGoldRequirements.md)\>

The Locked Gold requirements for validator groups.

***

### getHumanReadableConfig()

> **getHumanReadableConfig**(): `Promise`\<\{ `commissionUpdateDelay`: `string`; `downtimeGracePeriod`: `BigNumber`; `groupLockedGoldRequirements`: \{ `duration`: `string`; `value`: `BigNumber`; \}; `maxGroupSize`: `BigNumber`; `membershipHistoryLength`: `BigNumber`; `slashingMultiplierResetPeriod`: `string`; `validatorLockedGoldRequirements`: \{ `duration`: `string`; `value`: `BigNumber`; \}; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L190)

#### Returns

`Promise`\<\{ `commissionUpdateDelay`: `string`; `downtimeGracePeriod`: `BigNumber`; `groupLockedGoldRequirements`: \{ `duration`: `string`; `value`: `BigNumber`; \}; `maxGroupSize`: `BigNumber`; `membershipHistoryLength`: `BigNumber`; `slashingMultiplierResetPeriod`: `string`; `validatorLockedGoldRequirements`: \{ `duration`: `string`; `value`: `BigNumber`; \}; \}\>

ValidatorsConfig object

#### Dev

Returns human readable configuration of the validators contract

***

### getLastBlockNumberForEpoch()

> **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:600](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L600)

#### Parameters

##### epochNumber

`number`

#### Returns

`Promise`\<`number`\>

***

### getMembershipInLastEpoch()

> **getMembershipInLastEpoch**(`address`): `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:308](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L308)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`string`\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"CommissionUpdateDelaySet"` | `"GroupLockedGoldRequirementsSet"` | `"MaxGroupSizeSet"` | `"MembershipHistoryLengthSet"` | `"ValidatorAffiliated"` | `"ValidatorBlsPublicKeyUpdated"` | `"ValidatorDeaffiliated"` | `"ValidatorDeregistered"` | `"ValidatorEcdsaPublicKeyUpdated"` | `"ValidatorEpochPaymentDistributed"` | `"ValidatorGroupCommissionUpdateQueued"` | `"ValidatorGroupCommissionUpdated"` | `"ValidatorGroupDeregistered"` | `"ValidatorGroupMemberAdded"` | `"ValidatorGroupMemberRemoved"` | `"ValidatorGroupMemberReordered"` | `"ValidatorGroupRegistered"` | `"ValidatorLockedGoldRequirementsSet"` | `"ValidatorRegistered"` | `"ValidatorScoreParametersSet"` | `"ValidatorScoreUpdated"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`getPastEvents`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#getpastevents)

***

### getRegisteredValidatorGroups()

> **getRegisteredValidatorGroups**(): `Promise`\<[`ValidatorGroup`](../interfaces/ValidatorGroup.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:413](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L413)

Get list of registered validator groups

#### Returns

`Promise`\<[`ValidatorGroup`](../interfaces/ValidatorGroup.md)[]\>

***

### getRegisteredValidators()

> **getRegisteredValidators**(`blockNumber?`): `Promise`\<[`Validator`](../interfaces/Validator.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:407](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L407)

Get list of registered validators

#### Parameters

##### blockNumber?

`number`

#### Returns

`Promise`\<[`Validator`](../interfaces/Validator.md)[]\>

***

### getRegisteredValidatorsAddresses()

> **getRegisteredValidatorsAddresses**(`blockNumber?`): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:396](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L396)

Get list of registered validator addresses

#### Parameters

##### blockNumber?

`number`

#### Returns

`Promise`\<`string`[]\>

***

### getValidator()

> **getValidator**(`address`, `blockNumber?`): `Promise`\<[`Validator`](../interfaces/Validator.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:287](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L287)

Get Validator information

#### Parameters

##### address

`string`

##### blockNumber?

`number`

#### Returns

`Promise`\<[`Validator`](../interfaces/Validator.md)\>

***

### getValidatorFromSigner()

> **getValidatorFromSigner**(`address`, `blockNumber?`): `Promise`\<[`Validator`](../interfaces/Validator.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:312](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L312)

#### Parameters

##### address

`string`

##### blockNumber?

`number`

#### Returns

`Promise`\<[`Validator`](../interfaces/Validator.md)\>

***

### getValidatorGroup()

> **getValidatorGroup**(`address`, `getAffiliates`, `blockNumber?`): `Promise`\<[`ValidatorGroup`](../interfaces/ValidatorGroup.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:330](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L330)

Get ValidatorGroup information

#### Parameters

##### address

`string`

##### getAffiliates

`boolean` = `true`

##### blockNumber?

`number`

#### Returns

`Promise`\<[`ValidatorGroup`](../interfaces/ValidatorGroup.md)\>

***

### getValidatorLockedGoldRequirements()

> **getValidatorLockedGoldRequirements**(): `Promise`\<[`LockedGoldRequirements`](../interfaces/LockedGoldRequirements.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L105)

Returns the Locked Gold requirements for validators.

#### Returns

`Promise`\<[`LockedGoldRequirements`](../interfaces/LockedGoldRequirements.md)\>

The Locked Gold requirements for validators.

***

### getValidatorMembershipHistoryIndex()

> **getValidatorMembershipHistoryIndex**(`account`, `blockNumber?`): `Promise`\<\{ `group`: `string`; `historyIndex`: `number`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:671](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L671)

Returns the group membership for validator account.

#### Parameters

##### account

`string`

Address of validator account to retrieve group membership for.

##### blockNumber?

`number`

Block number to retrieve group membership at.

#### Returns

`Promise`\<\{ `group`: `string`; `historyIndex`: `number`; \}\>

Group and membership history index for `validator`.

***

### getValidatorRewards()

> **getValidatorRewards**(`epochNumber`, `useBlockNumber?`): `Promise`\<[`ValidatorReward`](../interfaces/ValidatorReward.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:614](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L614)

Retrieves ValidatorRewards for epochNumber.

#### Parameters

##### epochNumber

`number`

The epoch to retrieve ValidatorRewards at.

##### useBlockNumber?

`boolean`

#### Returns

`Promise`\<[`ValidatorReward`](../interfaces/ValidatorReward.md)[]\>

***

### getValidatorsGroup()

> **getValidatorsGroup**(`address`): `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:304](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L304)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`string`\>

***

### meetsValidatorBalanceRequirements()

> **meetsValidatorBalanceRequirements**(`address`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:266](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L266)

Returns whether an account meets the requirements to register a validator.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`boolean`\>

Whether an account meets the requirements to register a validator.

***

### meetsValidatorGroupBalanceRequirements()

> **meetsValidatorGroupBalanceRequirements**(`address`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:279](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L279)

Returns whether an account meets the requirements to register a group.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`boolean`\>

Whether an account meets the requirements to register a group.

***

### registerValidatorGroup()

> **registerValidatorGroup**(`commission`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:473](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L473)

Registers a validator group with no member validators.
Fails if the account is already a validator or validator group.
Fails if the account does not have sufficient weight.

#### Parameters

##### commission

`BigNumber`

the commission this group receives on epoch payments made to its members.

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### reorderMember()

> **reorderMember**(`groupAddr`, `validator`, `newIndex`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:565](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L565)

Reorders a member within a validator group.
Fails if `validator` is not a member of the account's validator group.

#### Parameters

##### groupAddr

`string`

The validator group

##### validator

`string`

The validator to reorder.

##### newIndex

`number`

New position for the validator

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### signerToAccount()

> **signerToAccount**(`signerAddress`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L226)

Returns the account associated with `signer`.

#### Parameters

##### signerAddress

`string`

#### Returns

`Promise`\<`` `0x${string}` ``\>

The associated account.

#### Dev

Fails if the `signer` is not an account or previously authorized signer.

***

### validatorSignerToAccount()

> **validatorSignerToAccount**(`signerAddress`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Validators.ts:215](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Validators.ts#L215)

Returns the account associated with `signer`.

#### Parameters

##### signerAddress

`string`

#### Returns

`Promise`\<`` `0x${string}` ``\>

The associated account.

#### Dev

Fails if the `signer` is not an account or currently authorized validator.

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`version`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#version)
