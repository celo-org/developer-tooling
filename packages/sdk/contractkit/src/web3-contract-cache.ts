import { celoDistributionScheduleABI } from '@celo/abis-12/CeloDistributionSchedule'
import { feeCurrencyDirectoryABI } from '@celo/abis-12/FeeCurrencyDirectory'
import { goldTokenABI } from '@celo/abis-12/GoldToken'
import { governanceABI } from '@celo/abis-12/Governance'
import { accountsABI } from '@celo/abis/Accounts'
import { attestationsABI } from '@celo/abis/Attestations'
import { blockchainParametersABI } from '@celo/abis/BlockchainParameters'
import { doubleSigningSlasherABI } from '@celo/abis/DoubleSigningSlasher'
import { downtimeSlasherABI } from '@celo/abis/DowntimeSlasher'
import { electionABI } from '@celo/abis/Election'
import { epochRewardsABI } from '@celo/abis/EpochRewards'
import { escrowABI } from '@celo/abis/Escrow'
import { federatedAttestationsABI } from '@celo/abis/FederatedAttestations'
import { feeCurrencyWhitelistABI } from '@celo/abis/FeeCurrencyWhitelist'
import { feeHandlerABI } from '@celo/abis/FeeHandler'
import { freezerABI } from '@celo/abis/Freezer'
import { ierc20ABI } from '@celo/abis/IERC20'
import { lockedGoldABI } from '@celo/abis/LockedGold'
import { mentoFeeHandlerSellerABI } from '@celo/abis/MentoFeeHandlerSeller'
import { multiSigABI } from '@celo/abis/MultiSig'
import { odisPaymentsABI } from '@celo/abis/OdisPayments'
import { proxyABI } from '@celo/abis/Proxy'
import { randomABI } from '@celo/abis/Random'
import { registryABI } from '@celo/abis/Registry'
import { reserveABI } from '@celo/abis/Reserve'
import { sortedOraclesABI } from '@celo/abis/SortedOracles'
import { stableTokenABI } from '@celo/abis/StableToken'
import { uniswapFeeHandlerSellerABI } from '@celo/abis/UniswapFeeHandlerSeller'
import { validatorsABI } from '@celo/abis/Validators'
import debugFactory from 'debug'
import { AddressRegistry } from './address-registry'
import { CeloContract, ProxyContracts } from './base'
import { StableToken } from './celo-tokens'

import { StrongAddress } from '@celo/base'
import Web3, { Contract } from 'web3'

const debug = debugFactory('kit:web3-contract-cache')

export const ContractFactories = {
  [CeloContract.Accounts]: function newAccounts(web: Web3, address: StrongAddress) {
    return new Contract(accountsABI, address, web)
  },
  [CeloContract.Attestations]: function newAttestations(web: Web3, address: StrongAddress) {
    return new Contract(attestationsABI, address, web)
  },
  [CeloContract.BlockchainParameters]: function newBlockchainParameters(
    web: Web3,
    address: StrongAddress
  ) {
    return new Contract(blockchainParametersABI, address, web)
  },
  [CeloContract.CeloDistributionSchedule]: function newCeloDistributionSchedule(
    web3: Web3,
    address: StrongAddress
  ) {
    return new Contract(celoDistributionScheduleABI, address, web3)
  },
  [CeloContract.DoubleSigningSlasher]: function newDoubleSigningSlasher(
    web: Web3,
    address: StrongAddress
  ) {
    return new Contract(doubleSigningSlasherABI, address, web)
  },
  [CeloContract.DowntimeSlasher]: function newDowntimeSlasher(web: Web3, address: StrongAddress) {
    return new Contract(downtimeSlasherABI, address, web)
  },
  [CeloContract.Election]: function newElection(web: Web3, address: StrongAddress) {
    return new Contract(electionABI, address, web)
  },
  [CeloContract.EpochRewards]: function newEpochRewards(web: Web3, address: StrongAddress) {
    return new Contract(epochRewardsABI, address, web)
  },
  [CeloContract.ERC20]: function newIERC20(web: Web3, address: StrongAddress) {
    return new Contract(ierc20ABI, address, web)
  },
  [CeloContract.Escrow]: function newEscrow(web: Web3, address: StrongAddress) {
    return new Contract(escrowABI, address, web)
  },
  [CeloContract.FederatedAttestations]: function newFederatedAttestations(
    web: Web3,
    address: StrongAddress
  ) {
    return new Contract(federatedAttestationsABI, address, web)
  },
  [CeloContract.FeeCurrencyDirectory]: function newFeeCurrencyDirectory(
    web: Web3,
    address: StrongAddress
  ) {
    return new Contract(feeCurrencyDirectoryABI, address, web)
  },
  [CeloContract.FeeCurrencyWhitelist]: function newFeeCurrencyWhitelist(
    web: Web3,
    address: StrongAddress
  ) {
    return new Contract(feeCurrencyWhitelistABI, address, web)
  },
  [CeloContract.Freezer]: function newFreezer(web: Web3, address: StrongAddress) {
    return new Contract(freezerABI, address, web)
  },
  [CeloContract.FeeHandler]: function newFeeHandler(web: Web3, address: StrongAddress) {
    return new Contract(feeHandlerABI, address, web)
  },
  [CeloContract.MentoFeeHandlerSeller]: function newMentoFeeHandlerSeller(
    web: Web3,
    address: StrongAddress
  ) {
    return new Contract(mentoFeeHandlerSellerABI, address, web)
  },
  [CeloContract.UniswapFeeHandlerSeller]: function newUniswapFeeHandlerSeller(
    web: Web3,
    address: StrongAddress
  ) {
    return new Contract(uniswapFeeHandlerSellerABI, address, web)
  },
  [CeloContract.GoldToken]: function newGoldToken(web: Web3, address: StrongAddress) {
    return new Contract(goldTokenABI, address, web)
  },
  [CeloContract.Governance]: function newGovernance(web: Web3, address: StrongAddress) {
    return new Contract(governanceABI, address, web)
  },
  [CeloContract.LockedGold]: function newLockedGold(web: Web3, address: StrongAddress) {
    return new Contract(lockedGoldABI, address, web)
  },
  [CeloContract.MultiSig]: function newMultiSig(web: Web3, address: StrongAddress) {
    return new Contract(multiSigABI, address, web)
  },
  [CeloContract.OdisPayments]: function newOdisPayments(web: Web3, address: StrongAddress) {
    return new Contract(odisPaymentsABI, address, web)
  },
  [CeloContract.Random]: function newRandom(web: Web3, address: StrongAddress) {
    return new Contract(randomABI, address, web)
  },
  [CeloContract.Registry]: function newRegistry(web: Web3, address: StrongAddress) {
    return new Contract(registryABI, address, web)
  },
  [CeloContract.Reserve]: function newReserve(web: Web3, address: StrongAddress) {
    return new Contract(reserveABI, address, web)
  },
  [CeloContract.SortedOracles]: function newSortedOracles(web: Web3, address: StrongAddress) {
    return new Contract(sortedOraclesABI, address, web)
  },
  [CeloContract.StableToken]: function newStableToken(web: Web3, address: StrongAddress) {
    return new Contract(stableTokenABI, address, web)
  },
  [CeloContract.StableTokenEUR]: function newStableToken(web: Web3, address: StrongAddress) {
    return new Contract(stableTokenABI, address, web)
  },
  [CeloContract.StableTokenBRL]: function newStableToken(web: Web3, address: StrongAddress) {
    return new Contract(stableTokenABI, address, web)
  },
  [CeloContract.Validators]: function newValidators(web: Web3, address: StrongAddress) {
    return new Contract(validatorsABI, address, web)
  },
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
  getBlockchainParameters() {
    return this.getContract(CeloContract.BlockchainParameters)
  }
  getCeloDistributionSchedule() {
    return this.getContract(CeloContract.CeloDistributionSchedule)
  }
  getDoubleSigningSlasher() {
    return this.getContract(CeloContract.DoubleSigningSlasher)
  }
  getDowntimeSlasher() {
    return this.getContract(CeloContract.DowntimeSlasher)
  }
  getElection() {
    return this.getContract(CeloContract.Election)
  }
  getEpochRewards() {
    return this.getContract(CeloContract.EpochRewards)
  }
  getErc20(address: StrongAddress) {
    return this.getContract(CeloContract.ERC20, address)
  }
  getEscrow() {
    return this.getContract(CeloContract.Escrow)
  }

  getFederatedAttestations() {
    return this.getContract(CeloContract.FederatedAttestations)
  }
  getFeeCurrencyWhitelist() {
    return this.getContract(CeloContract.FeeCurrencyWhitelist)
  }
  getFreezer() {
    return this.getContract(CeloContract.Freezer)
  }
  getFeeHandler() {
    return this.getContract(CeloContract.FeeHandler)
  }
  getGoldToken() {
    return this.getContract(CeloContract.GoldToken)
  }
  getGovernance() {
    return this.getContract(CeloContract.Governance)
  }

  getLockedGold() {
    return this.getContract(CeloContract.LockedGold)
  }
  getOdisPayments() {
    return this.getContract(CeloContract.OdisPayments)
  }
  getRandom() {
    return this.getContract(CeloContract.Random)
  }
  getRegistry() {
    return this.getContract(CeloContract.Registry)
  }
  getReserve() {
    return this.getContract(CeloContract.Reserve)
  }
  getSortedOracles() {
    return this.getContract(CeloContract.SortedOracles)
  }
  getStableToken(stableToken: StableToken = StableToken.cUSD) {
    return this.getContract(StableToContract[stableToken] as CeloContract.StableToken)
  }
  getValidators() {
    return this.getContract(CeloContract.Validators)
  }

  /**
   * Get native web3 contract wrapper
   */
  async getContract<C extends keyof typeof ContractFactories>(
    contract: C,
    address?: StrongAddress
  ) {
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

function newProxy(web3: Web3, address: StrongAddress) {
  return new Contract(proxyABI, address, web3)
}
