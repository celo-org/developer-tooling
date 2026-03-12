# Issues

## 2026-02-27 Pre-execution Note
- The strongly-typed-contracts plan was executed BEFORE this plan
- ViemContract<TAbi> is now deeply integrated — replacing it with GetContractReturnType
  will cascade through typed overloads in BaseWrapper, createViemTxObjectInternal, etc.
- Tasks 3, 8, 12 need extra care due to these dependencies
