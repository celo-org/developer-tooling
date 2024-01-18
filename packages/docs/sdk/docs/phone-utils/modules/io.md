[@celo/phone-utils](../README.md) / [Exports](../modules.md) / io

# Module: io

## Table of contents

### Type Aliases

- [AttestationRequest](io.md#attestationrequest)
- [AttestationResponse](io.md#attestationresponse)
- [AttestationServiceTestRequest](io.md#attestationservicetestrequest)
- [E164Number](io.md#e164number)
- [GetAttestationRequest](io.md#getattestationrequest)

### Variables

- [AttestationRequestType](io.md#attestationrequesttype)
- [AttestationResponseType](io.md#attestationresponsetype)
- [AttestationServiceTestRequestType](io.md#attestationservicetestrequesttype)
- [E164PhoneNumberType](io.md#e164phonenumbertype)
- [GetAttestationRequestType](io.md#getattestationrequesttype)

## Type Aliases

### AttestationRequest

Ƭ **AttestationRequest**: `t.TypeOf`\<typeof [`AttestationRequestType`](io.md#attestationrequesttype)\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:41](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L41)

___

### AttestationResponse

Ƭ **AttestationResponse**: `t.TypeOf`\<typeof [`AttestationResponseType`](io.md#attestationresponsetype)\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:87](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L87)

___

### AttestationServiceTestRequest

Ƭ **AttestationServiceTestRequest**: `t.TypeOf`\<typeof [`AttestationServiceTestRequestType`](io.md#attestationservicetestrequesttype)\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:23](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L23)

___

### E164Number

Ƭ **E164Number**: `t.TypeOf`\<typeof [`E164PhoneNumberType`](io.md#e164phonenumbertype)\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:25](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L25)

___

### GetAttestationRequest

Ƭ **GetAttestationRequest**: `t.TypeOf`\<typeof [`GetAttestationRequestType`](io.md#getattestationrequesttype)\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:53](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L53)

## Variables

### AttestationRequestType

• `Const` **AttestationRequestType**: `TypeC`\<\{ `account`: `Type`\<`string`, `string`, `unknown`\> = AddressType; `issuer`: `Type`\<`string`, `string`, `unknown`\> = AddressType; `language`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `phoneNumber`: `Type`\<`string`, `string`, `unknown`\> = E164PhoneNumberType; `phoneNumberSignature`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `salt`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `securityCodePrefix`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `smsRetrieverAppSig`: `UnionC`\<[`UndefinedC`, `StringC`]\>  }\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:27](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L27)

___

### AttestationResponseType

• `Const` **AttestationResponseType**: `TypeC`\<\{ `account`: `UnionC`\<[`UndefinedC`, `Type`\<`string`, `string`, `unknown`\>]\> ; `attempt`: `UnionC`\<[`UndefinedC`, `NumberC`]\> ; `attestationCode`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `countryCode`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `duration`: `UnionC`\<[`UndefinedC`, `NumberC`]\> ; `error`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `errors`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `identifier`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `issuer`: `UnionC`\<[`UndefinedC`, `Type`\<`string`, `string`, `unknown`\>]\> ; `provider`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `salt`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `status`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `success`: `BooleanC` = t.boolean }\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:55](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L55)

___

### AttestationServiceTestRequestType

• `Const` **AttestationServiceTestRequestType**: `TypeC`\<\{ `message`: `StringC` = t.string; `phoneNumber`: `Type`\<`string`, `string`, `unknown`\> = E164PhoneNumberType; `provider`: `UnionC`\<[`StringC`, `UndefinedC`]\> ; `signature`: `StringC` = SignatureType }\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:17](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L17)

___

### E164PhoneNumberType

• `Const` **E164PhoneNumberType**: `Type`\<`string`, `string`, `unknown`\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:6](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L6)

___

### GetAttestationRequestType

• `Const` **GetAttestationRequestType**: `TypeC`\<\{ `account`: `Type`\<`string`, `string`, `unknown`\> = AddressType; `issuer`: `Type`\<`string`, `string`, `unknown`\> = AddressType; `phoneNumber`: `Type`\<`string`, `string`, `unknown`\> = E164PhoneNumberType; `salt`: `UnionC`\<[`UndefinedC`, `StringC`]\> ; `securityCode`: `UnionC`\<[`UndefinedC`, `StringC`]\>  }\>

#### Defined in

[packages/sdk/phone-utils/src/io.ts:43](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/phone-utils/src/io.ts#L43)
