import { StableToken } from '@celo/base'
import { CeloContract, CeloTokenContract } from './base'
import { AccountsWrapper } from './wrappers/Accounts'
import { GoldTokenWrapper, GoldTokenWrapperType } from './wrappers/GoldTokenWrapper'
import { StableTokenWrapper } from './wrappers/StableTokenWrapper'

/**
 * Interface for a class with the minimum required wrappers
 * to make a {@link MiniContractKit} or {@link CeloTokens} Class
 */
export interface ContractCacheType {
  getAccounts(): Promise<AccountsWrapper>

  getGoldToken(): Promise<GoldTokenWrapper>

  getStableToken(stableToken: StableToken): Promise<StableTokenWrapper>

  getContract(contract: CeloTokenContract): Promise<StableTokenWrapper>
  getContract(contract: CeloContract.GoldToken): Promise<GoldTokenWrapperType>
}
