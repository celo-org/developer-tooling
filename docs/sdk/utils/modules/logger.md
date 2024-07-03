[@celo/utils](../README.md) / logger

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

packages/sdk/base/lib/logger.d.ts:1

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

packages/sdk/base/lib/logger.d.ts:7

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

packages/sdk/base/lib/logger.d.ts:3

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

packages/sdk/base/lib/logger.d.ts:5
