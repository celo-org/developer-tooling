[@celo/base](../README.md) / task

# Module: task

## Table of contents

### Interfaces

- [RepeatTaskContext](../interfaces/task.RepeatTaskContext.md)
- [RetryTaskOptions](../interfaces/task.RetryTaskOptions.md)
- [RunningTask](../interfaces/task.RunningTask.md)
- [RunningTaskWithValue](../interfaces/task.RunningTaskWithValue.md)
- [TaskOptions](../interfaces/task.TaskOptions.md)

### Functions

- [conditionWatcher](task.md#conditionwatcher)
- [repeatTask](task.md#repeattask)
- [tryObtainValueWithRetries](task.md#tryobtainvaluewithretries)

## Functions

### conditionWatcher

▸ **conditionWatcher**(`opts`): [`RunningTask`](../interfaces/task.RunningTask.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `RepeatTaskOptions` & \{ `onSuccess`: () => `void` \| `Promise`\<`void`\> ; `pollCondition`: () => `Promise`\<`boolean`\>  } |

#### Returns

[`RunningTask`](../interfaces/task.RunningTask.md)

#### Defined in

[packages/sdk/base/src/task.ts:93](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L93)

___

### repeatTask

▸ **repeatTask**(`opts`, `fn`): [`RunningTask`](../interfaces/task.RunningTask.md)

Runs an async function eternally until stopped

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `RepeatTaskOptions` | - |
| `fn` | (`ctx`: [`RepeatTaskContext`](../interfaces/task.RepeatTaskContext.md)) => `Promise`\<`void`\> | function to run |

#### Returns

[`RunningTask`](../interfaces/task.RunningTask.md)

#### Defined in

[packages/sdk/base/src/task.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L50)

___

### tryObtainValueWithRetries

▸ **tryObtainValueWithRetries**\<`A`\>(`opts`): [`RunningTaskWithValue`](../interfaces/task.RunningTaskWithValue.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`RetryTaskOptions`](../interfaces/task.RetryTaskOptions.md)\<`A`\> |

#### Returns

[`RunningTaskWithValue`](../interfaces/task.RunningTaskWithValue.md)\<`A`\>

#### Defined in

[packages/sdk/base/src/task.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L121)
