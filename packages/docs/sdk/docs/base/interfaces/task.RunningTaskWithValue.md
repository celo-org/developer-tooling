[@celo/base](../README.md) / [task](../modules/task.md) / RunningTaskWithValue

# Interface: RunningTaskWithValue\<A\>

[task](../modules/task.md).RunningTaskWithValue

Represent a running task that can be stopped

Examples: A poller, a watcher.

## Type parameters

| Name |
| :------ |
| `A` |

## Hierarchy

- [`RunningTask`](task.RunningTask.md)

  ↳ **`RunningTaskWithValue`**

## Table of contents

### Methods

- [isRunning](task.RunningTaskWithValue.md#isrunning)
- [onValue](task.RunningTaskWithValue.md#onvalue)
- [stop](task.RunningTaskWithValue.md#stop)

## Methods

### isRunning

▸ **isRunning**(): `boolean`

Indicates wether the task is running

#### Returns

`boolean`

#### Inherited from

[RunningTask](task.RunningTask.md).[isRunning](task.RunningTask.md#isrunning)

#### Defined in

[packages/sdk/base/src/task.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L13)

___

### onValue

▸ **onValue**(): `Promise`\<`A`\>

#### Returns

`Promise`\<`A`\>

#### Defined in

[packages/sdk/base/src/task.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L109)

___

### stop

▸ **stop**(): `void`

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Inherited from

[RunningTask](task.RunningTask.md).[stop](task.RunningTask.md#stop)

#### Defined in

[packages/sdk/base/src/task.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L11)
