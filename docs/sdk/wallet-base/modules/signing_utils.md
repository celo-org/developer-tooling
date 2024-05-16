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
- [determineTXType](signing_utils.md#determinetxtype)
- [encodeTransaction](signing_utils.md#encodetransaction)
- [extractPublicKeyFromHashAndSignature](signing_utils.md#extractpublickeyfromhashandsignature)
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

[wallets/wallet-base/src/signing-utils.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L52)

___

### sixtyFour

• `Const` **sixtyFour**: `number` = `64`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L53)

___

### thirtyTwo

• `Const` **thirtyTwo**: `number` = `32`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L54)

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

[wallets/wallet-base/src/signing-utils.ts:68](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L68)

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

[wallets/wallet-base/src/signing-utils.ts:748](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L748)

___

### determineTXType

▸ **determineTXType**(`serializedTransaction`): `OldTransactionTypes`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serializedTransaction` | `string` |

#### Returns

`OldTransactionTypes`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:470](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L470)

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
| `signature.v` | `number` \| `bigint` |

#### Returns

`Promise`\<`EncodedTransaction`\>

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:300](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L300)

___

### extractPublicKeyFromHashAndSignature

▸ **extractPublicKeyFromHashAndSignature**(`«destructured»`, `data`, `_prefix`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `r` | `string` |
| › `s` | `string` |
| › `v` | `number` |
| › `yParity` | ``0`` \| ``1`` |
| `data` | `Uint8Array` \| `NestedUint8Array` |
| `_prefix` | `TxTypeToPrefix` |

#### Returns

`string`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:758](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L758)

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

[wallets/wallet-base/src/signing-utils.ts:390](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L390)

___

### getHashFromEncoded

▸ **getHashFromEncoded**(`rlpEncode`): `StrongAddress`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rlpEncode` | \`0x$\{string}\` |

#### Returns

`StrongAddress`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:72](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L72)

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

[wallets/wallet-base/src/signing-utils.ts:460](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L460)

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

[wallets/wallet-base/src/signing-utils.ts:786](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L786)

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

[wallets/wallet-base/src/signing-utils.ts:800](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L800)

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

[wallets/wallet-base/src/signing-utils.ts:792](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L792)

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

[wallets/wallet-base/src/signing-utils.ts:780](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L780)

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

[wallets/wallet-base/src/signing-utils.ts:261](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L261)

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

[wallets/wallet-base/src/signing-utils.ts:716](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L716)

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

[wallets/wallet-base/src/signing-utils.ts:421](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L421)

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

[wallets/wallet-base/src/signing-utils.ts:130](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L130)

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

[wallets/wallet-base/src/signing-utils.ts:771](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L771)

___

### stringNumberOrBNToHex

▸ **stringNumberOrBNToHex**(`num?`): `StrongAddress`

#### Parameters

| Name | Type |
| :------ | :------ |
| `num?` | `string` \| `number` \| `BN` |

#### Returns

`StrongAddress`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L111)

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

[wallets/wallet-base/src/signing-utils.ts:726](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L726)

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

[wallets/wallet-base/src/signing-utils.ts:735](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L735)
