import { StrongAddress } from '@celo/base'
import { PROXY_ADMIN_ADDRESS } from '@celo/connect'
import { FeeCurrencyInformation } from '@celo/contractkit/lib/wrappers/AbstractFeeCurrencyWrapper'
import { createPublicClient, http, HttpTransport, PublicClient } from 'viem'
import { celo } from 'viem/chains'
import { CeloCommand } from './celo'
import { ContractAddressResolver, ViemAddressResolver } from './packages-to-be/address-resolver'
import { FeeCurrencyProvider, ViemFeeCurrencyProvider } from './packages-to-be/fee-currency'

export abstract class ViemCommand extends CeloCommand {
  private publicClient?: PublicClient<HttpTransport, typeof celo>
  private addressResolver?: ContractAddressResolver
  private feeCurrencyProvider?: FeeCurrencyProvider

  async init() {
    super.init()

    const res = await this.parse()

    if (res.flags.useLedger) {
      // use viem-account-ledger
    } else {
      // use WalletClient?
    }

    if (res.flags.from) {
      // TODO set default account?
    }
  }

  protected async getPublicClient(): Promise<PublicClient<HttpTransport, typeof celo>> {
    if (!this.publicClient) {
      this.publicClient = createPublicClient({
        transport: http(await this.getNodeUrl()),
        chain: celo,
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

  // TODO add L2Resolver
  protected async checkIfL2(): Promise<boolean> {
    const client = await this.getPublicClient()

    return (
      (await client.getCode({
        address: PROXY_ADMIN_ADDRESS,
      })) !== '0x'
    )
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

  protected async checkIfSynced() {
    // TODO implement
    return true
  }
}
