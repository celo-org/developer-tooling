[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [task](../README.md) / RunningTask

# Interface: RunningTask

Defined in: packages/sdk/base/lib/task.d.ts:7

Represent a running task that can be stopped

Examples: A poller, a watcher.

## Extended by

- [`RunningTaskWithValue`](RunningTaskWithValue.md)

## Methods

### isRunning()

> **isRunning**(): `boolean`

Defined in: packages/sdk/base/lib/task.d.ts:11

Indicates wether the task is running

#### Returns

`boolean`

***

### stop()

> **stop**(): `void`

Defined in: packages/sdk/base/lib/task.d.ts:9

Flag task to be stopped. Might not be inmediate

#### Returns

`void`
