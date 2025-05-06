import { StrongAddress } from '@celo/base'
import BigNumber from 'bignumber.js'
import { CeloClient } from './client'

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

export async function getGasPriceOnCelo(client: CeloClient, feeCurrency?: StrongAddress) {
  const gasPrice = await client.request<{
    Parameters: [StrongAddress] | []
    Method: 'eth_gasPrice'
    ReturnType: StrongAddress
  }>({
    method: 'eth_gasPrice',
    params: feeCurrency ? [feeCurrency] : [],
  })

  return BigInt(gasPrice)
}
