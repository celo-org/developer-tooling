export default 'AAAAaARDRUxPRx7ON1DaI3+TuOM5xTaYm4l4pDgAAAASAACk7DBFAiEA5rECRg94+fCoIvoG9/5qWh62zl2C6Y+aFuuZrFe4CtcCIEJbRrkL3gqwT/Jj+7L3neazgpVCCTZZ3HX9JXXg5vleAAAAaARjVVNEdl3oFoRYYedaJfyhIrtomLixKCoAAAASAACk7DBFAiEApwQFHNBKXp+V2jq8BMD2y/5AwC9bhPQ2H4hT/vMl/B4CIFalOVtBFGREUKMU/F5vDlJLeQrTn6GQeDertpB2FpMvAAAAaARjRVVS2HY8uidqNzjm3oW0s79f3tbWynMAAAASAACk7DBFAiEAh2UeP1+SI2Ed5SiAjpJF6MkMrVa94gUwjJztyBlzhWMCIHfaOrEsxdxAGx+P+hxuSNO4zcw6KRLfJkkuic1V/CrHAAAAagZiIENFTE/dyb5X9VP+dXUtYWBrlMvX4CZO+AAAABIAAPNwMEUCIQCi62KsBfuNcfX0MriiRZ7a5DKERhtIz7sZ1SqBT7ruhgIgVrfmavyWzxzDW4AQeHn++A4qPjB1pQKoHvNXo8Hf1SMAAABpBmIgY1VTRGJJKmRKWI/ZBCcL7QatUrmr/qGuAAAAEgAA83AwRAIgGDYx4oB/gkYUqLeXqvEZXx9nOxVHzTe2ajyd2wnehxgCICQBe/rBPcXiaQJj3pdoXxroct/hV6r3G2G7y79EOEAPAAAAaQZiIGNFVVL57OMBJHrSziGJSUGDCiRw9Od0ygAAABIAAPNwMEQCIEdcFWP+HxEUoF1sCGVd34QGS0hL5cVUdrWdqVm3bYTgAiBCMA+Rg3Ubc3xla/35wzZesPlbeSMEPcr4uqL+8PeydwAAAGoGYSBDRUxP8ZSv31CwPmm9fQV8GqnhDJlU5MkAAAASAACu8zBFAiEAk/o0FBus2/QCrunFGEyoneQIRaMRC+y5L6Dvar8MU/kCIByJt2ziRhDG3AAbyXBIuJfZQujSHFcSJL3xF0xIlcPdAAAAaQZhIGNVU0SHQGn6HrFtRNYi8uDKJe6hcjabwQAAABIAAK7zMEQCIClrH2xgE3WMbD+hgQ7t5SiAcVG5WiUZ655voqCszKEoAiA/cO8UVgNY891MNJ5yeDk8w47WO0E1DQecrK71LR8g8gAAAGoGYSBjRVVSEMiSpuxDpT5F0LkWtLfTg7G3jA8AAAASAACu8zBFAiEAgpktbB1ZxyAwMJwKTSbZ30n8zgRuW0twbXoZxlsUAswCIHek4l4CIbjVMG2HVr0Ml9/8kA4F9dr69JBMaoSUkdKl'

// How did we get this? By following these steps:
// 1 - get pubkey from https://github.com/blooo-io/app-celo-spender/pull/7/files#diff-e0cf5b28d9b6b600f0af2bc78e8fd30ec675fd731a5da86f0c4283ffc0e40176L75-L83
// 2 - now you've got to trust me
// 3 - run `ASN1_PREFIX=3056301006072a8648ce3d020106052b8104000a034200`
// 4 - remove spaces, colons, 0xs from the pubkey of step 1, I've done that for you :)
// 5 - and store it in key `KEY=04b06cf5d8f7ed71d8bd9b9dc37944a1c6d240f69bb0be3621dddbb6ac0eccd1508bcc2ea46227e43b941e2c6f1b1cd0ae68e54b185e2cabef3455580604bd45b8`
// 5 - finally run `echo $ASN1_PREFIX$KEY | xxd -r -p - | openssl ec -inform der -pubin -pubout`
// 6 - enjoy
export const legacyLedgerPublicKeyHex = [
  `-----BEGIN PUBLIC KEY-----`,
  `MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEsGz12Pftcdi9m53DeUShxtJA9puwvjYh`,
  `3du2rA7M0VCLzC6kYifkO5QeLG8bHNCuaOVLGF4sq+80VVgGBL1FuA==`,
  `-----END PUBLIC KEY-----`,
].join('\n')
