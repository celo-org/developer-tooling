[@celo/utils](../README.md) / [task](../modules/task.md) / RetryTaskOptions

# Interface: RetryTaskOptions\<A\>

[task](../modules/task.md).RetryTaskOptions

## Type parameters

| Name |
| :------ |
| `A` |

## Hierarchy

- [`TaskOptions`](task.TaskOptions.md)

  ↳ **`RetryTaskOptions`**

## Table of contents

### Properties

- [logger](task.RetryTaskOptions.md#logger)
- [maxAttemps](task.RetryTaskOptions.md#maxattemps)
- [name](task.RetryTaskOptions.md#name)
- [timeInBetweenMS](task.RetryTaskOptions.md#timeinbetweenms)
- [tryGetValue](task.RetryTaskOptions.md#trygetvalue)

## Properties

### logger

• `Optional` **logger**: [`Logger`](../modules/logger.md#logger)

Logger function

#### Inherited from

[TaskOptions](task.TaskOptions.md).[logger](task.TaskOptions.md#logger)

#### Defined in

packages/sdk/base/lib/task.d.ts:17

___

### maxAttemps

• **maxAttemps**: `number`

Maximum number of attemps

#### Defined in

packages/sdk/base/lib/task.d.ts:48

___

### name

• **name**: `string`

Name for the task. To be used in logging messages

#### Inherited from

[TaskOptions](task.TaskOptions.md).[name](task.TaskOptions.md#name)

#### Defined in

packages/sdk/base/lib/task.d.ts:15

___

### timeInBetweenMS

• **timeInBetweenMS**: `number`

seconds between repetition

#### Defined in

packages/sdk/base/lib/task.d.ts:46

___

### tryGetValue

• **tryGetValue**: () => `Promise`\<``null`` \| `A`\>

Function that tries to obtain a value A or returns null

#### Type declaration

▸ (): `Promise`\<``null`` \| `A`\>

Function that tries to obtain a value A or returns null

##### Returns

`Promise`\<``null`` \| `A`\>

#### Defined in

packages/sdk/base/lib/task.d.ts:50
