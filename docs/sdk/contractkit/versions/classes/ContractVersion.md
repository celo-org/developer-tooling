[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [versions](../README.md) / ContractVersion

# Class: ContractVersion

Defined in: [packages/sdk/contractkit/src/versions.ts:4](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L4)

**`Internal`**

## Constructors

### Constructor

> **new ContractVersion**(`storage`, `major`, `minor`, `patch`): `ContractVersion`

Defined in: [packages/sdk/contractkit/src/versions.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L5)

#### Parameters

##### storage

`string` | `number`

##### major

`string` | `number`

##### minor

`string` | `number`

##### patch

`string` | `number`

#### Returns

`ContractVersion`

## Properties

### major

> `readonly` **major**: `string` \| `number`

Defined in: [packages/sdk/contractkit/src/versions.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L7)

***

### minor

> `readonly` **minor**: `string` \| `number`

Defined in: [packages/sdk/contractkit/src/versions.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L8)

***

### patch

> `readonly` **patch**: `string` \| `number`

Defined in: [packages/sdk/contractkit/src/versions.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L9)

***

### storage

> `readonly` **storage**: `string` \| `number`

Defined in: [packages/sdk/contractkit/src/versions.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L6)

## Methods

### isAtLeast()

> **isAtLeast**(`other`): `any`

Defined in: [packages/sdk/contractkit/src/versions.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L12)

#### Parameters

##### other

`ContractVersion`

#### Returns

`any`

***

### toRaw()

> **toRaw**(): (`string` \| `number`)[]

Defined in: [packages/sdk/contractkit/src/versions.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L14)

#### Returns

(`string` \| `number`)[]

***

### toString()

> **toString**(): `string`

Defined in: [packages/sdk/contractkit/src/versions.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L13)

#### Returns

`string`

***

### fromRaw()

> `static` **fromRaw**(`raw`): `ContractVersion`

Defined in: [packages/sdk/contractkit/src/versions.ts:15](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/versions.ts#L15)

#### Parameters

##### raw

(`string` \| `number`)[]

#### Returns

`ContractVersion`
