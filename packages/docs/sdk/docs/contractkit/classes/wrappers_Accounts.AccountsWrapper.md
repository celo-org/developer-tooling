[@celo/contractkit](../README.md) / [Exports](../modules.md) / [wrappers/Accounts](../modules/wrappers_Accounts.md) / AccountsWrapper

# Class: AccountsWrapper

[wrappers/Accounts](../modules/wrappers_Accounts.md).AccountsWrapper

Contract for handling deposits needed for voting.

## Hierarchy

- [`BaseWrapper`](wrappers_BaseWrapper.BaseWrapper.md)\<`Accounts`\>

  ↳ **`AccountsWrapper`**

## Table of contents

### Constructors

- [constructor](wrappers_Accounts.AccountsWrapper.md#constructor)

### Properties

- [createAccount](wrappers_Accounts.AccountsWrapper.md#createaccount)
- [deletePaymentDelegation](wrappers_Accounts.AccountsWrapper.md#deletepaymentdelegation)
- [eventTypes](wrappers_Accounts.AccountsWrapper.md#eventtypes)
- [events](wrappers_Accounts.AccountsWrapper.md#events)
- [getAttestationSigner](wrappers_Accounts.AccountsWrapper.md#getattestationsigner)
- [getDataEncryptionKey](wrappers_Accounts.AccountsWrapper.md#getdataencryptionkey)
- [getMetadataURL](wrappers_Accounts.AccountsWrapper.md#getmetadataurl)
- [getPaymentDelegation](wrappers_Accounts.AccountsWrapper.md#getpaymentdelegation)
- [getValidatorSigner](wrappers_Accounts.AccountsWrapper.md#getvalidatorsigner)
- [getVoteSigner](wrappers_Accounts.AccountsWrapper.md#getvotesigner)
- [getWalletAddress](wrappers_Accounts.AccountsWrapper.md#getwalletaddress)
- [hasAuthorizedAttestationSigner](wrappers_Accounts.AccountsWrapper.md#hasauthorizedattestationsigner)
- [isAccount](wrappers_Accounts.AccountsWrapper.md#isaccount)
- [isSigner](wrappers_Accounts.AccountsWrapper.md#issigner)
- [methodIds](wrappers_Accounts.AccountsWrapper.md#methodids)
- [setAccountDataEncryptionKey](wrappers_Accounts.AccountsWrapper.md#setaccountdataencryptionkey)
- [setMetadataURL](wrappers_Accounts.AccountsWrapper.md#setmetadataurl)
- [setName](wrappers_Accounts.AccountsWrapper.md#setname)
- [setPaymentDelegation](wrappers_Accounts.AccountsWrapper.md#setpaymentdelegation)
- [signerToAccount](wrappers_Accounts.AccountsWrapper.md#signertoaccount)
- [validatorSignerToAccount](wrappers_Accounts.AccountsWrapper.md#validatorsignertoaccount)
- [voteSignerToAccount](wrappers_Accounts.AccountsWrapper.md#votesignertoaccount)

### Accessors

- [address](wrappers_Accounts.AccountsWrapper.md#address)

### Methods

- [authorizeAttestationSigner](wrappers_Accounts.AccountsWrapper.md#authorizeattestationsigner)
- [authorizeSigner](wrappers_Accounts.AccountsWrapper.md#authorizesigner)
- [authorizeValidatorSigner](wrappers_Accounts.AccountsWrapper.md#authorizevalidatorsigner)
- [authorizeValidatorSignerAndBls](wrappers_Accounts.AccountsWrapper.md#authorizevalidatorsignerandbls)
- [authorizeVoteSigner](wrappers_Accounts.AccountsWrapper.md#authorizevotesigner)
- [completeSignerAuthorization](wrappers_Accounts.AccountsWrapper.md#completesignerauthorization)
- [generateProofOfKeyPossession](wrappers_Accounts.AccountsWrapper.md#generateproofofkeypossession)
- [generateProofOfKeyPossessionLocally](wrappers_Accounts.AccountsWrapper.md#generateproofofkeypossessionlocally)
- [getAccountSummary](wrappers_Accounts.AccountsWrapper.md#getaccountsummary)
- [getCurrentSigners](wrappers_Accounts.AccountsWrapper.md#getcurrentsigners)
- [getName](wrappers_Accounts.AccountsWrapper.md#getname)
- [getPastEvents](wrappers_Accounts.AccountsWrapper.md#getpastevents)
- [parseSignatureOfAddress](wrappers_Accounts.AccountsWrapper.md#parsesignatureofaddress)
- [removeAttestationSigner](wrappers_Accounts.AccountsWrapper.md#removeattestationsigner)
- [setAccount](wrappers_Accounts.AccountsWrapper.md#setaccount)
- [setWalletAddress](wrappers_Accounts.AccountsWrapper.md#setwalletaddress)
- [startSignerAuthorization](wrappers_Accounts.AccountsWrapper.md#startsignerauthorization)
- [version](wrappers_Accounts.AccountsWrapper.md#version)

## Constructors

### constructor

• **new AccountsWrapper**(`connection`, `contract`): [`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `contract` | `Accounts` |

#### Returns

[`AccountsWrapper`](wrappers_Accounts.AccountsWrapper.md)

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[constructor](wrappers_BaseWrapper.BaseWrapper.md#constructor)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L34)

## Properties

### createAccount

• **createAccount**: (...`args`: []) => `CeloTransactionObject`\<`boolean`\>

Creates an account.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`boolean`\>

Creates an account.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`boolean`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L44)

___

### deletePaymentDelegation

• **deletePaymentDelegation**: (...`args`: []) => `CeloTransactionObject`\<`void`\>

Remove a validator's payment delegation by setting benficiary and
fraction to 0.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Remove a validator's payment delegation by setting benficiary and
fraction to 0.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:456](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L456)

___

### eventTypes

• **eventTypes**: `EventsEnum`\<`Accounts`\>

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
| `AccountCreated` | `ContractEvent`\<`string`\> |
| `AccountDataEncryptionKeySet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `dataEncryptionKey`: `string`  }\> |
| `AccountMetadataURLSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `metadataURL`: `string`  }\> |
| `AccountNameSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `name`: `string`  }\> |
| `AccountWalletAddressSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `walletAddress`: `string`  }\> |
| `AttestationSignerAuthorized` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `signer`: `string`  }\> |
| `AttestationSignerRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `oldSigner`: `string`  }\> |
| `DefaultSignerRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `oldSigner`: `string` ; `role`: `string`  }\> |
| `DefaultSignerSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `role`: `string` ; `signer`: `string`  }\> |
| `IndexedSignerRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `oldSigner`: `string` ; `role`: `string`  }\> |
| `IndexedSignerSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `role`: `string` ; `signer`: `string`  }\> |
| `LegacySignerRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `oldSigner`: `string` ; `role`: `string`  }\> |
| `LegacySignerSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `role`: `string` ; `signer`: `string`  }\> |
| `OffchainStorageRootAdded` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `url`: `string`  }\> |
| `OffchainStorageRootRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `index`: `string` ; `url`: `string`  }\> |
| `OwnershipTransferred` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `newOwner`: `string` ; `previousOwner`: `string`  }\> |
| `PaymentDelegationSet` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `beneficiary`: `string` ; `fraction`: `string`  }\> |
| `RegistrySet` | `ContractEvent`\<`string`\> |
| `SignerAuthorizationCompleted` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `role`: `string` ; `signer`: `string`  }\> |
| `SignerAuthorizationStarted` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `role`: `string` ; `signer`: `string`  }\> |
| `SignerAuthorized` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `role`: `string` ; `signer`: `string`  }\> |
| `SignerRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `2`: `string` ; `account`: `string` ; `oldSigner`: `string` ; `role`: `string`  }\> |
| `ValidatorSignerAuthorized` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `signer`: `string`  }\> |
| `ValidatorSignerRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `oldSigner`: `string`  }\> |
| `VoteSignerAuthorized` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `signer`: `string`  }\> |
| `VoteSignerRemoved` | `ContractEvent`\<\{ `0`: `string` ; `1`: `string` ; `account`: `string` ; `oldSigner`: `string`  }\> |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`\<`EventLog`\>) => `EventEmitter` |

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[events](wrappers_BaseWrapper.BaseWrapper.md#events)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L61)

___

### getAttestationSigner

• **getAttestationSigner**: (`account`: `string`) => `Promise`\<`string`\>

Returns the attestation signer for the specified account.

**`Param`**

The address of the account.

#### Type declaration

▸ (`account`): `Promise`\<`string`\>

Returns the attestation signer for the specified account.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

##### Returns

`Promise`\<`string`\>

The address with which the account can vote.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L51)

___

### getDataEncryptionKey

• **getDataEncryptionKey**: (...`args`: [account: string]) => `Promise`\<`string`\>

Returns the set data encryption key for the account

**`Param`**

Account

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the set data encryption key for the account

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:362](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L362)

___

### getMetadataURL

• **getMetadataURL**: (...`args`: [account: string]) => `Promise`\<`string`\>

Returns the metadataURL for the account

**`Param`**

Account

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the metadataURL for the account

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:376](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L376)

___

### getPaymentDelegation

• **getPaymentDelegation**: (...`args`: [account: string]) => `Promise`\<\{ `0`: `string` ; `1`: `string`  }\>

Get a validator's payment delegation settings.

**`Param`**

Account of the validator.

#### Type declaration

▸ (`...args`): `Promise`\<\{ `0`: `string` ; `1`: `string`  }\>

Get a validator's payment delegation settings.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<\{ `0`: `string` ; `1`: `string`  }\>

Beneficiary address and fraction of payment delegated.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:466](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L466)

___

### getValidatorSigner

• **getValidatorSigner**: (`account`: `string`) => `Promise`\<`string`\>

Returns the validator signer for the specified account.

**`Param`**

The address of the account.

#### Type declaration

▸ (`account`): `Promise`\<`string`\>

Returns the validator signer for the specified account.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

##### Returns

`Promise`\<`string`\>

The address with which the account can register a validator or group.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:77](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L77)

___

### getVoteSigner

• **getVoteSigner**: (`account`: `string`) => `Promise`\<`string`\>

Returns the vote signer for the specified account.

**`Param`**

The address of the account.

#### Type declaration

▸ (`account`): `Promise`\<`string`\>

Returns the vote signer for the specified account.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

##### Returns

`Promise`\<`string`\>

The address with which the account can vote.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:69](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L69)

___

### getWalletAddress

• **getWalletAddress**: (...`args`: [account: string]) => `Promise`\<`string`\>

Returns the set wallet address for the account

**`Param`**

Account

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

Returns the set wallet address for the account

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [account: string] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:370](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L370)

___

### hasAuthorizedAttestationSigner

• **hasAuthorizedAttestationSigner**: (`account`: `string`) => `Promise`\<`boolean`\>

Returns if the account has authorized an attestation signer

**`Param`**

The address of the account.

#### Type declaration

▸ (`account`): `Promise`\<`boolean`\>

Returns if the account has authorized an attestation signer

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

##### Returns

`Promise`\<`boolean`\>

If the account has authorized an attestation signer

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L60)

___

### isAccount

• **isAccount**: (`account`: `string`) => `Promise`\<`boolean`\>

Check if an account already exists.

**`Param`**

The address of the account

#### Type declaration

▸ (`account`): `Promise`\<`boolean`\>

Check if an account already exists.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account |

##### Returns

`Promise`\<`boolean`\>

Returns `true` if account exists. Returns `false` otherwise.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L114)

___

### isSigner

• **isSigner**: (`address`: `string`) => `Promise`\<`boolean`\>

Check if an address is a signer address

**`Param`**

The address of the account

#### Type declaration

▸ (`address`): `Promise`\<`boolean`\>

Check if an address is a signer address

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The address of the account |

##### Returns

`Promise`\<`boolean`\>

Returns `true` if account exists. Returns `false` otherwise.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L121)

___

### methodIds

• **methodIds**: `Record`\<``"initialized"`` \| ``"isOwner"`` \| ``"owner"`` \| ``"registry"`` \| ``"renounceOwnership"`` \| ``"setRegistry"`` \| ``"transferOwnership"`` \| ``"getVersionNumber"`` \| ``"initialize"`` \| ``"eip712DomainSeparator"`` \| ``"EIP712_AUTHORIZE_SIGNER_TYPEHASH"`` \| ``"authorizedBy"`` \| ``"offchainStorageRoots"`` \| ``"setEip712DomainSeparator"`` \| ``"setAccount"`` \| ``"createAccount"`` \| ``"setName"`` \| ``"setWalletAddress"`` \| ``"setAccountDataEncryptionKey"`` \| ``"setMetadataURL"`` \| ``"addStorageRoot"`` \| ``"removeStorageRoot"`` \| ``"getOffchainStorageRoots"`` \| ``"setPaymentDelegation"`` \| ``"deletePaymentDelegation"`` \| ``"getPaymentDelegation"`` \| ``"setIndexedSigner"`` \| ``"authorizeSignerWithSignature"`` \| ``"authorizeVoteSigner"`` \| ``"authorizeValidatorSigner"`` \| ``"authorizeValidatorSignerWithPublicKey"`` \| ``"authorizeValidatorSignerWithKeys"`` \| ``"authorizeAttestationSigner"`` \| ``"authorizeSigner"`` \| ``"completeSignerAuthorization"`` \| ``"isLegacySigner"`` \| ``"isDefaultSigner"`` \| ``"isIndexedSigner"`` \| ``"isSigner"`` \| ``"removeDefaultSigner"`` \| ``"removeIndexedSigner"`` \| ``"removeSigner"`` \| ``"removeVoteSigner"`` \| ``"removeValidatorSigner"`` \| ``"removeAttestationSigner"`` \| ``"attestationSignerToAccount"`` \| ``"validatorSignerToAccount"`` \| ``"voteSignerToAccount"`` \| ``"signerToAccount"`` \| ``"isLegacyRole"`` \| ``"getLegacySigner"`` \| ``"getDefaultSigner"`` \| ``"getIndexedSigner"`` \| ``"getVoteSigner"`` \| ``"getValidatorSigner"`` \| ``"getAttestationSigner"`` \| ``"hasLegacySigner"`` \| ``"hasDefaultSigner"`` \| ``"hasIndexedSigner"`` \| ``"hasAuthorizedSigner"`` \| ``"hasAuthorizedVoteSigner"`` \| ``"hasAuthorizedValidatorSigner"`` \| ``"hasAuthorizedAttestationSigner"`` \| ``"getName"`` \| ``"getMetadataURL"`` \| ``"batchGetMetadataURL"`` \| ``"getDataEncryptionKey"`` \| ``"getWalletAddress"`` \| ``"isAccount"`` \| ``"isAuthorizedSigner"`` \| ``"getRoleAuthorizationSigner"``, `string`\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[methodIds](wrappers_BaseWrapper.BaseWrapper.md#methodids)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L68)

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

[packages/sdk/contractkit/src/wrappers/Accounts.ts:382](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L382)

___

### setMetadataURL

• **setMetadataURL**: (...`args`: [metadataURL: string]) => `CeloTransactionObject`\<`void`\>

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

[packages/sdk/contractkit/src/wrappers/Accounts.ts:439](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L439)

___

### setName

• **setName**: (...`args`: [name: string]) => `CeloTransactionObject`\<`void`\>

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

[packages/sdk/contractkit/src/wrappers/Accounts.ts:433](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L433)

___

### setPaymentDelegation

• **setPaymentDelegation**: (...`args`: [beneficiary: string, fraction: string \| number]) => `CeloTransactionObject`\<`void`\>

Set a validator's payment delegation settings.

**`Param`**

The address that should receive a portion of validator
payments.

**`Param`**

The fraction of the validator's payment that should be
diverted to `beneficiary` every epoch, given as FixidityLib value. Must not
be greater than 1.

**`Dev`**

Use `deletePaymentDelegation` to unset the payment delegation.

#### Type declaration

▸ (`...args`): `CeloTransactionObject`\<`void`\>

Set a validator's payment delegation settings.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [beneficiary: string, fraction: string \| number] |

##### Returns

`CeloTransactionObject`\<`void`\>

**`Dev`**

Use `deletePaymentDelegation` to unset the payment delegation.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:450](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L450)

___

### signerToAccount

• **signerToAccount**: (`signer`: `string`) => `Promise`\<`string`\>

Returns the account associated with `signer`.

**`Param`**

The address of the account or previously authorized signer.

**`Dev`**

Fails if the `signer` is not an account or previously authorized signer.

#### Type declaration

▸ (`signer`): `Promise`\<`string`\>

Returns the account associated with `signer`.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the account or previously authorized signer. |

##### Returns

`Promise`\<`string`\>

The associated account.

**`Dev`**

Fails if the `signer` is not an account or previously authorized signer.

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:105](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L105)

___

### validatorSignerToAccount

• **validatorSignerToAccount**: (`signer`: `string`) => `Promise`\<`string`\>

Returns the account address given the signer for validating

**`Param`**

Address that is authorized to sign the tx as validator

#### Type declaration

▸ (`signer`): `Promise`\<`string`\>

Returns the account address given the signer for validating

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | Address that is authorized to sign the tx as validator |

##### Returns

`Promise`\<`string`\>

The Account address

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L95)

___

### voteSignerToAccount

• **voteSignerToAccount**: (`signer`: `string`) => `Promise`\<`string`\>

Returns the account address given the signer for voting

**`Param`**

Address that is authorized to sign the tx as voter

#### Type declaration

▸ (`signer`): `Promise`\<`string`\>

Returns the account address given the signer for voting

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | Address that is authorized to sign the tx as voter |

##### Returns

`Promise`\<`string`\>

The Account address

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L86)

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

### authorizeAttestationSigner

▸ **authorizeAttestationSigner**(`signer`, `proofOfSigningKeyPossession`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Authorize an attestation signing key on behalf of this account to another address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the signing key to authorize. |
| `proofOfSigningKeyPossession` | `Signature` | The account address signed by the signer address. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:163](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L163)

___

### authorizeSigner

▸ **authorizeSigner**(`signer`, `role`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `string` |
| `role` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:287](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L287)

___

### authorizeValidatorSigner

▸ **authorizeValidatorSigner**(`signer`, `proofOfSigningKeyPossession`, `validatorsWrapper`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Authorizes an address to sign consensus messages on behalf of the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the signing key to authorize. |
| `proofOfSigningKeyPossession` | `Signature` | The account address signed by the signer address. |
| `validatorsWrapper` | `Object` | - |
| `validatorsWrapper.isValidator` | (`account`: `string`) => `Promise`\<`boolean`\> | - |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:204](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L204)

___

### authorizeValidatorSignerAndBls

▸ **authorizeValidatorSignerAndBls**(`signer`, `proofOfSigningKeyPossession`, `blsPublicKey`, `blsPop`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Authorizes an address to sign consensus messages on behalf of the account. Also switch BLS key at the same time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `string` | The address of the signing key to authorize. |
| `proofOfSigningKeyPossession` | `Signature` | The account address signed by the signer address. |
| `blsPublicKey` | `string` | The BLS public key that the validator is using for consensus, should pass proof of possession. 48 bytes. |
| `blsPop` | `string` | The BLS public key proof-of-possession, which consists of a signature on the account address. 96 bytes. |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:255](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L255)

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

[packages/sdk/contractkit/src/wrappers/Accounts.ts:183](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L183)

___

### completeSignerAuthorization

▸ **completeSignerAuthorization**(`account`, `role`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `role` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:320](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L320)

___

### generateProofOfKeyPossession

▸ **generateProofOfKeyPossession**(`account`, `signer`): `Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `signer` | `string` |

#### Returns

`Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:336](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L336)

___

### generateProofOfKeyPossessionLocally

▸ **generateProofOfKeyPossessionLocally**(`account`, `signer`, `privateKey`): `Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `signer` | `string` |
| `privateKey` | `string` |

#### Returns

`Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:344](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L344)

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

[packages/sdk/contractkit/src/wrappers/Accounts.ts:133](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L133)

___

### getCurrentSigners

▸ **getCurrentSigners**(`address`): `Promise`\<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:125](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L125)

___

### getName

▸ **getName**(`account`, `blockNumber?`): `Promise`\<`string`\>

Returns the set name for the account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Account |
| `blockNumber?` | `number` | Height of result, defaults to tip. |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:353](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L353)

___

### getPastEvents

▸ **getPastEvents**(`event`, `options`): `Promise`\<`EventLog`[]\>

Contract getPastEvents

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"OwnershipTransferred"`` \| ``"RegistrySet"`` \| ``"allEvents"`` \| ``"AccountCreated"`` \| ``"AccountDataEncryptionKeySet"`` \| ``"AccountMetadataURLSet"`` \| ``"AccountNameSet"`` \| ``"AccountWalletAddressSet"`` \| ``"AttestationSignerAuthorized"`` \| ``"AttestationSignerRemoved"`` \| ``"DefaultSignerRemoved"`` \| ``"DefaultSignerSet"`` \| ``"IndexedSignerRemoved"`` \| ``"IndexedSignerSet"`` \| ``"LegacySignerRemoved"`` \| ``"LegacySignerSet"`` \| ``"OffchainStorageRootAdded"`` \| ``"OffchainStorageRootRemoved"`` \| ``"PaymentDelegationSet"`` \| ``"SignerAuthorizationCompleted"`` \| ``"SignerAuthorizationStarted"`` \| ``"SignerAuthorized"`` \| ``"SignerRemoved"`` \| ``"ValidatorSignerAuthorized"`` \| ``"ValidatorSignerRemoved"`` \| ``"VoteSignerAuthorized"`` \| ``"VoteSignerRemoved"`` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`\<`EventLog`[]\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[getPastEvents](wrappers_BaseWrapper.BaseWrapper.md#getpastevents)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L57)

___

### parseSignatureOfAddress

▸ **parseSignatureOfAddress**(`address`, `signer`, `signature`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `signer` | `string` |
| `signature` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `string` |
| `s` | `string` |
| `v` | `number` |

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:494](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L494)

___

### removeAttestationSigner

▸ **removeAttestationSigner**(): `Promise`\<`CeloTransactionObject`\<`void`\>\>

Removes the currently authorized attestation signer for the account

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

A CeloTransactionObject

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:332](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L332)

___

### setAccount

▸ **setAccount**(`name`, `dataEncryptionKey`, `walletAddress`, `proofOfPossession?`): `CeloTransactionObject`\<`void`\>

Convenience Setter for the dataEncryptionKey and wallet address for an account

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | A string to set as the name of the account |
| `dataEncryptionKey` | `string` | `undefined` | secp256k1 public key for data encryption. Preferably compressed. |
| `walletAddress` | `string` | `undefined` | The wallet address to set for the account |
| `proofOfPossession` | ``null`` \| `Signature` | `null` | Signature from the wallet address key over the sender's address |

#### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:394](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L394)

___

### setWalletAddress

▸ **setWalletAddress**(`walletAddress`, `proofOfPossession?`): `CeloTransactionObject`\<`void`\>

Sets the wallet address for the account

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `walletAddress` | `string` | `undefined` |
| `proofOfPossession` | ``null`` \| `Signature` | `null` |

#### Returns

`CeloTransactionObject`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:472](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L472)

___

### startSignerAuthorization

▸ **startSignerAuthorization**(`signer`, `role`): `Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `string` |
| `role` | `string` |

#### Returns

`Promise`\<`CeloTransactionObject`\<`void`\>\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/Accounts.ts:312](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/Accounts.ts#L312)

___

### version

▸ **version**(): `Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Returns

`Promise`\<[`ContractVersion`](versions.ContractVersion.md)\>

#### Inherited from

[BaseWrapper](wrappers_BaseWrapper.BaseWrapper.md).[version](wrappers_BaseWrapper.BaseWrapper.md#version)

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L41)
