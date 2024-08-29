[@celo/contractkit](../README.md) / [Exports](../modules.md) / test-utils/utils

# Module: test-utils/utils

## Table of contents

### Functions

- [currentEpochNumber](test_utils_utils.md#currentepochnumber)
- [mineToNextEpoch](test_utils_utils.md#minetonextepoch)
- [topUpWithToken](test_utils_utils.md#topupwithtoken)

## Functions

### currentEpochNumber

▸ **currentEpochNumber**(`web3`, `epochSize?`): `Promise`\<`number`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `default` | `undefined` |
| `epochSize` | `number` | `GANACHE_EPOCH_SIZE` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sdk/contractkit/src/test-utils/utils.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L9)

___

### mineToNextEpoch

▸ **mineToNextEpoch**(`web3`, `epochSize?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3` | `default` | `undefined` |
| `epochSize` | `number` | `GANACHE_EPOCH_SIZE` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/test-utils/utils.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L36)

___

### topUpWithToken

▸ **topUpWithToken**(`kit`, `stableToken`, `recipientAddress`, `amount`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | [`ContractKit`](../classes/kit.ContractKit.md) |
| `stableToken` | [`StableToken`](../enums/celo_tokens.StableToken.md) |
| `recipientAddress` | `string` |
| `amount` | `BigNumber` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/test-utils/utils.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L43)
