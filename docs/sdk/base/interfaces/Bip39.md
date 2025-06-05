[**@celo/base v7.0.3-beta.0**](../README.md)

***

[@celo/base](../README.md) / Bip39

# Interface: Bip39

Defined in: [packages/sdk/base/src/account.ts:34](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L34)

## Properties

### generateMnemonic()

> **generateMnemonic**: (`strength?`, `rng?`, `wordlist?`) => `Promise`\<`string`\>

Defined in: [packages/sdk/base/src/account.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L37)

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

Defined in: [packages/sdk/base/src/account.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L36)

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

Defined in: [packages/sdk/base/src/account.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L35)

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

Defined in: [packages/sdk/base/src/account.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L42)

#### Parameters

##### mnemonic

`string`

##### wordlist?

`string`[]

#### Returns

`boolean`
