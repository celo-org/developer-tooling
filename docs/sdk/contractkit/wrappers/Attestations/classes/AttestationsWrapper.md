[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Attestations](../README.md) / AttestationsWrapper

# Class: AttestationsWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L63)

**`Internal`**

-- use its children

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`Attestations`\>

## Constructors

### Constructor

> **new AttestationsWrapper**(`connection`, `contract`, `contracts`): `AttestationsWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L64)

#### Parameters

##### connection

`Connection`

##### contract

`Attestations`

##### contracts

`ContractsForAttestation`

#### Returns

`AttestationsWrapper`

#### Overrides

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### attestationExpiryBlocks()

> **attestationExpiryBlocks**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L75)

Returns the time an attestation can be completable before it is considered expired

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

***

### attestationRequestFees()

> **attestationRequestFees**: (...`args`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L86)

Returns the attestation request fee in a given currency.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`BigNumber`\>

The fee as big number.

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

#### AttestationCompleted

> **AttestationCompleted**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `identifier`: `string`; `issuer`: `string`; \}\>

#### AttestationExpiryBlocksSet

> **AttestationExpiryBlocksSet**: `ContractEvent`\<`string`\>

#### AttestationIssuerSelected

> **AttestationIssuerSelected**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `account`: `string`; `attestationRequestFeeToken`: `string`; `identifier`: `string`; `issuer`: `string`; \}\>

#### AttestationRequestFeeSet

> **AttestationRequestFeeSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `token`: `string`; `value`: `string`; \}\>

#### AttestationsRequested

> **AttestationsRequested**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `account`: `string`; `attestationRequestFeeToken`: `string`; `attestationsRequested`: `string`; `identifier`: `string`; \}\>

#### AttestationsTransferred

> **AttestationsTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `fromAccount`: `string`; `identifier`: `string`; `toAccount`: `string`; \}\>

#### MaxAttestationsSet

> **MaxAttestationsSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### SelectIssuersWaitBlocksSet

> **SelectIssuersWaitBlocksSet**: `ContractEvent`\<`string`\>

#### TransferApproval

> **TransferApproval**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `boolean`; `approved`: `boolean`; `approver`: `string`; `from`: `string`; `indentifier`: `string`; `to`: `string`; \}\>

#### Withdrawal

> **Withdrawal**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `amount`: `string`; `token`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Attestations`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### getAttestationIssuers()

> **getAttestationIssuers**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:129](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L129)

Returns the issuers of attestations for a phoneNumber/account combo

#### Parameters

##### args

...\[`string` \| `number`[], `string`\]

#### Returns

`Promise`\<`string`[]\>

***

### getAttestationStat()

> **getAttestationStat**: (`identifier`, `account`) => `Promise`\<[`AttestationStat`](../interfaces/AttestationStat.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:151](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L151)

Returns the attestation stats of a identifer/account pair

#### Parameters

##### identifier

`string`

Attestation identifier (e.g. phone hash)

##### account

`string`

Address of the account

#### Returns

`Promise`\<[`AttestationStat`](../interfaces/AttestationStat.md)\>

***

### getAttestationState()

> **getAttestationState**: (`identifier`, `account`, `issuer`) => `Promise`\<[`AttestationStateForIssuer`](../interfaces/AttestationStateForIssuer.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L136)

Returns the attestation state of a phone number/account/issuer tuple

#### Parameters

##### identifier

`string`

Attestation identifier (e.g. phone hash)

##### account

`string`

Address of the account

##### issuer

`string`

#### Returns

`Promise`\<[`AttestationStateForIssuer`](../interfaces/AttestationStateForIssuer.md)\>

***

### getPendingWithdrawals()

> **getPendingWithdrawals**: (`token`, `account`) => `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:224](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L224)

Returns the attestation signer for the specified account.

#### Parameters

##### token

`string`

##### account

`string`

The address of token rewards are accumulated in.

#### Returns

`Promise`\<`BigNumber`\>

The reward amount.

***

### getUnselectedRequest()

> **getUnselectedRequest**: (...`args`) => `Promise`\<\{ `attestationRequestFeeToken`: `string`; `attestationsRequested`: `number`; `blockNumber`: `number`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L103)

#### Parameters

##### args

...\[`string` \| `number`[], `string`\]

#### Returns

`Promise`\<\{ `attestationRequestFeeToken`: `string`; `attestationsRequested`: `number`; `blockNumber`: `number`; \}\>

#### Notice

Returns the unselected attestation request for an identifier/account pair, if any.

***

### lookupAccountsForIdentifier()

> **lookupAccountsForIdentifier**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L272)

Returns the list of accounts associated with an identifier.

#### Parameters

##### args

...\[`string` \| `number`[]\]

#### Returns

`Promise`\<`string`[]\>

***

### methodIds

> **methodIds**: `Record`\<`"attestationRequestFees"` \| `"attestationExpiryBlocks"` \| `"pendingWithdrawals"` \| `"checkProofOfPossession"` \| `"fractionMulExp"` \| `"getBlockNumberFromHeader"` \| `"getEpochNumber"` \| `"getEpochNumberOfBlock"` \| `"getEpochSize"` \| `"getParentSealBitmap"` \| `"getVerifiedSealBitmapFromHeader"` \| `"hashHeader"` \| `"initialized"` \| `"isOwner"` \| `"minQuorumSize"` \| `"minQuorumSizeInCurrentSet"` \| `"numberValidatorsInCurrentSet"` \| `"numberValidatorsInSet"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"validatorSignerAddressFromCurrentSet"` \| `"validatorSignerAddressFromSet"` \| `"initialize"` \| `"withdraw"` \| `"getVersionNumber"` \| `"maxAttestations"` \| `"selectIssuersWaitBlocks"` \| `"transferApprovals"` \| `"revoke"` \| `"getUnselectedRequest"` \| `"getAttestationIssuers"` \| `"getAttestationStats"` \| `"batchGetAttestationStats"` \| `"getAttestationState"` \| `"getCompletableAttestations"` \| `"getAttestationRequestFee"` \| `"setAttestationRequestFee"` \| `"setAttestationExpiryBlocks"` \| `"setSelectIssuersWaitBlocks"` \| `"setMaxAttestations"` \| `"getMaxAttestations"` \| `"validateAttestationCode"` \| `"lookupAccountsForIdentifier"` \| `"requireNAttestationsRequested"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### selectIssuersWaitBlocks()

> **selectIssuersWaitBlocks**: (...`args`) => `Promise`\<`number`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L92)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`number`\>

***

### withdraw()

> **withdraw**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:234](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L234)

Allows issuers to withdraw accumulated attestation rewards

#### Parameters

##### args

...\[`string`\]

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

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`address`](../../BaseWrapper/classes/BaseWrapper.md#address)

## Methods

### approveAttestationFee()

> **approveAttestationFee**(`attestationsRequested`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L212)

Approves the necessary amount of StableToken to request Attestations

#### Parameters

##### attestationsRequested

`number`

The number of attestations to request

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

***

### getAttestationFeeRequired()

> **getAttestationFeeRequired**(`attestationsRequested`): `Promise`\<`BigNumber`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:200](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L200)

Calculates the amount of StableToken required to request Attestations

#### Parameters

##### attestationsRequested

`number`

The number of attestations to request

#### Returns

`Promise`\<`BigNumber`\>

***

### getConfig()

> **getConfig**(`tokens`): `Promise`\<[`AttestationsConfig`](../interfaces/AttestationsConfig.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:241](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L241)

Returns the current configuration parameters for the contract.

#### Parameters

##### tokens

`string`[]

List of tokens used for attestation fees. use CeloTokens.getAddresses() to get

#### Returns

`Promise`\<[`AttestationsConfig`](../interfaces/AttestationsConfig.md)\>

AttestationsConfig object

***

### getHumanReadableConfig()

> **getHumanReadableConfig**(`tokens`): `Promise`\<\{ `attestationExpiry`: `string`; `attestationRequestFees`: [`AttestationsToken`](../interfaces/AttestationsToken.md)[]; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:260](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L260)

#### Parameters

##### tokens

`string`[]

List of tokens used for attestation fees. use CeloTokens.getAddresses() to get

#### Returns

`Promise`\<\{ `attestationExpiry`: `string`; `attestationRequestFees`: [`AttestationsToken`](../interfaces/AttestationsToken.md)[]; \}\>

AttestationsConfig object

#### Dev

Returns human readable configuration of the attestations contract

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"AttestationCompleted"` | `"AttestationExpiryBlocksSet"` | `"AttestationIssuerSelected"` | `"AttestationRequestFeeSet"` | `"AttestationsRequested"` | `"AttestationsTransferred"` | `"MaxAttestationsSet"` | `"SelectIssuersWaitBlocksSet"` | `"TransferApproval"` | `"Withdrawal"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### getVerifiedStatus()

> **getVerifiedStatus**(`identifier`, `account`, `numAttestationsRequired`, `attestationThreshold`): `Promise`\<\{ `completed`: `number`; `isVerified`: `boolean`; `numAttestationsRemaining`: `number`; `total`: `number`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L167)

Returns the verified status of an identifier/account pair indicating whether the attestation
stats for a given pair are completed beyond a certain threshold of confidence (aka "verified")

#### Parameters

##### identifier

`string`

Attestation identifier (e.g. phone hash)

##### account

`string`

Address of the account

##### numAttestationsRequired

`number` = `3`

Optional number of attestations required.  Will default to
 hardcoded value if absent.

##### attestationThreshold

`number` = `0.25`

Optional threshold for fraction attestations completed. Will
 default to hardcoded value if absent.

#### Returns

`Promise`\<\{ `completed`: `number`; `isVerified`: `boolean`; `numAttestationsRemaining`: `number`; `total`: `number`; \}\>

***

### isAttestationExpired()

> **isAttestationExpired**(`attestationRequestBlockNumber`): `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L117)

#### Parameters

##### attestationRequestBlockNumber

`number`

Attestation Request Block Number to be checked

#### Returns

`Promise`\<`boolean`\>

#### Notice

Checks if attestation request is expired.

***

### lookupIdentifiers()

> **lookupIdentifiers**(`identifiers`): `Promise`\<[`IdentifierLookupResult`](../type-aliases/IdentifierLookupResult.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:278](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L278)

Lookup mapped wallet addresses for a given list of identifiers

#### Parameters

##### identifiers

`string`[]

Attestation identifiers (e.g. phone hashes)

#### Returns

`Promise`\<[`IdentifierLookupResult`](../type-aliases/IdentifierLookupResult.md)\>

***

### revoke()

> **revoke**(`identifer`, `account`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Attestations.ts:314](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L314)

#### Parameters

##### identifer

`string`

##### account

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
