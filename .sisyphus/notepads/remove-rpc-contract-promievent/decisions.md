# Decisions

## User Decisions (from planning phase)
- Keep CeloTransactionObject public API (.send(), .sendAndWaitForReceipt())
- Replace ViemContract with GetContractReturnType + pass PublicClient separately
- Rewrite 3 deploy callers to viem deployContract()
- Major semver bump for @celo/connect
- ZERO shims / compatibility layers allowed
