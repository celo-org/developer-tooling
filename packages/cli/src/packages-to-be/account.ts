import { accountsABI, lockedGoldABI } from '@celo/abis-12'
import { StrongAddress } from '@celo/base'
import { erc20Abi, PublicClient } from 'viem'
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

export const getTotalBalance = async (
  client: PublicClient,
  address: StrongAddress
): Promise<{
  lockedCELO: bigint
  pending: bigint
  CELO: bigint
  cUSD: bigint
  cEUR: bigint
  cREAL: bigint
}> => {
  const [lockedCeloAddress, celoTokenAddress, cUSDAddress, cEURAddress, cREALAddress] =
    await Promise.all(
      (['LockedGold', 'GoldToken', 'StableToken', 'StableTokenEUR', 'StableTokenBRL'] as const).map(
        (contractName) => resolveAddress(client, contractName)
      )
    )

  const [lockedCELO, pending, CELO, cUSD, cEUR, cREAL] = await Promise.all([
    client.readContract({
      address: lockedCeloAddress,
      abi: lockedGoldABI,
      functionName: 'getAccountTotalLockedGold',
      args: [address],
    }),
    client.readContract({
      address: lockedCeloAddress,
      abi: lockedGoldABI,
      functionName: 'getTotalPendingWithdrawals',
      args: [address],
    }),
    client.readContract({
      address: celoTokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
    client.readContract({
      address: cUSDAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
    client.readContract({
      address: cEURAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
    client.readContract({
      address: cREALAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
  ] as const)

  return {
    lockedCELO,
    pending,
    CELO,
    cUSD,
    cEUR,
    cREAL,
  }
}
