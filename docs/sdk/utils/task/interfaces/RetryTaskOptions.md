[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [task](../README.md) / RetryTaskOptions

# Interface: RetryTaskOptions\<A\>

Defined in: packages/sdk/base/lib/task.d.ts:44

## Extends

- [`TaskOptions`](TaskOptions.md)

## Type Parameters

### A

`A`

## Properties

### logger?

> `optional` **logger**: [`Logger`](../../logger/type-aliases/Logger.md)

Defined in: packages/sdk/base/lib/task.d.ts:17

Logger function

#### Inherited from

[`TaskOptions`](TaskOptions.md).[`logger`](TaskOptions.md#logger)

***

### maxAttemps

> **maxAttemps**: `number`

Defined in: packages/sdk/base/lib/task.d.ts:48

Maximum number of attemps

***

### name

> **name**: `string`

Defined in: packages/sdk/base/lib/task.d.ts:15

Name for the task. To be used in logging messages

#### Inherited from

[`TaskOptions`](TaskOptions.md).[`name`](TaskOptions.md#name)

***

### timeInBetweenMS

> **timeInBetweenMS**: `number`

Defined in: packages/sdk/base/lib/task.d.ts:46

seconds between repetition

***

### tryGetValue()

> **tryGetValue**: () => `Promise`\<`null` \| `A`\>

Defined in: packages/sdk/base/lib/task.d.ts:50

Function that tries to obtain a value A or returns null

#### Returns

`Promise`\<`null` \| `A`\>
