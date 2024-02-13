[@celo/utils](../README.md) / sign-typed-data-utils

# Module: sign-typed-data-utils

## Table of contents

### Interfaces

- [EIP712Object](../interfaces/sign_typed_data_utils.EIP712Object.md)
- [EIP712Parameter](../interfaces/sign_typed_data_utils.EIP712Parameter.md)
- [EIP712TypedData](../interfaces/sign_typed_data_utils.EIP712TypedData.md)
- [EIP712Types](../interfaces/sign_typed_data_utils.EIP712Types.md)
- [EIP712TypesWithPrimary](../interfaces/sign_typed_data_utils.EIP712TypesWithPrimary.md)

### Type Aliases

- [EIP712ObjectValue](sign_typed_data_utils.md#eip712objectvalue)
- [EIP712Optional](sign_typed_data_utils.md#eip712optional)

### Variables

- [EIP712\_ATOMIC\_TYPES](sign_typed_data_utils.md#eip712_atomic_types)
- [EIP712\_BUILTIN\_TYPES](sign_typed_data_utils.md#eip712_builtin_types)
- [EIP712\_DYNAMIC\_TYPES](sign_typed_data_utils.md#eip712_dynamic_types)
- [noBool](sign_typed_data_utils.md#nobool)
- [noNumber](sign_typed_data_utils.md#nonumber)
- [noString](sign_typed_data_utils.md#nostring)

### Functions

- [defined](sign_typed_data_utils.md#defined)
- [eip712OptionalSchema](sign_typed_data_utils.md#eip712optionalschema)
- [eip712OptionalType](sign_typed_data_utils.md#eip712optionaltype)
- [encodeData](sign_typed_data_utils.md#encodedata)
- [encodeType](sign_typed_data_utils.md#encodetype)
- [generateTypedDataHash](sign_typed_data_utils.md#generatetypeddatahash)
- [structHash](sign_typed_data_utils.md#structhash)
- [typeHash](sign_typed_data_utils.md#typehash)
- [zeroValue](sign_typed_data_utils.md#zerovalue)

## Type Aliases

### EIP712ObjectValue

Ƭ **EIP712ObjectValue**: `string` \| `number` \| `BigNumber` \| `boolean` \| `Buffer` \| [`EIP712Object`](../interfaces/sign_typed_data_utils.EIP712Object.md) \| [`EIP712ObjectValue`](sign_typed_data_utils.md#eip712objectvalue)[]

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L23)

___

### EIP712Optional

Ƭ **EIP712Optional**\<`T`\>: `Object`

Utility type representing an optional value in a EIP-712 compatible manner, as long as the
concrete type T is a subtype of EIP712ObjectValue.

**`Remarks`**

EIP712Optonal is not part of the EIP712 standard, but is fully compatible with it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EIP712ObjectValue`](sign_typed_data_utils.md#eip712objectvalue) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defined` | `boolean` |
| `value` | `T` |

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:81](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L81)

## Variables

### EIP712\_ATOMIC\_TYPES

• `Const` **EIP712\_ATOMIC\_TYPES**: `string`[]

Array of all EIP-712 atomic type names.

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:44](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L44)

___

### EIP712\_BUILTIN\_TYPES

• `Const` **EIP712\_BUILTIN\_TYPES**: `string`[]

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:64](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L64)

___

### EIP712\_DYNAMIC\_TYPES

• `Const` **EIP712\_DYNAMIC\_TYPES**: `string`[]

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:62](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L62)

___

### noBool

• `Const` **noBool**: [`EIP712Optional`](sign_typed_data_utils.md#eip712optional)\<`boolean`\>

Undefined EIP712Optional type with value type boolean.

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:115](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L115)

___

### noNumber

• `Const` **noNumber**: [`EIP712Optional`](sign_typed_data_utils.md#eip712optional)\<`number`\>

Undefined EIP712Optional type with value type number.

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:121](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L121)

___

### noString

• `Const` **noString**: [`EIP712Optional`](sign_typed_data_utils.md#eip712optional)\<`string`\>

Undefined EIP712Optional type with value type string.

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:127](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L127)

## Functions

### defined

▸ **defined**\<`T`\>(`value`): [`EIP712Optional`](sign_typed_data_utils.md#eip712optional)\<`T`\>

Utility to construct an defined EIP712Optional value with inferred type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EIP712ObjectValue`](sign_typed_data_utils.md#eip712objectvalue) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`EIP712Optional`](sign_typed_data_utils.md#eip712optional)\<`T`\>

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L109)

___

### eip712OptionalSchema

▸ **eip712OptionalSchema**\<`S`\>(`schema`): `TypeC`\<\{ `defined`: `BooleanC` = t.boolean; `value`: `S` = schema }\>

Utility to build EIP712Optional<T> schemas for encoding and decoding with io-ts.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `Mixed` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `S` | io-ts type (a.k.a. schema or codec) describing the inner type. |

#### Returns

`TypeC`\<\{ `defined`: `BooleanC` = t.boolean; `value`: `S` = schema }\>

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:102](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L102)

___

### eip712OptionalType

▸ **eip712OptionalType**(`typeName`): [`EIP712Types`](../interfaces/sign_typed_data_utils.EIP712Types.md)

Utility to build EIP712Optional<T> types to insert in EIP-712 type arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typeName` | `string` | EIP-712 string type name. Should be builtin or defined in the EIP712Types structure into which this type will be merged. |

#### Returns

[`EIP712Types`](../interfaces/sign_typed_data_utils.EIP712Types.md)

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:91](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L91)

___

### encodeData

▸ **encodeData**(`primaryType`, `data`, `types`): `Buffer`

Constructs the struct encoding of the data as the primary type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `primaryType` | `string` |
| `data` | [`EIP712Object`](../interfaces/sign_typed_data_utils.EIP712Object.md) |
| `types` | [`EIP712Types`](../interfaces/sign_typed_data_utils.EIP712Types.md) |

#### Returns

`Buffer`

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:248](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L248)

___

### encodeType

▸ **encodeType**(`primaryType`, `types`): `string`

Creates a string encoding of the primary type, including all dependencies.
E.g. "Transaction(Person from,Person to,Asset tx)Asset(address token,uint256 amount)Person(address wallet,string name)"

#### Parameters

| Name | Type |
| :------ | :------ |
| `primaryType` | `string` |
| `types` | [`EIP712Types`](../interfaces/sign_typed_data_utils.EIP712Types.md) |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:183](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L183)

___

### generateTypedDataHash

▸ **generateTypedDataHash**(`typedData`): `Buffer`

Generates the EIP712 Typed Data hash for signing

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedData` | [`EIP712TypedData`](../interfaces/sign_typed_data_utils.EIP712TypedData.md) | An object that conforms to the EIP712TypedData interface |

#### Returns

`Buffer`

A Buffer containing the hash of the typed data.

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:137](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L137)

___

### structHash

▸ **structHash**(`primaryType`, `data`, `types`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `primaryType` | `string` |
| `data` | [`EIP712Object`](../interfaces/sign_typed_data_utils.EIP712Object.md) |
| `types` | [`EIP712Types`](../interfaces/sign_typed_data_utils.EIP712Types.md) |

#### Returns

`Buffer`

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:257](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L257)

___

### typeHash

▸ **typeHash**(`primaryType`, `types`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `primaryType` | `string` |
| `types` | [`EIP712Types`](../interfaces/sign_typed_data_utils.EIP712Types.md) |

#### Returns

`Buffer`

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L194)

___

### zeroValue

▸ **zeroValue**(`primaryType`, `types?`): [`EIP712ObjectValue`](sign_typed_data_utils.md#eip712objectvalue)

Produce the zero value for a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `primaryType` | `string` |
| `types` | [`EIP712Types`](../interfaces/sign_typed_data_utils.EIP712Types.md) |

#### Returns

[`EIP712ObjectValue`](sign_typed_data_utils.md#eip712objectvalue)

**`Remarks`**

All atomic types will encode as the 32-byte zero value. Dynamic types as an empty hash.
Dynamic arrays will return an empty array. Fixed length arrays will have members set to zero.
Structs will have the values of all fields set to zero recursively.

Note that EIP-712 does not specify zero values, and so this is non-standard.

#### Defined in

[packages/sdk/utils/src/sign-typed-data-utils.ts:273](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/sign-typed-data-utils.ts#L273)
