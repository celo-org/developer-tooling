import { createPublicClient, http, PublicClient, Transport } from 'viem'
import { celo } from 'viem/chains'

export type CeloClient = PublicClient<Transport, typeof celo>

let client: CeloClient | null = null

// could be exported if we needed a new not cached instance
const createClient = () => {
  return createPublicClient({
    transport: http(),
    chain: celo,
  })
}

// this will by default cache the client
export const getClient = (): CeloClient => {
  if (!client) {
    client = createClient()
  }

  return client
}
