[**@celo/wallet-hsm-aws v8.0.0**](../README.md)

***

[@celo/wallet-hsm-aws](../README.md) / AwsHsmWallet

# Class: AwsHsmWallet

Defined in: [wallet-hsm-aws/src/aws-hsm-wallet.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-wallet.ts#L29)

A Cloud HSM wallet built on AWS KMS
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html
When using the default credentials, it's expected to set the
aws_access_key_id and aws_secret_access_key in ~/.aws/credentials

## Extends

- `RemoteWallet`\<[`AwsHsmSigner`](AwsHsmSigner.md)\>

## Implements

- `ReadOnlyWallet`

## Constructors

### Constructor

> **new AwsHsmWallet**(`awsCredentials?`): `AwsHsmWallet`

Defined in: [wallet-hsm-aws/src/aws-hsm-wallet.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-wallet.ts#L33)

#### Parameters

##### awsCredentials?

`ClientConfiguration`

#### Returns

`AwsHsmWallet`

#### Overrides

`RemoteWallet<AwsHsmSigner>.constructor`

## Properties

### isSetupFinished()

> **isSetupFinished**: () => `boolean`

Defined in: wallet-remote/lib/remote-wallet.d.ts:51

#### Returns

`boolean`

#### Inherited from

`RemoteWallet.isSetupFinished`

## Methods

### computeSharedSecret()

> **computeSharedSecret**(`address`, `publicKey`): `Promise`\<`Buffer`\>

Defined in: wallet-base/lib/wallet-base.d.ts:64

Computes the shared secret (an ECDH key exchange object) between two accounts

#### Parameters

##### address

`string`

##### publicKey

`string`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`ReadOnlyWallet.computeSharedSecret`

#### Inherited from

`RemoteWallet.computeSharedSecret`

***

### decrypt()

> **decrypt**(`address`, `ciphertext`): `Promise`\<`Buffer`\>

Defined in: wallet-base/lib/wallet-base.d.ts:60

#### Parameters

##### address

`string`

##### ciphertext

`Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

`ReadOnlyWallet.decrypt`

#### Inherited from

`RemoteWallet.decrypt`

***

### getAccounts()

> **getAccounts**(): `string`[]

Defined in: wallet-remote/lib/remote-wallet.d.ts:27

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

`ReadOnlyWallet.getAccounts`

#### Inherited from

`RemoteWallet.getAccounts`

***

### getAddressFromKeyId()

> **getAddressFromKeyId**(`keyId`): `Promise`\<`string`\>

Defined in: [wallet-hsm-aws/src/aws-hsm-wallet.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-wallet.ts#L92)

Returns the EVM address for the given key
Useful for initially getting the 'from' field given a keyName

#### Parameters

##### keyId

`string`

#### Returns

`Promise`\<`string`\>

***

### hasAccount()

> **hasAccount**(`address?`): `boolean`

Defined in: wallet-remote/lib/remote-wallet.d.ts:32

Returns true if account is in the remote wallet

#### Parameters

##### address?

`string`

Account to check

#### Returns

`boolean`

#### Implementation of

`ReadOnlyWallet.hasAccount`

#### Inherited from

`RemoteWallet.hasAccount`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: wallet-remote/lib/remote-wallet.d.ts:15

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`\<`void`\>

#### Inherited from

`RemoteWallet.init`

***

### removeAccount()

> **removeAccount**(`_address`): `void`

Defined in: wallet-base/lib/wallet-base.d.ts:23

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

##### \_address

`string`

The address of the account to be removed

#### Returns

`void`

#### Implementation of

`ReadOnlyWallet.removeAccount`

#### Inherited from

`RemoteWallet.removeAccount`

***

### signPersonalMessage()

> **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

Defined in: wallet-remote/lib/remote-wallet.d.ts:43

#### Parameters

##### address

`string`

Address of the account to sign with

##### data

`string`

Hex string message to sign

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

`ReadOnlyWallet.signPersonalMessage`

#### Inherited from

`RemoteWallet.signPersonalMessage`

***

### signTransaction()

> **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Defined in: wallet-remote/lib/remote-wallet.d.ts:37

Signs the EVM transaction using the signer pulled from the from field

#### Parameters

##### txParams

`CeloTx`

EVM transaction

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

`ReadOnlyWallet.signTransaction`

#### Inherited from

`RemoteWallet.signTransaction`

***

### signTypedData()

> **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

Defined in: wallet-remote/lib/remote-wallet.d.ts:49

#### Parameters

##### address

`string`

Address of the account to sign with

##### typedData

`EIP712TypedData`

the typed data object

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

`ReadOnlyWallet.signTypedData`

#### Inherited from

`RemoteWallet.signTypedData`
