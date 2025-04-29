[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Governance](../README.md) / GovernanceWrapper

# Class: GovernanceWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L158)

Contract managing voting for governance proposals.

## Extends

- [`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md)\<`Governance`\>

## Constructors

### Constructor

> **new GovernanceWrapper**(`connection`, `contract`, `contracts`): `GovernanceWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

#### Parameters

##### connection

`Connection`

##### contract

`Governance`

##### contracts

`ContractWrappersForVotingAndRules`

#### Returns

`GovernanceWrapper`

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`constructor`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#constructor)

## Properties

### approveHotfix()

> **approveHotfix**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:959](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L959)

Marks the given hotfix approved by `sender`.

#### Parameters

##### args

...\[`Buffer`\]

#### Returns

`CeloTransactionObject`\<`void`\>

#### Notice

Only the `approver` address will succeed in sending this transaction

***

### concurrentProposals()

> **concurrentProposals**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:163](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L163)

Querying number of possible concurrent proposals.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Current number of possible concurrent proposals.

***

### dequeueFrequency()

> **dequeueFrequency**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:177](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L177)

Query proposal dequeue frequency.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Current proposal dequeue frequency in seconds.

***

### dequeueProposalsIfReady()

> **dequeueProposalsIfReady**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:703](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L703)

Dequeues any queued proposals if `dequeueFrequency` seconds have elapsed since the last dequeue

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

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

#### ApproverSet

> **ApproverSet**: `ContractEvent`\<`string`\>

#### ConcurrentProposalsSet

> **ConcurrentProposalsSet**: `ContractEvent`\<`string`\>

#### ConstitutionSet

> **ConstitutionSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `destination`: `string`; `functionId`: `string`; `threshold`: `string`; \}\>

#### DequeueFrequencySet

> **DequeueFrequencySet**: `ContractEvent`\<`string`\>

#### ExecutionStageDurationSet

> **ExecutionStageDurationSet**: `ContractEvent`\<`string`\>

#### HotfixApproved

> **HotfixApproved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `approver`: `string`; `hash`: `string`; \}\>

#### HotfixExecuted

> **HotfixExecuted**: `ContractEvent`\<`string`\>

#### HotfixExecutionTimeWindowSet

> **HotfixExecutionTimeWindowSet**: `ContractEvent`\<`string`\>

#### HotfixPrepared

> **HotfixPrepared**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `executionLimit`: `string`; `hash`: `string`; \}\>

#### HotfixRecordReset

> **HotfixRecordReset**: `ContractEvent`\<`string`\>

#### HotfixWhitelisted

> **HotfixWhitelisted**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `hash`: `string`; `whitelister`: `string`; \}\>

#### MinDepositSet

> **MinDepositSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### ParticipationBaselineQuorumFactorSet

> **ParticipationBaselineQuorumFactorSet**: `ContractEvent`\<`string`\>

#### ParticipationBaselineUpdated

> **ParticipationBaselineUpdated**: `ContractEvent`\<`string`\>

#### ParticipationBaselineUpdateFactorSet

> **ParticipationBaselineUpdateFactorSet**: `ContractEvent`\<`string`\>

#### ParticipationFloorSet

> **ParticipationFloorSet**: `ContractEvent`\<`string`\>

#### ProposalApproved

> **ProposalApproved**: `ContractEvent`\<`string`\>

#### ProposalDequeued

> **ProposalDequeued**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `proposalId`: `string`; `timestamp`: `string`; \}\>

#### ProposalExecuted

> **ProposalExecuted**: `ContractEvent`\<`string`\>

#### ProposalExpired

> **ProposalExpired**: `ContractEvent`\<`string`\>

#### ProposalQueued

> **ProposalQueued**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `deposit`: `string`; `proposalId`: `string`; `proposer`: `string`; `timestamp`: `string`; `transactionCount`: `string`; \}\>

#### ProposalUpvoted

> **ProposalUpvoted**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `proposalId`: `string`; `upvotes`: `string`; \}\>

#### ProposalUpvoteRevoked

> **ProposalUpvoteRevoked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `proposalId`: `string`; `revokedUpvotes`: `string`; \}\>

#### ProposalVoted

> **ProposalVoted**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `account`: `string`; `proposalId`: `string`; `value`: `string`; `weight`: `string`; \}\>

#### ProposalVotedV2

> **ProposalVotedV2**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `abstainVotes`: `string`; `account`: `string`; `noVotes`: `string`; `proposalId`: `string`; `yesVotes`: `string`; \}\>

#### ProposalVoteRevoked

> **ProposalVoteRevoked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `account`: `string`; `proposalId`: `string`; `value`: `string`; `weight`: `string`; \}\>

#### ProposalVoteRevokedV2

> **ProposalVoteRevokedV2**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `abstainVotes`: `string`; `account`: `string`; `noVotes`: `string`; `proposalId`: `string`; `yesVotes`: `string`; \}\>

#### QueueExpirySet

> **QueueExpirySet**: `ContractEvent`\<`string`\>

#### ReferendumStageDurationSet

> **ReferendumStageDurationSet**: `ContractEvent`\<`string`\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### SecurityCouncilSet

> **SecurityCouncilSet**: `ContractEvent`\<`string`\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`events`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Governance`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`eventTypes`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#eventtypes)

***

### executeHotfix()

> **executeHotfix**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:981](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L981)

Executes a given sequence of transactions if the corresponding hash is prepared and approved.

#### Parameters

##### args

...\[[`Proposal`](../type-aliases/Proposal.md), `Buffer`\]

#### Returns

`CeloTransactionObject`\<`void`\>

#### Notice

keccak256 hash of abi encoded transactions computed on-chain

***

### getApprover()

> **getApprover**: (...`args`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:399](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L399)

Returns the approver address for proposals and hotfixes.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`` `0x${string}` ``\>

***

### getHotfixHash()

> **getHotfixHash**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:890](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L890)

#### Parameters

##### args

...\[[`Proposal`](../type-aliases/Proposal.md), `Buffer`\]

#### Returns

`Promise`\<`string`\>

***

### getProposalMetadata()

> **getProposalMetadata**: (`proposalID`) => `Promise`\<[`ProposalMetadata`](../interfaces/ProposalMetadata.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:327](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L327)

Returns the metadata associated with a given proposal.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<[`ProposalMetadata`](../interfaces/ProposalMetadata.md)\>

***

### getProposalTransaction()

> **getProposalTransaction**: (`proposalID`, `txIndex`) => `Promise`\<[`ProposalTransaction`](../type-aliases/ProposalTransaction.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:356](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L356)

Returns the transaction at the given index associated with a given proposal.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

##### txIndex

`number`

Transaction index

#### Returns

`Promise`\<[`ProposalTransaction`](../type-aliases/ProposalTransaction.md)\>

***

### getQueue()

> **getQueue**: (...`args`) => `Promise`\<[`UpvoteRecord`](../interfaces/UpvoteRecord.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:649](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L649)

Returns the proposal queue as list of upvote records.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<[`UpvoteRecord`](../interfaces/UpvoteRecord.md)[]\>

***

### getRefundedDeposits()

> **getRefundedDeposits**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:616](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L616)

Returns the value of proposal deposits that have been refunded.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getSecurityCouncil()

> **getSecurityCouncil**: (...`args`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:410](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L410)

Returns the security council address for hotfixes.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`` `0x${string}` ``\>

***

### getUpvoteRecord()

> **getUpvoteRecord**: (`upvoter`) => `Promise`\<[`UpvoteRecord`](../interfaces/UpvoteRecord.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:564](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L564)

Returns the current upvoted governance proposal ID and applied vote weight (zeroes if none).

#### Parameters

##### upvoter

`string`

Address of upvoter

#### Returns

`Promise`\<[`UpvoteRecord`](../interfaces/UpvoteRecord.md)\>

***

### getUpvotes()

> **getUpvotes**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:626](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L626)

#### Parameters

##### args

...\[`Value`\]

#### Returns

`Promise`\<`BigNumber`\>

***

### getVotes()

> **getVotes**: (...`args`) => `Promise`\<[`Votes`](../interfaces/Votes.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:636](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L636)

Returns the yes, no, and abstain votes applied to a given proposal.

#### Parameters

##### args

...\[`Value`\]

#### Returns

`Promise`\<[`Votes`](../interfaces/Votes.md)\>

***

### ~~hotfixWhitelistValidatorTally()~~

> **hotfixWhitelistValidatorTally**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:938](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L938)

Returns the number of validators that whitelisted the hotfix

#### Parameters

##### args

...\[`Buffer`\]

#### Returns

`Promise`\<`string`\>

#### Deprecated

see https://specs.celo.org/smart_contract_updates_from_l1.html

***

### isApproved()

> **isApproved**: (`proposalID`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:373](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L373)

Returns whether a given proposal is approved.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<`boolean`\>

***

### isDequeuedProposalExpired()

> **isDequeuedProposalExpired**: (`proposalID`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:382](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L382)

Returns whether a dequeued proposal is expired.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<`boolean`\>

***

### ~~isHotfixPassing()~~

> **isHotfixPassing**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:922](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L922)

Returns whether a given hotfix can be passed.

#### Parameters

##### args

...\[`Buffer`\]

#### Returns

`Promise`\<`boolean`\>

#### Deprecated

see https://specs.celo.org/smart_contract_updates_from_l1.html

***

### ~~isHotfixWhitelistedBy()~~

> **isHotfixWhitelistedBy**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:912](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L912)

Returns whether a given hotfix has been whitelisted by a given address.

#### Parameters

##### args

...\[`Buffer`, `string`\]

#### Returns

`Promise`\<`boolean`\>

#### Deprecated

see https://specs.celo.org/smart_contract_updates_from_l1.html

***

### isProposalPassing()

> **isProposalPassing**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:537](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L537)

Returns whether a given proposal is passing relative to the constitution's threshold.

#### Parameters

##### args

...\[`Value`\]

#### Returns

`Promise`\<`boolean`\>

***

### isQueued()

> **isQueued**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:610](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L610)

Returns whether a given proposal is queued.

#### Parameters

##### args

...\[`Value`\]

#### Returns

`Promise`\<`boolean`\>

***

### isQueuedProposalExpired()

> **isQueuedProposalExpired**: (...`args`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:391](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L391)

Returns whether a dequeued proposal is expired.

#### Parameters

##### args

...\[`Value`\]

#### Returns

`Promise`\<`boolean`\>

***

### isVoting()

> **isVoting**: (`account`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:277](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L277)

Returns whether or not a particular account is voting on proposals.

#### Parameters

##### account

`string`

The address of the account.

#### Returns

`Promise`\<`boolean`\>

Whether or not the account is voting on proposals.

***

### lastDequeue()

> **lastDequeue**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:172](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L172)

Query time of last proposal dequeue

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Time of last dequeue

***

### methodIds

> **methodIds**: `Record`\<`"propose"` \| `"executeHotfix"` \| `"concurrentProposals"` \| `"dequeueFrequency"` \| `"minDeposit"` \| `"queueExpiry"` \| `"stageDurations"` \| `"upvote"` \| `"refundedDeposits"` \| `"approver"` \| `"checkProofOfPossession"` \| `"dequeued"` \| `"emptyIndices"` \| `"fractionMulExp"` \| `"getBlockNumberFromHeader"` \| `"getEpochNumber"` \| `"getEpochNumberOfBlock"` \| `"getEpochSize"` \| `"getParentSealBitmap"` \| `"getVerifiedSealBitmapFromHeader"` \| `"hashHeader"` \| `"hotfixExecutionTimeWindow"` \| `"hotfixes"` \| `"initialized"` \| `"isOwner"` \| `"lastDequeue"` \| `"minQuorumSize"` \| `"minQuorumSizeInCurrentSet"` \| `"numberValidatorsInCurrentSet"` \| `"numberValidatorsInSet"` \| `"owner"` \| `"proposalCount"` \| `"registry"` \| `"renounceOwnership"` \| `"securityCouncil"` \| `"setRegistry"` \| `"transferOwnership"` \| `"validatorAddressFromCurrentSet"` \| `"validatorSignerAddressFromCurrentSet"` \| `"validatorSignerAddressFromSet"` \| `"initialize"` \| `"setConstitution"` \| `"setSecurityCouncil"` \| `"setHotfixExecutionTimeWindow"` \| `"revokeUpvote"` \| `"approve"` \| `"vote"` \| `"votePartially"` \| `"revokeVotes"` \| `"execute"` \| `"approveHotfix"` \| `"whitelistHotfix"` \| `"prepareHotfix"` \| `"withdraw"` \| `"isProposalPassing"` \| `"isDequeuedProposal"` \| `"isDequeuedProposalExpired"` \| `"getConstitution"` \| `"isVoting"` \| `"getReferendumStageDuration"` \| `"getExecutionStageDuration"` \| `"getParticipationParameters"` \| `"proposalExists"` \| `"getProposal"` \| `"getProposalTransaction"` \| `"isApproved"` \| `"getVoteTotals"` \| `"getVoteRecord"` \| `"getQueueLength"` \| `"getUpvotes"` \| `"getQueue"` \| `"getDequeue"` \| `"getUpvoteRecord"` \| `"getMostRecentReferendumProposal"` \| `"getProposalStage"` \| `"getVersionNumber"` \| `"getHotfixHash"` \| `"setApprover"` \| `"setConcurrentProposals"` \| `"setMinDeposit"` \| `"setQueueExpiry"` \| `"setDequeueFrequency"` \| `"setReferendumStageDuration"` \| `"setExecutionStageDuration"` \| `"setParticipationBaseline"` \| `"setParticipationFloor"` \| `"setBaselineUpdateFactor"` \| `"setBaselineQuorumFactor"` \| `"dequeueProposalsIfReady"` \| `"removeVotesWhenRevokingDelegatedVotes"` \| `"resetHotFixRecord"` \| `"hotfixWhitelistValidatorTally"` \| `"isHotfixPassing"` \| `"getL1HotfixRecord"` \| `"getHotfixRecord"` \| `"getL2HotfixRecord"` \| `"isQueued"` \| `"isHotfixWhitelistedBy"` \| `"isQueuedProposalExpired"` \| `"getAmountOfGoldUsedForVoting"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`methodIds`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#methodids)

***

### minDeposit()

> **minDeposit**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L182)

Query minimum deposit required to make a proposal.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

Current minimum deposit.

***

### minQuorumSize()

> **minQuorumSize**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:927](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L927)

Returns the number of validators required to reach a Byzantine quorum

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

***

### prepareHotfix()

> **prepareHotfix**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:969](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L969)

Marks the given hotfix prepared for current epoch if quorum of validators have whitelisted it.

#### Parameters

##### args

...\[`Buffer`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### proposalExists()

> **proposalExists**: (`proposalID`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:555](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L555)

Returns whether a governance proposal exists with the given ID.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<`boolean`\>

***

### propose()

> **propose**: (...`args`) => `CeloTransactionObject`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:549](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L549)

Submits a new governance proposal.

#### Parameters

##### args

...\[[`Proposal`](../type-aliases/Proposal.md), `string`\]

#### Returns

`CeloTransactionObject`\<`string`\>

***

### queueExpiry()

> **queueExpiry**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:187](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L187)

Query queue expiry parameter.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

The number of seconds a proposal can stay in the queue before expiring.

***

### revokeVotes()

> **revokeVotes**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:876](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L876)

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

***

### ~~whitelistHotfix()~~

> **whitelistHotfix**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:948](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L948)

Marks the given hotfix whitelisted by `sender`.

#### Parameters

##### args

...\[`Buffer`\]

#### Returns

`CeloTransactionObject`\<`void`\>

#### Deprecated

see https://specs.celo.org/smart_contract_updates_from_l1.html

***

### withdraw()

> **withdraw**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:542](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L542)

Withdraws refunded proposal deposits.

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

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

### approve()

> **approve**(`proposalID`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:828](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L828)

Approves given proposal, allowing it to later move to `referendum`.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Notice

Only the `approver` address will succeed in sending this transaction

***

### execute()

> **execute**(`proposalID`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:882](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L882)

Executes a given proposal's associated transactions.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### getApprovalStatus()

> **getApprovalStatus**(`proposalID`): `Promise`\<`ApprovalStatus`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:477](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L477)

#### Parameters

##### proposalID

`Value`

#### Returns

`Promise`\<`ApprovalStatus`\>

***

### getApproverMultisig()

> **getApproverMultisig**(): `Promise`\<[`MultiSigWrapper`](../../MultiSig/classes/MultiSigWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:404](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L404)

Returns the approver multisig contract for proposals and hotfixes.

#### Returns

`Promise`\<[`MultiSigWrapper`](../../MultiSig/classes/MultiSigWrapper.md)\>

***

### getConfig()

> **getConfig**(): `Promise`\<[`GovernanceConfig`](../interfaces/GovernanceConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:282](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L282)

Returns current configuration parameters.

#### Returns

`Promise`\<[`GovernanceConfig`](../interfaces/GovernanceConfig.md)\>

***

### getConstitution()

> **getConstitution**(`proposal`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L217)

Returns the required ratio of yes:no votes needed to exceed in order to pass the proposal.

#### Parameters

##### proposal

[`Proposal`](../type-aliases/Proposal.md)

Proposal to determine the constitution for running.

#### Returns

`Promise`\<`BigNumber`\>

***

### getDequeue()

> **getDequeue**(`filterZeroes`): `Promise`\<`BigNumber`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:663](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L663)

Returns the (existing) proposal dequeue as list of proposal IDs.

#### Parameters

##### filterZeroes

`boolean` = `false`

#### Returns

`Promise`\<`BigNumber`[]\>

***

### getHotfixRecord()

> **getHotfixRecord**(`hash`): `Promise`\<[`HotfixRecord`](../interfaces/HotfixRecord.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:896](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L896)

Returns approved, executed, and prepared status associated with a given hotfix.

#### Parameters

##### hash

`Buffer`

keccak256 hash of hotfix's associated abi encoded transactions

#### Returns

`Promise`\<[`HotfixRecord`](../interfaces/HotfixRecord.md)\>

***

### getHumanReadableConfig()

> **getHumanReadableConfig**(): `Promise`\<\{ `concurrentProposals`: `BigNumber`; `dequeueFrequency`: `string`; `minDeposit`: `BigNumber`; `participationParameters`: [`ParticipationParameters`](../interfaces/ParticipationParameters.md); `queueExpiry`: `string`; `stageDurations`: \{ `Execution`: `string`; `Referendum`: `string`; \}; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:305](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L305)

#### Returns

`Promise`\<\{ `concurrentProposals`: `BigNumber`; `dequeueFrequency`: `string`; `minDeposit`: `BigNumber`; `participationParameters`: [`ParticipationParameters`](../interfaces/ParticipationParameters.md); `queueExpiry`: `string`; `stageDurations`: \{ `Execution`: `string`; `Referendum`: `string`; \}; \}\>

GovernanceConfig object

#### Dev

Returns human readable configuration of the governance contract

***

### getHumanReadableProposalMetadata()

> **getHumanReadableProposalMetadata**(`proposalID`): `Promise`\<\{ `deposit`: `BigNumber`; `descriptionURL`: `string`; `proposer`: `string`; `timestamp`: `string`; `transactionCount`: `number`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:343](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L343)

Returns the human readable metadata associated with a given proposal.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<\{ `deposit`: `BigNumber`; `descriptionURL`: `string`; `proposer`: `string`; `timestamp`: `string`; `transactionCount`: `number`; \}\>

***

### getParticipationParameters()

> **getParticipationParameters**(): `Promise`\<[`ParticipationParameters`](../interfaces/ParticipationParameters.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:232](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L232)

Returns the participation parameters.

#### Returns

`Promise`\<[`ParticipationParameters`](../interfaces/ParticipationParameters.md)\>

The participation parameters.

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"ApproverSet"` | `"ConcurrentProposalsSet"` | `"ConstitutionSet"` | `"DequeueFrequencySet"` | `"ExecutionStageDurationSet"` | `"HotfixApproved"` | `"HotfixExecuted"` | `"HotfixExecutionTimeWindowSet"` | `"HotfixPrepared"` | `"HotfixRecordReset"` | `"HotfixWhitelisted"` | `"MinDepositSet"` | `"ParticipationBaselineQuorumFactorSet"` | `"ParticipationBaselineUpdateFactorSet"` | `"ParticipationBaselineUpdated"` | `"ParticipationFloorSet"` | `"ProposalApproved"` | `"ProposalDequeued"` | `"ProposalExecuted"` | `"ProposalExpired"` | `"ProposalQueued"` | `"ProposalUpvoteRevoked"` | `"ProposalUpvoted"` | `"ProposalVoteRevoked"` | `"ProposalVoteRevokedV2"` | `"ProposalVoted"` | `"ProposalVotedV2"` | `"QueueExpirySet"` | `"ReferendumStageDurationSet"` | `"SecurityCouncilSet"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`getPastEvents`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#getpastevents)

***

### getProposal()

> **getProposal**(`proposalID`): `Promise`\<[`Proposal`](../type-aliases/Proposal.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:471](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L471)

Returns the proposal associated with a given id.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<[`Proposal`](../type-aliases/Proposal.md)\>

***

### getProposalRecord()

> **getProposalRecord**(`proposalID`): `Promise`\<[`ProposalRecord`](../interfaces/ProposalRecord.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:501](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L501)

Returns the stage, metadata, upvotes, votes, and transactions associated with a given proposal.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<[`ProposalRecord`](../interfaces/ProposalRecord.md)\>

***

### getProposalStage()

> **getProposalStage**(`proposalID`): `Promise`\<[`ProposalStage`](../enumerations/ProposalStage.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:420](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L420)

#### Parameters

##### proposalID

`Value`

#### Returns

`Promise`\<[`ProposalStage`](../enumerations/ProposalStage.md)\>

***

### getSecurityCouncilMultisig()

> **getSecurityCouncilMultisig**(): `Promise`\<[`MultiSigWrapper`](../../MultiSig/classes/MultiSigWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:417](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L417)

Returns the security council multisig contract for hotfixes.

#### Returns

`Promise`\<[`MultiSigWrapper`](../../MultiSig/classes/MultiSigWrapper.md)\>

***

### getSupport()

> **getSupport**(`proposalID`): `Promise`\<\{ `required`: `BigNumber`; `support`: `BigNumber`; `total`: `BigNumber`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L251)

#### Parameters

##### proposalID

`Value`

#### Returns

`Promise`\<\{ `required`: `BigNumber`; `support`: `BigNumber`; `total`: `BigNumber`; \}\>

***

### getSupportWithConstitutionThreshold()

> **getSupportWithConstitutionThreshold**(`proposalID`, `constitution`): `Promise`\<\{ `required`: `BigNumber`; `support`: `BigNumber`; `total`: `BigNumber`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:244](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L244)

#### Parameters

##### proposalID

`Value`

##### constitution

`BigNumber`

#### Returns

`Promise`\<\{ `required`: `BigNumber`; `support`: `BigNumber`; `total`: `BigNumber`; \}\>

***

### getTransactionConstitution()

> **getTransactionConstitution**(`tx`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:204](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L204)

Returns the required ratio of yes:no votes needed to exceed in order to pass the proposal transaction.

#### Parameters

##### tx

[`ProposalTransaction`](../type-aliases/ProposalTransaction.md)

Transaction to determine the constitution for running.

#### Returns

`Promise`\<`BigNumber`\>

***

### getVoter()

> **getVoter**(`account`): `Promise`\<[`Voter`](../interfaces/Voter.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:687](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L687)

#### Parameters

##### account

`string`

#### Returns

`Promise`\<[`Voter`](../interfaces/Voter.md)\>

***

### getVoteRecord()

> **getVoteRecord**(`voter`, `proposalID`): `Promise`\<`null` \| [`VoteRecord`](../interfaces/VoteRecord.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:587](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L587)

Returns the corresponding vote record

#### Parameters

##### voter

`string`

Address of voter

##### proposalID

`Value`

Governance proposal UUID

#### Returns

`Promise`\<`null` \| [`VoteRecord`](../interfaces/VoteRecord.md)\>

***

### getVoteRecords()

> **getVoteRecords**(`voter`): `Promise`\<[`VoteRecord`](../interfaces/VoteRecord.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:673](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L673)

#### Parameters

##### voter

`string`

#### Returns

`Promise`\<[`VoteRecord`](../interfaces/VoteRecord.md)[]\>

***

### getVoteWeight()

> **getVoteWeight**(`voter`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:712](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L712)

Returns the number of votes that will be applied to a proposal for a given voter.

#### Parameters

##### voter

`string`

Address of voter

#### Returns

`Promise`\<`BigNumber`\>

***

### humanReadableProposalSchedule()

> **humanReadableProposalSchedule**(`proposalID`): `Promise`\<`Partial`\<`StageDurations`\<`string`\>\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:457](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L457)

#### Parameters

##### proposalID

`Value`

#### Returns

`Promise`\<`Partial`\<`StageDurations`\<`string`\>\>\>

***

### isUpvoting()

> **isUpvoting**(`upvoter`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:573](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L573)

#### Parameters

##### upvoter

`string`

#### Returns

`Promise`\<`boolean`\>

***

### isVotingReferendum()

> **isVotingReferendum**(`voter`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:679](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L679)

#### Parameters

##### voter

`string`

#### Returns

`Promise`\<`boolean`\>

***

### proposalSchedule()

> **proposalSchedule**(`proposalID`): `Promise`\<`Partial`\<`StageDurations`\<`BigNumber`\>\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:432](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L432)

#### Parameters

##### proposalID

`Value`

#### Returns

`Promise`\<`Partial`\<`StageDurations`\<`BigNumber`\>\>\>

***

### revokeUpvote()

> **revokeUpvote**(`upvoter`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:815](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L815)

Revokes provided upvoter's upvote.

#### Parameters

##### upvoter

`string`

Address of upvoter

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### sortedQueue()

> **sortedQueue**(`queue`): [`UpvoteRecord`](../interfaces/UpvoteRecord.md)[]

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:753](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L753)

#### Parameters

##### queue

[`UpvoteRecord`](../interfaces/UpvoteRecord.md)[]

#### Returns

[`UpvoteRecord`](../interfaces/UpvoteRecord.md)[]

***

### stageDurations()

> **stageDurations**(): `Promise`\<`DequeuedStageDurations`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:192](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L192)

Query durations of different stages in proposal lifecycle.

#### Returns

`Promise`\<`DequeuedStageDurations`\>

Durations for approval, referendum and execution stages in seconds.

***

### upvote()

> **upvote**(`proposalID`, `upvoter`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:799](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L799)

Applies provided upvoter's upvote to given proposal.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

##### upvoter

`string`

Address of upvoter

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

> **vote**(`proposalID`, `vote`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:841](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L841)

Applies `sender`'s vote choice to a given proposal.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID

##### vote

Choice to apply (yes, no, abstain)

`"None"` | `"Abstain"` | `"No"` | `"Yes"`

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### votePartially()

> **votePartially**(`proposalID`, `yesVotes`, `noVotes`, `abstainVotes`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Governance.ts:857](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Governance.ts#L857)

Applies `sender`'s vote choice to a given proposal.

#### Parameters

##### proposalID

`Value`

Governance proposal UUID.

##### yesVotes

`Value`

The yes votes.

##### noVotes

`Value`

The no votes.

##### abstainVotes

`Value`

The abstain votes.

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>
