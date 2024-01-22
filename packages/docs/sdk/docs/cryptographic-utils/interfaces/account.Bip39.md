[@celo/cryptographic-utils](../README.md) / [Exports](../modules.md) / [account](../modules/account.md) / Bip39

# Interface: Bip39

[account](../modules/account.md).Bip39

## Table of contents

### Properties

- [generateMnemonic](account.Bip39.md#generatemnemonic)
- [mnemonicToSeed](account.Bip39.md#mnemonictoseed)
- [mnemonicToSeedSync](account.Bip39.md#mnemonictoseedsync)
- [validateMnemonic](account.Bip39.md#validatemnemonic)

## Properties

### generateMnemonic

• **generateMnemonic**: (`strength?`: `number`, `rng?`: [`RandomNumberGenerator`](../modules/account.md#randomnumbergenerator), `wordlist?`: `string`[]) => `Promise`\<`string`\>

#### Type declaration

▸ (`strength?`, `rng?`, `wordlist?`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `strength?` | `number` |
| `rng?` | [`RandomNumberGenerator`](../modules/account.md#randomnumbergenerator) |
| `wordlist?` | `string`[] |

##### Returns

`Promise`\<`string`\>

#### Defined in

base/lib/account.d.ts:22

___

### mnemonicToSeed

• **mnemonicToSeed**: (`mnemonic`: `string`, `password?`: `string`) => `Promise`\<`Buffer`\>

#### Type declaration

▸ (`mnemonic`, `password?`): `Promise`\<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `password?` | `string` |

##### Returns

`Promise`\<`Buffer`\>

#### Defined in

base/lib/account.d.ts:21

___

### mnemonicToSeedSync

• **mnemonicToSeedSync**: (`mnemonic`: `string`, `password?`: `string`) => `Buffer`

#### Type declaration

▸ (`mnemonic`, `password?`): `Buffer`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `password?` | `string` |

##### Returns

`Buffer`

#### Defined in

base/lib/account.d.ts:20

___

### validateMnemonic

• **validateMnemonic**: (`mnemonic`: `string`, `wordlist?`: `string`[]) => `boolean`

#### Type declaration

▸ (`mnemonic`, `wordlist?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `wordlist?` | `string`[] |

##### Returns

`boolean`

#### Defined in

base/lib/account.d.ts:23
