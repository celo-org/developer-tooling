[@celo/contractkit](../README.md) / [Exports](../modules.md) / test-utils/utils

# Module: test-utils/utils

## Table of contents

### Functions

- [activateMintCeloSchedule](test_utils_utils.md#activatemintceloschedule)
- [currentEpochNumber](test_utils_utils.md#currentepochnumber)
- [mineToNextEpoch](test_utils_utils.md#minetonextepoch)

## Functions

### activateMintCeloSchedule

▸ **activateMintCeloSchedule**(`kit`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | [`ContractKit`](../classes/kit.ContractKit.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sdk/contractkit/src/test-utils/utils.ts:51](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L51)

___

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

[packages/sdk/contractkit/src/test-utils/utils.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L11)

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

[packages/sdk/contractkit/src/test-utils/utils.ts:38](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/test-utils/utils.ts#L38)
