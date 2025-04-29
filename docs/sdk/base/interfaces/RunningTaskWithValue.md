[**@celo/base v7.0.2**](../README.md)

***

[@celo/base](../README.md) / RunningTaskWithValue

# Interface: RunningTaskWithValue\<A\>

Defined in: [packages/sdk/base/src/task.ts:108](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L108)

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

Defined in: [packages/sdk/base/src/task.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L13)

Indicates wether the task is running

#### Returns

`boolean`

#### Inherited from

[`RunningTask`](RunningTask.md).[`isRunning`](RunningTask.md#isrunning)

***

### onValue()

> **onValue**(): `Promise`\<`A`\>

Defined in: [packages/sdk/base/src/task.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L109)

#### Returns

`Promise`\<`A`\>

***

### stop()

> **stop**(): `void`

Defined in: [packages/sdk/base/src/task.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L11)

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Inherited from

[`RunningTask`](RunningTask.md).[`stop`](RunningTask.md#stop)
