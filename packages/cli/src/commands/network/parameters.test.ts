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
          "stableTokens: 
        cUSD: 
          name: Celo Dollar
          symbol: cUSD
          decimals: 18
        cEUR: 
          name: Celo Euro
          symbol: cEUR
          decimals: 18
        cREAL: 
          name: Celo Brazilian Real
          symbol: cREAL
          decimals: 18
      Election: 
        electableValidators: 
          min: 10 
          max: 100 
        electabilityThreshold: 0.001 
        maxNumGroupsVotedFor: 10 
        totalVotes: 0 
        currentThreshold: 0 
      Attestations: 
        attestationRequestFees: 
          0: 
            fee: 0 
            address: 0x04B5dAdd2c0D6a261bfafBc964E0cAc48585dEF3
          1: 
            fee: 50000000000000000 (~5.000e+16)
            address: 0x5315e44798395d4a952530d131249fE00f554565
          2: 
            fee: 0 
            address: 0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8
          3: 
            fee: 0 
            address: 0x965D352283a3C8A016b9BBbC9bf6306665d495E7
        attestationExpiry: 1 hour
      Governance: 
        concurrentProposals: 5 
        dequeueFrequency: 30 seconds
        minDeposit: 1000000000000000000 (~1.000e+18)
        queueExpiry: 16 minutes, 40 seconds
        stageDurations: 
          Referendum: 1 minute, 40 seconds
          Execution: 1 minute, 40 seconds
        participationParameters: 
          baseline: 0.005 
          baselineFloor: 0.01 
          baselineUpdateFactor: 0.2 
          baselineQuorumFactor: 1 
      LockedGold: 
        unlockingPeriod: 3 days
        totalLockedGold: 0 
      SortedOracles: 
        reportExpiry: 5 minutes
      GasPriceMinimum: 
        gasPriceMinimum: 100000000 (~1.000e+8)
        targetDensity: 0.5 
        adjustmentSpeed: 0.5 
      Reserve: 
        tobinTaxStalenessThreshold: 3153600000 (~3.154e+9)
        frozenReserveGoldStartBalance: 0 
        frozenReserveGoldStartDay: 19787 (~1.979e+4)
        frozenReserveGoldDays: 0 
        otherReserveAddresses: 
          0: 0x91c987bf62D25945dB517BDAa840A6c661374402
          1: 0x298FbD6dad2Fc2cB56d7E37d8aCad8Bf07324f67
      Validators: 
        validatorLockedGoldRequirements: 
          value: 10000000000000000000000 (~1.000e+22)
          duration: 2 months
        groupLockedGoldRequirements: 
          value: 10000000000000000000000 (~1.000e+22)
          duration: 6 months
        maxGroupSize: 5 
        membershipHistoryLength: 60 
        slashingMultiplierResetPeriod: 1 month
        commissionUpdateDelay: 15 seconds
        downtimeGracePeriod: 0 
      DowntimeSlasher: 
        slashableDowntime: 5 minutes
        slashingIncentives: 
          reward: 10000000000000000000 (~1.000e+19)
          penalty: 100000000000000000000 (~1.000e+20)
      BlockchainParameters: 
        blockGasLimit: 20000000 (~2.000e+7)
        intrinsicGasForAlternativeFeeCurrency: 50000 (~5.000e+4)
      EpochRewards: 
        rewardsMultiplier: 
          max: 2 
          underspendAdjustment: 0.5 
          overspendAdjustment: 5 
        carbonOffsetting: 
          factor: 0.001 
          partner: 0x0000000000000000000000000000000000000000
        communityReward: 0.25 
        targetVotingYield: 
          target: 0 
          max: 0.0005 
          adjustment: 0 
        targetValidatorEpochPayment: 205479452054794520547 (~2.055e+20)",
        ],
      ]
    `)
  })
})
