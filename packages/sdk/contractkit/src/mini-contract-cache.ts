import {
  accountsABI,
  goldTokenABI,
  stableTokenABI,
  stableTokenBrlABI,
  stableTokenEurABI,
} from '@celo/abis'
import { StableToken } from '@celo/base'
import { AbiItem, Connection } from '@celo/connect'
import { AddressRegistry } from './address-registry'
import { CeloContract } from './base'
import { ContractCacheType } from './basic-contract-cache-type'
import { stableTokenInfos } from './celo-tokens'
import { AccountsWrapper } from './wrappers/Accounts'
import { GoldTokenWrapper } from './wrappers/GoldTokenWrapper'
import { StableTokenWrapper } from './wrappers/StableTokenWrapper'

interface MinContractEntry {
  abi: readonly any[]
  wrapper: new (connection: Connection, contract: any) => any
}

const MINIMUM_CONTRACTS: Record<string, MinContractEntry> = {
  [CeloContract.Accounts]: {
    abi: accountsABI,
    wrapper: AccountsWrapper,
  },
  [CeloContract.CeloToken]: {
    abi: goldTokenABI,
    wrapper: GoldTokenWrapper,
  },
  [CeloContract.StableToken]: {
    abi: stableTokenABI,
    wrapper: StableTokenWrapper,
  },
  [CeloContract.StableTokenBRL]: {
    abi: stableTokenBrlABI,
    wrapper: StableTokenWrapper,
  },
  [CeloContract.StableTokenEUR]: {
    abi: stableTokenEurABI,
    wrapper: StableTokenWrapper,
  },
}

export type ContractsBroughtBase = typeof MINIMUM_CONTRACTS

type Keys = keyof ContractsBroughtBase

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
  private cache: Map<string, any> = new Map()

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

  getStableToken(stableToken: StableToken = StableToken.USDm): Promise<StableTokenWrapper> {
    return this.getContract(stableTokenInfos[stableToken].contract)
  }

  /**
   * Get Contract wrapper
   */
  public async getContract(contract: Keys, address?: string): Promise<any> {
    if (!this.isContractAvailable(contract)) {
      throw new Error(
        `This instance of MiniContracts was not given a mapping for ${String(contract)}. Either add it or use WrapperCache for full set of contracts`
      )
    }

    if (contractsWhichRequireCache.has(contract as CeloContract)) {
      throw new Error(
        `${String(contract)} cannot be used with MiniContracts as it requires an instance of WrapperCache to be passed in as an argument`
      )
    }

    if (this.cache.get(contract as string) == null || address !== undefined) {
      await this.setContract(contract, address)
    }
    return this.cache.get(contract as string)!
  }

  private async setContract(contract: Keys, address: string | undefined) {
    if (!address) {
      address = await this.registry.addressFor(contract as CeloContract)
    }

    const classes = this.contractClasses[contract as string]

    const instance = this.connection.getCeloContract(classes.abi as AbiItem[], address)

    const Klass = classes.wrapper
    const wrapper = new Klass(this.connection, instance)

    this.cache.set(contract as string, wrapper)
  }

  public invalidateContract(contract: Keys) {
    this.cache.delete(contract as string)
  }

  private isContractAvailable(contract: Keys) {
    return !!this.contractClasses[contract as string]
  }
}
