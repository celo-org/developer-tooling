[@celo/utils](../README.md) / [task](../modules/task.md) / RunningTask

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

packages/sdk/base/lib/task.d.ts:11

___

### stop

▸ **stop**(): `void`

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Defined in

packages/sdk/base/lib/task.d.ts:9
