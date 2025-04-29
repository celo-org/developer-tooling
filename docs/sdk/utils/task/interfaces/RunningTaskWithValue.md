[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [task](../README.md) / RunningTaskWithValue

# Interface: RunningTaskWithValue\<A\>

Defined in: packages/sdk/base/lib/task.d.ts:41

Represent a running task that can be stopped

Examples: A poller, a watcher.

## Extends

- [`RunningTask`](RunningTask.md)

## Type Parameters

### A

`A`

## Methods

### isRunning()

> **isRunning**(): `boolean`

Defined in: packages/sdk/base/lib/task.d.ts:11

Indicates wether the task is running

#### Returns

`boolean`

#### Inherited from

[`RunningTask`](RunningTask.md).[`isRunning`](RunningTask.md#isrunning)

***

### onValue()

> **onValue**(): `Promise`\<`A`\>

Defined in: packages/sdk/base/lib/task.d.ts:42

#### Returns

`Promise`\<`A`\>

***

### stop()

> **stop**(): `void`

Defined in: packages/sdk/base/lib/task.d.ts:9

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Inherited from

[`RunningTask`](RunningTask.md).[`stop`](RunningTask.md#stop)
