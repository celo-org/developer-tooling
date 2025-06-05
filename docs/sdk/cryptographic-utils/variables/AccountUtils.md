[**@celo/cryptographic-utils v6.0.0-beta.0**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / AccountUtils

# Variable: AccountUtils

> `const` **AccountUtils**: `object`

Defined in: [cryptographic-utils/src/account.ts:468](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L468)

## Type declaration

### detectMnemonicLanguage()

> **detectMnemonicLanguage**: (`words`, `candidates?`) => `undefined` \| [`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

Detects the language of tokenized mnemonic phrase by applying a heuristic.

#### Parameters

##### words

`string`[]

##### candidates?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)[]

#### Returns

`undefined` \| [`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

#### Remarks

Uses a heuristic of returning the language with the most matching words. In practice, we
expect all words to come from a single language, also some may be misspelled or otherwise
malformed. It may occasionally occur that a typo results in word from another language (e.g. bag
-> bagr) but this should occur at most once or twice per phrase.

### generateKeys()

> **generateKeys**: (`mnemonic`, `password?`, `changeIndex`, `addressIndex`, `bip39ToUse`, `derivationPath`) => `Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>

#### Parameters

##### mnemonic

`string`

##### password?

`string`

##### changeIndex?

`number` = `0`

##### addressIndex?

`number` = `0`

##### bip39ToUse?

[`Bip39`](../interfaces/Bip39.md) = `bip39Wrapper`

##### derivationPath?

`string` = `ETHEREUM_DERIVATION_PATH`

#### Returns

`Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>

### generateKeysFromSeed()

> **generateKeysFromSeed**: (`seed`, `changeIndex`, `addressIndex`, `derivationPath`) => `object`

#### Parameters

##### seed

`Buffer`

##### changeIndex

`number` = `0`

##### addressIndex

`number` = `0`

##### derivationPath

`string` = `ETHEREUM_DERIVATION_PATH`

#### Returns

`object`

##### address

> **address**: `string`

##### privateKey

> **privateKey**: `string`

##### publicKey

> **publicKey**: `string`

### generateMnemonic()

> **generateMnemonic**: (`strength`, `language?`, `bip39ToUse`) => `Promise`\<`string`\>

#### Parameters

##### strength

[`MnemonicStrength`](../enumerations/MnemonicStrength.md) = `MnemonicStrength.s256_24words`

##### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

##### bip39ToUse?

[`Bip39`](../interfaces/Bip39.md) = `bip39Wrapper`

#### Returns

`Promise`\<`string`\>

### generateSeed()

> **generateSeed**: (`mnemonic`, `password?`, `bip39ToUse`, `keyByteLength`) => `Promise`\<`Buffer`\>

#### Parameters

##### mnemonic

`string`

##### password?

`string`

##### bip39ToUse?

[`Bip39`](../interfaces/Bip39.md) = `bip39Wrapper`

##### keyByteLength?

`number` = `64`

#### Returns

`Promise`\<`Buffer`\>

### invalidMnemonicWords()

> **invalidMnemonicWords**: (`mnemonic`, `language?`) => `undefined` \| `string`[]

Return a list of the words in the mnemonic that are not in the list of valid BIP-39 words for the
specified or detected language.

#### Parameters

##### mnemonic

`string`

##### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

#### Returns

`undefined` \| `string`[]

#### Remarks

Will return undefined if the language cannot be detected (e.g.  all the words are
invalid, or half of the valid words are from one language and the other half from another.)

### normalizeMnemonic()

> **normalizeMnemonic**: (`mnemonic`, `language?`) => `string`

Normalize the mnemonic phrase to eliminate a number of inconsistencies with standard BIP-39
phrases that are likely to arise when a user manually enters a phrase.

#### Parameters

##### mnemonic

`string`

##### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

#### Returns

`string`

#### Remarks

Note that this does not guarantee that the output is a valid mnemonic phrase, or even
that all the words in the phrase are contained in a valid wordlist.

### suggestMnemonicCorrections()

> **suggestMnemonicCorrections**: (`mnemonic`, `language?`, `strength?`) => `Generator`\<`string`\>

Generates a list of suggested corrections to the mnemonic phrase based on a set of heuristics.

#### Parameters

##### mnemonic

`string`

##### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

##### strength?

[`MnemonicStrength`](../enumerations/MnemonicStrength.md)

#### Returns

`Generator`\<`string`\>

#### Remarks

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

### validateMnemonic()

> **validateMnemonic**: (`mnemonic`, `bip39ToUse`, `language?`) => `boolean`

#### Parameters

##### mnemonic

`string`

##### bip39ToUse

[`Bip39`](../interfaces/Bip39.md) = `bip39Wrapper`

##### language?

[`MnemonicLanguages`](../enumerations/MnemonicLanguages.md)

#### Returns

`boolean`
