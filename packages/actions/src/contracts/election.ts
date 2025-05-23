import { electionABI } from '@celo/abis'
import { Address, Client, getContract, GetContractReturnType } from 'viem'
import { PublicCeloClient, WalletCeloClient } from '../client'
import { resolveAddress } from './registry'

export type ElectionContract<T extends Client = PublicCeloClient> = GetContractReturnType<
  typeof electionABI,
  T
>

export async function getElectionContract<T extends Client = PublicCeloClient>(
  client: T
): Promise<ElectionContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
    client,
  })
}

// METHODS

export async function getGroupsWithPendingVotes(
  client: PublicCeloClient,
  account: Address
): Promise<Address[]> {
  const contract = {
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
  } as const

  const groups = await client.readContract({
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
    functionName: 'getGroupsVotedForByAccount',
    args: [account],
  })

  const pendingVotes = await client.multicall({
    allowFailure: false,
    contracts: groups.map(
      (group) =>
        ({
          ...contract,
          functionName: 'getPendingVotesForGroupByAccount',
          args: [group, account],
        } as const)
    ),
  })
  const groupsWithPendingVotes = groups.filter((_, i) => pendingVotes[i] >= 0)
  return groupsWithPendingVotes
}

async function getActivatableGroups(
  clients: { public: PublicCeloClient },
  groups: Address[],
  account: Address
): Promise<Address[]> {
  const contract = {
    address: await resolveAddress(clients.public, 'Election'),
    abi: electionABI,
  } as const

  const groupsToHasActivatablePendingVotes = await clients.public.multicall({
    allowFailure: false,
    contracts: groups.map(
      (group) =>
        ({
          ...contract,
          functionName: 'hasActivatablePendingVotes',
          args: [account, group],
        } as const)
    ),
  })
  const activatableGroups = groups.filter((_, i) => groupsToHasActivatablePendingVotes[i])
  return activatableGroups
}

export async function getActivatablePendingVotes(
  clients: { public: PublicCeloClient; wallet: WalletCeloClient },
  groups: Address[],
  account: Address = clients.wallet.account!.address
) {
  const contract = await getElectionContract(clients.wallet)
  const onBehalfOfAccount = clients.wallet.account!.address !== account
  const activatableGroups = await getActivatableGroups(clients, groups, account)

  return Promise.all(
    activatableGroups.map((group) =>
      onBehalfOfAccount
        ? contract.simulate.activateForAccount([group, account])
        : contract.simulate.activate([group])
    )
  )
}

export async function activatePendingVotes(
  clients: { public: PublicCeloClient; wallet: WalletCeloClient },
  groups: Address[],
  account: Address = clients.wallet.account!.address
) {
  const requests = await getActivatablePendingVotes(clients, groups, account)
  const txHashes = await Promise.all(
    // @ts-expect-error - TODO why this is incorrect?
    requests.map((request) => clients.wallet.writeContract(request))
  )
  return txHashes
}
