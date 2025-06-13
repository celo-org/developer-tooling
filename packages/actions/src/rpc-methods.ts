import type { Address, Hex } from 'viem'
import { CeloClient } from './client.js'

export async function getGasPriceOnCelo(client: CeloClient, feeCurrency?: Address) {
  const gasPrice = await client.request<{
    Parameters: [Address] | []
    Method: 'eth_gasPrice'
    ReturnType: Hex
  }>({
    method: 'eth_gasPrice',
    params: feeCurrency ? [feeCurrency] : [],
  })

  return BigInt(gasPrice)
}
