---
'@celo/celocli': minor
---

Add new flags to `governance:approve` command for better multisig transaction control:

- `--submit`: Force submission of approval transaction to multisig without checking for prior confirmations onchain. Use with caution - this bypasses the check for existing submissions. Example: `celocli governance:approve --proposalID 99 --from 0x... --useMultiSig --submit`

- `--multisigTXId`: Specify exact multisig transaction ID to confirm, rather than searching onchain. Useful when you know the transaction ID from offchain sources. Example: `celocli governance:approve --proposalID 99 --from 0x... --useMultiSig --multisigTXId 5`

Both flags depend on `--proposalID` and `--useMultiSig` being provided.
