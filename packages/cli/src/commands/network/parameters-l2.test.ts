import { setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Parameters from './parameters'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('network:parameters', (web3) => {
  test('runs', async () => {
    await setupL2(web3)
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
        currentThreshold: 0 
        electabilityThreshold: 0.001 
        electableValidators: 
          max: 100 
          min: 1 
        maxNumGroupsVotedFor: 10 
        totalVotes: 0 
      FeeCurrencyDirectory: 
        intrinsicGasForAlternativeFeeCurrency: 
          0x2A3733dBc31980f02b12135C809b5da33BF3a1e9: 21000 (~2.100e+4)
          0xb7a33b4ad2B1f6b0a944232F5c71798d27Ad9272: 21000 (~2.100e+4)
          0xe6774BE4E5f97dB10cAFB4c00C74cFbdCDc434D9: 21000 (~2.100e+4)
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
        totalLockedGold: 0 
        unlockingPeriod: 6 hours
      Reserve: 
        frozenReserveGoldDays: 0 
        frozenReserveGoldStartBalance: 0 
        frozenReserveGoldStartDay: 19877 (~1.988e+4)
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
