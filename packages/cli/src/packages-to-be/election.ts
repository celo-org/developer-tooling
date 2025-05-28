import { electionABI } from '@celo/abis'
import { Clients } from '@celo/actions'
import { Address, encodeFunctionData, isAddressEqual, prepareEncodeFunctionData } from 'viem'

export async function getAllPendingVotesCallData(
  clients: Required<Clients>,
  groups: Address[],
  account: Address = clients.wallet.account.address
) {
  const onBehalfOfAccount = !isAddressEqual(clients.wallet.account.address, account)
  if (onBehalfOfAccount) {
    const prepared = prepareEncodeFunctionData({
      abi: electionABI,
      functionName: 'activateForAccount',
    })
    return groups.map((group) => {
      return encodeFunctionData({
        ...prepared,
        args: [group, account],
      })
    })
  } else {
    const prepared = prepareEncodeFunctionData({
      abi: electionABI,
      functionName: 'activate',
    })
    return groups.map((group) => {
      return encodeFunctionData({
        ...prepared,
        args: [group],
      })
    })
  }
}
