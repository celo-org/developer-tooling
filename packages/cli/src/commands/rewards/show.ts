import { Address } from '@celo/connect'
import { GroupVoterReward, VoterReward } from '@celo/contractkit/lib/wrappers/Election'
import { AccountSlashed } from '@celo/contractkit/lib/wrappers/LockedGold'
import { Validator, ValidatorReward } from '@celo/contractkit/lib/wrappers/Validators'
import { eqAddress } from '@celo/utils/lib/address'
import { Flags, ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { CustomFlags } from '../../utils/command'
import { ViewCommmandFlags } from '../../utils/flags'

interface ExplainedVoterReward extends VoterReward {
  validators: Validator[]
}

interface ExplainedGroupVoterReward extends GroupVoterReward {
  validators: Validator[]
}

export default class Show extends BaseCommand {
  static description =
    'Show rewards information about a voter, registered Validator, or Validator Group'

  static flags = {
    ...ViewCommmandFlags,
    estimate: Flags.boolean({
      description: 'Estimate voter rewards from current votes',
    }),
    voter: CustomFlags.address({ description: 'Voter to show rewards for' }),
    validator: CustomFlags.address({ description: 'Validator to show rewards for' }),
    group: CustomFlags.address({
      description: 'Validator Group to show rewards for',
    }),

    epochs: Flags.integer({
      default: 1,
      description: 'Show results for the last N epochs',
    }),
    ...(ux.table.flags() as object),
  }

  static args = {}

  static examples = ['show --voter 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Show)
    const filter =
      Boolean(res.flags.voter) || Boolean(res.flags.validator) || Boolean(res.flags.group)
    const election = await kit.contracts.getElection()
    const validators = await kit.contracts.getValidators()
    const lockedGold = await kit.contracts.getLockedGold()
    const epochManager = await kit.contracts.getEpochManager()
    const scoreManager = await kit.contracts.getScoreManager()
    const currentEpoch = await epochManager.getCurrentEpochNumber()
    const checkBuilder = newCheckBuilder(this)
    const epochs = Math.max(1, res.flags.epochs || 1)

    if (res.flags.validator) {
      if (res.flags.voter || res.flags.group) {
        throw new Error('Cannot select --validator with --voter or --group')
      }
      checkBuilder.isValidator(res.flags.validator)
    }
    if (res.flags.group) {
      checkBuilder.isValidatorGroup(res.flags.group)
    }
    if (res.flags.voter) {
      checkBuilder.isAccount(res.flags.voter)
    }
    await checkBuilder.runChecks()

    let voterRewards: ExplainedVoterReward[] = []
    let groupVoterRewards: ExplainedGroupVoterReward[] = []
    let validatorRewards: ValidatorReward[] = []
    let validatorGroupRewards: ValidatorReward[] = []
    let accountsSlashed: AccountSlashed[] = []

    ux.action.start(`Calculating rewards`)
    // Accumulate the rewards from each epoch
    for (
      let epochNumber = Math.max(0, currentEpoch - epochs);
      epochNumber < currentEpoch;
      epochNumber++
    ) {
      if (!filter || res.flags.voter) {
        const electedValidators = (await Promise.all(
          (
            await epochManager!.getElectedSigners()
          ).map(async (x) => ({
            address: x,
            score: await scoreManager.getValidatorScore(x),
          }))
        )) as Validator[]

        if (!filter) {
          const useBlockNumber = !res.flags.estimate
          try {
            const epochGroupVoterRewards = await election.getGroupVoterRewards(
              epochNumber,
              useBlockNumber
            )
            groupVoterRewards = groupVoterRewards.concat(
              epochGroupVoterRewards.map(
                (e: GroupVoterReward): ExplainedGroupVoterReward => ({
                  ...e,
                  validators: filterValidatorsByGroup(electedValidators, e.group.address),
                })
              )
            )
          } catch (err) {
            throw decorateMissingTrieError(err)
          }
        } else if (res.flags.voter) {
          const address = res.flags.voter
          try {
            const epochVoterRewards = await election.getVoterRewards(
              address,
              epochNumber,
              !res.flags.estimate,
              res.flags.estimate ? await election.getVoterShare(address) : undefined
            )
            voterRewards = voterRewards.concat(
              epochVoterRewards.map(
                (e: VoterReward): ExplainedVoterReward => ({
                  ...e,
                  validators: filterValidatorsByGroup(electedValidators, e.group.address),
                })
              )
            )
          } catch (error) {
            throw decorateMissingTrieError(error)
          }
        }
      }
      if (!filter || res.flags.validator || res.flags.group) {
        const useBlockNumber = !res.flags.estimate
        try {
          const epochValidatorRewards: ValidatorReward[] = await validators.getValidatorRewards(
            epochNumber,
            useBlockNumber
          )

          if (!filter || res.flags.validator) {
            const address = res.flags.validator
            validatorRewards = validatorRewards.concat(
              address
                ? epochValidatorRewards.filter((e: ValidatorReward) =>
                    eqAddress(e.validator.address, address)
                  )
                : epochValidatorRewards
            )
          }

          if (!filter || res.flags.group) {
            const address = res.flags.group
            validatorGroupRewards = validatorGroupRewards.concat(
              address
                ? epochValidatorRewards.filter((e: ValidatorReward) =>
                    eqAddress(e.group.address, address)
                  )
                : epochValidatorRewards
            )
          }
        } catch (error) {
          throw decorateMissingTrieError(error)
        }
      }

      if (res.flags.slashing) {
        const epochAccountsSlashed = await lockedGold.getAccountsSlashed(epochNumber)
        const address = res.flags.voter || res.flags.validator || res.flags.group
        accountsSlashed = accountsSlashed.concat(
          address ? filterAccountsSlashed(epochAccountsSlashed, address) : epochAccountsSlashed
        )
      }
    }

    // Slashing rewards are available before the current epoch ends
    if (res.flags.slashing) {
      const epochAccountsSlashed = await lockedGold.getAccountsSlashed(currentEpoch)
      const address = res.flags.voter || res.flags.validator || res.flags.group
      accountsSlashed = accountsSlashed.concat(
        address ? filterAccountsSlashed(epochAccountsSlashed, address) : epochAccountsSlashed
      )
    }

    ux.action.stop()

    // At the end of each epoch: R, the total amount of rewards in celo to be allocated to stakers
    // for this epoch is programmatically derived from considering the tradeoff between paying rewards
    // now vs. saving rewards for later.
    //
    // Every validator group has a slashing penalty M, initially M=1.0. All rewards to the group and to
    // voters for the group are weighted by this factor.
    //
    // Let T be the total celo voting for groups eligible for rewards in this epoch. For each account
    // holder, for each group, the amount of celo the account holder has voting for that group is increased
    // by average_epoch_score_of_elected_validators_in_group * account_gold_voting_for_group * R * M / T.
    if (voterRewards.length > 0) {
      console.info('')
      console.info('Voter rewards:')
      ux.table(
        voterRewards.map((vr) => ({ group: vr })),
        {
          address: { get: ({ group }) => group.address },
          addressPayment: {
            get: (e) => e.group.addressPayment.toFixed(0),
            header: 'Address Payment',
          },
          group: { get: (e) => e.group.address },
          averageValidatorScore: {
            get: (e) => averageValidatorScore(e.group.validators).toFixed(),
            header: 'Avg Validator Score',
          },
          epochNumber: {},
        },
        res.flags
      )
    } else if (groupVoterRewards.length > 0) {
      console.info('')
      console.info('Group voter rewards:')
      ux.table(
        groupVoterRewards.map((vr) => ({ group: vr })),
        {
          groupName: { get: (e) => e.group.group.name },
          group: { get: (e) => e.group.group.address },
          groupVoterPayment: {
            get: (e) => e.group.groupVoterPayment.toFixed(0),
            header: 'Group Voter Payment',
          },
          averageValidatorScore: {
            get: (e) => averageValidatorScore(e.group.validators).toFixed(),
            header: 'Avg Validator Score',
          },
          epochNumber: {},
        },
        res.flags
      )
    }

    // Each validator maintains a running validator score Sv:
    //
    // - At the end of an epoch, if a validator was elected, define its uptime:
    //   U = counter / (blocks_in_epoch - [9])
    //
    // - Define the validator’s epoch score:
    //   Sve = U ^ k, where k is governable.
    //
    // - If the validator is elected, Sv = min(Sve, Sve * x + Sv-1 * (1 -x)) where 0 < x < 1 and is
    //   governable. Otherwise, Sv = Sv-1
    //
    // At the end of each epoch, provided that the validator and its group have the required minimum
    // stake, Validators are paid Pv * Sv * M * (1 - C) Celo Dollars where
    // C is group share for the group the validator was a member of when it was elected and
    // Pv is the max payout to validators and is governable.
    if (validatorRewards.length > 0) {
      console.info('')
      console.info('Validator rewards:')
      ux.table(
        validatorRewards.map((vr) => ({ vr })),
        {
          validatorName: { get: ({ vr }) => vr.validator.name },
          validator: { get: ({ vr }) => vr.validator.address },
          validatorPayment: { get: ({ vr }) => vr.validatorPayment.toFixed(0) },
          validatorScore: { get: ({ vr }) => vr.validator.score.toFixed() },
          group: { get: ({ vr }) => vr.group.address },
          epochNumber: {},
        },
        res.flags
      )
    }

    // At the end of each epoch, for each validator that was elected, the group a validator was
    // elected as a member of is paid Pv * Sv * C * M Celo Dollars where:
    // C is the current group share for the group the validator was a member of when it was elected,
    // Pv is the max payout to validators during this epoch programmatically derived from
    // considering the tradeoff between paying rewards now vs. saving rewards for later, and
    // M is the group’s current slashing penalty (M=1 initially, 0<M<=1)
    if (validatorGroupRewards.length > 0) {
      console.info('')
      console.info('Validator Group rewards:')
      ux.table(
        validatorGroupRewards.map((vgr) => ({ vgr })),
        {
          groupName: { get: (e) => e.vgr.group.name },
          group: { get: (e) => e.vgr.group.address },
          groupPayment: { get: (e) => e.vgr.groupPayment.toFixed(0) },
          validator: { get: (e) => e.vgr.validator.address },
          validatorScore: { get: (e) => e.vgr.validator.score.toFixed() },
          epochNumber: {},
        },
        res.flags
      )
    }

    if (accountsSlashed.length > 0) {
      console.info('')
      console.info('Slashing penalties and rewards:')
      ux.table(
        accountsSlashed.map((slashed) => ({ account: slashed })),
        {
          slashed: {},
          penalty: { get: ({ account }) => account.penalty.toFixed(0) },
          reporter: {},
          reward: { get: ({ account }) => account.reward.toFixed(0) },
          epochNumber: {},
        },
        res.flags
      )
    }

    if (
      voterRewards.length === 0 &&
      groupVoterRewards.length === 0 &&
      validatorRewards.length === 0 &&
      validatorGroupRewards.length === 0 &&
      accountsSlashed.length === 0
    ) {
      console.info('No rewards.')
    }
  }
}

function decorateMissingTrieError(error: unknown) {
  return (error as Error).message.includes('missing trie node')
    ? new Error(
        'Exact voter information is available only for 1024 blocks after each epoch.\n' +
          'Supply --estimate to estimate rewards based on current votes, or use an archive node.'
      )
    : (error as Error)
}

function filterValidatorsByGroup(validators: Validator[], group: Address) {
  return validators.filter((v) => eqAddress(v.affiliation || '', group))
}

function averageValidatorScore(validators: Validator[]): BigNumber {
  return validators
    .reduce((sumScore: BigNumber, v: Validator) => sumScore.plus(v.score), new BigNumber(0))
    .dividedBy(validators.length || 1)
}

function filterAccountsSlashed(accountsSlashed: AccountSlashed[], address: Address) {
  return accountsSlashed.filter(
    (e: AccountSlashed) => eqAddress(e.slashed, address) || eqAddress(e.reporter, address)
  )
}
