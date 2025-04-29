[**@celo/cryptographic-utils**](../../README.md)

***

[@celo/cryptographic-utils](../../modules.md) / [account](../README.md) / normalizeMnemonic

# Function: normalizeMnemonic()

> **normalizeMnemonic**(`mnemonic`, `language?`): `string`

Defined in: [cryptographic-utils/src/account.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L116)

Normalize the mnemonic phrase to eliminate a number of inconsistencies with standard BIP-39
phrases that are likely to arise when a user manually enters a phrase.

## Parameters

### mnemonic

`string`

### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

## Returns

`string`

## Remarks

Note that this does not guarantee that the output is a valid mnemonic phrase, or even
that all the words in the phrase are contained in a valid wordlist.
