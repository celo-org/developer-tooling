# metadata-claims

Utility functions for making [CIP-003](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0003.md) claims. 

Used by @celo/celocli and [SocialConnect](https://github.com/celo-org/social-connect)


**All claims are public**

## Example

```typescript

import { ClaimTypes, IdentityMetadataWrapper, createNameClaim, createAccountClaim } from '@celo/metadata-claims'
import {accountsABI} from "@celo/abis"

const address = '<ADDRESS_OF_ACCOUNT_SIGNING>'
const metadata = IdentityMetadataWrapper.fromEmpty(address)
const filePath = `~/tmp/metadata${address}`

//  set a nickname for account (not unique)
await metadata.addClaim(createNameClaim("A nice name for this account"), signer)

// or claim ownership on another account
await metadata.addClaim(createAccountClaim(CLAIMED_ADDRESS, CLAIMED_PUBLIC_KEY), signer)

// see ClaimTypes for more possibilities (not all are used)

// writes to a file
await writeFile(filePath, metadata.toString())

// Then upload the file to a publically accessible url 
const metadataURL = /* Your solution for publishing file eg. github, ftp, etc */

// and publish the url on chain to the accounts contract. example using writeContract from viem https://viem.sh/docs/contract/writeContract.html
await writeContract({
  address: "0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9" // from https://docs.celo.org/cel2/contract-addresses#celo-core-contracts
  abi: accountsABI
  functionName: "setMetadataURL"
  args: [metadataURL]
})


```

 


