[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [basic-contract-cache-type](../README.md) / ContractCacheType

# Interface: ContractCacheType

Defined in: [packages/sdk/contractkit/src/basic-contract-cache-type.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L11)

Interface for a class with the minimum required wrappers
to make a MiniContractKit or CeloTokens Class

## Methods

### getAccounts()

> **getAccounts**(): `Promise`\<[`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/basic-contract-cache-type.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L12)

#### Returns

`Promise`\<[`AccountsWrapper`](../../wrappers/Accounts/classes/AccountsWrapper.md)\>

***

### getContract()

#### Call Signature

> **getContract**(`contract`): `Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/basic-contract-cache-type.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L18)

##### Parameters

###### contract

[`CeloTokenContract`](../../base/type-aliases/CeloTokenContract.md)

##### Returns

`Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>

#### Call Signature

> **getContract**(`contract`): `Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/basic-contract-cache-type.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L19)

##### Parameters

###### contract

[`GoldToken`](../../base/enumerations/CeloContract.md#goldtoken)

##### Returns

`Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

***

### getGoldToken()

> **getGoldToken**(): `Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/basic-contract-cache-type.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L14)

#### Returns

`Promise`\<[`GoldTokenWrapper`](../../wrappers/GoldTokenWrapper/classes/GoldTokenWrapper.md)\>

***

### getStableToken()

> **getStableToken**(`stableToken`): `Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>

Defined in: [packages/sdk/contractkit/src/basic-contract-cache-type.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/basic-contract-cache-type.ts#L16)

#### Parameters

##### stableToken

[`StableToken`](../../celo-tokens/enumerations/StableToken.md)

#### Returns

`Promise`\<[`StableTokenWrapper`](../../wrappers/StableTokenWrapper/classes/StableTokenWrapper.md)\>
