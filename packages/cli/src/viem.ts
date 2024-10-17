import { Command } from '@oclif/core'
import { createPublicClient, extractChain, http, HttpTransport, PublicClient } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { getNodeUrl } from './utils/config'

export abstract class ViemCommand extends Command {
  protected requireSynced = true

  private publicClient?: PublicClient<HttpTransport, typeof celo>

  protected async getPublicClient(): Promise<PublicClient<HttpTransport, typeof celo>> {
    if (!this.publicClient) {
      const nodeUrl = await this.getNodeUrl()
      const transport = http(nodeUrl)
      // Create an intermediate client to get the chain id
      const intermediateClient = createPublicClient({
        transport,
      })
      const extractedChain = extractChain({
        chains: [celo, celoAlfajores],
        id: (await intermediateClient.getChainId()) as 42220 | 44787,
      })

      this.publicClient = createPublicClient({
        transport,
        chain: extractedChain ?? celo,
      }) as PublicClient<HttpTransport, typeof celo>
    }

    return this.publicClient
  }

  protected async checkIfSynced(): Promise<boolean> {
    return true
  }

  protected async getNodeUrl(): Promise<string> {
    const res = await this.parse()

    return (res.flags && res.flags.node) || getNodeUrl(this.config.configDir)
  }
}
