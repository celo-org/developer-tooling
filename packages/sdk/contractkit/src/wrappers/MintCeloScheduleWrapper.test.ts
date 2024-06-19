import { setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { newKitFromWeb3 } from '../kit'
import { activateMintCeloSchedule } from '../test-utils/utils'

testWithAnvil('MintCeloScheduleWrapper', (web3) => {
  const kit = newKitFromWeb3(web3)

  it('fetches config', async () => {
    const mintCeloScheduleWrapper = await kit.contracts.getMintCeloSchedule()

    await setupL2(web3)
    await activateMintCeloSchedule(kit)

    const config = await mintCeloScheduleWrapper.getConfig()
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
        "mintableAmount": "409271032214310717281708",
        "targetGoldTotalSupply": {
          "carbonFundTargetRewards": "1630561881331915208293",
          "communityTargetRewards": "407640470332978802073415",
          "targetGoldTotalSupply": "612754949032214310717281708",
        },
      }
    `)
  })
})
