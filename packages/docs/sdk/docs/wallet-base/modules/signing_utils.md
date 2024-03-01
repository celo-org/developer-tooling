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
- [handleBigInt](signing_utils.md#handlebigint)
- [handleData](signing_utils.md#handledata)
- [handleHexString](signing_utils.md#handlehexstring)
- [handleNumber](signing_utils.md#handlenumber)
- [isPriceToLow](signing_utils.md#ispricetolow)
- [recoverMessageSigner](signing_utils.md#recovermessagesigner)
- [recoverTransaction](signing_utils.md#recovertransaction)
- [rlpEncodedTx](signing_utils.md#rlpencodedtx)
- [signTransaction](signing_utils.md#signtransaction)
- [stringNumberOrBNToHex](signing_utils.md#stringnumberorbntohex)
- [verifyEIP712TypedDataSigner](signing_utils.md#verifyeip712typeddatasigner)
- [verifySignatureWithoutPrefix](signing_utils.md#verifysignaturewithoutprefix)

## Variables

### publicKeyPrefix

• `Const` **publicKeyPrefix**: `number` = `0x04`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L41)

___

### sixtyFour

• `Const` **sixtyFour**: `number` = `64`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L42)

___

### thirtyTwo

• `Const` **thirtyTwo**: `number` = `32`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L43)

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

[wallets/wallet-base/src/signing-utils.ts:57](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L57)

___

### decodeSig

▸ **decodeSig**(`sig`, `addToV?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sig` | \`0x$\{string}\` \| `RecoveredSignatureType` | `undefined` |
| `addToV` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `Buffer` |
| `s` | `Buffer` |
| `v` | `number` |

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:708](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L708)

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

[wallets/wallet-base/src/signing-utils.ts:325](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L325)

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
| `r` | \`0x$\{string}\` |
| `s` | \`0x$\{string}\` |
| `v` | \`0x$\{string}\` |

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:406](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L406)

___

### getHashFromEncoded

▸ **getHashFromEncoded**(`rlpEncode`): `Hex`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rlpEncode` | `string` |

#### Returns

`Hex`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:61](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L61)

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

[wallets/wallet-base/src/signing-utils.ts:513](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L513)

___

### handleBigInt

▸ **handleBigInt**(`n`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Uint8Array` |

#### Returns

`bigint`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:733](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L733)

___

### handleData

▸ **handleData**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:747](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L747)

___

### handleHexString

▸ **handleHexString**(`adr`): `StrongAddress`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adr` | `Uint8Array` |

#### Returns

`StrongAddress`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:739](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L739)

___

### handleNumber

▸ **handleNumber**(`n`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:727](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L727)

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

[wallets/wallet-base/src/signing-utils.ts:274](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L274)

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

[wallets/wallet-base/src/signing-utils.ts:676](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L676)

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

[wallets/wallet-base/src/signing-utils.ts:437](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L437)

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

[wallets/wallet-base/src/signing-utils.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L116)

___

### signTransaction

▸ **signTransaction**(`hash`, `privateKey`, `addToV?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `hash` | \`0x$\{string}\` | `undefined` |
| `privateKey` | \`0x$\{string}\` | `undefined` |
| `addToV` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `Buffer` |
| `s` | `Buffer` |
| `v` | `number` |

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:718](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L718)

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

[wallets/wallet-base/src/signing-utils.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L100)

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

[wallets/wallet-base/src/signing-utils.ts:686](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L686)

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

[wallets/wallet-base/src/signing-utils.ts:695](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L695)
