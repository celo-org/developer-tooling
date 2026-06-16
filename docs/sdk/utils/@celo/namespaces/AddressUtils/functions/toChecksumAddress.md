[**@celo/utils v8.0.3**](../../../../README.md)

***

[@celo/utils](../../../../README.md) / [AddressUtils](../README.md) / toChecksumAddress

# Function: toChecksumAddress()

> **toChecksumAddress**(`address`, `chainId?`): `` `0x${string}` ``

Defined in: node\_modules/viem/\_types/utils/address/getAddress.d.ts:20

## Parameters

### address

`string`

### chainId?

`number`

Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
wider Ethereum ecosystem, meaning it will break when validated against an application/tool
that relies on EIP-55 checksum encoding (checksum without chainId).

It is highly recommended to not use this feature unless you
know what you are doing.

See more: https://github.com/ethereum/EIPs/issues/1121

## Returns

`` `0x${string}` ``
