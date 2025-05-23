import { electionABI } from '@celo/abis'
import {
  Address,
  Client,
  getContract,
  GetContractReturnType,
  PublicClient,
  WalletClient,
} from 'viem'
import { resolveAddress } from './registry'

export type ElectionContract<T extends Client = PublicClient> = GetContractReturnType<
  typeof electionABI,
  T
>

export async function getElectionContract<T extends Client = PublicClient>(
  client: T
): Promise<ElectionContract<T>> {
  return getContract({
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
    client,
  })
}

// METHODS

async function getGroups(client: PublicClient, account: Address) {
  return client.readContract({
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
    functionName: 'getGroupsVotedForByAccount',
    args: [account],
  })
}

export async function hasPendingVotes(client: PublicClient, account: Address): Promise<Address[]> {
  const contract = {
    address: await resolveAddress(client, 'Election'),
    abi: electionABI,
  } as const

  const groups = await getGroups(client, account)
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

export async function getActivatableGroups(
  clients: { public: PublicClient; wallet: WalletClient },
  groups: Address[],
  account: Address = clients.wallet.account!.address
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

export async function getActivatePendingVotesRequests(
  clients: { public: PublicClient; wallet: WalletClient },
  groups: Address[],
  account: Address = clients.wallet.account!.address
) {
  const contract = {
    address: await resolveAddress(clients.public, 'Election'),
    abi: electionABI,
  } as const

  const onBehalfOfAccount = clients.wallet.account!.address !== account
  const activatableGroups = await getActivatableGroups(clients, groups, account)

  return Promise.all(
    activatableGroups.map((group) =>
      clients.public.simulateContract({
        ...contract,
        chain: clients.wallet.chain,
        account: clients.wallet.account!,
        functionName: onBehalfOfAccount ? 'activateForAccount' : 'activate',
        args: onBehalfOfAccount ? [group, account] : [group],
      } as const)
    )
  )
}

export async function activatePendingVotes(
  clients: { public: PublicClient; wallet: WalletClient },
  groups: Address[],
  account: Address = clients.wallet.account!.address
) {
  const requests = await getActivatePendingVotesRequests(clients, groups, account)
  const txHashes = await Promise.all(
    // @ts-expect-error - TODO why this is incorrect?
    requests.map((request) => clients.wallet.writeContract(request))
  )
  return txHashes
}
