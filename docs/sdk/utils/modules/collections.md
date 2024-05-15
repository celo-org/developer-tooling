[@celo/utils](../README.md) / collections

# Module: collections

## Table of contents

### Type Aliases

- [AddressListItem](collections.md#addresslistitem)

### Functions

- [intersection](collections.md#intersection)
- [linkedListChange](collections.md#linkedlistchange)
- [linkedListChanges](collections.md#linkedlistchanges)
- [notEmpty](collections.md#notempty)
- [zeroRange](collections.md#zerorange)
- [zip](collections.md#zip)
- [zip3](collections.md#zip3)

## Type Aliases

### AddressListItem

Ƭ **AddressListItem**: `base.AddressListItem`\<`BigNumber`\>

#### Defined in

[packages/sdk/utils/src/collections.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/collections.ts#L7)

## Functions

### intersection

▸ **intersection**\<`T`\>(`arrays`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrays` | `T`[][] |

#### Returns

`T`[]

#### Defined in

packages/sdk/base/lib/collections.d.ts:5

___

### linkedListChange

▸ **linkedListChange**(`sortedList`, `change`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sortedList` | [`AddressListItem`](collections.md#addresslistitem)[] |
| `change` | [`AddressListItem`](collections.md#addresslistitem) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `greater` | `string` |
| `lesser` | `string` |
| `list` | [`AddressListItem`](collections.md#addresslistitem)[] |

#### Defined in

[packages/sdk/utils/src/collections.ts:12](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/collections.ts#L12)

___

### linkedListChanges

▸ **linkedListChanges**(`sortedList`, `changeList`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sortedList` | [`AddressListItem`](collections.md#addresslistitem)[] |
| `changeList` | [`AddressListItem`](collections.md#addresslistitem)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `greaters` | `string`[] |
| `lessers` | `string`[] |
| `list` | [`AddressListItem`](collections.md#addresslistitem)[] |

#### Defined in

[packages/sdk/utils/src/collections.ts:19](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/collections.ts#L19)

___

### notEmpty

▸ **notEmpty**\<`TValue`\>(`value`): value is TValue

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| ``null`` \| `TValue` |

#### Returns

value is TValue

#### Defined in

packages/sdk/base/lib/collections.d.ts:4

___

### zeroRange

▸ **zeroRange**(`to`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | `number` |

#### Returns

`number`[]

#### Defined in

packages/sdk/base/lib/collections.d.ts:3

___

### zip

▸ **zip**\<`A`, `B`, `C`\>(`fn`, `as`, `bs`): `C`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`a`: `A`, `b`: `B`) => `C` |
| `as` | `A`[] |
| `bs` | `B`[] |

#### Returns

`C`[]

#### Defined in

packages/sdk/base/lib/collections.d.ts:1

___

### zip3

▸ **zip3**\<`A`, `B`, `C`\>(`as`, `bs`, `cs`): [`A`, `B`, `C`][]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `as` | `A`[] |
| `bs` | `B`[] |
| `cs` | `C`[] |

#### Returns

[`A`, `B`, `C`][]

#### Defined in

packages/sdk/base/lib/collections.d.ts:2
