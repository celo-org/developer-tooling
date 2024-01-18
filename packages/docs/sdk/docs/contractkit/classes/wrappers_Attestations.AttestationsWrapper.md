[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Attestations](../modules/wrappers_Attestations.md) / AttestationsWrapper

# Class: AttestationsWrapper

[wrappers/Attestations](../modules/wrappers_Attestations.md).AttestationsWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`Attestations`\>

  ↳ **`AttestationsWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Attestations.AttestationsWrapper.md#constructor)

### Properties

- [attestationExpiryBlocks](wrappers_Attestations.AttestationsWrapper.md#attestationexpiryblocks)
- [attestationRequestFees](wrappers_Attestations.AttestationsWrapper.md#attestationrequestfees)
- [eventTypes](wrappers_Attestations.AttestationsWrapper.md#eventtypes)
- [events](wrappers_Attestations.AttestationsWrapper.md#events)
- [getAttestationIssuers](wrappers_Attestations.AttestationsWrapper.md#getattestationissuers)
- [getAttestationStat](wrappers_Attestations.AttestationsWrapper.md#getattestationstat)
- [getAttestationState](wrappers_Attestations.AttestationsWrapper.md#getattestationstate)
- [getPendingWithdrawals](wrappers_Attestations.AttestationsWrapper.md#getpendingwithdrawals)
- [getUnselectedRequest](wrappers_Attestations.AttestationsWrapper.md#getunselectedrequest)
- [lookupAccountsForIdentifier](wrappers_Attestations.AttestationsWrapper.md#lookupaccountsforidentifier)
- [methodIds](wrappers_Attestations.AttestationsWrapper.md#methodids)
- [selectIssuersWaitBlocks](wrappers_Attestations.AttestationsWrapper.md#selectissuerswaitblocks)
- [withdraw](wrappers_Attestations.AttestationsWrapper.md#withdraw)

### Accessors

- [address](wrappers_Attestations.AttestationsWrapper.md#address)

### Methods

- [approveAttestationFee](wrappers_Attestations.AttestationsWrapper.md#approveattestationfee)
- [getAttestationFeeRequired](wrappers_Attestations.AttestationsWrapper.md#getattestationfeerequired)
- [getConfig](wrappers_Attestations.AttestationsWrapper.md#getconfig)
- [getHumanReadableConfig](wrappers_Attestations.AttestationsWrapper.md#gethumanreadableconfig)
- [getPastEvents](wrappers_Attestations.AttestationsWrapper.md#getpastevents)
- [getVerifiedStatus](wrappers_Attestations.AttestationsWrapper.md#getverifiedstatus)
- [isAttestationExpired](wrappers_Attestations.AttestationsWrapper.md#isattestationexpired)
- [lookupIdentifiers](wrappers_Attestations.AttestationsWrapper.md#lookupidentifiers)
- [revoke](wrappers_Attestations.AttestationsWrapper.md#revoke)
- [version](wrappers_Attestations.AttestationsWrapper.md#version)

## Constructors

### constructor

• **new AttestationsWrapper**(`connection`, `contract`, `contracts`): [`AttestationsWrapper`](wrappers_Attestations.AttestationsWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Attestations` |
| `contracts` | `ContractsForAttestation` |

#### Returns

[`AttestationsWrapper`](wrappers_Attestations.AttestationsWrapper.md)

#### Overrides

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L64)

## Properties

### attestationExpiryBlocks

• **attestationExpiryBlocks**: (...`args`: []) => `Promise`\<`number`\>

Returns the time an attestation can be completable before it is considered expired

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

Returns the time an attestation can be completable before it is considered expired

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:75](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L75)

___

### attestationRequestFees

• **attestationRequestFees**: (...`args`: [arg0: string]) => `Promise`\<`BigNumber`\>

Returns the attestation request fee in a given currency.

**`Param`**

Token address.

#### Type declaration

▸ (`...args`): `Promise`\<`BigNumber`\>

Returns the attestation request fee in a given currency.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [arg0: string] |

##### Returns

`Promise`\<`BigNumber`\>

The fee as big number.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L86)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Attestations`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[eventTypes](wrappers_BaseWrapper.BaseWrapper.md#eventtypes)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AttestationCompleted` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `identifier`: `string` ; `issuer`: `string`  }\> |
| `AttestationExpiryBlocksSet` | `ContractEvent`\<`string`\> |
| `AttestationIssuerSelected` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `account`: `string` ; `attestationRequestFeeToken`: `string` ; `identifier`: `string` ; `issuer`: `string`  }\> |
| `AttestationRequestFeeSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `token`: `string` ; `value`: `string`  }\> |
| `AttestationsRequested` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `account`: `string` ; `attestationRequestFeeToken`: `string` ; `attestationsRequested`: `string` ; `identifier`: `string`  }\> |
| `AttestationsTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `fromAccount`: `string` ; `identifier`: `string` ; `toAccount`: `string`  }\> |
| `MaxAttestationsSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `SelectIssuersWaitBlocksSet` | `ContractEvent`\<`string`\> |
| `TransferApproval` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `boolean` ; `approved`: `boolean` ; `approver`: `string` ; `from`: `string` ; `indentifier`: `string` ; `to`: `string`  }\> |
| `Withdrawal` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `amount`: `string` ; `token`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getAttestationIssuers

• **getAttestationIssuers**: (...`args`: [identifier: string \| number[], account: string]) => `Promise`\<`string`[]\>

Returns the issuers of attestations for a phoneNumber/account combo

**`Param`**

Attestation identifier (e.g. phone hash)

**`Param`**

Address of the account

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

Returns the issuers of attestations for a phoneNumber/account combo

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [identifier: string \| number[], account: string] |

##### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:129](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L129)

___

### getAttestationStat

• **getAttestationStat**: (`identifier`: `string`, `account`: `string`) => `Promise`\<[`AttestationStat`](../interfaces/wrappers_Attestations.AttestationStat.md)\>

Returns the attestation stats of a identifer/account pair

**`Param`**

Attestation identifier (e.g. phone hash)

**`Param`**

Address of the account

#### Type declaration

▸ (`identifier`, `account`): `Promise`\<[`AttestationStat`](../interfaces/wrappers_Attestations.AttestationStat.md)\>

Returns the attestation stats of a identifer/account pair

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | Attestation identifier (e.g. phone hash) |
| `account` | `string` | Address of the account |

##### Returns

`Promise`\<[`AttestationStat`](../interfaces/wrappers_Attestations.AttestationStat.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:151](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L151)

___

### getAttestationState

• **getAttestationState**: (`identifier`: `string`, `account`: `string`, `issuer`: `string`) => `Promise`\<[`AttestationStateForIssuer`](../interfaces/wrappers_Attestations.AttestationStateForIssuer.md)\>

Returns the attestation state of a phone number/account/issuer tuple

**`Param`**

Attestation identifier (e.g. phone hash)

**`Param`**

Address of the account

#### Type declaration

▸ (`identifier`, `account`, `issuer`): `Promise`\<[`AttestationStateForIssuer`](../interfaces/wrappers_Attestations.AttestationStateForIssuer.md)\>

Returns the attestation state of a phone number/account/issuer tuple

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | Attestation identifier (e.g. phone hash) |
| `account` | `string` | Address of the account |
| `issuer` | `string` | - |

##### Returns

`Promise`\<[`AttestationStateForIssuer`](../interfaces/wrappers_Attestations.AttestationStateForIssuer.md)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L136)

___

### getPendingWithdrawals

• **getPendingWithdrawals**: (`token`: `string`, `account`: `string`) => `Promise`\<`BigNumber`\>

Returns the attestation signer for the specified account.

**`Param`**

The address of token rewards are accumulated in.

**`Param`**

The address of the account.

#### Type declaration

▸ (`token`, `account`): `Promise`\<`BigNumber`\>

Returns the attestation signer for the specified account.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | - |
| `account` | `string` | The address of token rewards are accumulated in. |

##### Returns

`Promise`\<`BigNumber`\>

The reward amount.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:224](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L224)

___

### getUnselectedRequest

• **getUnselectedRequest**: (...`args`: [identifier: string \| number[], account: string]) => `Promise`\<\{ `attestationRequestFeeToken`: `string` ; `attestationsRequested`: `number` ; `blockNumber`: `number`  }\>

**`Notice`**

Returns the unselected attestation request for an identifier/account pair, if any.

**`Param`**

Attestation identifier (e.g. phone hash)

**`Param`**

Address of the account

#### Type declaration

▸ (`...args`): `Promise`\<\{ `attestationRequestFeeToken`: `string` ; `attestationsRequested`: `number` ; `blockNumber`: `number`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [identifier: string \| number[], account: string] |

##### Returns

`Promise`\<\{ `attestationRequestFeeToken`: `string` ; `attestationsRequested`: `number` ; `blockNumber`: `number`  }\>

**`Notice`**

Returns the unselected attestation request for an identifier/account pair, if any.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:103](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L103)

___

### lookupAccountsForIdentifier

• **lookupAccountsForIdentifier**: (...`args`: [identifier: string \| number[]]) => `Promise`\<`string`[]\>

Returns the list of accounts associated with an identifier.

**`Param`**

Attestation identifier (e.g. phone hash)

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

Returns the list of accounts associated with an identifier.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [identifier: string \| number[]] |

##### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:272](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L272)

___

### methodIds

• **methodIds**: `Record`\<``"attestationRequestFees"`` \| ``"attestationExpiryBlocks"`` \| ``"pendingWithdrawals"`` \| ``"checkProofOfPossession"`` \| ``"fractionMulExp"`` \| ``"getBlockNumberFromHeader"`` \| ``"getEpochNumber"`` \| ``"getEpochNumberOfBlock"`` \| ``"getEpochSize"`` \| ``"getParentSealBitmap"`` \| ``"getVerifiedSealBitmapFromHeader"`` \| ``"hashHeader"`` \| ``"initialized"`` \| ``"isOwner"`` \| ``"minQuorumSize"`` \| ``"minQuorumSizeInCurrentSet"`` \| ``"numberValidatorsInCurrentSet"`` \| ``"numberValidatorsInSet"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"validatorSignerAddressFromCurrentSet"`` \| ``"validatorSignerAddressFromSet"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"withdraw"`` \| ``"maxAttestations"`` \| ``"selectIssuersWaitBlocks"`` \| ``"transferApprovals"`` \| ``"revoke"`` \| ``"getUnselectedRequest"`` \| ``"getAttestationIssuers"`` \| ``"getAttestationStats"`` \| ``"batchGetAttestationStats"`` \| ``"getAttestationState"`` \| ``"getCompletableAttestations"`` \| ``"getAttestationRequestFee"`` \| ``"setAttestationRequestFee"`` \| ``"setAttestationExpiryBlocks"`` \| ``"setSelectIssuersWaitBlocks"`` \| ``"setMaxAttestations"`` \| ``"getMaxAttestations"`` \| ``"validateAttestationCode"`` \| ``"lookupAccountsForIdentifier"`` \| ``"requireNAttestationsRequested"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### selectIssuersWaitBlocks

• **selectIssuersWaitBlocks**: (...`args`: []) => `Promise`\<`number`\>

#### Type declaration

▸ (`...args`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L92)

___

### withdraw

• **withdraw**: (...`args`: [token: string]) => `CeloTransactionObject`\<`void`\>

Allows issuers to withdraw accumulated attestation rewards

**`Param`**

The address of the token that will be withdrawn

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Allows issuers to withdraw accumulated attestation rewards

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [token: string] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:234](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L234)

## Accessors

### address

• `get` **address**(): `string`

Contract address

#### Returns

`string`

#### Inherited from

BaseWrapper.address

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L37)

## Methods

### approveAttestationFee

▸ **approveAttestationFee**(`attestationsRequested`): `Promise`\<`CeloTransactionObject`\<`boolean`\>\>

Approves the necessary amount of StableToken to request Attestations

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attestationsRequested` | `number` | The number of attestations to request |

#### Returns

`Promise`\<`CeloTransactionObject`\<`boolean`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:212](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L212)

___

### getAttestationFeeRequired

▸ **getAttestationFeeRequired**(`attestationsRequested`): `Promise`\<`BigNumber`\>

Calculates the amount of StableToken required to request Attestations

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attestationsRequested` | `number` | The number of attestations to request |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:200](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L200)

___

### getConfig

▸ **getConfig**(`tokens`): `Promise`\<[`AttestationsConfig`](../interfaces/wrappers_Attestations.AttestationsConfig.md)\>

Returns the current configuration parameters for the contract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | `string`[] | List of tokens used for attestation fees. use CeloTokens.getAddresses() to get |

#### Returns

`Promise`\<[`AttestationsConfig`](../interfaces/wrappers_Attestations.AttestationsConfig.md)\>

AttestationsConfig object

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:241](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L241)

___

### getHumanReadableConfig

▸ **getHumanReadableConfig**(`tokens`): `Promise`\<\{ `attestationExpiry`: `string` ; `attestationRequestFees`: [`AttestationsToken`](../interfaces/wrappers_Attestations.AttestationsToken.md)[] = config.attestationRequestFees }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | `string`[] | List of tokens used for attestation fees. use CeloTokens.getAddresses() to get |

#### Returns

`Promise`\<\{ `attestationExpiry`: `string` ; `attestationRequestFees`: [`AttestationsToken`](../interfaces/wrappers_Attestations.AttestationsToken.md)[] = config.attestationRequestFees }\>

AttestationsConfig object

**`Dev`**

Returns human readable configuration of the attestations contract

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:260](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L260)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"AttestationCompleted"`` \| ``"AttestationExpiryBlocksSet"`` \| ``"AttestationIssuerSelected"`` \| ``"AttestationRequestFeeSet"`` \| ``"AttestationsRequested"`` \| ``"AttestationsTransferred"`` \| ``"MaxAttestationsSet"`` \| ``"SelectIssuersWaitBlocksSet"`` \| ``"TransferApproval"`` \| ``"Withdrawal"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### getVerifiedStatus

▸ **getVerifiedStatus**(`identifier`, `account`, `numAttestationsRequired?`, `attestationThreshold?`): `Promise`\<\{ `completed`: `number` = 0; `isVerified`: `boolean` = false; `numAttestationsRemaining`: `number` = 0; `total`: `number` = 0 }\>

Returns the verified status of an identifier/account pair indicating whether the attestation
stats for a given pair are completed beyond a certain threshold of confidence (aka "verified")

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `identifier` | `string` | `undefined` | Attestation identifier (e.g. phone hash) |
| `account` | `string` | `undefined` | Address of the account |
| `numAttestationsRequired` | `number` | `3` | Optional number of attestations required. Will default to hardcoded value if absent. |
| `attestationThreshold` | `number` | `0.25` | Optional threshold for fraction attestations completed. Will default to hardcoded value if absent. |

#### Returns

`Promise`\<\{ `completed`: `number` = 0; `isVerified`: `boolean` = false; `numAttestationsRemaining`: `number` = 0; `total`: `number` = 0 }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L167)

___

### isAttestationExpired

▸ **isAttestationExpired**(`attestationRequestBlockNumber`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attestationRequestBlockNumber` | `number` | Attestation Request Block Number to be checked |

#### Returns

`Promise`\<`boolean`\>

**`Notice`**

Checks if attestation request is expired.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L117)

___

### lookupIdentifiers

▸ **lookupIdentifiers**(`identifiers`): `Promise`\<[`IdentifierLookupResult`](../modules/wrappers_Attestations.md#identifierlookupresult)\>

Lookup mapped wallet addresses for a given list of identifiers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifiers` | `string`[] | Attestation identifiers (e.g. phone hashes) |

#### Returns

`Promise`\<[`IdentifierLookupResult`](../modules/wrappers_Attestations.md#identifierlookupresult)\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:278](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L278)

___

### revoke

▸ **revoke**(`identifer`, `account`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifer` | `string` |
| `account` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Attestations.ts:314](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Attestations.ts#L314)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
