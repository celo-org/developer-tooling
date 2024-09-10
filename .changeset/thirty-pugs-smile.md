---
'@celo/metadata-claims': major
---

Introducing @celo/metadata-claims These are a series of functions extracted from @celo/contractkit since they didnt strictly need depend on contractkit itsefl. Developers can now use IdentityMetadataWrapper with any js rpc library like ethers or viem or web3js without being forced to import ContractKit.


Instead when using `IdentityMetadataWrapper` you should make an object that satisfis the `AccountMetadataSignerGetters` type  

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