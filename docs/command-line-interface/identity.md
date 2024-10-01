`celocli identity`
==================

Interact with ODIS and the attestations service

* [`celocli identity:withdraw-attestation-rewards`](#celocli-identitywithdraw-attestation-rewards)

## `celocli identity:withdraw-attestation-rewards`

Withdraw accumulated attestation rewards for a given currency

```
USAGE
  $ celocli identity:withdraw-attestation-rewards --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--globalHelp]
    [--tokenAddress 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address to withdraw from. Can be the attestation signer address or the
      underlying account address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --tokenAddress=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      The address of the token that will be withdrawn. Defaults to cUSD

DESCRIPTION
  Withdraw accumulated attestation rewards for a given currency
```

_See code: [src/commands/identity/withdraw-attestation-rewards.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/identity/withdraw-attestation-rewards.ts)_
