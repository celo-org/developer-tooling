import {
  DEFAULT_OWNER_ADDRESS,
  setupL2,
  testWithAnvil,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromWeb3 } from '../kit'

testWithAnvil('MintGoldScheduleWrapper', (web3) => {
  const kit = newKitFromWeb3(web3)

  // this test is failing
  it('fetches config', async () => {
    const wrapper = await kit.contracts.getMintGoldSchedule()
    const timestamp = new BigNumber(1715808537)

    await setupL2(web3)

    await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
      await wrapper
        .activate(
          timestamp.toFixed(),
          new BigNumber('1e24').div(4).toFixed(),
          '0x0000000000000000000000000000000000000003',
          new BigNumber('1e24').div(1000).toFixed(),
          '0x000000000000000000000000000000000000ce10'
        )
        .sendAndWaitForReceipt({ from: DEFAULT_OWNER_ADDRESS })
    })

    const config = await wrapper.getConfig()

    expect(config).toMatchInlineSnapshot()
  })
})
