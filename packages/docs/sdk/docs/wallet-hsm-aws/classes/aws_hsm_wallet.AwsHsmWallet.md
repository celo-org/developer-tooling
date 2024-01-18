[@celo/wallet-hsm-aws](../README.md) / [aws-hsm-wallet](../modules/aws_hsm_wallet.md) / AwsHsmWallet

# Class: AwsHsmWallet

[aws-hsm-wallet](../modules/aws_hsm_wallet.md).AwsHsmWallet

A Cloud HSM wallet built on AWS KMS
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html
When using the default credentials, it's expected to set the
aws_access_key_id and aws_secret_access_key in ~/.aws/credentials

## Hierarchy

- `RemoteWallet`\<[`AwsHsmSigner`](aws_hsm_signer.AwsHsmSigner.md)\>

  ↳ **`AwsHsmWallet`**

## Implements

- `ReadOnlyWallet`

## Table of contents

### Constructors

- [constructor](aws_hsm_wallet.AwsHsmWallet.md#constructor)

### Properties

- [isSetupFinished](aws_hsm_wallet.AwsHsmWallet.md#issetupfinished)

### Methods

- [computeSharedSecret](aws_hsm_wallet.AwsHsmWallet.md#computesharedsecret)
- [decrypt](aws_hsm_wallet.AwsHsmWallet.md#decrypt)
- [getAccounts](aws_hsm_wallet.AwsHsmWallet.md#getaccounts)
- [getAddressFromKeyId](aws_hsm_wallet.AwsHsmWallet.md#getaddressfromkeyid)
- [hasAccount](aws_hsm_wallet.AwsHsmWallet.md#hasaccount)
- [init](aws_hsm_wallet.AwsHsmWallet.md#init)
- [removeAccount](aws_hsm_wallet.AwsHsmWallet.md#removeaccount)
- [signPersonalMessage](aws_hsm_wallet.AwsHsmWallet.md#signpersonalmessage)
- [signTransaction](aws_hsm_wallet.AwsHsmWallet.md#signtransaction)
- [signTypedData](aws_hsm_wallet.AwsHsmWallet.md#signtypeddata)

## Constructors

### constructor

• **new AwsHsmWallet**(`awsCredentials?`): [`AwsHsmWallet`](aws_hsm_wallet.AwsHsmWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `awsCredentials?` | `ClientConfiguration` |

#### Returns

[`AwsHsmWallet`](aws_hsm_wallet.AwsHsmWallet.md)

#### Overrides

RemoteWallet\&lt;AwsHsmSigner\&gt;.constructor

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-wallet.ts#L33)

## Properties

### isSetupFinished

• **isSetupFinished**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Inherited from

RemoteWallet.isSetupFinished

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:51

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`address`, `publicKey`): `Promise`\<`Buffer`\>

Computes the shared secret (an ECDH key exchange object) between two accounts

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

ReadOnlyWallet.computeSharedSecret

#### Inherited from

RemoteWallet.computeSharedSecret

#### Defined in

wallet-base/lib/wallet-base.d.ts:64

___

### decrypt

▸ **decrypt**(`address`, `ciphertext`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `ciphertext` | `Buffer` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

ReadOnlyWallet.decrypt

#### Inherited from

RemoteWallet.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

ReadOnlyWallet.getAccounts

#### Inherited from

RemoteWallet.getAccounts

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:27

___

### getAddressFromKeyId

▸ **getAddressFromKeyId**(`keyId`): `Promise`\<`string`\>

Returns the EVM address for the given key
Useful for initially getting the 'from' field given a keyName

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyId` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm-aws/src/aws-hsm-wallet.ts#L92)

___

### hasAccount

▸ **hasAccount**(`address?`): `boolean`

Returns true if account is in the remote wallet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address?` | `string` | Account to check |

#### Returns

`boolean`

#### Implementation of

ReadOnlyWallet.hasAccount

#### Inherited from

RemoteWallet.hasAccount

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:32

___

### init

▸ **init**(): `Promise`\<`void`\>

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`\<`void`\>

#### Inherited from

RemoteWallet.init

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:15

___

### removeAccount

▸ **removeAccount**(`_address`): `void`

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | `string` |

#### Returns

`void`

#### Implementation of

ReadOnlyWallet.removeAccount

#### Inherited from

RemoteWallet.removeAccount

#### Defined in

wallet-base/lib/wallet-base.d.ts:23

___

### signPersonalMessage

▸ **signPersonalMessage**(`address`, `data`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `data` | `string` | Hex string message to sign |

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signPersonalMessage

#### Inherited from

RemoteWallet.signPersonalMessage

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:43

___

### signTransaction

▸ **signTransaction**(`txParams`): `Promise`\<`EncodedTransaction`\>

Signs the EVM transaction using the signer pulled from the from field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `CeloTx` | EVM transaction |

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Implementation of

ReadOnlyWallet.signTransaction

#### Inherited from

RemoteWallet.signTransaction

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:37

___

### signTypedData

▸ **signTypedData**(`address`, `typedData`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `typedData` | `EIP712TypedData` | the typed data object |

#### Returns

`Promise`\<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signTypedData

#### Inherited from

RemoteWallet.signTypedData

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:49
