import { Command } from '@oclif/core'
import { createPublicClient, http } from 'viem'
import { celo } from 'viem/chains'

export abstract class ViemCommand extends Command {
  // @ts-ignore debug
  private publicClient

  protected async getPublicClient() {
    if (!this.publicClient) {
      this.publicClient = createPublicClient({
        transport: http(),
        chain: celo,
      })
    }

    return this.publicClient
  }
}
