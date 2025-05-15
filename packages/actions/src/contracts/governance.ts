import { governanceABI } from '@celo/abis'
import { getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'
import { resolveAddress } from './registry'

export async function getGovernanceContract<T extends WalletClient | PublicClient = PublicClient>(
  client: T
): Promise<GovernanceContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Governance'),
    abi: governanceABI,
    client,
  })
}
export type GovernanceContract<T extends WalletClient | PublicClient = PublicClient> =
  GetContractReturnType<typeof governanceABI, T>
