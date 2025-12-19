**@celo/base v7.0.4**

***

# @celo/base v7.0.4

## Enumerations

- [DerivationPathAliases](enumerations/DerivationPathAliases.md)
- [MnemonicLanguages](enumerations/MnemonicLanguages.md)
- [MnemonicStrength](enumerations/MnemonicStrength.md)
- [StableToken](enumerations/StableToken.md)
- [Token](enumerations/Token.md)
- [ValidatorKind](enumerations/ValidatorKind.md)

## Classes

- [Future](classes/Future.md)
- [JSONParseError](classes/JSONParseError.md)
- [RootError](classes/RootError.md)

## Interfaces

- [AddressListItem](interfaces/AddressListItem.md)
- [BaseError](interfaces/BaseError.md)
- [BaseProps](interfaces/BaseProps.md)
- [Bip39](interfaces/Bip39.md)
- [ErrorResult](interfaces/ErrorResult.md)
- [OkResult](interfaces/OkResult.md)
- [ParsedPhoneNumber](interfaces/ParsedPhoneNumber.md)
- [RepeatTaskContext](interfaces/RepeatTaskContext.md)
- [RetryTaskOptions](interfaces/RetryTaskOptions.md)
- [RunningTask](interfaces/RunningTask.md)
- [RunningTaskWithValue](interfaces/RunningTaskWithValue.md)
- [Signature](interfaces/Signature.md)
- [Signer](interfaces/Signer.md)
- [TaskOptions](interfaces/TaskOptions.md)

## Type Aliases

- [Address](type-aliases/Address.md)
- [CeloTokenType](type-aliases/CeloTokenType.md)
- [Comparator](type-aliases/Comparator.md)
- [DerivationPath](type-aliases/DerivationPath.md)
- [HexString](type-aliases/HexString.md)
- [Logger](type-aliases/Logger.md)
- [RandomNumberGenerator](type-aliases/RandomNumberGenerator.md)
- [Result](type-aliases/Result.md)
- [StrongAddress](type-aliases/StrongAddress.md)

## Variables

- [CELO\_DERIVATION\_PATH\_BASE](variables/CELO_DERIVATION_PATH_BASE.md)
- [consoleLogger](variables/consoleLogger.md)
- [ETHEREUM\_DERIVATION\_PATH](variables/ETHEREUM_DERIVATION_PATH.md)
- [JSONParseErrorType](variables/JSONParseErrorType.md)
- [noopLogger](variables/noopLogger.md)
- [NULL\_ADDRESS](variables/NULL_ADDRESS.md)
- [PhoneNumberBase](variables/PhoneNumberBase.md)
- [POP\_SIZE](variables/POP_SIZE.md)
- [SignatureBase](variables/SignatureBase.md)
- [StringBase](variables/StringBase.md)
- [URL\_REGEX](variables/URL_REGEX.md)

## Functions

- [appendPath](functions/appendPath.md)
- [bufferToHex](functions/bufferToHex.md)
- [concurrentMap](functions/concurrentMap.md)
- [concurrentValuesMap](functions/concurrentValuesMap.md)
- [conditionWatcher](functions/conditionWatcher.md)
- [ensureLeading0x](functions/ensureLeading0x.md)
- [eqAddress](functions/eqAddress.md)
- [Err](functions/Err.md)
- [findAddressIndex](functions/findAddressIndex.md)
- [getAddressChunks](functions/getAddressChunks.md)
- [hexToBuffer](functions/hexToBuffer.md)
- [intersection](functions/intersection.md)
- [isE164Number](functions/isE164Number.md)
- [isErr](functions/isErr.md)
- [isHexString](functions/isHexString.md)
- [isNullAddress](functions/isNullAddress.md)
- [isOk](functions/isOk.md)
- [isValidUrl](functions/isValidUrl.md)
- [linkedListChange](functions/linkedListChange.md)
- [linkedListChanges](functions/linkedListChanges.md)
- [makeAsyncThrowable](functions/makeAsyncThrowable.md)
- [makeThrowable](functions/makeThrowable.md)
- [mapAddressListDataOnto](functions/mapAddressListDataOnto.md)
- [mapAddressListOnto](functions/mapAddressListOnto.md)
- [NativeSigner](functions/NativeSigner.md)
- [normalizeAccents](functions/normalizeAccents.md)
- [normalizeAddress](functions/normalizeAddress.md)
- [normalizeAddressWith0x](functions/normalizeAddressWith0x.md)
- [notEmpty](functions/notEmpty.md)
- [Ok](functions/Ok.md)
- [parseJsonAsResult](functions/parseJsonAsResult.md)
- [parseSolidityStringArray](functions/parseSolidityStringArray.md)
- [pipeToFuture](functions/pipeToFuture.md)
- [prefixLogger](functions/prefixLogger.md)
- [repeatTask](functions/repeatTask.md)
- [retryAsync](functions/retryAsync.md)
- [retryAsyncWithBackOff](functions/retryAsyncWithBackOff.md)
- [retryAsyncWithBackOffAndTimeout](functions/retryAsyncWithBackOffAndTimeout.md)
- [selectiveRetryAsyncWithBackOff](functions/selectiveRetryAsyncWithBackOff.md)
- [serializeSignature](functions/serializeSignature.md)
- [sleep](functions/sleep.md)
- [stringToBoolean](functions/stringToBoolean.md)
- [throwIfError](functions/throwIfError.md)
- [timeout](functions/timeout.md)
- [toFuture](functions/toFuture.md)
- [trimLeading0x](functions/trimLeading0x.md)
- [tryObtainValueWithRetries](functions/tryObtainValueWithRetries.md)
- [validateDecimal](functions/validateDecimal.md)
- [validateInteger](functions/validateInteger.md)
- [zeroRange](functions/zeroRange.md)
- [zip](functions/zip.md)
- [zip3](functions/zip3.md)
