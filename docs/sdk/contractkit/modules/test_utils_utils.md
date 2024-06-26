[@celo/contractkit](../README.md) / [Exports](../modules.md) / test-utils/utils

# Module: test-utils/utils

## Table of contents

### Functions

- [currentEpochNumber](test_utils_utils.md#currentepochnumber)
- [mineToNextEpoch](test_utils_utils.md#minetonextepoch)

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

[packages/sdk/contractkit/src/test-utils/utils.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L5)

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

[packages/sdk/contractkit/src/test-utils/utils.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L32)
