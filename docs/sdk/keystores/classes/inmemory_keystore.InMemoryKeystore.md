[@celo/keystores](../README.md) / [inmemory-keystore](../modules/inmemory_keystore.md) / InMemoryKeystore

# Class: InMemoryKeystore

[inmemory-keystore](../modules/inmemory_keystore.md).InMemoryKeystore

## Hierarchy

- [`KeystoreBase`](keystore_base.KeystoreBase.md)

  ↳ **`InMemoryKeystore`**

## Table of contents

### Constructors

- [constructor](inmemory_keystore.InMemoryKeystore.md#constructor)

### Methods

- [changeKeystorePassphrase](inmemory_keystore.InMemoryKeystore.md#changekeystorepassphrase)
- [deleteKeystore](inmemory_keystore.InMemoryKeystore.md#deletekeystore)
- [getAddress](inmemory_keystore.InMemoryKeystore.md#getaddress)
- [getAddressMap](inmemory_keystore.InMemoryKeystore.md#getaddressmap)
- [getAllKeystoreNames](inmemory_keystore.InMemoryKeystore.md#getallkeystorenames)
- [getKeystoreName](inmemory_keystore.InMemoryKeystore.md#getkeystorename)
- [getPrivateKey](inmemory_keystore.InMemoryKeystore.md#getprivatekey)
- [getRawKeystore](inmemory_keystore.InMemoryKeystore.md#getrawkeystore)
- [importPrivateKey](inmemory_keystore.InMemoryKeystore.md#importprivatekey)
- [listKeystoreAddresses](inmemory_keystore.InMemoryKeystore.md#listkeystoreaddresses)
- [persistKeystore](inmemory_keystore.InMemoryKeystore.md#persistkeystore)
- [removeKeystore](inmemory_keystore.InMemoryKeystore.md#removekeystore)

## Constructors

### constructor

• **new InMemoryKeystore**(): [`InMemoryKeystore`](inmemory_keystore.InMemoryKeystore.md)

#### Returns

[`InMemoryKeystore`](inmemory_keystore.InMemoryKeystore.md)

#### Inherited from

[KeystoreBase](keystore_base.KeystoreBase.md).[constructor](keystore_base.KeystoreBase.md#constructor)

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

Gets a list of the names of each entry in the keystore

#### Returns

`Promise`\<`string`[]\>

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[getAllKeystoreNames](keystore_base.KeystoreBase.md#getallkeystorenames)

#### Defined in

[inmemory-keystore.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L18)

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

Returns raw encrypted keystore entry string by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry to retrieve |

#### Returns

`string`

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[getRawKeystore](keystore_base.KeystoreBase.md#getrawkeystore)

#### Defined in

[inmemory-keystore.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L14)

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

Saves encrypted keystore entry (i.e. to disk, database, ...). Must be implemented by subclass.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry to be saved |
| `keystore` | `string` | encrypted V3Keystore string entry |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[persistKeystore](keystore_base.KeystoreBase.md#persistkeystore)

#### Defined in

[inmemory-keystore.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L10)

___

### removeKeystore

▸ **removeKeystore**(`keystoreName`): `void`

Removes keystore entry from keystore permanently

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry to remove |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystore_base.KeystoreBase.md).[removeKeystore](keystore_base.KeystoreBase.md#removekeystore)

#### Defined in

[inmemory-keystore.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/inmemory-keystore.ts#L22)
