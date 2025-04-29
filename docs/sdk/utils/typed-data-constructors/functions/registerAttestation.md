[**@celo/utils**](../../README.md)

***

[@celo/utils](../../README.md) / [typed-data-constructors](../README.md) / registerAttestation

# Function: registerAttestation()

> **registerAttestation**(`chainId`, `contractAddress`, `message?`): `object`

Defined in: [packages/sdk/utils/src/typed-data-constructors.ts:52](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/utils/src/typed-data-constructors.ts#L52)

## Parameters

### chainId

`number`

### contractAddress

`string`

### message?

`AttestationDetails`

## Returns

`object`

### domain

> **domain**: `object`

#### domain.chainId

> **chainId**: `number`

#### domain.name

> **name**: `string` = `'FederatedAttestations'`

#### domain.verifyingContract

> **verifyingContract**: `string` = `contractAddress`

#### domain.version

> **version**: `string` = `'1.0'`

### message

> **message**: `object`

### primaryType

> **primaryType**: `string` = `'OwnershipAttestation'`

### types

> **types**: `object`

#### types.EIP712Domain

> **EIP712Domain**: `object`[]

#### types.OwnershipAttestation

> **OwnershipAttestation**: `object`[]
