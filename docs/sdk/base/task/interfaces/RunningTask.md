[**@celo/base**](../../README.md)

***

[@celo/base](../../README.md) / [task](../README.md) / RunningTask

# Interface: RunningTask

Defined in: [packages/sdk/base/src/task.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L9)

Represent a running task that can be stopped

Examples: A poller, a watcher.

## Extended by

- [`RunningTaskWithValue`](RunningTaskWithValue.md)

## Methods

### isRunning()

> **isRunning**(): `boolean`

Defined in: [packages/sdk/base/src/task.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L13)

Indicates wether the task is running

#### Returns

`boolean`

***

### stop()

> **stop**(): `void`

Defined in: [packages/sdk/base/src/task.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L11)

Flag task to be stopped. Might not be inmediate

#### Returns

`void`
