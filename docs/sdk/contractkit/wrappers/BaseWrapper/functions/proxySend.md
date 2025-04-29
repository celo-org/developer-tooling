[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/BaseWrapper](../README.md) / proxySend

# Function: proxySend()

> **proxySend**\<`InputArgs`, `ParsedInputArgs`, `Output`\>(`connection`, ...`sendArgs`): (...`args`) => `CeloTransactionObject`\<`Output`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:331](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L331)

Creates a proxy to send a tx on a web3 native contract method.

There are 2 cases:
 - call methodFn (no pre or post parsing)
 - preParse arguments & call methodFn

## Type Parameters

### InputArgs

`InputArgs` *extends* `any`[]

### ParsedInputArgs

`ParsedInputArgs` *extends* `any`[]

### Output

`Output`

## Parameters

### connection

`Connection`

### sendArgs

...`ProxySendArgs`\<`InputArgs`, `ParsedInputArgs`, `Output`\>

## Returns

> (...`args`): `CeloTransactionObject`\<`Output`\>

### Parameters

#### args

...`InputArgs`

### Returns

`CeloTransactionObject`\<`Output`\>
