[@celo/base](../README.md) / [account](../modules/account.md) / Bip39

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

[packages/sdk/base/src/account.ts:37](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L37)

___

### mnemonicToSeed

• **mnemonicToSeed**: (`mnemonic`: `string`, `password?`: `string`) => `Promise`\<`Uint8Array`\>

#### Type declaration

▸ (`mnemonic`, `password?`): `Promise`\<`Uint8Array`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `password?` | `string` |

##### Returns

`Promise`\<`Uint8Array`\>

#### Defined in

[packages/sdk/base/src/account.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L36)

___

### mnemonicToSeedSync

• **mnemonicToSeedSync**: (`mnemonic`: `string`, `password?`: `string`) => `Uint8Array`

#### Type declaration

▸ (`mnemonic`, `password?`): `Uint8Array`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `password?` | `string` |

##### Returns

`Uint8Array`

#### Defined in

[packages/sdk/base/src/account.ts:35](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L35)

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

[packages/sdk/base/src/account.ts:42](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/account.ts#L42)
