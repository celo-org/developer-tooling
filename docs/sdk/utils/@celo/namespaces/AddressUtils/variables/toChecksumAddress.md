[**@celo/utils v8.0.3-beta.0**](../../../../README.md)

***

[@celo/utils](../../../../README.md) / [AddressUtils](../README.md) / toChecksumAddress

# Variable: toChecksumAddress()

> `const` **toChecksumAddress**: (`hexAddress`, `eip1191ChainId?`) => `string`

Defined in: node\_modules/@ethereumjs/util/dist/account.d.ts:59

Returns a checksummed address.

If an eip1191ChainId is provided, the chainId will be included in the checksum calculation. This
has the effect of checksummed addresses for one chain having invalid checksums for others.
For more details see [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191).

WARNING: Checksums with and without the chainId will differ and the EIP-1191 checksum is not
backwards compatible to the original widely adopted checksum format standard introduced in
[EIP-55](https://eips.ethereum.org/EIPS/eip-55), so this will break in existing applications.
Usage of this EIP is therefore discouraged unless you have a very targeted use case.

## Parameters

### hexAddress

`string`

### eip1191ChainId?

`BigIntLike`

## Returns

`string`
