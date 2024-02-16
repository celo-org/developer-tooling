[@celo/wallet-base](../README.md) / signing-utils

# Module: signing-utils

## Table of contents

### Variables

- [publicKeyPrefix](signing_utils.md#publickeyprefix)
- [sixtyFour](signing_utils.md#sixtyfour)
- [thirtyTwo](signing_utils.md#thirtytwo)

### Functions

- [chainIdTransformationForSigning](signing_utils.md#chainidtransformationforsigning)
- [decodeSig](signing_utils.md#decodesig)
- [encodeTransaction](signing_utils.md#encodetransaction)
- [extractSignature](signing_utils.md#extractsignature)
- [getHashFromEncoded](signing_utils.md#gethashfromencoded)
- [getSignerFromTxEIP2718TX](signing_utils.md#getsignerfromtxeip2718tx)
- [isPriceToLow](signing_utils.md#ispricetolow)
- [recoverMessageSigner](signing_utils.md#recovermessagesigner)
- [recoverTransaction](signing_utils.md#recovertransaction)
- [rlpEncodedTx](signing_utils.md#rlpencodedtx)
- [stringNumberOrBNToHex](signing_utils.md#stringnumberorbntohex)
- [verifyEIP712TypedDataSigner](signing_utils.md#verifyeip712typeddatasigner)
- [verifySignatureWithoutPrefix](signing_utils.md#verifysignaturewithoutprefix)

## Variables

### publicKeyPrefix

• `Const` **publicKeyPrefix**: `number` = `0x04`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L44)

___

### sixtyFour

• `Const` **sixtyFour**: `number` = `64`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:45](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L45)

___

### thirtyTwo

• `Const` **thirtyTwo**: `number` = `32`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:46](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L46)

## Functions

### chainIdTransformationForSigning

▸ **chainIdTransformationForSigning**(`chainId`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`number`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L56)

___

### decodeSig

▸ **decodeSig**(`sig`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sig` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `Buffer` |
| `s` | `Buffer` |
| `v` | `number` |

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:699](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L699)

___

### encodeTransaction

▸ **encodeTransaction**(`rlpEncoded`, `signature`): `Promise`\<`EncodedTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rlpEncoded` | `RLPEncodedTx` |
| `signature` | `Object` |
| `signature.r` | `Buffer` |
| `signature.s` | `Buffer` |
| `signature.v` | `number` |

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:324](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L324)

___

### extractSignature

▸ **extractSignature**(`rawTx`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawTx` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `string` |
| `s` | `string` |
| `v` | `undefined` \| `string` |

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:407](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L407)

___

### getHashFromEncoded

▸ **getHashFromEncoded**(`rlpEncode`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rlpEncode` | `string` |

#### Returns

`string`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:60](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L60)

___

### getSignerFromTxEIP2718TX

▸ **getSignerFromTxEIP2718TX**(`serializedTransaction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serializedTransaction` | `string` |

#### Returns

`string`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:502](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L502)

___

### isPriceToLow

▸ **isPriceToLow**(`tx`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`boolean`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:273](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L273)

___

### recoverMessageSigner

▸ **recoverMessageSigner**(`signingDataHex`, `signedData`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signingDataHex` | `string` |
| `signedData` | `string` |

#### Returns

`string`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:667](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L667)

___

### recoverTransaction

▸ **recoverTransaction**(`rawTx`): [`CeloTx`, `string`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawTx` | `string` |

#### Returns

[`CeloTx`, `string`]

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:441](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L441)

___

### rlpEncodedTx

▸ **rlpEncodedTx**(`tx`): `RLPEncodedTx`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`RLPEncodedTx`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L115)

___

### stringNumberOrBNToHex

▸ **stringNumberOrBNToHex**(`num?`): `Hex`

#### Parameters

| Name | Type |
| :------ | :------ |
| `num?` | `string` \| `number` \| `BN` |

#### Returns

`Hex`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L99)

___

### verifyEIP712TypedDataSigner

▸ **verifyEIP712TypedDataSigner**(`typedData`, `signedData`, `expectedAddress`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |
| `signedData` | `string` |
| `expectedAddress` | `string` |

#### Returns

`boolean`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:677](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L677)

___

### verifySignatureWithoutPrefix

▸ **verifySignatureWithoutPrefix**(`messageHash`, `signature`, `signer`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageHash` | `string` |
| `signature` | `string` |
| `signer` | `string` |

#### Returns

`boolean`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:686](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L686)
