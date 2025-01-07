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
          "DowntimeSlasher: 
        slashableDowntime: 5 minutes
        slashingIncentives: 
          penalty: 100000000000000000000 (~1.000e+20)
          reward: 10000000000000000000 (~1.000e+19)
      Election: 
        currentThreshold: 60000000000000000000 (~6.000e+19)
        electabilityThreshold: 0.001 
        electableValidators: 
          max: 110 
          min: 1 
        maxNumGroupsVotedFor: 10 
        totalVotes: 60000000000000000000000 (~6.000e+22)
      EpochManager: 
        currentEpochNumber: 4
        epochDuration: 86400
        isTimeForNextEpoch: false
      FeeCurrencyDirectory: 
        intrinsicGasForAlternativeFeeCurrency: 
          0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1: 21000 (~2.100e+4)
          0x5930519559Ffa7528a00BE445734036471c443a2: 21000 (~2.100e+4)
          0xB2Fd9852Ca3D69678286A8635d661690906A3E9d: 21000 (~2.100e+4)
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
        totalLockedGold: 120000000000000000000000 (~1.200e+23)
        unlockingPeriod: 6 hours
      Reserve: 
        frozenReserveGoldDays: 0 
        frozenReserveGoldStartBalance: 0 
        frozenReserveGoldStartDay: 20077 (~2.008e+4)
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
        maxGroupSize: 2 
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
