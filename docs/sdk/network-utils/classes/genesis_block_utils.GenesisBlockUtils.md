[@celo/network-utils](../README.md) / [genesis-block-utils](../modules/genesis_block_utils.md) / GenesisBlockUtils

# Class: GenesisBlockUtils

[genesis-block-utils](../modules/genesis_block_utils.md).GenesisBlockUtils

## Table of contents

### Constructors

- [constructor](genesis_block_utils.GenesisBlockUtils.md#constructor)

### Methods

- [getChainIdFromGenesis](genesis_block_utils.GenesisBlockUtils.md#getchainidfromgenesis)
- [getGenesisBlockAsync](genesis_block_utils.GenesisBlockUtils.md#getgenesisblockasync)

## Constructors

### constructor

• **new GenesisBlockUtils**(): [`GenesisBlockUtils`](genesis_block_utils.GenesisBlockUtils.md)

#### Returns

[`GenesisBlockUtils`](genesis_block_utils.GenesisBlockUtils.md)

## Methods

### getChainIdFromGenesis

▸ **getChainIdFromGenesis**(`genesis`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `genesis` | `string` |

#### Returns

`number`

#### Defined in

[genesis-block-utils.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/genesis-block-utils.ts#L22)

___

### getGenesisBlockAsync

▸ **getGenesisBlockAsync**(`networkName`): `Promise`\<`string`\>

Fetches the genesis block (as JSON data) from Google Storage.
If the network is not working, the method will reject the returned promise
along with the response data from Google api.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkName` | `string` | Name of the network to fetch genesis block for |

#### Returns

`Promise`\<`string`\>

#### Defined in

[genesis-block-utils.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/genesis-block-utils.ts#L14)
