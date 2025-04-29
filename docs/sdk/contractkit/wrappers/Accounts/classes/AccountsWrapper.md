[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/Accounts](../README.md) / AccountsWrapper

# Class: AccountsWrapper

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:39](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L39)

Contract for handling deposits needed for voting.

## Extends

- [`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md)\<`Accounts`\>

## Constructors

### Constructor

> **new AccountsWrapper**(`connection`, `contract`): `AccountsWrapper`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

#### Parameters

##### connection

`Connection`

##### contract

`Accounts`

#### Returns

`AccountsWrapper`

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`constructor`](../../BaseWrapper/classes/BaseWrapper.md#constructor)

## Properties

### createAccount()

> **createAccount**: (...`args`) => `CeloTransactionObject`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L45)

Creates an account.

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`boolean`\>

***

### deletePaymentDelegation()

> **deletePaymentDelegation**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:459](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L459)

Remove a validator's payment delegation by setting beneficiary and
fraction to 0.

#### Parameters

##### args

...\[\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### events

> **events**: `object`

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

#### AccountCreated

> **AccountCreated**: `ContractEvent`\<`string`\>

#### AccountDataEncryptionKeySet

> **AccountDataEncryptionKeySet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `dataEncryptionKey`: `string`; \}\>

#### AccountMetadataURLSet

> **AccountMetadataURLSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `metadataURL`: `string`; \}\>

#### AccountNameSet

> **AccountNameSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `name`: `string`; \}\>

#### AccountWalletAddressSet

> **AccountWalletAddressSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `walletAddress`: `string`; \}\>

#### allEvents()

> **allEvents**: (`options?`, `cb?`) => `EventEmitter`

##### Parameters

###### options?

`EventOptions`

###### cb?

`Callback`\<`EventLog`\>

##### Returns

`EventEmitter`

#### AttestationSignerAuthorized

> **AttestationSignerAuthorized**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `signer`: `string`; \}\>

#### AttestationSignerRemoved

> **AttestationSignerRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `oldSigner`: `string`; \}\>

#### DefaultSignerRemoved

> **DefaultSignerRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `oldSigner`: `string`; `role`: `string`; \}\>

#### DefaultSignerSet

> **DefaultSignerSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `role`: `string`; `signer`: `string`; \}\>

#### IndexedSignerRemoved

> **IndexedSignerRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `oldSigner`: `string`; `role`: `string`; \}\>

#### IndexedSignerSet

> **IndexedSignerSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `role`: `string`; `signer`: `string`; \}\>

#### LegacySignerRemoved

> **LegacySignerRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `oldSigner`: `string`; `role`: `string`; \}\>

#### LegacySignerSet

> **LegacySignerSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `role`: `string`; `signer`: `string`; \}\>

#### OffchainStorageRootAdded

> **OffchainStorageRootAdded**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `url`: `string`; \}\>

#### OffchainStorageRootRemoved

> **OffchainStorageRootRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `index`: `string`; `url`: `string`; \}\>

#### OwnershipTransferred

> **OwnershipTransferred**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `newOwner`: `string`; `previousOwner`: `string`; \}\>

#### PaymentDelegationSet

> **PaymentDelegationSet**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `beneficiary`: `string`; `fraction`: `string`; \}\>

#### RegistrySet

> **RegistrySet**: `ContractEvent`\<`string`\>

#### SignerAuthorizationCompleted

> **SignerAuthorizationCompleted**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `role`: `string`; `signer`: `string`; \}\>

#### SignerAuthorizationStarted

> **SignerAuthorizationStarted**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `role`: `string`; `signer`: `string`; \}\>

#### SignerAuthorized

> **SignerAuthorized**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `role`: `string`; `signer`: `string`; \}\>

#### SignerRemoved

> **SignerRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `2`: `string`; `account`: `string`; `oldSigner`: `string`; `role`: `string`; \}\>

#### ValidatorSignerAuthorized

> **ValidatorSignerAuthorized**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `signer`: `string`; \}\>

#### ValidatorSignerRemoved

> **ValidatorSignerRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `oldSigner`: `string`; \}\>

#### VoteSignerAuthorized

> **VoteSignerAuthorized**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `signer`: `string`; \}\>

#### VoteSignerRemoved

> **VoteSignerRemoved**: `ContractEvent`\<\{ `0`: `string`; `1`: `string`; `account`: `string`; `oldSigner`: `string`; \}\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`events`](../../BaseWrapper/classes/BaseWrapper.md#events)

***

### eventTypes

> **eventTypes**: `EventsEnum`\<`Accounts`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:63](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L63)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`eventTypes`](../../BaseWrapper/classes/BaseWrapper.md#eventtypes)

***

### getAttestationSigner()

> **getAttestationSigner**: (`account`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L52)

Returns the attestation signer for the specified account.

#### Parameters

##### account

`string`

The address of the account.

#### Returns

`Promise`\<`` `0x${string}` ``\>

The address with which the account can vote.

***

### getDataEncryptionKey()

> **getDataEncryptionKey**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:365](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L365)

Returns the set data encryption key for the account

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`string`\>

***

### getMetadataURL()

> **getMetadataURL**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:379](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L379)

Returns the metadataURL for the account

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`string`\>

***

### getPaymentDelegation()

> **getPaymentDelegation**: (...`args`) => `Promise`\<\{ `0`: `string`; `1`: `string`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:469](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L469)

Get a validator's payment delegation settings.

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<\{ `0`: `string`; `1`: `string`; \}\>

Beneficiary address and fraction of payment delegated.

***

### getValidatorSigner()

> **getValidatorSigner**: (`account`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L78)

Returns the validator signer for the specified account.

#### Parameters

##### account

`string`

The address of the account.

#### Returns

`Promise`\<`` `0x${string}` ``\>

The address with which the account can register a validator or group.

***

### getVoteSigner()

> **getVoteSigner**: (`account`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:70](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L70)

Returns the vote signer for the specified account.

#### Parameters

##### account

`string`

The address of the account.

#### Returns

`Promise`\<`` `0x${string}` ``\>

The address with which the account can vote.

***

### getWalletAddress()

> **getWalletAddress**: (...`args`) => `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:373](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L373)

Returns the set wallet address for the account

#### Parameters

##### args

...\[`string`\]

#### Returns

`Promise`\<`string`\>

***

### hasAuthorizedAttestationSigner()

> **hasAuthorizedAttestationSigner**: (`account`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L61)

Returns if the account has authorized an attestation signer

#### Parameters

##### account

`string`

The address of the account.

#### Returns

`Promise`\<`boolean`\>

If the account has authorized an attestation signer

***

### isAccount()

> **isAccount**: (`account`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:117](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L117)

Check if an account already exists.

#### Parameters

##### account

`string`

The address of the account

#### Returns

`Promise`\<`boolean`\>

Returns `true` if account exists. Returns `false` otherwise.

***

### isSigner()

> **isSigner**: (`address`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:124](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L124)

Check if an address is a signer address

#### Parameters

##### address

`string`

The address of the account

#### Returns

`Promise`\<`boolean`\>

Returns `true` if account exists. Returns `false` otherwise.

***

### methodIds

> **methodIds**: `Record`\<`"initialized"` \| `"isOwner"` \| `"owner"` \| `"registry"` \| `"renounceOwnership"` \| `"setRegistry"` \| `"transferOwnership"` \| `"initialize"` \| `"getVersionNumber"` \| `"eip712DomainSeparator"` \| `"EIP712_AUTHORIZE_SIGNER_TYPEHASH"` \| `"authorizedBy"` \| `"offchainStorageRoots"` \| `"setEip712DomainSeparator"` \| `"setAccount"` \| `"createAccount"` \| `"setName"` \| `"setWalletAddress"` \| `"setAccountDataEncryptionKey"` \| `"setMetadataURL"` \| `"addStorageRoot"` \| `"removeStorageRoot"` \| `"getOffchainStorageRoots"` \| `"setPaymentDelegation"` \| `"deletePaymentDelegation"` \| `"getPaymentDelegation"` \| `"setIndexedSigner"` \| `"authorizeSignerWithSignature"` \| `"authorizeVoteSigner"` \| `"authorizeValidatorSigner"` \| `"authorizeValidatorSignerWithPublicKey"` \| `"authorizeValidatorSignerWithKeys"` \| `"authorizeAttestationSigner"` \| `"authorizeSigner"` \| `"completeSignerAuthorization"` \| `"isLegacySigner"` \| `"isDefaultSigner"` \| `"isIndexedSigner"` \| `"isSigner"` \| `"removeDefaultSigner"` \| `"removeIndexedSigner"` \| `"removeSigner"` \| `"removeVoteSigner"` \| `"removeValidatorSigner"` \| `"removeAttestationSigner"` \| `"attestationSignerToAccount"` \| `"validatorSignerToAccount"` \| `"voteSignerToAccount"` \| `"signerToAccount"` \| `"isLegacyRole"` \| `"getLegacySigner"` \| `"getDefaultSigner"` \| `"getIndexedSigner"` \| `"getVoteSigner"` \| `"getValidatorSigner"` \| `"getAttestationSigner"` \| `"hasLegacySigner"` \| `"hasDefaultSigner"` \| `"hasIndexedSigner"` \| `"hasAuthorizedSigner"` \| `"hasAuthorizedVoteSigner"` \| `"hasAuthorizedValidatorSigner"` \| `"hasAuthorizedAttestationSigner"` \| `"getName"` \| `"getMetadataURL"` \| `"batchGetMetadataURL"` \| `"getDataEncryptionKey"` \| `"getWalletAddress"` \| `"isAccount"` \| `"isAuthorizedSigner"` \| `"getRoleAuthorizationSigner"`, `string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`methodIds`](../../BaseWrapper/classes/BaseWrapper.md#methodids)

***

### setAccountDataEncryptionKey()

> **setAccountDataEncryptionKey**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:385](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L385)

Sets the data encryption of the account

#### Parameters

##### args

...\[`string` \| `number`[]\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setMetadataURL()

> **setMetadataURL**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:442](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L442)

Sets the metadataURL for the account

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setName()

> **setName**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:436](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L436)

Sets the name for the account

#### Parameters

##### args

...\[`string`\]

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setPaymentDelegation()

> **setPaymentDelegation**: (...`args`) => `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:453](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L453)

Set a validator's payment delegation settings.

#### Parameters

##### args

...\[`string`, `string` \| `number`\]

#### Returns

`CeloTransactionObject`\<`void`\>

#### Dev

Use `deletePaymentDelegation` to unset the payment delegation.

***

### signerToAccount()

> **signerToAccount**: (`signer`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L108)

Returns the account associated with `signer`.

#### Parameters

##### signer

`string`

The address of the account or previously authorized signer.

#### Returns

`Promise`\<`` `0x${string}` ``\>

The associated account.

#### Dev

Fails if the `signer` is not an account or previously authorized signer.

***

### validatorSignerToAccount()

> **validatorSignerToAccount**: (`signer`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:96](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L96)

Returns the account address given the signer for validating

#### Parameters

##### signer

`string`

Address that is authorized to sign the tx as validator

#### Returns

`Promise`\<`` `0x${string}` ``\>

The Account address

***

### voteSignerToAccount()

> **voteSignerToAccount**: (`signer`) => `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L87)

Returns the account address given the signer for voting

#### Parameters

##### signer

`string`

Address that is authorized to sign the tx as voter

#### Returns

`Promise`\<`` `0x${string}` ``\>

The Account address

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

### authorizeAttestationSigner()

> **authorizeAttestationSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L166)

Authorize an attestation signing key on behalf of this account to another address.

#### Parameters

##### signer

`string`

The address of the signing key to authorize.

##### proofOfSigningKeyPossession

`Signature`

The account address signed by the signer address.

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

***

### authorizeSigner()

> **authorizeSigner**(`signer`, `role`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:290](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L290)

#### Parameters

##### signer

`string`

##### role

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### authorizeValidatorSigner()

> **authorizeValidatorSigner**(`signer`, `proofOfSigningKeyPossession`, `validatorsWrapper`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:207](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L207)

Authorizes an address to sign consensus messages on behalf of the account.

#### Parameters

##### signer

`string`

The address of the signing key to authorize.

##### proofOfSigningKeyPossession

`Signature`

The account address signed by the signer address.

##### validatorsWrapper

###### isValidator

(`account`) => `Promise`\<`boolean`\>

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

***

### authorizeValidatorSignerAndBls()

> **authorizeValidatorSignerAndBls**(`signer`, `proofOfSigningKeyPossession`, `blsPublicKey`, `blsPop`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:258](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L258)

Authorizes an address to sign consensus messages on behalf of the account. Also switch BLS key at the same time.

#### Parameters

##### signer

`string`

The address of the signing key to authorize.

##### proofOfSigningKeyPossession

`Signature`

The account address signed by the signer address.

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

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:186](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L186)

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

### completeSignerAuthorization()

> **completeSignerAuthorization**(`account`, `role`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:323](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L323)

#### Parameters

##### account

`string`

##### role

`string`

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

***

### generateProofOfKeyPossession()

> **generateProofOfKeyPossession**(`account`, `signer`): `Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:339](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L339)

#### Parameters

##### account

`string`

##### signer

`string`

#### Returns

`Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

***

### generateProofOfKeyPossessionLocally()

> **generateProofOfKeyPossessionLocally**(`account`, `signer`, `privateKey`): `Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:347](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L347)

#### Parameters

##### account

`string`

##### signer

`string`

##### privateKey

`string`

#### Returns

`Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

***

### getAccountSummary()

> **getAccountSummary**(`account`): `Promise`\<`AccountSummary`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:136](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L136)

#### Parameters

##### account

`string`

#### Returns

`Promise`\<`AccountSummary`\>

***

### getCurrentSigners()

> **getCurrentSigners**(`address`): `Promise`\<`string`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L128)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`string`[]\>

***

### getName()

> **getName**(`account`, `blockNumber?`): `Promise`\<`string`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:356](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L356)

Returns the set name for the account

#### Parameters

##### account

`string`

Account

##### blockNumber?

`number`

Height of result, defaults to tip.

#### Returns

`Promise`\<`string`\>

***

### getPastEvents()

> **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

Contract getPastEvents

#### Parameters

##### event

`"OwnershipTransferred"` | `"RegistrySet"` | `"allEvents"` | `"AccountCreated"` | `"AccountDataEncryptionKeySet"` | `"AccountMetadataURLSet"` | `"AccountNameSet"` | `"AccountWalletAddressSet"` | `"AttestationSignerAuthorized"` | `"AttestationSignerRemoved"` | `"DefaultSignerRemoved"` | `"DefaultSignerSet"` | `"IndexedSignerRemoved"` | `"IndexedSignerSet"` | `"LegacySignerRemoved"` | `"LegacySignerSet"` | `"OffchainStorageRootAdded"` | `"OffchainStorageRootRemoved"` | `"PaymentDelegationSet"` | `"SignerAuthorizationCompleted"` | `"SignerAuthorizationStarted"` | `"SignerAuthorized"` | `"SignerRemoved"` | `"ValidatorSignerAuthorized"` | `"ValidatorSignerRemoved"` | `"VoteSignerAuthorized"` | `"VoteSignerRemoved"`

##### options

`PastEventOptions`

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[`BaseWrapper`](../../BaseWrapper/classes/BaseWrapper.md).[`getPastEvents`](../../BaseWrapper/classes/BaseWrapper.md#getpastevents)

***

### parseSignatureOfAddress()

> **parseSignatureOfAddress**(`address`, `signer`, `signature`): `object`

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:497](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L497)

#### Parameters

##### address

`string`

##### signer

`string`

##### signature

`string`

#### Returns

`object`

##### r

> **r**: `string`

##### s

> **s**: `string`

##### v

> **v**: `number`

***

### removeAttestationSigner()

> **removeAttestationSigner**(): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:335](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L335)

Removes the currently authorized attestation signer for the account

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

***

### setAccount()

> **setAccount**(`name`, `dataEncryptionKey`, `walletAddress`, `proofOfPossession`): `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:397](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L397)

Convenience Setter for the dataEncryptionKey and wallet address for an account

#### Parameters

##### name

`string`

A string to set as the name of the account

##### dataEncryptionKey

`string`

secp256k1 public key for data encryption. Preferably compressed.

##### walletAddress

`string`

The wallet address to set for the account

##### proofOfPossession

Signature from the wallet address key over the sender's address

`null` | `Signature`

#### Returns

`CeloTransactionObject`\<`void`\>

***

### setWalletAddress()

> **setWalletAddress**(`walletAddress`, `proofOfPossession`): `CeloTransactionObject`\<`void`\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:475](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L475)

Sets the wallet address for the account

#### Parameters

##### walletAddress

`string`

##### proofOfPossession

`null` | `Signature`

#### Returns

`CeloTransactionObject`\<`void`\>

***

### startSignerAuthorization()

> **startSignerAuthorization**(`signer`, `role`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Defined in: [packages/sdk/contractkit/src/wrappers/Accounts.ts:315](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L315)

#### Parameters

##### signer

`string`

##### role

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
