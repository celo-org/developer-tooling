import { multiSigABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType } from 'viem'
import { Clients } from '../client.js'

export async function getMultiSigContract<T extends Clients = Clients>(
  clients: T,
  address: Address
): Promise<MultiSigContract<T>> {
  return getContract({
    address,
    abi: multiSigABI,
    client: clients,
  })
}
export type MultiSigContract<T extends Clients = Clients> = GetContractReturnType<
  typeof multiSigABI,
  T
>
