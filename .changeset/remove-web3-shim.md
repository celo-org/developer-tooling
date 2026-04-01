---
'@celo/connect': major
'@celo/contractkit': major
'@celo/celocli': major
'@celo/explorer': patch
'@celo/governance': patch
'@celo/dev-utils': patch
---

Remove Web3 shim from Connection and migrate contractkit to use viem ABIs with Connection.createContract(). Add backward-compatible kit.web3 shim (deprecated). Add newKitFromProvider() factory function.
