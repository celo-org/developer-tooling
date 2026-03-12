import { Connection, Provider, ReadOnlyWallet } from '@celo/connect'
import { LocalWallet } from '@celo/wallet-local'
import { BigNumber } from 'bignumber.js'
import { AddressRegistry } from './address-registry'
import { CeloTokens, EachCeloToken } from './celo-tokens'
import { MiniContractCache } from './mini-contract-cache'
import { getProviderForKit, HttpProviderOptions, setupAPIKey } from './setupForKits'

/**
 * Creates a new instance of `MiniContractKit` given a nodeUrl
 * @param url CeloBlockchain node url
 * @param wallet to reuse or add a wallet different than the default (example ledger-wallet)
 * @param options to pass to the HttpProvider constructor
 */
export function newKit(url: string, wallet?: ReadOnlyWallet, options?: HttpProviderOptions) {
  const provider = getProviderForKit(url, options)
  return newKitFromProvider(provider, wallet)
}

/**
 * Creates a new instance of `MiniContractKit` given a nodeUrl and apiKey
 * @param url CeloBlockchain node url
 * @param apiKey to include in the http request header
 * @param wallet to reuse or add a wallet different than the default (example ledger-wallet)
 */
export function newKitWithApiKey(url: string, apiKey: string, wallet?: ReadOnlyWallet) {
  const options: HttpProviderOptions = setupAPIKey(apiKey)
  return newKit(url, wallet, options)
}

/**
 * Creates a new instance of the `MiniContractKit` from a Provider
 * @param provider – a JSON-RPC {@link Provider}
 * @param wallet – optional wallet for signing
 */
export function newKitFromProvider(provider: Provider, wallet: ReadOnlyWallet = new LocalWallet()) {
  return new MiniContractKit(new Connection(provider, wallet))
}

/**
 * MiniContractKit provides a core subset of {@link ContractKit}'s functionality
 *
 * @remarks
 *
 * It is recommended to use this over ContractKit for dApps as it is lighter
 *
 * @param connection – an instance of @celo/connect {@link Connection}
 */
export class MiniContractKit {
  /** core contract's address registry */
  readonly registry: AddressRegistry
  /** factory for subset of core contract's kit wrappers  */
  readonly contracts: MiniContractCache
  /** helper for interacting with CELO & stable tokens */
  readonly celoTokens: CeloTokens

  constructor(readonly connection: Connection) {
    this.registry = new AddressRegistry(connection)
    this.contracts = new MiniContractCache(connection, this.registry)
    this.celoTokens = new CeloTokens(this.contracts, this.registry)
  }

  getWallet() {
    return this.connection.wallet
  }

  // Like get Total Balance on MiniContractKit but does not include locked celo or pending
  async getTotalBalance(address: string): Promise<EachCeloToken<BigNumber>> {
    return {
      ...(await this.celoTokens.balancesOf(address)),
    }
  }
}

// For easy switching from full contractKit to Mini
export const ContractKit = MiniContractKit
