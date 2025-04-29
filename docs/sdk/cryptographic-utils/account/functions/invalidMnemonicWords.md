[**@celo/cryptographic-utils**](../../README.md)

***

[@celo/cryptographic-utils](../../modules.md) / [account](../README.md) / invalidMnemonicWords

# Function: invalidMnemonicWords()

> **invalidMnemonicWords**(`mnemonic`, `language?`): `undefined` \| `string`[]

Defined in: [cryptographic-utils/src/account.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L95)

Return a list of the words in the mnemonic that are not in the list of valid BIP-39 words for the
specified or detected language.

## Parameters

### mnemonic

`string`

### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

## Returns

`undefined` \| `string`[]

## Remarks

Will return undefined if the language cannot be detected (e.g.  all the words are
invalid, or half of the valid words are from one language and the other half from another.)
