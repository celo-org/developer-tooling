import { erc20Abi, getContract, type Address, type GetContractReturnType } from 'viem'
import { Clients } from '../client'

export async function getERC20Contract<T extends Clients = Clients>(
  clients: T,
  address: Address
): Promise<ERC20<T>> {
  return getContract({
    address,
    abi: erc20Abi,
    client: clients,
  })
}
export type ERC20<T extends Clients = Clients> = GetContractReturnType<typeof erc20Abi, T>
