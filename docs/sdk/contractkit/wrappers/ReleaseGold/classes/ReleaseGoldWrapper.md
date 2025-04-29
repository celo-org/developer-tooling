[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/ReleaseGold](../README.md) / ReleaseGoldWrapper

# Class: ReleaseGoldWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:67](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L67)

Contract for handling an instance of a ReleaseGold contract.

## Extends

- [`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md)\<`ReleaseGold`\>

## Constructors

### Constructor

> **new ReleaseGoldWrapper**(`connection`, `contract`, `contracts`): `ReleaseGoldWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapperForGoverning.ts#L23)

#### Parameters

##### connection

`Connection`

##### contract

`ReleaseGold`

##### contracts

`ContractWrappersForVotingAndRules`

#### Returns

`ReleaseGoldWrapper`

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`constructor`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#constructor)

## Properties

### \_relockGold()

> **\_relockGold**: (`index`, `value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:386](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L386)

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

### createAccount()

> **createAccount**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:415](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L415)

Beneficiary creates an account on behalf of the ReleaseGold contract.

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

#### BeneficiarySet

> **BeneficiarySet**: `ContractEvent`\<`string`\>

#### CanExpireSet

> **CanExpireSet**: `ContractEvent`\<`boolean`\>

#### DistributionLimitSet

> **DistributionLimitSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `beneficiary`: `string`; `maxDistribution`: `string`; \}\>

#### LiquidityProvisionSet

> **LiquidityProvisionSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### ReleaseGoldInstanceCreated

> **ReleaseGoldInstanceCreated**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `atAddress`: `string`; `beneficiary`: `string`; \}\>

#### ReleaseGoldInstanceDestroyed

> **ReleaseGoldInstanceDestroyed**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `atAddress`: `string`; `beneficiary`: `string`; \}\>

#### ReleaseScheduleRevoked

> **ReleaseScheduleRevoked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `releasedBalanceAtRevoke`: `string`; `revokeTimestamp`: `string`; \}\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`events`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`ReleaseGold`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`eventTypes`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#eventtypes)

***

### getBeneficiary()

> **getBeneficiary**: () => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L103)

Returns the beneficiary of the ReleaseGold contract

#### Returns

`Promise`\<`` `0x${string}` ``\>

The address of the beneficiary.

***

### getCanValidate()

> **getCanValidate**: () => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:143](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L143)

Returns true if the contract can validate

#### Returns

`Promise`\<`boolean`\>

If the contract can validate

***

### getCanVote()

> **getCanVote**: () => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:149](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L149)

Returns true if the contract can vote

#### Returns

`Promise`\<`boolean`\>

If the contract can vote

***

### getCurrentReleasedTotalAmount()

> **getCurrentReleasedTotalAmount**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L275)

Returns the total amount that has already released up to now

#### Returns

`Promise`\<`BigNumber`\>

The already released gold amount up to the point of call

***

### getLiquidityProvisionMet()

> **getLiquidityProvisionMet**: () => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:135](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L135)

Returns true if the liquidity provision has been met for this contract

#### Returns

`Promise`\<`boolean`\>

If the liquidity provision is met.

***

### getMaxDistribution()

> **getMaxDistribution**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L166)

Returns the maximum amount of gold (regardless of release schedule)
currently allowed for release.

#### Returns

`Promise`\<`BigNumber`\>

The max amount of gold currently withdrawable.

***

### getOwner()

> **getOwner**: () => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L127)

Returns the owner's address of the ReleaseGold contract

#### Returns

`Promise`\<`` `0x${string}` ``\>

The owner's address.

***

### getRefundAddress()

> **getRefundAddress**: () => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:119](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L119)

Returns the refund address of the ReleaseGold contract

#### Returns

`Promise`\<`` `0x${string}` ``\>

The refundAddress.

***

### getReleaseOwner()

> **getReleaseOwner**: () => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L111)

Returns the releaseOwner address of the ReleaseGold contract

#### Returns

`Promise`\<`` `0x${string}` ``\>

The address of the releaseOwner.

***

### getRemainingLockedBalance()

> **getRemainingLockedBalance**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:265](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L265)

Returns the remaining locked gold balance in the ReleaseGold instance

#### Returns

`Promise`\<`BigNumber`\>

The remaining locked ReleaseGold instance gold balance

***

### getRemainingTotalBalance()

> **getRemainingTotalBalance**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:245](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L245)

Returns the the sum of locked and unlocked gold in the ReleaseGold instance

#### Returns

`Promise`\<`BigNumber`\>

The remaining total ReleaseGold instance balance

***

### getRemainingUnlockedBalance()

> **getRemainingUnlockedBalance**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:255](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L255)

Returns the remaining unlocked gold balance in the ReleaseGold instance

#### Returns

`Promise`\<`BigNumber`\>

The available unlocked ReleaseGold instance gold balance

***

### getTotalBalance()

> **getTotalBalance**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:235](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L235)

Returns the total balance of the ReleaseGold instance

#### Returns

`Promise`\<`BigNumber`\>

The total ReleaseGold instance balance

***

### getTotalWithdrawn()

> **getTotalWithdrawn**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:155](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L155)

Returns the total withdrawn amount from the ReleaseGold contract

#### Returns

`Promise`\<`BigNumber`\>

The total withdrawn amount from the ReleaseGold contract

***

### getWithdrawableAmount()

> **getWithdrawableAmount**: () => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:285](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L285)

Returns currently withdrawable amount

#### Returns

`Promise`\<`BigNumber`\>

The amount that can be yet withdrawn

***

### isRevoked()

> **isRevoked**: () => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:211](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L211)

Indicates if the release grant is revoked or not

#### Returns

`Promise`\<`boolean`\>

A boolean indicating revoked releasing (true) or non-revoked(false).

***

### lockGold()

> **lockGold**: (`value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:319](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L319)

Locks gold to be used for voting.

#### Parameters

##### value

`Value`

The amount of gold to lock

#### Returns

`CeloTransactionObject`\<`void`\>

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"isOwner"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"initialize"` \| `"withdraw"` \| `"revokePending"` \| `"revokeActive"` \| `"revoke"` \| `"transfer"` \| `"setAccount"` \| `"createAccount"` \| `"setAccountDataEncryptionKey"` \| `"authorizeVoteSigner"` \| `"authorizeValidatorSigner"` \| `"authorizeValidatorSignerWithPublicKey"` \| `"authorizeValidatorSignerWithKeys"` \| `"authorizeAttestationSigner"` \| `"EXPIRATION_TIME"` \| `"beneficiary"` \| `"canValidate"` \| `"canVote"` \| `"liquidityProvisionMet"` \| `"maxDistribution"` \| `"refundAddress"` \| `"releaseOwner"` \| `"releaseSchedule"` \| `"revocationInfo"` \| `"totalWithdrawn"` \| `"isFunded"` \| `"genericTransfer"` \| `"isRevoked"` \| `"setLiquidityProvision"` \| `"setCanExpire"` \| `"setMaxDistribution"` \| `"setBeneficiary"` \| `"refundAndFinalize"` \| `"expire"` \| `"getTotalBalance"` \| `"getRemainingTotalBalance"` \| `"getRemainingUnlockedBalance"` \| `"getRemainingLockedBalance"` \| `"getCurrentReleasedTotalAmount"` \| `"lockGold"` \| `"unlockGold"` \| `"relockGold"` \| `"withdrawLockedGold"` \| `"setAccountName"` \| `"setAccountWalletAddress"` \| `"setAccountMetadataURL"` \| `"getWithdrawableAmount"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`methodIds`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#methodids)

***

### refundAndFinalize()

> **refundAndFinalize**: () => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:310](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L310)

Refund `refundAddress` and `beneficiary` after the ReleaseGold schedule has been revoked.

#### Returns

`CeloTransactionObject`\<`void`\>

A CeloTransactionObject

***

### revokeBeneficiary()

> **revokeBeneficiary**: () => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:304](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L304)

Revoke a vesting CELO schedule from the contract's beneficiary.

Revoke a Release schedule

#### Returns

`CeloTransactionObject`\<`void`\>

A CeloTransactionObject

#### Returns

A CeloTransactionObject

***

### revokeReleasing()

> **revokeReleasing**: () => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:295](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L295)

Revoke a Release schedule

#### Returns

`CeloTransactionObject`\<`void`\>

A CeloTransactionObject

***

### setAccount()

> **setAccount**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:423](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L423)

Beneficiary creates an account on behalf of the ReleaseGold contract.

#### Parameters

##### args

...\[`string`, `string` \| `number`[], `string`, `string` \| `number`, `string` \| `number`[], `string` \| `number`[]\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setAccountDataEncryptionKey()

> **setAccountDataEncryptionKey**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:450](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L450)

Sets the data encryption of the account

#### Parameters

##### args

...\[`string` \| `number`[]\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setAccountMetadataURL()

> **setAccountMetadataURL**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:435](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L435)

Sets the metadataURL for the account

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setAccountName()

> **setAccountName**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:429](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L429)

Sets the name for the account

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setAccountWalletAddress()

> **setAccountWalletAddress**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:441](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L441)

Sets the wallet address for the account

#### Parameters

##### args

...\[`string`, `string` \| `number`, `string` \| `number`[], `string` \| `number`[]\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setBeneficiary()

> **setBeneficiary**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:474](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L474)

Sets the contract's beneficiary

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setCanExpire()

> **setCanExpire**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:464](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L464)

Sets the contract's `canExpire` field to `_canExpire`

#### Parameters

##### args

...\[`boolean`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setLiquidityProvision()

> **setLiquidityProvision**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:458](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L458)

Sets the contract's liquidity provision to true

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setMaxDistribution()

> **setMaxDistribution**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:469](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L469)

Sets the contract's max distribution

#### Parameters

##### args

...\[`string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### transfer()

> **transfer**: (`to`, `value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:325](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L325)

#### Parameters

##### to

`string`

##### value

`Value`

#### Returns

`CeloTransactionObject`\<`void`\>

***

### unlockGold()

> **unlockGold**: (`value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:335](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L335)

Unlocks gold that becomes withdrawable after the unlocking period.

#### Parameters

##### value

`Value`

The amount of gold to unlock

#### Returns

`CeloTransactionObject`\<`void`\>

***

### withdraw()

> **withdraw**: (`value`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:406](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L406)

Transfer released gold from the ReleaseGold instance back to beneficiary.

#### Parameters

##### value

`Value`

The requested gold amount

#### Returns

`CeloTransactionObject`\<`void`\>

***

### withdrawLockedGold()

> **withdrawLockedGold**: (`index`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:396](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L396)

Withdraw gold in the ReleaseGold instance that has been unlocked but not withdrawn.

#### Parameters

##### index

`Value`

The index of the pending locked gold withdrawal

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

### authorizeAttestationSigner()

> **authorizeAttestationSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:592](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L592)

Authorizes an address to sign attestation messages on behalf of the account.

#### Parameters

##### signer

`string`

The address of the attestation signing key to authorize.

##### proofOfSigningKeyPossession

`Signature`

The account address signed by the signer address.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

***

### authorizeValidatorSigner()

> **authorizeValidatorSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:503](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L503)

Authorizes an address to sign validation messages on behalf of the account.

#### Parameters

##### signer

`string`

The address of the validator signing key to authorize.

##### proofOfSigningKeyPossession

`Signature`

The account address signed by the signer address.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

***

### authorizeValidatorSignerAndBls()

> **authorizeValidatorSignerAndBls**(`signer`, `proofOfSigningKeyPossession`, `blsPublicKey`, `blsPop`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:554](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L554)

Authorizes an address to sign consensus messages on behalf of the contract's account. Also switch BLS key at the same time.

#### Parameters

##### signer

`string`

The address of the signing key to authorize.

##### proofOfSigningKeyPossession

`Signature`

The contract's account address signed by the signer address.

##### blsPublicKey

`string`

The BLS public key that the validator is using for consensus, should pass proof
  of possession. 48 bytes.

##### blsPop

`string`

The BLS public key proof-of-possession, which consists of a signature on the
  account address. 96 bytes.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

***

### authorizeVoteSigner()

> **authorizeVoteSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:482](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L482)

Authorizes an address to sign votes on behalf of the account.

#### Parameters

##### signer

`string`

The address of the vote signing key to authorize.

##### proofOfSigningKeyPossession

`Signature`

The account address signed by the signer address.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

***

### getHumanReadableReleaseSchedule()

> **getHumanReadableReleaseSchedule**(): `Promise`\<\{ `amountReleasedPerPeriod`: `BigNumber`; `numReleasePeriods`: `number`; `releaseCliff`: `string`; `releasePeriod`: `string`; `releaseStartTime`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L88)

Returns the underlying Release schedule of the ReleaseGold contract

#### Returns

`Promise`\<\{ `amountReleasedPerPeriod`: `BigNumber`; `numReleasePeriods`: `number`; `releaseCliff`: `string`; `releasePeriod`: `string`; `releaseStartTime`: `string`; \}\>

A ReleaseSchedule.

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"BeneficiarySet"` | `"CanExpireSet"` | `"DistributionLimitSet"` | `"LiquidityProvisionSet"` | `"ReleaseGoldInstanceCreated"` | `"ReleaseGoldInstanceDestroyed"` | `"ReleaseScheduleRevoked"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`getPastEvents`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#getpastevents)

***

### getReleasedBalanceAtRevoke()

> **getReleasedBalanceAtRevoke**(): `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:226](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L226)

Returns the balance of released gold when the grant was revoked

#### Returns

`Promise`\<`string`\>

The balance at revocation time. 0 can also indicate not revoked.

***

### getReleaseSchedule()

> **getReleaseSchedule**(): `Promise`\<`ReleaseSchedule`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L72)

Returns the underlying Release schedule of the ReleaseGold contract

#### Returns

`Promise`\<`ReleaseSchedule`\>

A ReleaseSchedule.

***

### getRevocationInfo()

> **getRevocationInfo**(): `Promise`\<`RevocationInfo`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:176](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L176)

Returns the underlying Revocation Info of the ReleaseGold contract

#### Returns

`Promise`\<`RevocationInfo`\>

A RevocationInfo struct.

***

### getRevokeTime()

> **getRevokeTime**(): `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:217](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L217)

Returns the time at which the release schedule was revoked

#### Returns

`Promise`\<`number`\>

The timestamp of the release schedule revocation

***

### isRevocable()

> **isRevocable**(): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L202)

Indicates if the release grant is revocable or not

#### Returns

`Promise`\<`boolean`\>

A boolean indicating revocable releasing (true) or non-revocable(false).

***

### relockGold()

> **relockGold**(`value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:352](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L352)

Relocks gold in the ReleaseGold instance that has been unlocked but not withdrawn.

#### Parameters

##### value

`Value`

The value to relock from the specified pending withdrawal.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

***

### ~~revoke()~~

> **revoke**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:682](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L682)

Revokes value from pending/active aggregate

#### Parameters

##### account

`string`

The account to revoke from.

##### group

`string`

The group to revoke the vote for.

##### value

`BigNumber`

The amount of gold to revoke.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

#### Deprecated

prefer revokeValueFromVotes

***

### ~~revokeActive()~~

> **revokeActive**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:648](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L648)

Revokes active votes

#### Parameters

##### account

`string`

The account to revoke from.

##### group

`string`

The group to revoke the vote for.

##### value

`BigNumber`

The amount of gold to revoke.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Deprecated

Prefer revokeActiveVotes

***

### revokeActiveVotes()

> **revokeActiveVotes**(`group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:672](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L672)

Revokes active votes

#### Parameters

##### group

`string`

The group to revoke the vote for.

##### value

`BigNumber`

The amount of gold to revoke.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### revokeAllVotesForAllGroups()

> **revokeAllVotesForAllGroups**(): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:730](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L730)

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

***

### revokeAllVotesForGroup()

> **revokeAllVotesForGroup**(`group`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:712](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L712)

#### Parameters

##### group

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

***

### ~~revokePending()~~

> **revokePending**(`account`, `group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:614](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L614)

Revokes pending votes

#### Parameters

##### account

`string`

The account to revoke from.

##### group

`string`

##### value

`BigNumber`

The amount of gold to revoke.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Deprecated

prefer revokePendingVotes

***

### revokePendingVotes()

> **revokePendingVotes**(`group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:638](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L638)

Revokes pending votes

#### Parameters

##### group

`string`

##### value

`BigNumber`

The amount of gold to revoke.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### revokeValueFromVotes()

> **revokeValueFromVotes**(`group`, `value`): `Promise`\<`CeloTransactionObject`\<`void`\>[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:709](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L709)

Revokes value from pending/active aggregate

#### Parameters

##### group

`string`

The group to revoke the vote for.

##### value

`BigNumber`

The amount of gold to revoke.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>[]\>

***

### unlockAllGold()

> **unlockAllGold**(): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/ReleaseGold.ts:341](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/ReleaseGold.ts#L341)

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### version()

> **version**(): `Promise`\<`never`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<`never`\>

#### Inherited from

[`BaseWrapperForGoverning`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md).[`version`](../../BaseWrapperForGoverning/classes/BaseWrapperForGoverning.md#version)
