// tslint:disable: ordered-imports
import { StrongAddress } from '@celo/base'
import { CeloTx, CeloTxObject, Connection, ReadOnlyWallet, TransactionResult } from '@celo/connect'
import { EIP712TypedData } from '@celo/utils/lib/sign-typed-data-utils'
import { Signature } from '@celo/utils/lib/signatureUtils'
import { LocalWallet } from '@celo/wallet-local'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { AddressRegistry } from './address-registry'
import { CeloContract } from './base'
import { CeloTokens, EachCeloToken } from './celo-tokens'
import { ValidWrappers, WrapperCache } from './contract-cache'
import {
  HttpProviderOptions,
  ensureCurrentProvider,
  getWeb3ForKit,
  setupAPIKey,
} from './setupForKits'
import { Web3ContractCache } from './web3-contract-cache'
import { AttestationsConfig } from './wrappers/Attestations'
import { ElectionConfig } from './wrappers/Election'
import { GovernanceConfig } from './wrappers/Governance'
import { LockedGoldConfig } from './wrappers/LockedGold'
import { ReserveConfig } from './wrappers/Reserve'
import { SortedOraclesConfig } from './wrappers/SortedOracles'
import { StableTokenConfig } from './wrappers/StableTokenWrapper'
import { ValidatorsConfig } from './wrappers/Validators'
export { API_KEY_HEADER_KEY, HttpProviderOptions } from './setupForKits'

/**
 * Creates a new instance of `ContractKit` given a nodeUrl
 * @param url CeloBlockchain node url
 * @param wallet to reuse or add a wallet different than the default (example ledger-wallet)
 * @param options to pass to the Web3 HttpProvider constructor
 */
export function newKit(url: string, wallet?: ReadOnlyWallet, options?: HttpProviderOptions) {
  const web3: Web3 = getWeb3ForKit(url, options)
  return newKitFromWeb3(web3, wallet)
}

/**
 * Creates a new instance of `ContractKit` given a nodeUrl and apiKey
 * @param url CeloBlockchain node url
 * @param apiKey to include in the http request header
 * @param wallet to reuse or add a wallet different than the default (example ledger-wallet)
 */
export function newKitWithApiKey(url: string, apiKey: string, wallet?: ReadOnlyWallet) {
  const options: HttpProviderOptions = setupAPIKey(apiKey)
  return newKit(url, wallet, options)
}

/**
 * Creates a new instance of the `ContractKit` with a web3 instance
 * @param web3 Web3 instance
 */
export function newKitFromWeb3(web3: Web3, wallet: ReadOnlyWallet = new LocalWallet()) {
  ensureCurrentProvider(web3)
  return new ContractKit(new Connection(web3, wallet))
}
export interface NetworkConfig {
  stableTokens: EachCeloToken<StableTokenConfig>
  election: ElectionConfig
  attestations: AttestationsConfig
  governance: GovernanceConfig
  lockedGold: LockedGoldConfig
  sortedOracles: SortedOraclesConfig
  reserve: ReserveConfig
  validators: ValidatorsConfig
}

interface AccountBalance extends EachCeloToken<BigNumber> {
  lockedCELO: BigNumber
  pending: BigNumber
}

/*
 * ContractKit provides a convenient interface for All Celo Contracts
 *
 * @remarks
 *
 * For most use cases this ContractKit class might be more than you need.
 * Consider {@link MiniContractKit} for a scaled down subset of contract Wrappers,
 * or {@link Connection} for a lighter package without contract Wrappers
 *
 * @param connection – an instance of @celo/connect {@link Connection}
 */

export class ContractKit {
  /** core contract's address registry */
  readonly registry: AddressRegistry
  /** factory for core contract's native web3 wrappers  */
  readonly _web3Contracts: Web3ContractCache
  /** factory for core contract's kit wrappers  */
  readonly contracts: WrapperCache
  /** helper for interacting with CELO & stable tokens */
  readonly celoTokens: CeloTokens

  /** @deprecated no longer needed since gasPrice is available on node rpc */
  gasPriceSuggestionMultiplier = 5

  constructor(readonly connection: Connection) {
    this.registry = new AddressRegistry(connection)
    this._web3Contracts = new Web3ContractCache(this.registry)
    this.contracts = new WrapperCache(connection, this._web3Contracts, this.registry)
    this.celoTokens = new CeloTokens(this.contracts, this.registry)
  }

  getWallet() {
    return this.connection.wallet
  }

  async getTotalBalance(address: string): Promise<AccountBalance> {
    const lockedCelo = await this.contracts.getLockedGold()
    const lockedBalance = await lockedCelo.getAccountTotalLockedGold(address)
    let pending = new BigNumber(0)
    try {
      pending = await lockedCelo.getPendingWithdrawalsTotalValue(address)
    } catch (err) {
      // Just means that it's not an account
    }

    return {
      lockedCELO: lockedBalance,
      pending,
      ...(await this.celoTokens.balancesOf(address)),
    }
  }

  async getNetworkConfig(
    humanReadable = false
  ): Promise<NetworkConfig | Record<CeloContract & 'stableTokens', unknown>> {
    const configContracts: ValidWrappers[] = [
      CeloContract.Election,
      CeloContract.Governance,
      CeloContract.LockedCelo,
      CeloContract.SortedOracles,
      CeloContract.Reserve,
      CeloContract.Validators,
      CeloContract.FeeCurrencyDirectory,
      CeloContract.EpochManager,
    ]

    const configMethod = async (contract: ValidWrappers) => {
      try {
        const eachTokenAddress = await this.celoTokens.getAddresses()
        const addresses = Object.values(eachTokenAddress)
        const configContractWrapper = await this.contracts.getContract(contract)
        if (humanReadable && 'getHumanReadableConfig' in configContractWrapper) {
          return configContractWrapper.getHumanReadableConfig(addresses)
        } else if ('getConfig' in configContractWrapper) {
          return configContractWrapper.getConfig(addresses)
        } else {
          throw new Error('No config endpoint found')
        }
      } catch (e) {
        return new Error(`Failed to fetch config for contract ${contract}: \n${e}`)
      }
    }

    const configArray = await Promise.all(configContracts.map(configMethod))

    const configMap: {
      [C in CeloContract]?: ReturnType<typeof configMethod> extends Promise<infer U> ? U : never
    } = {}
    configArray.forEach((config, index) => (configMap[configContracts[index]] = config))

    return {
      ...configMap,
    }
  }

  getHumanReadableNetworkConfig = () => this.getNetworkConfig(true)

  /**
   * Set an addressed to use to pay for gas fees
   * @param address any hexadecimal address
   * @dev Throws if supplied address is not a valid hexadecimal address
   */
  setFeeCurrency(address: StrongAddress) {
    if (!this.web3.utils.isAddress(address)) {
      throw new Error('Supplied address is not a valid hexadecimal address.')
    }
    this.connection.defaultFeeCurrency = address
  }

  /**
   * @returns epoch duration (in seconds)
   */
  async getEpochSize(): Promise<number> {
    const epochManagerWrapper = await this.contracts.getEpochManager()

    return epochManagerWrapper.epochDuration()
  }

  async getFirstBlockNumberForEpoch(epochNumber: number): Promise<number> {
    const epochManagerWrapper = await this.contracts.getEpochManager()

    return await epochManagerWrapper.getFirstBlockAtEpoch(epochNumber)
  }

  async getLastBlockNumberForEpoch(epochNumber: number): Promise<number> {
    const epochManagerWrapper = await this.contracts.getEpochManager()

    return await epochManagerWrapper.getLastBlockAtEpoch(epochNumber)
  }

  async getEpochNumberOfBlock(blockNumber: number): Promise<number> {
    const epochManagerWrapper = await this.contracts.getEpochManager()

    try {
      return epochManagerWrapper.getEpochNumberOfBlock(blockNumber)
    } catch (_) {
      throw new Error(`Block number ${blockNumber} is not in any known L2 epoch`)
    }
  }

  // *** NOTICE ***
  // Next functions exists for backwards compatibility
  // These should be consumed via connection to avoid future deprecation issues

  addAccount(privateKey: string) {
    this.connection.addAccount(privateKey)
  }

  set defaultAccount(address: StrongAddress | undefined) {
    this.connection.defaultAccount = address
  }

  get defaultAccount(): StrongAddress | undefined {
    return this.connection.defaultAccount
  }

  set gasInflationFactor(factor: number) {
    this.connection.defaultGasInflationFactor = factor
  }

  get gasInflationFactor() {
    return this.connection.defaultGasInflationFactor
  }

  set defaultFeeCurrency(address: StrongAddress | undefined) {
    this.connection.defaultFeeCurrency = address
  }

  get defaultFeeCurrency() {
    return this.connection.defaultFeeCurrency
  }

  isListening(): Promise<boolean> {
    return this.connection.isListening()
  }

  isSyncing(): Promise<boolean> {
    return this.connection.isSyncing()
  }

  async sendTransaction(tx: CeloTx): Promise<TransactionResult> {
    return this.connection.sendTransaction(tx)
  }

  async sendTransactionObject(
    txObj: CeloTxObject<any>,
    tx?: Omit<CeloTx, 'data'>
  ): Promise<TransactionResult> {
    return this.connection.sendTransactionObject(txObj, tx)
  }

  async signTypedData(signer: string, typedData: EIP712TypedData): Promise<Signature> {
    return this.connection.signTypedData(signer, typedData)
  }

  stop() {
    this.connection.stop()
  }

  get web3() {
    return this.connection.web3
  }
}
