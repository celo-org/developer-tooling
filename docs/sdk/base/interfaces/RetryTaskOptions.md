[**@celo/base v7.0.4**](../README.md)

***

[@celo/base](../README.md) / RetryTaskOptions

# Interface: RetryTaskOptions\<A\>

Defined in: [packages/sdk/base/src/task.ts:112](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L112)

## Extends

- [`TaskOptions`](TaskOptions.md)

## Type Parameters

### A

`A`

## Properties

### logger?

> `optional` **logger**: [`Logger`](../type-aliases/Logger.md)

Defined in: [packages/sdk/base/src/task.ts:20](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L20)

Logger function

#### Inherited from

[`TaskOptions`](TaskOptions.md).[`logger`](TaskOptions.md#logger)

***

### maxAttemps

> **maxAttemps**: `number`

Defined in: [packages/sdk/base/src/task.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L116)

Maximum number of attemps

***

### name

> **name**: `string`

Defined in: [packages/sdk/base/src/task.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L18)

Name for the task. To be used in logging messages

#### Inherited from

[`TaskOptions`](TaskOptions.md).[`name`](TaskOptions.md#name)

***

### timeInBetweenMS

> **timeInBetweenMS**: `number`

Defined in: [packages/sdk/base/src/task.ts:114](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L114)

seconds between repetition

***

### tryGetValue()

> **tryGetValue**: () => `Promise`\<`null` \| `A`\>

Defined in: [packages/sdk/base/src/task.ts:118](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L118)

Function that tries to obtain a value A or returns null

#### Returns

`Promise`\<`null` \| `A`\>
