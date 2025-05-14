import { erc20Abi, getContract, GetContractReturnType, PublicClient, WalletClient } from 'viem'

export async function getERC20Contract<T extends WalletClient | PublicClient = PublicClient>(
  client: T,
  address: `0x${string}`
): Promise<ERC20<T>> {
  return getContract({
    address,
    abi: erc20Abi,
    client,
  })
}
export type ERC20<T extends WalletClient | PublicClient = PublicClient> = GetContractReturnType<
  typeof erc20Abi,
  T
>
