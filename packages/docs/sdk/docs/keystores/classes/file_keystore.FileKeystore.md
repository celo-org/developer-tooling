[@celo/keystores](../README.md) / [file-keystore](../modules/file_keystore.md) / FileKeystore

# Class: FileKeystore

[file-keystore](../modules/file_keystore.md).FileKeystore

## Hierarchy

- [`KeystoreBase`](keystore_base.KeystoreBase.md)

  ↳ **`FileKeystore`**

## Table of contents

### Constructors

- [constructor](file_keystore.FileKeystore.md#constructor)

### Methods

- [changeKeystorePassphrase](file_keystore.FileKeystore.md#changekeystorepassphrase)
- [deleteKeystore](file_keystore.FileKeystore.md#deletekeystore)
- [getAddress](file_keystore.FileKeystore.md#getaddress)
- [getAddressMap](file_keystore.FileKeystore.md#getaddressmap)
- [getAllKeystoreNames](file_keystore.FileKeystore.md#getallkeystorenames)
- [getKeystoreName](file_keystore.FileKeystore.md#getkeystorename)
- [getPrivateKey](file_keystore.FileKeystore.md#getprivatekey)
- [getRawKeystore](file_keystore.FileKeystore.md#getrawkeystore)
- [importPrivateKey](file_keystore.FileKeystore.md#importprivatekey)
- [listKeystoreAddresses](file_keystore.FileKeystore.md#listkeystoreaddresses)
- [persistKeystore](file_keystore.FileKeystore.md#persistkeystore)
- [removeKeystore](file_keystore.FileKeystore.md#removekeystore)

## Constructors

### constructor

• **new FileKeystore**(`keystoreDir`): [`FileKeystore`](file_keystore.FileKeystore.md)

Creates (but does not overwrite existing) directory
for containing keystore entries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreDir` | `string` | Path to directory where keystore will be saved |

#### Returns

[`FileKeystore`](file_keystore.FileKeystore.md)

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[constructor](keystore_base.KeystoreBase.md#constructor)

#### Defined in

[file-keystore.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L17)

## Methods

### changeKeystorePassphrase

▸ **changeKeystorePassphrase**(`address`, `oldPassphrase`, `newPassphrase`): `Promise`\<`void`\>

Change secret phrase used to encrypt the private key of an address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `oldPassphrase` | `string` | Secret phrase used to encrypt the private key |
| `newPassphrase` | `string` | New secret phrase to re-encrypt the private key |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[changeKeystorePassphrase](keystore_base.KeystoreBase.md#changekeystorepassphrase)

#### Defined in

[keystore-base.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L132)

___

### deleteKeystore

▸ **deleteKeystore**(`address`): `Promise`\<`void`\>

Permanently removes keystore entry from keystore

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address of keystore to be deleted |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[deleteKeystore](keystore_base.KeystoreBase.md#deletekeystore)

#### Defined in

[keystore-base.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L145)

___

### getAddress

▸ **getAddress**(`keystoreName`): `string`

Gets the address corresponding to a particular keystore entry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry belonging to the address |

#### Returns

`string`

Account address

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[getAddress](keystore_base.KeystoreBase.md#getaddress)

#### Defined in

[keystore-base.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L51)

___

### getAddressMap

▸ **getAddressMap**(): `Promise`\<`Record`\<`string`, `string`\>\>

Maps account addresses to their respective keystore entries (names)

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

Record with account addresses as keys, keystore entry names as values

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[getAddressMap](keystore_base.KeystoreBase.md#getaddressmap)

#### Defined in

[keystore-base.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L72)

___

### getAllKeystoreNames

▸ **getAllKeystoreNames**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

List of file names (keystore entries) in the keystore

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[getAllKeystoreNames](keystore_base.KeystoreBase.md#getallkeystorenames)

#### Defined in

[file-keystore.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L27)

___

### getKeystoreName

▸ **getKeystoreName**(`address`): `Promise`\<`string`\>

Gets name of keystore entry corresponding to an address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |

#### Returns

`Promise`\<`string`\>

Name of corresponding keystore entry

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[getKeystoreName](keystore_base.KeystoreBase.md#getkeystorename)

#### Defined in

[keystore-base.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L106)

___

### getPrivateKey

▸ **getPrivateKey**(`address`, `passphrase`): `Promise`\<`string`\>

Gets decrypted (plaintext) private key for an account address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `passphrase` | `string` | Secret phrase used to encrypt the private key |

#### Returns

`Promise`\<`string`\>

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[getPrivateKey](keystore_base.KeystoreBase.md#getprivatekey)

#### Defined in

[keystore-base.ts:120](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L120)

___

### getRawKeystore

▸ **getRawKeystore**(`keystoreName`): `string`

Gets contents of keystore entry file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | File name of keystore entry |

#### Returns

`string`

V3Keystore string entry

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[getRawKeystore](keystore_base.KeystoreBase.md#getrawkeystore)

#### Defined in

[file-keystore.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L45)

___

### importPrivateKey

▸ **importPrivateKey**(`privateKey`, `passphrase`): `Promise`\<`void`\>

Encrypts and stores a private key as a new keystore entry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `string` | Private key to encrypted |
| `passphrase` | `string` | Secret string to encrypt private key |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[importPrivateKey](keystore_base.KeystoreBase.md#importprivatekey)

#### Defined in

[keystore-base.ts:86](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L86)

___

### listKeystoreAddresses

▸ **listKeystoreAddresses**(): `Promise`\<`string`[]\>

Gets a list of all account addresses in the keystore

#### Returns

`Promise`\<`string`[]\>

List of account address strings

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[listKeystoreAddresses](keystore_base.KeystoreBase.md#listkeystoreaddresses)

#### Defined in

[keystore-base.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-base.ts#L64)

___

### persistKeystore

▸ **persistKeystore**(`keystoreName`, `keystore`): `void`

Saves keystore entries as a file in the keystore directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | File name of keystore entry |
| `keystore` | `string` | V3Keystore string entry |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[persistKeystore](keystore_base.KeystoreBase.md#persistkeystore)

#### Defined in

[file-keystore.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L36)

___

### removeKeystore

▸ **removeKeystore**(`keystoreName`): `void`

Deletes file keystore entry from directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | File name of keystore entry to be removed |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[removeKeystore](keystore_base.KeystoreBase.md#removekeystore)

#### Defined in

[file-keystore.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/file-keystore.ts#L53)
