[**@celo/keystores v5.0.16-beta.0**](../README.md)

***

[@celo/keystores](../README.md) / FileKeystore

# Class: FileKeystore

Defined in: [file-keystore.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L5)

## Extends

- [`KeystoreBase`](KeystoreBase.md)

## Constructors

### Constructor

> **new FileKeystore**(`keystoreDir`): `FileKeystore`

Defined in: [file-keystore.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L17)

Creates (but does not overwrite existing) directory
for containing keystore entries.

#### Parameters

##### keystoreDir

`string`

Path to directory where keystore will be saved

#### Returns

`FileKeystore`

#### Overrides

[`KeystoreBase`](KeystoreBase.md).[`constructor`](KeystoreBase.md#constructor)

## Methods

### changeKeystorePassphrase()

> **changeKeystorePassphrase**(`address`, `oldPassphrase`, `newPassphrase`): `Promise`\<`void`\>

Defined in: [keystore-base.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L132)

Change secret phrase used to encrypt the private key of an address

#### Parameters

##### address

`string`

Account address

##### oldPassphrase

`string`

Secret phrase used to encrypt the private key

##### newPassphrase

`string`

New secret phrase to re-encrypt the private key

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`changeKeystorePassphrase`](KeystoreBase.md#changekeystorepassphrase)

***

### deleteKeystore()

> **deleteKeystore**(`address`): `Promise`\<`void`\>

Defined in: [keystore-base.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L145)

Permanently removes keystore entry from keystore

#### Parameters

##### address

`string`

Account address of keystore to be deleted

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`deleteKeystore`](KeystoreBase.md#deletekeystore)

***

### getAddress()

> **getAddress**(`keystoreName`): `string`

Defined in: [keystore-base.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L51)

Gets the address corresponding to a particular keystore entry

#### Parameters

##### keystoreName

`string`

Name of keystore entry belonging to the address

#### Returns

`string`

Account address

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`getAddress`](KeystoreBase.md#getaddress)

***

### getAddressMap()

> **getAddressMap**(): `Promise`\<`Record`\<`string`, `string`\>\>

Defined in: [keystore-base.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L72)

Maps account addresses to their respective keystore entries (names)

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

Record with account addresses as keys, keystore entry names as values

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`getAddressMap`](KeystoreBase.md#getaddressmap)

***

### getAllKeystoreNames()

> **getAllKeystoreNames**(): `Promise`\<`string`[]\>

Defined in: [file-keystore.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L27)

#### Returns

`Promise`\<`string`[]\>

List of file names (keystore entries) in the keystore

#### Overrides

[`KeystoreBase`](KeystoreBase.md).[`getAllKeystoreNames`](KeystoreBase.md#getallkeystorenames)

***

### getKeystoreName()

> **getKeystoreName**(`address`): `Promise`\<`string`\>

Defined in: [keystore-base.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L106)

Gets name of keystore entry corresponding to an address

#### Parameters

##### address

`string`

Account address

#### Returns

`Promise`\<`string`\>

Name of corresponding keystore entry

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`getKeystoreName`](KeystoreBase.md#getkeystorename)

***

### getPrivateKey()

> **getPrivateKey**(`address`, `passphrase`): `Promise`\<`string`\>

Defined in: [keystore-base.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L120)

Gets decrypted (plaintext) private key for an account address

#### Parameters

##### address

`string`

Account address

##### passphrase

`string`

Secret phrase used to encrypt the private key

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`getPrivateKey`](KeystoreBase.md#getprivatekey)

***

### getRawKeystore()

> **getRawKeystore**(`keystoreName`): `string`

Defined in: [file-keystore.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L45)

Gets contents of keystore entry file

#### Parameters

##### keystoreName

`string`

File name of keystore entry

#### Returns

`string`

V3Keystore string entry

#### Overrides

[`KeystoreBase`](KeystoreBase.md).[`getRawKeystore`](KeystoreBase.md#getrawkeystore)

***

### importPrivateKey()

> **importPrivateKey**(`privateKey`, `passphrase`): `Promise`\<`void`\>

Defined in: [keystore-base.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L86)

Encrypts and stores a private key as a new keystore entry

#### Parameters

##### privateKey

`string`

Private key to encrypted

##### passphrase

`string`

Secret string to encrypt private key

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`importPrivateKey`](KeystoreBase.md#importprivatekey)

***

### listKeystoreAddresses()

> **listKeystoreAddresses**(): `Promise`\<`string`[]\>

Defined in: [keystore-base.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L64)

Gets a list of all account addresses in the keystore

#### Returns

`Promise`\<`string`[]\>

List of account address strings

#### Inherited from

[`KeystoreBase`](KeystoreBase.md).[`listKeystoreAddresses`](KeystoreBase.md#listkeystoreaddresses)

***

### persistKeystore()

> **persistKeystore**(`keystoreName`, `keystore`): `void`

Defined in: [file-keystore.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L36)

Saves keystore entries as a file in the keystore directory

#### Parameters

##### keystoreName

`string`

File name of keystore entry

##### keystore

`string`

V3Keystore string entry

#### Returns

`void`

#### Overrides

[`KeystoreBase`](KeystoreBase.md).[`persistKeystore`](KeystoreBase.md#persistkeystore)

***

### removeKeystore()

> **removeKeystore**(`keystoreName`): `void`

Defined in: [file-keystore.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L53)

Deletes file keystore entry from directory

#### Parameters

##### keystoreName

`string`

File name of keystore entry to be removed

#### Returns

`void`

#### Overrides

[`KeystoreBase`](KeystoreBase.md).[`removeKeystore`](KeystoreBase.md#removekeystore)
