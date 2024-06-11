---
'@celo/connect': patch
---

signTypedData now defaults to eth_signTypedDataV4 pass null for the previous behavior. this is due to v4 being the recommended way to use signTypedData and the only version supported by anvil.
