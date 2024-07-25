import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { newKitFromWeb3 } from '../kit'

// doesn't work
testWithAnvilL2('CeloDistributionScheduleWrapper', (web3) => {
  const kit = newKitFromWeb3(web3)

  it.only('fetches config', async () => {
    const celoDistributionScheduleWrapper = await kit.contracts.getCeloDistributionSchedule()

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
