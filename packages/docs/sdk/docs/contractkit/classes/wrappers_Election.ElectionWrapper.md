[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Election](../modules/wrappers_Election.md) / ElectionWrapper

# Class: ElectionWrapper

[wrappers/Election](../modules/wrappers_Election.md).ElectionWrapper

Contract for voting for validators and managing validator groups.

## Hierarchy

- [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`Election`\>

  ↳ **`ElectionWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Election.ElectionWrapper.md#constructor)

### Properties

- [electabilityThreshold](wrappers_Election.ElectionWrapper.md#electabilitythreshold)
- [eventTypes](wrappers_Election.ElectionWrapper.md#eventtypes)
- [events](wrappers_Election.ElectionWrapper.md#events)
- [getCurrentValidatorSigners](wrappers_Election.ElectionWrapper.md#getcurrentvalidatorsigners)
- [getGroupsVotedForByAccount](wrappers_Election.ElectionWrapper.md#getgroupsvotedforbyaccount)
- [getTotalVotes](wrappers_Election.ElectionWrapper.md#gettotalvotes)
- [getTotalVotesByAccount](wrappers_Election.ElectionWrapper.md#gettotalvotesbyaccount)
- [getTotalVotesForGroupByAccount](wrappers_Election.ElectionWrapper.md#gettotalvotesforgroupbyaccount)
- [methodIds](wrappers_Election.ElectionWrapper.md#methodids)
- [numberValidatorsInCurrentSet](wrappers_Election.ElectionWrapper.md#numbervalidatorsincurrentset)
- [numberValidatorsInSet](wrappers_Election.ElectionWrapper.md#numbervalidatorsinset)
- [validatorSignerAddressFromCurrentSet](wrappers_Election.ElectionWrapper.md#validatorsigneraddressfromcurrentset)
- [validatorSignerAddressFromSet](wrappers_Election.ElectionWrapper.md#validatorsigneraddressfromset)

### Accessors

- [address](wrappers_Election.ElectionWrapper.md#address)

### Methods

- [activate](wrappers_Election.ElectionWrapper.md#activate)
- [electValidatorSigners](wrappers_Election.ElectionWrapper.md#electvalidatorsigners)
- [electableValidators](wrappers_Election.ElectionWrapper.md#electablevalidators)
- [findLesserAndGreaterAfterVote](wrappers_Election.ElectionWrapper.md#findlesserandgreateraftervote)
- [getActiveVotesForGroup](wrappers_Election.ElectionWrapper.md#getactivevotesforgroup)
- [getConfig](wrappers_Election.ElectionWrapper.md#getconfig)
- [getElectedValidators](wrappers_Election.ElectionWrapper.md#getelectedvalidators)
- [getEligibleValidatorGroupsVotes](wrappers_Election.ElectionWrapper.md#geteligiblevalidatorgroupsvotes)
- [getGroupVoterRewards](wrappers_Election.ElectionWrapper.md#getgroupvoterrewards)
- [getPastEvents](wrappers_Election.ElectionWrapper.md#getpastevents)
- [getTotalVotesForGroup](wrappers_Election.ElectionWrapper.md#gettotalvotesforgroup)
- [getValidatorGroupVotes](wrappers_Election.ElectionWrapper.md#getvalidatorgroupvotes)
- [getValidatorGroupsVotes](wrappers_Election.ElectionWrapper.md#getvalidatorgroupsvotes)
- [getValidatorSigners](wrappers_Election.ElectionWrapper.md#getvalidatorsigners)
- [getVoter](wrappers_Election.ElectionWrapper.md#getvoter)
- [getVoterRewards](wrappers_Election.ElectionWrapper.md#getvoterrewards)
- [getVoterShare](wrappers_Election.ElectionWrapper.md#getvotershare)
- [getVotesForGroupByAccount](wrappers_Election.ElectionWrapper.md#getvotesforgroupbyaccount)
- [hasActivatablePendingVotes](wrappers_Election.ElectionWrapper.md#hasactivatablependingvotes)
- [hasPendingVotes](wrappers_Election.ElectionWrapper.md#haspendingvotes)
- [revoke](wrappers_Election.ElectionWrapper.md#revoke)
- [revokeActive](wrappers_Election.ElectionWrapper.md#revokeactive)
- [revokePending](wrappers_Election.ElectionWrapper.md#revokepending)
- [version](wrappers_Election.ElectionWrapper.md#version)
- [vote](wrappers_Election.ElectionWrapper.md#vote)

## Constructors

### constructor

• **new ElectionWrapper**(`connection`, `contract`, `contracts`): [`ElectionWrapper`](wrappers_Election.ElectionWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Election` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`ElectionWrapper`](wrappers_Election.ElectionWrapper.md)

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### electabilityThreshold

• **electabilityThreshold**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the current election threshold.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the current election threshold.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Election threshold.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L93)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Election`\>

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
| `AllowedToVoteOverMaxNumberOfGroups` | `ContractEvent`\<\{ `0`: `string` ; `1`: `boolean` ; `account`: `string` ; `flag`: `boolean`  }\> |
| `ElectabilityThresholdSet` | `ContractEvent`\<`string`\> |
| `ElectableValidatorsSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `max`: `string` ; `min`: `string`  }\> |
| `EpochRewardsDistributedToVoters` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `group`: `string` ; `value`: `string`  }\> |
| `MaxNumGroupsVotedForSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `ValidatorGroupActiveVoteRevoked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `account`: `string` ; `group`: `string` ; `units`: `string` ; `value`: `string`  }\> |
| `ValidatorGroupMarkedEligible` | `ContractEvent`\<`string`\> |
| `ValidatorGroupMarkedIneligible` | `ContractEvent`\<`string`\> |
| `ValidatorGroupPendingVoteRevoked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `group`: `string` ; `value`: `string`  }\> |
| `ValidatorGroupVoteActivated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `account`: `string` ; `group`: `string` ; `units`: `string` ; `value`: `string`  }\> |
| `ValidatorGroupVoteCast` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `group`: `string` ; `value`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getCurrentValidatorSigners

• **getCurrentValidatorSigners**: () => `Promise`\<`string`[]\>

Returns the current validator signers using the precompiles.

#### Type declaration

▸ (): `Promise`\<`string`[]\>

Returns the current validator signers using the precompiles.

##### Returns

`Promise`\<`string`[]\>

List of current validator signers.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L158)

___

### getGroupsVotedForByAccount

• **getGroupsVotedForByAccount**: (`account`: `string`) => `Promise`\<`string`[]\>

Returns the groups that `account` has voted for.

**`Param`**

The address of the account casting votes.

#### Type declaration

▸ (`account`): `Promise`\<`string`[]\>

Returns the groups that `account` has voted for.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account casting votes. |

##### Returns

`Promise`\<`string`[]\>

The groups that `account` has voted for.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:231](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L231)

___

### getTotalVotes

• **getTotalVotes**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the total votes received across all groups.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the total votes received across all groups.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

The total votes received across all groups.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:152](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L152)

___

### getTotalVotesByAccount

• **getTotalVotesByAccount**: (...`args`: [account: string]) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:269](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L269)

___

### getTotalVotesForGroupByAccount

• **getTotalVotesForGroupByAccount**: (...`args`: [group: string, account: string]) => `Promise`\<`BigNumber`\>

Returns the total votes for `group` made by `account`.

**`Param`**

The address of the validator group.

**`Param`**

The address of the voting account.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the total votes for `group` made by `account`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [group: string, account: string] |

##### Returns

`Promise`\<`BigNumber`\>

The total votes for `group` made by `account`.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:209](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L209)

___

### methodIds

• **methodIds**: `Record`\<``"electableValidators"`` \| ``"electabilityThreshold"`` \| ``"maxNumGroupsVotedFor"`` \| ``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"vote"`` \| ``"allowedToVoteOverMaxNumberOfGroups"`` \| ``"cachedVotesByAccount"`` \| ``"setElectableValidators"`` \| ``"getElectableValidators"`` \| ``"setMaxNumGroupsVotedFor"`` \| ``"setElectabilityThreshold"`` \| ``"getElectabilityThreshold"`` \| ``"activate"`` \| ``"activateForAccount"`` \| ``"hasActivatablePendingVotes"`` \| ``"revokePending"`` \| ``"revokeAllActive"`` \| ``"revokeActive"`` \| ``"getTotalVotesByAccount"`` \| ``"updateTotalVotesByAccountForGroup"`` \| ``"getPendingVotesForGroupByAccount"`` \| ``"getActiveVotesForGroupByAccount"`` \| ``"getTotalVotesForGroupByAccount"`` \| ``"getActiveVoteUnitsForGroupByAccount"`` \| ``"getActiveVoteUnitsForGroup"`` \| ``"getTotalVotesForGroup"`` \| ``"getActiveVotesForGroup"`` \| ``"getPendingVotesForGroup"`` \| ``"getGroupEligibility"`` \| ``"getGroupEpochRewards"`` \| ``"distributeEpochRewards"`` \| ``"markGroupIneligible"`` \| ``"markGroupEligible"`` \| ``"getGroupsVotedForByAccount"`` \| ``"canReceiveVotes"`` \| ``"getNumVotesReceivable"`` \| ``"getTotalVotes"`` \| ``"getActiveVotes"`` \| ``"getEligibleValidatorGroups"`` \| ``"getTotalVotesForEligibleValidatorGroups"`` \| ``"electValidatorSigners"`` \| ``"electNValidatorSigners"`` \| ``"getCurrentValidatorSigners"`` \| ``"setAllowedToVoteOverMaxNumberOfGroups"`` \| ``"forceDecrementVotes"``, `string`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### numberValidatorsInCurrentSet

• **numberValidatorsInCurrentSet**: (...`args`: []) => `Promise`\<`number`\>

Gets the size of the current elected validator set.

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

Gets the size of the current elected validator set.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

Size of the current elected validator set.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L142)

___

### numberValidatorsInSet

• **numberValidatorsInSet**: (`blockNumber`: `number`) => `Promise`\<`number`\>

Gets the size of the validator set that must sign the given block number.

**`Param`**

Block number to retrieve the validator set from.

#### Type declaration

▸ (`blockNumber`): `Promise`\<`number`\>

Gets the size of the validator set that must sign the given block number.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockNumber` | `number` | Block number to retrieve the validator set from. |

##### Returns

`Promise`\<`number`\>

Size of the validator set.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L132)

___

### validatorSignerAddressFromCurrentSet

• **validatorSignerAddressFromCurrentSet**: (`index`: `number`) => `Promise`\<\`0x$\{string}\`\>

Gets a validator address from the current validator set.

**`Param`**

Index of requested validator in the validator set.

#### Type declaration

▸ (`index`): `Promise`\<\`0x$\{string}\`\>

Gets a validator address from the current validator set.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index of requested validator in the validator set. |

##### Returns

`Promise`\<\`0x$\{string}\`\>

Address of validator at the requested index.PrPromise<StrongAddress>ess>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L120)

___

### validatorSignerAddressFromSet

• **validatorSignerAddressFromSet**: (`signerIndex`: `number`, `blockNumber`: `number`) => `Promise`\<\`0x$\{string}\`\>

Gets a validator address from the validator set at the given block number.

**`Param`**

Index of requested validator in the validator set.

**`Param`**

Block number to retrieve the validator set from.

#### Type declaration

▸ (`signerIndex`, `blockNumber`): `Promise`\<\`0x$\{string}\`\>

Gets a validator address from the validator set at the given block number.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signerIndex` | `number` | - |
| `blockNumber` | `number` | Block number to retrieve the validator set from. |

##### Returns

`Promise`\<\`0x$\{string}\`\>

Address of validator at the requested index.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L105)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

Contract address

#### Returns

\`0x$\{string}\`

#### Inherited from

BaseWrapperForGoverning.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### activate

▸ **activate**(`account`, `onBehalfOfAccount?`): `Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

Activates any activatable pending votes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account with pending votes to activate. |
| `onBehalfOfAccount?` | `boolean` | - |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:350](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L350)

___

### electValidatorSigners

▸ **electValidatorSigners**(`min?`, `max?`): `Promise`\<`string`[]\>

Returns a list of elected validators with seats allocated to groups via the D'Hondt method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `min?` | `number` |
| `max?` | `number` |

#### Returns

`Promise`\<`string`[]\>

The list of elected validators.

**`Dev`**

See https://en.wikipedia.org/wiki/D%27Hondt_method#Allocation for more information.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:179](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L179)

___

### electableValidators

▸ **electableValidators**(): `Promise`\<[`ElectableValidators`](../interfaces/wrappers_Election.ElectableValidators.md)\>

Returns the minimum and maximum number of validators that can be elected.

#### Returns

`Promise`\<[`ElectableValidators`](../interfaces/wrappers_Election.ElectableValidators.md)\>

The minimum and maximum number of validators that can be elected.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L84)

___

### findLesserAndGreaterAfterVote

▸ **findLesserAndGreaterAfterVote**(`votedGroup`, `voteWeight`): `Promise`\<\{ `greater`: `string` ; `lesser`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `votedGroup` | `string` |
| `voteWeight` | `BigNumber` |

#### Returns

`Promise`\<\{ `greater`: `string` ; `lesser`: `string`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:467](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L467)

___

### getActiveVotesForGroup

▸ **getActiveVotesForGroup**(`group`, `blockNumber?`): `Promise`\<`BigNumber`\>

Returns the active votes for `group`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The address of the validator group. |
| `blockNumber?` | `number` | - |

#### Returns

`Promise`\<`BigNumber`\>

The active votes for `group`.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:220](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L220)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`ElectionConfig`](../interfaces/wrappers_Election.ElectionConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`ElectionConfig`](../interfaces/wrappers_Election.ElectionConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:303](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L303)

___

### getElectedValidators

▸ **getElectedValidators**(`epochNumber`): `Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)[]\>

Retrieves the set of validatorsparticipating in BFT at epochNumber.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epochNumber` | `number` | The epoch to retrieve the elected validator set at. |

#### Returns

`Promise`\<[`Validator`](../interfaces/wrappers_Validators.Validator.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:496](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L496)

___

### getEligibleValidatorGroupsVotes

▸ **getEligibleValidatorGroupsVotes**(): `Promise`\<[`ValidatorGroupVote`](../interfaces/wrappers_Election.ValidatorGroupVote.md)[]\>

Returns the current eligible validator groups and their total votes.

#### Returns

`Promise`\<[`ValidatorGroupVote`](../interfaces/wrappers_Election.ValidatorGroupVote.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:452](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L452)

___

### getGroupVoterRewards

▸ **getGroupVoterRewards**(`epochNumber`, `useBlockNumber?`): `Promise`\<[`GroupVoterReward`](../interfaces/wrappers_Election.GroupVoterReward.md)[]\>

Retrieves GroupVoterRewards at epochNumber.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epochNumber` | `number` | The epoch to retrieve GroupVoterRewards at. |
| `useBlockNumber?` | `boolean` | - |

#### Returns

`Promise`\<[`GroupVoterReward`](../interfaces/wrappers_Election.GroupVoterReward.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:508](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L508)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"AllowedToVoteOverMaxNumberOfGroups"`` \| ``"ElectabilityThresholdSet"`` \| ``"ElectableValidatorsSet"`` \| ``"EpochRewardsDistributedToVoters"`` \| ``"MaxNumGroupsVotedForSet"`` \| ``"ValidatorGroupActiveVoteRevoked"`` \| ``"ValidatorGroupMarkedEligible"`` \| ``"ValidatorGroupMarkedIneligible"`` \| ``"ValidatorGroupPendingVoteRevoked"`` \| ``"ValidatorGroupVoteActivated"`` \| ``"ValidatorGroupVoteCast"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getTotalVotesForGroup

▸ **getTotalVotesForGroup**(`group`, `blockNumber?`): `Promise`\<`BigNumber`\>

Returns the total votes for `group`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The address of the validator group. |
| `blockNumber?` | `number` | - |

#### Returns

`Promise`\<`BigNumber`\>

The total votes for `group`.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:197](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L197)

___

### getValidatorGroupVotes

▸ **getValidatorGroupVotes**(`address`): `Promise`\<[`ValidatorGroupVote`](../interfaces/wrappers_Election.ValidatorGroupVote.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<[`ValidatorGroupVote`](../interfaces/wrappers_Election.ValidatorGroupVote.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:319](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L319)

___

### getValidatorGroupsVotes

▸ **getValidatorGroupsVotes**(): `Promise`\<[`ValidatorGroupVote`](../interfaces/wrappers_Election.ValidatorGroupVote.md)[]\>

Returns the current registered validator groups and their total votes and eligibility.

#### Returns

`Promise`\<[`ValidatorGroupVote`](../interfaces/wrappers_Election.ValidatorGroupVote.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:336](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L336)

___

### getValidatorSigners

▸ **getValidatorSigners**(`blockNumber`): `Promise`\<`string`[]\>

Returns the validator signers for block `blockNumber`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockNumber` | `number` | Block number to retrieve signers for. |

#### Returns

`Promise`\<`string`[]\>

Address of each signer in the validator set.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L167)

___

### getVoter

▸ **getVoter**(`account`, `blockNumber?`): `Promise`\<[`Voter`](../interfaces/wrappers_Election.Voter.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `blockNumber?` | `number` |

#### Returns

`Promise`\<[`Voter`](../interfaces/wrappers_Election.Voter.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:257](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L257)

___

### getVoterRewards

▸ **getVoterRewards**(`address`, `epochNumber`, `useBlockNumber?`, `voterShare?`): `Promise`\<[`VoterReward`](../interfaces/wrappers_Election.VoterReward.md)[]\>

Retrieves VoterRewards for address at epochNumber.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The address to retrieve VoterRewards for. |
| `epochNumber` | `number` | The epoch to retrieve VoterRewards at. |
| `useBlockNumber?` | `boolean` | - |
| `voterShare?` | `Record`\<`string`, `BigNumber`\> | Optionally address' share of group rewards. |

#### Returns

`Promise`\<[`VoterReward`](../interfaces/wrappers_Election.VoterReward.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:542](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L542)

___

### getVoterShare

▸ **getVoterShare**(`address`, `blockNumber?`): `Promise`\<`Record`\<`string`, `BigNumber`\>\>

Retrieves a voter's share of active votes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The voter to retrieve share for. |
| `blockNumber?` | `number` | The block to retrieve the voter's share at. |

#### Returns

`Promise`\<`Record`\<`string`, `BigNumber`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:576](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L576)

___

### getVotesForGroupByAccount

▸ **getVotesForGroupByAccount**(`account`, `group`, `blockNumber?`): `Promise`\<[`GroupVote`](../interfaces/wrappers_Election.GroupVote.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `group` | `string` |
| `blockNumber?` | `number` |

#### Returns

`Promise`\<[`GroupVote`](../interfaces/wrappers_Election.GroupVote.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:235](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L235)

___

### hasActivatablePendingVotes

▸ **hasActivatablePendingVotes**(`account`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:292](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L292)

___

### hasPendingVotes

▸ **hasPendingVotes**(`account`): `Promise`\<`boolean`\>

Returns whether or not the account has any pending votes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account casting votes. |

#### Returns

`Promise`\<`boolean`\>

The groups that `account` has voted for.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:280](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L280)

___

### revoke

▸ **revoke**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `group` | `string` |
| `value` | `BigNumber` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:413](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L413)

___

### revokeActive

▸ **revokeActive**(`account`, `group`, `value`, `lesserAfterVote?`, `greaterAfterVote?`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Creates a transaction object for revoking active votes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Account to revoke votes for. |
| `group` | `string` | Validator group to revoke votes from. |
| `value` | `BigNumber` | Amount to be removed from active votes. |
| `lesserAfterVote?` | `string` | First group address with less vote than `account`. |
| `greaterAfterVote?` | `string` | First group address with more vote than `account`. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

**`Dev`**

Must pass both `lesserAfterVote` and `greaterAfterVote` or neither.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:388](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L388)

___

### revokePending

▸ **revokePending**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `group` | `string` |
| `value` | `BigNumber` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:364](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L364)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[version](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

___

### vote

▸ **vote**(`validatorGroup`, `value`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Increments the number of total and pending votes for `group`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validatorGroup` | `string` | The validator group to vote for. |
| `value` | `BigNumber` | The amount of gold to use to vote. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Election.ts:440](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L440)
