import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { testLocally } from '../../test-utils/cliUtils'
import Parameters from './parameters'
process.env.NO_SYNCCHECK = 'true'

testWithGanache('network:parameters', () => {
  test('runs', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocally(Parameters, [])
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[93m[1mstableTokens: [22m[39m
        [93m[1mcUSD: [22m[39m
          [93m[1mname: [22m[39mCelo Dollar
          [93m[1msymbol: [22m[39mcUSD
          [93m[1mdecimals: [22m[39m18
        [93m[1mcEUR: [22m[39m
          [93m[1mname: [22m[39mCelo Euro
          [93m[1msymbol: [22m[39mcEUR
          [93m[1mdecimals: [22m[39m18
        [93m[1mcREAL: [22m[39m
          [93m[1mname: [22m[39mCelo Brazilian Real
          [93m[1msymbol: [22m[39mcREAL
          [93m[1mdecimals: [22m[39m18
      [93m[1mElection: [22m[39m
        [93m[1melectableValidators: [22m[39m
          [93m[1mmin: [22m[39m10 
          [93m[1mmax: [22m[39m100 
        [93m[1melectabilityThreshold: [22m[39m0.001 
        [93m[1mmaxNumGroupsVotedFor: [22m[39m10 
        [93m[1mtotalVotes: [22m[39m0 
        [93m[1mcurrentThreshold: [22m[39m0 
      [93m[1mAttestations: [22m[39m
        [93m[1mattestationRequestFees: [22m[39m
          [93m[1m0: [22m[39m
            [93m[1mfee: [22m[39m0 
            [93m[1maddress: [22m[39m0x04B5dAdd2c0D6a261bfafBc964E0cAc48585dEF3
          [93m[1m1: [22m[39m
            [93m[1mfee: [22m[39m50000000000000000 (~5.000e+16)
            [93m[1maddress: [22m[39m0x5315e44798395d4a952530d131249fE00f554565
          [93m[1m2: [22m[39m
            [93m[1mfee: [22m[39m0 
            [93m[1maddress: [22m[39m0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8
          [93m[1m3: [22m[39m
            [93m[1mfee: [22m[39m0 
            [93m[1maddress: [22m[39m0x965D352283a3C8A016b9BBbC9bf6306665d495E7
        [93m[1mattestationExpiry: [22m[39m1 hour
      [93m[1mGovernance: [22m[39m
        [93m[1mconcurrentProposals: [22m[39m5 
        [93m[1mdequeueFrequency: [22m[39m30 seconds
        [93m[1mminDeposit: [22m[39m1000000000000000000 (~1.000e+18)
        [93m[1mqueueExpiry: [22m[39m16 minutes, 40 seconds
        [93m[1mstageDurations: [22m[39m
          [93m[1mReferendum: [22m[39m1 minute, 40 seconds
          [93m[1mExecution: [22m[39m1 minute, 40 seconds
        [93m[1mparticipationParameters: [22m[39m
          [93m[1mbaseline: [22m[39m0.005 
          [93m[1mbaselineFloor: [22m[39m0.01 
          [93m[1mbaselineUpdateFactor: [22m[39m0.2 
          [93m[1mbaselineQuorumFactor: [22m[39m1 
      [93m[1mLockedGold: [22m[39m
        [93m[1munlockingPeriod: [22m[39m3 days
        [93m[1mtotalLockedGold: [22m[39m0 
      [93m[1mSortedOracles: [22m[39m
        [93m[1mreportExpiry: [22m[39m5 minutes
      [93m[1mGasPriceMinimum: [22m[39m
        [93m[1mgasPriceMinimum: [22m[39m100000000 (~1.000e+8)
        [93m[1mtargetDensity: [22m[39m0.5 
        [93m[1madjustmentSpeed: [22m[39m0.5 
      [93m[1mReserve: [22m[39m
        [93m[1mtobinTaxStalenessThreshold: [22m[39m3153600000 (~3.154e+9)
        [93m[1mfrozenReserveGoldStartBalance: [22m[39m0 
        [93m[1mfrozenReserveGoldStartDay: [22m[39m19787 (~1.979e+4)
        [93m[1mfrozenReserveGoldDays: [22m[39m0 
        [93m[1motherReserveAddresses: [22m[39m
          [93m[1m0: [22m[39m0x91c987bf62D25945dB517BDAa840A6c661374402
          [93m[1m1: [22m[39m0x298FbD6dad2Fc2cB56d7E37d8aCad8Bf07324f67
      [93m[1mValidators: [22m[39m
        [93m[1mvalidatorLockedGoldRequirements: [22m[39m
          [93m[1mvalue: [22m[39m10000000000000000000000 (~1.000e+22)
          [93m[1mduration: [22m[39m2 months
        [93m[1mgroupLockedGoldRequirements: [22m[39m
          [93m[1mvalue: [22m[39m10000000000000000000000 (~1.000e+22)
          [93m[1mduration: [22m[39m6 months
        [93m[1mmaxGroupSize: [22m[39m5 
        [93m[1mmembershipHistoryLength: [22m[39m60 
        [93m[1mslashingMultiplierResetPeriod: [22m[39m1 month
        [93m[1mcommissionUpdateDelay: [22m[39m15 seconds
        [93m[1mdowntimeGracePeriod: [22m[39m0 
      [93m[1mDowntimeSlasher: [22m[39m
        [93m[1mslashableDowntime: [22m[39m5 minutes
        [93m[1mslashingIncentives: [22m[39m
          [93m[1mreward: [22m[39m10000000000000000000 (~1.000e+19)
          [93m[1mpenalty: [22m[39m100000000000000000000 (~1.000e+20)
      [93m[1mBlockchainParameters: [22m[39m
        [93m[1mblockGasLimit: [22m[39m20000000 (~2.000e+7)
        [93m[1mintrinsicGasForAlternativeFeeCurrency: [22m[39m50000 (~5.000e+4)
      [93m[1mEpochRewards: [22m[39m
        [93m[1mrewardsMultiplier: [22m[39m
          [93m[1mmax: [22m[39m2 
          [93m[1munderspendAdjustment: [22m[39m0.5 
          [93m[1moverspendAdjustment: [22m[39m5 
        [93m[1mcarbonOffsetting: [22m[39m
          [93m[1mfactor: [22m[39m0.001 
          [93m[1mpartner: [22m[39m0x0000000000000000000000000000000000000000
        [93m[1mcommunityReward: [22m[39m0.25 
        [93m[1mtargetVotingYield: [22m[39m
          [93m[1mtarget: [22m[39m0 
          [93m[1mmax: [22m[39m0.0005 
          [93m[1madjustment: [22m[39m0 
        [93m[1mtargetValidatorEpochPayment: [22m[39m205479452054794520547 (~2.055e+20)",
        ],
      ]
    `)
  })
})
