import { CeloClient } from '@celo/actions/setup'
import BigNumber from 'bignumber.js'

export function bigintToBigNumber(value: bigint) {
  return new BigNumber(value.toString())
}

export function bigNumberToBigInt(value: BigNumber) {
  return BigInt(value.toFixed())
}

export async function ethNodeIsSyncing(client: CeloClient) {
  return client.request<{
    Parameters: []
    Method: 'eth_syncing'
    ReturnType: false | { startingBlock: bigint; currentBlock: bigint; highestBlock: bigint }
  }>({
    method: 'eth_syncing',
    params: [],
  })
}
