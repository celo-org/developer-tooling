[**@celo/network-utils v5.0.9-beta.0**](../README.md)

***

[@celo/network-utils](../README.md) / GenesisBlockUtils

# Class: GenesisBlockUtils

Defined in: [genesis-block-utils.ts:7](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/genesis-block-utils.ts#L7)

## Constructors

### Constructor

> **new GenesisBlockUtils**(): `GenesisBlockUtils`

#### Returns

`GenesisBlockUtils`

## Methods

### getChainIdFromGenesis()

> `static` **getChainIdFromGenesis**(`genesis`): `number`

Defined in: [genesis-block-utils.ts:22](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/genesis-block-utils.ts#L22)

#### Parameters

##### genesis

`string`

#### Returns

`number`

***

### getGenesisBlockAsync()

> `static` **getGenesisBlockAsync**(`networkName`): `Promise`\<`string`\>

Defined in: [genesis-block-utils.ts:14](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/genesis-block-utils.ts#L14)

Fetches the genesis block (as JSON data) from Google Storage.
If the network is not working, the method will reject the returned promise
along with the response data from Google api.

#### Parameters

##### networkName

`string`

Name of the network to fetch genesis block for

#### Returns

`Promise`\<`string`\>
