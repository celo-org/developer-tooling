[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/FederatedAttestations](../README.md) / FederatedAttestationsWrapper

# Class: FederatedAttestationsWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L6)

**`Internal`**

-- use its children

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`FederatedAttestations`\>

## Constructors

### Constructor

> **new FederatedAttestationsWrapper**(`connection`, `contract`): `FederatedAttestationsWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`FederatedAttestations`

#### Returns

`FederatedAttestationsWrapper`

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### batchRevokeAttestations()

> **batchRevokeAttestations**: (`issuer`, `identifiers`, `accounts`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L167)

#### Parameters

##### issuer

`string`

Address of the issuer of all attestations to be revoked

##### identifiers

`string`[]

Hash of the identifiers

##### accounts

`string`[]

Addresses of the accounts mapped to the identifiers
  at the same indices

#### Returns

`CeloTransactionObject`\<`void`\>

#### Notice

Revokes attestations [identifiers <-> accounts] from issuer

#### Dev

Throws if the number of identifiers and accounts is not the same

#### Dev

Throws if sender is not the issuer or currently registered signer of issuer

#### Dev

Throws if an attestation is not found for identifiers[i] <-> accounts[i]

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

#### AttestationRegistered

> **AttestationRegistered**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `5`: `string`; `account`: `string`; `identifier`: `string`; `issuedOn`: `string`; `issuer`: `string`; `publishedOn`: `string`; `signer`: `string`; \}\>

#### AttestationRevoked

> **AttestationRevoked**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `3`: `string`; `4`: `string`; `5`: `string`; `account`: `string`; `identifier`: `string`; `issuedOn`: `string`; `issuer`: `string`; `publishedOn`: `string`; `signer`: `string`; \}\>

#### EIP712DomainSeparatorSet

> **EIP712DomainSeparatorSet**: `ContractEvent`\<`string`\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`FederatedAttestations`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### getUniqueAttestationHash()

> **getUniqueAttestationHash**: (`identifier`, `issuer`, `account`, `signer`, `issuedOn`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L76)

#### Parameters

##### identifier

`string`

##### issuer

`string`

##### account

`string`

##### signer

`string`

##### issuedOn

`number`

#### Returns

`Promise`\<`string`\>

keccak 256 of abi encoded parameters

***

### lookupAttestations()

> **lookupAttestations**: (`identifier`, `trustedIssuers`) => `Promise`\<\{ `accounts`: `string`[]; `countsPerIssuer`: `string`[]; `issuedOns`: `string`[]; `publishedOns`: `string`[]; `signers`: `string`[]; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L38)

#### Parameters

##### identifier

`string`

Hash of the identifier

##### trustedIssuers

`string`[]

Array of n issuers whose attestations will be included

#### Returns

`Promise`\<\{ `accounts`: `string`[]; `countsPerIssuer`: `string`[]; `issuedOns`: `string`[]; `publishedOns`: `string`[]; `signers`: `string`[]; \}\>

countsPerIssuer Array of number of attestations returned per issuer
         For m (== sum([0])) found attestations:

#### Notice

Returns info about attestations for `identifier` produced by
   signers of `trustedIssuers`

#### Dev

Adds attestation info to the arrays in order of provided trustedIssuers

#### Dev

Expectation that only one attestation exists per (identifier, issuer, account)

***

### lookupIdentifiers()

> **lookupIdentifiers**: (`account`, `trustedIssuers`) => `Promise`\<\{ `countsPerIssuer`: `string`[]; `identifiers`: `string`[]; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L16)

#### Parameters

##### account

`string`

Address of the account

##### trustedIssuers

`string`[]

Array of n issuers whose identifier mappings will be used

#### Returns

`Promise`\<\{ `countsPerIssuer`: `string`[]; `identifiers`: `string`[]; \}\>

countsPerIssuer Array of number of identifiers returned per issuer

#### Notice

Returns identifiers mapped to `account` by signers of `trustedIssuers`

#### Dev

Adds identifier info to the arrays in order of provided trustedIssuers

#### Dev

Expectation that only one attestation exists per (identifier, issuer, account)

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"isOwner"` \| `"owner"` \| `"renounceOwnership"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"registryContract"` \| `"EIP712_OWNERSHIP_ATTESTATION_TYPEHASH"` \| `"MAX_ATTESTATIONS_PER_IDENTIFIER"` \| `"MAX_IDENTIFIERS_PER_ADDRESS"` \| `"addressToIdentifiers"` \| `"eip712DomainSeparator"` \| `"identifierToAttestations"` \| `"revokedAttestations"` \| `"registerAttestationAsIssuer"` \| `"registerAttestation"` \| `"revokeAttestation"` \| `"batchRevokeAttestations"` \| `"lookupAttestations"` \| `"lookupIdentifiers"` \| `"validateAttestationSig"` \| `"getUniqueAttestationHash"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### registerAttestationAsIssuer()

> **registerAttestationAsIssuer**: (`identifier`, `account`, `issuedOn`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L92)

#### Parameters

##### identifier

`string`

Hash of the identifier to be attested

##### account

`string`

Address of the account being mapped to the identifier

##### issuedOn

`number`

Time at which the issuer issued the attestation in Unix time

#### Returns

`CeloTransactionObject`\<`void`\>

#### Notice

Registers an attestation directly from the issuer

#### Dev

Attestation signer and issuer in storage is set to msg.sender

#### Dev

Throws if an attestation with the same (identifier, issuer, account) already exists

***

### revokeAttestation()

> **revokeAttestation**: (`identifier`, `issuer`, `account`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:148](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L148)

#### Parameters

##### identifier

`string`

Hash of the identifier to be revoked

##### issuer

`string`

Address of the attestation issuer

##### account

`string`

Address of the account mapped to the identifier

#### Returns

`CeloTransactionObject`\<`void`\>

#### Notice

Revokes an attestation

#### Dev

Throws if sender is not the issuer, signer, or account

***

### validateAttestationSig()

> **validateAttestationSig**: (`identifier`, `issuer`, `account`, `signer`, `issuedOn`, `v`, `r`, `s`) => `Promise`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L62)

#### Parameters

##### identifier

`string`

Hash of the identifier to be attested

##### issuer

`string`

Address of the attestation issuer

##### account

`string`

Address of the account being mapped to the identifier

##### signer

`string`

Address of the signer of the attestation

##### issuedOn

`number`

Time at which the issuer issued the attestation in Unix time

##### v

The recovery id of the incoming ECDSA signature

`string` | `number`

##### r

Output value r of the ECDSA signature

`string` | `number`[]

##### s

Output value s of the ECDSA signature

`string` | `number`[]

#### Returns

`Promise`\<`void`\>

#### Notice

Validates the given attestation and signature

#### Dev

Throws if attestation has been revoked

#### Dev

Throws if signer is not an authorized AttestationSigner of the issuer

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

`"OwnershipTransferred"` | `"allEvents"` | `"AttestationRegistered"` | `"AttestationRevoked"` | `"EIP712DomainSeparatorSet"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### registerAttestation()

> **registerAttestation**(`identifier`, `issuer`, `account`, `signer`, `issuedOn`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L110)

#### Parameters

##### identifier

`string`

Hash of the identifier to be attested

##### issuer

`string`

Address of the attestation issuer

##### account

`string`

Address of the account being mapped to the identifier

##### signer

`string`

Address of the signer of the attestation

##### issuedOn

`number`

Time at which the issuer issued the attestation in Unix time

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Notice

Generates a valid signature and registers the attestation

#### Dev

Throws if an attestation with the same (identifier, issuer, account) already exists

***

### version()

> **version**(): `Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)

#### Returns

`Promise`\<[`ContractVersion`](../../../versions/classes/ContractVersion.md)\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`version`](../../BaseWrapper/classes/BaseWrapper.md#version)
