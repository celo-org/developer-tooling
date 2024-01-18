[@celo/wallet-hsm](../README.md) / ber-utils

# Module: ber-utils

## Table of contents

### Functions

- [asn1FromPublicKey](ber_utils.md#asn1frompublickey)
- [parseBERSignature](ber_utils.md#parsebersignature)
- [publicKeyFromAsn1](ber_utils.md#publickeyfromasn1)
- [toArrayBuffer](ber_utils.md#toarraybuffer)

## Functions

### asn1FromPublicKey

▸ **asn1FromPublicKey**(`bn`): `Buffer`

This is used only for mocking
Creates an asn1 key to emulate KMS response

#### Parameters

| Name | Type |
| :------ | :------ |
| `bn` | `BigNumber` |

#### Returns

`Buffer`

#### Defined in

[ber-utils.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/ber-utils.ts#L23)

___

### parseBERSignature

▸ **parseBERSignature**(`b`): `Object`

AWS returns DER encoded signatures but DER is valid BER

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `Buffer` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `Buffer` |
| `s` | `Buffer` |

#### Defined in

[ber-utils.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/ber-utils.ts#L44)

___

### publicKeyFromAsn1

▸ **publicKeyFromAsn1**(`b`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `Buffer` |

#### Returns

`BigNumber`

#### Defined in

[ber-utils.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/ber-utils.ts#L9)

___

### toArrayBuffer

▸ **toArrayBuffer**(`b`): `ArrayBuffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `Buffer` |

#### Returns

`ArrayBuffer`

#### Defined in

[ber-utils.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/ber-utils.ts#L5)
