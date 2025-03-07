import { accountsABI } from '@celo/abis-12'
import { StrongAddress } from '@celo/base'
import { resolveAddress } from './address-resolver'
import { CeloClient } from './client'

export const signerToAccount = async (
  client: CeloClient,
  signer: StrongAddress
): Promise<StrongAddress> => {
  return await client.readContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    functionName: 'signerToAccount',
    args: [signer],
  })
}
