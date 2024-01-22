[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/FederatedAttestations](../modules/wrappers_FederatedAttestations.md) / FederatedAttestationsWrapper

# Class: FederatedAttestationsWrapper

[wrappers/FederatedAttestations](../modules/wrappers_FederatedAttestations.md).FederatedAttestationsWrapper

-- use its children

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`FederatedAttestations`\>

  ↳ **`FederatedAttestationsWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#constructor)

### Properties

- [batchRevokeAttestations](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#batchrevokeattestations)
- [eventTypes](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#eventtypes)
- [events](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#events)
- [getUniqueAttestationHash](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#getuniqueattestationhash)
- [lookupAttestations](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#lookupattestations)
- [lookupIdentifiers](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#lookupidentifiers)
- [methodIds](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#methodids)
- [registerAttestationAsIssuer](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#registerattestationasissuer)
- [revokeAttestation](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#revokeattestation)
- [validateAttestationSig](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#validateattestationsig)

### Accessors

- [address](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#address)

### Methods

- [getPastEvents](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#getpastevents)
- [registerAttestation](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#registerattestation)
- [version](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md#version)

## Constructors

### constructor

• **new FederatedAttestationsWrapper**(`connection`, `contract`): [`FederatedAttestationsWrapper`](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `FederatedAttestations` |

#### Returns

[`FederatedAttestationsWrapper`](wrappers_FederatedAttestations.FederatedAttestationsWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### batchRevokeAttestations

• **batchRevokeAttestations**: (`issuer`: `string`, `identifiers`: `string`[], `accounts`: `string`[]) => `CeloTransactionObject`\<`void`\>

**`Notice`**

Revokes attestations [identifiers <-> accounts] from issuer

**`Param`**

Address of the issuer of all attestations to be revoked

**`Param`**

Hash of the identifiers

**`Param`**

Addresses of the accounts mapped to the identifiers
  at the same indices

**`Dev`**

Throws if the number of identifiers and accounts is not the same

**`Dev`**

Throws if sender is not the issuer or currently registered signer of issuer

**`Dev`**

Throws if an attestation is not found for identifiers[i] <-> accounts[i]

#### Type declaration

▸ (`issuer`, `identifiers`, `accounts`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `string` | Address of the issuer of all attestations to be revoked |
| `identifiers` | `string`[] | Hash of the identifiers |
| `accounts` | `string`[] | Addresses of the accounts mapped to the identifiers at the same indices |

##### Returns

`CeloTransactionObject`\<`void`\>

**`Notice`**

Revokes attestations [identifiers <-> accounts] from issuer

**`Dev`**

Throws if the number of identifiers and accounts is not the same

**`Dev`**

Throws if sender is not the issuer or currently registered signer of issuer

**`Dev`**

Throws if an attestation is not found for identifiers[i] <-> accounts[i]

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L167)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`FederatedAttestations`\>

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
| `AttestationRegistered` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `5`: `string` ; `account`: `string` ; `identifier`: `string` ; `issuedOn`: `string` ; `issuer`: `string` ; `publishedOn`: `string` ; `signer`: `string`  }\> |
| `AttestationRevoked` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `3`: `string` ; `4`: `string` ; `5`: `string` ; `account`: `string` ; `identifier`: `string` ; `issuedOn`: `string` ; `issuer`: `string` ; `publishedOn`: `string` ; `signer`: `string`  }\> |
| `EIP712DomainSeparatorSet` | `ContractEvent`\<`string`\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getUniqueAttestationHash

• **getUniqueAttestationHash**: (`identifier`: `string`, `issuer`: `string`, `account`: `string`, `signer`: `string`, `issuedOn`: `number`) => `Promise`\<`string`\>

#### Type declaration

▸ (`identifier`, `issuer`, `account`, `signer`, `issuedOn`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` |
| `issuer` | `string` |
| `account` | `string` |
| `signer` | `string` |
| `issuedOn` | `number` |

##### Returns

`Promise`\<`string`\>

keccak 256 of abi encoded parameters

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:76](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L76)

___

### lookupAttestations

• **lookupAttestations**: (`identifier`: `string`, `trustedIssuers`: `string`[]) => `Promise`\<\{ `accounts`: `string`[] ; `countsPerIssuer`: `string`[] ; `issuedOns`: `string`[] ; `publishedOns`: `string`[] ; `signers`: `string`[]  }\>

**`Notice`**

Returns info about attestations for `identifier` produced by
   signers of `trustedIssuers`

**`Param`**

Hash of the identifier

**`Param`**

Array of n issuers whose attestations will be included

**`Dev`**

Adds attestation info to the arrays in order of provided trustedIssuers

**`Dev`**

Expectation that only one attestation exists per (identifier, issuer, account)

#### Type declaration

▸ (`identifier`, `trustedIssuers`): `Promise`\<\{ `accounts`: `string`[] ; `countsPerIssuer`: `string`[] ; `issuedOns`: `string`[] ; `publishedOns`: `string`[] ; `signers`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | Hash of the identifier |
| `trustedIssuers` | `string`[] | Array of n issuers whose attestations will be included |

##### Returns

`Promise`\<\{ `accounts`: `string`[] ; `countsPerIssuer`: `string`[] ; `issuedOns`: `string`[] ; `publishedOns`: `string`[] ; `signers`: `string`[]  }\>

countsPerIssuer Array of number of attestations returned per issuer
         For m (== sum([0])) found attestations:

accounts Array of m accounts

signers Array of m signers

issuedOns Array of m issuedOns

publishedOns Array of m publishedOns

**`Notice`**

Returns info about attestations for `identifier` produced by
   signers of `trustedIssuers`

**`Dev`**

Adds attestation info to the arrays in order of provided trustedIssuers

**`Dev`**

Expectation that only one attestation exists per (identifier, issuer, account)

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L38)

___

### lookupIdentifiers

• **lookupIdentifiers**: (`account`: `string`, `trustedIssuers`: `string`[]) => `Promise`\<\{ `countsPerIssuer`: `string`[] ; `identifiers`: `string`[]  }\>

**`Notice`**

Returns identifiers mapped to `account` by signers of `trustedIssuers`

**`Param`**

Address of the account

**`Param`**

Array of n issuers whose identifier mappings will be used

**`Dev`**

Adds identifier info to the arrays in order of provided trustedIssuers

**`Dev`**

Expectation that only one attestation exists per (identifier, issuer, account)

#### Type declaration

▸ (`account`, `trustedIssuers`): `Promise`\<\{ `countsPerIssuer`: `string`[] ; `identifiers`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Address of the account |
| `trustedIssuers` | `string`[] | Array of n issuers whose identifier mappings will be used |

##### Returns

`Promise`\<\{ `countsPerIssuer`: `string`[] ; `identifiers`: `string`[]  }\>

countsPerIssuer Array of number of identifiers returned per issuer

identifiers Array (length == sum([0])) of identifiers

**`Notice`**

Returns identifiers mapped to `account` by signers of `trustedIssuers`

**`Dev`**

Adds identifier info to the arrays in order of provided trustedIssuers

**`Dev`**

Expectation that only one attestation exists per (identifier, issuer, account)

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L16)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"renounceOwnership"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"registryContract"`` \| ``"EIP712_OWNERSHIP_ATTESTATION_TYPEHASH"`` \| ``"MAX_ATTESTATIONS_PER_IDENTIFIER"`` \| ``"MAX_IDENTIFIERS_PER_ADDRESS"`` \| ``"addressToIdentifiers"`` \| ``"eip712DomainSeparator"`` \| ``"identifierToAttestations"`` \| ``"revokedAttestations"`` \| ``"registerAttestationAsIssuer"`` \| ``"registerAttestation"`` \| ``"revokeAttestation"`` \| ``"batchRevokeAttestations"`` \| ``"lookupAttestations"`` \| ``"lookupIdentifiers"`` \| ``"validateAttestationSig"`` \| ``"getUniqueAttestationHash"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

___

### registerAttestationAsIssuer

• **registerAttestationAsIssuer**: (`identifier`: `string`, `account`: `string`, `issuedOn`: `number`) => `CeloTransactionObject`\<`void`\>

**`Notice`**

Registers an attestation directly from the issuer

**`Param`**

Hash of the identifier to be attested

**`Param`**

Address of the account being mapped to the identifier

**`Param`**

Time at which the issuer issued the attestation in Unix time

**`Dev`**

Attestation signer and issuer in storage is set to msg.sender

**`Dev`**

Throws if an attestation with the same (identifier, issuer, account) already exists

#### Type declaration

▸ (`identifier`, `account`, `issuedOn`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | Hash of the identifier to be attested |
| `account` | `string` | Address of the account being mapped to the identifier |
| `issuedOn` | `number` | Time at which the issuer issued the attestation in Unix time |

##### Returns

`CeloTransactionObject`\<`void`\>

**`Notice`**

Registers an attestation directly from the issuer

**`Dev`**

Attestation signer and issuer in storage is set to msg.sender

**`Dev`**

Throws if an attestation with the same (identifier, issuer, account) already exists

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L92)

___

### revokeAttestation

• **revokeAttestation**: (`identifier`: `string`, `issuer`: `string`, `account`: `string`) => `CeloTransactionObject`\<`void`\>

**`Notice`**

Revokes an attestation

**`Param`**

Hash of the identifier to be revoked

**`Param`**

Address of the attestation issuer

**`Param`**

Address of the account mapped to the identifier

**`Dev`**

Throws if sender is not the issuer, signer, or account

#### Type declaration

▸ (`identifier`, `issuer`, `account`): `CeloTransactionObject`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | Hash of the identifier to be revoked |
| `issuer` | `string` | Address of the attestation issuer |
| `account` | `string` | Address of the account mapped to the identifier |

##### Returns

`CeloTransactionObject`\<`void`\>

**`Notice`**

Revokes an attestation

**`Dev`**

Throws if sender is not the issuer, signer, or account

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:148](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L148)

___

### validateAttestationSig

• **validateAttestationSig**: (`identifier`: `string`, `issuer`: `string`, `account`: `string`, `signer`: `string`, `issuedOn`: `number`, `v`: `string` \| `number`, `r`: `string` \| `number`[], `s`: `string` \| `number`[]) => `Promise`\<`void`\>

**`Notice`**

Validates the given attestation and signature

**`Param`**

Hash of the identifier to be attested

**`Param`**

Address of the attestation issuer

**`Param`**

Address of the account being mapped to the identifier

**`Param`**

Time at which the issuer issued the attestation in Unix time

**`Param`**

Address of the signer of the attestation

**`Param`**

The recovery id of the incoming ECDSA signature

**`Param`**

Output value r of the ECDSA signature

**`Param`**

Output value s of the ECDSA signature

**`Dev`**

Throws if attestation has been revoked

**`Dev`**

Throws if signer is not an authorized AttestationSigner of the issuer

#### Type declaration

▸ (`identifier`, `issuer`, `account`, `signer`, `issuedOn`, `v`, `r`, `s`): `Promise`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | Hash of the identifier to be attested |
| `issuer` | `string` | Address of the attestation issuer |
| `account` | `string` | Address of the account being mapped to the identifier |
| `signer` | `string` | Address of the signer of the attestation |
| `issuedOn` | `number` | Time at which the issuer issued the attestation in Unix time |
| `v` | `string` \| `number` | The recovery id of the incoming ECDSA signature |
| `r` | `string` \| `number`[] | Output value r of the ECDSA signature |
| `s` | `string` \| `number`[] | Output value s of the ECDSA signature |

##### Returns

`Promise`\<`void`\>

**`Notice`**

Validates the given attestation and signature

**`Dev`**

Throws if attestation has been revoked

**`Dev`**

Throws if signer is not an authorized AttestationSigner of the issuer

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L62)

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
| `event` | ``"OwnershipTransferred"`` \| ``"allEvents"`` \| ``"AttestationRegistered"`` \| ``"AttestationRevoked"`` \| ``"EIP712DomainSeparatorSet"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### registerAttestation

▸ **registerAttestation**(`identifier`, `issuer`, `account`, `signer`, `issuedOn`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | Hash of the identifier to be attested |
| `issuer` | `string` | Address of the attestation issuer |
| `account` | `string` | Address of the account being mapped to the identifier |
| `signer` | `string` | Address of the signer of the attestation |
| `issuedOn` | `number` | Time at which the issuer issued the attestation in Unix time |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

**`Notice`**

Generates a valid signature and registers the attestation

**`Dev`**

Throws if an attestation with the same (identifier, issuer, account) already exists

#### Defined in

[packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/FederatedAttestations.ts#L110)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
