[**@celo/keystores**](../../README.md)

***

[@celo/keystores](../../README.md) / [inmemory-keystore](../README.md) / InMemoryKeystore

# Class: InMemoryKeystore

Defined in: [inmemory-keystore.ts:3](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L3)

## Extends

- [`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md)

## Constructors

### Constructor

> **new InMemoryKeystore**(): `InMemoryKeystore`

#### Returns

`InMemoryKeystore`

#### Inherited from

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`constructor`](../../keystore-base/classes/KeystoreBase.md#constructor)

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

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`changeKeystorePassphrase`](../../keystore-base/classes/KeystoreBase.md#changekeystorepassphrase)

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

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`deleteKeystore`](../../keystore-base/classes/KeystoreBase.md#deletekeystore)

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

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`getAddress`](../../keystore-base/classes/KeystoreBase.md#getaddress)

***

### getAddressMap()

> **getAddressMap**(): `Promise`\<`Record`\<`string`, `string`\>\>

Defined in: [keystore-base.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L72)

Maps account addresses to their respective keystore entries (names)

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

Record with account addresses as keys, keystore entry names as values

#### Inherited from

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`getAddressMap`](../../keystore-base/classes/KeystoreBase.md#getaddressmap)

***

### getAllKeystoreNames()

> **getAllKeystoreNames**(): `Promise`\<`string`[]\>

Defined in: [inmemory-keystore.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L18)

Gets a list of the names of each entry in the keystore

#### Returns

`Promise`\<`string`[]\>

#### Overrides

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`getAllKeystoreNames`](../../keystore-base/classes/KeystoreBase.md#getallkeystorenames)

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

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`getKeystoreName`](../../keystore-base/classes/KeystoreBase.md#getkeystorename)

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

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`getPrivateKey`](../../keystore-base/classes/KeystoreBase.md#getprivatekey)

***

### getRawKeystore()

> **getRawKeystore**(`keystoreName`): `string`

Defined in: [inmemory-keystore.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L14)

Returns raw encrypted keystore entry string by name

#### Parameters

##### keystoreName

`string`

Name of keystore entry to retrieve

#### Returns

`string`

#### Overrides

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`getRawKeystore`](../../keystore-base/classes/KeystoreBase.md#getrawkeystore)

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

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`importPrivateKey`](../../keystore-base/classes/KeystoreBase.md#importprivatekey)

***

### listKeystoreAddresses()

> **listKeystoreAddresses**(): `Promise`\<`string`[]\>

Defined in: [keystore-base.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L64)

Gets a list of all account addresses in the keystore

#### Returns

`Promise`\<`string`[]\>

List of account address strings

#### Inherited from

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`listKeystoreAddresses`](../../keystore-base/classes/KeystoreBase.md#listkeystoreaddresses)

***

### persistKeystore()

> **persistKeystore**(`keystoreName`, `keystore`): `void`

Defined in: [inmemory-keystore.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L10)

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

#### Overrides

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`persistKeystore`](../../keystore-base/classes/KeystoreBase.md#persistkeystore)

***

### removeKeystore()

> **removeKeystore**(`keystoreName`): `void`

Defined in: [inmemory-keystore.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L22)

Removes keystore entry from keystore permanently

#### Parameters

##### keystoreName

`string`

Name of keystore entry to remove

#### Returns

`void`

#### Overrides

[`KeystoreBase`](../../keystore-base/classes/KeystoreBase.md).[`removeKeystore`](../../keystore-base/classes/KeystoreBase.md#removekeystore)
