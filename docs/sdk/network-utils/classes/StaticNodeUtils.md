[**@celo/network-utils v5.0.8**](../README.md)

***

[@celo/network-utils](../README.md) / StaticNodeUtils

# Class: StaticNodeUtils

Defined in: [static-node-utils.ts:73](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L73)

## Constructors

### Constructor

> **new StaticNodeUtils**(): `StaticNodeUtils`

#### Returns

`StaticNodeUtils`

## Methods

### getRegionalStaticNodesAsync()

> `static` **getRegionalStaticNodesAsync**(`networkName`, `region?`): `Promise`\<`string`\>

Defined in: [static-node-utils.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L110)

Fetches the static nodes (as JSON data) from Google Storage corresponding
to the best available region for this caller.
If the network is not working, the method will reject the returned promise
along with the response data from Google API.

#### Parameters

##### networkName

`string`

Name of the network to fetch config for

##### region?

`string`

#### Returns

`Promise`\<`string`\>

***

### getStaticNodeRegion()

> `static` **getStaticNodeRegion**(`networkName`, `tz?`): `string`

Defined in: [static-node-utils.ts:88](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L88)

Resolves the best region to use for static node connections.

#### Parameters

##### networkName

`string`

Name of the network to get a region for.

##### tz?

`string`

#### Returns

`string`

#### Remarks

This method currently uses the interpreter's timezone and the
IANA timezone database to establish what region of the world the client is
in, then map that to a static list of static node clusters run by cLabs.
If the timezone is not set according to the user's location, this method
may route them to suboptimal set of static nodes. The resolution method
may be replaced in the future.

***

### getStaticNodesAsync()

> `static` **getStaticNodesAsync**(`networkName`): `Promise`\<`string`\>

Defined in: [static-node-utils.ts:123](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L123)

Fetches the static nodes (as JSON data) from Google Storage.
If the network is not working, the method will reject the returned promise
along with the response data from Google API.

#### Parameters

##### networkName

`string`

Name of the network to fetch config for

#### Returns

`Promise`\<`string`\>

***

### getStaticNodesGoogleStorageBucketName()

> `static` **getStaticNodesGoogleStorageBucketName**(): `string`

Defined in: [static-node-utils.ts:74](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/network-utils/src/static-node-utils.ts#L74)

#### Returns

`string`
