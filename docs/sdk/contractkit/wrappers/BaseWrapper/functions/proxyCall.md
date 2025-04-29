[**@celo/contractkit**](../../../README.md)

***

[@celo/contractkit](../../../modules.md) / [wrappers/BaseWrapper](../README.md) / proxyCall

# Function: proxyCall()

## Call Signature

> **proxyCall**\<`InputArgs`, `ParsedInputArgs`, `PreParsedOutput`, `Output`\>(`methodFn`, `parseInputArgs`, `parseOutput`): (...`args`) => `Promise`\<`Output`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L251)

Creates a proxy to call a web3 native contract method.

There are 4 cases:
 - methodFn
 - parseInputArgs => methodFn
 - parseInputArgs => methodFn => parseOutput
 - methodFn => parseOutput

### Type Parameters

#### InputArgs

`InputArgs` *extends* `any`[]

#### ParsedInputArgs

`ParsedInputArgs` *extends* `any`[]

#### PreParsedOutput

`PreParsedOutput`

#### Output

`Output`

### Parameters

#### methodFn

`Method`\<`ParsedInputArgs`, `PreParsedOutput`\>

Web3 methods function

#### parseInputArgs

(...`args`) => `ParsedInputArgs`

[optional] parseInputArgs function, tranforms arguments into `methodFn` expected inputs

#### parseOutput

(`o`) => `Output`

[optional] parseOutput function, transforms `methodFn` output into proxy return

### Returns

> (...`args`): `Promise`\<`Output`\>

#### Parameters

##### args

...`InputArgs`

#### Returns

`Promise`\<`Output`\>

## Call Signature

> **proxyCall**\<`InputArgs`, `PreParsedOutput`, `Output`\>(`methodFn`, `x`, `parseOutput`): (...`args`) => `Promise`\<`Output`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:261](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L261)

Creates a proxy to call a web3 native contract method.

There are 4 cases:
 - methodFn
 - parseInputArgs => methodFn
 - parseInputArgs => methodFn => parseOutput
 - methodFn => parseOutput

### Type Parameters

#### InputArgs

`InputArgs` *extends* `any`[]

#### PreParsedOutput

`PreParsedOutput`

#### Output

`Output`

### Parameters

#### methodFn

`Method`\<`InputArgs`, `PreParsedOutput`\>

Web3 methods function

#### x

`undefined`

#### parseOutput

(`o`) => `Output`

[optional] parseOutput function, transforms `methodFn` output into proxy return

### Returns

> (...`args`): `Promise`\<`Output`\>

#### Parameters

##### args

...`InputArgs`

#### Returns

`Promise`\<`Output`\>

## Call Signature

> **proxyCall**\<`InputArgs`, `ParsedInputArgs`, `Output`\>(`methodFn`, `parseInputArgs`): (...`args`) => `Promise`\<`Output`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:266](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L266)

Creates a proxy to call a web3 native contract method.

There are 4 cases:
 - methodFn
 - parseInputArgs => methodFn
 - parseInputArgs => methodFn => parseOutput
 - methodFn => parseOutput

### Type Parameters

#### InputArgs

`InputArgs` *extends* `any`[]

#### ParsedInputArgs

`ParsedInputArgs` *extends* `any`[]

#### Output

`Output`

### Parameters

#### methodFn

`Method`\<`ParsedInputArgs`, `Output`\>

Web3 methods function

#### parseInputArgs

(...`args`) => `ParsedInputArgs`

[optional] parseInputArgs function, tranforms arguments into `methodFn` expected inputs

### Returns

> (...`args`): `Promise`\<`Output`\>

#### Parameters

##### args

...`InputArgs`

#### Returns

`Promise`\<`Output`\>

## Call Signature

> **proxyCall**\<`InputArgs`, `Output`\>(`methodFn`): (...`args`) => `Promise`\<`Output`\>

Defined in: [packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:270](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L270)

Creates a proxy to call a web3 native contract method.

There are 4 cases:
 - methodFn
 - parseInputArgs => methodFn
 - parseInputArgs => methodFn => parseOutput
 - methodFn => parseOutput

### Type Parameters

#### InputArgs

`InputArgs` *extends* `any`[]

#### Output

`Output`

### Parameters

#### methodFn

`Method`\<`InputArgs`, `Output`\>

Web3 methods function

### Returns

> (...`args`): `Promise`\<`Output`\>

#### Parameters

##### args

...`InputArgs`

#### Returns

`Promise`\<`Output`\>
