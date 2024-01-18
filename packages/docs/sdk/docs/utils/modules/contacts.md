[@celo/utils](../README.md) / contacts

# Module: contacts

## Table of contents

### Interfaces

- [ContactPhoneNumber](../interfaces/contacts.ContactPhoneNumber.md)
- [MinimalContact](../interfaces/contacts.MinimalContact.md)

### Functions

- [getContactNameHash](contacts.md#getcontactnamehash)
- [getContactPhoneNumber](contacts.md#getcontactphonenumber)
- [isContact](contacts.md#iscontact)

## Functions

### getContactNameHash

▸ **getContactNameHash**(`contact`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contact` | [`MinimalContact`](../interfaces/contacts.MinimalContact.md) |

#### Returns

`string`

**`Deprecated`**

May be removed in future

#### Defined in

[packages/sdk/utils/src/contacts.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/contacts.ts#L16)

___

### getContactPhoneNumber

▸ **getContactPhoneNumber**(`contact`): `undefined` \| ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contact` | [`MinimalContact`](../interfaces/contacts.MinimalContact.md) |

#### Returns

`undefined` \| ``null`` \| `string`

#### Defined in

packages/sdk/base/lib/contacts.d.ts:11

___

### isContact

▸ **isContact**(`contactOrNumber`): contactOrNumber is MinimalContact

#### Parameters

| Name | Type |
| :------ | :------ |
| `contactOrNumber` | `any` |

#### Returns

contactOrNumber is MinimalContact

#### Defined in

packages/sdk/base/lib/contacts.d.ts:12
