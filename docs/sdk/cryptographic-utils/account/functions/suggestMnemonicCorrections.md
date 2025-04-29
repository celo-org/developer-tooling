[**@celo/cryptographic-utils**](../../README.md)

***

[@celo/cryptographic-utils](../../modules.md) / [account](../README.md) / suggestMnemonicCorrections

# Function: suggestMnemonicCorrections()

> **suggestMnemonicCorrections**(`mnemonic`, `language?`, `strength?`): `Generator`\<`string`\>

Defined in: [cryptographic-utils/src/account.ts:275](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L275)

Generates a list of suggested corrections to the mnemonic phrase based on a set of heuristics.

## Parameters

### mnemonic

`string`

### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

### strength?

[`MnemonicStrength`](../enumerations/MnemonicStrength.md)

## Returns

`Generator`\<`string`\>

## Remarks

Each yielded suggestion represents an attempt to correct the seed phrase by replacing any invalid
words with the most likely valid words. Returned suggestions phrases are ordered by probability
based on a noisy channel model, described in detail in CIP-39.

The generated list of suggestions is exponential in size, and effectively infinite. One should
not attempt to generate the entire list.

All yielded suggestions will have a valid checksum, but are not guaranteed to correspond to any
given wallet. If the phrase is being used to recover a wallet with non-zero balance, it is
suggested that the caller check the balance of the derived wallet address. If the balance is
non-zero, they can be sure that the phrase is correct. If it is zero, then they should continue
and try the next suggestion.

It is recommended to normalize the mnemonic phrase before inputting to this function.
