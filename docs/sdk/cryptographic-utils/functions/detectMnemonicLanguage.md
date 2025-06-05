[**@celo/cryptographic-utils v6.0.0-beta.0**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / detectMnemonicLanguage

# Function: detectMnemonicLanguage()

> **detectMnemonicLanguage**(`words`, `candidates?`): `undefined` \| [`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

Defined in: [cryptographic-utils/src/account.ts:220](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L220)

Detects the language of tokenized mnemonic phrase by applying a heuristic.

## Parameters

### words

`string`[]

### candidates?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)[]

## Returns

`undefined` \| [`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

## Remarks

Uses a heuristic of returning the language with the most matching words. In practice, we
expect all words to come from a single language, also some may be misspelled or otherwise
malformed. It may occasionally occur that a typo results in word from another language (e.g. bag
-> bagr) but this should occur at most once or twice per phrase.
