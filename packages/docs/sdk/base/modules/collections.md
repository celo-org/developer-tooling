[@celo/base](../README.md) / collections

# Module: collections

## Table of contents

### Interfaces

- [AddressListItem](../interfaces/collections.AddressListItem.md)

### Type Aliases

- [Comparator](collections.md#comparator)

### Functions

- [intersection](collections.md#intersection)
- [linkedListChange](collections.md#linkedlistchange)
- [linkedListChanges](collections.md#linkedlistchanges)
- [notEmpty](collections.md#notempty)
- [zeroRange](collections.md#zerorange)
- [zip](collections.md#zip)
- [zip3](collections.md#zip3)

## Type Aliases

### Comparator

Ƭ **Comparator**\<`T`\>: (`a`: `T`, `b`: `T`) => `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`a`, `b`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

##### Returns

`boolean`

#### Defined in

[packages/sdk/base/src/collections.ts:50](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L50)

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

[packages/sdk/base/src/collections.ts:32](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L32)

___

### linkedListChange

▸ **linkedListChange**\<`T`\>(`sortedList`, `change`, `comparator`): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sortedList` | [`AddressListItem`](../interfaces/collections.AddressListItem.md)\<`T`\>[] |
| `change` | [`AddressListItem`](../interfaces/collections.AddressListItem.md)\<`T`\> |
| `comparator` | [`Comparator`](collections.md#comparator)\<`T`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `greater` | `string` |
| `lesser` | `string` |
| `list` | [`AddressListItem`](../interfaces/collections.AddressListItem.md)\<`T`\>[] |

#### Defined in

[packages/sdk/base/src/collections.ts:90](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L90)

___

### linkedListChanges

▸ **linkedListChanges**\<`T`\>(`sortedList`, `changeList`, `comparator`): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sortedList` | [`AddressListItem`](../interfaces/collections.AddressListItem.md)\<`T`\>[] |
| `changeList` | [`AddressListItem`](../interfaces/collections.AddressListItem.md)\<`T`\>[] |
| `comparator` | [`Comparator`](collections.md#comparator)\<`T`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `greaters` | `string`[] |
| `lessers` | `string`[] |
| `list` | [`AddressListItem`](../interfaces/collections.AddressListItem.md)\<`T`\>[] |

#### Defined in

[packages/sdk/base/src/collections.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L100)

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

[packages/sdk/base/src/collections.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L28)

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

[packages/sdk/base/src/collections.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L23)

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

[packages/sdk/base/src/collections.ts:3](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L3)

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

[packages/sdk/base/src/collections.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L13)
