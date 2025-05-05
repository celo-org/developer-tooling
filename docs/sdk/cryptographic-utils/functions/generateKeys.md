[**@celo/cryptographic-utils v5.1.3**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / generateKeys

# Function: generateKeys()

> **generateKeys**(`mnemonic`, `password?`, `changeIndex?`, `addressIndex?`, `bip39ToUse?`, `derivationPath?`): `Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>

Defined in: [cryptographic-utils/src/account.ts:397](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L397)

## Parameters

### mnemonic

`string`

### password?

`string`

### changeIndex?

`number` = `0`

### addressIndex?

`number` = `0`

### bip39ToUse?

[`Bip39`](../interfaces/Bip39.md) = `bip39Wrapper`

### derivationPath?

`string` = `CELO_DERIVATION_PATH_BASE`

## Returns

`Promise`\<\{ `address`: `string`; `privateKey`: `string`; `publicKey`: `string`; \}\>
