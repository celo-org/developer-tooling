import { CeloClient } from '@celo/actions'
import BigNumber from 'bignumber.js'
import { formatEther } from 'viem'

export function bigintToBigNumber(value: bigint) {
  return new BigNumber(value.toString())
}

export function bigNumberToBigInt(value: BigNumber) {
  return BigInt(value.toFixed())
}

/* 
  takes a big int that represents a 24 decimal fixed point number and formats it to a string with 2 decimal places.
*/
export function formatFixidity(value: bigint): string {
  return (Number(formatEther(value)) / 1_000_000.0).toPrecision(2)
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
