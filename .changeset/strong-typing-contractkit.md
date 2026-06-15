---
'@celo/contractkit': minor
---

**Improved type safety**: Added explicit return types to wrapper methods that previously emitted `CeloTransactionObject<any>` or `Promise<any>` in their declaration files, replacing untyped `any` results with concrete types. This provides better IDE autocompletion and compile-time type checking for consumers of `@celo/contractkit`.
