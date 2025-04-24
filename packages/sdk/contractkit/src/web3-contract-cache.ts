import { newCeloUnreleasedTreasury } from '@celo/abis-12/web3/CeloUnreleasedTreasury'
import { newElection } from '@celo/abis-12/web3/Election'
import { newEpochManager } from '@celo/abis-12/web3/EpochManager'
import { newEpochManagerEnabler } from '@celo/abis-12/web3/EpochManagerEnabler'
import { newFeeCurrencyDirectory } from '@celo/abis-12/web3/FeeCurrencyDirectory'
import { newGoldToken } from '@celo/abis-12/web3/GoldToken'
import { newGovernance } from '@celo/abis-12/web3/Governance'
import { newGovernanceSlasher } from '@celo/abis-12/web3/GovernanceSlasher'
import { newLockedGold } from '@celo/abis-12/web3/LockedGold'
import { newScoreManager } from '@celo/abis-12/web3/ScoreManager'
import { newValidators } from '@celo/abis-12/web3/Validators'
import { newAccounts } from '@celo/abis/web3/Accounts'
import { newAttestations } from '@celo/abis/web3/Attestations'
import { newEpochRewards } from '@celo/abis/web3/EpochRewards'
import { newEscrow } from '@celo/abis/web3/Escrow'
import { newFederatedAttestations } from '@celo/abis/web3/FederatedAttestations'
import { newFeeHandler } from '@celo/abis/web3/FeeHandler'
import { newFreezer } from '@celo/abis/web3/Freezer'
import { newIERC20 } from '@celo/abis/web3/IERC20'
import { newReserve } from '@celo/abis/web3/mento/Reserve'
import { newStableToken } from '@celo/abis/web3/mento/StableToken'
import { newMentoFeeHandlerSeller } from '@celo/abis/web3/MentoFeeHandlerSeller'
import { newMultiSig } from '@celo/abis/web3/MultiSig'
import { newOdisPayments } from '@celo/abis/web3/OdisPayments'
import { newProxy } from '@celo/abis/web3/Proxy'
import { newRegistry } from '@celo/abis/web3/Registry'
import { newSortedOracles } from '@celo/abis/web3/SortedOracles'
import { newUniswapFeeHandlerSeller } from '@celo/abis/web3/UniswapFeeHandlerSeller'
import debugFactory from 'debug'
import { AddressRegistry } from './address-registry'
import { CeloContract, ProxyContracts } from './base'
import { StableToken } from './celo-tokens'

const debug = debugFactory('kit:web3-contract-cache')

export const ContractFactories = {
  [CeloContract.Accounts]: newAccounts,
  [CeloContract.Attestations]: newAttestations,
  [CeloContract.CeloUnreleasedTreasury]: newCeloUnreleasedTreasury,
  [CeloContract.Election]: newElection,
  [CeloContract.EpochManager]: newEpochManager,
  [CeloContract.EpochManagerEnabler]: newEpochManagerEnabler,
  [CeloContract.EpochRewards]: newEpochRewards,
  [CeloContract.ERC20]: newIERC20,
  [CeloContract.Escrow]: newEscrow,
  [CeloContract.FederatedAttestations]: newFederatedAttestations,
  [CeloContract.FeeCurrencyDirectory]: newFeeCurrencyDirectory,
  [CeloContract.Freezer]: newFreezer,
  [CeloContract.FeeHandler]: newFeeHandler,
  [CeloContract.MentoFeeHandlerSeller]: newMentoFeeHandlerSeller,
  [CeloContract.UniswapFeeHandlerSeller]: newUniswapFeeHandlerSeller,
  [CeloContract.CeloToken]: newGoldToken,
  [CeloContract.GoldToken]: newGoldToken,
  [CeloContract.Governance]: newGovernance,
  [CeloContract.GovernanceSlasher]: newGovernanceSlasher,
  [CeloContract.LockedCelo]: newLockedGold,
  [CeloContract.LockedGold]: newLockedGold,
  [CeloContract.MultiSig]: newMultiSig,
  [CeloContract.OdisPayments]: newOdisPayments,
  [CeloContract.Registry]: newRegistry,
  [CeloContract.Reserve]: newReserve,
  [CeloContract.ScoreManager]: newScoreManager,
  [CeloContract.SortedOracles]: newSortedOracles,
  [CeloContract.StableToken]: newStableToken,
  [CeloContract.StableTokenEUR]: newStableToken,
  [CeloContract.StableTokenBRL]: newStableToken,
  [CeloContract.Validators]: newValidators,
}

const StableToContract = {
  [StableToken.cEUR]: CeloContract.StableTokenEUR,
  [StableToken.cUSD]: CeloContract.StableToken,
  [StableToken.cREAL]: CeloContract.StableTokenBRL,
}

export type CFType = typeof ContractFactories
type ContractCacheMap = { [K in keyof CFType]?: ReturnType<CFType[K]> }

/**
 * Native Web3 contracts factory and cache.
 *
 * Exposes accessors to all `CeloContract` web3 contracts.
 *
 * Mostly a private cache, kit users would normally use
 * a contract wrapper
 */
export class Web3ContractCache {
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
  getStableToken(stableToken: StableToken = StableToken.cUSD) {
    return this.getContract(StableToContract[stableToken])
  }
  getValidators() {
    return this.getContract(CeloContract.Validators)
  }

  /**
   * Get native web3 contract wrapper
   */
  async getContract<C extends keyof typeof ContractFactories>(contract: C, address?: string) {
    if (this.cacheMap[contract] == null || address !== undefined) {
      // core contract in the registry
      if (!address) {
        address = await this.registry.addressFor(contract)
      }
      debug('Initiating contract %s', contract)
      debug('is it included?', ProxyContracts.includes(contract))
      debug('is it included?', ProxyContracts.toString())
      const createFn = ProxyContracts.includes(contract) ? newProxy : ContractFactories[contract]
      this.cacheMap[contract] = createFn(
        this.registry.connection.web3,
        address
      ) as ContractCacheMap[C]
    }
    // we know it's defined (thus the !)
    return this.cacheMap[contract]!
  }

  public invalidateContract<C extends keyof typeof ContractFactories>(contract: C) {
    this.cacheMap[contract] = undefined
  }
}
