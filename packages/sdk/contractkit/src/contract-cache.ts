import { IERC20 } from '@celo/abis/web3/IERC20'
import { Connection } from '@celo/connect'
import { AddressRegistry } from './address-registry'
import { CeloContract } from './base'
import { ContractCacheType } from './basic-contract-cache-type'
import { StableToken, stableTokenInfos } from './celo-tokens'
import { Web3ContractCache } from './web3-contract-cache'
import { AccountsWrapper } from './wrappers/Accounts'
import { AttestationsWrapper } from './wrappers/Attestations'
import { ElectionWrapper } from './wrappers/Election'
import { EpochManagerWrapper } from './wrappers/EpochManager'
import { EpochRewardsWrapper } from './wrappers/EpochRewards'
import { Erc20Wrapper } from './wrappers/Erc20Wrapper'
import { EscrowWrapper } from './wrappers/Escrow'
import { FederatedAttestationsWrapper } from './wrappers/FederatedAttestations'
import { FeeCurrencyDirectoryWrapper } from './wrappers/FeeCurrencyDirectoryWrapper'
import { FreezerWrapper } from './wrappers/Freezer'
import { GoldTokenWrapper } from './wrappers/GoldTokenWrapper'
import { GovernanceWrapper } from './wrappers/Governance'
import { LockedGoldWrapper } from './wrappers/LockedGold'
import { MultiSigWrapper } from './wrappers/MultiSig'
import { OdisPaymentsWrapper } from './wrappers/OdisPayments'
import { ReserveWrapper } from './wrappers/Reserve'
import { ScoreManagerWrapper } from './wrappers/ScoreManager'
import { SortedOraclesWrapper } from './wrappers/SortedOracles'
import { StableTokenWrapper } from './wrappers/StableTokenWrapper'
import { ValidatorsWrapper } from './wrappers/Validators'

const WrapperFactories = {
  [CeloContract.Accounts]: AccountsWrapper,
  [CeloContract.EpochRewards]: EpochRewardsWrapper,
  [CeloContract.ERC20]: Erc20Wrapper,
  [CeloContract.Escrow]: EscrowWrapper,
  [CeloContract.FederatedAttestations]: FederatedAttestationsWrapper,
  [CeloContract.FeeCurrencyDirectory]: FeeCurrencyDirectoryWrapper,
  [CeloContract.Freezer]: FreezerWrapper,
  [CeloContract.GoldToken]: GoldTokenWrapper,
  [CeloContract.CeloToken]: GoldTokenWrapper,
  [CeloContract.MultiSig]: MultiSigWrapper,
  [CeloContract.OdisPayments]: OdisPaymentsWrapper,
  [CeloContract.Reserve]: ReserveWrapper,
  [CeloContract.ScoreManager]: ScoreManagerWrapper,
  [CeloContract.StableToken]: StableTokenWrapper,
  [CeloContract.StableTokenEUR]: StableTokenWrapper,
  [CeloContract.StableTokenBRL]: StableTokenWrapper,
} as const

const WithRegistry = {
  [CeloContract.SortedOracles]: SortedOraclesWrapper,
} as const

const WrapperFactoriesWhichNeedCache = {
  [CeloContract.Attestations]: AttestationsWrapper,
  [CeloContract.Election]: ElectionWrapper,
  [CeloContract.EpochManager]: EpochManagerWrapper,
  [CeloContract.Governance]: GovernanceWrapper,
  [CeloContract.LockedCelo]: LockedGoldWrapper,
  [CeloContract.LockedGold]: LockedGoldWrapper,
  [CeloContract.Validators]: ValidatorsWrapper,
}

type CFType = typeof WrapperFactories
type RegistryType = typeof WithRegistry
type WrapperFactoriesWhichNeedCacheType = typeof WrapperFactoriesWhichNeedCache
export type ValidWrappers =
  | keyof CFType
  | keyof RegistryType
  | keyof WrapperFactoriesWhichNeedCacheType

const contractsWhichRequireCache = new Set(Object.keys(WrapperFactoriesWhichNeedCache))

interface WrapperCacheMap {
  [CeloContract.Accounts]?: AccountsWrapper
  [CeloContract.Attestations]?: AttestationsWrapper
  [CeloContract.Election]?: ElectionWrapper
  [CeloContract.EpochManager]?: EpochManagerWrapper
  [CeloContract.EpochRewards]?: EpochRewardsWrapper
  [CeloContract.ERC20]?: Erc20Wrapper<IERC20>
  [CeloContract.Escrow]?: EscrowWrapper
  [CeloContract.FederatedAttestations]?: FederatedAttestationsWrapper
  [CeloContract.FeeCurrencyDirectory]?: FeeCurrencyDirectoryWrapper
  [CeloContract.Freezer]?: FreezerWrapper
  [CeloContract.CeloToken]?: GoldTokenWrapper
  [CeloContract.GoldToken]?: GoldTokenWrapper
  [CeloContract.Governance]?: GovernanceWrapper
  [CeloContract.LockedCelo]?: LockedGoldWrapper
  [CeloContract.LockedGold]?: LockedGoldWrapper
  [CeloContract.MultiSig]?: MultiSigWrapper
  [CeloContract.OdisPayments]?: OdisPaymentsWrapper
  [CeloContract.Reserve]?: ReserveWrapper
  [CeloContract.ScoreManager]?: ScoreManagerWrapper
  [CeloContract.SortedOracles]?: SortedOraclesWrapper
  [CeloContract.StableToken]?: StableTokenWrapper
  [CeloContract.StableTokenEUR]?: StableTokenWrapper
  [CeloContract.StableTokenBRL]?: StableTokenWrapper
  [CeloContract.Validators]?: ValidatorsWrapper
}

/**
 * Kit ContractWrappers factory & cache.
 *
 * Provides access to all contract wrappers for celo core contracts
 *
 * @remarks
 *
 * Because it provides access to all contract wrappers it must load all wrappers and the contract ABIs for them
 * Consider Using {@link MiniWrapperCache}, building your own, or if you only need one Wrapper using it directly
 */

export class WrapperCache implements ContractCacheType {
  private wrapperCache: WrapperCacheMap = {}
  constructor(
    readonly connection: Connection,
    readonly _web3Contracts: Web3ContractCache,
    readonly registry: AddressRegistry
  ) {}

  getAccounts() {
    return this.getContract(CeloContract.Accounts)
  }
  getAttestations() {
    return this.getContract(CeloContract.Attestations)
  }
  getElection() {
    return this.getContract(CeloContract.Election)
  }
  getEpochRewards() {
    return this.getContract(CeloContract.EpochRewards)
  }
  getEpochManager() {
    return this.getContract(CeloContract.EpochManager)
  }
  getErc20(address: string) {
    return this.getContract(CeloContract.ERC20, address)
  }
  getEscrow(): Promise<EscrowWrapper> {
    return this.getContract(CeloContract.Escrow)
  }

  getFreezer() {
    return this.getContract(CeloContract.Freezer)
  }
  getFederatedAttestations() {
    return this.getContract(CeloContract.FederatedAttestations)
  }
  getFeeCurrencyDirectory() {
    return this.getContract(CeloContract.FeeCurrencyDirectory)
  }
  /* @deprecated use getCeloToken */
  getGoldToken() {
    return this.getContract(CeloContract.GoldToken)
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
    return this.getContract(stableTokenInfos[stableToken].contract)
  }
  getValidators() {
    return this.getContract(CeloContract.Validators)
  }

  /**
   * Get Contract wrapper
   */
  public async getContract<C extends ValidWrappers>(contract: C, address?: string) {
    if (this.wrapperCache[contract] == null || address !== undefined) {
      const instance = await this._web3Contracts.getContract<C>(contract, address)
      if (contract === CeloContract.SortedOracles) {
        const Klass = WithRegistry[CeloContract.SortedOracles]
        this.wrapperCache[CeloContract.SortedOracles] = new Klass(
          this.connection,
          instance as any,
          this.registry
        )
      } else if (contractsWhichRequireCache.has(contract)) {
        const contractName = contract as keyof WrapperFactoriesWhichNeedCacheType
        const Klass = WrapperFactoriesWhichNeedCache[contractName]
        const wrapper = new Klass(this.connection, instance as any, this)
        this.wrapperCache[contractName] = wrapper as any
      } else {
        const simpleContractName = contract as keyof typeof WrapperFactories
        const Klass = WrapperFactories[simpleContractName]
        this.wrapperCache[simpleContractName] = new Klass(this.connection, instance as any) as any
      }
    }
    return this.wrapperCache[contract]!
  }

  public invalidateContract<C extends ValidWrappers>(contract: C) {
    this._web3Contracts.invalidateContract(contract)
    this.wrapperCache[contract] = undefined
  }
}
