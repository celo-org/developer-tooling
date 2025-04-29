[**@celo/contractkit**](../../README.md)

***

[@celo/contractkit](../../modules.md) / [address-registry](../README.md) / AddressRegistry

# Class: AddressRegistry

Defined in: [packages/sdk/contractkit/src/address-registry.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L24)

Celo Core Contract's Address Registry

## Param

– an instance of @celo/connect Connection

## Constructors

### Constructor

> **new AddressRegistry**(`connection`): `AddressRegistry`

Defined in: [packages/sdk/contractkit/src/address-registry.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L28)

#### Parameters

##### connection

`Connection`

#### Returns

`AddressRegistry`

## Properties

### connection

> `readonly` **connection**: `Connection`

Defined in: [packages/sdk/contractkit/src/address-registry.ts:28](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L28)

## Methods

### addressFor()

> **addressFor**(`contract`): `Promise`\<`` `0x${string}` ``\>

Defined in: [packages/sdk/contractkit/src/address-registry.ts:36](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L36)

Get the address for a `CeloContract`

#### Parameters

##### contract

[`CeloContract`](../../base/enumerations/CeloContract.md)

#### Returns

`Promise`\<`` `0x${string}` ``\>

***

### addressMapping()

> **addressMapping**(): `Promise`\<`Map`\<[`CeloContract`](../../base/enumerations/CeloContract.md), `` `0x${string}` ``\>\>

Defined in: [packages/sdk/contractkit/src/address-registry.ts:54](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/address-registry.ts#L54)

Get the address mapping for known registered contracts

#### Returns

`Promise`\<`Map`\<[`CeloContract`](../../base/enumerations/CeloContract.md), `` `0x${string}` ``\>\>
