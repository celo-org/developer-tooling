[@celo/cryptographic-utils](../README.md) / [Exports](../modules.md) / account

# Module: account

## Table of contents

### Enumerations

- [MnemonicLanguages](../enums/account.MnemonicLanguages.md)
- [MnemonicStrength](../enums/account.MnemonicStrength.md)

### Interfaces

- [Bip39](../interfaces/account.Bip39.md)

### Type Aliases

- [RandomNumberGenerator](account.md#randomnumbergenerator)

### Variables

- [AccountUtils](account.md#accountutils)
- [CELO\_DERIVATION\_PATH\_BASE](account.md#celo_derivation_path_base)

### Functions

- [detectMnemonicLanguage](account.md#detectmnemoniclanguage)
- [formatNonAccentedCharacters](account.md#formatnonaccentedcharacters)
- [generateDeterministicInviteCode](account.md#generatedeterministicinvitecode)
- [generateKeys](account.md#generatekeys)
- [generateKeysFromSeed](account.md#generatekeysfromseed)
- [generateMnemonic](account.md#generatemnemonic)
- [generateSeed](account.md#generateseed)
- [getAllLanguages](account.md#getalllanguages)
- [invalidMnemonicWords](account.md#invalidmnemonicwords)
- [mnemonicLengthFromStrength](account.md#mnemoniclengthfromstrength)
- [normalizeMnemonic](account.md#normalizemnemonic)
- [suggestMnemonicCorrections](account.md#suggestmnemoniccorrections)
- [validateMnemonic](account.md#validatemnemonic)

## Type Aliases

### RandomNumberGenerator

Ƭ **RandomNumberGenerator**: (`size`: `number`, `callback`: (`err`: `Error` \| ``null``, `buf`: `Buffer`) => `void`) => `void`

#### Type declaration

▸ (`size`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `callback` | (`err`: `Error` \| ``null``, `buf`: `Buffer`) => `void` |

##### Returns

`void`

#### Defined in

base/lib/account.d.ts:18

## Variables

### AccountUtils

• `Const` **AccountUtils**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `detectMnemonicLanguage` | (`words`: `string`[], `candidates?`: [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md)[]) => [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) \| `undefined` |
| `generateKeys` | (`mnemonic`: `string`, `password?`: `string`, `changeIndex`: `number`, `addressIndex`: `number`, `bip39ToUse`: [`Bip39`](../interfaces/account.Bip39.md), `derivationPath`: `string`) => `Promise`\<\{ `address`: `string` ; `privateKey`: `string` ; `publicKey`: `string`  }\> |
| `generateKeysFromSeed` | (`seed`: `Buffer`, `changeIndex`: `number`, `addressIndex`: `number`, `derivationPath`: `string`) => \{ `address`: `string` ; `privateKey`: `string` ; `publicKey`: `string`  } |
| `generateMnemonic` | (`strength`: [`MnemonicStrength`](../enums/account.MnemonicStrength.md), `language?`: [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md), `bip39ToUse`: [`Bip39`](../interfaces/account.Bip39.md)) => `Promise`\<`string`\> |
| `generateSeed` | (`mnemonic`: `string`, `password?`: `string`, `bip39ToUse`: [`Bip39`](../interfaces/account.Bip39.md), `keyByteLength`: `number`) => `Promise`\<`Buffer`\> |
| `invalidMnemonicWords` | (`mnemonic`: `string`, `language?`: [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md)) => `string`[] \| `undefined` |
| `normalizeMnemonic` | (`mnemonic`: `string`, `language?`: [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md)) => `string` |
| `suggestMnemonicCorrections` | (`mnemonic`: `string`, `language?`: [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md), `strength?`: [`MnemonicStrength`](../enums/account.MnemonicStrength.md)) => `Generator`\<`string`\> |
| `validateMnemonic` | (`mnemonic`: `string`, `bip39ToUse`: [`Bip39`](../interfaces/account.Bip39.md), `language?`: [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md)) => `boolean` |

#### Defined in

[cryptographic-utils/src/account.ts:465](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L465)

___

### CELO\_DERIVATION\_PATH\_BASE

• `Const` **CELO\_DERIVATION\_PATH\_BASE**: ``"m/44'/52752'/0'"``

#### Defined in

base/lib/account.d.ts:2

## Functions

### detectMnemonicLanguage

▸ **detectMnemonicLanguage**(`words`, `candidates?`): [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) \| `undefined`

Detects the language of tokenized mnemonic phrase by applying a heuristic.

#### Parameters

| Name | Type |
| :------ | :------ |
| `words` | `string`[] |
| `candidates?` | [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md)[] |

#### Returns

[`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) \| `undefined`

**`Remarks`**

Uses a heuristic of returning the language with the most matching words. In practice, we
expect all words to come from a single language, also some may be misspelled or otherwise
malformed. It may occasionally occur that a typo results in word from another language (e.g. bag
-> bagr) but this should occur at most once or twice per phrase.

#### Defined in

[cryptographic-utils/src/account.ts:233](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L233)

___

### formatNonAccentedCharacters

▸ **formatNonAccentedCharacters**(`mnemonic`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |

#### Returns

`string`

**`Deprecated`**

now an alias for normalizeMnemonic.

#### Defined in

[cryptographic-utils/src/account.ts:159](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L159)

___

### generateDeterministicInviteCode

▸ **generateDeterministicInviteCode**(`recipientPhoneHash`, `recipientPepper`, `addressIndex?`, `changeIndex?`, `derivationPath?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `recipientPhoneHash` | `string` | `undefined` |
| `recipientPepper` | `string` | `undefined` |
| `addressIndex` | `number` | `0` |
| `changeIndex` | `number` | `0` |
| `derivationPath` | `string` | `CELO_DERIVATION_PATH_BASE` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `publicKey` | `string` |

#### Defined in

[cryptographic-utils/src/account.ts:416](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L416)

___

### generateKeys

▸ **generateKeys**(`mnemonic`, `password?`, `changeIndex?`, `addressIndex?`, `bip39ToUse?`, `derivationPath?`): `Promise`\<\{ `address`: `string` ; `privateKey`: `string` ; `publicKey`: `string`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mnemonic` | `string` | `undefined` |
| `password?` | `string` | `undefined` |
| `changeIndex` | `number` | `0` |
| `addressIndex` | `number` | `0` |
| `bip39ToUse` | [`Bip39`](../interfaces/account.Bip39.md) | `bip39Wrapper` |
| `derivationPath` | `string` | `CELO_DERIVATION_PATH_BASE` |

#### Returns

`Promise`\<\{ `address`: `string` ; `privateKey`: `string` ; `publicKey`: `string`  }\>

#### Defined in

[cryptographic-utils/src/account.ts:403](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L403)

___

### generateKeysFromSeed

▸ **generateKeysFromSeed**(`seed`, `changeIndex?`, `addressIndex?`, `derivationPath?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `seed` | `Buffer` | `undefined` |
| `changeIndex` | `number` | `0` |
| `addressIndex` | `number` | `0` |
| `derivationPath` | `string` | `CELO_DERIVATION_PATH_BASE` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `privateKey` | `string` |
| `publicKey` | `string` |

#### Defined in

[cryptographic-utils/src/account.ts:444](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L444)

___

### generateMnemonic

▸ **generateMnemonic**(`strength?`, `language?`, `bip39ToUse?`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `strength` | [`MnemonicStrength`](../enums/account.MnemonicStrength.md) | `MnemonicStrength.s256_24words` |
| `language?` | [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) | `undefined` |
| `bip39ToUse` | [`Bip39`](../interfaces/account.Bip39.md) | `bip39Wrapper` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[cryptographic-utils/src/account.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L54)

___

### generateSeed

▸ **generateSeed**(`mnemonic`, `password?`, `bip39ToUse?`, `keyByteLength?`): `Promise`\<`Buffer`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mnemonic` | `string` | `undefined` |
| `password?` | `string` | `undefined` |
| `bip39ToUse` | [`Bip39`](../interfaces/account.Bip39.md) | `bip39Wrapper` |
| `keyByteLength` | `number` | `64` |

#### Returns

`Promise`\<`Buffer`\>

#### Defined in

[cryptographic-utils/src/account.ts:429](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L429)

___

### getAllLanguages

▸ **getAllLanguages**(): [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md)[]

#### Returns

[`MnemonicLanguages`](../enums/account.MnemonicLanguages.md)[]

#### Defined in

[cryptographic-utils/src/account.ts:188](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L188)

___

### invalidMnemonicWords

▸ **invalidMnemonicWords**(`mnemonic`, `language?`): `string`[] \| `undefined`

Return a list of the words in the mnemonic that are not in the list of valid BIP-39 words for the
specified or detected language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `language?` | [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) |

#### Returns

`string`[] \| `undefined`

**`Remarks`**

Will return undefined if the language cannot be detected (e.g.  all the words are
invalid, or half of the valid words are from one language and the other half from another.)

#### Defined in

[cryptographic-utils/src/account.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L88)

___

### mnemonicLengthFromStrength

▸ **mnemonicLengthFromStrength**(`strength`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `strength` | [`MnemonicStrength`](../enums/account.MnemonicStrength.md) |

#### Returns

`number`

#### Defined in

[cryptographic-utils/src/account.ts:202](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L202)

___

### normalizeMnemonic

▸ **normalizeMnemonic**(`mnemonic`, `language?`): `string`

Normalize the mnemonic phrase to eliminate a number of inconsistencies with standard BIP-39
phrases that are likely to arise when a user manually enters a phrase.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `language?` | [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) |

#### Returns

`string`

**`Remarks`**

Note that this does not guarantee that the output is a valid mnemonic phrase, or even
that all the words in the phrase are contained in a valid wordlist.

#### Defined in

[cryptographic-utils/src/account.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L109)

___

### suggestMnemonicCorrections

▸ **suggestMnemonicCorrections**(`mnemonic`, `language?`, `strength?`): `Generator`\<`string`\>

Generates a list of suggested corrections to the mnemonic phrase based on a set of heuristics.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `language?` | [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) |
| `strength?` | [`MnemonicStrength`](../enums/account.MnemonicStrength.md) |

#### Returns

`Generator`\<`string`\>

**`Remarks`**

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

#### Defined in

[cryptographic-utils/src/account.ts:288](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L288)

___

### validateMnemonic

▸ **validateMnemonic**(`mnemonic`, `bip39ToUse?`, `language?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mnemonic` | `string` | `undefined` |
| `bip39ToUse` | [`Bip39`](../interfaces/account.Bip39.md) | `bip39Wrapper` |
| `language?` | [`MnemonicLanguages`](../enums/account.MnemonicLanguages.md) | `undefined` |

#### Returns

`boolean`

#### Defined in

[cryptographic-utils/src/account.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L62)
