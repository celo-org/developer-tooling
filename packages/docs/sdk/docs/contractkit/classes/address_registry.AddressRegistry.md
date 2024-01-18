[@celo/contractkit](../README.md) / [Exports](../modules.md) / [address-registry](../modules/address_registry.md) / AddressRegistry

# Class: AddressRegistry

[address-registry](../modules/address_registry.md).AddressRegistry

Celo Core Contract's Address Registry

**`Param`**

– an instance of @celo/connect Connection

## Table of contents

### Constructors

- [constructor](address_registry.AddressRegistry.md#constructor)

### Properties

- [connection](address_registry.AddressRegistry.md#connection)

### Methods

- [addressFor](address_registry.AddressRegistry.md#addressfor)
- [addressMapping](address_registry.AddressRegistry.md#addressmapping)

## Constructors

### constructor

• **new AddressRegistry**(`connection`): [`AddressRegistry`](address_registry.AddressRegistry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |

#### Returns

[`AddressRegistry`](address_registry.AddressRegistry.md)

#### Defined in

[packages/sdk/contractkit/src/address-registry.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L28)

## Properties

### connection

• `Readonly` **connection**: `Connection`

#### Defined in

[packages/sdk/contractkit/src/address-registry.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L28)

## Methods

### addressFor

▸ **addressFor**(`contract`): `Promise`\<`string`\>

Get the address for a `CeloContract`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`CeloContract`](../enums/base.CeloContract.md) |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/sdk/contractkit/src/address-registry.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L36)

___

### addressMapping

▸ **addressMapping**(): `Promise`\<`Map`\<[`CeloContract`](../enums/base.CeloContract.md), `string`\>\>

Get the address mapping for known registered contracts

#### Returns

`Promise`\<`Map`\<[`CeloContract`](../enums/base.CeloContract.md), `string`\>\>

#### Defined in

[packages/sdk/contractkit/src/address-registry.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L54)
