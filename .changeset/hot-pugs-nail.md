---
'@celo/contractkit': major
---

Removes all exports under the lib/identity folder. These have been move to a new @celo/metadata-claims package and should be imported from there. 

Note that folder structure is also flattened slightly. so replace `@celo/contractkit/lib/identity/claims/` with `@celo/metadata-claims/lib/`

example

```diff
- import { createAccountClaim } from '@celo/contractkit/lib/identity/claims/account'
+ import { createAccountClaim } from '@celo/metadata-claims/lib/account'
```

```diff
- import { ContractKit, IdentityMetadataWrapper, newKitFromWeb3 } from '@celo/contractkit'
- import { ClaimTypes } from '@celo/contractkit/lib/identity'
+ import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
+ import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'

```

Note that Contractkit is Not a dependency. Instead when using `IdentityMetadataWrapper`  you should make an object that satisfis the `AccountMetadataSignerGetters` type  

```typescript
import { AccountMetadataSignerGetters } from '@celo/metadata-claims/lib/types';

```
using viem it would be like 

```typescript
const accountsMetaDataSignerGetters: AccountMetadataSignerGetters = {
      isAccount: async (address: string) => accounts.read.isAccount([address as Address]),
      getValidatorSigner: async (address: string) =>
        accounts.read.getValidatorSigner([address as Address]),
      getVoteSigner: async (address: string) =>
        accounts.read.getValidatorSigner([address as Address]),
      getAttestationSigner: async (address: string) =>
        accounts.read.getValidatorSigner([address as Address]),
    }
```
