import { StrongAddress } from '@celo/base'
import { Command } from '@oclif/core'
import { createPublicClient, extractChain, http, HttpTransport, PublicClient } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { ContractAddressResolver, ViemAddressResolver } from './packages-to-be/address-resolver'
import {
  FeeCurrencyInformation,
  FeeCurrencyProvider,
  ViemFeeCurrencyProvider,
} from './packages-to-be/fee-currency'
import { L2Resolver, ViemL2Resolver } from './packages-to-be/l2-resolver'
import { getNodeUrl } from './utils/config'

export abstract class ViemCommand extends Command {
  protected requireSynced = true

  // Indicates if celocli running in L2 context
  private cel2: boolean | null = null

  private publicClient?: PublicClient<HttpTransport, typeof celo>
  private addressResolver?: ContractAddressResolver
  private l2Resolver?: L2Resolver
  private feeCurrencyProvider?: FeeCurrencyProvider

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

  protected async getAddressResolver(): Promise<ContractAddressResolver> {
    if (!this.addressResolver) {
      this.addressResolver = new ViemAddressResolver(await this.getPublicClient())
    }

    return this.addressResolver
  }

  protected async getL2Resolver(): Promise<L2Resolver> {
    if (!this.l2Resolver) {
      this.l2Resolver = new ViemL2Resolver(await this.getPublicClient())
    }

    return this.l2Resolver
  }

  protected async checkIfSynced(): Promise<boolean> {
    return true
  }

  protected async checkIfL2(): Promise<boolean> {
    const l2Resolver = await this.getL2Resolver()

    return l2Resolver.resolve()
  }

  protected async getNodeUrl(): Promise<string> {
    const res = await this.parse()

    return (res.flags && res.flags.node) || getNodeUrl(this.config.configDir)
  }

  protected async isCel2(): Promise<boolean> {
    if (this.cel2 === null) {
      this.cel2 = await this.checkIfL2()
    }

    return !!this.cel2
  }

  protected async getFeeCurrencyProvider(): Promise<FeeCurrencyProvider> {
    if (!this.feeCurrencyProvider) {
      this.feeCurrencyProvider = new ViemFeeCurrencyProvider(
        await this.getPublicClient(),
        await this.getAddressResolver(),
        await this.isCel2()
      )
    }

    return this.feeCurrencyProvider
  }

  protected async getFeeCurrencyInformation(
    addresses: StrongAddress[]
  ): Promise<FeeCurrencyInformation[]> {
    const feeCurrencyProvider = await this.getFeeCurrencyProvider()

    return feeCurrencyProvider.getFeeCurrencyInformation(addresses)
  }

  protected async getSupportedFeeCurrencyAddresses(): Promise<StrongAddress[]> {
    const feeCurrencyProvider = await this.getFeeCurrencyProvider()

    return feeCurrencyProvider.getAddresses()
  }
}
