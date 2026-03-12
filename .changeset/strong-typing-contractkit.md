---
'@celo/contractkit': minor
---

**Improved type safety**: Added explicit type annotations to all wrapper methods that previously emitted `CeloTransactionObject<any>` or `Promise<any>` in their declaration files. All `proxySend` and `proxyCall` usages now have explicit return types, eliminating approximately 110 instances of `any` in the public API surface. This provides better IDE autocompletion and compile-time type checking for consumers of `@celo/contractkit`.
