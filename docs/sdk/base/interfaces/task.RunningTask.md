[@celo/base](../README.md) / [task](../modules/task.md) / RunningTask

# Interface: RunningTask

[task](../modules/task.md).RunningTask

Represent a running task that can be stopped

Examples: A poller, a watcher.

## Hierarchy

- **`RunningTask`**

  ↳ [`RunningTaskWithValue`](task.RunningTaskWithValue.md)

## Table of contents

### Methods

- [isRunning](task.RunningTask.md#isrunning)
- [stop](task.RunningTask.md#stop)

## Methods

### isRunning

▸ **isRunning**(): `boolean`

Indicates wether the task is running

#### Returns

`boolean`

#### Defined in

[packages/sdk/base/src/task.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L13)

___

### stop

▸ **stop**(): `void`

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Defined in

[packages/sdk/base/src/task.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L11)
