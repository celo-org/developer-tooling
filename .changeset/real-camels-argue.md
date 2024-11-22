---
'@celo/contractkit': patch
---

Mark contract wrapper methods that will not work on L2 because solidity contracts have onlyL1 modifier as deprecated.

| Deprecated Contract / Method | Replacement or none |
|--------|--------|
| Validators#registerValidator | Validators#registerValidatorNoBLS |
| BlockchainParams#getEpochNumberOfBlock | EpochManager#getEpochNumberOfBlock |
| BlockchainParams#getFirstBlockNumberForEpoch | EpochManager#getFirstBlockAtEpoch|
| Election#getCurrentValidatorSigners |  EpochManager#getElectedSigners |
| Election#getGroupEpochRewards | Election#getGroupEpochRewardsBasedOnScore | 
| GovernanceSlasher#slash |  GovernanceSlasher#slashL2 | 
| DoubleSigningSlasher  | X | 
| DowntimeSlasher  | X |

