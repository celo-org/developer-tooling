---
'@celo/utils': major
---

CHANGE - Replaced all deprecated cryptographic depencies with the audited and maintained suite of crypto libraries `@noble/*` and `@scure/*`
BREAKING - Some functions that used to return a `Buffer` now return a `UInt8Array` instead due to underlying changed
