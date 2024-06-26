import { setNextBlockTimestamp, setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { TEST_TIMESTAMP } from '@celo/dev-utils/lib/test-utils'
import { newKitFromWeb3 } from '../kit'

// we need a fixed number, because otherwise different values than saved in the
// snapshot are produced  as they depend on time
//
// in case the TEST_TIMESTAMP value gets updated and the test fails with
// "<timestamp> is lower than or equal to previous block's timestamp"
// then this value needs to be updated and so does the snapshot
const NEXT_BLOCK_TIMESTAMP = TEST_TIMESTAMP + 60 * 60 * 24

testWithAnvil('CeloDistributionScheduleWrapper', (web3) => {
  const kit = newKitFromWeb3(web3)

  it.failing('fetches config', async () => {
    const celoDistributionScheduleWrapper = await kit.contracts.getCeloDistributionSchedule()

    await setupL2(web3)
    await setNextBlockTimestamp(web3, NEXT_BLOCK_TIMESTAMP.toString())

    const config = await celoDistributionScheduleWrapper.getConfig()
    expect(config).toMatchInlineSnapshot(`
      {
        "carbonOffsetting": {
          "fraction": "1000000000000000000000",
          "partner": "0x0000000000000000000000000000000000000003",
        },
        "communityReward": {
          "fraction": "250000000000000000000000",
          "fund": "0xA2e328097D5805e37414fbF80F43D71c9B588F23",
        },
        "distributableAmount": "430301386703955424085104",
        "targetCeloTotalSupply": {
          "carbonFundTargetRewards": "1714348154199025593964",
          "communityTargetRewards": "428587038549756398491140",
          "targetCeloTotalSupply": "612775979386703955424085104",
        },
      }
    `)
  })
})
