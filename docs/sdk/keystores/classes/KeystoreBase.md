[**@celo/keystores v5.0.15-beta.1**](../README.md)

***

[@celo/keystores](../README.md) / KeystoreBase

# Class: `abstract` KeystoreBase

Defined in: [keystore-base.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L15)

## Extended by

- [`FileKeystore`](FileKeystore.md)
- [`InMemoryKeystore`](InMemoryKeystore.md)

## Constructors

### Constructor

> **new KeystoreBase**(): `KeystoreBase`

#### Returns

`KeystoreBase`

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

***

### getAddressMap()

> **getAddressMap**(): `Promise`\<`Record`\<`string`, `string`\>\>

Defined in: [keystore-base.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L72)

Maps account addresses to their respective keystore entries (names)

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

Record with account addresses as keys, keystore entry names as values

***

### getAllKeystoreNames()

> `abstract` **getAllKeystoreNames**(): `Promise`\<`string`[]\>

Defined in: [keystore-base.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L38)

Gets a list of the names of each entry in the keystore

#### Returns

`Promise`\<`string`[]\>

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

***

### getRawKeystore()

> `abstract` **getRawKeystore**(`keystoreName`): `string`

Defined in: [keystore-base.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L33)

Returns raw encrypted keystore entry string by name

#### Parameters

##### keystoreName

`string`

Name of keystore entry to retrieve

#### Returns

`string`

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

***

### listKeystoreAddresses()

> **listKeystoreAddresses**(): `Promise`\<`string`[]\>

Defined in: [keystore-base.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L64)

Gets a list of all account addresses in the keystore

#### Returns

`Promise`\<`string`[]\>

List of account address strings

***

### persistKeystore()

> `abstract` **persistKeystore**(`keystoreName`, `keystore`): `void`

Defined in: [keystore-base.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L27)

Saves encrypted keystore entry (i.e. to disk, database, ...). Must be implemented by subclass.

#### Parameters

##### keystoreName

`string`

Name of keystore entry to be saved

##### keystore

`string`

encrypted V3Keystore string entry

#### Returns

`void`

***

### removeKeystore()

> `abstract` **removeKeystore**(`keystoreName`): `void`

Defined in: [keystore-base.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L44)

Removes keystore entry from keystore permanently

#### Parameters

##### keystoreName

`string`

Name of keystore entry to remove

#### Returns

`void`
