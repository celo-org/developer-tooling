import { Command } from '@oclif/core'
import { createPublicClient, http, HttpTransport, PublicClient } from 'viem'
import { celo } from 'viem/chains'

export abstract class ViemCommand extends Command {
  private publicClient?: PublicClient<HttpTransport, typeof celo>

  protected async getPublicClient(): Promise<PublicClient<HttpTransport, typeof celo>> {
    if (!this.publicClient) {
      // Create an intermediate client to get the chain id
      this.publicClient = createPublicClient({
        transport: http(),
        chain: celo,
      }) as PublicClient<HttpTransport, typeof celo>
    }

    return this.publicClient
  }
}
