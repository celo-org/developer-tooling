import { electionABI } from '@celo/abis'
import { Address, getContract, GetContractReturnType, isAddressEqual } from 'viem'
import { Clients } from '../client'
import { encodeWriteContractCall } from '../utils/encodeWriteContractCall'
import { resolveAddress } from './registry'

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

export async function getAllPendingVotesParameters(
  clients: Required<Clients>,
  groups: Address[],
  account: Address = clients.wallet.account.address
) {
  const contract = {
    address: await resolveAddress(clients.public, 'Election'),
    abi: electionABI,
  } as const
  const onBehalfOfAccount = !isAddressEqual(clients.wallet.account.address, account)

  // NOTE: we get all groups, because we're not filtering by activatable
  // The usage would be to pre-sign waiting for an epoch to pass
  const contractCallParameters = groups.map((group) =>
    onBehalfOfAccount
      ? encodeWriteContractCall(clients.wallet, {
          ...contract,
          account,
          functionName: 'activateForAccount',
          args: [group, account],
        })
      : encodeWriteContractCall(clients.wallet, {
          ...contract,
          account,
          functionName: 'activate',
          args: [group],
        })
  )

  return contractCallParameters
}

export async function activatePendingVotes(
  clients: Required<Clients>,
  groups: Address[],
  account: Address = clients.wallet.account.address
) {
  const contract = await getElectionContract(clients)
  const activatableGroups = await getActivatableGroups(clients, groups, account)
  const onBehalfOfAccount = !isAddressEqual(clients.wallet.account.address, account)

  const requests = await Promise.all(
    activatableGroups.map((group) =>
      onBehalfOfAccount
        ? contract.simulate.activateForAccount([group, account], {
            account,
          })
        : contract.simulate.activate([group], {
            account,
          })
    )
  )
  const txHashes = await Promise.all(
    // @ts-expect-error - typing is correct but differs between
    // `activateForAccount` and `activate`
    requests.map((request) => clients.wallet.writeContract(request))
  )
  return txHashes
}
