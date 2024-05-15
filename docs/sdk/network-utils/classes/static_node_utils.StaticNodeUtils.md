[@celo/network-utils](../README.md) / [static-node-utils](../modules/static_node_utils.md) / StaticNodeUtils

# Class: StaticNodeUtils

[static-node-utils](../modules/static_node_utils.md).StaticNodeUtils

## Table of contents

### Constructors

- [constructor](static_node_utils.StaticNodeUtils.md#constructor)

### Methods

- [getRegionalStaticNodesAsync](static_node_utils.StaticNodeUtils.md#getregionalstaticnodesasync)
- [getStaticNodeRegion](static_node_utils.StaticNodeUtils.md#getstaticnoderegion)
- [getStaticNodesAsync](static_node_utils.StaticNodeUtils.md#getstaticnodesasync)
- [getStaticNodesGoogleStorageBucketName](static_node_utils.StaticNodeUtils.md#getstaticnodesgooglestoragebucketname)

## Constructors

### constructor

• **new StaticNodeUtils**(): [`StaticNodeUtils`](static_node_utils.StaticNodeUtils.md)

#### Returns

[`StaticNodeUtils`](static_node_utils.StaticNodeUtils.md)

## Methods

### getRegionalStaticNodesAsync

▸ **getRegionalStaticNodesAsync**(`networkName`, `region?`): `Promise`\<`string`\>

Fetches the static nodes (as JSON data) from Google Storage corresponding
to the best available region for this caller.
If the network is not working, the method will reject the returned promise
along with the response data from Google API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkName` | `string` | Name of the network to fetch config for |
| `region?` | `string` | - |

#### Returns

`Promise`\<`string`\>

#### Defined in

[static-node-utils.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L110)

___

### getStaticNodeRegion

▸ **getStaticNodeRegion**(`networkName`, `tz?`): `string`

Resolves the best region to use for static node connections.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkName` | `string` | Name of the network to get a region for. |
| `tz?` | `string` | - |

#### Returns

`string`

**`Remarks`**

This method currently uses the interpreter's timezone and the
IANA timezone database to establish what region of the world the client is
in, then map that to a static list of static node clusters run by cLabs.
If the timezone is not set according to the user's location, this method
may route them to suboptimal set of static nodes. The resolution method
may be replaced in the future.

#### Defined in

[static-node-utils.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L88)

___

### getStaticNodesAsync

▸ **getStaticNodesAsync**(`networkName`): `Promise`\<`string`\>

Fetches the static nodes (as JSON data) from Google Storage.
If the network is not working, the method will reject the returned promise
along with the response data from Google API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkName` | `string` | Name of the network to fetch config for |

#### Returns

`Promise`\<`string`\>

#### Defined in

[static-node-utils.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L123)

___

### getStaticNodesGoogleStorageBucketName

▸ **getStaticNodesGoogleStorageBucketName**(): `string`

#### Returns

`string`

#### Defined in

[static-node-utils.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L74)
