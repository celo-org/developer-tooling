import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { stripAnsiCodesFromNestedArray, testLocally } from '../../test-utils/cliUtils'
import Parameters from './parameters'
process.env.NO_SYNCCHECK = 'true'

testWithGanache('network:parameters', () => {
  test('runs', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocally(Parameters, [])
    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Attestations: 
        attestationExpiry: 1 hour
        attestationRequestFees: 
          0: 
            address: 0x04B5dAdd2c0D6a261bfafBc964E0cAc48585dEF3
            fee: 0 
          1: 
            address: 0x5315e44798395d4a952530d131249fE00f554565
            fee: 50000000000000000 (~5.000e+16)
          2: 
            address: 0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8
            fee: 0 
          3: 
            address: 0x965D352283a3C8A016b9BBbC9bf6306665d495E7
            fee: 0 
      BlockchainParameters: 
        blockGasLimit: 20000000 (~2.000e+7)
        intrinsicGasForAlternativeFeeCurrency: 50000 (~5.000e+4)
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
          min: 10 
        maxNumGroupsVotedFor: 10 
        totalVotes: 0 
      EpochRewards: 
        carbonOffsetting: 
          factor: 0.001 
          partner: 0x0000000000000000000000000000000000000000
        communityReward: 0.25 
        rewardsMultiplier: 
          max: 2 
          overspendAdjustment: 5 
          underspendAdjustment: 0.5 
        targetValidatorEpochPayment: 205479452054794520547 (~2.055e+20)
        targetVotingYield: 
          adjustment: 0 
          max: 0.0005 
          target: 0 
      GasPriceMinimum: 
        adjustmentSpeed: 0.5 
        gasPriceMinimum: 100000000 (~1.000e+8)
        targetDensity: 0.5 
      Governance: 
        concurrentProposals: 5 
        dequeueFrequency: 30 seconds
        minDeposit: 1000000000000000000 (~1.000e+18)
        participationParameters: 
          baseline: 0.005 
          baselineFloor: 0.01 
          baselineQuorumFactor: 1 
          baselineUpdateFactor: 0.2 
        queueExpiry: 16 minutes, 40 seconds
        stageDurations: 
          Execution: 1 minute, 40 seconds
          Referendum: 1 minute, 40 seconds
      LockedGold: 
        totalLockedGold: 0 
        unlockingPeriod: 3 days
      Reserve: 
        frozenReserveGoldDays: 0 
        frozenReserveGoldStartBalance: 0 
        frozenReserveGoldStartDay: 19787 (~1.979e+4)
        otherReserveAddresses: 
          0: 0x91c987bf62D25945dB517BDAa840A6c661374402
          1: 0x298FbD6dad2Fc2cB56d7E37d8aCad8Bf07324f67
        tobinTaxStalenessThreshold: 3153600000 (~3.154e+9)
      SortedOracles: 
        reportExpiry: 5 minutes
      Validators: 
        commissionUpdateDelay: 15 seconds
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
