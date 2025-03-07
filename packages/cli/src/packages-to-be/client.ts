import { PROXY_ADMIN_ADDRESS } from '@celo/connect'
import { Address, createPublicClient, Hex, http, PublicClient, Transport } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'

export type CeloClient = PublicClient<Transport, typeof celo | typeof celoAlfajores>

// TODO handle different endpoints
export const createCeloClient = (rpcUrl?: string | undefined): CeloClient => {
  return createPublicClient({
    transport: http(rpcUrl),
    chain: celo,
  })
}

type RequestGetCodeParams = {
  Method: 'eth_getCode'
  Parameters: [Address, 'latest']
  ReturnType: Hex
}

/*
 * This checks if we're in L2 context, it's a port of the technique used in
 * https://github.com/celo-org/celo-monorepo/blob/da9b4955c1fdc8631980dc4adf9b05e0524fc228/packages/protocol/contracts-0.8/common/IsL2Check.sol#L17
 */
export const isCel2 = async (client: CeloClient): Promise<boolean> => {
  const code = await client.request<RequestGetCodeParams>({
    method: 'eth_getCode',
    params: [PROXY_ADMIN_ADDRESS, 'latest'],
  })

  if (typeof code === 'string') {
    return code !== '0x' && code.length > 2
  }

  return false
}
