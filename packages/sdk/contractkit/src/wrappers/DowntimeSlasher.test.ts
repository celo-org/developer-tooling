import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { newKitFromWeb3 } from '../kit'

testWithAnvilL1('DowntimeSlasherWrapper', (web3: Web3) => {
  it('calculates slashable downtime intervals', async () => {
    const kit = newKitFromWeb3(web3)
    const wrapper = await kit.contracts.getDowntimeSlasher()

    expect(await wrapper.slashableDowntimeIntervalsBefore()).toMatchInlineSnapshot(`
      [
        {
          "end": 300,
          "start": 288,
        },
        {
          "end": 347,
          "start": 301,
        },
      ]
    `)
  })
})
