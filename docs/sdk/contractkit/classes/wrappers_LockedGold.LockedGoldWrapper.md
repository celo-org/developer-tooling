[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/LockedGold](../modules/wrappers_LockedGold.md) / LockedGoldWrapper

# Class: LockedGoldWrapper

[wrappers/LockedGold](../modules/wrappers_LockedGold.md).LockedGoldWrapper

Contract for handling deposits needed for voting.

## Hierarchy

- [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`LockedGold`\>

  ↳ **`LockedGoldWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_LockedGold.LockedGoldWrapper.md#constructor)

### Properties

- [\_getTotalPendingWithdrawalsCount](wrappers_LockedGold.LockedGoldWrapper.md#_gettotalpendingwithdrawalscount)
- [\_relock](wrappers_LockedGold.LockedGoldWrapper.md#_relock)
- [delegate](wrappers_LockedGold.LockedGoldWrapper.md#delegate)
- [eventTypes](wrappers_LockedGold.LockedGoldWrapper.md#eventtypes)
- [events](wrappers_LockedGold.LockedGoldWrapper.md#events)
- [getAccountNonvotingLockedGold](wrappers_LockedGold.LockedGoldWrapper.md#getaccountnonvotinglockedgold)
- [getAccountTotalLockedGold](wrappers_LockedGold.LockedGoldWrapper.md#getaccounttotallockedgold)
- [getTotalLockedGold](wrappers_LockedGold.LockedGoldWrapper.md#gettotallockedgold)
- [lock](wrappers_LockedGold.LockedGoldWrapper.md#lock)
- [methodIds](wrappers_LockedGold.LockedGoldWrapper.md#methodids)
- [revokeDelegated](wrappers_LockedGold.LockedGoldWrapper.md#revokedelegated)
- [unlock](wrappers_LockedGold.LockedGoldWrapper.md#unlock)
- [updateDelegatedAmount](wrappers_LockedGold.LockedGoldWrapper.md#updatedelegatedamount)
- [withdraw](wrappers_LockedGold.LockedGoldWrapper.md#withdraw)

### Accessors

- [address](wrappers_LockedGold.LockedGoldWrapper.md#address)

### Methods

- [computeInitialParametersForSlashing](wrappers_LockedGold.LockedGoldWrapper.md#computeinitialparametersforslashing)
- [computeParametersForSlashing](wrappers_LockedGold.LockedGoldWrapper.md#computeparametersforslashing)
- [getAccountSummary](wrappers_LockedGold.LockedGoldWrapper.md#getaccountsummary)
- [getAccountTotalGovernanceVotingPower](wrappers_LockedGold.LockedGoldWrapper.md#getaccounttotalgovernancevotingpower)
- [getAccountsSlashed](wrappers_LockedGold.LockedGoldWrapper.md#getaccountsslashed)
- [getConfig](wrappers_LockedGold.LockedGoldWrapper.md#getconfig)
- [getDelegateInfo](wrappers_LockedGold.LockedGoldWrapper.md#getdelegateinfo)
- [getHumanReadableConfig](wrappers_LockedGold.LockedGoldWrapper.md#gethumanreadableconfig)
- [getMaxDelegateesCount](wrappers_LockedGold.LockedGoldWrapper.md#getmaxdelegateescount)
- [getPastEvents](wrappers_LockedGold.LockedGoldWrapper.md#getpastevents)
- [getPendingWithdrawal](wrappers_LockedGold.LockedGoldWrapper.md#getpendingwithdrawal)
- [getPendingWithdrawals](wrappers_LockedGold.LockedGoldWrapper.md#getpendingwithdrawals)
- [getPendingWithdrawalsTotalValue](wrappers_LockedGold.LockedGoldWrapper.md#getpendingwithdrawalstotalvalue)
- [getTotalPendingWithdrawalsCount](wrappers_LockedGold.LockedGoldWrapper.md#gettotalpendingwithdrawalscount)
- [relock](wrappers_LockedGold.LockedGoldWrapper.md#relock)
- [version](wrappers_LockedGold.LockedGoldWrapper.md#version)

## Constructors

### constructor

• **new LockedGoldWrapper**(`connection`, `contract`, `contracts`): [`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `LockedGold` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`LockedGoldWrapper`](wrappers_LockedGold.LockedGoldWrapper.md)

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### \_getTotalPendingWithdrawalsCount

• **\_getTotalPendingWithdrawalsCount**: (...`args`: [account: string]) => `Promise`\<`BigNumber`\>

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:402](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L402)

___

### \_relock

• **\_relock**: (`index`: `number`, `value`: `Value`) => `CeloTransactionObject`\<`void`\>

Relocks gold that has been unlocked but not withdrawn.

**`Param`**

The index of the pending withdrawal to relock from.

**`Param`**

The value to relock from the specified pending withdrawal.

#### Type declaration

▸ (`index`, `value`): `CeloTransactionObject`\<`void`\>

Relocks gold that has been unlocked but not withdrawn.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the pending withdrawal to relock from. |
| `value` | `Value` | The value to relock from the specified pending withdrawal. |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L190)

___

### delegate

• **delegate**: (...`args`: [delegatee: string, delegateFraction: string \| number]) => `CeloTransactionObject`\<`void`\>

Delegates locked gold.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Delegates locked gold.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [delegatee: string, delegateFraction: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L93)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`LockedGold`\>

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
| `AccountSlashed` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `penalty`: `string` ; `reporter`: `string` ; `reward`: `string` ; `slashed`: `string`  }\> |
| `CeloDelegated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `amount`: `string` ; `delegatee`: `string` ; `delegator`: `string` ; `percent`: `string`  }\> |
| `DelegatedCeloRevoked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `amount`: `string` ; `delegatee`: `string` ; `delegator`: `string` ; `percent`: `string`  }\> |
| `GoldLocked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `value`: `string`  }\> |
| `GoldRelocked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `value`: `string`  }\> |
| `GoldUnlocked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `available`: `string` ; `value`: `string`  }\> |
| `GoldWithdrawn` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `value`: `string`  }\> |
| `MaxDelegateesCountSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `SlasherWhitelistAdded` | `ContractEvent`\<`string`\> |
| `SlasherWhitelistRemoved` | `ContractEvent`\<`string`\> |
| `UnlockingPeriodSet` | `ContractEvent`\<`string`\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getAccountNonvotingLockedGold

• **getAccountNonvotingLockedGold**: (...`args`: [account: string]) => `Promise`\<`BigNumber`\>

Returns the total amount of non-voting locked gold for an account.

**`Param`**

The account.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the total amount of non-voting locked gold for an account.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`BigNumber`\>

The total amount of non-voting locked gold for an account.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:223](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L223)

___

### getAccountTotalLockedGold

• **getAccountTotalLockedGold**: (...`args`: [account: string]) => `Promise`\<`BigNumber`\>

Returns the total amount of locked gold for an account.

**`Param`**

The account.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the total amount of locked gold for an account.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`BigNumber`\>

The total amount of locked gold for an account.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:201](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L201)

___

### getTotalLockedGold

• **getTotalLockedGold**: (...`args`: []) => `Promise`\<`BigNumber`\>

Returns the total amount of locked gold in the system. Note that this does not include
  gold that has been unlocked but not yet withdrawn.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the total amount of locked gold in the system. Note that this does not include
  gold that has been unlocked but not yet withdrawn.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`BigNumber`\>

The total amount of locked gold in the system.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L212)

___

### lock

• **lock**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

Locks gold to be used for voting.
The gold to be locked, must be specified as the `tx.value`

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Locks gold to be used for voting.
The gold to be locked, must be specified as the `tx.value`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L88)

___

### methodIds

• **methodIds**: `Record`\<``"unlockingPeriod"`` \| ``"slash"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"withdraw"`` \| ``"slashingWhitelist"`` \| ``"totalDelegatedCelo"`` \| ``"totalNonvoting"`` \| ``"isSlasher"`` \| ``"setUnlockingPeriod"`` \| ``"setMaxDelegateesCount"`` \| ``"lock"`` \| ``"incrementNonvotingAccountBalance"`` \| ``"decrementNonvotingAccountBalance"`` \| ``"unlock"`` \| ``"relock"`` \| ``"getTotalLockedGold"`` \| ``"getNonvotingLockedGold"`` \| ``"delegateGovernanceVotes"`` \| ``"revokeDelegatedGovernanceVotes"`` \| ``"updateDelegatedAmount"`` \| ``"getAccountTotalDelegatedFraction"`` \| ``"getAccountTotalLockedGold"`` \| ``"getAccountTotalGovernanceVotingPower"`` \| ``"getDelegatorDelegateeInfo"`` \| ``"getDelegatorDelegateeExpectedAndRealAmount"`` \| ``"getDelegateesOfDelegator"`` \| ``"getAccountNonvotingLockedGold"`` \| ``"getPendingWithdrawals"`` \| ``"getPendingWithdrawal"`` \| ``"getTotalPendingWithdrawalsCount"`` \| ``"getTotalPendingWithdrawals"`` \| ``"getSlashingWhitelist"`` \| ``"addSlasher"`` \| ``"removeSlasher"``, `string`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### revokeDelegated

• **revokeDelegated**: (...`args`: [delegatee: string, revokeFraction: string \| number]) => `CeloTransactionObject`\<`void`\>

Revokes delegated locked gold.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Revokes delegated locked gold.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [delegatee: string, revokeFraction: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:104](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L104)

___

### unlock

• **unlock**: (`value`: `Value`) => `CeloTransactionObject`\<`void`\>

Unlocks gold that becomes withdrawable after the unlocking period.

**`Param`**

The amount of gold to unlock.

#### Type declaration

▸ (`value`): `CeloTransactionObject`\<`void`\>

Unlocks gold that becomes withdrawable after the unlocking period.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | The amount of gold to unlock. |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:139](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L139)

___

### updateDelegatedAmount

• **updateDelegatedAmount**: (...`args`: [delegator: string, delegatee: string]) => `CeloTransactionObject`\<`string`\>

Updates the amount of delegated locked gold. There might be discrepancy between the amount of locked gold
and the amount of delegated locked gold because of received rewards.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`string`\>

Updates the amount of delegated locked gold. There might be discrepancy between the amount of locked gold
and the amount of delegated locked gold because of received rewards.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [delegator: string, delegatee: string] |

##### Returns

`CeloTransactionObject`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L99)

___

### withdraw

• **withdraw**: (`index`: `number`) => `CeloTransactionObject`\<`void`\>

Withdraws a gold that has been unlocked after the unlocking period has passed.

**`Param`**

The index of the pending withdrawal to withdraw.

#### Type declaration

▸ (`index`): `CeloTransactionObject`\<`void`\>

Withdraws a gold that has been unlocked after the unlocking period has passed.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the pending withdrawal to withdraw. |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:79](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L79)

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

### computeInitialParametersForSlashing

▸ **computeInitialParametersForSlashing**(`account`, `penalty`): `Promise`\<\{ `greaters`: `string`[] ; `indices`: `number`[] ; `lessers`: `string`[] ; `list`: `AddressListItem`[]  }\>

Computes parameters for slashing `penalty` from `account`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account to slash. |
| `penalty` | `BigNumber` | The amount to slash as penalty. |

#### Returns

`Promise`\<\{ `greaters`: `string`[] ; `indices`: `number`[] ; `lessers`: `string`[] ; `list`: `AddressListItem`[]  }\>

List of (group, voting gold) to decrement from `account`.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:341](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L341)

___

### computeParametersForSlashing

▸ **computeParametersForSlashing**(`account`, `penalty`, `groups`): `Promise`\<\{ `greaters`: `string`[] ; `indices`: `number`[] ; `lessers`: `string`[] ; `list`: `AddressListItem`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `penalty` | `BigNumber` |
| `groups` | `AddressListItem`[] |

#### Returns

`Promise`\<\{ `greaters`: `string`[] ; `indices`: `number`[] ; `lessers`: `string`[] ; `list`: `AddressListItem`[]  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:348](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L348)

___

### getAccountSummary

▸ **getAccountSummary**(`account`): `Promise`\<`AccountSummary`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<`AccountSummary`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L251)

___

### getAccountTotalGovernanceVotingPower

▸ **getAccountTotalGovernanceVotingPower**(`account`): `Promise`\<`BigNumber`\>

Returns the total amount of governance voting power for an account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

#### Returns

`Promise`\<`BigNumber`\>

The total amount of governance voting power for an account.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L275)

___

### getAccountsSlashed

▸ **getAccountsSlashed**(`epochNumber`): `Promise`\<[`AccountSlashed`](../interfaces/wrappers_LockedGold.AccountSlashed.md)[]\>

Retrieves AccountSlashed for epochNumber.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epochNumber` | `number` | The epoch to retrieve AccountSlashed at. |

#### Returns

`Promise`\<[`AccountSlashed`](../interfaces/wrappers_LockedGold.AccountSlashed.md)[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:318](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L318)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`LockedGoldConfig`](../interfaces/wrappers_LockedGold.LockedGoldConfig.md)\>

Returns current configuration parameters.

#### Returns

`Promise`\<[`LockedGoldConfig`](../interfaces/wrappers_LockedGold.LockedGoldConfig.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:232](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L232)

___

### getDelegateInfo

▸ **getDelegateInfo**(`account`): `Promise`\<[`DelegateInfo`](../interfaces/wrappers_LockedGold.DelegateInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<[`DelegateInfo`](../interfaces/wrappers_LockedGold.DelegateInfo.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L115)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(): `Promise`\<\{ `totalLockedGold`: `BigNumber` ; `unlockingPeriod`: `string`  }\>

#### Returns

`Promise`\<\{ `totalLockedGold`: `BigNumber` ; `unlockingPeriod`: `string`  }\>

LockedGoldConfig object

**`Dev`**

Returns human readable configuration of the lockedgold contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:243](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L243)

___

### getMaxDelegateesCount

▸ **getMaxDelegateesCount**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L106)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"AccountSlashed"`` \| ``"CeloDelegated"`` \| ``"DelegatedCeloRevoked"`` \| ``"GoldLocked"`` \| ``"GoldRelocked"`` \| ``"GoldUnlocked"`` \| ``"GoldWithdrawn"`` \| ``"MaxDelegateesCountSet"`` \| ``"SlasherWhitelistAdded"`` \| ``"SlasherWhitelistRemoved"`` \| ``"UnlockingPeriodSet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getPendingWithdrawal

▸ **getPendingWithdrawal**(`account`, `index`): `Promise`\<\{ `time`: `BigNumber` ; `value`: `BigNumber`  }\>

Returns the pending withdrawal at a given index for a given account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |
| `index` | `number` | The index of the pending withdrawal. |

#### Returns

`Promise`\<\{ `time`: `BigNumber` ; `value`: `BigNumber`  }\>

The value of the pending withdrawal.

The timestamp of the pending withdrawal.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:306](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L306)

___

### getPendingWithdrawals

▸ **getPendingWithdrawals**(`account`): `Promise`\<[`PendingWithdrawal`](../interfaces/wrappers_LockedGold.PendingWithdrawal.md)[]\>

Returns the pending withdrawals from unlocked gold for an account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

#### Returns

`Promise`\<[`PendingWithdrawal`](../interfaces/wrappers_LockedGold.PendingWithdrawal.md)[]\>

The value and timestamp for each pending withdrawal.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:287](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L287)

___

### getPendingWithdrawalsTotalValue

▸ **getPendingWithdrawalsTotalValue**(`account`): `Promise`\<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L145)

___

### getTotalPendingWithdrawalsCount

▸ **getTotalPendingWithdrawalsCount**(`account`): `Promise`\<`BigNumber`\>

Returns the number of pending withdrawals for the specified account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account. |

#### Returns

`Promise`\<`BigNumber`\>

The count of pending withdrawals.

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:398](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L398)

___

### relock

▸ **relock**(`account`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Relocks gold that has been unlocked but not withdrawn.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | - |
| `value` | `Value` | The value to relock from pending withdrawals. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/LockedGold.ts:157](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/LockedGold.ts#L157)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[version](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
