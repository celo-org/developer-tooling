[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Election](../README.md) / ElectionWrapper

# Class: ElectionWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L79)

Contract for voting for validators and managing validator groups.

## Extends

- [`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md)\<`Election`\>

## Constructors

### Constructor

> **new ElectionWrapper**(`connection`, `contract`, `contracts`): `ElectionWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

#### Parameters

##### connection

`Connection`

##### contract

`Election`

##### contracts

`ContractWrappersForVotingAndRules`

#### Returns

`ElectionWrapper`

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`constructor`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#constructor)

## Properties

### electabilityThreshold()

> **electabilityThreshold**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L93)

Returns the current election threshold.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Election threshold.

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

#### AllowedToVoteOverMaxNumberOfGroups

> **AllowedToVoteOverMaxNumberOfGroups**: `ContractEvent`\<\{ `0`: `string`; `1`: `boolean`; `account`: `string`; `flag`: `boolean`; \}\>

#### BlockedBySet

> **BlockedBySet**: `ContractEvent`\<`string`\>

#### ElectabilityThresholdSet

> **ElectabilityThresholdSet**: `ContractEvent`\<`string`\>

#### ElectableValidatorsSet

> **ElectableValidatorsSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `max`: `string`; `min`: `string`; \}\>

#### EpochRewardsDistributedToVoters

> **EpochRewardsDistributedToVoters**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `group`: `string`; `value`: `string`; \}\>

#### MaxNumGroupsVotedForSet

> **MaxNumGroupsVotedForSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### ValidatorGroupActiveVoteRevoked

> **ValidatorGroupActiveVoteRevoked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `account`: `string`; `group`: `string`; `units`: `string`; `value`: `string`; \}\>

#### ValidatorGroupMarkedEligible

> **ValidatorGroupMarkedEligible**: `ContractEvent`\<`string`\>

#### ValidatorGroupMarkedIneligible

> **ValidatorGroupMarkedIneligible**: `ContractEvent`\<`string`\>

#### ValidatorGroupPendingVoteRevoked

> **ValidatorGroupPendingVoteRevoked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `group`: `string`; `value`: `string`; \}\>

#### ValidatorGroupVoteActivated

> **ValidatorGroupVoteActivated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `account`: `string`; `group`: `string`; `units`: `string`; `value`: `string`; \}\>

#### ValidatorGroupVoteCast

> **ValidatorGroupVoteCast**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `group`: `string`; `value`: `string`; \}\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`events`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Election`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`eventTypes`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#eventtypes)

***

### ~~getCurrentValidatorSigners()~~

> **getCurrentValidatorSigners**: () => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L159)

Returns the current validator signers using the precompiles.

#### Returns

`Promise`\<`string`[]\>

List of current validator signers.

#### Deprecated

use EpochManagerWrapper.getElectedSigners instead. see see https://specs.celo.org/smart_contract_updates_from_l1.html

***

### getGroupsVotedForByAccount()

> **getGroupsVotedForByAccount**: (`account`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:233](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L233)

Returns the groups that `account` has voted for.

#### Parameters

##### account

`string`

The address of the account casting votes.

#### Returns

`Promise`\<`string`[]\>

The groups that `account` has voted for.

***

### getTotalVotes()

> **getTotalVotes**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:152](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L152)

Returns the total votes received across all groups.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

The total votes received across all groups.

***

### getTotalVotesByAccount()

> **getTotalVotesByAccount**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:271](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L271)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getTotalVotesForGroupByAccount()

> **getTotalVotesForGroupByAccount**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:211](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L211)

Returns the total votes for `group` made by `account`.

#### Parameters

##### args

...\[`string`, `string`\]

#### Returns

`Promise`\<`BigNumber`\>

The total votes for `group` made by `account`.

***

### methodIds

> **methodIds**: `Record`\<`"electableValidators"` \| `"electabilityThreshold"` \| `"maxNumGroupsVotedFor"` \| `"checkProofOfPossession"` \| `"fractionMulExp"` \| `"getBlockNumberFromHeader"` \| `"getEpochNumber"` \| `"getEpochNumberOfBlock"` \| `"getEpochSize"` \| `"getParentSealBitmap"` \| `"getVerifiedSealBitmapFromHeader"` \| `"hashHeader"` \| `"initialized"` \| `"isOwner"` \| `"minQuorumSize"` \| `"minQuorumSizeInCurrentSet"` \| `"numberValidatorsInCurrentSet"` \| `"numberValidatorsInSet"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"validatorAddressFromCurrentSet"` \| `"validatorSignerAddressFromCurrentSet"` \| `"validatorSignerAddressFromSet"` \| `"initialize"` \| `"vote"` \| `"getVersionNumber"` \| `"allowedToVoteOverMaxNumberOfGroups"` \| `"cachedVotesByAccount"` \| `"getBlockedByContract"` \| `"isBlocked"` \| `"activate"` \| `"activateForAccount"` \| `"revokePending"` \| `"revokeAllActive"` \| `"revokeActive"` \| `"distributeEpochRewards"` \| `"markGroupIneligible"` \| `"markGroupEligible"` \| `"forceDecrementVotes"` \| `"setBlockedByContract"` \| `"getGroupsVotedForByAccount"` \| `"getNumVotesReceivable"` \| `"getEligibleValidatorGroups"` \| `"getTotalVotesForEligibleValidatorGroups"` \| `"electValidatorSigners"` \| `"electValidatorAccounts"` \| `"getTotalVotesByAccount"` \| `"getActiveVoteUnitsForGroupByAccount"` \| `"getActiveVoteUnitsForGroup"` \| `"getGroupEligibility"` \| `"getGroupEpochRewards"` \| `"getGroupEpochRewardsBasedOnScore"` \| `"hasActivatablePendingVotes"` \| `"getElectabilityThreshold"` \| `"getElectableValidators"` \| `"setElectableValidators"` \| `"setMaxNumGroupsVotedFor"` \| `"setElectabilityThreshold"` \| `"updateTotalVotesByAccountForGroup"` \| `"setAllowedToVoteOverMaxNumberOfGroups"` \| `"canReceiveVotes"` \| `"getTotalVotes"` \| `"getActiveVotes"` \| `"electNValidatorSigners"` \| `"electNValidatorAccounts"` \| `"getCurrentValidatorSigners"` \| `"getPendingVotesForGroupByAccount"` \| `"getActiveVotesForGroupByAccount"` \| `"getTotalVotesForGroupByAccount"` \| `"getTotalVotesForGroup"` \| `"getActiveVotesForGroup"` \| `"getPendingVotesForGroup"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`methodIds`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#methodids)

***

### numberValidatorsInCurrentSet()

> **numberValidatorsInCurrentSet**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L142)

Gets the size of the current elected validator set.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

Size of the current elected validator set.

***

### numberValidatorsInSet()

> **numberValidatorsInSet**: (`blockNumber`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L132)

Gets the size of the validator set that must sign the given block number.

#### Parameters

##### blockNumber

`number`

Block number to retrieve the validator set from.

#### Returns

`Promise`\<`number`\>

Size of the validator set.

***

### validatorSignerAddressFromCurrentSet()

> **validatorSignerAddressFromCurrentSet**: (`index`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L120)

Gets a validator address from the current validator set.

#### Parameters

##### index

`number`

Index of requested validator in the validator set.

#### Returns

`Promise`\<`` `0x${string}` ``\>

Address of validator at the requested index.

***

### validatorSignerAddressFromSet()

> **validatorSignerAddressFromSet**: (`signerIndex`, `blockNumber`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L105)

Gets a validator address from the validator set at the given block number.

#### Parameters

##### signerIndex

`number`

##### blockNumber

`number`

Block number to retrieve the validator set from.

#### Returns

`Promise`\<`` `0x${string}` ``\>

Address of validator at the requested index.

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

### activate()

> **activate**(`account`, `onBehalfOfAccount?`): `Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:352](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L352)

Activates any activatable pending votes.

#### Parameters

##### account

`string`

The account with pending votes to activate.

##### onBehalfOfAccount?

`boolean`

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

***

### electableValidators()

> **electableValidators**(): `Promise`\<[`ElectableValidators`](../interfaces/ElectableValidators.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L84)

Returns the minimum and maximum number of validators that can be elected.

#### Returns

`Promise`\<[`ElectableValidators`](../interfaces/ElectableValidators.md)\>

The minimum and maximum number of validators that can be elected.

***

### electValidatorSigners()

> **electValidatorSigners**(`min?`, `max?`): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:181](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L181)

Returns a list of elected validators with seats allocated to groups via the D'Hondt method.

#### Parameters

##### min?

`number`

##### max?

`number`

#### Returns

`Promise`\<`string`[]\>

The list of elected validators.

#### Dev

See https://en.wikipedia.org/wiki/D%27Hondt_method#Allocation for more information.

***

### findLesserAndGreaterAfterVote()

> **findLesserAndGreaterAfterVote**(`votedGroup`, `voteWeight`): `Promise`\<\{ `greater`: `string`; `lesser`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:469](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L469)

#### Parameters

##### votedGroup

`string`

##### voteWeight

`BigNumber`

#### Returns

`Promise`\<\{ `greater`: `string`; `lesser`: `string`; \}\>

***

### getActiveVotesForGroup()

> **getActiveVotesForGroup**(`group`, `blockNumber?`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:222](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L222)

Returns the active votes for `group`.

#### Parameters

##### group

`string`

The address of the validator group.

##### blockNumber?

`number`

#### Returns

`Promise`\<`BigNumber`\>

The active votes for `group`.

***

### getConfig()

> **getConfig**(): `Promise`\<[`ElectionConfig`](../interfaces/ElectionConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:305](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L305)

Returns current configuration parameters.

#### Returns

`Promise`\<[`ElectionConfig`](../interfaces/ElectionConfig.md)\>

***

### getEligibleValidatorGroupsVotes()

> **getEligibleValidatorGroupsVotes**(): `Promise`\<[`ValidatorGroupVote`](../interfaces/ValidatorGroupVote.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:454](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L454)

Returns the current eligible validator groups and their total votes.

#### Returns

`Promise`\<[`ValidatorGroupVote`](../interfaces/ValidatorGroupVote.md)[]\>

***

### getGroupEpochRewards()

> **getGroupEpochRewards**(`group`, `totalEpochRewards`, `groupScore`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:578](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L578)

#### Parameters

##### group

`string`

##### totalEpochRewards

`BigNumber`

##### groupScore

`BigNumber`

#### Returns

`Promise`\<`BigNumber`\>

***

### getGroupVoterRewards()

> **getGroupVoterRewards**(`epochNumber`, `useBlockNumber?`): `Promise`\<[`GroupVoterReward`](../interfaces/GroupVoterReward.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:498](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L498)

Retrieves GroupVoterRewards at epochNumber.

#### Parameters

##### epochNumber

`number`

The epoch to retrieve GroupVoterRewards at.

##### useBlockNumber?

`boolean`

#### Returns

`Promise`\<[`GroupVoterReward`](../interfaces/GroupVoterReward.md)[]\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"AllowedToVoteOverMaxNumberOfGroups"` | `"BlockedBySet"` | `"ElectabilityThresholdSet"` | `"ElectableValidatorsSet"` | `"EpochRewardsDistributedToVoters"` | `"MaxNumGroupsVotedForSet"` | `"ValidatorGroupActiveVoteRevoked"` | `"ValidatorGroupMarkedEligible"` | `"ValidatorGroupMarkedIneligible"` | `"ValidatorGroupPendingVoteRevoked"` | `"ValidatorGroupVoteActivated"` | `"ValidatorGroupVoteCast"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`getPastEvents`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#getpastevents)

***

### getTotalVotesForGroup()

> **getTotalVotesForGroup**(`group`, `blockNumber?`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L199)

Returns the total votes for `group`.

#### Parameters

##### group

`string`

The address of the validator group.

##### blockNumber?

`number`

#### Returns

`Promise`\<`BigNumber`\>

The total votes for `group`.

***

### getValidatorGroupsVotes()

> **getValidatorGroupsVotes**(): `Promise`\<[`ValidatorGroupVote`](../interfaces/ValidatorGroupVote.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:338](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L338)

Returns the current registered validator groups and their total votes and eligibility.

#### Returns

`Promise`\<[`ValidatorGroupVote`](../interfaces/ValidatorGroupVote.md)[]\>

***

### getValidatorGroupVotes()

> **getValidatorGroupVotes**(`address`): `Promise`\<[`ValidatorGroupVote`](../interfaces/ValidatorGroupVote.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:321](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L321)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<[`ValidatorGroupVote`](../interfaces/ValidatorGroupVote.md)\>

***

### ~~getValidatorSigners()~~

> **getValidatorSigners**(`blockNumber`): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:169](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L169)

Returns the validator signers for block `blockNumber`.

#### Parameters

##### blockNumber

`number`

Block number to retrieve signers for.

#### Returns

`Promise`\<`string`[]\>

Address of each signer in the validator set.

#### Deprecated

see https://specs.celo.org/smart_contract_updates_from_l1.html

***

### getVoter()

> **getVoter**(`account`, `blockNumber?`): `Promise`\<[`Voter`](../interfaces/Voter.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:259](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L259)

#### Parameters

##### account

`string`

##### blockNumber?

`number`

#### Returns

`Promise`\<[`Voter`](../interfaces/Voter.md)\>

***

### getVoterRewards()

> **getVoterRewards**(`address`, `epochNumber`, `useBlockNumber?`, `voterShare?`): `Promise`\<[`VoterReward`](../interfaces/VoterReward.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:531](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L531)

Retrieves VoterRewards for address at epochNumber.

#### Parameters

##### address

`string`

The address to retrieve VoterRewards for.

##### epochNumber

`number`

The epoch to retrieve VoterRewards at.

##### useBlockNumber?

`boolean`

##### voterShare?

`Record`\<`string`, `BigNumber`\>

Optionally address' share of group rewards.

#### Returns

`Promise`\<[`VoterReward`](../interfaces/VoterReward.md)[]\>

***

### getVoterShare()

> **getVoterShare**(`address`, `blockNumber?`): `Promise`\<`Record`\<`string`, `BigNumber`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:563](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L563)

Retrieves a voter's share of active votes.

#### Parameters

##### address

`string`

The voter to retrieve share for.

##### blockNumber?

`number`

The block to retrieve the voter's share at.

#### Returns

`Promise`\<`Record`\<`string`, `BigNumber`\>\>

***

### getVotesForGroupByAccount()

> **getVotesForGroupByAccount**(`account`, `group`, `blockNumber?`): `Promise`\<[`GroupVote`](../interfaces/GroupVote.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:237](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L237)

#### Parameters

##### account

`string`

##### group

`string`

##### blockNumber?

`number`

#### Returns

`Promise`\<[`GroupVote`](../interfaces/GroupVote.md)\>

***

### hasActivatablePendingVotes()

> **hasActivatablePendingVotes**(`account`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:294](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L294)

#### Parameters

##### account

`string`

#### Returns

`Promise`\<`boolean`\>

***

### hasPendingVotes()

> **hasPendingVotes**(`account`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:282](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L282)

Returns whether or not the account has any pending votes.

#### Parameters

##### account

`string`

The address of the account casting votes.

#### Returns

`Promise`\<`boolean`\>

The groups that `account` has voted for.

***

### revoke()

> **revoke**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:415](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L415)

#### Parameters

##### account

`string`

##### group

`string`

##### value

`BigNumber`

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>[]\>

***

### revokeActive()

> **revokeActive**(`account`, `group`, `value`, `lesserAfterVote?`, `greaterAfterVote?`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:390](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L390)

Creates a transaction object for revoking active votes.

#### Parameters

##### account

`string`

Account to revoke votes for.

##### group

`string`

Validator group to revoke votes from.

##### value

`BigNumber`

Amount to be removed from active votes.

##### lesserAfterVote?

`string`

First group address with less vote than `account`.

##### greaterAfterVote?

`string`

First group address with more vote than `account`.

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Dev

Must pass both `lesserAfterVote` and `greaterAfterVote` or neither.

***

### revokePending()

> **revokePending**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:366](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L366)

#### Parameters

##### account

`string`

##### group

`string`

##### value

`BigNumber`

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`version`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#version)

***

### vote()

> **vote**(`validatorGroup`, `value`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Election.ts:442](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Election.ts#L442)

Increments the number of total and pending votes for `group`.

#### Parameters

##### validatorGroup

`string`

The validator group to vote for.

##### value

`BigNumber`

The amount of gold to use to vote.

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>
