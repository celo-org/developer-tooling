[@celo/wallet-ledger](../README.md) / [types](../modules/types.md) / ILedger

# Interface: ILedger

[types](../modules/types.md).ILedger

## Table of contents

### Methods

- [getAddress](types.ILedger.md#getaddress)
- [getAppConfiguration](types.ILedger.md#getappconfiguration)
- [provideERC20TokenInformation](types.ILedger.md#provideerc20tokeninformation)
- [signEIP712HashedMessage](types.ILedger.md#signeip712hashedmessage)
- [signPersonalMessage](types.ILedger.md#signpersonalmessage)
- [signTransaction](types.ILedger.md#signtransaction)

## Methods

### getAddress

▸ **getAddress**(`derivationPath`, `forceValidation?`): `Promise`\<\{ `address?`: \`0x$\{string}\` ; `derivationPath?`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `forceValidation?` | `boolean` |

#### Returns

`Promise`\<\{ `address?`: \`0x$\{string}\` ; `derivationPath?`: `string`  }\>

#### Defined in

[wallet-ledger/src/types.d.ts:5](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/types.d.ts#L5)

___

### getAppConfiguration

▸ **getAppConfiguration**(): `Promise`\<\{ `arbitraryDataEnabled`: `number` ; `version`: `string`  }\>

#### Returns

`Promise`\<\{ `arbitraryDataEnabled`: `number` ; `version`: `string`  }\>

#### Defined in

[wallet-ledger/src/types.d.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/types.d.ts#L16)

___

### provideERC20TokenInformation

▸ **provideERC20TokenInformation**(`TokenInfo`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `TokenInfo` | `any` |

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[wallet-ledger/src/types.d.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/types.d.ts#L17)

___

### signEIP712HashedMessage

▸ **signEIP712HashedMessage**(`derivationPath`, `domainSeparator`, `structHash`): `Promise`\<[`LedgerSignature`](../modules/types.md#ledgersignature)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `domainSeparator` | `Buffer` |
| `structHash` | `Buffer` |

#### Returns

`Promise`\<[`LedgerSignature`](../modules/types.md#ledgersignature)\>

#### Defined in

[wallet-ledger/src/types.d.ts:11](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/types.d.ts#L11)

___

### signPersonalMessage

▸ **signPersonalMessage**(`derivationPath`, `data`): `Promise`\<[`LedgerSignature`](../modules/types.md#ledgersignature)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `data` | `string` |

#### Returns

`Promise`\<[`LedgerSignature`](../modules/types.md#ledgersignature)\>

#### Defined in

[wallet-ledger/src/types.d.ts:10](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/types.d.ts#L10)

___

### signTransaction

▸ **signTransaction**(`derivationPath`, `data`): `Promise`\<[`LedgerSignature`](../modules/types.md#ledgersignature)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `derivationPath` | `string` |
| `data` | `string` |

#### Returns

`Promise`\<[`LedgerSignature`](../modules/types.md#ledgersignature)\>

#### Defined in

[wallet-ledger/src/types.d.ts:9](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/wallets/wallet-ledger/src/types.d.ts#L9)
