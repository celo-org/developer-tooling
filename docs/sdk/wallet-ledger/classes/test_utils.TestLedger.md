[@celo/wallet-ledger](../README.md) / [test-utils](../modules/test_utils.md) / TestLedger

# Class: TestLedger

[test-utils](../modules/test_utils.md).TestLedger

## Table of contents

### Constructors

- [constructor](test_utils.TestLedger.md#constructor)

### Properties

- [config](test_utils.TestLedger.md#config)
- [isMock](test_utils.TestLedger.md#ismock)
- [mockForceValidation](test_utils.TestLedger.md#mockforcevalidation)
- [transport](test_utils.TestLedger.md#transport)

### Methods

- [getAddress](test_utils.TestLedger.md#getaddress)
- [getAppConfiguration](test_utils.TestLedger.md#getappconfiguration)
- [getName](test_utils.TestLedger.md#getname)
- [provideERC20TokenInformation](test_utils.TestLedger.md#provideerc20tokeninformation)
- [signEIP712HashedMessage](test_utils.TestLedger.md#signeip712hashedmessage)
- [signPersonalMessage](test_utils.TestLedger.md#signpersonalmessage)
- [signTransaction](test_utils.TestLedger.md#signtransaction)

## Constructors

### constructor

• **new TestLedger**(`mockForceValidation`, `config?`): [`TestLedger`](test_utils.TestLedger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockForceValidation` | () => `void` |
| `config?` | `Config` |

#### Returns

[`TestLedger`](test_utils.TestLedger.md)

#### Defined in

[wallet-ledger/src/test-utils.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L113)

## Properties

### config

• `Optional` `Readonly` **config**: `Config`

#### Defined in

[wallet-ledger/src/test-utils.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L113)

___

### isMock

• **isMock**: `boolean` = `true`

#### Defined in

[wallet-ledger/src/test-utils.ts:110](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L110)

___

### mockForceValidation

• `Readonly` **mockForceValidation**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[wallet-ledger/src/test-utils.ts:113](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L113)

___

### transport

• **transport**: `default`

#### Defined in

[wallet-ledger/src/test-utils.ts:111](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L111)

## Methods

### getAddress

▸ **getAddress**(`derivationPath`, `forceValidation?`): `Promise`\<\{ `address`: `string` = ''; `derivationPath`: `string` ; `publicKey`: `string` = '' }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `forceValidation?` | `boolean` |

#### Returns

`Promise`\<\{ `address`: `string` = ''; `derivationPath`: `string` ; `publicKey`: `string` = '' }\>

#### Defined in

[wallet-ledger/src/test-utils.ts:142](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L142)

___

### getAppConfiguration

▸ **getAppConfiguration**(): `Promise`\<\{ `arbitraryDataEnabled`: `number` ; `erc20ProvisioningNecessary`: `number` ; `starkEnabled`: `number` ; `starkv2Supported`: `number` ; `version`: `string`  }\>

#### Returns

`Promise`\<\{ `arbitraryDataEnabled`: `number` ; `erc20ProvisioningNecessary`: `number` ; `starkEnabled`: `number` ; `starkv2Supported`: `number` ; `version`: `string`  }\>

#### Defined in

[wallet-ledger/src/test-utils.ts:132](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L132)

___

### getName

▸ **getName**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[wallet-ledger/src/test-utils.ts:128](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L128)

___

### provideERC20TokenInformation

▸ **provideERC20TokenInformation**(`tokenData`): `Promise`\<``true``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenData` | `string` |

#### Returns

`Promise`\<``true``\>

#### Defined in

[wallet-ledger/src/test-utils.ts:211](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L211)

___

### signEIP712HashedMessage

▸ **signEIP712HashedMessage**(`derivationPath`, `_domainSeparator`, `_structHash`): `Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `_domainSeparator` | `string` |
| `_structHash` | `string` |

#### Returns

`Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Defined in

[wallet-ledger/src/test-utils.ts:194](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L194)

___

### signPersonalMessage

▸ **signPersonalMessage**(`derivationPath`, `data`): `Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `data` | `string` |

#### Returns

`Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Defined in

[wallet-ledger/src/test-utils.ts:177](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L177)

___

### signTransaction

▸ **signTransaction**(`derivationPath`, `data`): `Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `data` | `string` |

#### Returns

`Promise`\<\{ `r`: `string` ; `s`: `string` ; `v`: `string`  }\>

#### Defined in

[wallet-ledger/src/test-utils.ts:160](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/test-utils.ts#L160)
