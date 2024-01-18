[@celo/contractkit](../README.md) / [Exports](../modules.md) / wrappers/BaseWrapper

# Module: wrappers/BaseWrapper

## Table of contents

### Classes

- [BaseWrapper](../classes/wrappers_BaseWrapper.BaseWrapper.md)

### Functions

- [blocksToDurationString](wrappers_BaseWrapper.md#blockstodurationstring)
- [bufferToSolidityBytes](wrappers_BaseWrapper.md#buffertosoliditybytes)
- [fixidityValueToBigNumber](wrappers_BaseWrapper.md#fixidityvaluetobignumber)
- [identity](wrappers_BaseWrapper.md#identity)
- [proxyCall](wrappers_BaseWrapper.md#proxycall)
- [proxySend](wrappers_BaseWrapper.md#proxysend)
- [secondsToDurationString](wrappers_BaseWrapper.md#secondstodurationstring)
- [solidityBytesToString](wrappers_BaseWrapper.md#soliditybytestostring)
- [stringIdentity](wrappers_BaseWrapper.md#stringidentity)
- [stringToSolidityBytes](wrappers_BaseWrapper.md#stringtosoliditybytes)
- [tupleParser](wrappers_BaseWrapper.md#tupleparser)
- [unixSecondsTimestampToDateString](wrappers_BaseWrapper.md#unixsecondstimestamptodatestring)
- [valueToBigNumber](wrappers_BaseWrapper.md#valuetobignumber)
- [valueToFixidityString](wrappers_BaseWrapper.md#valuetofixiditystring)
- [valueToFrac](wrappers_BaseWrapper.md#valuetofrac)
- [valueToInt](wrappers_BaseWrapper.md#valuetoint)
- [valueToString](wrappers_BaseWrapper.md#valuetostring)

## Functions

### blocksToDurationString

▸ **blocksToDurationString**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Value` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:145](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L145)

___

### bufferToSolidityBytes

▸ **bufferToSolidityBytes**(`input`): `SolidityBytes`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Buffer` |

#### Returns

`SolidityBytes`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:167](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L167)

___

### fixidityValueToBigNumber

▸ **fixidityValueToBigNumber**(`input`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Value` |

#### Returns

`BigNumber`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:85](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L85)

___

### identity

▸ **identity**\<`A`\>(`a`): `A`

Identity Parser

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`A`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:182](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L182)

___

### proxyCall

▸ **proxyCall**\<`InputArgs`, `ParsedInputArgs`, `PreParsedOutput`, `Output`\>(`methodFn`, `parseInputArgs`, `parseOutput`): (...`args`: `InputArgs`) => `Promise`\<`Output`\>

Creates a proxy to call a web3 native contract method.

There are 4 cases:
 - methodFn
 - parseInputArgs => methodFn
 - parseInputArgs => methodFn => parseOutput
 - methodFn => parseOutput

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InputArgs` | extends `any`[] |
| `ParsedInputArgs` | extends `any`[] |
| `PreParsedOutput` | `PreParsedOutput` |
| `Output` | `Output` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `methodFn` | `Method`\<`ParsedInputArgs`, `PreParsedOutput`\> | Web3 methods function |
| `parseInputArgs` | (...`args`: `InputArgs`) => `ParsedInputArgs` | [optional] parseInputArgs function, tranforms arguments into `methodFn` expected inputs |
| `parseOutput` | (`o`: `PreParsedOutput`) => `Output` | [optional] parseOutput function, transforms `methodFn` output into proxy return |

#### Returns

`fn`

▸ (`...args`): `Promise`\<`Output`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `InputArgs` |

##### Returns

`Promise`\<`Output`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:251](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L251)

▸ **proxyCall**\<`InputArgs`, `PreParsedOutput`, `Output`\>(`methodFn`, `x`, `parseOutput`): (...`args`: `InputArgs`) => `Promise`\<`Output`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InputArgs` | extends `any`[] |
| `PreParsedOutput` | `PreParsedOutput` |
| `Output` | `Output` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `methodFn` | `Method`\<`InputArgs`, `PreParsedOutput`\> |
| `x` | `undefined` |
| `parseOutput` | (`o`: `PreParsedOutput`) => `Output` |

#### Returns

`fn`

▸ (`...args`): `Promise`\<`Output`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `InputArgs` |

##### Returns

`Promise`\<`Output`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:261](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L261)

▸ **proxyCall**\<`InputArgs`, `ParsedInputArgs`, `Output`\>(`methodFn`, `parseInputArgs`): (...`args`: `InputArgs`) => `Promise`\<`Output`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InputArgs` | extends `any`[] |
| `ParsedInputArgs` | extends `any`[] |
| `Output` | `Output` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `methodFn` | `Method`\<`ParsedInputArgs`, `Output`\> |
| `parseInputArgs` | (...`args`: `InputArgs`) => `ParsedInputArgs` |

#### Returns

`fn`

▸ (`...args`): `Promise`\<`Output`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `InputArgs` |

##### Returns

`Promise`\<`Output`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:266](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L266)

▸ **proxyCall**\<`InputArgs`, `Output`\>(`methodFn`): (...`args`: `InputArgs`) => `Promise`\<`Output`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InputArgs` | extends `any`[] |
| `Output` | `Output` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `methodFn` | `Method`\<`InputArgs`, `Output`\> |

#### Returns

`fn`

▸ (`...args`): `Promise`\<`Output`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `InputArgs` |

##### Returns

`Promise`\<`Output`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:270](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L270)

___

### proxySend

▸ **proxySend**\<`InputArgs`, `ParsedInputArgs`, `Output`\>(`connection`, `...sendArgs`): (...`args`: `InputArgs`) => `CeloTransactionObject`\<`Output`\>

Creates a proxy to send a tx on a web3 native contract method.

There are 2 cases:
 - call methodFn (no pre or post parsing)
 - preParse arguments & call methodFn

#### Type parameters

| Name | Type |
| :------ | :------ |
| `InputArgs` | extends `any`[] |
| `ParsedInputArgs` | extends `any`[] |
| `Output` | `Output` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `...sendArgs` | `ProxySendArgs`\<`InputArgs`, `ParsedInputArgs`, `Output`\> |

#### Returns

`fn`

▸ (`...args`): `CeloTransactionObject`\<`Output`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `InputArgs` |

##### Returns

`CeloTransactionObject`\<`Output`\>

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:331](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L331)

___

### secondsToDurationString

▸ **secondsToDurationString**(`durationSeconds`, `outputUnits?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `durationSeconds` | `Value` |
| `outputUnits` | (``"millennium"`` \| ``"century"`` \| ``"decade"`` \| ``"year"`` \| ``"quarter"`` \| ``"month"`` \| ``"week"`` \| ``"day"`` \| ``"hour"`` \| ``"minute"`` \| ``"second"`` \| ``"millisecond"``)[] |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:116](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L116)

___

### solidityBytesToString

▸ **solidityBytesToString**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `SolidityBytes` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:168](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L168)

___

### stringIdentity

▸ **stringIdentity**(`x`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `string` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:183](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L183)

___

### stringToSolidityBytes

▸ **stringToSolidityBytes**(`input`): `SolidityBytes`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`SolidityBytes`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:166](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L166)

___

### tupleParser

▸ **tupleParser**\<`A0`, `B0`\>(`parser0`): (...`args`: [`A0`]) => [`B0`]

Tuple parser
Useful to map different input arguments

#### Type parameters

| Name |
| :------ |
| `A0` |
| `B0` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser0` | `Parser`\<`A0`, `B0`\> |

#### Returns

`fn`

▸ (`...args`): [`B0`]

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`A0`] |

##### Returns

[`B0`]

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:189](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L189)

▸ **tupleParser**\<`A0`, `B0`, `A1`, `B1`\>(`parser0`, `parser1`): (...`args`: [`A0`, `A1`]) => [`B0`, `B1`]

#### Type parameters

| Name |
| :------ |
| `A0` |
| `B0` |
| `A1` |
| `B1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser0` | `Parser`\<`A0`, `B0`\> |
| `parser1` | `Parser`\<`A1`, `B1`\> |

#### Returns

`fn`

▸ (`...args`): [`B0`, `B1`]

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`A0`, `A1`] |

##### Returns

[`B0`, `B1`]

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:190](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L190)

▸ **tupleParser**\<`A0`, `B0`, `A1`, `B1`, `A2`, `B2`\>(`parser0`, `parser1`, `parser2`): (...`args`: [`A0`, `A1`, `A2`]) => [`B0`, `B1`, `B2`]

#### Type parameters

| Name |
| :------ |
| `A0` |
| `B0` |
| `A1` |
| `B1` |
| `A2` |
| `B2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser0` | `Parser`\<`A0`, `B0`\> |
| `parser1` | `Parser`\<`A1`, `B1`\> |
| `parser2` | `Parser`\<`A2`, `B2`\> |

#### Returns

`fn`

▸ (`...args`): [`B0`, `B1`, `B2`]

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`A0`, `A1`, `A2`] |

##### Returns

[`B0`, `B1`, `B2`]

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L194)

▸ **tupleParser**\<`A0`, `B0`, `A1`, `B1`, `A2`, `B2`, `A3`, `B3`\>(`parser0`, `parser1`, `parser2`, `parser3`): (...`args`: [`A0`, `A1`, `A2`, `A3`]) => [`B0`, `B1`, `B2`, `B3`]

#### Type parameters

| Name |
| :------ |
| `A0` |
| `B0` |
| `A1` |
| `B1` |
| `A2` |
| `B2` |
| `A3` |
| `B3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser0` | `Parser`\<`A0`, `B0`\> |
| `parser1` | `Parser`\<`A1`, `B1`\> |
| `parser2` | `Parser`\<`A2`, `B2`\> |
| `parser3` | `Parser`\<`A3`, `B3`\> |

#### Returns

`fn`

▸ (`...args`): [`B0`, `B1`, `B2`, `B3`]

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`A0`, `A1`, `A2`, `A3`] |

##### Returns

[`B0`, `B1`, `B2`, `B3`]

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:199](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L199)

___

### unixSecondsTimestampToDateString

▸ **unixSecondsTimestampToDateString**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Value` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:158](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L158)

___

### valueToBigNumber

▸ **valueToBigNumber**(`input`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Value` |

#### Returns

`BigNumber`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:83](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L83)

___

### valueToFixidityString

▸ **valueToFixidityString**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Value` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:89](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L89)

___

### valueToFrac

▸ **valueToFrac**(`numerator`, `denominator`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `numerator` | `Value` |
| `denominator` | `Value` |

#### Returns

`BigNumber`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:95](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L95)

___

### valueToInt

▸ **valueToInt**(`input`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Value` |

#### Returns

`number`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:92](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L92)

___

### valueToString

▸ **valueToString**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Value` |

#### Returns

`string`

#### Defined in

[packages/sdk/contractkit/src/wrappers/BaseWrapper.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/BaseWrapper.ts#L87)
