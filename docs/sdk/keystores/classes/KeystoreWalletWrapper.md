[**@celo/keystores v5.0.15-beta.0**](../README.md)

***

[@celo/keystores](../README.md) / KeystoreWalletWrapper

# Class: KeystoreWalletWrapper

Defined in: [keystore-wallet-wrapper.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L7)

Convenience wrapper of the LocalWallet to connect to a keystore

## Constructors

### Constructor

> **new KeystoreWalletWrapper**(`keystore`): `KeystoreWalletWrapper`

Defined in: [keystore-wallet-wrapper.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L11)

#### Parameters

##### keystore

[`KeystoreBase`](KeystoreBase.md)

#### Returns

`KeystoreWalletWrapper`

## Methods

### getKeystore()

> **getKeystore**(): [`KeystoreBase`](KeystoreBase.md)

Defined in: [keystore-wallet-wrapper.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L25)

#### Returns

[`KeystoreBase`](KeystoreBase.md)

***

### getLocalWallet()

> **getLocalWallet**(): `LocalWallet`

Defined in: [keystore-wallet-wrapper.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L21)

#### Returns

`LocalWallet`

***

### importPrivateKey()

> **importPrivateKey**(`privateKey`, `passphrase`): `Promise`\<`void`\>

Defined in: [keystore-wallet-wrapper.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L16)

#### Parameters

##### privateKey

`string`

##### passphrase

`string`

#### Returns

`Promise`\<`void`\>

***

### lockAccount()

> **lockAccount**(`address`): `Promise`\<`void`\>

Defined in: [keystore-wallet-wrapper.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L34)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`void`\>

***

### unlockAccount()

> **unlockAccount**(`address`, `passphrase`): `Promise`\<`void`\>

Defined in: [keystore-wallet-wrapper.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/keystores/src/keystore-wallet-wrapper.ts#L29)

#### Parameters

##### address

`string`

##### passphrase

`string`

#### Returns

`Promise`\<`void`\>
