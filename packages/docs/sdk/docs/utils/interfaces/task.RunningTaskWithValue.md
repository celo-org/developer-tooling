[@celo/utils](../README.md) / [task](../modules/task.md) / RunningTaskWithValue

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

packages/sdk/base/lib/task.d.ts:11

___

### onValue

▸ **onValue**(): `Promise`\<`A`\>

#### Returns

`Promise`\<`A`\>

#### Defined in

packages/sdk/base/lib/task.d.ts:42

___

### stop

▸ **stop**(): `void`

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Inherited from

[RunningTask](task.RunningTask.md).[stop](task.RunningTask.md#stop)

#### Defined in

packages/sdk/base/lib/task.d.ts:9
