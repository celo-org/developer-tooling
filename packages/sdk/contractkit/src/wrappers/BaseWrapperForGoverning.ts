import { Connection, CeloContract } from '@celo/connect'
import type { AbiItem } from '@celo/connect/lib/abi-types'
import { AccountsWrapper } from './Accounts'
import { BaseWrapper } from './BaseWrapper'
import { ElectionWrapper } from './Election'
import { EpochManagerWrapper } from './EpochManager'
import { LockedGoldWrapper } from './LockedGold'
import { MultiSigWrapper } from './MultiSig'
import { ScoreManagerWrapper } from './ScoreManager'
import { ValidatorsWrapper } from './Validators'

interface ContractWrappersForVotingAndRules {
  getAccounts: () => Promise<AccountsWrapper>
  getValidators: () => Promise<ValidatorsWrapper>
  getElection: () => Promise<ElectionWrapper>
  getLockedGold: () => Promise<LockedGoldWrapper>
  getScoreManager: () => Promise<ScoreManagerWrapper>
  getMultiSig: (address: string) => Promise<MultiSigWrapper>
  getEpochManager: () => Promise<EpochManagerWrapper>
}

/** @internal */
export class BaseWrapperForGoverning<
  TAbi extends readonly unknown[] = AbiItem[],
> extends BaseWrapper<TAbi> {
  constructor(
    protected readonly connection: Connection,
    protected readonly contract: CeloContract<TAbi>,
    protected readonly contracts: ContractWrappersForVotingAndRules
  ) {
    super(connection, contract)
  }
}
