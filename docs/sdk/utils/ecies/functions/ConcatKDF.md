[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [ecies](../README.md) / ConcatKDF

# Function: ConcatKDF()

> **ConcatKDF**(`px`, `kdLen`): `Buffer`

Defined in: [packages/sdk/utils/src/ecies.ts:48](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/ecies.ts#L48)

NIST 8000-56C Rev 1 One Step KDF with the following parameters:
- H(x) is SHA-256(x)
- Fixed info is null

TODO:
- Implement proper ceiling on reps.

## Parameters

### px

`Buffer`

Input keying material to derive key from.

### kdLen

`number`

Length of output in bytes

## Returns

`Buffer`

Output keying material of length kdLen bytes.
