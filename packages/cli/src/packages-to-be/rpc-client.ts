import { CeloClient } from '@celo/actions'
import { ensureLeading0x, StrongAddress } from '@celo/base'
import {
  Address,
  Chain,
  createWalletClient,
  Transport,
  WalletClient,
  WalletClientConfig,
} from 'viem'

/**
 *
 * @throws {import('viem').MethodNotFoundRpcError} if the RPC node isn't unlocked
 */
export default async function createRpcWalletClient<T extends Chain | undefined = undefined>({
  publicClient,
  account,
  ...walletClientOptions
}: {
  publicClient: CeloClient
  account?: Address
} & Omit<WalletClientConfig<Transport, T>, 'account'>): Promise<
  WalletClient<Transport, T, { type: 'json-rpc'; address: Address }>
> {
  const accounts = await publicClient.request<{
    Parameters: []
    Method: 'eth_requestAccounts'
    ReturnType: Address[]
  }>({
    method: 'eth_requestAccounts',
    params: [],
  })

  let defaultAccount: StrongAddress | undefined
  if (account) {
    defaultAccount = accounts.find(
      (x) => x.toLowerCase() === ensureLeading0x(account).toLowerCase()
    )!
  }
  if (!defaultAccount) {
    defaultAccount = accounts[0]
  }

  return createWalletClient({
    ...walletClientOptions,
    account: defaultAccount,
  })
}
