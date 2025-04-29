[**@celo/wallet-ledger**](../../README.md)

***

[@celo/wallet-ledger](../../README.md) / [test-utils](../README.md) / TestLedger

# Class: TestLedger

Defined in: [wallet-ledger/src/test-utils.ts:109](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L109)

## Constructors

### Constructor

> **new TestLedger**(`mockForceValidation`, `config?`): `TestLedger`

Defined in: [wallet-ledger/src/test-utils.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L113)

#### Parameters

##### mockForceValidation

() => `void`

##### config?

`Config`

#### Returns

`TestLedger`

## Properties

### config?

> `readonly` `optional` **config**: `Config`

Defined in: [wallet-ledger/src/test-utils.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L113)

***

### isMock

> **isMock**: `boolean` = `true`

Defined in: [wallet-ledger/src/test-utils.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L110)

***

### mockForceValidation()

> `readonly` **mockForceValidation**: () => `void`

Defined in: [wallet-ledger/src/test-utils.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L113)

#### Returns

`void`

***

### transport

> **transport**: `Transport`

Defined in: [wallet-ledger/src/test-utils.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L111)

## Methods

### getAddress()

> **getAddress**(`derivationPath`, `forceValidation?`): `Promise`\<\{ `address`: `string`; `derivationPath`: `string`; `publicKey`: `string`; \}\>

Defined in: [wallet-ledger/src/test-utils.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L142)

#### Parameters

##### derivationPath

`string`

##### forceValidation?

`boolean`

#### Returns

`Promise`\<\{ `address`: `string`; `derivationPath`: `string`; `publicKey`: `string`; \}\>

***

### getAppConfiguration()

> **getAppConfiguration**(): `Promise`\<\{ `arbitraryDataEnabled`: `number`; `erc20ProvisioningNecessary`: `number`; `starkEnabled`: `number`; `starkv2Supported`: `number`; `version`: `string`; \}\>

Defined in: [wallet-ledger/src/test-utils.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L132)

#### Returns

`Promise`\<\{ `arbitraryDataEnabled`: `number`; `erc20ProvisioningNecessary`: `number`; `starkEnabled`: `number`; `starkv2Supported`: `number`; `version`: `string`; \}\>

***

### getName()

> **getName**(): `undefined` \| `string`

Defined in: [wallet-ledger/src/test-utils.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L128)

#### Returns

`undefined` \| `string`

***

### provideERC20TokenInformation()

> **provideERC20TokenInformation**(`tokenData`): `Promise`\<`true`\>

Defined in: [wallet-ledger/src/test-utils.ts:211](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L211)

#### Parameters

##### tokenData

`string`

#### Returns

`Promise`\<`true`\>

***

### signEIP712HashedMessage()

> **signEIP712HashedMessage**(`derivationPath`, `_domainSeparator`, `_structHash`): `Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

Defined in: [wallet-ledger/src/test-utils.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L194)

#### Parameters

##### derivationPath

`string`

##### \_domainSeparator

`string`

##### \_structHash

`string`

#### Returns

`Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

***

### signPersonalMessage()

> **signPersonalMessage**(`derivationPath`, `data`): `Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

Defined in: [wallet-ledger/src/test-utils.ts:177](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L177)

#### Parameters

##### derivationPath

`string`

##### data

`string`

#### Returns

`Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `number`; \}\>

***

### signTransaction()

> **signTransaction**(`derivationPath`, `data`): `Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `string`; \}\>

Defined in: [wallet-ledger/src/test-utils.ts:160](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L160)

#### Parameters

##### derivationPath

`string`

##### data

`string`

#### Returns

`Promise`\<\{ `r`: `string`; `s`: `string`; `v`: `string`; \}\>
