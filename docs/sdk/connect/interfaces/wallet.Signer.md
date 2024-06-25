[@celo/connect](../README.md) / [Exports](../modules.md) / [wallet](../modules/wallet.md) / Signer

# Interface: Signer

[wallet](../modules/wallet.md).Signer

## Table of contents

### Properties

- [computeSharedSecret](wallet.Signer.md#computesharedsecret)
- [decrypt](wallet.Signer.md#decrypt)
- [getNativeKey](wallet.Signer.md#getnativekey)
- [signPersonalMessage](wallet.Signer.md#signpersonalmessage)
- [signTransaction](wallet.Signer.md#signtransaction)
- [signTypedData](wallet.Signer.md#signtypeddata)

## Properties

### computeSharedSecret

• **computeSharedSecret**: (`publicKey`: `string`) => `Promise`\<`Buffer`\>

#### Type declaration

▸ (`publicKey`): `Promise`\<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

##### Returns

`Promise`\<`Buffer`\>

#### Defined in

[packages/sdk/connect/src/wallet.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L29)

___

### decrypt

• **decrypt**: (`ciphertext`: `Buffer`) => `Promise`\<`Buffer`\>

#### Type declaration

▸ (`ciphertext`): `Promise`\<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `Buffer` |

##### Returns

`Promise`\<`Buffer`\>

#### Defined in

[packages/sdk/connect/src/wallet.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L28)

___

### getNativeKey

• **getNativeKey**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[packages/sdk/connect/src/wallet.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L27)

___

### signPersonalMessage

• **signPersonalMessage**: (`data`: `string`) => `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Type declaration

▸ (`data`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

##### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Defined in

[packages/sdk/connect/src/wallet.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L25)

___

### signTransaction

• **signTransaction**: (`addToV`: `number`, `encodedTx`: [`RLPEncodedTx`](types.RLPEncodedTx.md)) => `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

Signs the message and returns an EVM transaction

**`Param`**

represents the chainId and is added to the recoveryId to prevent replay

**`Param`**

is the RLPEncoded transaction object

#### Type declaration

▸ (`addToV`, `encodedTx`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

Signs the message and returns an EVM transaction

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addToV` | `number` | represents the chainId and is added to the recoveryId to prevent replay |
| `encodedTx` | [`RLPEncodedTx`](types.RLPEncodedTx.md) | is the RLPEncoded transaction object |

##### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Defined in

[packages/sdk/connect/src/wallet.ts:21](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L21)

___

### signTypedData

• **signTypedData**: (`typedData`: `EIP712TypedData`) => `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Type declaration

▸ (`typedData`): `Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

##### Returns

`Promise`\<\{ `r`: `Buffer` ; `s`: `Buffer` ; `v`: `number`  }\>

#### Defined in

[packages/sdk/connect/src/wallet.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/wallet.ts#L26)
