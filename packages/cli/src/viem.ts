import { StrongAddress } from '@celo/base'
import { Command } from '@oclif/core'
import { CLIError } from '@oclif/core/lib/errors'
import chalk from 'chalk'
import { createPublicClient, extractChain, http } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { BaseCommand } from './base'
import { ContractAddressResolver, ViemAddressResolver } from './packages-to-be/address-resolver'
import {
  FeeCurrencyInformation,
  FeeCurrencyProvider,
  ViemFeeCurrencyProvider,
} from './packages-to-be/fee-currency'
import { L2Resolver, ViemL2Resolver } from './packages-to-be/l2-resolver'
import { failWith } from './utils/cli'
import { getNodeUrl } from './utils/config'

export abstract class ViemCommand extends Command {
  static flags = BaseCommand.flags

  protected requireSynced = true

  // Indicates if celocli running in L2 context
  private cel2: boolean | null = null

  // @ts-ignore DEBUG: removed type
  private publicClient
  private addressResolver?: ContractAddressResolver
  private l2Resolver?: L2Resolver
  private feeCurrencyProvider?: FeeCurrencyProvider

  protected async getPublicClient() {
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
      })
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

  async init() {
    if (this.requireSynced) {
      if (!(await this.checkIfSynced())) {
        failWith('Node is not currently synced. Run node:synced to check its status.')
      }
    }

    const res = await this.parse()

    if (res.flags.globalHelp) {
      console.log(chalk.red.bold('GLOBAL OPTIONS'))
      Object.entries(ViemCommand.flags).forEach(([name, flag]) => {
        console.log(chalk.black(`  --${name}`).padEnd(40) + chalk.gray(`${flag.description}`))
      })
      process.exit(0)
    }
  }

  async finally(arg: Error | undefined): Promise<any> {
    if (arg) {
      if (!(arg instanceof CLIError)) {
        console.error(
          `
Received an error during command execution, if you believe this is a bug you can create an issue here:

https://github.com/celo-org/developer-tooling/issues/new?assignees=&labels=bug+report&projects=&template=BUG-FORM.yml

`,
          arg
        )
      }
    }

    return super.finally(arg)
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
