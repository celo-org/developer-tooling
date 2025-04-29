[**@celo/metadata-claims v1.0.3**](../../README.md)

***

[@celo/metadata-claims](../../README.md) / [claim](../README.md) / ClaimPayload

# Type Alias: ClaimPayload\<K\>

> **ClaimPayload**\<`K`\> = `K` *extends* *typeof* [`DOMAIN`](../../types/enumerations/ClaimTypes.md#domain) ? [`DomainClaim`](DomainClaim.md) : `K` *extends* *typeof* [`ATTESTATION_SERVICE_URL`](../../types/enumerations/ClaimTypes.md#attestation_service_url) ? `AttestationServiceUrlClaim` : `K` *extends* *typeof* [`RPC_URL`](../../types/enumerations/ClaimTypes.md#rpc_url) ? [`RpcUrlClaim`](RpcUrlClaim.md) : `K` *extends* *typeof* [`NAME`](../../types/enumerations/ClaimTypes.md#name) ? [`NameClaim`](NameClaim.md) : `K` *extends* *typeof* [`KEYBASE`](../../types/enumerations/ClaimTypes.md#keybase) ? [`KeybaseClaim`](KeybaseClaim.md) : `K` *extends* *typeof* [`ACCOUNT`](../../types/enumerations/ClaimTypes.md#account) ? [`AccountClaim`](../../account/type-aliases/AccountClaim.md) : [`StorageClaim`](StorageClaim.md)

Defined in: [packages/sdk/metadata-claims/src/claim.ts:84](https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/metadata-claims/src/claim.ts#L84)

## Type Parameters

### K

`K` *extends* [`ClaimTypes`](../../types/enumerations/ClaimTypes.md)
