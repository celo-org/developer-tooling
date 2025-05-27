import { electionABI } from '@celo/abis'
import { Clients, resolveAddress } from '@celo/actions'
import { Address, isAddressEqual } from 'viem'
import { encodeWriteContractCall } from './actions/encodeWriteContractCall'

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
