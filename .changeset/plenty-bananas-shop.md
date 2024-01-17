---
'@celo/contractkit': patch
---

Re-removes `grandamento`

  While 6.0.0 (9ab9d00eb) previously removed `grandamento` it was added back temporarily because `@celo/celocli` required the wrappers to be available in order to execute the proposal to remove it from governance. It is now gone for good. RIP.

  Due to previous removal this is not considered a breaking change.