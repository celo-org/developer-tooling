import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Parameters from './parameters'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('network:parameters', (web3) => {
  test('runs', async () => {
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
        targetCeloDistribution: 
          carbonFundTargetRewards: 1630561881331915208293
          communityTargetRewards: 407640470332978802073415
          targetCeloDistribution: 612754949032214310717281708
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
          0x0c6a0fde0A72bA3990870f0F99ED79a821703474: 21000 (~2.100e+4)
          0x603931FF5E63d2fd3EEF1513a55fB773d8082195: 21000 (~2.100e+4)
          0x82398F079D742F9D0Ae71ef8C99E5c68b2eD6705: 21000 (~2.100e+4)
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
        frozenReserveGoldStartDay: 19927 (~1.993e+4)
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
