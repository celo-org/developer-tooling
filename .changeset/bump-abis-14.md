---
'@celo/contractkit': patch
'@celo/governance': patch
'@celo/actions': patch
'@celo/dev-utils': patch
'@celo/celocli': patch
---

Bump `@celo/abis` from `13.0.0-post-audit.0` to `14.0.1` across all consuming
packages. (14.0.1 is the latest release that still ships the StableToken ABIs
the kit registers; 15/16 were unpublished and 17.x removed StableToken*, which
would require a separate migration.)
