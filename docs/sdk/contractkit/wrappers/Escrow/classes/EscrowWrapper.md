[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Escrow](../README.md) / EscrowWrapper

# Class: EscrowWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L8)

Contract for handling reserve for stable currencies

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`Escrow`\>

## Constructors

### Constructor

> **new EscrowWrapper**(`connection`, `contract`): `EscrowWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`Escrow`

#### Returns

`EscrowWrapper`

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### escrowedPayments()

> **escrowedPayments**: (...`args`) => `Promise`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `5`: `string`; `6`: `string`; `7`: `string`; `8`: `string`; `expirySeconds`: `string`; `minAttestations`: `string`; `receivedIndex`: `string`; `recipientIdentifier`: `string`; `sender`: `string`; `sentIndex`: `string`; `timestamp`: `string`; `token`: `string`; `value`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L15)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `5`: `string`; `6`: `string`; `7`: `string`; `8`: `string`; `expirySeconds`: `string`; `minAttestations`: `string`; `receivedIndex`: `string`; `recipientIdentifier`: `string`; `sender`: `string`; `sentIndex`: `string`; `timestamp`: `string`; `token`: `string`; `value`: `string`; \}\>

An EscrowedPayment struct which holds information such
as; recipient identifier, sender address, token address, value, etc.

#### Notice

Gets the unique escrowed payment for a given payment ID

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

#### DefaultTrustedIssuerAdded

> **DefaultTrustedIssuerAdded**: `ContractEvent`\<`string`\>

#### DefaultTrustedIssuerRemoved

> **DefaultTrustedIssuerRemoved**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### Revocation

> **Revocation**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `by`: `string`; `identifier`: `string`; `paymentId`: `string`; `token`: `string`; `value`: `string`; \}\>

#### Transfer

> **Transfer**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `5`: `string`; `from`: `string`; `identifier`: `string`; `minAttestations`: `string`; `paymentId`: `string`; `token`: `string`; `value`: `string`; \}\>

#### TrustedIssuersSet

> **TrustedIssuersSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`[]; `paymentId`: `string`; `trustedIssuers`: `string`[]; \}\>

#### TrustedIssuersUnset

> **TrustedIssuersUnset**: `ContractEvent`\<`string`\>

#### Withdrawal

> **Withdrawal**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `identifier`: `string`; `paymentId`: `string`; `to`: `string`; `token`: `string`; `value`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Escrow`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### getDefaultTrustedIssuers()

> **getDefaultTrustedIssuers**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L37)

#### Parameters

##### args

...\[\]

#### Returns

`Promise`\<`string`[]\>

An array of addresses of trusted issuers.

#### Notice

Gets trusted issuers set as default for payments by `transfer` function.

***

### getReceivedPaymentIds()

> **getReceivedPaymentIds**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L23)

#### Parameters

##### args

...\[`string` \| `number`[]\]

#### Returns

`Promise`\<`string`[]\>

An array containing all the IDs of the Escrowed Payments that were received
by the specified receiver.

#### Notice

Gets array of all Escrowed Payments received by identifier.

***

### getSentPaymentIds()

> **getSentPaymentIds**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L31)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`string`[]\>

An array containing all the IDs of the Escrowed Payments that were sent by the
specified sender.

#### Notice

Gets array of all Escrowed Payment IDs sent by sender.

***

### getTrustedIssuersPerPayment()

> **getTrustedIssuersPerPayment**: (...`args`) => `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L44)

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`string`[]\>

An array of addresses of trusted issuers set for an escrowed payment.

#### Notice

Gets array of all trusted issuers set per paymentId.

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"isOwner"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"transferOwnership"` \| `"initialize"` \| `"withdraw"` \| `"getVersionNumber"` \| `"revoke"` \| `"registryContract"` \| `"MAX_TRUSTED_ISSUERS_PER_PAYMENT"` \| `"defaultTrustedIssuers"` \| `"escrowedPayments"` \| `"receivedPaymentIds"` \| `"sentPaymentIds"` \| `"trustedIssuersPerPayment"` \| `"addDefaultTrustedIssuer"` \| `"removeDefaultTrustedIssuer"` \| `"transfer"` \| `"transferWithTrustedIssuers"` \| `"getReceivedPaymentIds"` \| `"getSentPaymentIds"` \| `"getTrustedIssuersPerPayment"` \| `"getDefaultTrustedIssuers"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### revoke()

> **revoke**: (`paymentId`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:97](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L97)

#### Parameters

##### paymentId

`string`

The ID for the EscrowedPayment struct that contains all relevant information.

#### Returns

`CeloTransactionObject`\<`boolean`\>

#### Notice

Revokes tokens for a sender who is redeeming a payment after it has expired.

#### Dev

Throws if 'token' or 'value' is 0.

#### Dev

Throws if msg.sender is not the sender of payment.

#### Dev

Throws if redeem time hasn't been reached yet.

***

### transfer()

> **transfer**: (`identifier`, `token`, `value`, `expirySeconds`, `paymentId`, `minAttestations`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L64)

#### Parameters

##### identifier

`string`

The hashed identifier of a user to transfer to.

##### token

`string`

The token to be transferred.

##### value

The amount to be transferred.

`string` | `number`

##### expirySeconds

`number`

The number of seconds before the sender can revoke the payment.

##### paymentId

`string`

The address of the temporary wallet associated with this payment. Users must
       prove ownership of the corresponding private key to withdraw from escrow.

##### minAttestations

`number`

The min number of attestations required to withdraw the payment.

#### Returns

`CeloTransactionObject`\<`boolean`\>

True if transfer succeeded.

#### Notice

Transfer tokens to a specific user. Supports both identity with privacy (an empty
        identifier and 0 minAttestations) and without (with identifier and minAttestations).
        Sets trustedIssuers to the issuers listed in `defaultTrustedIssuers`.
        (To override this and set custom trusted issuers, use `transferWithTrustedIssuers`.)

#### Dev

Throws if 'token' or 'value' is 0.

#### Dev

Throws if identifier is null and minAttestations > 0.

#### Dev

If minAttestations is 0, trustedIssuers will be set to empty list.

#### Dev

msg.sender needs to have already approved this contract to transfer

***

### transferWithTrustedIssuers()

> **transferWithTrustedIssuers**: (`identifier`, `token`, `value`, `expirySeconds`, `paymentId`, `minAttestations`, `trustedIssuers`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L121)

#### Parameters

##### identifier

`string`

The hashed identifier of a user to transfer to.

##### token

`string`

The token to be transferred.

##### value

The amount to be transferred.

`string` | `number`

##### expirySeconds

`number`

The number of seconds before the sender can revoke the payment.

##### paymentId

`string`

The address of the temporary wallet associated with this payment. Users must
       prove ownership of the corresponding private key to withdraw from escrow.

##### minAttestations

`number`

The min number of attestations required to withdraw the payment.

##### trustedIssuers

`string`[]

Array of issuers whose attestations in FederatedAttestations.sol
       will be accepted to prove ownership over an identifier.

#### Returns

`CeloTransactionObject`\<`boolean`\>

True if transfer succeeded.

#### Notice

Transfer tokens to a specific user. Supports both identity with privacy (an empty
        identifier and 0 minAttestations) and without (with identifier
        and attestations completed by trustedIssuers).

#### Dev

Throws if 'token' or 'value' is 0.

#### Dev

Throws if identifier is null and minAttestations > 0.

#### Dev

Throws if minAttestations == 0 but trustedIssuers are provided.

#### Dev

msg.sender needs to have already approved this contract to transfer.

***

### withdraw()

> **withdraw**: (`paymentId`, `v`, `r`, `s`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Escrow.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Escrow.ts#L83)

#### Parameters

##### paymentId

`string`

The ID for the EscrowedPayment struct that contains all relevant information.

##### v

The recovery id of the incoming ECDSA signature.

`string` | `number`

##### r

Output value r of the ECDSA signature.

`string` | `number`[]

##### s

Output value s of the ECDSA signature.

`string` | `number`[]

#### Returns

`CeloTransactionObject`\<`boolean`\>

True if withdraw succeeded.

#### Notice

Withdraws tokens for a verified user.

#### Dev

Throws if 'token' or 'value' is 0.

#### Dev

Throws if msg.sender does not prove ownership of the withdraw key.

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

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"allEvents"` | `"Withdrawal"` | `"DefaultTrustedIssuerAdded"` | `"DefaultTrustedIssuerRemoved"` | `"Revocation"` | `"Transfer"` | `"TrustedIssuersSet"` | `"TrustedIssuersUnset"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
