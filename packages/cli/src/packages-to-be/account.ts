import { accountsABI } from '@celo/abis-12'
import { StrongAddress } from '@celo/base'
import { PublicClient } from 'viem'
import { resolveAddress } from './address-resolver'

export const signerToAccount = async (
  client: PublicClient,
  signer: StrongAddress
): Promise<StrongAddress> => {
  return await client.readContract({
    address: await resolveAddress(client, 'Accounts'),
    abi: accountsABI,
    functionName: 'signerToAccount',
    args: [signer],
  })
}
