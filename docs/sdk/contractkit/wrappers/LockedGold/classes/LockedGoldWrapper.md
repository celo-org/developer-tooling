[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/LockedGold](../README.md) / LockedGoldWrapper

# Class: LockedGoldWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L74)

Contract for handling deposits needed for voting.

## Extends

- [`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md)\<`LockedGold`\>

## Constructors

### Constructor

> **new LockedGoldWrapper**(`connection`, `contract`, `contracts`): `LockedGoldWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

#### Parameters

##### connection

`Connection`

##### contract

`LockedGold`

##### contracts

`ContractWrappersForVotingAndRules`

#### Returns

`LockedGoldWrapper`

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`constructor`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#constructor)

## Properties

### \_getTotalPendingWithdrawalsCount()

> **\_getTotalPendingWithdrawalsCount**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:404](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L404)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

***

### \_relock()

> **\_relock**: (`index`, `value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L190)

Relocks gold that has been unlocked but not withdrawn.

#### Parameters

##### index

`number`

The index of the pending withdrawal to relock from.

##### value

`Value`

The value to relock from the specified pending withdrawal.

#### Returns

`CeloTransactionObject`\<`void`\>

***

### delegate()

> **delegate**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L93)

Delegates locked gold.

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### events

> **events**: `object`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### AccountSlashed

> **AccountSlashed**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `penalty`: `string`; `reporter`: `string`; `reward`: `string`; `slashed`: `string`; \}\>

#### allEvents()

> **allEvents**: (`options?`, `cb?`) => `EventEmitter`

##### Parameters

###### options?

`EventOptions`

###### cb?

`Callback`\<`EventLog`\>

##### Returns

`EventEmitter`

#### CeloDelegated

> **CeloDelegated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `amount`: `string`; `delegatee`: `string`; `delegator`: `string`; `percent`: `string`; \}\>

#### DelegatedCeloRevoked

> **DelegatedCeloRevoked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `amount`: `string`; `delegatee`: `string`; `delegator`: `string`; `percent`: `string`; \}\>

#### GoldLocked

> **GoldLocked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `value`: `string`; \}\>

#### GoldRelocked

> **GoldRelocked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `value`: `string`; \}\>

#### GoldUnlocked

> **GoldUnlocked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `available`: `string`; `value`: `string`; \}\>

#### GoldWithdrawn

> **GoldWithdrawn**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `value`: `string`; \}\>

#### MaxDelegateesCountSet

> **MaxDelegateesCountSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### SlasherWhitelistAdded

> **SlasherWhitelistAdded**: `ContractEvent`\<`string`\>

#### SlasherWhitelistRemoved

> **SlasherWhitelistRemoved**: `ContractEvent`\<`string`\>

#### UnlockingPeriodSet

> **UnlockingPeriodSet**: `ContractEvent`\<`string`\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`events`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`LockedGold`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`eventTypes`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#eventtypes)

***

### getAccountNonvotingLockedGold()

> **getAccountNonvotingLockedGold**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:223](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L223)

Returns the total amount of non-voting locked gold for an account.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

The total amount of non-voting locked gold for an account.

***

### getAccountTotalLockedGold()

> **getAccountTotalLockedGold**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:201](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L201)

Returns the total amount of locked gold for an account.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

The total amount of locked gold for an account.

***

### getTotalLockedGold()

> **getTotalLockedGold**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L212)

Returns the total amount of locked gold in the system. Note that this does not include
  gold that has been unlocked but not yet withdrawn.

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`BigNumber`\>

The total amount of locked gold in the system.

***

### lock()

> **lock**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L88)

Locks gold to be used for voting.
The gold to be locked, must be specified as the `tx.value`

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### methodIds

> **methodIds**: `Record`\<`"unlockingPeriod"` \| `"initialized"` \| `"isOwner"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"initialize"` \| `"withdraw"` \| `"getVersionNumber"` \| `"slashingWhitelist"` \| `"totalDelegatedCelo"` \| `"totalNonvoting"` \| `"isSlasher"` \| `"setUnlockingPeriod"` \| `"setMaxDelegateesCount"` \| `"lock"` \| `"incrementNonvotingAccountBalance"` \| `"decrementNonvotingAccountBalance"` \| `"unlock"` \| `"relock"` \| `"getTotalLockedGold"` \| `"getNonvotingLockedGold"` \| `"delegateGovernanceVotes"` \| `"revokeDelegatedGovernanceVotes"` \| `"updateDelegatedAmount"` \| `"getAccountTotalDelegatedFraction"` \| `"getAccountTotalLockedGold"` \| `"getAccountTotalGovernanceVotingPower"` \| `"getDelegatorDelegateeInfo"` \| `"getDelegatorDelegateeExpectedAndRealAmount"` \| `"getDelegateesOfDelegator"` \| `"getAccountNonvotingLockedGold"` \| `"getPendingWithdrawals"` \| `"getPendingWithdrawal"` \| `"getTotalPendingWithdrawalsCount"` \| `"getTotalPendingWithdrawals"` \| `"getSlashingWhitelist"` \| `"addSlasher"` \| `"removeSlasher"` \| `"slash"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`methodIds`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#methodids)

***

### revokeDelegated()

> **revokeDelegated**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L104)

Revokes delegated locked gold.

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### unlock()

> **unlock**: (`value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L139)

Unlocks gold that becomes withdrawable after the unlocking period.

#### Parameters

##### value

`Value`

The amount of gold to unlock.

#### Returns

`CeloTransactionObject`\<`void`\>

***

### updateDelegatedAmount()

> **updateDelegatedAmount**: (...`args`) => `CeloTransactionObject`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L99)

Updates the amount of delegated locked gold. There might be discrepancy between the amount of locked gold
and the amount of delegated locked gold because of received rewards.

#### Parameters

##### args

...\[`string`, `string`\]

#### Returns

`CeloTransactionObject`\<`string`\>

***

### withdraw()

> **withdraw**: (`index`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L79)

Withdraws a gold that has been unlocked after the unlocking period has passed.

#### Parameters

##### index

`number`

The index of the pending withdrawal to withdraw.

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

### computeInitialParametersForSlashing()

> **computeInitialParametersForSlashing**(`account`, `penalty`): `Promise`\<\{ `greaters`: `string`[]; `indices`: `number`[]; `lessers`: `string`[]; `list`: `AddressListItem`[]; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:343](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L343)

Computes parameters for slashing `penalty` from `account`.

#### Parameters

##### account

`string`

The account to slash.

##### penalty

`BigNumber`

The amount to slash as penalty.

#### Returns

`Promise`\<\{ `greaters`: `string`[]; `indices`: `number`[]; `lessers`: `string`[]; `list`: `AddressListItem`[]; \}\>

List of (group, voting gold) to decrement from `account`.

***

### computeParametersForSlashing()

> **computeParametersForSlashing**(`account`, `penalty`, `groups`): `Promise`\<\{ `greaters`: `string`[]; `indices`: `number`[]; `lessers`: `string`[]; `list`: `AddressListItem`[]; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:350](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L350)

#### Parameters

##### account

`string`

##### penalty

`BigNumber`

##### groups

`AddressListItem`[]

#### Returns

`Promise`\<\{ `greaters`: `string`[]; `indices`: `number`[]; `lessers`: `string`[]; `list`: `AddressListItem`[]; \}\>

***

### getAccountsSlashed()

> **getAccountsSlashed**(`epochNumber`): `Promise`\<[`AccountSlashed`](../interfaces/AccountSlashed.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:318](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L318)

Retrieves AccountSlashed for epochNumber.

#### Parameters

##### epochNumber

`number`

The epoch to retrieve AccountSlashed at.

#### Returns

`Promise`\<[`AccountSlashed`](../interfaces/AccountSlashed.md)[]\>

***

### getAccountSummary()

> **getAccountSummary**(`account`): `Promise`\<`AccountSummary`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L251)

#### Parameters

##### account

`string`

#### Returns

`Promise`\<`AccountSummary`\>

***

### getAccountTotalGovernanceVotingPower()

> **getAccountTotalGovernanceVotingPower**(`account`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L275)

Returns the total amount of governance voting power for an account.

#### Parameters

##### account

`string`

The address of the account.

#### Returns

`Promise`\<`BigNumber`\>

The total amount of governance voting power for an account.

***

### getConfig()

> **getConfig**(): `Promise`\<[`LockedGoldConfig`](../interfaces/LockedGoldConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:232](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L232)

Returns current configuration parameters.

#### Returns

`Promise`\<[`LockedGoldConfig`](../interfaces/LockedGoldConfig.md)\>

***

### getDelegateInfo()

> **getDelegateInfo**(`account`): `Promise`\<[`DelegateInfo`](../interfaces/DelegateInfo.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L115)

#### Parameters

##### account

`string`

#### Returns

`Promise`\<[`DelegateInfo`](../interfaces/DelegateInfo.md)\>

***

### getHumanReadableConfig()

> **getHumanReadableConfig**(): `Promise`\<\{ `totalLockedGold`: `BigNumber`; `unlockingPeriod`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:243](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L243)

#### Returns

`Promise`\<\{ `totalLockedGold`: `BigNumber`; `unlockingPeriod`: `string`; \}\>

LockedGoldConfig object

#### Dev

Returns human readable configuration of the lockedcelo contract

***

### getMaxDelegateesCount()

> **getMaxDelegateesCount**(): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L106)

#### Returns

`Promise`\<`BigNumber`\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"AccountSlashed"` | `"CeloDelegated"` | `"DelegatedCeloRevoked"` | `"GoldLocked"` | `"GoldRelocked"` | `"GoldUnlocked"` | `"GoldWithdrawn"` | `"MaxDelegateesCountSet"` | `"OwnershipTransferred"` | `"RegistrySet"` | `"SlasherWhitelistAdded"` | `"SlasherWhitelistRemoved"` | `"UnlockingPeriodSet"` | `"allEvents"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`getPastEvents`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#getpastevents)

***

### getPendingWithdrawal()

> **getPendingWithdrawal**(`account`, `index`): `Promise`\<\{ `time`: `BigNumber`; `value`: `BigNumber`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:306](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L306)

Returns the pending withdrawal at a given index for a given account.

#### Parameters

##### account

`string`

The address of the account.

##### index

`number`

The index of the pending withdrawal.

#### Returns

`Promise`\<\{ `time`: `BigNumber`; `value`: `BigNumber`; \}\>

The value of the pending withdrawal.

***

### getPendingWithdrawals()

> **getPendingWithdrawals**(`account`): `Promise`\<[`PendingWithdrawal`](../interfaces/PendingWithdrawal.md)[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:287](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L287)

Returns the pending withdrawals from unlocked gold for an account.

#### Parameters

##### account

`string`

The address of the account.

#### Returns

`Promise`\<[`PendingWithdrawal`](../interfaces/PendingWithdrawal.md)[]\>

The value and timestamp for each pending withdrawal.

***

### getPendingWithdrawalsTotalValue()

> **getPendingWithdrawalsTotalValue**(`account`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L145)

#### Parameters

##### account

`string`

#### Returns

`Promise`\<`BigNumber`\>

***

### getTotalPendingWithdrawalsCount()

> **getTotalPendingWithdrawalsCount**(`account`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:400](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L400)

Returns the number of pending withdrawals for the specified account.

#### Parameters

##### account

`string`

The account.

#### Returns

`Promise`\<`BigNumber`\>

The count of pending withdrawals.

***

### relock()

> **relock**(`account`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/LockedGold.ts:157](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L157)

Relocks gold that has been unlocked but not withdrawn.

#### Parameters

##### account

`string`

##### value

`Value`

The value to relock from pending withdrawals.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`version`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#version)
