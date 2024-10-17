import { PROXY_ADMIN_ADDRESS } from '@celo/connect'
import { PublicClient, Transport } from 'viem'
import { celo } from 'viem/chains'

export interface L2Resolver {
  resolve(): Promise<boolean>
}

abstract class AbstractL2Resolver implements L2Resolver {
  protected abstract getCode(): Promise<string | null>

  async resolve(): Promise<boolean> {
    const code = await this.getCode()

    return code !== null
  }
}

export class ViemL2Resolver extends AbstractL2Resolver {
  constructor(private readonly publicClient: PublicClient<Transport, typeof celo>) {
    super()
  }

  protected async getCode(): Promise<string | null> {
    const code = await this.publicClient.getCode({
      address: PROXY_ADMIN_ADDRESS,
    })

    if (code && code !== '0x') {
      return code
    }

    return null
  }
}
