[@celo/base](../README.md) / [task](../modules/task.md) / RepeatTaskContext

# Interface: RepeatTaskContext

[task](../modules/task.md).RepeatTaskContext

## Table of contents

### Properties

- [executionNumber](task.RepeatTaskContext.md#executionnumber)

### Methods

- [stopTask](task.RepeatTaskContext.md#stoptask)

## Properties

### executionNumber

• **executionNumber**: `number`

Number of times the task has been executed (starts in 1)

#### Defined in

[packages/sdk/base/src/task.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L41)

## Methods

### stopTask

▸ **stopTask**(): `void`

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Defined in

[packages/sdk/base/src/task.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/task.ts#L43)
