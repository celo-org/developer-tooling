[@celo/wallet-hsm](../README.md) / signature-utils

# Module: signature-utils

## Table of contents

### Classes

- [Signature](../classes/signature_utils.Signature.md)

### Variables

- [publicKeyPrefix](signature_utils.md#publickeyprefix)
- [sixtyFour](signature_utils.md#sixtyfour)
- [thirtyTwo](signature_utils.md#thirtytwo)

### Functions

- [bigNumberToBuffer](signature_utils.md#bignumbertobuffer)
- [bufferToBigNumber](signature_utils.md#buffertobignumber)
- [getAddressFromPublicKey](signature_utils.md#getaddressfrompublickey)
- [makeCanonical](signature_utils.md#makecanonical)
- [recoverKeyIndex](signature_utils.md#recoverkeyindex)

## Variables

### publicKeyPrefix

• `Const` **publicKeyPrefix**: `number` = `0x04`

#### Defined in

[signature-utils.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L9)

___

### sixtyFour

• `Const` **sixtyFour**: `number` = `64`

#### Defined in

[signature-utils.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L10)

___

### thirtyTwo

• `Const` **thirtyTwo**: `number` = `32`

#### Defined in

[signature-utils.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L11)

## Functions

### bigNumberToBuffer

▸ **bigNumberToBuffer**(`input`, `lengthInBytes`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `BigNumber` |
| `lengthInBytes` | `number` |

#### Returns

`Buffer`

#### Defined in

[signature-utils.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L32)

___

### bufferToBigNumber

▸ **bufferToBigNumber**(`input`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Buffer` |

#### Returns

`BigNumber`

#### Defined in

[signature-utils.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L28)

___

### getAddressFromPublicKey

▸ **getAddressFromPublicKey**(`publicKey`): `Address`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `BigNumber` |

#### Returns

`Address`

#### Defined in

[signature-utils.ts:99](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L99)

___

### makeCanonical

▸ **makeCanonical**(`S`): `BigNumber`

If the signature is in the "bottom" of the curve, it is non-canonical
Non-canonical signatures are illegal in Ethereum and therefore the S value
must be transposed to the lower intersection
https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki#Low_S_values_in_signatures

#### Parameters

| Name | Type |
| :------ | :------ |
| `S` | `BigNumber` |

#### Returns

`BigNumber`

#### Defined in

[signature-utils.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L19)

___

### recoverKeyIndex

▸ **recoverKeyIndex**(`signature`, `_publicKey`, `hash`): `number`

Attempts each recovery key to find a match

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `Uint8Array` |
| `_publicKey` | `BigNumber` |
| `hash` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[signature-utils.ts:56](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L56)
