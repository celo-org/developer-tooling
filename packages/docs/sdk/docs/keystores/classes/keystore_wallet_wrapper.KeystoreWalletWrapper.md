[@celo/keystores](../README.md) / [keystore-wallet-wrapper](../modules/keystore_wallet_wrapper.md) / KeystoreWalletWrapper

# Class: KeystoreWalletWrapper

[keystore-wallet-wrapper](../modules/keystore_wallet_wrapper.md).KeystoreWalletWrapper

Convenience wrapper of the LocalWallet to connect to a keystore

## Table of contents

### Constructors

- [constructor](keystore_wallet_wrapper.KeystoreWalletWrapper.md#constructor)

### Methods

- [getKeystore](keystore_wallet_wrapper.KeystoreWalletWrapper.md#getkeystore)
- [getLocalWallet](keystore_wallet_wrapper.KeystoreWalletWrapper.md#getlocalwallet)
- [importPrivateKey](keystore_wallet_wrapper.KeystoreWalletWrapper.md#importprivatekey)
- [lockAccount](keystore_wallet_wrapper.KeystoreWalletWrapper.md#lockaccount)
- [unlockAccount](keystore_wallet_wrapper.KeystoreWalletWrapper.md#unlockaccount)

## Constructors

### constructor

• **new KeystoreWalletWrapper**(`keystore`): [`KeystoreWalletWrapper`](keystore_wallet_wrapper.KeystoreWalletWrapper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keystore` | [`KeystoreBase`](keystore_base.KeystoreBase.md) |

#### Returns

[`KeystoreWalletWrapper`](keystore_wallet_wrapper.KeystoreWalletWrapper.md)

#### Defined in

[keystore-wallet-wrapper.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L11)

## Methods

### getKeystore

▸ **getKeystore**(): [`KeystoreBase`](keystore_base.KeystoreBase.md)

#### Returns

[`KeystoreBase`](keystore_base.KeystoreBase.md)

#### Defined in

[keystore-wallet-wrapper.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L25)

___

### getLocalWallet

▸ **getLocalWallet**(): `LocalWallet`

#### Returns

`LocalWallet`

#### Defined in

[keystore-wallet-wrapper.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L21)

___

### importPrivateKey

▸ **importPrivateKey**(`privateKey`, `passphrase`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[keystore-wallet-wrapper.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L16)

___

### lockAccount

▸ **lockAccount**(`address`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[keystore-wallet-wrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L34)

___

### unlockAccount

▸ **unlockAccount**(`address`, `passphrase`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[keystore-wallet-wrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L29)
