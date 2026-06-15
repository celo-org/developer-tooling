---
'@celo/connect': major
'@celo/contractkit': major
'@celo/celocli': major
'@celo/explorer': patch
'@celo/governance': patch
'@celo/dev-utils': patch
---

Remove the deprecated `kit.web3` shim and migrate contractkit to viem-native contract interaction. Use `kit.connection.viemClient` for reads and the wrapper methods for writes. Adds `newKitFromProvider()` as the recommended factory for building a kit from an EIP-1193 provider.
