[**@celo/metadata-claims v1.0.3**](../../README.md)

***

[@celo/metadata-claims](../../README.md) / [types](../README.md) / AccountSignerGetters

# Type Alias: AccountSignerGetters

> **AccountSignerGetters** = `object`

Defined in: [packages/sdk/metadata-claims/src/types.ts:29](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L29)

## Properties

### getAttestationSigner()

> **getAttestationSigner**: (`address`) => `Promise`\<`StrongAddress`\>

Defined in: [packages/sdk/metadata-claims/src/types.ts:33](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L33)

#### Parameters

##### address

`Address`

#### Returns

`Promise`\<`StrongAddress`\>

***

### getValidatorSigner()

> **getValidatorSigner**: (`address`) => `Promise`\<`StrongAddress`\>

Defined in: [packages/sdk/metadata-claims/src/types.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L32)

#### Parameters

##### address

`Address`

#### Returns

`Promise`\<`StrongAddress`\>

***

### getVoteSigner()

> **getVoteSigner**: (`address`) => `Promise`\<`StrongAddress`\>

Defined in: [packages/sdk/metadata-claims/src/types.ts:31](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L31)

#### Parameters

##### address

`Address`

#### Returns

`Promise`\<`StrongAddress`\>

***

### isAccount()

> **isAccount**: (`address`) => `Promise`\<`boolean`\>

Defined in: [packages/sdk/metadata-claims/src/types.ts:30](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/types.ts#L30)

#### Parameters

##### address

`Address`

#### Returns

`Promise`\<`boolean`\>
