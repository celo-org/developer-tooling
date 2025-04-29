[**@celo/cryptographic-utils**](../../README.md)

***

[@celo/cryptographic-utils](../../modules.md) / [account](../README.md) / Bip39

# Interface: Bip39

Defined in: base/lib/account.d.ts:25

## Properties

### generateMnemonic()

> **generateMnemonic**: (`strength?`, `rng?`, `wordlist?`) => `Promise`\<`string`\>

Defined in: base/lib/account.d.ts:28

#### Parameters

##### strength?

`number`

##### rng?

[`RandomNumberGenerator`](../type-aliases/RandomNumberGenerator.md)

##### wordlist?

`string`[]

#### Returns

`Promise`\<`string`\>

***

### mnemonicToSeed()

> **mnemonicToSeed**: (`mnemonic`, `password?`) => `Promise`\<`Uint8Array`\>

Defined in: base/lib/account.d.ts:27

#### Parameters

##### mnemonic

`string`

##### password?

`string`

#### Returns

`Promise`\<`Uint8Array`\>

***

### mnemonicToSeedSync()

> **mnemonicToSeedSync**: (`mnemonic`, `password?`) => `Uint8Array`

Defined in: base/lib/account.d.ts:26

#### Parameters

##### mnemonic

`string`

##### password?

`string`

#### Returns

`Uint8Array`

***

### validateMnemonic()

> **validateMnemonic**: (`mnemonic`, `wordlist?`) => `boolean`

Defined in: base/lib/account.d.ts:29

#### Parameters

##### mnemonic

`string`

##### wordlist?

`string`[]

#### Returns

`boolean`
