[@celo/base](../README.md) / contacts

# Module: contacts

## Table of contents

### Interfaces

- [ContactPhoneNumber](../interfaces/contacts.ContactPhoneNumber.md)
- [MinimalContact](../interfaces/contacts.MinimalContact.md)

### Functions

- [getContactPhoneNumber](contacts.md#getcontactphonenumber)
- [isContact](contacts.md#iscontact)

## Functions

### getContactPhoneNumber

▸ **getContactPhoneNumber**(`contact`): `undefined` \| ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contact` | [`MinimalContact`](../interfaces/contacts.MinimalContact.md) |

#### Returns

`undefined` \| ``null`` \| `string`

#### Defined in

[packages/sdk/base/src/contacts.ts:13](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/contacts.ts#L13)

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

[packages/sdk/base/src/contacts.ts:26](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/base/src/contacts.ts#L26)
