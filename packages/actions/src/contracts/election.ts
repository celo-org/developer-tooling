import { electionABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType, Hex, isAddressEqual } from 'viem'
import { Clients } from '../client.js'
import { resolveAddress } from './registry.js'

export type ElectionContract<T extends Clients = Clients> = GetContractReturnType<
  typeof electionABI,
  T
>

export async function getElectionContract<T extends Clients = Clients>(
  clients: T
): Promise<ElectionContract<T>> {
  return getContract({
    address: await resolveAddress(clients.public, 'Election'),
    abi: electionABI,
    client: clients,
  })
}

// METHODS

export async function getGroupsWithPendingVotes(
  { public: client }: Clients,
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
  clients: Clients,
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

export async function activatePendingVotes(
  clients: Required<Clients>,
  groups: Address[],
  account: Address = clients.wallet.account.address
) {
  const contract = await getElectionContract(clients)
  const activatableGroups = await getActivatableGroups(clients, groups, account)
  const onBehalfOfAccount = !isAddressEqual(clients.wallet.account.address, account)

  // NOTE: this code is repetitive to make sure `writeContract` has the correct
  // typed args
  const txHashes: Hex[] = []

  for (const group of activatableGroups) {
    if (onBehalfOfAccount) {
      const { request } = await contract.simulate.activateForAccount([group, account], {
        account: clients.wallet.account.address,
      })
      txHashes.push(
        await clients.wallet.writeContract({
          ...request,
          account: clients.wallet.account,
        })
      )
    } else {
      const { request } = await contract.simulate.activate([group], {
        account: clients.wallet.account.address,
      })
      txHashes.push(
        await clients.wallet.writeContract({
          ...request,
          account: clients.wallet.account,
        })
      )
    }
  }

  return txHashes
}
