[**@celo/cryptographic-utils v5.1.3**](../README.md)

***

[@celo/cryptographic-utils](../globals.md) / generateDeterministicInviteCode

# Function: generateDeterministicInviteCode()

> **generateDeterministicInviteCode**(`recipientPhoneHash`, `recipientPepper`, `addressIndex`, `changeIndex`, `derivationPath`): `object`

Defined in: [cryptographic-utils/src/account.ts:410](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/cryptographic-utils/src/account.ts#L410)

## Parameters

### recipientPhoneHash

`string`

### recipientPepper

`string`

### addressIndex

`number` = `0`

### changeIndex

`number` = `0`

### derivationPath

`string` = `CELO_DERIVATION_PATH_BASE`

## Returns

`object`

### privateKey

> **privateKey**: `string`

### publicKey

> **publicKey**: `string`
