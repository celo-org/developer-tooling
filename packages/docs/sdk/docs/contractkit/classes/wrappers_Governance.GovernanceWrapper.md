[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Governance](../modules/wrappers_Governance.md) / GovernanceWrapper

# Class: GovernanceWrapper

[wrappers/Governance](../modules/wrappers_Governance.md).GovernanceWrapper

Contract managing voting for governance proposals.

## Hierarchy

- [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`Governance`\>

  ↳ **`GovernanceWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Governance.GovernanceWrapper.md#constructor)

### Properties

- [approveHotfix](wrappers_Governance.GovernanceWrapper.md#approvehotfix)
- [concurrentProposals](wrappers_Governance.GovernanceWrapper.md#concurrentproposals)
- [dequeueFrequency](wrappers_Governance.GovernanceWrapper.md#dequeuefrequency)
- [dequeueProposalsIfReady](wrappers_Governance.GovernanceWrapper.md#dequeueproposalsifready)
- [eventTypes](wrappers_Governance.GovernanceWrapper.md#eventtypes)
- [events](wrappers_Governance.GovernanceWrapper.md#events)
- [executeHotfix](wrappers_Governance.GovernanceWrapper.md#executehotfix)
- [getApprover](wrappers_Governance.GovernanceWrapper.md#getapprover)
- [getProposalMetadata](wrappers_Governance.GovernanceWrapper.md#getproposalmetadata)
- [getProposalTransaction](wrappers_Governance.GovernanceWrapper.md#getproposaltransaction)
- [getQueue](wrappers_Governance.GovernanceWrapper.md#getqueue)
- [getRefundedDeposits](wrappers_Governance.GovernanceWrapper.md#getrefundeddeposits)
- [getUpvoteRecord](wrappers_Governance.GovernanceWrapper.md#getupvoterecord)
- [getUpvotes](wrappers_Governance.GovernanceWrapper.md#getupvotes)
- [getVotes](wrappers_Governance.GovernanceWrapper.md#getvotes)
- [hotfixWhitelistValidatorTally](wrappers_Governance.GovernanceWrapper.md#hotfixwhitelistvalidatortally)
- [isApproved](wrappers_Governance.GovernanceWrapper.md#isapproved)
- [isDequeuedProposalExpired](wrappers_Governance.GovernanceWrapper.md#isdequeuedproposalexpired)
- [isHotfixPassing](wrappers_Governance.GovernanceWrapper.md#ishotfixpassing)
- [isHotfixWhitelistedBy](wrappers_Governance.GovernanceWrapper.md#ishotfixwhitelistedby)
- [isProposalPassing](wrappers_Governance.GovernanceWrapper.md#isproposalpassing)
- [isQueued](wrappers_Governance.GovernanceWrapper.md#isqueued)
- [isQueuedProposalExpired](wrappers_Governance.GovernanceWrapper.md#isqueuedproposalexpired)
- [isVoting](wrappers_Governance.GovernanceWrapper.md#isvoting)
- [lastDequeue](wrappers_Governance.GovernanceWrapper.md#lastdequeue)
- [methodIds](wrappers_Governance.GovernanceWrapper.md#methodids)
- [minDeposit](wrappers_Governance.GovernanceWrapper.md#mindeposit)
- [minQuorumSize](wrappers_Governance.GovernanceWrapper.md#minquorumsize)
- [prepareHotfix](wrappers_Governance.GovernanceWrapper.md#preparehotfix)
- [proposalExists](wrappers_Governance.GovernanceWrapper.md#proposalexists)
- [propose](wrappers_Governance.GovernanceWrapper.md#propose)
- [queueExpiry](wrappers_Governance.GovernanceWrapper.md#queueexpiry)
- [revokeVotes](wrappers_Governance.GovernanceWrapper.md#revokevotes)
- [whitelistHotfix](wrappers_Governance.GovernanceWrapper.md#whitelisthotfix)
- [withdraw](wrappers_Governance.GovernanceWrapper.md#withdraw)

### Accessors

- [address](wrappers_Governance.GovernanceWrapper.md#address)

### Methods

- [approve](wrappers_Governance.GovernanceWrapper.md#approve)
- [execute](wrappers_Governance.GovernanceWrapper.md#execute)
- [getApprovalStatus](wrappers_Governance.GovernanceWrapper.md#getapprovalstatus)
- [getApproverMultisig](wrappers_Governance.GovernanceWrapper.md#getapprovermultisig)
- [getConfig](wrappers_Governance.GovernanceWrapper.md#getconfig)
- [getConstitution](wrappers_Governance.GovernanceWrapper.md#getconstitution)
- [getDequeue](wrappers_Governance.GovernanceWrapper.md#getdequeue)
- [getHotfixRecord](wrappers_Governance.GovernanceWrapper.md#gethotfixrecord)
- [getHumanReadableConfig](wrappers_Governance.GovernanceWrapper.md#gethumanreadableconfig)
- [getHumanReadableProposalMetadata](wrappers_Governance.GovernanceWrapper.md#gethumanreadableproposalmetadata)
- [getParticipationParameters](wrappers_Governance.GovernanceWrapper.md#getparticipationparameters)
- [getPastEvents](wrappers_Governance.GovernanceWrapper.md#getpastevents)
- [getProposal](wrappers_Governance.GovernanceWrapper.md#getproposal)
- [getProposalRecord](wrappers_Governance.GovernanceWrapper.md#getproposalrecord)
- [getProposalStage](wrappers_Governance.GovernanceWrapper.md#getproposalstage)
- [getSupport](wrappers_Governance.GovernanceWrapper.md#getsupport)
- [getSupportWithConstitutionThreshold](wrappers_Governance.GovernanceWrapper.md#getsupportwithconstitutionthreshold)
- [getTransactionConstitution](wrappers_Governance.GovernanceWrapper.md#gettransactionconstitution)
- [getVoteRecord](wrappers_Governance.GovernanceWrapper.md#getvoterecord)
- [getVoteRecords](wrappers_Governance.GovernanceWrapper.md#getvoterecords)
- [getVoteWeight](wrappers_Governance.GovernanceWrapper.md#getvoteweight)
- [getVoter](wrappers_Governance.GovernanceWrapper.md#getvoter)
- [humanReadableProposalSchedule](wrappers_Governance.GovernanceWrapper.md#humanreadableproposalschedule)
- [isUpvoting](wrappers_Governance.GovernanceWrapper.md#isupvoting)
- [isVotingReferendum](wrappers_Governance.GovernanceWrapper.md#isvotingreferendum)
- [proposalSchedule](wrappers_Governance.GovernanceWrapper.md#proposalschedule)
- [revokeUpvote](wrappers_Governance.GovernanceWrapper.md#revokeupvote)
- [sortedQueue](wrappers_Governance.GovernanceWrapper.md#sortedqueue)
- [stageDurations](wrappers_Governance.GovernanceWrapper.md#stagedurations)
- [upvote](wrappers_Governance.GovernanceWrapper.md#upvote)
- [version](wrappers_Governance.GovernanceWrapper.md#version)
- [vote](wrappers_Governance.GovernanceWrapper.md#vote)
- [votePartially](wrappers_Governance.GovernanceWrapper.md#votepartially)

## Constructors

### constructor

• **new GovernanceWrapper**(`connection`, `contract`, `contracts`): [`GovernanceWrapper`](wrappers_Governance.GovernanceWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Governance` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`GovernanceWrapper`](wrappers_Governance.GovernanceWrapper.md)

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### approveHotfix

• **approveHotfix**: (...`args`: [`Buffer`]) => `CeloTransactionObject`\<`void`\>

Marks the given hotfix approved by `sender`.

**`Param`**

keccak256 hash of hotfix's associated abi encoded transactions

**`Notice`**

Only the `approver` address will succeed in sending this transaction

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Marks the given hotfix approved by `sender`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Buffer`] |

##### Returns

`CeloTransactionObject`\<`void`\>

**`Notice`**

Only the `approver` address will succeed in sending this transaction

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:934](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L934)

___

### concurrentProposals

• **concurrentProposals**: (...`args`: []) => `Promise`\<`BigNumber`\>

Querying number of possible concurrent proposals.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Querying number of possible concurrent proposals.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Current number of possible concurrent proposals.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L159)

___

### dequeueFrequency

• **dequeueFrequency**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query proposal dequeue frequency.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query proposal dequeue frequency.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Current proposal dequeue frequency in seconds.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:173](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L173)

___

### dequeueProposalsIfReady

• **dequeueProposalsIfReady**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

Dequeues any queued proposals if `dequeueFrequency` seconds have elapsed since the last dequeue

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Dequeues any queued proposals if `dequeueFrequency` seconds have elapsed since the last dequeue

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:685](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L685)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Governance`\>

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
| `ApproverSet` | `ContractEvent`\<`string`\> |
| `ConcurrentProposalsSet` | `ContractEvent`\<`string`\> |
| `ConstitutionSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `destination`: `string` ; `functionId`: `string` ; `threshold`: `string`  }\> |
| `DequeueFrequencySet` | `ContractEvent`\<`string`\> |
| `ExecutionStageDurationSet` | `ContractEvent`\<`string`\> |
| `HotfixApproved` | `ContractEvent`\<`string`\> |
| `HotfixExecuted` | `ContractEvent`\<`string`\> |
| `HotfixPrepared` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `epoch`: `string` ; `hash`: `string`  }\> |
| `HotfixWhitelisted` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `hash`: `string` ; `whitelister`: `string`  }\> |
| `MinDepositSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `ParticipationBaselineQuorumFactorSet` | `ContractEvent`\<`string`\> |
| `ParticipationBaselineUpdateFactorSet` | `ContractEvent`\<`string`\> |
| `ParticipationBaselineUpdated` | `ContractEvent`\<`string`\> |
| `ParticipationFloorSet` | `ContractEvent`\<`string`\> |
| `ProposalApproved` | `ContractEvent`\<`string`\> |
| `ProposalDequeued` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `proposalId`: `string` ; `timestamp`: `string`  }\> |
| `ProposalExecuted` | `ContractEvent`\<`string`\> |
| `ProposalExpired` | `ContractEvent`\<`string`\> |
| `ProposalQueued` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `deposit`: `string` ; `proposalId`: `string` ; `proposer`: `string` ; `timestamp`: `string` ; `transactionCount`: `string`  }\> |
| `ProposalUpvoteRevoked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `proposalId`: `string` ; `revokedUpvotes`: `string`  }\> |
| `ProposalUpvoted` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `proposalId`: `string` ; `upvotes`: `string`  }\> |
| `ProposalVoteRevoked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `account`: `string` ; `proposalId`: `string` ; `value`: `string` ; `weight`: `string`  }\> |
| `ProposalVoteRevokedV2` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `abstainVotes`: `string` ; `account`: `string` ; `noVotes`: `string` ; `proposalId`: `string` ; `yesVotes`: `string`  }\> |
| `ProposalVoted` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `account`: `string` ; `proposalId`: `string` ; `value`: `string` ; `weight`: `string`  }\> |
| `ProposalVotedV2` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `abstainVotes`: `string` ; `account`: `string` ; `noVotes`: `string` ; `proposalId`: `string` ; `yesVotes`: `string`  }\> |
| `QueueExpirySet` | `ContractEvent`\<`string`\> |
| `ReferendumStageDurationSet` | `ContractEvent`\<`string`\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### executeHotfix

• **executeHotfix**: (...`args`: [proposal: Proposal, salt: Buffer]) => `CeloTransactionObject`\<`void`\>

Executes a given sequence of transactions if the corresponding hash is prepared and approved.

**`Param`**

Governance hotfix proposal

**`Param`**

Secret which guarantees uniqueness of hash

**`Notice`**

keccak256 hash of abi encoded transactions computed on-chain

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Executes a given sequence of transactions if the corresponding hash is prepared and approved.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [proposal: Proposal, salt: Buffer] |

##### Returns

`CeloTransactionObject`\<`void`\>

**`Notice`**

keccak256 hash of abi encoded transactions computed on-chain

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:956](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L956)

___

### getApprover

• **getApprover**: (...`args`: []) => `Promise`\<`string`\>

Returns the approver address for proposals and hotfixes.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the approver address for proposals and hotfixes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:394](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L394)

___

### getProposalMetadata

• **getProposalMetadata**: (`proposalID`: `Value`) => `Promise`\<[`ProposalMetadata`](../interfaces/wrappers_Governance.ProposalMetadata.md)\>

Returns the metadata associated with a given proposal.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`proposalID`): `Promise`\<[`ProposalMetadata`](../interfaces/wrappers_Governance.ProposalMetadata.md)\>

Returns the metadata associated with a given proposal.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

##### Returns

`Promise`\<[`ProposalMetadata`](../interfaces/wrappers_Governance.ProposalMetadata.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:322](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L322)

___

### getProposalTransaction

• **getProposalTransaction**: (`proposalID`: `Value`, `txIndex`: `number`) => `Promise`\<[`ProposalTransaction`](../modules/wrappers_Governance.md#proposaltransaction)\>

Returns the transaction at the given index associated with a given proposal.

**`Param`**

Governance proposal UUID

**`Param`**

Transaction index

#### Type declaration

▸ (`proposalID`, `txIndex`): `Promise`\<[`ProposalTransaction`](../modules/wrappers_Governance.md#proposaltransaction)\>

Returns the transaction at the given index associated with a given proposal.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |
| `txIndex` | `number` | Transaction index |

##### Returns

`Promise`\<[`ProposalTransaction`](../modules/wrappers_Governance.md#proposaltransaction)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:351](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L351)

___

### getQueue

• **getQueue**: (...`args`: []) => `Promise`\<[`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)[]\>

Returns the proposal queue as list of upvote records.

#### Type declaration

▸ (`...args`): `Promise`\<[`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)[]\>

Returns the proposal queue as list of upvote records.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<[`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:631](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L631)

___

### getRefundedDeposits

• **getRefundedDeposits**: (...`args`: [`string`]) => `Promise`\<`BigNumber`\>

Returns the value of proposal deposits that have been refunded.

**`Param`**

Governance proposer address.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the value of proposal deposits that have been refunded.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`string`] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:598](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L598)

___

### getUpvoteRecord

• **getUpvoteRecord**: (`upvoter`: `string`) => `Promise`\<[`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)\>

Returns the current upvoted governance proposal ID and applied vote weight (zeroes if none).

**`Param`**

Address of upvoter

#### Type declaration

▸ (`upvoter`): `Promise`\<[`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)\>

Returns the current upvoted governance proposal ID and applied vote weight (zeroes if none).

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `upvoter` | `string` | Address of upvoter |

##### Returns

`Promise`\<[`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:546](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L546)

___

### getUpvotes

• **getUpvotes**: (...`args`: [`Value`]) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Value`] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:608](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L608)

___

### getVotes

• **getVotes**: (...`args`: [`Value`]) => `Promise`\<[`Votes`](../interfaces/wrappers_Governance.Votes.md)\>

Returns the yes, no, and abstain votes applied to a given proposal.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`...args`): `Promise`\<[`Votes`](../interfaces/wrappers_Governance.Votes.md)\>

Returns the yes, no, and abstain votes applied to a given proposal.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Value`] |

##### Returns

`Promise`\<[`Votes`](../interfaces/wrappers_Governance.Votes.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:618](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L618)

___

### hotfixWhitelistValidatorTally

• **hotfixWhitelistValidatorTally**: (...`args`: [`Buffer`]) => `Promise`\<`string`\>

Returns the number of validators that whitelisted the hotfix

**`Param`**

keccak256 hash of hotfix's associated abi encoded transactions

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the number of validators that whitelisted the hotfix

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Buffer`] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:914](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L914)

___

### isApproved

• **isApproved**: (`proposalID`: `Value`) => `Promise`\<`boolean`\>

Returns whether a given proposal is approved.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`proposalID`): `Promise`\<`boolean`\>

Returns whether a given proposal is approved.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:368](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L368)

___

### isDequeuedProposalExpired

• **isDequeuedProposalExpired**: (`proposalID`: `Value`) => `Promise`\<`boolean`\>

Returns whether a dequeued proposal is expired.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`proposalID`): `Promise`\<`boolean`\>

Returns whether a dequeued proposal is expired.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:377](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L377)

___

### isHotfixPassing

• **isHotfixPassing**: (...`args`: [`Buffer`]) => `Promise`\<`boolean`\>

Returns whether a given hotfix can be passed.

**`Param`**

keccak256 hash of hotfix's associated abi encoded transactions

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Returns whether a given hotfix can be passed.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Buffer`] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:899](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L899)

___

### isHotfixWhitelistedBy

• **isHotfixWhitelistedBy**: (...`args`: [`Buffer`, `string`]) => `Promise`\<`boolean`\>

Returns whether a given hotfix has been whitelisted by a given address.

**`Param`**

keccak256 hash of hotfix's associated abi encoded transactions

**`Param`**

address of whitelister

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Returns whether a given hotfix has been whitelisted by a given address.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Buffer`, `string`] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:890](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L890)

___

### isProposalPassing

• **isProposalPassing**: (...`args`: [`Value`]) => `Promise`\<`boolean`\>

Returns whether a given proposal is passing relative to the constitution's threshold.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Returns whether a given proposal is passing relative to the constitution's threshold.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Value`] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:519](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L519)

___

### isQueued

• **isQueued**: (...`args`: [`Value`]) => `Promise`\<`boolean`\>

Returns whether a given proposal is queued.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Returns whether a given proposal is queued.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Value`] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:592](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L592)

___

### isQueuedProposalExpired

• **isQueuedProposalExpired**: (...`args`: [`Value`]) => `Promise`\<`boolean`\>

Returns whether a dequeued proposal is expired.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`...args`): `Promise`\<`boolean`\>

Returns whether a dequeued proposal is expired.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Value`] |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:386](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L386)

___

### isVoting

• **isVoting**: (`account`: `string`) => `Promise`\<`boolean`\>

Returns whether or not a particular account is voting on proposals.

**`Param`**

The address of the account.

#### Type declaration

▸ (`account`): `Promise`\<`boolean`\>

Returns whether or not a particular account is voting on proposals.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

##### Returns

`Promise`\<`boolean`\>

Whether or not the account is voting on proposals.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L272)

___

### lastDequeue

• **lastDequeue**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query time of last proposal dequeue

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query time of last proposal dequeue

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Time of last dequeue

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:168](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L168)

___

### methodIds

• **methodIds**: `Record`\<``"propose"`` \| ``"executeHotfix"`` \| ``"concurrentProposals"`` \| ``"dequeueFrequency"`` \| ``"minDeposit"`` \| ``"queueExpiry"`` \| ``"stageDurations"`` \| ``"upvote"`` \| ``"refundedDeposits"`` \| ``"approver"`` \| ``"checkProofOfPossession"`` \| ``"dequeued"`` \| ``"emptyIndices"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"hotfixes"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"lastDequeue"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"proposalCount"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"setApprover"`` \| ``"setConcurrentProposals"`` \| ``"setMinDeposit"`` \| ``"setQueueExpiry"`` \| ``"setDequeueFrequency"`` \| ``"setReferendumStageDuration"`` \| ``"setExecutionStageDuration"`` \| ``"setParticipationBaseline"`` \| ``"setParticipationFloor"`` \| ``"setBaselineUpdateFactor"`` \| ``"setBaselineQuorumFactor"`` \| ``"setConstitution"`` \| ``"getProposalStage"`` \| ``"revokeUpvote"`` \| ``"approve"`` \| ``"vote"`` \| ``"votePartially"`` \| ``"revokeVotes"`` \| ``"execute"`` \| ``"approveHotfix"`` \| ``"isHotfixWhitelistedBy"`` \| ``"whitelistHotfix"`` \| ``"prepareHotfix"`` \| ``"withdraw"`` \| ``"isVoting"`` \| ``"getReferendumStageDuration"`` \| ``"getExecutionStageDuration"`` \| ``"getParticipationParameters"`` \| ``"proposalExists"`` \| ``"getProposal"`` \| ``"getProposalTransaction"`` \| ``"isApproved"`` \| ``"getVoteTotals"`` \| ``"getVoteRecord"`` \| ``"getQueueLength"`` \| ``"getUpvotes"`` \| ``"getQueue"`` \| ``"getDequeue"`` \| ``"getUpvoteRecord"`` \| ``"getMostRecentReferendumProposal"`` \| ``"hotfixWhitelistValidatorTally"`` \| ``"isHotfixPassing"`` \| ``"getHotfixRecord"`` \| ``"dequeueProposalsIfReady"`` \| ``"isQueued"`` \| ``"isProposalPassing"`` \| ``"isDequeuedProposal"`` \| ``"isDequeuedProposalExpired"`` \| ``"isQueuedProposalExpired"`` \| ``"getConstitution"`` \| ``"getAmountOfGoldUsedForVoting"`` \| ``"removeVotesWhenRevokingDelegatedVotes"``, `string`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### minDeposit

• **minDeposit**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query minimum deposit required to make a proposal.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query minimum deposit required to make a proposal.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

Current minimum deposit.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:178](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L178)

___

### minQuorumSize

• **minQuorumSize**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the number of validators required to reach a Byzantine quorum

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the number of validators required to reach a Byzantine quorum

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:904](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L904)

___

### prepareHotfix

• **prepareHotfix**: (...`args`: [`Buffer`]) => `CeloTransactionObject`\<`void`\>

Marks the given hotfix prepared for current epoch if quorum of validators have whitelisted it.

**`Param`**

keccak256 hash of hotfix's associated abi encoded transactions

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Marks the given hotfix prepared for current epoch if quorum of validators have whitelisted it.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Buffer`] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:944](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L944)

___

### proposalExists

• **proposalExists**: (`proposalID`: `Value`) => `Promise`\<`boolean`\>

Returns whether a governance proposal exists with the given ID.

**`Param`**

Governance proposal UUID

#### Type declaration

▸ (`proposalID`): `Promise`\<`boolean`\>

Returns whether a governance proposal exists with the given ID.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

##### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:537](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L537)

___

### propose

• **propose**: (...`args`: [proposal: Proposal, descriptionURL: string]) => `CeloTransactionObject`\<`string`\>

Submits a new governance proposal.

**`Param`**

Governance proposal

**`Param`**

A URL where further information about the proposal can be viewed

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`string`\>

Submits a new governance proposal.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [proposal: Proposal, descriptionURL: string] |

##### Returns

`CeloTransactionObject`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:531](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L531)

___

### queueExpiry

• **queueExpiry**: (...`args`: []) => `Promise`\<`BigNumber`\>

Query queue expiry parameter.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Query queue expiry parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

The number of seconds a proposal can stay in the queue before expiring.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:183](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L183)

___

### revokeVotes

• **revokeVotes**: (...`args`: []) => `CeloTransactionObject`\<`boolean`\>

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:858](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L858)

___

### whitelistHotfix

• **whitelistHotfix**: (...`args`: [`Buffer`]) => `CeloTransactionObject`\<`void`\>

Marks the given hotfix whitelisted by `sender`.

**`Param`**

keccak256 hash of hotfix's associated abi encoded transactions

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Marks the given hotfix whitelisted by `sender`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`Buffer`] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:923](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L923)

___

### withdraw

• **withdraw**: (...`args`: []) => `CeloTransactionObject`\<`boolean`\>

Withdraws refunded proposal deposits.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Withdraws refunded proposal deposits.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:524](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L524)

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

### approve

▸ **approve**(`proposalID`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Approves given proposal, allowing it to later move to `referendum`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

**`Notice`**

Only the `approver` address will succeed in sending this transaction

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:810](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L810)

___

### execute

▸ **execute**(`proposalID`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Executes a given proposal's associated transactions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:864](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L864)

___

### getApprovalStatus

▸ **getApprovalStatus**(`proposalID`): `Promise`\<`ApprovalStatus`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposalID` | `Value` |

#### Returns

`Promise`\<`ApprovalStatus`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:459](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L459)

___

### getApproverMultisig

▸ **getApproverMultisig**(): `Promise`\<[`MultiSigWrapper`](wrappers_MultiSig.MultiSigWrapper.md)\>

Returns the approver multisig contract for proposals and hotfixes.

#### Returns

`Promise`\<[`MultiSigWrapper`](wrappers_MultiSig.MultiSigWrapper.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:399](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L399)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`GovernanceConfig`](../interfaces/wrappers_Governance.GovernanceConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`GovernanceConfig`](../interfaces/wrappers_Governance.GovernanceConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:277](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L277)

___

### getConstitution

▸ **getConstitution**(`proposal`): `Promise`\<`BigNumber`\>

Returns the required ratio of yes:no votes needed to exceed in order to pass the proposal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposal` | [`Proposal`](../modules/wrappers_Governance.md#proposal) | Proposal to determine the constitution for running. |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:213](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L213)

___

### getDequeue

▸ **getDequeue**(`filterZeroes?`): `Promise`\<`BigNumber`[]\>

Returns the (existing) proposal dequeue as list of proposal IDs.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `filterZeroes` | `boolean` | `false` |

#### Returns

`Promise`\<`BigNumber`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:645](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L645)

___

### getHotfixRecord

▸ **getHotfixRecord**(`hash`): `Promise`\<[`HotfixRecord`](../interfaces/wrappers_Governance.HotfixRecord.md)\>

Returns approved, executed, and prepared status associated with a given hotfix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Buffer` | keccak256 hash of hotfix's associated abi encoded transactions |

#### Returns

`Promise`\<[`HotfixRecord`](../interfaces/wrappers_Governance.HotfixRecord.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:876](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L876)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(): `Promise`\<\{ `concurrentProposals`: `BigNumber` ; `dequeueFrequency`: `string` ; `minDeposit`: `BigNumber` ; `participationParameters`: [`ParticipationParameters`](../interfaces/wrappers_Governance.ParticipationParameters.md) ; `queueExpiry`: `string` ; `stageDurations`: \{ `Execution`: `string` ; `Referendum`: `string`  }  }\>

#### Returns

`Promise`\<\{ `concurrentProposals`: `BigNumber` ; `dequeueFrequency`: `string` ; `minDeposit`: `BigNumber` ; `participationParameters`: [`ParticipationParameters`](../interfaces/wrappers_Governance.ParticipationParameters.md) ; `queueExpiry`: `string` ; `stageDurations`: \{ `Execution`: `string` ; `Referendum`: `string`  }  }\>

GovernanceConfig object

**`Dev`**

Returns human readable configuration of the governance contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:300](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L300)

___

### getHumanReadableProposalMetadata

▸ **getHumanReadableProposalMetadata**(`proposalID`): `Promise`\<\{ `deposit`: `BigNumber` ; `descriptionURL`: `string` ; `proposer`: `string` ; `timestamp`: `string` ; `transactionCount`: `number`  }\>

Returns the human readable metadata associated with a given proposal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

#### Returns

`Promise`\<\{ `deposit`: `BigNumber` ; `descriptionURL`: `string` ; `proposer`: `string` ; `timestamp`: `string` ; `transactionCount`: `number`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:338](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L338)

___

### getParticipationParameters

▸ **getParticipationParameters**(): `Promise`\<[`ParticipationParameters`](../interfaces/wrappers_Governance.ParticipationParameters.md)\>

Returns the participation parameters.

#### Returns

`Promise`\<[`ParticipationParameters`](../interfaces/wrappers_Governance.ParticipationParameters.md)\>

The participation parameters.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:228](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L228)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"ApproverSet"`` \| ``"ConcurrentProposalsSet"`` \| ``"ConstitutionSet"`` \| ``"DequeueFrequencySet"`` \| ``"ExecutionStageDurationSet"`` \| ``"HotfixApproved"`` \| ``"HotfixExecuted"`` \| ``"HotfixPrepared"`` \| ``"HotfixWhitelisted"`` \| ``"MinDepositSet"`` \| ``"ParticipationBaselineQuorumFactorSet"`` \| ``"ParticipationBaselineUpdateFactorSet"`` \| ``"ParticipationBaselineUpdated"`` \| ``"ParticipationFloorSet"`` \| ``"ProposalApproved"`` \| ``"ProposalDequeued"`` \| ``"ProposalExecuted"`` \| ``"ProposalExpired"`` \| ``"ProposalQueued"`` \| ``"ProposalUpvoteRevoked"`` \| ``"ProposalUpvoted"`` \| ``"ProposalVoteRevoked"`` \| ``"ProposalVoteRevokedV2"`` \| ``"ProposalVoted"`` \| ``"ProposalVotedV2"`` \| ``"QueueExpirySet"`` \| ``"ReferendumStageDurationSet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getProposal

▸ **getProposal**(`proposalID`): `Promise`\<[`Proposal`](../modules/wrappers_Governance.md#proposal)\>

Returns the proposal associated with a given id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

#### Returns

`Promise`\<[`Proposal`](../modules/wrappers_Governance.md#proposal)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:453](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L453)

___

### getProposalRecord

▸ **getProposalRecord**(`proposalID`): `Promise`\<[`ProposalRecord`](../interfaces/wrappers_Governance.ProposalRecord.md)\>

Returns the stage, metadata, upvotes, votes, and transactions associated with a given proposal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |

#### Returns

`Promise`\<[`ProposalRecord`](../interfaces/wrappers_Governance.ProposalRecord.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:483](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L483)

___

### getProposalStage

▸ **getProposalStage**(`proposalID`): `Promise`\<[`ProposalStage`](../enums/wrappers_Governance.ProposalStage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposalID` | `Value` |

#### Returns

`Promise`\<[`ProposalStage`](../enums/wrappers_Governance.ProposalStage.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:402](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L402)

___

### getSupport

▸ **getSupport**(`proposalID`): `Promise`\<\{ `required`: `BigNumber` ; `support`: `BigNumber` ; `total`: `BigNumber`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposalID` | `Value` |

#### Returns

`Promise`\<\{ `required`: `BigNumber` ; `support`: `BigNumber` ; `total`: `BigNumber`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:247](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L247)

___

### getSupportWithConstitutionThreshold

▸ **getSupportWithConstitutionThreshold**(`proposalID`, `constitution`): `Promise`\<\{ `required`: `BigNumber` ; `support`: `BigNumber` ; `total`: `BigNumber`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposalID` | `Value` |
| `constitution` | `BigNumber` |

#### Returns

`Promise`\<\{ `required`: `BigNumber` ; `support`: `BigNumber` ; `total`: `BigNumber`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:240](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L240)

___

### getTransactionConstitution

▸ **getTransactionConstitution**(`tx`): `Promise`\<`BigNumber`\>

Returns the required ratio of yes:no votes needed to exceed in order to pass the proposal transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | [`ProposalTransaction`](../modules/wrappers_Governance.md#proposaltransaction) | Transaction to determine the constitution for running. |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:200](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L200)

___

### getVoteRecord

▸ **getVoteRecord**(`voter`, `proposalID`): `Promise`\<``null`` \| [`VoteRecord`](../interfaces/wrappers_Governance.VoteRecord.md)\>

Returns the corresponding vote record

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `voter` | `string` | Address of voter |
| `proposalID` | `Value` | Governance proposal UUID |

#### Returns

`Promise`\<``null`` \| [`VoteRecord`](../interfaces/wrappers_Governance.VoteRecord.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:569](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L569)

___

### getVoteRecords

▸ **getVoteRecords**(`voter`): `Promise`\<[`VoteRecord`](../interfaces/wrappers_Governance.VoteRecord.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `voter` | `string` |

#### Returns

`Promise`\<[`VoteRecord`](../interfaces/wrappers_Governance.VoteRecord.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:655](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L655)

___

### getVoteWeight

▸ **getVoteWeight**(`voter`): `Promise`\<`BigNumber`\>

Returns the number of votes that will be applied to a proposal for a given voter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `voter` | `string` | Address of voter |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:694](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L694)

___

### getVoter

▸ **getVoter**(`account`): `Promise`\<[`Voter`](../interfaces/wrappers_Governance.Voter.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<[`Voter`](../interfaces/wrappers_Governance.Voter.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:669](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L669)

___

### humanReadableProposalSchedule

▸ **humanReadableProposalSchedule**(`proposalID`): `Promise`\<`Partial`\<`StageDurations`\<`string`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposalID` | `Value` |

#### Returns

`Promise`\<`Partial`\<`StageDurations`\<`string`\>\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:439](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L439)

___

### isUpvoting

▸ **isUpvoting**(`upvoter`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `upvoter` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:555](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L555)

___

### isVotingReferendum

▸ **isVotingReferendum**(`voter`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `voter` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:661](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L661)

___

### proposalSchedule

▸ **proposalSchedule**(`proposalID`): `Promise`\<`Partial`\<`StageDurations`\<`BigNumber`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proposalID` | `Value` |

#### Returns

`Promise`\<`Partial`\<`StageDurations`\<`BigNumber`\>\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:414](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L414)

___

### revokeUpvote

▸ **revokeUpvote**(`upvoter`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Revokes provided upvoter's upvote.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `upvoter` | `string` | Address of upvoter |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:797](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L797)

___

### sortedQueue

▸ **sortedQueue**(`queue`): [`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `queue` | [`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)[] |

#### Returns

[`UpvoteRecord`](../interfaces/wrappers_Governance.UpvoteRecord.md)[]

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:735](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L735)

___

### stageDurations

▸ **stageDurations**(): `Promise`\<`DequeuedStageDurations`\>

Query durations of different stages in proposal lifecycle.

#### Returns

`Promise`\<`DequeuedStageDurations`\>

Durations for approval, referendum and execution stages in seconds.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:188](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L188)

___

### upvote

▸ **upvote**(`proposalID`, `upvoter`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Applies provided upvoter's upvote to given proposal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |
| `upvoter` | `string` | Address of upvoter |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:781](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L781)

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

▸ **vote**(`proposalID`, `vote`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Applies `sender`'s vote choice to a given proposal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID |
| `vote` | ``"None"`` \| ``"Abstain"`` \| ``"No"`` \| ``"Yes"`` | Choice to apply (yes, no, abstain) |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:823](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L823)

___

### votePartially

▸ **votePartially**(`proposalID`, `yesVotes`, `noVotes`, `abstainVotes`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Applies `sender`'s vote choice to a given proposal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `Value` | Governance proposal UUID. |
| `yesVotes` | `Value` | The yes votes. |
| `noVotes` | `Value` | The no votes. |
| `abstainVotes` | `Value` | The abstain votes. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Governance.ts:839](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L839)
