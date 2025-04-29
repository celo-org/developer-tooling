[**@celo/wallet-hsm**](../../README.md)

***

[@celo/wallet-hsm](../../README.md) / [signature-utils](../README.md) / makeCanonical

# Function: makeCanonical()

> **makeCanonical**(`S`): `BigNumber`

Defined in: [signature-utils.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-hsm/src/signature-utils.ts#L19)

If the signature is in the "bottom" of the curve, it is non-canonical
Non-canonical signatures are illegal in Ethereum and therefore the S value
must be transposed to the lower intersection
https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki#Low_S_values_in_signatures

## Parameters

### S

`BigNumber`

## Returns

`BigNumber`
