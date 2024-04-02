---
'@celo/utils': major
---

CHANGE - Replaced and/or removed all deprecated or unmaintained packages with the audited and maintained suite of crypto libraries `@noble/*` and `@scure/*`
BREAKING - Some functions that used to return a `Buffer` now return a `UInt8Array` instead due to underlying changed
