[**@celo/wallet-base v8.0.4**](../README.md)

***

[@celo/wallet-base](../README.md) / encodeTransaction

# Function: encodeTransaction()

> **encodeTransaction**(`rlpEncoded`, `signature`): `Promise`\<`EncodedTransaction`\>

Defined in: [wallets/wallet-base/src/signing-utils.ts:333](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-base/src/signing-utils.ts#L333)

## Parameters

### rlpEncoded

`RLPEncodedTx` | [`LegacyEncodedTx`](../interfaces/LegacyEncodedTx.md)

### signature

#### r

`Buffer`

#### s

`Buffer`

#### v

`number` \| `bigint`

## Returns

`Promise`\<`EncodedTransaction`\>
