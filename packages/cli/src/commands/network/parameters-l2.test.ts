import { CeloDistributionScheduleWrapper } from '@celo/contractkit/lib/wrappers/CeloDistributionScheduleWrapper'
import { setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Parameters from './parameters'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('network:parameters', (web3) => {
  test('runs', async () => {
    await setupL2(web3)

    jest
      .spyOn(CeloDistributionScheduleWrapper.prototype, 'getConfig')
      .mockImplementation(async () => {
        return {
          carbonOffsetting: {
            fraction: '1000000000000000000000',
            partner: '0x0000000000000000000000000000000000000003',
          },
          communityReward: {
            fraction: '250000000000000000000000',
            fund: '0xA2e328097D5805e37414fbF80F43D71c9B588F23',
          },
          distributableAmount: '409271032214310717281708',
          targetCeloTotalSupply: {
            carbonFundTargetRewards: '1630561881331915208293',
            communityTargetRewards: '407640470332978802073415',
            targetCeloTotalSupply: '612754949032214310717281708',
          },
        }
      })

    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(Parameters, [], web3)
    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "CeloDistributionSchedule: 
        carbonOffsetting: 
          fraction: 1000000000000000000000
          partner: 0x0000000000000000000000000000000000000003
        communityReward: 
          fraction: 250000000000000000000000
          fund: 0xA2e328097D5805e37414fbF80F43D71c9B588F23
        distributableAmount: 409271032214310717281708
        targetCeloTotalSupply: 
          carbonFundTargetRewards: 1630561881331915208293
          communityTargetRewards: 407640470332978802073415
          targetCeloTotalSupply: 612754949032214310717281708
      DowntimeSlasher: 
        slashableDowntime: 5 minutes
        slashingIncentives: 
          penalty: 100000000000000000000 (~1.000e+20)
          reward: 10000000000000000000 (~1.000e+19)
      Election: 
        currentThreshold: 0 
        electabilityThreshold: 0.001 
        electableValidators: 
          max: 100 
          min: 1 
        maxNumGroupsVotedFor: 10 
        totalVotes: 0 
      FeeCurrencyDirectory: 
        intrinsicGasForAlternativeFeeCurrency: 
          0x4CB77DF8f44817DE26D2dE10813e98dd0aA6AE00: 21000 (~2.100e+4)
          0x4E2EE025A14c76020D24a511AC1Ce7755537fACf: 21000 (~2.100e+4)
          0x5428F291b5d2555EA47EEaec4a12E434CF267cd2: 21000 (~2.100e+4)
      Governance: 
        concurrentProposals: 3 
        dequeueFrequency: 4 hours
        minDeposit: 100000000000000000000 (~1.000e+20)
        participationParameters: 
          baseline: 0.005 
          baselineFloor: 0.01 
          baselineQuorumFactor: 1 
          baselineUpdateFactor: 0.2 
        queueExpiry: 4 weeks
        stageDurations: 
          Execution: 1 week
          Referendum: 1 day
      LockedGold: 
        totalLockedGold: 60000000000000000000000 (~6.000e+22)
        unlockingPeriod: 6 hours
      Reserve: 
        frozenReserveGoldDays: 0 
        frozenReserveGoldStartBalance: 0 
        frozenReserveGoldStartDay: 19899 (~1.990e+4)
        otherReserveAddresses: 

        tobinTaxStalenessThreshold: 3153600000 (~3.154e+9)
      SortedOracles: 
        reportExpiry: 5 minutes
      Validators: 
        commissionUpdateDelay: 3 days
        downtimeGracePeriod: 0 
        groupLockedGoldRequirements: 
          duration: 6 months
          value: 10000000000000000000000 (~1.000e+22)
        maxGroupSize: 5 
        membershipHistoryLength: 60 
        slashingMultiplierResetPeriod: 1 month
        validatorLockedGoldRequirements: 
          duration: 2 months
          value: 10000000000000000000000 (~1.000e+22)",
        ],
      ]
    `)
  })
})
