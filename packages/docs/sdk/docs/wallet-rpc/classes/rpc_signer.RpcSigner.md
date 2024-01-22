[@celo/wallet-rpc](../README.md) / [rpc-signer](../modules/rpc_signer.md) / RpcSigner

# Class: RpcSigner

[rpc-signer](../modules/rpc_signer.md).RpcSigner

Implements the signer interface on top of the JSON-RPC interface.

## Implements

- `Signer`

## Table of contents

### Constructors

- [constructor](rpc_signer.RpcSigner.md#constructor)

### Methods

- [computeSharedSecret](rpc_signer.RpcSigner.md#computesharedsecret)
- [decrypt](rpc_signer.RpcSigner.md#decrypt)
- [getNativeKey](rpc_signer.RpcSigner.md#getnativekey)
- [init](rpc_signer.RpcSigner.md#init)
- [isUnlocked](rpc_signer.RpcSigner.md#isunlocked)
- [signPersonalMessage](rpc_signer.RpcSigner.md#signpersonalmessage)
- [signRawTransaction](rpc_signer.RpcSigner.md#signrawtransaction)
- [signTransaction](rpc_signer.RpcSigner.md#signtransaction)
- [signTypedData](rpc_signer.RpcSigner.md#signtypeddata)
- [unlock](rpc_signer.RpcSigner.md#unlock)

## Constructors

### constructor

• **new RpcSigner**(`rpc`, `account`, `unlockBufferSeconds?`, `unlockTime?`, `unlockDuration?`): [`RpcSigner`](rpc_signer.RpcSigner.md)

Construct a new instance of the RPC signer

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `rpc` | `RpcCaller` | `undefined` | RPC caller instance |
| `account` | `string` | `undefined` | Account address derived from the private key to be called in init |
| `unlockBufferSeconds` | `number` | `5` | Number of seconds to shrink the unlocked duration by to account for latency and timing inconsistencies on the node |
| `unlockTime?` | `number` | `undefined` | Timestamp in seconds when the signer was last unlocked |
| `unlockDuration?` | `number` | `undefined` | Number of seconds that the signer was last unlocked for |

#### Returns

[`RpcSigner`](rpc_signer.RpcSigner.md)

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L64)

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`_publicKey`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_publicKey` | `string` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.computeSharedSecret

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:174](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L174)

___

### decrypt

▸ **decrypt**(`ciphertext`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `Buffer` |

#### Returns

`Promise`\<`Buffer`\>

#### Implementation of

Signer.decrypt

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:165](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L165)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L123)

___

### init

▸ **init**(`privateKey`, `passphrase`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L72)

___

### isUnlocked

▸ **isUnlocked**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:147](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L147)

___

### signPersonalMessage

▸ **signPersonalMessage**(`data`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signPersonalMessage

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L115)

___

### signRawTransaction

▸ **signRawTransaction**(`tx`): `Promise`\<`EncodedTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:78](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L78)

___

### signTransaction

▸ **signTransaction**(): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signTransaction

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L102)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Implementation of

Signer.signTypedData

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:106](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L106)

___

### unlock

▸ **unlock**(`passphrase`, `duration`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `passphrase` | `string` |
| `duration` | `number` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts:125](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-rpc/src/rpc-signer.ts#L125)
