---
'@celo/utils': major
---

Remove export compareBN

This would have been used to sort BN.js numbers. Generic comparator functions are not really the scope of this library. Removing it allows the bn.js dependency to be removed too.  If you were using this function it can be re-implemented as

```typescript
export function compareBN(a: BN, b: BN) {
  if (a.eq(b)) {
    return 0
  } else if (a.lt(b)) {
    return -1
  } else {
    return 1
  }
}
```
