import { accountsABI } from '@celo/abis-12'
import { StrongAddress } from '@celo/base'
import { resolveAddress } from './address-resolver'
import { getClient } from './client'

export const signerToAccount = async (signer: StrongAddress): Promise<StrongAddress> => {
  const client = getClient()

  return await client.readContract({
    address: await resolveAddress('Accounts'),
    abi: accountsABI,
    functionName: 'signerToAccount',
    args: [signer],
  })
}
