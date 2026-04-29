import { type PublicCeloClient } from '@celo/actions'
import { createPublicClient, extractChain, type Transport } from 'viem'
import { celo, celoSepolia } from 'viem/chains'

export default async function createCeloPublicClient({
  transport,
  nodeUrl,
}: {
  transport: Transport
  nodeUrl: string
}): Promise<PublicCeloClient> {
  const intermediateClient = createPublicClient({ transport })
  const chainId = await intermediateClient.getChainId()
  const extractedChain = extractChain({
    chains: [celo, celoSepolia],
    id: chainId as typeof celo.id | typeof celoSepolia.id,
  })

  if (extractedChain) {
    return createPublicClient({
      transport,
      batch: { multicall: true },
      chain: extractedChain,
    })
  }

  return createPublicClient({
    transport,
    chain: {
      name: 'Custom Celo Chain',
      id: chainId,
      nativeCurrency: celo.nativeCurrency,
      formatters: celo.formatters,
      serializers: celo.serializers,
      rpcUrls: {
        default: { http: [nodeUrl] },
      },
    } as unknown as PublicCeloClient['chain'],
  })
}
