import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Parameters from './parameters'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('network:parameters', (web3: Web3) => {
  test('runs', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(Parameters, [], web3)
    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Attestations: 
      Failed to fetch config for contract Attestations: 
      Error: Attestations not (yet) registered
      BlockchainParameters: 
        blockGasLimit: 13000000 (~1.300e+7)
        intrinsicGasForAlternativeFeeCurrency: 50000 (~5.000e+4)
      DowntimeSlasher: 
        slashableDowntime: 5 minutes
        slashingIncentives: 
          penalty: 100000000000000000000 (~1.000e+20)
          reward: 10000000000000000000 (~1.000e+19)
      Election: 
        currentThreshold: 60000000000000000000 (~6.000e+19)
        electabilityThreshold: 0.001
        electableValidators: 
          max: 100
          min: 1
        maxNumGroupsVotedFor: 10
        totalVotes: 60000000000000000000000 (~6.000e+22)
      EpochRewards: 
        carbonOffsetting: 
          factor: 0.001
          partner: 0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972
        communityReward: 0.25
        rewardsMultiplier: 
          max: 2
          overspendAdjustment: 5
          underspendAdjustment: 0.5
        targetValidatorEpochPayment: 205479452054794520547 (~2.055e+20)
        targetVotingYield: 
          adjustment: 0
          max: 0.0005
          target: 0.00016
      GasPriceMinimum: 
        adjustmentSpeed: 0.5
        gasPriceMinimum: 100000000 (~1.000e+8)
        targetDensity: 0.5
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
        frozenReserveGoldStartDay: 19991 (~1.999e+4)
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
