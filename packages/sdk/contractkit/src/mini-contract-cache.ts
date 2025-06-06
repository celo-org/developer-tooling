import { newAccounts } from '@celo/abis/web3/Accounts'
import { newGoldToken } from '@celo/abis/web3/GoldToken'
import { newStableToken } from '@celo/abis/web3/mento/StableToken'
import { newStableTokenBRL } from '@celo/abis/web3/mento/StableTokenBRL'
import { newStableTokenEUR } from '@celo/abis/web3/mento/StableTokenEUR'
import { StableToken } from '@celo/base'
import { Connection } from '@celo/connect'
import { AddressRegistry } from './address-registry'
import { CeloContract } from './base'
import { ContractCacheType } from './basic-contract-cache-type'
import { stableTokenInfos } from './celo-tokens'
import { AccountsWrapper } from './wrappers/Accounts'
import { GoldTokenWrapper } from './wrappers/GoldTokenWrapper'
import { StableTokenWrapper } from './wrappers/StableTokenWrapper'

const MINIMUM_CONTRACTS = {
  [CeloContract.Accounts]: {
    newInstance: newAccounts,
    wrapper: AccountsWrapper,
  },
  [CeloContract.CeloToken]: {
    newInstance: newGoldToken,
    wrapper: GoldTokenWrapper,
  },
  [CeloContract.StableToken]: {
    newInstance: newStableToken,
    wrapper: StableTokenWrapper,
  },
  [CeloContract.StableTokenBRL]: {
    newInstance: newStableTokenBRL,
    wrapper: StableTokenWrapper,
  },
  [CeloContract.StableTokenEUR]: {
    newInstance: newStableTokenEUR,
    wrapper: StableTokenWrapper,
  },
}

export type ContractsBroughtBase = typeof MINIMUM_CONTRACTS

type Keys = keyof ContractsBroughtBase

type Wrappers<T extends Keys> = InstanceType<ContractsBroughtBase[T]['wrapper']>

const contractsWhichRequireCache = new Set([
  CeloContract.Attestations,
  CeloContract.Election,
  CeloContract.Governance,
  CeloContract.LockedCelo,
  CeloContract.Validators,
])

/**
 * Alternative Contract Cache with Minimal Contracts
 *
 * Provides access to a subset of wrappers: {@link AccountsWrapper}, {@link GasPriceMinimumWrapper} and Celo Token contracts
 * Used internally by {@link MiniContractKit}
 *
 * @param connection – {@link Connection}
 * @param registry – {@link AddressRegistry}
 */

export class MiniContractCache implements ContractCacheType {
  private cache: Map<keyof ContractsBroughtBase, any> = new Map()

  constructor(
    readonly connection: Connection,
    readonly registry: AddressRegistry,
    private readonly contractClasses: ContractsBroughtBase = MINIMUM_CONTRACTS
  ) {}

  getAccounts(): Promise<AccountsWrapper> {
    return this.getContract(CeloContract.Accounts)
  }

  getGoldToken(): Promise<GoldTokenWrapper> {
    return this.getContract(CeloContract.CeloToken)
  }

  getStableToken(stableToken: StableToken = StableToken.cUSD): Promise<StableTokenWrapper> {
    return this.getContract(stableTokenInfos[stableToken].contract)
  }

  /**
   * Get Contract wrapper
   */
  public async getContract<ContractKey extends keyof ContractsBroughtBase>(
    contract: ContractKey,
    address?: string
  ): Promise<Wrappers<ContractKey>> {
    if (!this.isContractAvailable(contract)) {
      throw new Error(
        `This instance of MiniContracts was not given a mapping for ${contract}. Either add it or use WrapperCache for full set of contracts`
      )
    }

    if (contractsWhichRequireCache.has(contract)) {
      throw new Error(
        `${contract} cannot be used with MiniContracts as it requires an instance of WrapperCache to be passed in as an argument`
      )
    }

    if (this.cache.get(contract) == null || address !== undefined) {
      await this.setContract<ContractKey>(contract, address)
    }
    return this.cache.get(contract)! as Wrappers<ContractKey>
  }

  private async setContract<ContractKey extends keyof ContractsBroughtBase>(
    contract: ContractKey,
    address: string | undefined
  ) {
    if (!address) {
      address = await this.registry.addressFor(contract)
    }

    const classes = this.contractClasses[contract]

    const instance = classes.newInstance(this.connection.web3, address)

    const Klass = classes.wrapper as ContractsBroughtBase[ContractKey]['wrapper']
    const wrapper = new Klass(this.connection, instance as any)

    this.cache.set(contract, wrapper)
  }

  public invalidateContract<C extends keyof ContractsBroughtBase>(contract: C) {
    this.cache.delete(contract)
  }

  private isContractAvailable(contract: keyof ContractsBroughtBase) {
    return !!this.contractClasses[contract]
  }
}
