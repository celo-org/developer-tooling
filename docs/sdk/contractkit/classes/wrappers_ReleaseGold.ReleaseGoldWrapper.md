[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/ReleaseGold](../modules/wrappers_ReleaseGold.md) / ReleaseGoldWrapper

# Class: ReleaseGoldWrapper

[wrappers/ReleaseGold](../modules/wrappers_ReleaseGold.md).ReleaseGoldWrapper

Contract for handling an instance of a ReleaseGold contract.

## Hierarchy

- [`BaseWrapperForGoverning`](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md)\<`ReleaseGold`\>

  ↳ **`ReleaseGoldWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_ReleaseGold.ReleaseGoldWrapper.md#constructor)

### Properties

- [\_relockGold](wrappers_ReleaseGold.ReleaseGoldWrapper.md#_relockgold)
- [createAccount](wrappers_ReleaseGold.ReleaseGoldWrapper.md#createaccount)
- [eventTypes](wrappers_ReleaseGold.ReleaseGoldWrapper.md#eventtypes)
- [events](wrappers_ReleaseGold.ReleaseGoldWrapper.md#events)
- [getBeneficiary](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getbeneficiary)
- [getCanValidate](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getcanvalidate)
- [getCanVote](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getcanvote)
- [getCurrentReleasedTotalAmount](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getcurrentreleasedtotalamount)
- [getLiquidityProvisionMet](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getliquidityprovisionmet)
- [getMaxDistribution](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getmaxdistribution)
- [getOwner](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getowner)
- [getRefundAddress](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getrefundaddress)
- [getReleaseOwner](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getreleaseowner)
- [getRemainingLockedBalance](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getremaininglockedbalance)
- [getRemainingTotalBalance](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getremainingtotalbalance)
- [getRemainingUnlockedBalance](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getremainingunlockedbalance)
- [getTotalBalance](wrappers_ReleaseGold.ReleaseGoldWrapper.md#gettotalbalance)
- [getTotalWithdrawn](wrappers_ReleaseGold.ReleaseGoldWrapper.md#gettotalwithdrawn)
- [getWithdrawableAmount](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getwithdrawableamount)
- [isRevoked](wrappers_ReleaseGold.ReleaseGoldWrapper.md#isrevoked)
- [lockGold](wrappers_ReleaseGold.ReleaseGoldWrapper.md#lockgold)
- [methodIds](wrappers_ReleaseGold.ReleaseGoldWrapper.md#methodids)
- [refundAndFinalize](wrappers_ReleaseGold.ReleaseGoldWrapper.md#refundandfinalize)
- [revokeBeneficiary](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokebeneficiary)
- [revokeReleasing](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokereleasing)
- [setAccount](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setaccount)
- [setAccountDataEncryptionKey](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setaccountdataencryptionkey)
- [setAccountMetadataURL](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setaccountmetadataurl)
- [setAccountName](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setaccountname)
- [setAccountWalletAddress](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setaccountwalletaddress)
- [setBeneficiary](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setbeneficiary)
- [setCanExpire](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setcanexpire)
- [setLiquidityProvision](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setliquidityprovision)
- [setMaxDistribution](wrappers_ReleaseGold.ReleaseGoldWrapper.md#setmaxdistribution)
- [transfer](wrappers_ReleaseGold.ReleaseGoldWrapper.md#transfer)
- [unlockGold](wrappers_ReleaseGold.ReleaseGoldWrapper.md#unlockgold)
- [withdraw](wrappers_ReleaseGold.ReleaseGoldWrapper.md#withdraw)
- [withdrawLockedGold](wrappers_ReleaseGold.ReleaseGoldWrapper.md#withdrawlockedgold)

### Accessors

- [address](wrappers_ReleaseGold.ReleaseGoldWrapper.md#address)

### Methods

- [authorizeAttestationSigner](wrappers_ReleaseGold.ReleaseGoldWrapper.md#authorizeattestationsigner)
- [authorizeValidatorSigner](wrappers_ReleaseGold.ReleaseGoldWrapper.md#authorizevalidatorsigner)
- [authorizeValidatorSignerAndBls](wrappers_ReleaseGold.ReleaseGoldWrapper.md#authorizevalidatorsignerandbls)
- [authorizeVoteSigner](wrappers_ReleaseGold.ReleaseGoldWrapper.md#authorizevotesigner)
- [getHumanReadableReleaseSchedule](wrappers_ReleaseGold.ReleaseGoldWrapper.md#gethumanreadablereleaseschedule)
- [getPastEvents](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getpastevents)
- [getReleaseSchedule](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getreleaseschedule)
- [getReleasedBalanceAtRevoke](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getreleasedbalanceatrevoke)
- [getRevocationInfo](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getrevocationinfo)
- [getRevokeTime](wrappers_ReleaseGold.ReleaseGoldWrapper.md#getrevoketime)
- [isRevocable](wrappers_ReleaseGold.ReleaseGoldWrapper.md#isrevocable)
- [relockGold](wrappers_ReleaseGold.ReleaseGoldWrapper.md#relockgold)
- [revoke](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revoke)
- [revokeActive](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokeactive)
- [revokeActiveVotes](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokeactivevotes)
- [revokeAllVotesForAllGroups](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokeallvotesforallgroups)
- [revokeAllVotesForGroup](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokeallvotesforgroup)
- [revokePending](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokepending)
- [revokePendingVotes](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokependingvotes)
- [revokeValueFromVotes](wrappers_ReleaseGold.ReleaseGoldWrapper.md#revokevaluefromvotes)
- [unlockAllGold](wrappers_ReleaseGold.ReleaseGoldWrapper.md#unlockallgold)
- [version](wrappers_ReleaseGold.ReleaseGoldWrapper.md#version)

## Constructors

### constructor

• **new ReleaseGoldWrapper**(`connection`, `contract`, `contracts`): [`ReleaseGoldWrapper`](wrappers_ReleaseGold.ReleaseGoldWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `ReleaseGold` |
| `contracts` | `ContractWrappersForVotingAndRules` |

#### Returns

[`ReleaseGoldWrapper`](wrappers_ReleaseGold.ReleaseGoldWrapper.md)

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[constructor](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L21)

## Properties

### \_relockGold

• **\_relockGold**: (`index`: `number`, `value`: `Value`) => `CeloTransactionObject`\<`void`\>

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

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:386](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L386)

___

### createAccount

• **createAccount**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

Beneficiary creates an account on behalf of the ReleaseGold contract.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Beneficiary creates an account on behalf of the ReleaseGold contract.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:415](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L415)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`ReleaseGold`\>

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
| `BeneficiarySet` | `ContractEvent`\<`string`\> |
| `CanExpireSet` | `ContractEvent`\<`boolean`\> |
| `DistributionLimitSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `beneficiary`: `string` ; `maxDistribution`: `string`  }\> |
| `LiquidityProvisionSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `ReleaseGoldInstanceCreated` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `atAddress`: `string` ; `beneficiary`: `string`  }\> |
| `ReleaseGoldInstanceDestroyed` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `atAddress`: `string` ; `beneficiary`: `string`  }\> |
| `ReleaseScheduleRevoked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `releasedBalanceAtRevoke`: `string` ; `revokeTimestamp`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[events](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getBeneficiary

• **getBeneficiary**: () => `Promise`\<\`0x$\{string}\`\>

Returns the beneficiary of the ReleaseGold contract

#### Type declaration

▸ (): `Promise`\<\`0x$\{string}\`\>

Returns the beneficiary of the ReleaseGold contract

##### Returns

`Promise`\<\`0x$\{string}\`\>

The address of the beneficiary.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L103)

___

### getCanValidate

• **getCanValidate**: () => `Promise`\<`boolean`\>

Returns true if the contract can validate

#### Type declaration

▸ (): `Promise`\<`boolean`\>

Returns true if the contract can validate

##### Returns

`Promise`\<`boolean`\>

If the contract can validate

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L143)

___

### getCanVote

• **getCanVote**: () => `Promise`\<`boolean`\>

Returns true if the contract can vote

#### Type declaration

▸ (): `Promise`\<`boolean`\>

Returns true if the contract can vote

##### Returns

`Promise`\<`boolean`\>

If the contract can vote

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:149](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L149)

___

### getCurrentReleasedTotalAmount

• **getCurrentReleasedTotalAmount**: () => `Promise`\<`BigNumber`\>

Returns the total amount that has already released up to now

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns the total amount that has already released up to now

##### Returns

`Promise`\<`BigNumber`\>

The already released gold amount up to the point of call

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L275)

___

### getLiquidityProvisionMet

• **getLiquidityProvisionMet**: () => `Promise`\<`boolean`\>

Returns true if the liquidity provision has been met for this contract

#### Type declaration

▸ (): `Promise`\<`boolean`\>

Returns true if the liquidity provision has been met for this contract

##### Returns

`Promise`\<`boolean`\>

If the liquidity provision is met.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L135)

___

### getMaxDistribution

• **getMaxDistribution**: () => `Promise`\<`BigNumber`\>

Returns the maximum amount of gold (regardless of release schedule)
currently allowed for release.

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns the maximum amount of gold (regardless of release schedule)
currently allowed for release.

##### Returns

`Promise`\<`BigNumber`\>

The max amount of gold currently withdrawable.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L166)

___

### getOwner

• **getOwner**: () => `Promise`\<\`0x$\{string}\`\>

Returns the owner's address of the ReleaseGold contract

#### Type declaration

▸ (): `Promise`\<\`0x$\{string}\`\>

Returns the owner's address of the ReleaseGold contract

##### Returns

`Promise`\<\`0x$\{string}\`\>

The owner's address.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L127)

___

### getRefundAddress

• **getRefundAddress**: () => `Promise`\<\`0x$\{string}\`\>

Returns the refund address of the ReleaseGold contract

#### Type declaration

▸ (): `Promise`\<\`0x$\{string}\`\>

Returns the refund address of the ReleaseGold contract

##### Returns

`Promise`\<\`0x$\{string}\`\>

The refundAddress.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L119)

___

### getReleaseOwner

• **getReleaseOwner**: () => `Promise`\<\`0x$\{string}\`\>

Returns the releaseOwner address of the ReleaseGold contract

#### Type declaration

▸ (): `Promise`\<\`0x$\{string}\`\>

Returns the releaseOwner address of the ReleaseGold contract

##### Returns

`Promise`\<\`0x$\{string}\`\>

The address of the releaseOwner.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L111)

___

### getRemainingLockedBalance

• **getRemainingLockedBalance**: () => `Promise`\<`BigNumber`\>

Returns the remaining locked gold balance in the ReleaseGold instance

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns the remaining locked gold balance in the ReleaseGold instance

##### Returns

`Promise`\<`BigNumber`\>

The remaining locked ReleaseGold instance gold balance

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:265](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L265)

___

### getRemainingTotalBalance

• **getRemainingTotalBalance**: () => `Promise`\<`BigNumber`\>

Returns the the sum of locked and unlocked gold in the ReleaseGold instance

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns the the sum of locked and unlocked gold in the ReleaseGold instance

##### Returns

`Promise`\<`BigNumber`\>

The remaining total ReleaseGold instance balance

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:245](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L245)

___

### getRemainingUnlockedBalance

• **getRemainingUnlockedBalance**: () => `Promise`\<`BigNumber`\>

Returns the remaining unlocked gold balance in the ReleaseGold instance

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns the remaining unlocked gold balance in the ReleaseGold instance

##### Returns

`Promise`\<`BigNumber`\>

The available unlocked ReleaseGold instance gold balance

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:255](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L255)

___

### getTotalBalance

• **getTotalBalance**: () => `Promise`\<`BigNumber`\>

Returns the total balance of the ReleaseGold instance

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns the total balance of the ReleaseGold instance

##### Returns

`Promise`\<`BigNumber`\>

The total ReleaseGold instance balance

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:235](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L235)

___

### getTotalWithdrawn

• **getTotalWithdrawn**: () => `Promise`\<`BigNumber`\>

Returns the total withdrawn amount from the ReleaseGold contract

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns the total withdrawn amount from the ReleaseGold contract

##### Returns

`Promise`\<`BigNumber`\>

The total withdrawn amount from the ReleaseGold contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:155](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L155)

___

### getWithdrawableAmount

• **getWithdrawableAmount**: () => `Promise`\<`BigNumber`\>

Returns currently withdrawable amount

#### Type declaration

▸ (): `Promise`\<`BigNumber`\>

Returns currently withdrawable amount

##### Returns

`Promise`\<`BigNumber`\>

The amount that can be yet withdrawn

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:285](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L285)

___

### isRevoked

• **isRevoked**: () => `Promise`\<`boolean`\>

Indicates if the release grant is revoked or not

#### Type declaration

▸ (): `Promise`\<`boolean`\>

Indicates if the release grant is revoked or not

##### Returns

`Promise`\<`boolean`\>

A boolean indicating revoked releasing (true) or non-revoked(false).

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:211](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L211)

___

### lockGold

• **lockGold**: (`value`: `Value`) => `CeloTransactionObject`\<`void`\>

Locks gold to be used for voting.

**`Param`**

The amount of gold to lock

#### Type declaration

▸ (`value`): `CeloTransactionObject`\<`void`\>

Locks gold to be used for voting.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | The amount of gold to lock |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:319](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L319)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"initialize"`` \| ``"withdraw"`` \| ``"revokePending"`` \| ``"revokeActive"`` \| ``"revoke"`` \| ``"transfer"`` \| ``"setAccount"`` \| ``"createAccount"`` \| ``"setAccountDataEncryptionKey"`` \| ``"authorizeVoteSigner"`` \| ``"authorizeValidatorSigner"`` \| ``"authorizeValidatorSignerWithPublicKey"`` \| ``"authorizeValidatorSignerWithKeys"`` \| ``"authorizeAttestationSigner"`` \| ``"EXPIRATION_TIME"`` \| ``"beneficiary"`` \| ``"canValidate"`` \| ``"canVote"`` \| ``"liquidityProvisionMet"`` \| ``"maxDistribution"`` \| ``"refundAddress"`` \| ``"releaseOwner"`` \| ``"releaseSchedule"`` \| ``"revocationInfo"`` \| ``"totalWithdrawn"`` \| ``"isFunded"`` \| ``"genericTransfer"`` \| ``"isRevoked"`` \| ``"setLiquidityProvision"`` \| ``"setCanExpire"`` \| ``"setMaxDistribution"`` \| ``"setBeneficiary"`` \| ``"refundAndFinalize"`` \| ``"expire"`` \| ``"getTotalBalance"`` \| ``"getRemainingTotalBalance"`` \| ``"getRemainingUnlockedBalance"`` \| ``"getRemainingLockedBalance"`` \| ``"getCurrentReleasedTotalAmount"`` \| ``"lockGold"`` \| ``"unlockGold"`` \| ``"relockGold"`` \| ``"withdrawLockedGold"`` \| ``"setAccountName"`` \| ``"setAccountWalletAddress"`` \| ``"setAccountMetadataURL"`` \| ``"getWithdrawableAmount"``, `string`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[methodIds](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### refundAndFinalize

• **refundAndFinalize**: () => `CeloTransactionObject`\<`void`\>

Refund `refundAddress` and `beneficiary` after the ReleaseGold schedule has been revoked.

#### Type declaration

▸ (): `CeloTransactionObject`\<`void`\>

Refund `refundAddress` and `beneficiary` after the ReleaseGold schedule has been revoked.

##### Returns

`CeloTransactionObject`\<`void`\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:310](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L310)

___

### revokeBeneficiary

• **revokeBeneficiary**: () => `CeloTransactionObject`\<`void`\>

Revoke a vesting CELO schedule from the contract's beneficiary.

#### Type declaration

▸ (): `CeloTransactionObject`\<`void`\>

Revoke a vesting CELO schedule from the contract's beneficiary.

##### Returns

`CeloTransactionObject`\<`void`\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:304](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L304)

___

### revokeReleasing

• **revokeReleasing**: () => `CeloTransactionObject`\<`void`\>

Revoke a Release schedule

#### Type declaration

▸ (): `CeloTransactionObject`\<`void`\>

Revoke a Release schedule

##### Returns

`CeloTransactionObject`\<`void`\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:295](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L295)

___

### setAccount

• **setAccount**: (...`args`: [name: string, dataEncryptionKey: string \| number[], walletAddress: string, v: string \| number, r: string \| number[], s: string \| number[]]) => `CeloTransactionObject`\<`void`\>

Beneficiary creates an account on behalf of the ReleaseGold contract.

**`Param`**

The name to set

**`Param`**

The key to set

**`Param`**

The address to set

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Beneficiary creates an account on behalf of the ReleaseGold contract.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [name: string, dataEncryptionKey: string \| number[], walletAddress: string, v: string \| number, r: string \| number[], s: string \| number[]] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:423](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L423)

___

### setAccountDataEncryptionKey

• **setAccountDataEncryptionKey**: (...`args`: [dataEncryptionKey: string \| number[]]) => `CeloTransactionObject`\<`void`\>

Sets the data encryption of the account

**`Param`**

The key to set

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the data encryption of the account

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [dataEncryptionKey: string \| number[]] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:450](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L450)

___

### setAccountMetadataURL

• **setAccountMetadataURL**: (...`args`: [metadataURL: string]) => `CeloTransactionObject`\<`void`\>

Sets the metadataURL for the account

**`Param`**

The url to set

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the metadataURL for the account

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [metadataURL: string] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:435](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L435)

___

### setAccountName

• **setAccountName**: (...`args`: [name: string]) => `CeloTransactionObject`\<`void`\>

Sets the name for the account

**`Param`**

The name to set

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the name for the account

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [name: string] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:429](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L429)

___

### setAccountWalletAddress

• **setAccountWalletAddress**: (...`args`: [walletAddress: string, v: string \| number, r: string \| number[], s: string \| number[]]) => `CeloTransactionObject`\<`void`\>

Sets the wallet address for the account

**`Param`**

The address to set

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the wallet address for the account

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [walletAddress: string, v: string \| number, r: string \| number[], s: string \| number[]] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:441](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L441)

___

### setBeneficiary

• **setBeneficiary**: (...`args`: [newBeneficiary: string]) => `CeloTransactionObject`\<`void`\>

Sets the contract's beneficiary

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the contract's beneficiary

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [newBeneficiary: string] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:474](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L474)

___

### setCanExpire

• **setCanExpire**: (...`args`: [\_canExpire: boolean]) => `CeloTransactionObject`\<`void`\>

Sets the contract's `canExpire` field to `_canExpire`

**`Param`**

If the contract can expire `EXPIRATION_TIME` after the release schedule finishes.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the contract's `canExpire` field to `_canExpire`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [\_canExpire: boolean] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:464](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L464)

___

### setLiquidityProvision

• **setLiquidityProvision**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

Sets the contract's liquidity provision to true

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the contract's liquidity provision to true

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:458](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L458)

___

### setMaxDistribution

• **setMaxDistribution**: (...`args`: [distributionRatio: string \| number]) => `CeloTransactionObject`\<`void`\>

Sets the contract's max distribution

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Sets the contract's max distribution

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [distributionRatio: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:469](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L469)

___

### transfer

• **transfer**: (`to`: `string`, `value`: `Value`) => `CeloTransactionObject`\<`void`\>

#### Type declaration

▸ (`to`, `value`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `to` | `string` |
| `value` | `Value` |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:325](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L325)

___

### unlockGold

• **unlockGold**: (`value`: `Value`) => `CeloTransactionObject`\<`void`\>

Unlocks gold that becomes withdrawable after the unlocking period.

**`Param`**

The amount of gold to unlock

#### Type declaration

▸ (`value`): `CeloTransactionObject`\<`void`\>

Unlocks gold that becomes withdrawable after the unlocking period.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | The amount of gold to unlock |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:335](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L335)

___

### withdraw

• **withdraw**: (`value`: `Value`) => `CeloTransactionObject`\<`void`\>

Transfer released gold from the ReleaseGold instance back to beneficiary.

**`Param`**

The requested gold amount

#### Type declaration

▸ (`value`): `CeloTransactionObject`\<`void`\>

Transfer released gold from the ReleaseGold instance back to beneficiary.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | The requested gold amount |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:406](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L406)

___

### withdrawLockedGold

• **withdrawLockedGold**: (`index`: `Value`) => `CeloTransactionObject`\<`void`\>

Withdraw gold in the ReleaseGold instance that has been unlocked but not withdrawn.

**`Param`**

The index of the pending locked gold withdrawal

#### Type declaration

▸ (`index`): `CeloTransactionObject`\<`void`\>

Withdraw gold in the ReleaseGold instance that has been unlocked but not withdrawn.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `Value` | The index of the pending locked gold withdrawal |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:396](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L396)

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

### authorizeAttestationSigner

▸ **authorizeAttestationSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Authorizes an address to sign attestation messages on behalf of the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the attestation signing key to authorize. |
| `proofOfSigningKeyPossession` | `Signature` | The account address signed by the signer address. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:592](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L592)

___

### authorizeValidatorSigner

▸ **authorizeValidatorSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Authorizes an address to sign validation messages on behalf of the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the validator signing key to authorize. |
| `proofOfSigningKeyPossession` | `Signature` | The account address signed by the signer address. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:503](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L503)

___

### authorizeValidatorSignerAndBls

▸ **authorizeValidatorSignerAndBls**(`signer`, `proofOfSigningKeyPossession`, `blsPublicKey`, `blsPop`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Authorizes an address to sign consensus messages on behalf of the contract's account. Also switch BLS key at the same time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the signing key to authorize. |
| `proofOfSigningKeyPossession` | `Signature` | The contract's account address signed by the signer address. |
| `blsPublicKey` | `string` | The BLS public key that the validator is using for consensus, should pass proof of possession. 48 bytes. |
| `blsPop` | `string` | The BLS public key proof-of-possession, which consists of a signature on the account address. 96 bytes. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:554](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L554)

___

### authorizeVoteSigner

▸ **authorizeVoteSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Authorizes an address to sign votes on behalf of the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the vote signing key to authorize. |
| `proofOfSigningKeyPossession` | `Signature` | The account address signed by the signer address. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:482](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L482)

___

### getHumanReadableReleaseSchedule

▸ **getHumanReadableReleaseSchedule**(): `Promise`\<\{ `amountReleasedPerPeriod`: `BigNumber` ; `numReleasePeriods`: `number` ; `releaseCliff`: `string` ; `releasePeriod`: `string` ; `releaseStartTime`: `string`  }\>

Returns the underlying Release schedule of the ReleaseGold contract

#### Returns

`Promise`\<\{ `amountReleasedPerPeriod`: `BigNumber` ; `numReleasePeriods`: `number` ; `releaseCliff`: `string` ; `releasePeriod`: `string` ; `releaseStartTime`: `string`  }\>

A ReleaseSchedule.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L88)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"BeneficiarySet"`` \| ``"CanExpireSet"`` \| ``"DistributionLimitSet"`` \| ``"LiquidityProvisionSet"`` \| ``"ReleaseGoldInstanceCreated"`` \| ``"ReleaseGoldInstanceDestroyed"`` \| ``"ReleaseScheduleRevoked"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[getPastEvents](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getReleaseSchedule

▸ **getReleaseSchedule**(): `Promise`\<`ReleaseSchedule`\>

Returns the underlying Release schedule of the ReleaseGold contract

#### Returns

`Promise`\<`ReleaseSchedule`\>

A ReleaseSchedule.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L72)

___

### getReleasedBalanceAtRevoke

▸ **getReleasedBalanceAtRevoke**(): `Promise`\<`string`\>

Returns the balance of released gold when the grant was revoked

#### Returns

`Promise`\<`string`\>

The balance at revocation time. 0 can also indicate not revoked.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L226)

___

### getRevocationInfo

▸ **getRevocationInfo**(): `Promise`\<`RevocationInfo`\>

Returns the underlying Revocation Info of the ReleaseGold contract

#### Returns

`Promise`\<`RevocationInfo`\>

A RevocationInfo struct.

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L176)

___

### getRevokeTime

▸ **getRevokeTime**(): `Promise`\<`number`\>

Returns the time at which the release schedule was revoked

#### Returns

`Promise`\<`number`\>

The timestamp of the release schedule revocation

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L217)

___

### isRevocable

▸ **isRevocable**(): `Promise`\<`boolean`\>

Indicates if the release grant is revocable or not

#### Returns

`Promise`\<`boolean`\>

A boolean indicating revocable releasing (true) or non-revocable(false).

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L202)

___

### relockGold

▸ **relockGold**(`value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Relocks gold in the ReleaseGold instance that has been unlocked but not withdrawn.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | The value to relock from the specified pending withdrawal. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:352](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L352)

___

### revoke

▸ **revoke**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Revokes value from pending/active aggregate

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account to revoke from. |
| `group` | `string` | The group to revoke the vote for. |
| `value` | `BigNumber` | The amount of gold to revoke. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

**`Deprecated`**

prefer revokeValueFromVotes

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:682](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L682)

___

### revokeActive

▸ **revokeActive**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Revokes active votes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account to revoke from. |
| `group` | `string` | The group to revoke the vote for. |
| `value` | `BigNumber` | The amount of gold to revoke. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

**`Deprecated`**

Prefer revokeActiveVotes

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:648](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L648)

___

### revokeActiveVotes

▸ **revokeActiveVotes**(`group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Revokes active votes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The group to revoke the vote for. |
| `value` | `BigNumber` | The amount of gold to revoke. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:672](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L672)

___

### revokeAllVotesForAllGroups

▸ **revokeAllVotesForAllGroups**(): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:730](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L730)

___

### revokeAllVotesForGroup

▸ **revokeAllVotesForGroup**(`group`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:712](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L712)

___

### revokePending

▸ **revokePending**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Revokes pending votes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The account to revoke from. |
| `group` | `string` | - |
| `value` | `BigNumber` | The amount of gold to revoke. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

**`Deprecated`**

prefer revokePendingVotes

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:614](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L614)

___

### revokePendingVotes

▸ **revokePendingVotes**(`group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Revokes pending votes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | - |
| `value` | `BigNumber` | The amount of gold to revoke. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:638](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L638)

___

### revokeValueFromVotes

▸ **revokeValueFromVotes**(`group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Revokes value from pending/active aggregate

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The group to revoke the vote for. |
| `value` | `BigNumber` | The amount of gold to revoke. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:709](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L709)

___

### unlockAllGold

▸ **unlockAllGold**(): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:341](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L341)

___

### version

▸ **version**(): `Promise`\<`never`\>

#### Returns

`Promise`\<`never`\>

#### Inherited from

[BaseWrapperForGoverning](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md).[version](wrappers_BaseWrapperForGoverning.BaseWrapperForGoverning.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
