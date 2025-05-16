import { Client, erc20Abi, getContract, GetContractReturnType, PublicClient } from 'viem'

export async function getERC20Contract<T extends Client = PublicClient>(
  client: T,
  address: `0x${string}`
): Promise<ERC20<T>> {
  return getContract({
    address,
    abi: erc20Abi,
    client,
  })
}
export type ERC20<T extends Client = PublicClient> = GetContractReturnType<typeof erc20Abi, T>
