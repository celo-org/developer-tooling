[**@celo/connect v8.0.0**](../README.md)

***

[@celo/connect](../globals.md) / CeloContract

# Type Alias: CeloContract\<TAbi\>

> **CeloContract**\<`TAbi`\> = `GetContractReturnType`\<`TAbi`, \{ `public`: `PublicClient`; `wallet`: `WalletClient`; \}\>

Defined in: [packages/sdk/connect/src/contract-types.ts:16](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/connect/src/contract-types.ts#L16)

Viem-native contract type for Celo contracts.
Replaces the custom ViemContract interface with viem's native GetContractReturnType.
Provides type-safe `.read`, `.write`, `.simulate`, `.estimateGas` namespaces
when a const-typed ABI is provided.

## Type Parameters

### TAbi

`TAbi` *extends* readonly `unknown`[] = readonly `unknown`[]
