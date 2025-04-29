[**@celo/base**](../../README.md)

***

[@celo/base](../../README.md) / [collections](../README.md) / linkedListChanges

# Function: linkedListChanges()

> **linkedListChanges**\<`T`\>(`sortedList`, `changeList`, `comparator`): `object`

Defined in: [packages/sdk/base/src/collections.ts:100](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/collections.ts#L100)

## Type Parameters

### T

`T`

## Parameters

### sortedList

[`AddressListItem`](../interfaces/AddressListItem.md)\<`T`\>[]

### changeList

[`AddressListItem`](../interfaces/AddressListItem.md)\<`T`\>[]

### comparator

[`Comparator`](../type-aliases/Comparator.md)\<`T`\>

## Returns

`object`

### greaters

> **greaters**: `string`[]

### lessers

> **lessers**: `string`[]

### list

> **list**: [`AddressListItem`](../interfaces/AddressListItem.md)\<`T`\>[]
