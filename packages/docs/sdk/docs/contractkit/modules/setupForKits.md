[@celo/contractkit](../README.md) / [Exports](../modules.md) / setupForKits

# Module: setupForKits

## Table of contents

### Type Aliases

- [HttpProviderOptions](setupForKits.md#httpprovideroptions)

### Variables

- [API\_KEY\_HEADER\_KEY](setupForKits.md#api_key_header_key)

### Functions

- [ensureCurrentProvider](setupForKits.md#ensurecurrentprovider)
- [getWeb3ForKit](setupForKits.md#getweb3forkit)
- [setupAPIKey](setupForKits.md#setupapikey)

## Type Aliases

### HttpProviderOptions

Ƭ **HttpProviderOptions**: `Web3HttpProviderOptions`

#### Defined in

[packages/sdk/contractkit/src/setupForKits.ts:3](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/setupForKits.ts#L3)

## Variables

### API\_KEY\_HEADER\_KEY

• `Const` **API\_KEY\_HEADER\_KEY**: ``"apiKey"``

#### Defined in

[packages/sdk/contractkit/src/setupForKits.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/setupForKits.ts#L5)

## Functions

### ensureCurrentProvider

▸ **ensureCurrentProvider**(`web3`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3` | `default` |

#### Returns

`void`

#### Defined in

[packages/sdk/contractkit/src/setupForKits.ts:18](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/setupForKits.ts#L18)

___

### getWeb3ForKit

▸ **getWeb3ForKit**(`url`, `options`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | `undefined` \| `HttpProviderOptions` |

#### Returns

`default`

#### Defined in

[packages/sdk/contractkit/src/setupForKits.ts:24](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/setupForKits.ts#L24)

___

### setupAPIKey

▸ **setupAPIKey**(`apiKey`): `HttpProviderOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |

#### Returns

`HttpProviderOptions`

#### Defined in

[packages/sdk/contractkit/src/setupForKits.ts:8](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/setupForKits.ts#L8)
