[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Escrow](../modules/wrappers_Escrow.md) / EscrowWrapper

# Class: EscrowWrapper

[wrappers/Escrow](../modules/wrappers_Escrow.md).EscrowWrapper

Contract for handling reserve for stable currencies

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`Escrow`\>

  ↳ **`EscrowWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Escrow.EscrowWrapper.md#constructor)

### Properties

- [escrowedPayments](wrappers_Escrow.EscrowWrapper.md#escrowedpayments)
- [eventTypes](wrappers_Escrow.EscrowWrapper.md#eventtypes)
- [events](wrappers_Escrow.EscrowWrapper.md#events)
- [getDefaultTrustedIssuers](wrappers_Escrow.EscrowWrapper.md#getdefaulttrustedissuers)
- [getReceivedPaymentIds](wrappers_Escrow.EscrowWrapper.md#getreceivedpaymentids)
- [getSentPaymentIds](wrappers_Escrow.EscrowWrapper.md#getsentpaymentids)
- [getTrustedIssuersPerPayment](wrappers_Escrow.EscrowWrapper.md#gettrustedissuersperpayment)
- [methodIds](wrappers_Escrow.EscrowWrapper.md#methodids)
- [revoke](wrappers_Escrow.EscrowWrapper.md#revoke)
- [transfer](wrappers_Escrow.EscrowWrapper.md#transfer)
- [transferWithTrustedIssuers](wrappers_Escrow.EscrowWrapper.md#transferwithtrustedissuers)
- [withdraw](wrappers_Escrow.EscrowWrapper.md#withdraw)

### Accessors

- [address](wrappers_Escrow.EscrowWrapper.md#address)

### Methods

- [getPastEvents](wrappers_Escrow.EscrowWrapper.md#getpastevents)
- [version](wrappers_Escrow.EscrowWrapper.md#version)

## Constructors

### constructor

• **new EscrowWrapper**(`connection`, `contract`): [`EscrowWrapper`](wrappers_Escrow.EscrowWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Escrow` |

#### Returns

[`EscrowWrapper`](wrappers_Escrow.EscrowWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### escrowedPayments

• **escrowedPayments**: (...`args`: [arg0: string]) => `Promise`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `5`: `string` ; `6`: `string` ; `7`: `string` ; `8`: `string` ; `expirySeconds`: `string` ; `minAttestations`: `string` ; `receivedIndex`: `string` ; `recipientIdentifier`: `string` ; `sender`: `string` ; `sentIndex`: `string` ; `timestamp`: `string` ; `token`: `string` ; `value`: `string`  }\>

**`Notice`**

Gets the unique escrowed payment for a given payment ID

**`Param`**

The ID of the payment to get.

#### Type declaration

▸ (`...args`): `Promise`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `5`: `string` ; `6`: `string` ; `7`: `string` ; `8`: `string` ; `expirySeconds`: `string` ; `minAttestations`: `string` ; `receivedIndex`: `string` ; `recipientIdentifier`: `string` ; `sender`: `string` ; `sentIndex`: `string` ; `timestamp`: `string` ; `token`: `string` ; `value`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [arg0: string] |

##### Returns

`Promise`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `5`: `string` ; `6`: `string` ; `7`: `string` ; `8`: `string` ; `expirySeconds`: `string` ; `minAttestations`: `string` ; `receivedIndex`: `string` ; `recipientIdentifier`: `string` ; `sender`: `string` ; `sentIndex`: `string` ; `timestamp`: `string` ; `token`: `string` ; `value`: `string`  }\>

An EscrowedPayment struct which holds information such
as; recipient identifier, sender address, token address, value, etc.

**`Notice`**

Gets the unique escrowed payment for a given payment ID

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L15)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Escrow`\>

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
| `DefaultTrustedIssuerAdded` | `ContractEvent`\<`string`\> |
| `DefaultTrustedIssuerRemoved` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `Revocation` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `by`: `string` ; `identifier`: `string` ; `paymentId`: `string` ; `token`: `string` ; `value`: `string`  }\> |
| `Transfer` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `5`: `string` ; `from`: `string` ; `identifier`: `string` ; `minAttestations`: `string` ; `paymentId`: `string` ; `token`: `string` ; `value`: `string`  }\> |
| `TrustedIssuersSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string`[] ; `paymentId`: `string` ; `trustedIssuers`: `string`[]  }\> |
| `TrustedIssuersUnset` | `ContractEvent`\<`string`\> |
| `Withdrawal` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `identifier`: `string` ; `paymentId`: `string` ; `to`: `string` ; `token`: `string` ; `value`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getDefaultTrustedIssuers

• **getDefaultTrustedIssuers**: (...`args`: []) => `Promise`\<`string`[]\>

**`Notice`**

Gets trusted issuers set as default for payments by `transfer` function.

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<`string`[]\>

An array of addresses of trusted issuers.

**`Notice`**

Gets trusted issuers set as default for payments by `transfer` function.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L37)

___

### getReceivedPaymentIds

• **getReceivedPaymentIds**: (...`args`: [identifier: string \| number[]]) => `Promise`\<`string`[]\>

**`Notice`**

Gets array of all Escrowed Payments received by identifier.

**`Param`**

The hash of an identifier of the receiver of the escrowed payment.

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [identifier: string \| number[]] |

##### Returns

`Promise`\<`string`[]\>

An array containing all the IDs of the Escrowed Payments that were received
by the specified receiver.

**`Notice`**

Gets array of all Escrowed Payments received by identifier.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L23)

___

### getSentPaymentIds

• **getSentPaymentIds**: (...`args`: [sender: string]) => `Promise`\<`string`[]\>

**`Notice`**

Gets array of all Escrowed Payment IDs sent by sender.

**`Param`**

The address of the sender of the escrowed payments.

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [sender: string] |

##### Returns

`Promise`\<`string`[]\>

An array containing all the IDs of the Escrowed Payments that were sent by the
specified sender.

**`Notice`**

Gets array of all Escrowed Payment IDs sent by sender.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L31)

___

### getTrustedIssuersPerPayment

• **getTrustedIssuersPerPayment**: (...`args`: [paymentId: string]) => `Promise`\<`string`[]\>

**`Notice`**

Gets array of all trusted issuers set per paymentId.

**`Param`**

The ID of the payment to get.

#### Type declaration

▸ (`...args`): `Promise`\<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [paymentId: string] |

##### Returns

`Promise`\<`string`[]\>

An array of addresses of trusted issuers set for an escrowed payment.

**`Notice`**

Gets array of all trusted issuers set per paymentId.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L44)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"withdraw"`` \| ``"revoke"`` \| ``"registryContract"`` \| ``"MAX_TRUSTED_ISSUERS_PER_PAYMENT"`` \| ``"defaultTrustedIssuers"`` \| ``"escrowedPayments"`` \| ``"receivedPaymentIds"`` \| ``"sentPaymentIds"`` \| ``"trustedIssuersPerPayment"`` \| ``"addDefaultTrustedIssuer"`` \| ``"removeDefaultTrustedIssuer"`` \| ``"transfer"`` \| ``"transferWithTrustedIssuers"`` \| ``"getReceivedPaymentIds"`` \| ``"getSentPaymentIds"`` \| ``"getTrustedIssuersPerPayment"`` \| ``"getDefaultTrustedIssuers"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### revoke

• **revoke**: (`paymentId`: `string`) => `CeloTransactionObject`\<`boolean`\>

**`Notice`**

Revokes tokens for a sender who is redeeming a payment after it has expired.

**`Param`**

The ID for the EscrowedPayment struct that contains all relevant information.

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if msg.sender is not the sender of payment.

**`Dev`**

Throws if redeem time hasn't been reached yet.

#### Type declaration

▸ (`paymentId`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paymentId` | `string` | The ID for the EscrowedPayment struct that contains all relevant information. |

##### Returns

`CeloTransactionObject`\<`boolean`\>

**`Notice`**

Revokes tokens for a sender who is redeeming a payment after it has expired.

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if msg.sender is not the sender of payment.

**`Dev`**

Throws if redeem time hasn't been reached yet.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L97)

___

### transfer

• **transfer**: (`identifier`: `string`, `token`: `string`, `value`: `string` \| `number`, `expirySeconds`: `number`, `paymentId`: `string`, `minAttestations`: `number`) => `CeloTransactionObject`\<`boolean`\>

**`Notice`**

Transfer tokens to a specific user. Supports both identity with privacy (an empty
        identifier and 0 minAttestations) and without (with identifier and minAttestations).
        Sets trustedIssuers to the issuers listed in `defaultTrustedIssuers`.
        (To override this and set custom trusted issuers, use `transferWithTrustedIssuers`.)

**`Param`**

The hashed identifier of a user to transfer to.

**`Param`**

The token to be transferred.

**`Param`**

The amount to be transferred.

**`Param`**

The number of seconds before the sender can revoke the payment.

**`Param`**

The address of the temporary wallet associated with this payment. Users must
       prove ownership of the corresponding private key to withdraw from escrow.

**`Param`**

The min number of attestations required to withdraw the payment.

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if identifier is null and minAttestations > 0.

**`Dev`**

If minAttestations is 0, trustedIssuers will be set to empty list.

**`Dev`**

msg.sender needs to have already approved this contract to transfer

#### Type declaration

▸ (`identifier`, `token`, `value`, `expirySeconds`, `paymentId`, `minAttestations`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | The hashed identifier of a user to transfer to. |
| `token` | `string` | The token to be transferred. |
| `value` | `string` \| `number` | The amount to be transferred. |
| `expirySeconds` | `number` | The number of seconds before the sender can revoke the payment. |
| `paymentId` | `string` | The address of the temporary wallet associated with this payment. Users must prove ownership of the corresponding private key to withdraw from escrow. |
| `minAttestations` | `number` | The min number of attestations required to withdraw the payment. |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True if transfer succeeded.

**`Notice`**

Transfer tokens to a specific user. Supports both identity with privacy (an empty
        identifier and 0 minAttestations) and without (with identifier and minAttestations).
        Sets trustedIssuers to the issuers listed in `defaultTrustedIssuers`.
        (To override this and set custom trusted issuers, use `transferWithTrustedIssuers`.)

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if identifier is null and minAttestations > 0.

**`Dev`**

If minAttestations is 0, trustedIssuers will be set to empty list.

**`Dev`**

msg.sender needs to have already approved this contract to transfer

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L64)

___

### transferWithTrustedIssuers

• **transferWithTrustedIssuers**: (`identifier`: `string`, `token`: `string`, `value`: `string` \| `number`, `expirySeconds`: `number`, `paymentId`: `string`, `minAttestations`: `number`, `trustedIssuers`: `string`[]) => `CeloTransactionObject`\<`boolean`\>

**`Notice`**

Transfer tokens to a specific user. Supports both identity with privacy (an empty
        identifier and 0 minAttestations) and without (with identifier
        and attestations completed by trustedIssuers).

**`Param`**

The hashed identifier of a user to transfer to.

**`Param`**

The token to be transferred.

**`Param`**

The amount to be transferred.

**`Param`**

The number of seconds before the sender can revoke the payment.

**`Param`**

The address of the temporary wallet associated with this payment. Users must
       prove ownership of the corresponding private key to withdraw from escrow.

**`Param`**

The min number of attestations required to withdraw the payment.

**`Param`**

Array of issuers whose attestations in FederatedAttestations.sol
       will be accepted to prove ownership over an identifier.

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if identifier is null and minAttestations > 0.

**`Dev`**

Throws if minAttestations == 0 but trustedIssuers are provided.

**`Dev`**

msg.sender needs to have already approved this contract to transfer.

#### Type declaration

▸ (`identifier`, `token`, `value`, `expirySeconds`, `paymentId`, `minAttestations`, `trustedIssuers`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | The hashed identifier of a user to transfer to. |
| `token` | `string` | The token to be transferred. |
| `value` | `string` \| `number` | The amount to be transferred. |
| `expirySeconds` | `number` | The number of seconds before the sender can revoke the payment. |
| `paymentId` | `string` | The address of the temporary wallet associated with this payment. Users must prove ownership of the corresponding private key to withdraw from escrow. |
| `minAttestations` | `number` | The min number of attestations required to withdraw the payment. |
| `trustedIssuers` | `string`[] | Array of issuers whose attestations in FederatedAttestations.sol will be accepted to prove ownership over an identifier. |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True if transfer succeeded.

**`Notice`**

Transfer tokens to a specific user. Supports both identity with privacy (an empty
        identifier and 0 minAttestations) and without (with identifier
        and attestations completed by trustedIssuers).

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if identifier is null and minAttestations > 0.

**`Dev`**

Throws if minAttestations == 0 but trustedIssuers are provided.

**`Dev`**

msg.sender needs to have already approved this contract to transfer.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L121)

___

### withdraw

• **withdraw**: (`paymentId`: `string`, `v`: `string` \| `number`, `r`: `string` \| `number`[], `s`: `string` \| `number`[]) => `CeloTransactionObject`\<`boolean`\>

**`Notice`**

Withdraws tokens for a verified user.

**`Param`**

The ID for the EscrowedPayment struct that contains all relevant information.

**`Param`**

The recovery id of the incoming ECDSA signature.

**`Param`**

Output value r of the ECDSA signature.

**`Param`**

Output value s of the ECDSA signature.

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if msg.sender does not prove ownership of the withdraw key.

#### Type declaration

▸ (`paymentId`, `v`, `r`, `s`): `CeloTransactionObject`\<`boolean`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paymentId` | `string` | The ID for the EscrowedPayment struct that contains all relevant information. |
| `v` | `string` \| `number` | The recovery id of the incoming ECDSA signature. |
| `r` | `string` \| `number`[] | Output value r of the ECDSA signature. |
| `s` | `string` \| `number`[] | Output value s of the ECDSA signature. |

##### Returns

`CeloTransactionObject`\<`boolean`\>

True if withdraw succeeded.

**`Notice`**

Withdraws tokens for a verified user.

**`Dev`**

Throws if 'token' or 'value' is 0.

**`Dev`**

Throws if msg.sender does not prove ownership of the withdraw key.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Escrow.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L83)

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

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` \| ``"Withdrawal"`` \| ``"DefaultTrustedIssuerAdded"`` \| ``"DefaultTrustedIssuerRemoved"`` \| ``"Revocation"`` \| ``"Transfer"`` \| ``"TrustedIssuersSet"`` \| ``"TrustedIssuersUnset"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
