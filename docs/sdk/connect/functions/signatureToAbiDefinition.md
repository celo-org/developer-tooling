[**@celo/connect v7.0.0**](../README.md)

***

[@celo/connect](../globals.md) / signatureToAbiDefinition

# Function: signatureToAbiDefinition()

> **signatureToAbiDefinition**(`fnSignature`): [`ABIDefinition`](../interfaces/ABIDefinition.md)

Defined in: [packages/sdk/connect/src/utils/abi-utils.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/utils/abi-utils.ts#L34)

Parses solidity function signature

## Parameters

### fnSignature

`string`

The function signature

## Returns

[`ABIDefinition`](../interfaces/ABIDefinition.md)

AbiItem structure that can be used to encode/decode

## Dev

example of input function signature: transfer(address,uint256)
example of output structure can be found in propose.test.ts variable `structAbiDefinition`
supports tuples eg. mint(uint256, (uint256, uint256))
and structs eg. mint(uint256, (uint256 a, uint256 b))
