[**@celo/base**](../../README.md)

***

[@celo/base](../../README.md) / [task](../README.md) / repeatTask

# Function: repeatTask()

> **repeatTask**(`opts`, `fn`): [`RunningTask`](../interfaces/RunningTask.md)

Defined in: [packages/sdk/base/src/task.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L50)

Runs an async function eternally until stopped

## Parameters

### opts

`RepeatTaskOptions`

### fn

(`ctx`) => `Promise`\<`void`\>

function to run

## Returns

[`RunningTask`](../interfaces/RunningTask.md)
