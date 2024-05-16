[@celo/base](../README.md) / logger

# Module: logger

## Table of contents

### Type Aliases

- [Logger](logger.md#logger)

### Functions

- [consoleLogger](logger.md#consolelogger)
- [noopLogger](logger.md#nooplogger)
- [prefixLogger](logger.md#prefixlogger)

## Type Aliases

### Logger

Ƭ **Logger**: (...`args`: `any`[]) => `void`

#### Type declaration

▸ (`...args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/sdk/base/src/logger.ts:1](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/logger.ts#L1)

## Functions

### consoleLogger

▸ **consoleLogger**(`...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/sdk/base/src/logger.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/logger.ts#L11)

___

### noopLogger

▸ **noopLogger**(`...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/sdk/base/src/logger.ts:3](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/logger.ts#L3)

___

### prefixLogger

▸ **prefixLogger**(`prefix`, `logger`): [`Logger`](logger.md#logger)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |
| `logger` | [`Logger`](logger.md#logger) |

#### Returns

[`Logger`](logger.md#logger)

#### Defined in

[packages/sdk/base/src/logger.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/logger.ts#L7)
