---
'@celo/celocli': patch
---

when account:new is called it displays the full bip44 derivation path in the output. Before it would miss the last 2 positions.
