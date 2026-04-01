import {
  accountsABI,
  attestationsABI,
  celoUnreleasedTreasuryABI,
  electionABI,
  epochManagerABI,
  epochManagerEnablerABI,
  epochRewardsABI,
  escrowABI,
  federatedAttestationsABI,
  feeCurrencyDirectoryABI,
  feeHandlerABI,
  freezerABI,
  goldTokenABI,
  governanceABI,
  governanceSlasherABI,
  ierc20ABI,
  lockedGoldABI,
  mentoFeeHandlerSellerABI,
  multiSigABI,
  odisPaymentsABI,
  proxyABI,
  registryABI,
  reserveABI,
  scoreManagerABI,
  sortedOraclesABI,
  stableTokenABI,
  uniswapFeeHandlerSellerABI,
  validatorsABI,
} from '@celo/abis'
import { AbiItem, type ContractRef } from '@celo/connect'
import debugFactory from 'debug'
import { AddressRegistry } from './address-registry'
import { CeloContract, ProxyContracts } from './base'
import { StableToken } from './celo-tokens'

const debug = debugFactory('kit:contract-factory-cache')

/**
 * Typed ABI map — preserves per-contract const ABI types for compile-time type safety.
 * Use this when you need the specific ABI type for a contract (e.g. in wrapper generics).
 */
export const TypedContractABIs = {
  [CeloContract.Accounts]: accountsABI,
  [CeloContract.Attestations]: attestationsABI,
  [CeloContract.CeloUnreleasedTreasury]: celoUnreleasedTreasuryABI,
  [CeloContract.Election]: electionABI,
  [CeloContract.EpochManager]: epochManagerABI,
  [CeloContract.EpochManagerEnabler]: epochManagerEnablerABI,
  [CeloContract.EpochRewards]: epochRewardsABI,
  [CeloContract.ERC20]: ierc20ABI,
  [CeloContract.Escrow]: escrowABI,
  [CeloContract.FederatedAttestations]: federatedAttestationsABI,
  [CeloContract.FeeCurrencyDirectory]: feeCurrencyDirectoryABI,
  [CeloContract.Freezer]: freezerABI,
  [CeloContract.FeeHandler]: feeHandlerABI,
  [CeloContract.MentoFeeHandlerSeller]: mentoFeeHandlerSellerABI,
  [CeloContract.UniswapFeeHandlerSeller]: uniswapFeeHandlerSellerABI,
  [CeloContract.CeloToken]: goldTokenABI,
  [CeloContract.GoldToken]: goldTokenABI,
  [CeloContract.Governance]: governanceABI,
  [CeloContract.GovernanceSlasher]: governanceSlasherABI,
  [CeloContract.LockedCelo]: lockedGoldABI,
  [CeloContract.LockedGold]: lockedGoldABI,
  [CeloContract.MultiSig]: multiSigABI,
  [CeloContract.OdisPayments]: odisPaymentsABI,
  [CeloContract.Registry]: registryABI,
  [CeloContract.Reserve]: reserveABI,
  [CeloContract.ScoreManager]: scoreManagerABI,
  [CeloContract.SortedOracles]: sortedOraclesABI,
  [CeloContract.StableToken]: stableTokenABI,
  [CeloContract.StableTokenEUR]: stableTokenABI,
  [CeloContract.StableTokenBRL]: stableTokenABI,
  [CeloContract.Validators]: validatorsABI,
} as const

/**
 * Utility type to extract the ABI type for a given CeloContract.
 * @example
 * type AccountsABI = ContractABI<CeloContract.Accounts> // typeof accountsABI
 */
export type ContractABI<T extends keyof typeof TypedContractABIs> = (typeof TypedContractABIs)[T]

/**
 * ABI arrays mapped to CeloContract enum values.
 * @deprecated Use TypedContractABIs for type-safe access.
 * Kept for backward compatibility with dynamic lookups.
 */
export const ContractABIs: Record<string, readonly any[]> = TypedContractABIs

const StableToContract = {
  [StableToken.EURm]: CeloContract.StableTokenEUR,
  [StableToken.USDm]: CeloContract.StableToken,
  [StableToken.BRLm]: CeloContract.StableTokenBRL,
}

type ContractCacheMap = { [K in string]?: ContractRef }

/**
 * Contract factory and cache.
 *
 * Creates Contract instances via Connection.createContract() and caches them.
 *
 * Mostly a private cache, kit users would normally use
 * a contract wrapper
 */
export class ContractCache {
  private cacheMap: ContractCacheMap = {}
  /** core contract's address registry */
  constructor(readonly registry: AddressRegistry) {}
  getAccounts() {
    return this.getContract(CeloContract.Accounts)
  }
  getAttestations() {
    return this.getContract(CeloContract.Attestations)
  }
  getCeloUnreleasedTreasury() {
    return this.getContract(CeloContract.CeloUnreleasedTreasury)
  }
  getElection() {
    return this.getContract(CeloContract.Election)
  }
  getEpochManager() {
    return this.getContract(CeloContract.EpochManager)
  }
  getEpochManagerEnabler() {
    return this.getContract(CeloContract.EpochManagerEnabler)
  }
  getEpochRewards() {
    return this.getContract(CeloContract.EpochRewards)
  }
  getErc20(address: string) {
    return this.getContract(CeloContract.ERC20, address)
  }
  getEscrow() {
    return this.getContract(CeloContract.Escrow)
  }
  getFederatedAttestations() {
    return this.getContract(CeloContract.FederatedAttestations)
  }
  getFreezer() {
    return this.getContract(CeloContract.Freezer)
  }
  getFeeHandler() {
    return this.getContract(CeloContract.FeeHandler)
  }
  /* @deprecated use getLockedCelo */
  getGoldToken() {
    return this.getContract(CeloContract.CeloToken)
  }
  getCeloToken() {
    return this.getContract(CeloContract.CeloToken)
  }
  getGovernance() {
    return this.getContract(CeloContract.Governance)
  }
  /* @deprecated use getLockedCelo */
  getLockedGold() {
    return this.getContract(CeloContract.LockedGold)
  }
  getLockedCelo() {
    return this.getContract(CeloContract.LockedCelo)
  }
  getMultiSig(address: string) {
    return this.getContract(CeloContract.MultiSig, address)
  }
  getOdisPayments() {
    return this.getContract(CeloContract.OdisPayments)
  }
  getRegistry() {
    return this.getContract(CeloContract.Registry)
  }
  getReserve() {
    return this.getContract(CeloContract.Reserve)
  }
  getScoreManager() {
    return this.getContract(CeloContract.ScoreManager)
  }
  getSortedOracles() {
    return this.getContract(CeloContract.SortedOracles)
  }
  getStableToken(stableToken: StableToken = StableToken.USDm) {
    return this.getContract(StableToContract[stableToken])
  }
  getValidators() {
    return this.getContract(CeloContract.Validators)
  }

  /**
   * Get contract instance for a given CeloContract
   */
  async getContract(contract: string, address?: string) {
    if (this.cacheMap[contract] == null || address !== undefined) {
      // core contract in the registry
      if (!address) {
        address = await this.registry.addressFor(contract as CeloContract)
      }
      debug('Initiating contract %s', contract)
      debug('is it included?', ProxyContracts.includes(contract as CeloContract))
      debug('is it included?', ProxyContracts.toString())
      const abi = ProxyContracts.includes(contract as CeloContract)
        ? proxyABI
        : ContractABIs[contract]
      if (!abi) {
        throw new Error(`No ABI found for contract ${contract}`)
      }
      this.cacheMap[contract] = this.registry.connection.getCeloContract(abi as AbiItem[], address)
    }
    // we know it's defined (thus the !)
    return this.cacheMap[contract]!
  }

  public invalidateContract(contract: string) {
    this.cacheMap[contract] = undefined
  }
}
