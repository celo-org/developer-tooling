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
  const lockedCeloAddress = await resolveAddress(client, 'LockedGold')

  return {
    lockedCELO: await client.readContract({
      address: lockedCeloAddress,
      abi: lockedGoldABI,
      functionName: 'getAccountTotalLockedGold',
      args: [address],
    }),
    pending: await client.readContract({
      address: lockedCeloAddress,
      abi: lockedGoldABI,
      functionName: 'getTotalPendingWithdrawals',
      args: [address],
    }),
    CELO: await client.readContract({
      address: await resolveAddress(client, 'GoldToken'),
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
    cUSD: await client.readContract({
      address: await resolveAddress(client, 'StableToken'),
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
    cEUR: await client.readContract({
      address: await resolveAddress(client, 'StableTokenEUR'),
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
    cREAL: await client.readContract({
      address: await resolveAddress(client, 'StableTokenBRL'),
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address],
    }),
  }
}
